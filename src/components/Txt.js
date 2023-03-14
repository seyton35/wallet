import { Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import { translate } from '../middleWare/translator/translator'

export default function Txt({ children, style, noTranslate = false, slice, ...props }) {
    const { language } = useSelector(s => s.state)
    return (
        <Text style={[styles.text, style]} {...props}>
            {noTranslate
                ? children
                : translate(children, lang = language, slice)
            }
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        color: '#000',
        // fontFamily: 'OpenSans',
        fontFamily: 'Ubuntu-Regular',
    },
})