import { StyleSheet, View } from "react-native";

import { useSelector } from "react-redux";

// components
import BottomTab from '../components/BottomTab'
// screens
import GreetingScreen from "../screens/noStack/GreetingScreen";
import Error from "../screens/ErrorScreen";
// mainScreens
import Home from "../screens/mainScreens/HomeScreen";
import AllServices from "../screens/mainScreens/AllServicesScreen";
import HistoryScreen from "../screens/mainScreens/HistoryScreen";
import Cards from "../screens/mainScreens/CardsScreen";
import ProfileScreen from "../screens/mainScreens/ProfileScreen";
// auth
import RegisterScreen from "../screens/sign/RegisterScreen";
import LoginScreen from "../screens/sign/LoginScreen";
// transaction
import BillPaymentScreen from "../screens/money_transfer/BillPaymentScreen";
import ClientMoneyRequestScreen from "../screens/money_transfer/ClientMoneyRequestScreen";
import CurrencyСonversionScreen from "../screens/money_transfer/CurrencyСonversionScreen";
import SendMoneyScreen from "../screens/money_transfer/SendMoneyScreen";
// currency
import ServicesScreen from "../screens/ServicesScreen";

import BillInfoScreen from "../screens/billsManagement/BillInfoScreen";
//usefull 
import CurrencyRatesScreen from "../screens/usefull/CurrencyRatesScreen";
import AboutScreen from "../screens/usefull/AboutScreen";
// bill lists
import ActiveBillsScreen from "../screens/ActiveBilsScreen";
import BillCategoriesScreen from "../screens/billsManagement/BillCategoriesScreen";
import BillsListScreen from "../screens/billsManagement/BillsListScreen";
// settings
import DefaultCurrencyAccount from "../screens/settings/DefaultCurrencyAccountScreen";
import HelpScreen from "../screens/HelpScreen";
import SettingsScreen from "../screens/settings/SettingsScreen";

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
            case 'about': return <AboutScreen />
            case 'currencyRates': return <CurrencyRatesScreen />
            case 'sendMoney': return <SendMoneyScreen />
            case 'currencyСonversion': return <CurrencyСonversionScreen />
            case 'clientMoneyRequest': return <ClientMoneyRequestScreen />
            case 'billPayment': return <BillPaymentScreen />
            case 'activeBills': return <ActiveBillsScreen />
            case 'error': return <Error />

            case 'setDefaultCurrency': return <DefaultCurrencyAccount />
            case 'settings': return <SettingsScreen />
            case 'help': return <HelpScreen />
        }
    }

    return (
        <View style={styles.container}>
            {stackNavigator()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
})