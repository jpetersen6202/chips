import {useState} from 'react'
import {View, Text, TouchableWithoutFeedback, Keyboard, StyleSheet, Dimensions, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import BetButton from './BetButton'
import CustomButton from './CustomButton'
import PlayerInput from './PlayerInput'

export default function PlayerGame({pressFunction, playersPassed, updatePlayers}) {
  const [players, setPlayers] = useState(playersPassed) //making a local copy to prevent re-render
  const [currentPlayer, setCurrentPlayer] = useState(players[0])
  const [phase, setPhase] = useState('preflop')
  const [pot, setPot] = useState(0)
  const [maxBet, setMaxBet] = useState(0)
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
        player.bet = 0
        player.fold = false
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
        player.bet += bet
        return editable
    })
    setPot(prevState => {
        const edit = prevState
        return edit + bet
    })
    if(currentPlayer.bet > maxBet) setMaxBet(currentPlayer.bet)
    setBet(0)
    nextPlayer()
  }

  function nextPlayer() {
      const notFolded = players.filter(player => player.fold == false)
      const playerNumber = notFolded.length
      const currentIndex = notFolded.indexOf(currentPlayer)
      if(currentIndex < (playerNumber-1)){
          setCurrentPlayer(notFolded[currentIndex + 1])
          setBalance(notFolded[currentIndex + 1].balance)
      } else {
          setCurrentPlayer(notFolded[0])
          setBalance(notFolded[0].balance)
      }
  }

  function handleFold() {
      const foldingName = currentPlayer.name
      nextPlayer()
      setPlayers(prevState => {
          const editable = [...prevState]
          const player = editable.find(player => player.name == foldingName)
          player.fold = true
          return editable
      })
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
                <Icon name='home' size={30} color='#cccccc'/>
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
                {(currentPlayer.bet + bet >= maxBet) && betButton('Submit Bet', submitBet)}
                {(currentPlayer.bet + bet < maxBet) && betButton('fold', handleFold)}     
            </View>
            {(maxBet > 0 && currentPlayer.bet < maxBet) && <Text style={{fontFamily: 'Bungee_400Regular', color: '#DC2D2D', fontSize: 12, marginTop: 12}}>{`bet to call: $${maxBet - currentPlayer.bet}`}</Text>}

            <Text style={styles.pot}>POT</Text>
            <Text style={[styles.balanceText, {fontSize: 24, marginTop: 10, marginBottom: 0}]}>{`$${pot}`}</Text>

        </View>
    </TouchableWithoutFeedback>
  )
}

function betButton(text, pressFunction) {
    if(text !== 'fold') {
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
    } else {
        return (
            <View style={{marginHorizontal: 15}}>
                <TouchableHighlight
                    style={[styles.betButton, {backgroundColor: 'red'}]}
                    activeOpacity={0.6}
                    underlayColor='#2a513e'
                    onPress={pressFunction}
                >
                <Text style={styles.betButtonText}>{text}</Text>
                </TouchableHighlight>
            </View>
        )
    }
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
        marginTop: 120
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
        top: 120,
        color: '#C2C407'
    },

    pot: {
        marginTop: 20,
        fontSize: 40,
        fontFamily: "BungeeShade_400Regular",
        color: '#C2C407'
        //color: '#CCCCCC'
        //color: '#B87333'
    },

    balanceContainer:{
        position: 'absolute',
        top: 190,
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