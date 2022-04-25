import {View, Text, StyleSheet, Dimensions, TouchableHighlight, TextInput} from 'react-native'
import { useFonts, BungeeShade_400Regular } from '@expo-google-fonts/bungee-shade'
import AppLoading from 'expo-app-loading'
import Icon from 'react-native-vector-icons/AntDesign'
import PlayerInput from './PlayerInput'

export default function PlayerForm({pressFunction, players, updatePlayers}) {
  let [fontsLoaded, error] = useFonts({
    BungeeShade_400Regular,
  })

  if (!fontsLoaded) {
      return <AppLoading />
  }

  let id = 0

  function assignId() {
    id += 1
    return id
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Player VS Player</Text>
      
      <View style={styles.namesContainer}>
          {players && players.map((player, index) => (
            <PlayerInput name={player.name} number={index+1} updatePlayers={updatePlayers} key={assignId()}/>
          ))}
      </View>

      <TouchableHighlight
        style={styles.backButton}
        activeOpacity={0.6}
        underlayColor='#2a513e'
        onPress={() => pressFunction('home')}
      >
        <Icon name='back' size={40} color='#DE1D1D'/>
      </TouchableHighlight>

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

  namesContainer: {
      marginTop: 230,
      marginBottom: 120,
      marginHorizontal: 50,
      //backgroundColor: 'tomato',
      width: Dimensions.get('window').width - 100,
      flex: 1
  },

  backButton: {
    borderRadius: 30,
    position: 'absolute',
    bottom: 50,
    left: 30,
    padding: 2
  },

  title: {
      marginBottom: 20,
      fontSize: 30,
      fontFamily: "BungeeShade_400Regular",
      position: 'absolute',
      top: 150,
      color: '#C2C407'
  },
});
