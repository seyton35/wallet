import { StyleSheet, View } from "react-native";

import { useSelector } from "react-redux";

//components
import BottomTab from '../components/BottomTab'
//screens
import Greeting from "../screens/noStack/Greeting";
import Error from "../screens/ErrorScreen";
import Home from "../screens/HomeScreen";
import RegisterScreen from "../screens/sign/RegisterScreen";
import LoginScreen from "../screens/sign/LoginScreen";
import ServicesScreen from "../screens/ServicesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TransferBetweenCurrencyScreen from "../screens/money_transfer/TransferBetweenCurrencyesScreen";
import ClientMoneyRequestScreen from "../screens/money_transfer/ClientMoneyRequestScreen";
import BillPaymentScreen from "../screens/money_transfer/BillPaymentScreen";
import AllBillsScreen from "../screens/AllBilsScreen";
import HistoryScreen from "../screens/HistoryScreen";

export default function Stack() {

    const isLogined = useSelector(s => s.state.isLogined)
    const currentScreen = useSelector(s => s.state.currentScreen)

    function stackNavigator() {
        switch (currentScreen) {
            case 'greeting': return <Greeting />

            case 'home': return <Home />
            case 'service': return <ServicesScreen />
            case 'profile': return <ProfileScreen />
            case 'history': return <HistoryScreen />
            
            case 'login': return <LoginScreen />
            case 'register': return <RegisterScreen />
            
            case 'transferBetweenCurrencyes': return <TransferBetweenCurrencyScreen />
            case 'clientMoneyRequest': return <ClientMoneyRequestScreen />
            case 'billPayment': return <BillPaymentScreen />
            case 'allBills': return <AllBillsScreen />
            case 'error': return <Error />
            default:
                break;
        }
    }


    return (
        <View style={styles.container}>
            {stackNavigator()}
            {isLogined
                ? <View style={styles.tabsView}>
                    <BottomTab tabName='home'></BottomTab>
                    <BottomTab tabName='services'></BottomTab>
                    <BottomTab tabName='history'></BottomTab>
                    <BottomTab tabName='cards'></BottomTab>
                    <BottomTab tabName='profile'></BottomTab>
                </View>
                : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    tabsView: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'row'
    }
})