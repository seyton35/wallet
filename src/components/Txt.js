import { Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import { translate } from '../middleWare/translator/translator'

export default function Txt({ children, ...props }) {
    const { language } = useSelector(s => s.state)
    return (
        <Text style={styles.text} {...props}>
            {translate(children, lang = language)}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        flex: 1,
        fontSize: 14,
        color: '#000'
    },
})