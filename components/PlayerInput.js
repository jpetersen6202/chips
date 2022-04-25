import { useState } from 'react'
import {View, Text, StyleSheet, TextInput} from 'react-native'
import { useFonts, BungeeShade_400Regular } from '@expo-google-fonts/bungee-shade'
import AppLoading from 'expo-app-loading'

export default function PlayerInput({number, name, updatePlayers}) {
  let [text, setText] = useState(name)
  
  let [fontsLoaded, error] = useFonts({
    BungeeShade_400Regular,
  })

  if (!fontsLoaded) {
      return <AppLoading />
  }

  function exitInput() {
    updatePlayers(prevState => {
      const editable = [...prevState]
      const person = editable.at(number - 1)
      person.name = text
      return editable
    })
  }
  
  return (
    <View style={styles.inputRow}>
      <Text style={styles.inputHeader}>{number.toString() + '.'}</Text>
      <TextInput
        style={styles.input}
        value={text}
        placeholder={'Player Name'}
        onChangeText={text => setText(text)}
        onEndEditing={exitInput}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#d9dc00',
    padding: 10,
    flex: 6,
    backgroundColor: '#427e60'
  },

  inputHeader: {
    fontSize: 24,
    fontFamily: "BungeeShade_400Regular",
    color: '#d9dc00',
    flex: 1,
    marginTop: 5
  },

  inputRow: {
    flexDirection: 'row',
    marginBottom: 15
  },
})
