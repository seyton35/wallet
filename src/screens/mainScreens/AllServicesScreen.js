import { ScrollView, StyleSheet, View } from 'react-native'
import BottomTabsPanel from '../../components/BottomTabsPanel'
import Header from '../../components/Header'
import InDeveloping from '../../components/InDeveloping'

export default function AllServices() {
    return (
        <View style={styles.container}>
            <Header headerText='Услуги' showHeaderButton={false} />
            <ScrollView>
                <InDeveloping />
            </ScrollView>
            <BottomTabsPanel />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
})