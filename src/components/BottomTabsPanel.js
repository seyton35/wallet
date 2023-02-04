import { StyleSheet, View } from 'react-native'
import BottomTab from './BottomTab'

export default function BottomTabsPanel() {
    return (
        <View style={styles.tabsContainer}>
            <BottomTab tabName='home'></BottomTab>
            <BottomTab tabName='allServices'></BottomTab>
            <BottomTab tabName='history'></BottomTab>
            <BottomTab tabName='cards'></BottomTab>
            <BottomTab tabName='profile'></BottomTab>
        </View>
    )
}

const styles = StyleSheet.create({
    tabsContainer: {
        flexDirection: 'row',
        bottom: 0,
    }
})