import React, {Component} from "react";
import { Button, View } from "react-native";
import { Text } from "react-native-elements";
import { BackupAllFC } from "./BackupAllFC";
export default class NavBar extends Component{
    state={backupInProgress: false}

    BackupAll = () => {
        this.setState({backupInProgress: true})
        BackupAllFC().then(() => {
            this.setState({backupInProgress: false})
        })
    }

    render(){
        return(
            <View style={{flexDirection:"row"}}>
                <Text style={{fontSize:38,padding:5, paddingHorizontal: 10, flex:2}}>CalUp</Text>
                <View style={{flex:1, padding:8}}>
                    {this.state.backupInProgress ? <Button disabled title="Backup All" onPress={() => {}}/>:<Button title="Backup All" onPress={this.BackupAll}/>}
                </View>
            </View>
        )
    }
}