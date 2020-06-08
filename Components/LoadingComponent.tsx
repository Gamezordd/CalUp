import React from 'react';
import {Overlay} from 'react-native-elements'
import {ActivityIndicator, View, StyleSheet,Text,} from 'react-native'


interface LoadingProps{
    message: string
}
export default class Loading extends React.Component<LoadingProps>{
    render(){
        const { message } = this.props
        return(
        <Overlay overlayStyle={styles.loadingview} isVisible={true}>
            <View>
                <ActivityIndicator size={70} style={styles.loadindicator}/>
                <Text style={styles.loadingText}>{message}</Text>
            </View>
        </Overlay>
    )}
}

const styles = StyleSheet.create({
    loadingview:{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        width:200,
        maxHeight:200,
        flexDirection:"column"
    },
    loadingText:{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        textAlign:"center",
        fontSize:20

    },
    loadindicator:{
        flex:2,
    }
})