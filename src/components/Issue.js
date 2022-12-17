import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { billPayment } from '../store/slices/currencyReducer'

export default function Issue({ issue }) {
    const {idUser} = useSelector(s=>s.state.userData) 

    const dispatch = useDispatch()

    function payBtnHandler() {
        Alert.alert(
            "Оплата",
            `оплатить счет ${issue.type} на сумму ${issue.sum} ${issue.currency}?`,
            [
                {
                    text: 'отмена',
                    onPress: null
                },
                {
                    text: 'оплатить',
                    onPress: () => {
                        dispatch(billPayment({
                            idUser, idBill:issue._id,currency:issue.currency
                        }))
                    }
                }
            ]
        )
    }

    return (
        <TouchableOpacity style={styles.container}
        >
            <View style={{ flexDirection: 'row' }}>
                <View>{/*TODO: заменить на icon для счета */}
                    <Text style={{ color: 'black', fontSize: 25 }}>@</Text>
                </View>
                <View>
                    <Text style={styles.issueType}>{issue.type}</Text>
                    <Text style={styles.issueSum}>{issue.sum} {issue.currency}</Text>
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
    issueType: {
        color: '#000',
        fontSize: 17
    },
    issueSum: {

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