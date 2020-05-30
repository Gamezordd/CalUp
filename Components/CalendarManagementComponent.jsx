import React, {Component} from 'react'
import * as Permissions from 'expo-permissions'
import * as Calendar from 'expo-calendar'
import {Card} from 'react-native-elements';
import {View, ScrollView, Text, Button} from "react-native";
import Loading from "./LoadingComponent";
import { Alert } from 'react-native';

export default class CalendarManagement extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoading: true,
            calendars: []
        }
    }
    async obtainCalendarPermission(){
        let permission = await Permissions.getAsync(Permissions.CALENDAR)
        if(permission.status != 'granted'){
            permission = await Permissions.askAsync(Permissions.CALENDAR);
            if (permission.status !== 'granted'){
                Alert.alert('Permission not granted for Notifications')
            }
        }
        return permission;
    }

    async fetchCalendars(){
        console.log("inside fetch calendars");
        
        this.setState({
            isLoading: true
        })
        this.obtainCalendarPermission();
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

    RenderCard(calendars){
        return(
                calendars.map((element) => {
                console.log("element is: ", element);
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
                                    <Button title="Backup"/>
                                </View>
                            </View>
                        </View>
                    </Card>
                );
            })
        )
    }

    render() {
        console.log("renderng");
        
        if(this.state.isLoading){
            console.log("Loading");
            return(
                <Loading/>
            )
        }
        if(!this.state.isLoading){
            return(
                <ScrollView style={{marginTop:40, marginBottom:10}}>
                    <Text style={{fontSize:20,paddingHorizontal:20}}>Calendars found on Device: </Text>
                    {this.RenderCard(this.state.calendars)}
                </ScrollView>
            );
        }
    }       
}
