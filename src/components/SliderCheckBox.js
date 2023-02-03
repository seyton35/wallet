import { useEffect, useRef } from 'react'
import { Animated, Pressable, StyleSheet, View } from 'react-native'

export default function SliderCheckBox({ check, onPress }) {

    const initPosX = () => {
        if (check) return new Animated.Value(20)
        else return new Animated.Value(0)
    }
    const posX = useRef(initPosX()).current

    useEffect(() => {
        if (check) slide(20)
        else slide(0)
    }, [check])

    const slide = (newPosX) => {
        Animated.timing(
            posX, {
            toValue: newPosX,
            duration: 100,
            useNativeDriver: true
        }).start()
    }

    const getCheckboxBackgroundColor = () => {
        if (check == true) return { backgroundColor: '#00abfd' }
        else return { backgroundColor: '#888' }
    }

    return (
        <Pressable onPress={onPress}>
            <View style={[styles.checkBox, getCheckboxBackgroundColor()]}>
                <Animated.View style={[
                    styles.dot,
                    {
                        transform: [{
                            translateX: posX
                        }]
                    }]} />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    checkBox: {
        width: 50,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        paddingHorizontal: 5
    },
    rim: {

    },
    dot: {
        backgroundColor: '#fff',
        width: 20,
        height: 20,
        borderRadius: 10
    },
})