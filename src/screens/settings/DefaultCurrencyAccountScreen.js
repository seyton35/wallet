import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useState } from 'react'

import CurrencyAccount from '../../components/CurrencyAccount'
import Header from '../../components/Header'
import Txt from '../../components/Txt'
import ModalButtonList from '../../components/ModalButtonList'

import { openCurrencyAccount, postDefaultCurrencyAccount } from '../../store/slices/currencyReducer'
import { setToastAndroidMessage } from '../../store/slices/stateReducer'

export default function DefaultCurrencyAccount() {
    const currencyAccountsArr = useSelector(s => s.currency.currencyArray)
    const { availableCurrencies } = useSelector(s => s.currency)
    const [visible, setVisible] = useState(false)
    const [openCurrencyAccountBtnDisabled, setOpenCurrencyAccountBtnDisabled] = useState(false)

    const { defaultCurrencyAccount } = useSelector(s => s.currency)

    const dispatch = useDispatch()

    const openAccount = (currency, index) => {
        setVisible(false)
        dispatch(openCurrencyAccount(currency))
    }
    const closeModal = () => {
        setVisible(false)
    }

    const getTypes = () => {
        const types = []
        availableCurrencies.map(cur => {
            let flag = true
            for (let i = 0; i < currencyAccountsArr.length; i++) {
                const { type } = currencyAccountsArr[i];
                if (type == cur.type) {
                    flag = false
                }
            }
            if (flag) {
                types.push(cur.type)
            }
        })
        return types
    }

    const openCurrencyBtnHandler = () => {
        let flag = false
        for (let i = 0; i < availableCurrencies.length; i++) {
            let iFlag = false
            const el1 = availableCurrencies[i];
            for (let j = 0; j < currencyAccountsArr.length; j++) {
                const el2 = currencyAccountsArr[j];
                if (el1.type == el2.type) {
                    iFlag = true
                    j = currencyAccountsArr.length
                    continue
                }
            }
            if (iFlag) {
                continue
            }
            flag = true
        }
        if (flag) setVisible(true)
        else {
            dispatch(setToastAndroidMessage('нет доступных валют'))
            setOpenCurrencyAccountBtnDisabled(true)
        }
    }

    const chooseAccount = (acc) => {
        if (acc.type !== defaultCurrencyAccount) {
            dispatch(postDefaultCurrencyAccount({ currency: acc.type }))
        }
    }

    return (
        <View style={styles.container}>
            <ModalButtonList
                data={getTypes()}
                visible={visible}
                onPress={openAccount}
                onClose={closeModal}
            />

            <Header headerText='Счет по умолчанию' />
            <ScrollView style={styles.scrollView}>
                {currencyAccountsArr.map((acc, index) =>
                    <CurrencyAccount
                        key={index}
                        acc={acc}
                        defaultCurrencyAccount={defaultCurrencyAccount}
                        onPress={chooseAccount}
                    />
                )}
                <View style={styles.openCurrency}>
                    <TouchableOpacity style={styles.openCurrencyBtn}
                        disabled={openCurrencyAccountBtnDisabled}
                        onPress={openCurrencyBtnHandler}
                    >
                        <View style={styles.currencyIconBox} >
                            <Icon name='circle' size={40} style={[{ color: '#d3d3d3' }, styles.icon]} />
                            <Icon name='circle' size={35} style={[{ color: '#fff' }, styles.icon]} />
                            <Icon name='plus' size={25} style={[{ color: 'black', }, styles.icon]} />
                        </View>
                        <View style={styles.openCurrencyBox} >
                            <Txt style={styles.openCurrencyLabel}>Открыть счет</Txt>
                        </View>
                    </TouchableOpacity>
                    {openCurrencyAccountBtnDisabled
                        ? <View style={styles.plug}></View>
                        : null
                    }
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
    openCurrency: {
        marginTop: 20
    },
    openCurrencyBtn: {
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
    openCurrencyBox: {
        justifyContent: 'center',
        marginLeft: 20,
    },
    openCurrencyLabel: {
        color: '#000',
        fontSize: 17,
        fontWeight: '700'
    },
    plug: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#fffa',
        // opacity:.3,

        borderRadius: 10
    },
    currencyText: {},
})