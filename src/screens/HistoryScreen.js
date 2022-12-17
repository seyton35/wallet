import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import Header from '../components/Header'

export default function HistoryScreen() {
    const [paidBills, setPaidBills] = useState([])
    return (
        <View style={styles.container}>
            <Header headerText='История' />

            <ScrollView>
                {paidBills.length > 0
                    ? <>{paidBills.map((bill, index) => {
                        return <View key={index}>
                            <View>
                                <Text>{bill.type}</Text>
                                <Text>{bill.sender.phoneNumber}</Text>
                            </View>
                            <View>
                                <Text>{bill.sum} {bill.currency}</Text>
                            </View>
                        </View>
                    })

                    }</>
                    : <Text>здесь пока ничего нет</Text>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#d3d3d3',
        height: '100%'
    },
})