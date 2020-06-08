import React, {Component} from 'react'
import * as Permissions from 'expo-permissions'
import * as Calendar from 'expo-calendar'
import * as FileSystem from 'expo-file-system';
import {Card} from 'react-native-elements';
import {View, ScrollView, Text, Button} from "react-native";
import Loading from "./LoadingComponent";
import { Alert } from 'react-native';
export default class CalendarManagement extends Component{
    
    state={
        isLoading:true,
        calendars: [],
        loadingMessage:''
    }

    async obtainCalendarPermission(){
        let permission = await Permissions.getAsync(Permissions.CALENDAR)
        if(permission.status != 'granted'){
            permission = await Permissions.askAsync(Permissions.CALENDAR);
            if (permission.status !== 'granted'){
                Alert.alert('Permission not granted for Calendar')
            }
        }
        return permission;
    }

    async fetchCalendars(){
        this.setState({
            isLoading: true,
            loadingMessage: 'Fetching Calendars'
        })
        await this.obtainCalendarPermission();
        const result = await Calendar.getCalendarsAsync();
        this.setState({
            calendars: [...result],
            isLoading: false
        })
        return;
    }
    
    componentDidMount(){
        this.fetchCalendars();
    }

    deleteCalendar(id, name){
        Alert.alert(
            "Delete",
            `This operation will permanently delete ${name}. Are you Sure?`,
            [
                {text: 'OK', onPress: () => console.log("deletd: ", id)/*Calendar.deleteCalendarAsync(id)*/},
                {text: 'Cancel', style:"cancel"}
            ],
            {cancelable: true}
        )
    }

    async handleBackup(calendar:any){
        this.setState({isLoading: true, loadingMessage: 'Backup in Progress'})
        const currentDate = new Date()
        const events = await Calendar.getEventsAsync([calendar.id], new Date(0), currentDate);
        const directory = FileSystem.documentDirectory + 'CalBackups/Single/' + currentDate
        console.log("directory: ", directory);
        await FileSystem.makeDirectoryAsync(directory,{intermediates: true})
        await FileSystem.writeAsStringAsync(`${directory}/${calendar.title}:${currentDate.getHours}.cup`, events.toString()).then(() => {console.log("done");this.setState({isLoading: false})});
    }

    RenderCard(calendars){
        return(
            calendars.map((element) => {
                return(
                    <Card key={element.id} title={`Calendar ID: ${element.id}`} titleStyle={{textAlign:"left"}}>
                        <View>
                            <Text style={{paddingRight: 10}}>Calendar Title: {element.title}</Text>

                            <Text style={{marginTop:10}}>Source Name: {element.source.name}</Text>
                            <View style={{flexDirection: "row", alignItems:"center", justifyContent: "center",paddingTop:10}}>
                                <View style={{paddingHorizontal:10}}>
                                    <Button title="Delete" color="red" onPress={() => this.deleteCalendar(element.id, element.title)}/>
                                </View>
                                <View style={{paddingHorizontal:10}}>
                                    <Button title="Backup" onPress={() => this.handleBackup(element)}/>
                                </View>
                            </View>
                        </View>
                    </Card>
                );
            })
        )
    }

    render() {
        const {isLoading, loadingMessage} = this.state

        if(isLoading){
            return(
                <Loading message={loadingMessage}/>
            )
        }
        else{
            return(
                <ScrollView style={{marginBottom:10}}>
                    <Text style={{fontSize:20,paddingHorizontal:20, paddingTop:10}}>Calendars found on Device: </Text>
                    {this.RenderCard(this.state.calendars)}
                </ScrollView>
            );
        }
    }       
}
