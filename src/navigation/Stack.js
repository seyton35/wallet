import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";

import Home from "../screens/HomeScreen";
import Currency from "../screens/CurrencyScreen";
import Error from "../screens/ErrorScreen";
import ServicesScreen from "../screens/ServicesScreen";

import TransferBetweenCurrencyScreen from "../screens/money_transfer/TransferBetweenCurrencyesScreen";
import ClientMoneyRequestScreen from "../screens/money_transfer/ClientMoneyRequestScreen";
import LoginScreen from "../screens/sign/LoginScreen";
import RegisterScreen from "../screens/sign/RegisterScreen";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const MyStack = createNativeStackNavigator()

export default function Stack() {

    let initialRouteName ='login'
    const isLogined = useSelector(s=>s.state.isLogined)
    console.log(isLogined);

    useEffect(() => {
      if(isLogined){
        initialRouteName= 'home'
      }
    }, [isLogined])
    

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <NavigationContainer>
                <MyStack.Navigator
                    initialRouteName={initialRouteName.current}
                >
                    <MyStack.Screen
                        name="home"
                        component={Home}
                        options={{ title: 'Wallet' }}
                    ></MyStack.Screen>
                    <MyStack.Screen
                        name="currency"
                        component={Currency}
                        options={{ title: 'счет' }}
                    ></MyStack.Screen>
                    <MyStack.Screen
                        name="error"
                        component={Error}
                    ></MyStack.Screen>
                    <MyStack.Screen
                        name="services"
                        component={ServicesScreen}
                        options={{ title: 'способы пополнения' }}
                    ></MyStack.Screen>

                    <MyStack.Group>
                        <MyStack.Screen
                            name="login"
                            component={LoginScreen}
                            options={{ title: 'Wallet' }}
                        ></MyStack.Screen>
                        <MyStack.Screen
                            name="register"
                            component={RegisterScreen}
                            options={{ title: 'Wallet' }}
                        ></MyStack.Screen>
                    </MyStack.Group>

                    <MyStack.Group>
                        <MyStack.Screen
                            name="transferBetweenCurrencyes"
                            component={TransferBetweenCurrencyScreen}
                            options={{ title: 'перевод со своего счёта' }}
                        ></MyStack.Screen>
                        <MyStack.Screen
                            name="clientMoneyRequest"
                            component={ClientMoneyRequestScreen}
                            options={{ title: 'выставление счета' }}
                        ></MyStack.Screen>
                    </MyStack.Group>
                </MyStack.Navigator>
            </NavigationContainer>
        </View>
    )
}