import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'

export default function LoadingSpiner({ size }) {

    const progress = useState(new Animated.Value(0))[0]

    useEffect(() => {
        Animated.loop(
            Animated.timing(
                progress, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }
            )
        ).start()
    }, [])

    const spin = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    return (
        <View>
            <Animated.View style={{
                transform: [{ rotate: spin }]
            }}>
                <Icon name='loading1' style={{ color: 'black', fontSize: size }}></Icon>
            </Animated.View>
        </View>
    )
}