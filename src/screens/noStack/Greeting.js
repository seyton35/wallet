import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'

export default function Greeting() {
  const loading = useSelector(s => s.state.loading)

  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>Greeting</Text>
      {loading
        ? <Text style={styles.text}>loading...</Text> : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  greetingText: {
    fontSize: 25,
    color: '#000'
  },
  text:{
    fontSize:17,
    color: '#000'
  }
})