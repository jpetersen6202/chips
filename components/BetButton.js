import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { useFonts, Bungee_400Regular } from '@expo-google-fonts/bungee';
import AppLoading from 'expo-app-loading'

export default function BetButton({text, value, pressFunction}) {
    let [fontsLoaded, error] = useFonts({
        Bungee_400Regular,
    })

    if (!fontsLoaded) {
        return <AppLoading />
    }

    function getOutlineColor() {
        if(value == 1){
            return '#fff'
        }
        if(value == 5){
            return '#EA1A1A'
        }
        if(value == 10){
            return '#1A41EA'
        }
        if(value == 25){
            return '#1DAF1A'
        }
        if(value == 50){
            return '#F89E15'
        }
        if(value == 100){
            return '#020202'
        }
        return '#C2C407'
    }

    function getBackgroundColor() {
        if(value == 1){
            return '#ADACAC'
        }
        if(value == 5){
            return '#bf1111'
        }
        if(value == 10){
            return '#1132bf'
        }
        if(value == 25){
            return '#178c15'
        }
        if(value == 50){
            return '#d18106'
        }
        if(value == 100){
            return '#3D3D3D'
        }
        return '#427e60'
    }

    function getUnderlayColor() {
        if(value == 1){
            return '#7C7979'
        }
        if(value == 5){
            return '#990e0e'
        }
        if(value == 10){
            return '#1132bf'
        }
        if(value == 25){
            return '#127011'
        }
        if(value == 50){
            return '#a76705'
        }
        if(value == 100){
            return '#313131'
        }
        return '#2a513e'
    }
  
    return (
    <View>
        <TouchableHighlight
            style={[styles.button, {borderColor: getOutlineColor(), backgroundColor: getBackgroundColor()}]}
            activeOpacity={0.6}
            underlayColor={getUnderlayColor()}
            onPress={pressFunction}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
    button: {
        paddingTop: 15,
        paddingBottom: 15,
        width: 200,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#C2C407',
        backgroundColor: '#427e60',
        marginTop: 10
    },

    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Bungee_400Regular'
    }
})
