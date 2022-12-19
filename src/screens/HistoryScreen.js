import { useEffect, useRef } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../components/Header'

import { fetchClosedBills } from '../store/slices/currencyReducer'

export default function HistoryScreen() {
    const { closedBills } = useSelector(s => s.currency)
    const { idUser } = useSelector(s => s.state.userData)

    const date = useRef()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchClosedBills(idUser))
    }, [true])


    return (
        <View style={styles.container}>
            <Header headerText='История' showHeaderButton={false} />

            <ScrollView style={styles.screenScroll}>
                {closedBills.length > 0
                    ? null
                    : <Text>здесь пока ничего нет</Text>
                }
                {closedBills.map((bill, index) => {
                    return (
                        <View style={styles.billView} key={index}>
                            <View style={styles.billInfoView}>
                                <Text style={styles.billInfoTypeTxt}>{bill.type}</Text>
                                <Text style={styles.billInfoSenderTxt}>
                                    {bill.sender.id == idUser
                                        ? bill.receiver.number
                                        : bill.sender.number
                                    }
                                </Text>
                                {bill.comment
                                    ?
                                    <View style={styles.billInfoCommentView}>
                                        <Text style={styles.billInfoCommentTxt}>{bill.comment}</Text>
                                    </View>
                                    : null
                                }
                                {/* <Text style={styles.billInfoDateTxt}>{bill.registerDate}</Text> */}
                            </View>
                            < View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <Text style={styles.billInfoSumTxt}>
                                    {bill.receiver.id == idUser
                                        ? '-'
                                        : '+'
                                    }
                                </Text>
                                <Text style={styles.billInfoSumTxt}>{bill.receiver.sum} {bill.receiver.currency}</Text>
                            </View>
                        </View>
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
    screenScroll: {
    },
    billView: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginTop: 5
    },
    billInfoView: {},
    billInfoTypeTxt: {
        color: '#000',
        fontSize: 17
    },
    billInfoSenderTxt: {},
    billInfoCommentView: {
        padding: 5,
        backgroundColor: '#ddd',
        borderRadius: 20,

    },
    billInfoCommentTxt: {},
    billInfoSumTxt: {
        color: '#000',
    },
})