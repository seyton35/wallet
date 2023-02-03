import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../../components/Header'
import ListArrowButton from '../../components/ListArrowButton'
import SliderCheckBox from '../../components/SliderCheckBox'
import { postPushNotificationSettings } from '../../store/slices/stateReducer'

export default function SettingsScreen() {
    const { refill, writeOff, incomingBill, promotions } = useSelector(s => s.state.pushNotificationSettings)

    const dispatch = useDispatch()

    const checkBoxTapHandler = (flag, title) => {
        dispatch(postPushNotificationSettings({
            field: title,
            flag
        }))
    }

    return (
        <View>
            <Header headerText='Нстройки' />

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



        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
    usefullitemBtn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
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

})