import { ScrollView, StyleSheet, View, } from "react-native"
import { useSelector } from "react-redux"
import Header from "../components/Header"
import Service from "../components/Service"

export default function ServicesScreen() {
    const currencyAccountsArray = useSelector(s => s.currency.currencyArray)
    const servicesArray = []
    if (currencyAccountsArray.length > 1) {
        servicesArray.push({ title: 'перевести со своего счета Wallet', screen: 'currencyСonversion' })
    }
    servicesArray.push({ title: 'запросить у другого клиента Wallet', screen: 'clientMoneyRequest' })

    return (
        <View style={styles.container}>
            <Header headerText="пополнить счет" />
            <ScrollView
                style={styles.serviceScroll}
            >
                {
                    servicesArray.map((service, index) => {
                        return <Service
                            key={index}
                            service={service}
                        ></Service>
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    serviceItem: {
    }
})