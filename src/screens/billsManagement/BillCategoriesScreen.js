import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'

import Header from '../../components/Header'

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
                        <Text style={styles.categoryBtnTxt}>Неоплаченные счета</Text>
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
                        <Text style={styles.categoryBtnTxt}>Выставленные счета</Text>
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
                        <Text style={styles.categoryBtnTxt}>Входящие счета</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.makeBillBtn}
                onPress={(() => dispatch(navigate('clientMoneyRequest')))}
            >
                <Text style={styles.makeBillBtnTxt}>Выставить новый счет</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d3d3d3',
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