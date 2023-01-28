import { StyleSheet, View } from 'react-native'
import Header from '../../components/Header'
import InDeveloping from '../../components/InDeveloping'

export default function AllServices() {
    return (
        <View style={styles.container}>
            <Header headerText='Услуги' showHeaderButton={false} />
            <InDeveloping />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})