import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import IconEntypo from 'react-native-vector-icons/Entypo'
import BottomTabsPanel from '../../components/BottomTabsPanel'
import Header from '../../components/Header'
import { aboutAssets } from '../../../assets/aboutAssets'

export default function AboutScreen() {

    const OpenURL = ({ url, children, ...props }) => {
        const handlePress = async () => {
            await Linking.openURL(url);
        }
        return (<TouchableOpacity {...props}
            onPress={handlePress}
        >
            <View style={styles.openURLBtnBox}>
                {children}
            </View>
            <View style={styles.openURLBtnBox}>
                <IconEntypo name="chevron-right" style={styles.openURLBtnIcon} />
            </View>
        </TouchableOpacity>)
    }

    return (
        <View style={styles.container}>
            <Header headerText='О прилложении' />
            <ScrollView>
                <OpenURL style={styles.openURLBtn}
                    url={'https://hh.ru/resume/1cfafe96ff09c3a3480039ed1f6e6134326c34'}
                >
                    <Image style={styles.openURLBtnLogo} source={aboutAssets.hhRu}></Image>
                    <Text style={styles.openURLBtnText}>мое резюме</Text>
                </OpenURL>

                <OpenURL style={styles.openURLBtn}
                    url={'https://apps.rustore.ru/app/com.wallet'}
                >
                    <Image style={styles.openURLBtnLogo} source={aboutAssets.ruStore}></Image>
                    <Text style={styles.openURLBtnText}>страница приложения</Text>
                </OpenURL>

                {/* <OpenURL style={styles.openURLBtn}
                    url={'https://apps.rustore.ru/?devId=bhxQcu299ncTTLrbkj9MYt3OV0mL4z29&appType=MAIN'}
                >
                    <Text style={styles.openURLBtnText}>открыть страницу разработчика</Text>
                </OpenURL> */}
            </ScrollView>
            <BottomTabsPanel />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    openURLBtn: {
        backgroundColor: "#fff",
        flexDirection: 'row',
        paddingVertical: 15,
        marginTop: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    openURLBtnBox: {
        flexDirection: 'row',
    },
    openURLBtnText: {
        fontSize: 20,
        color: '#000'
    },
    openURLBtnIcon: {
        paddingHorizontal: 10,
        fontSize: 17,
        color: '#000',
    },
    openURLBtnLogo: {
        width: 30,
        height: 30,
        marginHorizontal: 5
    }
})