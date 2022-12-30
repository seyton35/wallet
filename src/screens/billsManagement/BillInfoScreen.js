import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/AntDesign'

import Header from '../../components/Header'

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
                <Text style={style}>{statusTxt}</Text>
                <Icon style={[style, iconStyle]} name={statusIcon} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Header headerText={headerText}></Header>

            <ScrollView style={styles.screenScroll}>
                <TouchableOpacity style={styles.infoBtn}>
                    <Text style={styles.infoLabel}>Статус</Text>
                    {showStatus()}
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoBtn}>
                    <Text style={styles.infoLabel}>Сумма</Text>
                    <Text style={styles.infoTxt}>{bill.sender.sum} {bill.sender.currency}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoBtn}>
                    <Text style={styles.infoLabel}>Детали платежа</Text>
                    <Text style={styles.infoTxt}>{bill.comment}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoBtn}>
                    <Text style={styles.infoLabel}>Дата счета</Text>
                    <Text style={styles.infoTxt}>{allRus(bill.registerDate)}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoBtn}>
                    <Text style={styles.infoLabel}>Выставлен</Text>
                    <Text style={styles.infoTxt}>{bill.sender.number}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoBtn}>
                    <Text style={styles.infoLabel}>Адресат</Text>
                    <Text style={styles.infoTxt}>{bill.receiver.number}</Text>
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