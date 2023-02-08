import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { countCut, getCurrencySymbol } from "../middleWare/currencyFormater";
import { selectCurrency } from "../store/slices/currencyReducer";
import { navigate } from "../store/slices/stateReducer";


export default function Currency({ cur }) {
    const { count, type } = cur

    const dispatch = useDispatch()

    function goToCurrencyScreen() {
        dispatch(selectCurrency(cur))
        dispatch(navigate('service'))
    }

    return (
        <View style={styles.container}>
            <View style={styles.currencyBox}>
                <View style={styles.walletBox}>
                    <Text style={styles.waletTxt}>{countCut(count)} {getCurrencySymbol(type)}</Text>
                </View>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={goToCurrencyScreen}
                >
                    <Text style={styles.btnTxt}>Поополнить кошелек</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 10,
    },
    currencyBox: {
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: "#00abfd",
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    walletBox: {
        marginVertical: 30
    },
    waletTxt: {
        color: '#fff',
        fontSize: 25,
        fontWeight: "900",
    },
    btn: {
        borderRadius: 30,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 7,
        paddingHorizontal: 20,
        marginHorizontal: 30,
        marginBottom: 20

    },
    btnTxt: {
        color: '#000',
        fontSize: 17,
    }
})