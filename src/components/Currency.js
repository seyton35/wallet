import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Currency({ cur, navigate }) {
    const { count, type } = cur
    return (
        <View style={styles.container}>
            <Text style={styles.walet}>{type}</Text>
            <Text style={styles.walet}>{count.toFixed(3)}</Text>

            <TouchableOpacity
            style={styles.btn}
                onPress={navigate}
            >
                <Text style={styles.btnTxt}>поополнить</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginLeft: 20,
        marginRight: 120,
        padding: 10,
        width: 350,// TODO: динамические стили
        height:130,
        backgroundColor: "#fdbf57",
        borderRadius: 10,
    },
    walet: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
    },
    btn:{
        borderRadius:10,
        backgroundColor:'#fff',
        alignItems:'center',
        padding:5,
        marginLeft:30,
        marginRight:30,
        margin:5
        
    },
    btnTxt:{
        color:'#000',
        fontSize:17
    }
})