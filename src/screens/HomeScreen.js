import { useEffect } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Currency from "../components/Currency";
import Header from "../components/Header";
import Issue from "../components/Issue";

import { fetchAllCurrencyes, fetchIssuedInvoices, selectCurrency } from "../store/slices/currencyReducer";
import { navigate } from "../store/slices/stateReducer";

export default function Home() {
    const { currencyArray } = useSelector(s => s.currency)
    const { idUser } = useSelector(s => s.state.userData)
    const { issuedInvoicesArr } = useSelector(s => s.currency)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllCurrencyes(idUser))
        dispatch(fetchIssuedInvoices(idUser))
    }, [true])

    function goToCurrencyScreen(cur) {
        dispatch(selectCurrency(cur))
        dispatch(navigate('service'))
    }


    return (
        <View style={styles.container}>
            <Header showHeaderButton={false} />

            <ScrollView style={styles.screenScroll}>
                <ScrollView style={styles.currencyScroll}
                    horizontal
                >
                    {currencyArray.map((cur, index) => {
                        return (
                            <Currency
                                cur={cur}
                                key={index}
                                navigate={() => goToCurrencyScreen(cur)}
                            />
                        )
                    })}
                </ScrollView>
                {issuedInvoicesArr.length > 0
                    ?
                    <View style={styles.issuesScroll}>
                        <Text style={styles.issuesScrollTxt}>
                            {function () {
                                const len = issuedInvoicesArr.length
                                if (len == 1) return len + ' неоплаченный счет'
                                else if (5 > len || len > 1) return len + ' неоплаченных счета'
                                else return len + ' неоплаченных счетов'
                            }()}
                        </Text>
                        {issuedInvoicesArr.map((issue, index) => {
                            if (index>=3) {
                                return null
                            } else {
                                return (
                                    <Issue issue={issue} key={index}></Issue>
                                    )
                                }
                        })}
                        <TouchableOpacity style={styles.allIssuesBtn}>
                            <Text style={styles.allIssuesBtnTxt}>Все счета</Text>
                        </TouchableOpacity>
                    </View>
                    : null
                }
            </ScrollView >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#d3d3d3',
        height: '100%'
    },
    screenScroll: {},
    currencyScroll: {
        height: 150
    },
    issuesScroll: {
        backgroundColor: '#fff',
        width: '90%',
        marginHorizontal: 20,
        // minHeight: 40,
        // maxHeight: 150,
        borderRadius: 10,
        padding: 20
    },
    issuesScrollTxt: {
        color: '#000',
        fontSize: 17
    },
    allIssuesBtn: {
        padding: 10,
        marginTop: 5,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 20
    },
    allIssuesBtnTxt: {
        color: '#000',
        fontSize: 17
    },
})