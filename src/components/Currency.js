import { View, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch } from "react-redux";
import { countCut, getCurrencySymbol } from "../middleWare/currencyFormater";
import { selectCurrency } from "../store/slices/currencyReducer";
import { navigate } from "../store/slices/stateReducer";
import Txt from "./Txt";


export default function Currency({ cur }) {
    const { count, type } = cur

    const dispatch = useDispatch()

    function goToCurrencyScreen() {
        dispatch(selectCurrency(cur))
        dispatch(navigate('service'))
    }

    return (
        <View style={styles.container}>
            <LinearGradient style={styles.currencyBox}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                colors={['#6ccfff', '#00adfd', '#0088ca']}
            >
                <View style={styles.walletBox}>
                    <Txt style={styles.waletTxt}>{countCut(count)} {getCurrencySymbol(type)}</Txt>
                </View>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={goToCurrencyScreen}
                >
                    <Txt style={styles.btnTxt}>Пополнить кошелек</Txt>
                </TouchableOpacity>
            </LinearGradient>
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