import {View, Text, Pressable} from 'react-native'

export default function HouseForm({pressFunction}) {
  return (
    <View>
        <Text>House form comp</Text>
        <Pressable onPress={() => pressFunction('home')}>
            <Text>Go back to home</Text>
        </Pressable>
    </View>
  )
}
