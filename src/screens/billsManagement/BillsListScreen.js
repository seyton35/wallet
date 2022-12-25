import { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../../components/Header'
import { allRus } from '../../middleWare/dataFormater'

import { fetchBillsByCategory } from '../../store/slices/currencyReducer'

export default function BillsListScreen() {

    const { idUser } = useSelector(s => s.state.userData)
    const { category, headerText } = useSelector(s => s.state.navigationData)
    const { billsByCategory } = useSelector(s => s.currency)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchBillsByCategory({
            idUser,
            category,
        }))
    }, [])


    return (
        <View style={styles.container}>
            <Header headerText={headerText}></Header>

            <ScrollView style={styles.screenScroll}>

                {billsByCategory.map((bill, index) =>
                    <TouchableOpacity style={styles.billBtn} key={index}>
                        <View style={styles.billView}>

                            <View style={styles.billBox}>
                                <Text style={styles.billReceiverTxt}>{bill.receiver.number}</Text>
                                <Text>{bill.receiver.sum} {bill.receiver.currency}</Text>
                            </View>
                            <View style={styles.billBox}>
                                <Text>{bill.sender.number}</Text>
                            </View>
                            <View style={styles.billBox}>
                                <Text>{allRus(bill.registerDate)}</Text>
                                <Text>{bill.status}</Text>
                            </View>

                        </View>
                    </TouchableOpacity>
                )}

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#d3d3d3',
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