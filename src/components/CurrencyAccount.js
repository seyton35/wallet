import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { countCut, getCurrencySymbol } from '../middleWare/currencyFormater'

export default function CurrencyAccount({ acc, defaultCurrencyAccount, onPress }) {
    return (
        <View style={styles.currencyItem}>
            <TouchableOpacity style={styles.currencyBtn}
                onPress={()=>onPress(acc)}
            >
                <View style={styles.currencyInfoBox} >
                    {defaultCurrencyAccount == acc.type
                        ? <Icon name='check-circle' size={35} style={[{ color: 'green' }, styles.icon]} />
                        : <Icon name='checkbox-blank-circle' size={35} style={[{ color: '#d3d3d3' }, styles.icon]} />
                    }
                </View>
                <View style={styles.currencyInfoBox} >
                    <Text style={styles.currencyLabel}>{countCut(acc.count)} {getCurrencySymbol(acc.type)}</Text>
                    <Text style={styles.currencyText}>
                        {defaultCurrencyAccount == acc.type
                            ? 'Остновной'
                            : 'Дополнительный'
                        } счет в {acc.type}
                    </Text>
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
    currencyText: {},
})