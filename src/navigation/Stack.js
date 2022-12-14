import { StyleSheet, View } from "react-native";

import { useSelector } from "react-redux";

//components
import BottomTab from '../components/BottomTab'
//screens
import GreetingScreen from "../screens/noStack/GreetingScreen";
import Error from "../screens/ErrorScreen";
import Home from "../screens/HomeScreen";
import RegisterScreen from "../screens/sign/RegisterScreen";
import LoginScreen from "../screens/sign/LoginScreen";
import ServicesScreen from "../screens/ServicesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ClientMoneyRequestScreen from "../screens/money_transfer/ClientMoneyRequestScreen";
import BillPaymentScreen from "../screens/money_transfer/BillPaymentScreen";
import ActiveBillsScreen from "../screens/ActiveBilsScreen";
import HistoryScreen from "../screens/HistoryScreen";
import Currency–°onversionScreen from "../screens/money_transfer/Currency–°onversionScreen";
import CurrencyRatesScreen from "../screens/usefull/CurrencyRatesScreen";
import BillCategoriesScreen from "../screens/billsManagement/BillCategoriesScreen";
import BillsListScreen from "../screens/billsManagement/BillsListScreen";
import BillInfoScreen from "../screens/billsManagement/BillInfoScreen";

export default function Stack() {

    const currentScreen = useSelector(s => s.state.currentScreen)

    function stackNavigator() {
        switch (currentScreen) {
            case 'greeting': return <GreetingScreen />

            case 'home': return <Home />
            case 'service': return <ServicesScreen />
            case 'profile': return <ProfileScreen />
            case 'history': return <HistoryScreen />

            case 'login': return <LoginScreen />
            case 'register': return <RegisterScreen />

            case 'billCategories': return <BillCategoriesScreen />
            case 'billsList': return <BillsListScreen />
            case 'billInfo': return <BillInfoScreen />

            case 'currencyRates': return <CurrencyRatesScreen />
            case 'currency–°onversion': return <Currency–°onversionScreen />
            case 'clientMoneyRequest': return <ClientMoneyRequestScreen />
            case 'billPayment': return <BillPaymentScreen />
            case 'activeBills': return <ActiveBillsScreen />
            case 'error': return <Error />
        }
    }

    function showBottomTabs() {
        if (currentScreen == 'home' ||
            currentScreen == 'service' ||
            currentScreen == 'profile' ||
            currentScreen == 'history') {
            return (
                <View style={styles.tabsView}>
                    <BottomTab tabName='home'></BottomTab>
                    <BottomTab tabName='services'></BottomTab>
                    <BottomTab tabName='history'></BottomTab>
                    <BottomTab tabName='cards'></BottomTab>
                    <BottomTab tabName='profile'></BottomTab>
                </View>
            )
        }
    }


    return (
        <View style={styles.container}>
            {stackNavigator()}
            {showBottomTabs()}
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