import { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import IconEntypo from "react-native-vector-icons/Entypo";
import IconIonicons from "react-native-vector-icons/Ionicons";
import IconAntDesign from "react-native-vector-icons/AntDesign";

import Header from "../../components/Header";
import Txt from "../../components/Txt";
import Bill from "../../components/Bill";
import CurrencyScrollView from "../../components/CurrencyScrollView";
import BottomTabsPanel from "../../components/BottomTabsPanel";

import { fetchActiveBills, fetchAllCurrencyes } from "../../store/slices/currencyReducer";
import { navigate } from "../../store/slices/stateReducer";
import { translate } from "../../middleWare/translator/translator";

export default function Home() {
    const [refreshing, setRefreshing] = useState(false)

    const { currencyArray, activeBills } = useSelector(s => s.currency)
    const { language } = useSelector(s => s.state)
    const { idUser } = useSelector(s => s.state.userData)

    const dispatch = useDispatch()

    useEffect(() => {
        initHome()
    }, [true])

    function initHome() {
        dispatch(fetchActiveBills(idUser))
        dispatch(fetchAllCurrencyes(idUser))
    }

    function onRefresh() {
        setRefreshing(true)
        initHome()
        setRefreshing(false)
    }

    function allBillsBtnHandler() {
        dispatch(navigate('activeBills'))
    }

    return (
        <View style={styles.container}>
            <Header showHeaderButton={false} />

            <FlatList
                data={[1]}
                renderItem={() =>
                    <View style={styles.screenScroll}>
                        <CurrencyScrollView
                            currencyArray={currencyArray}
                        />
                        {activeBills.length > 0
                            ?
                            <View style={styles.issuesScroll}>
                                <Txt style={styles.issuesScrollTxt}>
                                    {function () {
                                        const len = activeBills.length
                                        if (len == 1) return len + ' ' + translate('неоплаченный счет', language)
                                        else if (5 > len || len > 1) return len + ' ' + translate('неоплаченных счета',language)
                                        else return len + ' ' + translate('неоплаченных счетов',language)
                                    }()}
                                </Txt>
                                {activeBills.map((bill, index) => {
                                    if (index >= 3) {
                                        return null
                                    } else {
                                        return (
                                            <Bill bill={bill} key={index}></Bill>
                                        )
                                    }
                                })}
                                {activeBills.length > 3
                                    ?
                                    <TouchableOpacity style={styles.allBillsBtn}
                                        onPress={allBillsBtnHandler}
                                    >
                                        <Txt style={styles.allIssuesBtnTxt}>Все счета</Txt>
                                    </TouchableOpacity>
                                    : null
                                }
                            </View>
                            : null
                        }

                        <View style={styles.usefullBlock}>
                            <View style={styles.blockLabelBox}>
                                <Txt style={styles.blockLabelTxt}>Полезное</Txt>
                            </View>
                            <TouchableOpacity style={styles.usefullitemBtn}
                                onPress={() => dispatch(navigate('billCategories'))}
                            >
                                <View style={styles.usefullitemBox}>
                                    <IconIonicons name="file-tray-full-outline" style={styles.usefullitemIcon} />
                                    <Txt style={styles.usefullitemTxt}>счета к оплате</Txt>
                                </View>
                                <IconEntypo name="chevron-right" style={styles.usefullitemIcon} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.usefullitemBtn}
                                onPress={() => dispatch(navigate('currencyRates'))}
                            >
                                <View style={styles.usefullitemBox}>
                                    <IconIonicons name="bar-chart-outline" style={styles.usefullitemIcon} />
                                    <Txt style={styles.usefullitemTxt}>курсы валют</Txt>
                                </View>
                                <IconEntypo name="chevron-right" style={styles.usefullitemIcon} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.usefullitemBtn}
                                onPress={() => dispatch(navigate('about'))}
                            >
                                <View style={styles.usefullitemBox}>
                                    <IconAntDesign name="questioncircleo" style={styles.usefullitemIcon} />
                                    <Txt style={styles.usefullitemTxt}>о приложении</Txt>
                                </View>
                                <IconEntypo name="chevron-right" style={styles.usefullitemIcon} />
                            </TouchableOpacity>
                        </View>

                    </View >
                }
                refreshing={refreshing}
                onRefresh={onRefresh}
            />

            <BottomTabsPanel />

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height: '100%'
    },
    blockLabelBox: {
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    blockLabelTxt: {
        color: '#000',
        fontSize: 23,
        fontWeight: "bold"
    },

    issuesScroll: {
        backgroundColor: '#fff',
        width: '90%',
        marginHorizontal: 20,
        borderRadius: 10,
        padding: 20,
    },
    issuesScrollTxt: {
        color: '#000',
        fontSize: 17
    },
    allBillsBtn: {
        padding: 10,
        marginTop: 5,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 20
    },
    allIssuesBtnTxt: {
        color: '#000',
        fontSize: 17
    },

    usefullBlock: {
    },
    usefullitemBtn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    usefullitemBox: {
        flexDirection: 'row'
    },
    usefullitemIcon: {
        color: '#000',
        fontSize: 20,
        paddingRight: 10
    },
    usefullitemTxt: {
        color: '#000',
        fontSize: 17
    },
})