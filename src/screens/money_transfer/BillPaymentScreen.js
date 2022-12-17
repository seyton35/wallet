import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'

export default function BillPaymentScreen() {
    const { bill } = useSelector(s => s.state.navigationData)
    console.log(bill);
    return (
        <View style={styles.container}>
            <Header headerText='оплата счета' />
            <Text>BillPaymentScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#d3d3d3',
        height: '100%'
    },
})