import { Modal, StyleSheet,  TouchableOpacity, View } from 'react-native'

import Txt from './Txt'

export default function ModalButtonList({ visible, onPress, data, onClose, animationType = "fade" }) {

    function isVisible() {
        if (!visible) {
            return { display: 'none' }
        }
    }

    return (
        <View style={[styles.container, isVisible()]}>
            <Modal
                animationType={animationType}
                transparent={true}
                visible={visible}
            >
                <TouchableOpacity style={styles.modalBox} onPress={onClose}>
                    {data.map((el, index) =>
                        <TouchableOpacity key={index} style={styles.itemBtn}
                            onPress={() => onPress(el, index)}
                        >
                            <Txt style={styles.itemBtnText}>{el}</Txt>
                        </TouchableOpacity>
                    )}
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        backgroundColor: '#0004',
        width: '100%',
        height: '100%',
        alignContent: 'center',
        zIndex: 1
    },
    modalBox: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    itemBtn: {
        width: '60%',
        backgroundColor: '#fff',
        padding: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: .7
    },
    itemBtnText: {
        color: '#000',
        fontSize: 17
    },
})