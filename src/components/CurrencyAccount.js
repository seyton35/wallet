import { StyleSheet, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { countCut, getCurrencySymbol } from '../middleWare/currencyFormater'

import Txt from './Txt'

export default function CurrencyAccount({ acc, defaultCurrencyAccount, onPress }) {
    return (
        <View style={styles.currencyItem}>
            <TouchableOpacity style={styles.currencyBtn}
                onPress={() => onPress(acc)}
            >
                <View style={styles.currencyInfoBox} >
                    {defaultCurrencyAccount == acc.type
                        ? <MaterialCommunityIcons name='check-circle' size={35} style={[{ color: 'green' }, styles.icon]} />
                        : <MaterialCommunityIcons name='checkbox-blank-circle' size={35} style={[{ color: '#d3d3d3' }, styles.icon]} />
                    }
                </View>
                <View style={styles.currencyInfoBox} >
                    <Txt style={styles.currencyLabel}>{countCut(acc.count)} {getCurrencySymbol(acc.type)}</Txt>
                    <Txt slice style={styles.currencyTxt}>
                        {defaultCurrencyAccount == acc.type
                            ? `Остновной счет в ${acc.type}`
                            : `Дополнительный счет в ${acc.type}`
                        }
                    </Txt>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    currencyItem: {
        paddingTop: 20
    },
    currencyBtn: {
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row'
    },
    currencyInfoBox: {
        justifyContent: 'center',
        paddingLeft: 20
    },
    icon: {
    },
    currencyLabel: {
        color: '#000',
        fontSize: 17,
        fontWeight: '700'
    },
    currencyTxt: {},
})