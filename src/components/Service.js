import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Service({ navigation, service, }) {
    return (
        <TouchableOpacity style={styles.container}
            onPress={() => { navigation.navigate(service.screen) }}// TODO: переход к действию
        >
            <View style={styles.serviceView}>
                <Text style={styles.serviceTxt}>{service.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginLeft: 2,
        marginRight: 2,
        justifyContent: 'center'
    },
    serviceView: {
        marginLeft: 5,
        marginRight: 5,
    },
    serviceTxt: {
        color: '#000',
        fontSize: 17
    }
})