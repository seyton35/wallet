import { Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import { translate } from '../middleWare/translator/translator'

export default function Txt({ children, noTranslate = false, slice = false, ...props }) {
    const { language } = useSelector(s => s.state)

    if (slice) {
        const arr = children.split(' ')
        const res = arr.map(el => {
            return translate(el, language)
        })
        children = res.join(' ')
    }

    return (
        <Text style={styles.text} {...props}>
            {noTranslate
                ? children
                : translate(children, lang = language)
            }
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