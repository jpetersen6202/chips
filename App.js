import { StyleSheet, View, Text } from 'react-native';
import { useState } from 'react'
import Home from './components/Home';
import PlayerForm from './components/PlayerForm';
import HouseForm from './components/HouseForm';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [players, setPlayers] = useState([{name: 'Player 1', balance: 1000}, {name: 'Player 2', balance: 1000}])

  switch(currentPage) {
    case 'home':
      return (
        <View style={styles.container}>
          <Home setPage={setCurrentPage}/>
        </View>
      )

    case 'playerForm':
      return (
        <View style={styles.container}>
          <PlayerForm pressFunction={setCurrentPage} players={players} updatePlayers={setPlayers}/>
        </View>
      )

    case 'houseForm':
      return (
        <View style={styles.container}>
          <HouseForm pressFunction={setCurrentPage}/>
        </View>
      )
  }

  return (
    <View style={styles.container}>
      <Text>Default Fallback</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#35654d',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
