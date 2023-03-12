import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'

import Header from '../../components/Header'
import Txt from '../../components/Txt'

import { navigate } from '../../store/slices/stateReducer'

export default function BillCategoriesScreen() {

    const dispatch = useDispatch()

    return (
        <View style={styles.container}>
            <Header headerText='Счета'></Header>

            <ScrollView style={styles.screnScroll}>
                <View style={styles.categoryView}>
                    <TouchableOpacity style={styles.categoryBtn}
                        onPress={() => dispatch(navigate('activeBills'))}
                    >
                        <Txt style={styles.categoryBtnTxt}>Неоплаченные счета</Txt>
                    </TouchableOpacity>
                </View>
                <View style={styles.categoryView}>
                    <TouchableOpacity style={styles.categoryBtn}
                        onPress={() => dispatch(navigate({
                            screen: 'billsList', data: {
                                category: 'sended',
                                headerText: 'Выставленные счета'
                            }
                        }))}
                    >
                        <Txt style={styles.categoryBtnTxt}>Выставленные счета</Txt>
                    </TouchableOpacity>
                </View>
                <View style={styles.categoryView}>
                    <TouchableOpacity style={styles.categoryBtn}
                        onPress={() => dispatch(navigate({
                            screen: 'billsList',
                            data: {
                                category: 'received',
                                headerText: 'Входящие счета'
                            }
                        }))}
                    >
                        <Txt style={styles.categoryBtnTxt}>Входящие счета</Txt>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.makeBillBtn}
                onPress={(() => dispatch(navigate('clientMoneyRequest')))}
            >
                <Txt style={styles.makeBillBtnTxt}>Выставить новый счет</Txt>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    screnScroll: {
        width: '100%'
    },
    categoryView: {
        borderBottomWidth: 1,
        borderBottomColor: '#aaa',
    },
    categoryBtn: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    categoryBtnTxt: {
        color: '#000',
        fontSize: 17
    },

    makeBillBtn: {
        backgroundColor: '#00abfd',
        marginTop: 50,
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center',
        width: '100%',
    },
    makeBillBtnTxt: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold'
    },
})