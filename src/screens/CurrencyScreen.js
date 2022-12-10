import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import Dialog from 'react-native-dialog'
import { useState } from "react";


export default function Currency({ navigation }) {
    const [dialogVisible, setDialogVisible] = useState(false)

    const { type , value } = useSelector(s => s.currency.selectedCurrency)

    function showDialog() {
        setDialogVisible(true)
    }

    function closeDialog() {
        setDialogVisible(false)
    }

    return (
        <View style={styles.container}>

            <View>
                <Dialog.Container
                    visible={dialogVisible}
                    onBackdropPress={closeDialog}
                >
                    <Dialog.Title>Account delete</Dialog.Title>
                    <Dialog.Description>
                        Do you want to delete this account? You cannot undo this action.
                    </Dialog.Description>
                    <Dialog.Button label="Cancel" onPress={closeDialog} />
                    {/* <Dialog.Button label="Delete" /> */}
                </Dialog.Container>
            </View>


            <Text>{value}</Text>
            <Text>{type}</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('services')}
            >
                <Text>пополнить</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8eceb8',
        padding: 20,
        margin: 20,
        maxHeight: 200,
    }
})