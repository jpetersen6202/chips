import {View, Text, StyleSheet, Dimensions, TouchableHighlight, TouchableWithoutFeedback, TextInput, Keyboard} from 'react-native'
import { useFonts, BungeeShade_400Regular } from '@expo-google-fonts/bungee-shade'
import { useState } from 'react'
import { Bungee_400Regular } from '@expo-google-fonts/bungee'
import AppLoading from 'expo-app-loading'
import Icon from 'react-native-vector-icons/AntDesign'
import PlayerInput from './PlayerInput'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'

export default function PlayerForm({pressFunction, players, updatePlayers}) {
  let [balance, setBalance] = useState(players[0].balance)
  
  let [fontsLoaded, error] = useFonts({
    BungeeShade_400Regular,
    Bungee_400Regular
  })

  if (!fontsLoaded) {
      return <AppLoading />
  }

  let id = 0

  function assignId() {
    id += 1
    return id
  }

  function addPlayer() {
    updatePlayers(prevState => {
      const index = prevState.length + 1
      return [...prevState, {name: `Player ${index}`, balance: balance}]
    })
  }

  function removePlayer() {
    updatePlayers(prevState => {
      const editable = [...prevState]
      editable.pop()
      return editable
    })
  }

  function setGlobalBalance() {
    updatePlayers(prevState => {
      const editable = [...prevState]
      editable.forEach(player => {
        player.balance = balance
      })
      return editable
    })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      
      <Text style={styles.title}>Player VS Player</Text>
      
      <View style={styles.namesContainer}>
          {players && players.map((player, index) => (
            <PlayerInput name={player.name} number={index+1} updatePlayers={updatePlayers} key={assignId()}/>
          ))}
      
        <View style={styles.playerEditContainer}>
          <TouchableWithoutFeedback onPress={removePlayer}>
            <Icon name='minussquareo' size={50} color='#fff'/>
          </TouchableWithoutFeedback>

          <Text style={{fontFamily: 'Bungee_400Regular', marginHorizontal: 10, color: '#C2C407'}}>Adjust Player Count</Text>
          
          <TouchableWithoutFeedback onPress={addPlayer}>
            <Icon name='plussquareo' size={50} color='#fff'/>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.balanceContainer}>
          <Text style={{fontFamily: 'Bungee_400Regular', color: '#C2C407'}}>Starting Balance:</Text>
          <TextInput 
            style={styles.input}
            value={balance.toString()}
            onChangeText={number => setBalance(number)}
            onEndEditing={setGlobalBalance}
            keyboardType='number-pad'
          />
        </View>
      
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
    </TouchableWithoutFeedback>
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

  input: {
    borderWidth: 1,
    borderColor: '#d9dc00',
    height: 30,
    width: 100,
    backgroundColor: '#427e60',
    textAlign: 'center',
    marginTop: 8
  },

  namesContainer: {
      marginTop: 230,
      marginBottom: 10,
      marginHorizontal: 50,
      width: Dimensions.get('window').width - 100,
      flex: 1,
  },

  playerEditContainer: {    
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15
  },

  balanceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
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
