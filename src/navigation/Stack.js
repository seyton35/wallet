import { StyleSheet, View } from "react-native";

import { useSelector } from "react-redux";


import Greeting from "../screens/noStack/Greeting";
import Error from "../screens/ErrorScreen";

import Home from "../screens/HomeScreen";
import RegisterScreen from "../screens/sign/RegisterScreen";
import LoginScreen from "../screens/sign/LoginScreen";
import ServicesScreen from "../screens/ServicesScreen";

import TransferBetweenCurrencyScreen from "../screens/money_transfer/TransferBetweenCurrencyesScreen";
import ClientMoneyRequestScreen from "../screens/money_transfer/ClientMoneyRequestScreen";


import Header from "../components/Header";

export default function Stack() {

    const currentScreen = useSelector(s => s.state.currentScreen)
    const currentScreenHeaderText = useSelector(s => s.state.currentScreenHeaderText)

    function stackNavigator() {
        switch (currentScreen) {
            case 'greeting': return <Greeting/>

            case 'home': return <Home/>
            case 'error': return <Error/>
            case 'service': return <ServicesScreen/>

            case 'login': return <LoginScreen/>
            case 'register': return <RegisterScreen/>
            case 'transferBetweenCurrencyes': return <TransferBetweenCurrencyScreen/>
            case 'clientMoneyRequest': return <ClientMoneyRequestScreen/>
            default:
                break;
        }
    }


    return (
        <View style={styles.container}>
            <Header headerText={currentScreenHeaderText}></Header>
            {stackNavigator()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    }
})