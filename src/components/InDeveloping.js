import { StyleSheet, View } from 'react-native'

import Txt from './Txt'

export default function InDeveloping() {
    return (
        <View style={styles.container}>
            <Txt style={styles.text}>В разработке</Txt>
            <Txt style={styles.text}>приходите позже</Txt>
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
        // color: '#000',
        fontSize: 20,
        fontWeight: '600'
    },
})