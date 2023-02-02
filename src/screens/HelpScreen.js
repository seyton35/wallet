import { StyleSheet, Text, View } from 'react-native'
import Header from '../components/Header'

export default function HelpScreen() {
    return (
        <View>
            <Header headerText='Помощь' />
            <Text>Вы остаетесь без помощи</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
})