import { StyleSheet, View } from 'react-native'

import LoadingSpiner from './animated/LoadingSpiner'
import Txt from './Txt'

export default function Loading() {
    return (
        <View style={styles.billListStatusView}>
            <Txt style={styles.billListStatusText}>загрузка</Txt>
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
        color: '#000',
        paddingRight:5
    },
})