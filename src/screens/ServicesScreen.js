import { ScrollView, StyleSheet, View, } from "react-native"
import Service from "../components/Service"

export default function ServicesScreen() {
    const servicesArray = [
        {title:'перевести со своего счета Wallet', screen:'transferBetweenCurrencyes'},
        {title:'запросить у другого клиента Wallet', screen:'clientMoneyRequest'},
        {title:'запросить у клиента другого банка', screen:''},
        
    ]
    return (
        <View style={styles.container}>
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