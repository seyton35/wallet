import { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Animated } from 'react-native'
import { ScalingDot } from "react-native-animated-pagination-dots";

import Currency from './Currency'

export default function CurrencyScrollView({ currencyArray }) {
    const [width, setWidth] = useState(null)
    const scrollX = useRef(new Animated.Value(0)).current

    useEffect(() => {
        setWidth(Dimensions.get('window').width)
    }, [])

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false, }
                )}
            >
                {currencyArray.map((cur, index) => {
                    return (
                        <View
                            style={[styles.scrollItem, { width }]}
                            key={index}
                        >
                            <Currency
                                cur={cur}
                            />

                        </View>
                    )
                })}
            </Animated.ScrollView>
            {/* <View style={styles.}> */}
                <ScalingDot
                    data={currencyArray}
                    scrollX={scrollX}
                    dotStyle={styles.dot}
                    inActiveDotOpacity={0.3}
                    activeDotColor={'#fdbf57'}
                    containerStyle={styles.dotContainer}
                    wormDot
                />
            {/* </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginBottom:10
    },
    scrollItem: {
    },
    dotContainer: {
        bottom:0
    },
    dot: {
        backgroundColor: 'gray',
        width: 7,
        height: 7,
        borderRadius: 10,
        marginHorizontal: 5,
    }
})