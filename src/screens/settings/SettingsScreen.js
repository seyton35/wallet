import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../../components/Header'
import Txt from '../../components/Txt'
import BottomTabsPanel from '../../components/BottomTabsPanel'
import ListArrowButton from '../../components/ListArrowButton'
import SliderCheckBox from '../../components/SliderCheckBox'

import { deleteAccount, postPushNotificationSettings } from '../../store/slices/stateReducer'
import { translate } from '../../middleWare/translator/translator'

export default function SettingsScreen() {
    const { refill, writeOff, incomingBill, promotions } = useSelector(s => s.state.pushNotificationSettings)
    const currencyAccountsArray = useSelector(s => s.currency.currencyArray)
    const { language } = useSelector(s => s.state)

    const dispatch = useDispatch()

    const checkBoxTapHandler = (flag, title) => {
        dispatch(postPushNotificationSettings({
            field: title,
            flag
        }))
    }

    function tr(text) {
        return translate(text, language)
    }

    const deleteAccountBtnHendler = () => {
        Alert.alert(
            tr("Удалить кошелек"),
            tr("Вы действительно хотите удалить кошелек?"),
            [
                {
                    text: tr('отмена'),
                    onPress: null
                },
                {
                    text: tr('да'),
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
                tr("Удалить кошелек"),
                tr("В кошельке еще остались деньги, рекомендуем вывести их перед удалением"),
                [
                    {
                        text: tr('хорошо'),
                        onPress: null
                    },
                    {
                        text: tr('удалить сейчас'),
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
            tr("Внимание!"),
            tr("Удаление кошелька не может быть отменено!\nПодолжить?"),
            [
                {
                    text: tr('отмена'),
                    onPress: null
                },
                {
                    text: tr('удалить'),
                    onPress: () => dispatch(deleteAccount())
                }
            ]
        )
    }

    return (
        <View style={styles.container}>
            <Header headerText='Настройки' />

            <ScrollView>
                <ListArrowButton screen='setDefaultCurrency' title='Счет по умолчанию' />

                <View style={styles.block}>
                    <View style={styles.blockLabelBox}>
                        <Txt style={styles.blockLabelTxt}>Push-уведомления</Txt>
                    </View>
                    <View style={styles.blockItemBox}>
                        <Txt style={styles.blockItemTxt}>Пополнение</Txt>
                        <SliderCheckBox check={refill}
                            onPress={() => checkBoxTapHandler(!refill, 'refill')}
                        />
                    </View>
                    <View style={styles.blockItemBox}>
                        <Txt style={styles.blockItemTxt}>Списание</Txt>
                        <SliderCheckBox check={writeOff}
                            onPress={() => checkBoxTapHandler(!writeOff, 'writeOff')}
                        />
                    </View>
                    <View style={styles.blockItemBox}>
                        <Txt style={styles.blockItemTxt}>Входящий счет</Txt>
                        <SliderCheckBox check={incomingBill}
                            onPress={() => checkBoxTapHandler(!incomingBill, 'incomingBill')}
                        />
                    </View>
                    <View style={styles.blockItemBox}>
                        <Txt style={styles.blockItemTxt}>Новости и акции</Txt>
                        <SliderCheckBox check={promotions}
                            onPress={() => checkBoxTapHandler(!promotions, 'promotions')}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.deleteAccBox}
                    onPress={deleteAccountBtnHendler}
                >
                    <Txt style={styles.deleteAccText}>Удалить кошелек</Txt>
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
        paddingHorizontal: 20,
    },
    deleteAccText: {
        paddingVertical: 10,

        borderTopColor: '#555',
        borderTopWidth: .5,
        color: '#555',
        fontSize: 17
    },
})