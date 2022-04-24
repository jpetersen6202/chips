import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import CustomButton from './CustomButton';
import { useFonts, BungeeShade_400Regular } from '@expo-google-fonts/bungee-shade'
import AppLoading from 'expo-app-loading'

export default function Home({setPage}) {
    let [fontsLoaded, error] = useFonts({
        BungeeShade_400Regular,
    })

    if (!fontsLoaded) {
        return <AppLoading />
    }
  
    return (
    <View style={styles.container}>
        <Text style={styles.title}>Chips</Text>
        <Image
            style={styles.logo} 
            source={require('../assets/chipsClipArt.png')}
        />
        <View style={styles.buttonContainer}>
            <CustomButton text={'Player VS Player'} pressFunction={() => setPage('playerForm')}/>

            <CustomButton text={'Player VS House'} pressFunction={() => setPage('houseForm')}/>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      backgroundColor: '#35654d',
      alignItems: 'center',
      justifyContent: 'center',
    },

    buttonContainer: {
        marginTop: 20
    },

    logo: {
        width: 225,
        height: 175
    },

    title: {
        marginBottom: 20,
        fontSize: 48,
        fontFamily: "BungeeShade_400Regular",
    },
  });