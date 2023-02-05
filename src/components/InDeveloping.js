import { StyleSheet, Text, View } from 'react-native'

export default function InDeveloping() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>В разработке</Text>
            <Text style={styles.text}>приходите позже</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding:20
    },
    text: {
        color: '#000',
        fontSize: 20,
        fontWeight: '600'
    },
})