import { useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Currency from "../components/Currency";
import { fetchIssuedInvoices, selectCurrency } from "../store/slices/currencyReducer";

export default function Home({ navigation }) {
    const { currencyArray } = useSelector(s => s.currency)
    const { idUser } = useSelector(s => s.state.userData)
    console.log(idUser);
    const { issuedInvoicesArr } = useSelector(s => s.currency)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchIssuedInvoices(idUser))
    }, [true])

    function goToCurrencyScreen(cur) { 
        navigation.navigate('services', { cur })
        dispatch(selectCurrency(cur))
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
        alignItems: 'center'
    }
})