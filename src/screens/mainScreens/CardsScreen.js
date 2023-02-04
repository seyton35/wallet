import { ScrollView, StyleSheet, View } from 'react-native'
import BottomTabsPanel from '../../components/BottomTabsPanel'
import Header from '../../components/Header'
import InDeveloping from '../../components/InDeveloping'

export default function Cards() {
    return (
        <View style={styles.container}>
            <Header headerText='Карты' showHeaderButton={false} />
            <ScrollView>
                <InDeveloping />
            </ScrollView>
            <BottomTabsPanel />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:'100%'
    },
})