import { StyleSheet, View } from "react-native";

import { useSelector } from "react-redux";

//components
import BottomTab from '../components/BottomTab'
//screens
import GreetingScreen from "../screens/noStack/GreetingScreen";
import Error from "../screens/ErrorScreen";
//mainScreens
import Home from "../screens/mainScreens/HomeScreen";
import AllServices from "../screens/mainScreens/AllServicesScreen";
import HistoryScreen from "../screens/mainScreens/HistoryScreen";
import Cards from "../screens/mainScreens/CardsScreen";
import ProfileScreen from "../screens/mainScreens/ProfileScreen";
//auth
import RegisterScreen from "../screens/sign/RegisterScreen";
import LoginScreen from "../screens/sign/LoginScreen";
//transaction
import BillPaymentScreen from "../screens/money_transfer/BillPaymentScreen";
import ClientMoneyRequestScreen from "../screens/money_transfer/ClientMoneyRequestScreen";
import CurrencyСonversionScreen from "../screens/money_transfer/CurrencyСonversionScreen";

import ServicesScreen from "../screens/ServicesScreen";
import CurrencyRatesScreen from "../screens/usefull/CurrencyRatesScreen";

import BillInfoScreen from "../screens/billsManagement/BillInfoScreen";
//bill lists
import ActiveBillsScreen from "../screens/ActiveBilsScreen";
import BillCategoriesScreen from "../screens/billsManagement/BillCategoriesScreen";
import BillsListScreen from "../screens/billsManagement/BillsListScreen";

export default function Stack() {

    const currentScreen = useSelector(s => s.state.currentScreen)

    function stackNavigator() {
        switch (currentScreen) {
            case 'greeting': return <GreetingScreen />

            case 'home': return <Home />
            case 'history': return <HistoryScreen />
            case 'allServices': return <AllServices />
            case 'cards': return <Cards />
            case 'profile': return <ProfileScreen />

            case 'login': return <LoginScreen />
            case 'register': return <RegisterScreen />

            case 'billCategories': return <BillCategoriesScreen />
            case 'billsList': return <BillsListScreen />
            case 'billInfo': return <BillInfoScreen />

            case 'service': return <ServicesScreen />
            case 'currencyRates': return <CurrencyRatesScreen />
            case 'currencyСonversion': return <CurrencyСonversionScreen />
            case 'clientMoneyRequest': return <ClientMoneyRequestScreen />
            case 'billPayment': return <BillPaymentScreen />
            case 'activeBills': return <ActiveBillsScreen />
            case 'error': return <Error />
        }
    }

    function showBottomTabs() {
        if (currentScreen == 'home' ||
            currentScreen == 'allServices' ||
            currentScreen == 'profile' ||
            currentScreen == 'cards' ||
            currentScreen == 'history') {
            return (
                <View style={styles.tabsView}>
                    <BottomTab tabName='home'></BottomTab>
                    <BottomTab tabName='allServices'></BottomTab>
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