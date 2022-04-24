import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { useFonts, Bungee_400Regular } from '@expo-google-fonts/bungee';
import AppLoading from 'expo-app-loading'

export default function CustomButton({text, pressFunction}) {
    let [fontsLoaded, error] = useFonts({
        Bungee_400Regular,
    })

    if (!fontsLoaded) {
        return <AppLoading />
    }
  
    return (
    <View>
        <TouchableHighlight
            style={styles.button}
            activeOpacity={0.6}
            underlayColor='#2a513e'
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
        marginTop: 15
    },

    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Bungee_400Regular'
    }
})
