import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../../components/Header'
import BottomTabsPanel from '../../components/BottomTabsPanel'
import ListArrowButton from '../../components/ListArrowButton'
import SliderCheckBox from '../../components/SliderCheckBox'
import { deleteAccount, postPushNotificationSettings } from '../../store/slices/stateReducer'

export default function SettingsScreen() {
    const { refill, writeOff, incomingBill, promotions } = useSelector(s => s.state.pushNotificationSettings)
    const currencyAccountsArray = useSelector(s => s.currency.currencyArray)

    const dispatch = useDispatch()

    const checkBoxTapHandler = (flag, title) => {
        dispatch(postPushNotificationSettings({
            field: title,
            flag
        }))
    }

    const deleteAccountBtnHendler = () => {
        Alert.alert(
            "Удалить кошелек",
            "Вы действительно хотите удалить кошелек?",
            [
                {
                    text: 'отмена',
                    onPress: null
                },
                {
                    text: 'да',
                    onPress: currencyCaution
                }
            ]
        )
    }

    const currencyCaution = () => {
        let flag = false
        for (let i = 0; i < currencyAccountsArray.length; i++) {
            const currency = currencyAccountsArray[i];
            if (currency.count > 0) {
                flag = true
                i = currencyAccountsArray.length
                continue
            }
        }
        if (flag) {
            Alert.alert(
                "Удалить кошелек",
                "В кошельке еще остались деньги, рекомендуем вывести их перед удалением",
                [
                    {
                        text: 'хорошо',
                        onPress: null
                    },
                    {
                        text: 'все равно удалить',
                        onPress: acceptDeleting
                    }
                ]
            )
        } else {
            acceptDeleting()
        }
    }

    const acceptDeleting = () => {
        Alert.alert(
            "Внимание!",
            "Удаление кошелька не может быть отменено!\nПодолжить?",
            [
                {
                    text: 'отмена',
                    onPress: null
                },
                {
                    text: 'удалить',
                    onPress: () => dispatch(deleteAccount())
                }
            ]
        )
    }

    return (
        <View style={styles.container}>
            <Header headerText='Нстройки' />

            <ScrollView>
                <ListArrowButton screen='setDefaultCurrency' title='Счет по умолчанию' />

                <View style={styles.block}>
                    <View style={styles.blockLabelBox}>
                        <Text style={styles.blockLabelTxt}>Push-уведомления</Text>
                    </View>
                    <View style={styles.blockItemBox}>
                        <Text style={styles.blockItemTxt}>Пополнение</Text>
                        <SliderCheckBox check={refill}
                            onPress={() => checkBoxTapHandler(!refill, 'refill')}
                        />
                    </View>
                    <View style={styles.blockItemBox}>
                        <Text style={styles.blockItemTxt}>Списание</Text>
                        <SliderCheckBox check={writeOff}
                            onPress={() => checkBoxTapHandler(!writeOff, 'writeOff')}
                        />
                    </View>
                    <View style={styles.blockItemBox}>
                        <Text style={styles.blockItemTxt}>Входящий счет</Text>
                        <SliderCheckBox check={incomingBill}
                            onPress={() => checkBoxTapHandler(!incomingBill, 'incomingBill')}
                        />
                    </View>
                    <View style={styles.blockItemBox}>
                        <Text style={styles.blockItemTxt}>Новости и акции</Text>
                        <SliderCheckBox check={promotions}
                            onPress={() => checkBoxTapHandler(!promotions, 'promotions')}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.deleteAccBox}
                    onPress={deleteAccountBtnHendler}
                >
                    <Text style={styles.deleteAccText}>Удалить кошелек</Text>
                </TouchableOpacity>
            </ScrollView>

            <BottomTabsPanel></BottomTabsPanel>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    block: {},
    blockLabelBox: {
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    blockLabelTxt: {
        color: '#000',
        fontSize: 23,
        fontWeight: "bold"
    },
    blockItemBox: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    blockItemTxt: {
        color: '#000',
        fontSize: 17,
        fontWeight: '600'
    },
    deleteAccBox: {
        paddingHorizontal: 10,
    },
    deleteAccText: {
        paddingVertical: 10,

        borderTopColor: '#555',
        borderTopWidth: .5,
        color: '#555',
        fontSize: 17
    },
})