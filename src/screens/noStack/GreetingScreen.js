import { Image, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { LogoAssets } from '../../../assets/logoAssets'
import LoadingSpiner from '../../components/animated/LoadingSpiner'

export default function GreetingScreen() {
  const loading = useSelector(s => s.state.loading)

  return (
    <View style={styles.container}>
      <View style={styles.greetingBox}>
        <Image
          source={LogoAssets['Wallet']}
          style={styles.LogoPic}
        />
        <Text style={styles.LogoText}>Wallet</Text>
        <Text style={styles.text}>не является настоящим банком</Text>
      </View>
      <View style={styles.greetingBox}>
        {loading
          ? <View style={styles.loadingBox}>
            <Text style={styles.text}>loading... </Text>
            <View style={styles.iconBox}>
              <LoadingSpiner size={20} />
            </View>
          </View>
          : null
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'#fff'
  },
  greetingBox: {
    height: '50%',
    justifyContent: 'flex-end',
    alignItems:'center'
  },
  LogoPic: {
    width: 50,
    height: 70,
  },
  LogoText: {
    fontSize: 25,
    color: '#000',
  },
  loadingBox: {
    height: '50%',

    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    color: '#222'
  },
  iconBox: {
    justifyContent: 'center'
  },
})