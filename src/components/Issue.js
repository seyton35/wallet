import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { billPayment } from '../store/slices/currencyReducer'
import { navigate } from '../store/slices/stateReducer'

export default function Issue({ bill }) {
    const { idUser } = useSelector(s => s.state.userData)
    const { currencyArray } = useSelector(s => s.currency)

    const dispatch = useDispatch()

    function billPressHandler() {
        dispatch(navigate({
            screen: 'billPayment',
            data: {
                bill
            }
        }))
    }

    function pay() {
        let flag = false
        for (let i = 0; i < currencyArray.length; i++) {
            const cur = currencyArray[i];
            if (cur.type == bill.sender.currency)
                flag = true
        }
        if (flag) {
            dispatch(billPayment({
                idUser,
                idBill: bill._id,
                currencyType: bill.sender.currency
            }))
        }
        else {
            dispatch(navigate({
                screen: 'billPayment',
                data: {
                    bill
                }
            }))
        }
    }

    function payBtnHandler() {
        Alert.alert(
            "Оплата",
            `оплатить счет ${bill.type} на сумму ${bill.sender.sum} ${bill.sender.currency}?`,
            [
                {
                    text: 'отмена',
                    onPress: null
                },
                {
                    text: 'оплатить',
                    onPress: () => { pay() }
                }
            ]
        )
    }

    return (
        <TouchableOpacity style={styles.container}
            onPress={billPressHandler}
        >
            <View style={{ flexDirection: 'row' }}>
                <View>{/*TODO: заменить на icon для счета */}
                    <Text style={{ color: 'black', fontSize: 25 }}>@</Text>
                </View>
                <View>
                    <Text style={styles.billType}>{bill.type}</Text>
                    <Text style={styles.billSum}>{bill.sender.sum} {bill.sender.currency}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.payBtn}
                onPress={payBtnHandler}
            >
                <Text style={styles.payBtnTxt}>Оплатить</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    billType: {
        color: '#000',
        fontSize: 17
    },
    billSum: {

    },
    payBtn: {
        paddingHorizontal: 5,
        paddingVertical: 3,
        height: 30,
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'gray',
        alignSelf: 'center'
    },
    payBtnTxt: {
        color: '#000'
    }
})