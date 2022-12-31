import { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/AntDesign'
import { SwipeablePanel } from 'rn-swipeable-panel'

import Header from '../components/Header'

import { allRus, dayMonthRUS, getDayMonthYear } from '../middleWare/dataFormater'
import { fetchClosedBills } from '../store/slices/currencyReducer'

export default function HistoryScreen() {
    const [isPanelActive, setIsPanelActive] = useState(false);
    const [billOnFocus, setBillOnFocus] = useState(null);

    const { closedBills } = useSelector(s => s.currency)
    const { idUser } = useSelector(s => s.state.userData)

    const payDate = useRef(null)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchClosedBills(idUser))
        payDate.current = null
    }, [true])

    function showDate(date) {
        let isShowDate = false
        const { day, month, year } = getDayMonthYear(date)
        if (payDate.current == null) {
            payDate.current = { day, month, year }
            isShowDate = true
        } else if (payDate.current.day !== day ||
            payDate.current.month !== month ||
            payDate.current.year !== year) {
            isShowDate = true
        }
        payDate.current = { day, month, year }
        if (isShowDate) {
            return <Text style={styles.billDateTxt}>{dayMonthRUS(date)}</Text>
        }
    }

    const openInfoBillPanel = (bill) => {
        setBillOnFocus(bill)
        setIsPanelActive(true);
    };

    const closeInfoBillPanel = () => {
        setIsPanelActive(false);
    };

    function showStatusRUS(status) {
        switch (status) {
            case 'rejected':return 'Отменен'                
            case 'active':return 'Выставлен'                
            case 'success':return 'Оплачен'                
        }
    }

    function showBalance(bill) {
        return (
            < View style={styles.balanceView}>
                <Text style={styles.billInfoSumTxt}>
                    {bill.receiver.id == idUser
                        ? '-'
                        : '+'
                    }
                    {bill.sender.sum} {bill.sender.currency}
                </Text>
            </View>
        )
    }

    function showBillInfo(bill) {
        let balance = ''
        let profitStyle = {}

        if (bill.receiver.id == idUser) {
            balance += '-'
        } else {
            balance += '+'
            profitStyle.color = 'green'
        }
        balance += bill.sender.sum + ' ' + bill.sender.currency

        return (
            <View style={styles.billPanelContainer}>
                <View style={styles.billPanelBasicInfoView}>
                    <Image source={{ uri: 'https://reactjs.org/logo-og.png' }} style={styles.billPanelBasicInfoPic} />
                    <Text style={styles.billPanelBasicInfoTypeTxt}>{bill.type}</Text>
                    <Text style={styles.billPanelBasicInfoNumberTxt}>{bill.sender.number}</Text>
                    <Text style={[styles.billPanelBasicInfoSumTxt, profitStyle]}>{balance}</Text>
                </View>

                {bill.comment
                    ? <View style={styles.billPanelInfoCommentView}>
                        <Text style={styles.billPanelInfoCommentLabel}>Комментарий</Text>
                        <Text style={styles.billPanelInfoCommentTxt}>{bill.comment}</Text>
                    </View>
                    : null
                }

                <View style={styles.billPanelInfoView}>
                    <Text style={styles.billPanelInfoLargeLabel}>Детали платежа</Text>
                </View>
                <View style={styles.billPanelInfoView}>
                    <Text style={styles.billPanelInfoLabel}>Статус</Text>
                    <Text style={styles.billPanelInfoTxt}>{showStatusRUS(bill.status)}</Text>
                </View>
                <View style={styles.billPanelInfoView}>
                    <Text style={styles.billPanelInfoLabel}>Дата и время</Text>
                    <Text style={styles.billPanelInfoTxt}>{allRus(bill.registerDate)}</Text>
                </View>
                <View style={styles.billPanelInfoView}>
                    <Text style={styles.billPanelInfoLabel}>Сумма</Text>
                    <Text style={styles.billPanelInfoTxt}>{bill.sender.sum} {bill.sender.currency}</Text>
                </View>
                <View style={styles.billPanelInfoView}>
                    <Text style={styles.billPanelInfoLabel}>Поставщик услуг</Text>
                    <Text style={styles.billPanelInfoTxt}>{bill.type}</Text>
                </View>
                <View style={styles.billPanelInfoView}>
                    <Text style={styles.billPanelInfoLabel}>Номер счета</Text>
                    <Text style={styles.billPanelInfoTxt}>{bill.sender.number}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Header headerText='История' showHeaderButton={false} />

            <SwipeablePanel style={styles.panel}
                isActive={isPanelActive}
                closeOnTouchOutside={true}
                fullWidth={true}
                onlyLarge={true}
                onClose={closeInfoBillPanel}
            >
                {billOnFocus ? showBillInfo(billOnFocus) : null}
            </SwipeablePanel>

            <ScrollView style={styles.screenScroll}>
                {closedBills.length > 0
                    ? null
                    : <Text>здесь пока ничего нет</Text>
                }
                {closedBills.map((bill, index) => {
                    return (
                        <TouchableOpacity style={styles.billView} key={index}
                            onPress={() => openInfoBillPanel(bill)}
                        >
                            <View style={styles.billInfoView}>
                                <View style={{ flexDirection: 'row', }}>
                                    <View>
                                        <Image source={{ uri: 'https://reactjs.org/logo-og.png' }} style={styles.billPic} />
                                        {bill.status == 'rejected'
                                            ? <Icon name='exclamationcircle' style={styles.billRejectedIcon} />
                                            : null
                                        }
                                    </View>
                                    <View >
                                        {showDate(bill.paymentDate)}
                                        <Text style={styles.billInfoTypeTxt}>{bill.type}</Text>
                                        <Text style={styles.billInfoSenderTxt}>
                                            {bill.sender.id == idUser
                                                ? bill.receiver.number
                                                : bill.sender.number
                                            }
                                        </Text>
                                    </View>
                                </View>
                                {showBalance(bill)}
                            </View>
                            {
                                bill.comment
                                    ?
                                    <View style={styles.billInfoCommentView}>
                                        <Text style={styles.billInfoCommentTxt}>{bill.comment}</Text>
                                    </View>
                                    : null
                            }
                        </TouchableOpacity>
                    )
                })}
            </ScrollView >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd',
        height: '100%'
    },

    billPanelBasicInfoView: {
        alignItems: 'center',
        padding: 10
    },
    billPanelBasicInfoPic: {
        width: 80,
        height: 80,
        backgroundColor: 'gray',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 100,

    },
    billPanelBasicInfoTypeTxt: {
        color: '#000',
        fontSize: 20,
    },
    billPanelBasicInfoNumberTxt: {},
    billPanelBasicInfoSumTxt: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold'
    },

    billPanelContainer: {},
    billPanelInfoCommentView: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        backgroundColor: '#eee',
        borderRadius: 10
    },
    billPanelInfoCommentLabel: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold'
    },


    billPanelInfoLargeLabel: {
        color: '#000',
        fontSize: 25,
        fontWeight: 'bold'
    },
    billPanelInfoCommentTxt: {},
    billPanelInfoView: {
        padding: 10
    },
    billPanelInfoLabel: {},
    billPanelInfoTxt: {
        color: '#000',
        fontSize: 17,
    },

    screenScroll: {
    },
    billView: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
        marginTop: 5
    },
    billInfoView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    billPic: {
        width: 50,
        height: 50,
        backgroundColor: 'gray',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 100,

    },

    billRejectedIcon: {
        color: 'red',
        fontSize: 15,
        position: 'absolute',
        zIndex: 1,
        top: '55%',
        left: '55%',
    },
    billDateTxt: {
        color: '#000',
        fontSize: 14
    },
    billInfoTypeTxt: {
        color: '#000',
        fontSize: 17
    },
    billInfoSenderTxt: {},
    balanceView: {
        justifyContent: 'center',
    },
    billInforejectTxt: {
        color: '#ff4242'
    },
    billInfoCommentView: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#ddd',
        borderRadius: 20,
        alignSelf: 'flex-start'
    },
    billInfoCommentTxt: {
    },
    billInfoSumTxt: {
        color: '#000',
    },
})