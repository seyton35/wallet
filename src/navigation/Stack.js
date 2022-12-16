import { StyleSheet, View } from "react-native";

import { useSelector } from "react-redux";

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
//components
import BottomTab from '../components/BottomTab'

export default function Stack() {

    const isLogined = useSelector(s => s.state.isLogined)
    const currentScreen = useSelector(s => s.state.currentScreen)

    function stackNavigator() {
        switch (currentScreen) {
            case 'greeting': return <Greeting />

            case 'home': return <Home />
            case 'error': return <Error />
            case 'service': return <ServicesScreen />
            case 'profile': return <ProfileScreen />

            case 'login': return <LoginScreen />
            case 'register': return <RegisterScreen />
            case 'transferBetweenCurrencyes': return <TransferBetweenCurrencyScreen />
            case 'clientMoneyRequest': return <ClientMoneyRequestScreen />
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