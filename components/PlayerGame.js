import {useState} from 'react'
import {View, Text, TouchableWithoutFeedback, Keyboard, StyleSheet, Dimensions, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import BetButton from './BetButton'
import CustomButton from './CustomButton'

export default function PlayerGame({pressFunction, playersPassed, updatePlayers}) {
    //TODO: add bet as player field to track what's required to call
  const [players, setPlayers] = useState(playersPassed) //making a local copy to prevent re-render
  const [currentPlayer, setCurrentPlayer] = useState(players[0])
  const [phase, setPhase] = useState('preflop')
  const [pot, setPot] = useState(0)
  const [betRequired, setBetRequired] = useState(0)
  const [bet, setBet] = useState(0)
  const [balance, setBalance] = useState(currentPlayer.balance)
  
  const chipTypes = [1, 5, 10, 25, 50, 100]

  function goHome() {
      setGlobalBalance(1000)
      pressFunction('home')
  }
  
  function setGlobalBalance(value) {
    setPlayers(prevState => {
      const editable = [...prevState]
      editable.forEach(player => {
        player.balance = value
      })
      return editable
    })
  }

  function addToBet(value) {
    setBet(prevState => prevState += value)
    const newBalance = balance - value
    setBalance(newBalance)
  }

  function resetBet() {
      setBet(0)
      setBalance(currentPlayer.balance)
  }

  function submitBet() {
    setPlayers(prevState => {
        const editable = [...prevState]
        const player = editable.find(player => player.name == currentPlayer.name)
        player.balance = balance
        return editable
    })
    setPot(bet)
    if(bet > betRequired) setBetRequired(bet)
    setBet(0)
    nextPlayer()
  }

  function nextPlayer() {
      const playerNumber = players.length
      const currentIndex = players.indexOf(currentPlayer)
      if(currentIndex < (playerNumber-1)){
          setCurrentPlayer(players[currentIndex + 1])
          setBalance(players[currentIndex + 1].balance)
      } else {
          setCurrentPlayer(players[0])
          setBalance(players[0].balance)
      }
  }

  let id = 99

  function assignId() {
    id += 1
    return id
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
                <Text style={styles.balanceText}>{`$${balance}`}</Text>
            </View>

            <View style={styles.buttonContainer}>
                {chipTypes.map(chip => (
                    <BetButton text={`+ $${chip} `} value={chip} pressFunction={() => addToBet(chip)} key={assignId()}/>
                ))}
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
                {betButton('Reset Bet', resetBet)}
                <Text style={{fontFamily: 'Bungee_400Regular', color: '#C2C407', fontSize: 20}}>{`$${bet}`}</Text>
                {betButton('Submit Bet', submitBet)}        
            </View>
            {(betRequired > 0) && <Text style={{fontFamily: 'Bungee_400Regular', color: '#C22121', fontSize: 12, marginTop: 12}}>{`Minimum bet: $${betRequired}`}</Text>}

        </View>
    </TouchableWithoutFeedback>
  )
}

function betButton(text, pressFunction) {
    return (
        <View style={{marginHorizontal: 15}}>
            <TouchableHighlight
                style={styles.betButton}
                activeOpacity={0.6}
                underlayColor='#2a513e'
                onPress={pressFunction}
            >
                <Text style={styles.betButtonText}>{text}</Text>
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

    buttonContainer: {
        marginTop: 150
    },

    betButton: {
        paddingTop: 15,
        paddingBottom: 15,
        width: 125,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#C2C407',
        backgroundColor: '#427e60',
    },

    betButtonText: {
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Bungee_400Regular'
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