import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
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
                <Text style={styles.walet}>{type}</Text>
                <Text style={styles.walet}>{count.toFixed(3)}</Text>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={goToCurrencyScreen}
                >
                    <Text style={styles.btnTxt}>поополнить</Text>
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
        backgroundColor: "#fdbf57",
        padding: 10
    },
    walet: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
    },
    btn: {
        borderRadius: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 5,
        marginLeft: 30,
        marginRight: 30,
        margin: 5

    },
    btnTxt: {
        color: '#000',
        fontSize: 17
    }
})