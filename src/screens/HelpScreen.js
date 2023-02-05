import { StyleSheet, Text, View } from 'react-native'
import Header from '../components/Header'

export default function HelpScreen() {
    return (
        <View >
            <Header headerText='Помощь' />
            <View style={styles.container}>
                <Text style={styles.text}>Вы остаетесь без помощи</Text>
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