import { Image, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'

import LoadingSpiner from '../../components/animated/LoadingSpiner'
import Txt from '../../components/Txt'

import { LogoAssets } from '../../../assets/logoAssets'

export default function GreetingScreen() {
  const loading = useSelector(s => s.state.loading)

  return (
    <View style={styles.container}>
      <View style={styles.greetingBox}>
        <Image
          source={LogoAssets['Wallet']}
          style={styles.LogoPic}
        />
        <Txt style={styles.LogoText}>Wallet</Txt>
        <Txt style={styles.text}>не является настоящим банком</Txt>
      </View>
      <View style={styles.greetingBox}>
        {loading
          ? <View style={styles.loadingBox}>
            <Txt style={styles.text}>загрузка</Txt>
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
    backgroundColor: '#fff'
  },
  greetingBox: {
    height: '50%',
    justifyContent: 'flex-end',
    alignItems: 'center'
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
    paddingRight: 5,
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