import {useState} from 'react'
import {View, Text, TouchableWithoutFeedback, Keyboard, StyleSheet, Dimensions, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

export default function PlayerGame({pressFunction, players, updatePlayers}) {
  const [currentPlayer, setCurrentPlayer] = useState(players[0])
  const startingBalance = currentPlayer.balance

  function goHome() {
      setGlobalBalance(startingBalance)
      pressFunction('home')
  }
  
  function setGlobalBalance(value) {
    updatePlayers(prevState => {
      const editable = [...prevState]
      editable.forEach(player => {
        player.balance = value
      })
      return editable
    })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
            <TouchableHighlight
                style={styles.homeButton}
                activeOpacity={0.6}
                underlayColor='#2a513e'
                onPress={goHome}
            >
                <Icon name='home' size={40} color='#cccccc'/>
            </TouchableHighlight>

            <Text style={styles.title}>{currentPlayer.name}</Text>
            <View style={styles.balanceContainer}>
                <Text style={styles.balanceText}>{`$${currentPlayer.balance}`}</Text>
            </View>

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

    title: {
        marginBottom: 20,
        fontSize: 42,
        fontFamily: "BungeeShade_400Regular",
        position: 'absolute',
        top: 150,
        color: '#C2C407'
    },

    balanceContainer:{
        position: 'absolute',
        top: 220,
        flexDirection: 'row'
    },

    balanceText: {
        fontFamily: 'Bungee_400Regular',
        color: '#cccccc',
        fontSize: 30
    },

    homeButton: {
        borderRadius: 30,
        position: 'absolute',
        top: 50,
        left: 30,
        padding: 2
    },
})