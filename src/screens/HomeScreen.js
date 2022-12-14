import { useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Currency from "../components/Currency";

import { fetchAllCurrencyes, fetchIssuedInvoices, selectCurrency } from "../store/slices/currencyReducer";
import { navigate } from "../store/slices/stateReducer";

export default function Home() {
    const { currencyArray } = useSelector(s => s.currency)
    const { idUser } = useSelector(s => s.state.userData)
    const { issuedInvoicesArr } = useSelector(s => s.currency)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchIssuedInvoices(idUser))
        dispatch(fetchAllCurrencyes(idUser))
    }, [true])

    function goToCurrencyScreen(cur) { 
        dispatch(selectCurrency(cur))
        dispatch(navigate('service'))
    }


    return (
        <View style={styles.container}>
            <Text>my walets</Text>
            <ScrollView
                horizontal={true}
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
            <ScrollView>
                {issuedInvoicesArr.map((issue, index) => {
                    return (
                        <View 
                        style={{}}
                        key={index}>
                            <Text>{issue.currency}</Text>
                            <Text>{issue.sum}</Text>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d3d3d3',
    }
})