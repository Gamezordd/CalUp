import React, {Component} from 'react';
import * as Calendar from 'expo-calendar';
import * as FileSystem from "expo-file-system";
import { ScrollView, Text, View, Button} from 'react-native';
import { Card } from 'react-native-elements';

export default class Backup extends Component{
    state = {backups: ''}

    fetchBackups(){

    }

    RenderCard(backups:any){
        return(
            backups.map((element) => {
                return(
                    <Card key={element.id} title={`Calendar ID: ${element.id}`} titleStyle={{textAlign:"left"}}>
                        <View>
                            <Text style={{paddingRight: 10}}>Calendar Title: {element.title}</Text>

                            <Text style={{marginTop:10}}>Source Name: {element.source.name}</Text>
                            <View style={{flexDirection: "row", alignItems:"center", justifyContent: "center",paddingTop:10}}>
                                <View style={{paddingHorizontal:10}}>
                                    <Button title="Delete" color="red" onPress={() => {}}/>
                                </View>
                                <View style={{paddingHorizontal:10}}>
                                    <Button title="Backup" onPress={() => {}}/>
                                </View>
                            </View>
                        </View>
                    </Card>
                );
            })
        )
    }

    render(){
        return(
            <ScrollView style={{marginBottom:10}}>
                    <Text style={{fontSize:20,paddingHorizontal:20, paddingTop:10}}>Backups found on Device: </Text>
                    
                </ScrollView>
        )
    }
}