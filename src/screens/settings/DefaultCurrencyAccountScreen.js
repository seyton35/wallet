import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'

import CurrencyAccount from '../../components/CurrencyAccount'
import Header from '../../components/Header'
import { postDefaultCurrencyAccount } from '../../store/slices/currencyReducer'

export default function DefaultCurrencyAccount() {
    const currencyAccountsArr = useSelector(s => s.currency.currencyArray)
    const { availableCurrencies } = useSelector(s => s.currency)
    const [pickerCurrency, setPickerCurrency] = useState()

    const { defaultCurrencyAccount } = useSelector(s => s.currency)

    const dispatch = useDispatch()

    const chooseAccount = (acc) => {
        console.log(acc);
        if (acc.type !== defaultCurrencyAccount) {   
            dispatch(postDefaultCurrencyAccount({ currency: acc.type }))
        }
    }

    return (
        <View style={styles.container}>
            <Header headerText='счет по умолчанию' />
            {/* <Picker
                selectedValue={pickerCurrency}
                onValueChange={setPickerCurrency}
            >
                {
                    availableCurrencies.map((cur, index) => {
                        return (
                            <Picker.Item
                                key={index}
                                label={cur.type}
                                value={cur.type}
                            />
                        )
                    })
                }
            </Picker> */}
            <ScrollView style={styles.scrollView}>
                {currencyAccountsArr.map((acc, index) =>
                    <CurrencyAccount
                        key={index}
                        acc={acc}
                        defaultCurrencyAccount={defaultCurrencyAccount}
                        onPress={chooseAccount}
                    />
                )}
                <View style={styles.currencyItem}>
                    <TouchableOpacity style={styles.currencyBtn}>
                        <View style={styles.currencyIconBox} >
                            <Icon name='circle' size={40} style={[{ color: '#d3d3d3' }, styles.icon]} />
                            <Icon name='circle' size={35} style={[{ color: '#fff' }, styles.icon]} />
                            <Icon name='plus' size={25} style={[{ color: 'black', }, styles.icon]} />
                        </View>
                        <View style={styles.currencyInfoBox} >
                            <Text style={styles.currencyLabel}>Открыть счет</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%'
    },
    scrollView: {
    },
    currencyItem: {
        paddingTop: 20
    },
    currencyBtn: {
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row'
    },
    currencyIconBox: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    icon: {
        position: 'absolute',
    },
    currencyInfoBox: {
        justifyContent: 'center',
        marginLeft: 20,
    },
    currencyLabel: {
        color: '#000',
        fontSize: 17,
        fontWeight: '700'
    },
    currencyText: {},
})