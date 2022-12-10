import { Text, View, StyleSheet } from "react-native";

export default function Error() {
    return(
        <View style={styles.container}>
            <Text style={styles.errHead}>Error</Text>
            <Text style={styles.errText}>В приложении произошла ошибка</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errHead:{
        fontSize:35,
        color:'#000',
        fontWeight:'bold'
    },
    errText:{
        fontSize:25,
        color:'#000'
    },
})