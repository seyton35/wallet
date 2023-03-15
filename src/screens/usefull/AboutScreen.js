import { Image, Linking, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'

import BottomTabsPanel from '../../components/BottomTabsPanel'
import Header from '../../components/Header'
import Txt from '../../components/Txt'

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
                <Entypo name="chevron-right" style={styles.openURLBtnIcon} />
            </View>
        </TouchableOpacity>)
    }

    return (
        <View style={styles.container}>
            <Header headerText='О приложении' />
            <ScrollView>

                <View style={styles.descriptionBlock}>
                    <Txt style={styles.descriptionTitle}>Wallet — не настоящий банк</Txt>
                    <Txt style={styles.descriptionTxt}>
                        данное приложение не производит никаких операций над реальными деньгами.
                    </Txt>
                    <Txt style={styles.descriptionTxt}>
                        разработано мной в качестве pet-проекта для резюме и для повышения навыков программирования
                    </Txt>
                </View>
                <OpenURL style={styles.openURLBtn}
                    url={'https://hh.ru/resume/1cfafe96ff09c3a3480039ed1f6e6134326c34'}
                >
                    <Image style={styles.openURLBtnLogo} source={aboutAssets.hhRu}></Image>
                    <Txt style={styles.openURLBtnText}>мое резюме</Txt>
                </OpenURL>

                <View style={styles.descriptionBlock}>
                    <Txt style={styles.descriptionTxt}>
                        Понравилось приложение? Пожалуйста, оцените его в магазине:
                    </Txt>
                </View>
                <OpenURL style={styles.openURLBtn}
                    url={'https://apps.rustore.ru/app/com.wallet'}
                >
                    <Image style={styles.openURLBtnLogo} source={aboutAssets.ruStore}></Image>
                    <Txt style={styles.openURLBtnText}>страница приложения</Txt>
                </OpenURL>

                <View style={styles.descriptionBlock}>
                    <Txt style={styles.descriptionTxt}>
                        Нашли ошибку или есть предложения по улучшению? свяжитесь со мной:
                    </Txt>
                </View>
                <OpenURL style={styles.openURLBtn}
                    url={'mailto:seyton3500@gmail.com'}
                >
                    <Image style={styles.openURLBtnLogo} source={aboutAssets.gmail}></Image>
                    <Txt style={styles.openURLBtnText}>моя почта</Txt>
                </OpenURL>
            </ScrollView>
            <BottomTabsPanel />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    descriptionBlock: {
        marginTop: 5,
        padding: 10,
        paddingTop: 5,
        backgroundColor: '#fff'
    },
    descriptionTitle: {
        fontSize: 20,
        marginTop: 5
    },
    descriptionTxt: {
        fontSize: 17,
        marginTop: 5
    },
    openURLBtn: {
        backgroundColor: "#fff",
        flexDirection: 'row',
        paddingVertical: 15,
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
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