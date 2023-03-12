import { Image, ScrollView, StyleSheet, TouchableOpacity, View, } from "react-native"
import { useDispatch, useSelector } from "react-redux"

import Header from "../../components/Header"
import Txt from "../../components/Txt"
import BottomTabsPanel from "../../components/BottomTabsPanel"

import { navigate } from "../../store/slices/stateReducer"
import { LogoAssets } from "../../../assets/logoAssets"

export default function ServicesScreen() {
    const servicesArray = []
    servicesArray.push({ title: 'Перевести на Wallet', screen: 'sendMoney' })

    const dispatch = useDispatch()

    function servicePress(screen) {
        dispatch(navigate(screen))
    }


    return (
        <View style={styles.container}>
            <Header headerText='Услуги' showHeaderButton={false} />

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
                                    <Image
                                        source={LogoAssets['Wallet']}
                                        style={styles.currencyLogoPic}
                                    />
                                </View>
                                <View style={styles.serviceView}>
                                    <Txt style={styles.serviceTxt}>{service.title}</Txt>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
            <BottomTabsPanel />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    serviceItem: {
        flex: 1,
        paddingVertical: 20,
        marginHorizontal: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconBox: {
        paddingHorizontal: 10,
    },
    currencyLogoPic: {
        width: 30,
        height: 30,
        borderRadius: 20,
    },
    serviceView: {
        marginHorizontal: 5,
    },
    serviceTxt: {
        color: '#000',
        fontSize: 17
    }
})