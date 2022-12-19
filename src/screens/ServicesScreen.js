import { ScrollView, StyleSheet, View, } from "react-native"
import Header from "../components/Header"
import Service from "../components/Service"

export default function ServicesScreen() {
    const servicesArray = [
        {title:'перевести со своего счета Wallet', screen:'currencyСonversion'},
        {title:'запросить у другого клиента Wallet', screen:'clientMoneyRequest'},
        {title:'запросить у клиента другого банка', screen:''},
        
    ]
    return (
        <View style={styles.container}>
            <Header headerText="пополнить счет"/>
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
        backgroundColor: '#d3d3d3',
    },
    serviceItem:{
    }
})