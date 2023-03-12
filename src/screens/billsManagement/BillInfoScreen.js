import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'

import Header from '../../components/Header'
import Txt from '../../components/Txt'

import { allRus } from '../../middleWare/dataFormater'

export default function BillInfoScreen() {
    const { bill, headerText } = useSelector(s => s.state.navigationData)

    function showStatus() {
        const { status } = bill
        let style = {}
        let statusTxt = ''
        let statusIcon = ''
        const iconStyle = {
            fontSize: 20
        }
        if (status == 'rejected') {
            style = { color: 'red' }
            statusTxt = 'Отклонен'
            statusIcon = 'exclamationcircle'
        } else if (status == 'active') {
            style = { color: 'orange' }
            statusTxt = 'Выставлен'
            statusIcon = 'clockcircle'
        } else if (status == 'success') {
            style = { color: 'green' }
            statusTxt = 'Оплачен'
            statusIcon = 'circledown'
        }

        return (
            <View style={styles.statusBox}>
                <Txt style={style}>{statusTxt}</Txt>
                <AntDesign style={[style, iconStyle]} name={statusIcon} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Header headerText={headerText}></Header>

            <ScrollView style={styles.screenScroll}>
                <TouchableOpacity style={styles.infoBtn}>
                    <Txt style={styles.infoLabel}>Статус</Txt>
                    {showStatus()}
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoBtn}>
                    <Txt style={styles.infoLabel}>Сумма</Txt>
                    <Txt style={styles.infoTxt}>{bill.sender.sum} {bill.sender.currency}</Txt>
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoBtn}>
                    <Txt style={styles.infoLabel}>Детали платежа</Txt>
                    <Txt style={styles.infoTxt}>{bill.comment}</Txt>
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoBtn}>
                    <Txt style={styles.infoLabel}>Дата счета</Txt>
                    <Txt style={styles.infoTxt}>{allRus(bill.registerDate)}</Txt>
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoBtn}>
                    <Txt style={styles.infoLabel}>Выставлен</Txt>
                    <Txt style={styles.infoTxt}>{bill.sender.number}</Txt>
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoBtn}>
                    <Txt style={styles.infoLabel}>Адресат</Txt>
                    <Txt style={styles.infoTxt}>{bill.receiver.number}</Txt>
                </TouchableOpacity>

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    screenScroll: {
        width: '100%'
    },
    infoBtn: {
        borderBottomWidth: 1,
        borderBottomColor: '#aaa',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    statusBox: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    infoLabel: {
        color: '#000',
        fontSize: 17
    },
    infoTxt: {},

})