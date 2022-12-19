import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import { rejectBillPayment } from '../store/slices/currencyReducer'
import { navigate } from '../store/slices/stateReducer'

export default function ActiveBillsScreen() {
    const { activeBills } = useSelector(s => s.currency)
    const { idUser } = useSelector(s => s.state.userData)

    const dispatch = useDispatch()

    function billBtnHandler(bill) {
        dispatch(navigate({
            screen: 'billPayment',
            data: { bill }
        }))
    }

    function rejectBillBtnHandler(bill) {
        Alert.alert(
            "Отклонить счет",
            `вы дейсвительно хотите отклонить этот счет?`,
            [
                {
                    text: 'отмена',
                    onPress: null
                },
                {
                    text: 'отклонить',
                    onPress: () => {
                        dispatch(rejectBillPayment({
                            idUser, idBill: bill._id
                        }))
                    }
                }
            ]
        )
    }

    return (
        <View style={styles.container}>
            <Header headerText='неоплаченные счета' />

            <ScrollView style={styles.screenScroll}>
                {activeBills.map((bill, index) => {
                    return <TouchableOpacity style={styles.billBtn} key={index}
                        onPress={() => billBtnHandler(bill)}
                    >
                        <View style={styles.billInfoView}>
                            <Text style={styles.billInfoSenderTxt}>{bill.sender.number}</Text>
                            <Text style={styles.billInfoSumTxt}>{bill.sender.sum} {bill.sender.currency}</Text>
                            <Text style={styles.billInfoDateTxt}>{bill.registerDate}</Text>
                        </View>
                        <TouchableOpacity style={styles.rejectBillBtn}
                            onPress={() => rejectBillBtnHandler(bill)}
                        >
                            <Text style={styles.rejectBillIcon}>X</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d3d3d3',
        height: '100%'
    },
    screenScroll: {
    },
    billBtn: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    billInfoView: {},
    billInfoSenderTxt: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold'
    },
    billInfoSumTxt: {},
    billInfoDateTxt: {},
    rejectBillBtn: {
        justifyContent: 'center'
    },
    rejectBillIcon: {
        color: 'black',
        fontSize: 25,
        fontWeight: "bold"
    }
})