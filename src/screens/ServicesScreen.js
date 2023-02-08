import { ScrollView, StyleSheet, Text, TouchableOpacity, View, } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import OcticonsIcon from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import Header from "../components/Header"
import { navigate } from "../store/slices/stateReducer"

export default function ServicesScreen() {
    const currencyAccountsArray = useSelector(s => s.currency.currencyArray)
    const servicesArray = []
    if (currencyAccountsArray.length > 1) {
        servicesArray.push({ title: 'перевести со своего счета Wallet', screen: 'currencyСonversion' })
    }
    servicesArray.push({ title: 'запросить у другого клиента Wallet', screen: 'clientMoneyRequest' })

    const dispatch = useDispatch()

    function servicePress(screen) {
        dispatch(navigate(screen))
    }

    const showIcon = (screen) => {
        switch (screen) {
            case 'currencyСonversion': return <OcticonsIcon name='arrow-switch' style={styles.icon} />
            case 'clientMoneyRequest': return <MaterialCommunityIcon name='handshake-outline' style={styles.icon} />
        }
    }

    return (
        <View style={styles.container}>
            <Header headerText="пополнить счет" />
            <ScrollView
                style={styles.serviceScroll}
            >
                {
                    servicesArray.map((service, index) => {
                        return (
                            <TouchableOpacity style={styles.serviceItem}
                                key={index}
                                onPress={() => servicePress(service.screen)}
                            >
                                <View style={styles.iconBox}>
                                    {showIcon(service.screen)}
                                </View>
                                <View style={styles.serviceView}>
                                    <Text style={styles.serviceTxt}>{service.title}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    serviceItem: {
        flex: 1,
        paddingVertical:20,
        marginHorizontal: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconBox: {
        paddingHorizontal: 10,
    },
    icon: {
        color: '#000',
        fontSize: 25,
    },
    serviceView: {
        marginHorizontal: 5,
    },
    serviceTxt: {
        color: '#000',
        fontSize: 17
    }
})