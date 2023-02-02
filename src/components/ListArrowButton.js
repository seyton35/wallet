import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import IconEntypo from "react-native-vector-icons/Entypo";

import { navigate } from '../store/slices/stateReducer'

export default function ListArrowButton({ screen, title }) {
    const dispatch = useDispatch()

    return (
        <TouchableOpacity style={styles.btn}
            onPress={() => dispatch(navigate(screen))}
        >
            <Text style={styles.btnTxt}>{title}</Text>
            <IconEntypo name="chevron-right" style={styles.btnIcon} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    usefullBlock: {
    },
    btn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnIcon: {
        color: '#000',
        fontSize: 20,
        paddingRight: 10
    },
    btnTxt: {
        color: '#000',
        fontSize: 17,
        fontWeight:'600'
    },
})