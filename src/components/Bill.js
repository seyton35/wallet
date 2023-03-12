import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Txt from './Txt'

import { LogoAssets } from '../../assets/logoAssets'
import { billPayment } from '../store/slices/currencyReducer'
import { navigate } from '../store/slices/stateReducer'
import { translate } from '../middleWare/translator/translator'

export default function Issue({ bill }) {
    const { idUser } = useSelector(s => s.state.userData)
    const { language } = useSelector(s => s.state)
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

    function tr(text) {
        return translate(text, language)
    }

    function payBtnHandler() {
        Alert.alert(
            "Оплата",
            `${tr('оплатить счет')} ${bill.type} ${tr('на сумму')} ${bill.sender.sum} ${bill.sender.currency}?`,
            [
                {
                    text: tr('отмена'),
                    onPress: null
                },
                {
                    text: tr('оплатить'),
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
                <View>
                    <Image
                        source={LogoAssets['Wallet']}
                        style={{ width: 35, height: 35, borderRadius: 20, margin: 5 }}
                    />
                </View>
                <View>
                    <Txt style={styles.billType}>{bill.type}</Txt>
                    <Txt style={styles.billSum}>{bill.sender.sum} {bill.sender.currency}</Txt>
                </View>
            </View>
            <TouchableOpacity style={styles.payBtn}
                onPress={payBtnHandler}
            >
                <Txt style={styles.payBtnTxt}>Оплатить</Txt>
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