import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Entypo from 'react-native-vector-icons/Entypo'

import Header from '../components/Header'
import Txt from '../components/Txt'

import { rejectBill } from '../store/slices/currencyReducer'
import { navigate } from '../store/slices/stateReducer'
import * as dataFormater from '../middleWare/dataFormater'
import { getCurrencySymbol } from '../middleWare/currencyFormater'
import { translate } from '../middleWare/translator/translator'

export default function ActiveBillsScreen() {
    const { language } = useSelector(s => s.state)
    const { activeBills } = useSelector(s => s.currency)
    const { idUser } = useSelector(s => s.state.userData)

    const dispatch = useDispatch()

    function tr(text) {
        return translate(text, language)
    }

    function billBtnHandler(bill) {
        dispatch(navigate({
            screen: 'billPayment',
            data: { bill }
        }))
    }

    function rejectBillBtnHandler(bill) {
        Alert.alert(
            tr("Отклонить счет"),
            tr("вы дейсвительно хотите отклонить этот счет?"),
            [
                {
                    text: tr('отмена'),
                    onPress: null
                },
                {
                    text: tr('отклонить'),
                    onPress: () => {
                        dispatch(rejectBill({
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
                            <Txt style={styles.billInfoSenderTxt}>{bill.sender.number}</Txt>
                            <Txt style={styles.billInfoSumTxt}>{bill.sender.sum} {getCurrencySymbol(bill.sender.currency)}</Txt>
                            <Txt slice style={styles.billInfoDateTxt}>{dataFormater.fullDate(bill.registerDate)}</Txt>
                        </View>
                        <TouchableOpacity style={styles.rejectBillBtn}
                            onPress={() => rejectBillBtnHandler(bill)}
                        >
                            <Entypo name='dots-three-vertical' style={styles.rejectBillIcon} />
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
        color: '#999',
        fontSize: 20,
    }
})