import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet,  TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../../components/Header'
import Txt from '../../components/Txt'
import ModalRangeDatePicker from '../../components/ModalRangeDatePicker'

import { getCurrencySymbol } from '../../middleWare/currencyFormater'
import { allRus } from '../../middleWare/dataFormater'
import { fetchBillsByCategory } from '../../store/slices/currencyReducer'
import { backButtonPress, navigate } from '../../store/slices/stateReducer'

export default function BillsListScreen() {
    const [dateRange, setDateRange] = useState(null)
    const [showCalendar, setShowCalendar] = useState(false)

    const { prevScreen } = useSelector(s => s.state)
    const { idUser } = useSelector(s => s.state.userData)
    const { category, headerText } = useSelector(s => s.state.navigationData)
    const { billsByCategory } = useSelector(s => s.currency)

    const dispatch = useDispatch()

    useEffect(() => {
        if (prevScreen == 'billCategories') {
            setTimeout(() => {
                setShowCalendar(true)
            }, 100);
        }
    }, [])


    useEffect(() => {
        if (dateRange) {
            dispatch(fetchBillsByCategory({
                idUser,
                category,
                timeRange: dateRange
            }))
        }
    }, [dateRange])

    function dateHandler(date) {
        setShowCalendar(false)
        setDateRange(date)
    }

    function getDateRange() {
        return (
            <ModalRangeDatePicker setDate={dateHandler}
                onCancelPress={() => {
                    dispatch(backButtonPress())
                }} />
        )
    }

    function goToBillInfo(bill) {
        setDateRange(null)
        dispatch(navigate({
            screen: 'billInfo',
            data: {
                bill,
                headerText,
                category
            }
        }))
    }

    return (
        <View style={styles.container}>
            <Header headerText={headerText}></Header>

            {showCalendar
                ? getDateRange()
                :
                <ScrollView style={styles.screenScroll}>

                    {billsByCategory.map((bill, index) =>
                        <TouchableOpacity style={styles.billBtn} key={index}
                            onPress={() => goToBillInfo(bill)}
                        >
                            <View style={styles.billView}>

                                <View style={styles.billBox}>
                                    <Txt style={styles.billReceiverTxt}>{bill.receiver.number}</Txt>
                                    <Txt>{bill.status == 'success'
                                        ? bill.receiver.sum + ' ' + getCurrencySymbol(bill.receiver.currency)
                                        : bill.sender.sum + ' ' + getCurrencySymbol(bill.sender.currency)
                                    }
                                    </Txt>
                                </View>
                                <View style={styles.billBox}>
                                    <Txt>{bill.sender.number}</Txt>
                                </View>
                                <View style={styles.billBox}>
                                    <Txt>{allRus(bill.registerDate)}</Txt>
                                    <Txt>{bill.status}</Txt>
                                </View>

                            </View>
                        </TouchableOpacity>
                    )}

                </ScrollView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '',
    },

    screenScroll: {
        width: '100%'
    },
    billBtn: {
        borderBottomColor: '#aaa',
        borderBottomWidth: 1
    },
    billView: {
        padding: 10
    },
    billBox: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    billReceiverTxt: {
        color: '#000',
        fontSize: 17
    },
})