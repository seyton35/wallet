import { StyleSheet, Text, View } from 'react-native'
import LoadingSpiner from './animated/LoadingSpiner'


export default function Loading() {
    return (
        <View style={styles.billListStatusView}>
            <Text style={styles.billListStatusText}>загрузка </Text>
            <LoadingSpiner size={17} />
        </View>)
}

const styles = StyleSheet.create({
    billListStatusView: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    billListStatusText: {
        fontSize: 17,
        color: '#000'
    },
})