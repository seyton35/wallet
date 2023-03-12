import { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Image, FlatList, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { SwipeablePanel } from 'rn-swipeable-panel'

import Header from '../../components/Header'
import Txt from '../../components/Txt'
import Loading from '../../components/Loading'
import BottomTabsPanel from '../../components/BottomTabsPanel'

import { allRus, dayMonthRUS, dayMonthYearRUS, getDayMonthYear } from '../../middleWare/dataFormater'
import { fetchClosedBills } from '../../store/slices/currencyReducer'
import { countCut, getCurrencySymbol } from '../../middleWare/currencyFormater'

export default function HistoryScreen() {
    const [isPanelActive, setIsPanelActive] = useState(false);
    const [billOnFocus, setBillOnFocus] = useState(null);
    const [refreshing, setRefreshing] = useState(false)

    const { closedBills } = useSelector(s => s.currency)
    const { pending } = useSelector(s => s.currency)
    const { idUser } = useSelector(s => s.state.userData)
    const payDate = useRef(null)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchClosedBills(idUser))
        payDate.current = null
    }, [true])

    function showDate(date) {
        let isShowDate = false
        let dateString
        const { day, month, year } = getDayMonthYear(date)
        if (payDate.current == null) {
            payDate.current = { day, month, year }
            dateString = dayMonthYearRUS(date)
            isShowDate = true
        } else if (payDate.current.day !== day ||
            payDate.current.month !== month) {
            if (payDate.current.year !== year) {
                dateString = dayMonthYearRUS(date)
            }
            else {
                dateString = dayMonthRUS(date)
            }
            isShowDate = true
        }
        payDate.current = { day, month, year }
        if (isShowDate) {
            return <View style={styles.billDateBox}>
                <Txt style={styles.billDateTxt}>{dateString}</Txt>
            </View>
        }
    }

    const openInfoBillPanel = (bill) => {
        setBillOnFocus(bill)
        setIsPanelActive(true);
    };

    const closeInfoBillPanel = () => {
        setIsPanelActive(false);
    };

    function showListLoading() {
        if (closedBills.length == 0 && pending == false) {
            return (
                <View style={styles.billListStatusView}>
                    <Txt style={styles.billListStatusText}>здесь пока ничего нет</Txt >
                </View>)
        }
        else if (closedBills.length == 0 && pending) {
            return <Loading />
        }
    }

    function getStatusText(status) {
        switch (status) {
            case 'rejected': return 'Отменен'
            case 'active': return 'Выставлен'
            case 'success': return 'Оплачен'
        }
    }

    function onRefresh() {
        setRefreshing(true)
        dispatch(fetchClosedBills(idUser))
        setRefreshing(false)
    }

    function showBalance(bill) {
        return (
            < View style={styles.balanceView}>
                <Txt style={styles.billInfoSumTxt}>
                    {bill.receiver.id == idUser
                        ? '+' + countCut(bill.receiver.sum) + getCurrencySymbol(bill.receiver.currency)
                        : '-' + countCut(bill.sender.sum) + getCurrencySymbol(bill.sender.currency)
                    }
                </Txt>
            </View>
        )
    }

    function showBillInfo(bill) {
        let balance = ''
        let profitStyle = {}

        if (bill.receiver.id == idUser) {
            balance += '+'
            profitStyle.color = 'green'
            balance += countCut(bill.receiver.sum) + ' ' + getCurrencySymbol(bill.receiver.currency)
        } else {
            balance += '-'
            balance += countCut(bill.sender.sum) + ' ' + getCurrencySymbol(bill.sender.currency)
        }

        return (
            <View style={styles.billPanelContainer}>
                <View style={styles.billPanelBasicInfoView}>
                    <Image source={{ uri: 'https://reactjs.org/logo-og.png' }} style={styles.billPanelBasicInfoPic} />
                    <Txt style={styles.billPanelBasicInfoTypeTxt}>{bill.type}</Txt>
                    <Txt style={styles.billPanelBasicInfoNumberTxt}>{bill.sender.number}</Txt>
                    <Txt style={[styles.billPanelBasicInfoSumTxt, profitStyle]}>{balance}</Txt>
                </View>

                {bill.comment
                    ? <View style={styles.billPanelInfoCommentView}>
                        <Txt style={styles.billPanelInfoCommentLabel}>Комментарий</Txt>
                        <Txt noTranslate={true} style={styles.billPanelInfoCommentTxt}>{bill.comment}</Txt>
                    </View>
                    : null
                }

                <View style={styles.billPanelInfoView}>
                    <Txt style={styles.billPanelInfoLargeLabel}>Детали платежа</Txt>
                </View>
                <View style={styles.billPanelInfoView}>
                    <Txt style={styles.billPanelInfoLabel}>Статус</Txt>
                    <Txt style={styles.billPanelInfoTxt}>{getStatusText(bill.status)}</Txt>
                </View>
                <View style={styles.billPanelInfoView}>
                    <Txt style={styles.billPanelInfoLabel}>Дата и время</Txt>
                    <Txt style={styles.billPanelInfoTxt}>{allRus(bill.registerDate)}</Txt>
                </View>
                <View style={styles.billPanelInfoView}>
                    <Txt style={styles.billPanelInfoLabel}>Сумма</Txt>
                    <Txt style={styles.billPanelInfoTxt}>{countCut(bill.sender.sum)} {getCurrencySymbol(bill.sender.currency)}</Txt>
                </View>
                <View style={styles.billPanelInfoView}>
                    <Txt style={styles.billPanelInfoLabel}>Поставщик услуг</Txt>
                    <Txt style={styles.billPanelInfoTxt}>{bill.type}</Txt>
                </View>
                <View style={styles.billPanelInfoView}>
                    <Txt style={styles.billPanelInfoLabel}>Номер счета</Txt>
                    <Txt style={styles.billPanelInfoTxt}>{bill.sender.number}</Txt>
                </View>
            </View>
        )
    }

    function renderItem({ index, item: bill }) {
        return (
            <Pressable style={styles.billView} key={index}
                onPress={() => openInfoBillPanel(bill)}
            >
                {showDate(bill.registerDate)}
                <View style={styles.billInfoView}>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={styles.bilPicBox}>
                            <Image source={{ uri: 'https://reactjs.org/logo-og.png' }} style={styles.billPic} />
                            {bill.status == 'rejected'
                                ? <AntDesign name='exclamationcircle' style={styles.billRejectedIcon} />
                                : null
                            }
                        </View>
                        <View style={styles.billInfoBox}>
                            <Txt style={styles.billInfoTypeTxt}>{bill.type}</Txt>
                            <Txt style={styles.billInfoSenderTxt}>
                                {bill.sender.id == idUser
                                    ? bill.receiver.number
                                    : bill.sender.number
                                }
                            </Txt>
                        </View>
                    </View>
                    {showBalance(bill)}
                </View>
                {
                    bill.comment
                        ?
                        <View style={styles.billInfoCommentView}>
                            <Txt style={styles.billInfoCommentTxt}>{bill.comment}</Txt>
                        </View>
                        : null
                }
            </Pressable>
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

            {showListLoading()}
            <FlatList
                data={closedBills}
                renderItem={renderItem}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />

            <BottomTabsPanel />

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd',
        height: '100%'
    },

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
    bilPicBox: {
        paddingRight: 10

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

    billInfoBox: {},
    billDateBox: { 
        padding:5
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
        marginTop: 5,
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