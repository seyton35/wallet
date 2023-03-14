import { StyleSheet, View } from 'react-native'

import Header from '../components/Header'
import Txt from '../components/Txt'

export default function HelpScreen() {
    return (
        <View >
            <Header headerText='Помощь' />
            <View style={styles.container}>
                <Txt style={styles.text}>Вы остаетесь без помощи</Txt>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    text: {
        color: '#000',
        fontSize: 20,
        fontWeight:'600'
    },
})