import React from 'react';
import * as FileSystem from 'expo-file-system';
import * as Calendar from 'expo-calendar';
import * as Permissions from 'expo-permissions';
import { Alert } from "react-native";


const currentDate = new Date()

async function obtainCalendarPermission(){
    let permission = await Permissions.getAsync(Permissions.CALENDAR)
    if(permission.status != 'granted'){
        permission = await Permissions.askAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted'){
            Alert.alert('Permission not granted for Calendar')
        }
    }
    return permission;
}

async function fetchCalendars(){

    await obtainCalendarPermission();
    const result = await Calendar.getCalendarsAsync();
    const calendars = [...result]
    return calendars;
} 

export async function BackupAllFC(){
    let calendarIds:string[] = []
    let directory = FileSystem.documentDirectory + 'CalBackups/All' + currentDate
    const calendars = await fetchCalendars()
    calendars.map(calendar => {
        calendarIds = calendarIds.concat(calendar.id)
    });
    const events = await Calendar.getEventsAsync(calendarIds, new Date(0), currentDate);
    console.log(events);
    await FileSystem.makeDirectoryAsync(directory,{intermediates: true})
    await FileSystem.writeAsStringAsync(`${directory}/${currentDate.getHours}.cup`, events.toString()).then(() => {console.log("done"); return 1})
}
