import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import DatePicker from 'react-native-date-picker'

const DAY_MC = 86400000
const MONTH_MC = 2592000000

export default function ModalRangeDatePicker({ setDate, onCancelPress }) {
    const [date1, setDate1] = useState(new Date(Date.now() - MONTH_MC));
    const [date2, setDate2] = useState(new Date());
    const [dateOnFocus, setDateOnFocus] = useState('date1');

    function confirmBtnHandler() {
        setDate({ date1, date2 })
    }

    function dateChange(date) {
        if (dateOnFocus == 'date1') {
            setDate1(date)
            if (date > date2) setDate2(new Date(date.getTime() + DAY_MC))
            if ((date.getTime() + MONTH_MC) < date2) setDate2(new Date(date.getTime() + MONTH_MC))

        } else {
            setDate2(date)
            if ((date - date1) > MONTH_MC) setDate1(new Date(date.getTime() - MONTH_MC))
            if (date < date1) setDate1(new Date(date.getTime() - DAY_MC))
        }
    }

    function showFocusDate() {
        if (dateOnFocus == 'date1') {
            return date1
        } else return date2
    }

    function cancelBtnHandler() {
        onCancelPress()
    }

    function isFocusedDate(key) {
        const style = {
            backgroundColor: '#00abfd',
        }
        if (key == dateOnFocus) {
            return style
        }
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                // transparent={true}
                visible={true}
            >
                <View style={styles.modalView}>

                    <Pressable onPress={() => setDateOnFocus('date1')} style={[styles.dateView, isFocusedDate('date1')]}>
                        <Text style={styles.dateTxt}>{date1.toLocaleDateString()}</Text>
                    </Pressable>
                    <Pressable onPress={() => setDateOnFocus('date2')} style={[styles.dateView, isFocusedDate('date2')]}>
                        <Text style={styles.dateTxt}>{date2.toLocaleDateString()}</Text>
                    </Pressable>

                    <View style={styles.datePickerView}>
                        <DatePicker
                            date={showFocusDate()}
                            onDateChange={dateChange}
                            // maximumDate={new Date(Date.now())}
                            mode="date"
                        />
                    </View>

                    <View style={styles.modalBtnBox}>
                        <Pressable style={styles.modalBtn} onPress={cancelBtnHandler}>
                            <Text style={styles.modalBtnTxt}>отмена</Text>
                        </Pressable>
                        <Pressable style={styles.modalBtn} onPress={confirmBtnHandler}>
                            <Text style={styles.modalBtnTxt}>готово</Text>
                        </Pressable>
                    </View>

                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // position:"absolute",
        // justifyContent: "center",
        // alignItems: "center",
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
        flex: 1
    },
    dateView: {
        margin: 2,
        padding: 5,
        borderColor: '#005bfd',
        borderWidth: 1
    },
    dateTxt: {
        color: '#000',
        fontSize: 17
    },

    datePickerView: {
        width: '50%',
        alignItems: 'center'
        // height: '80%',
    },

    modalView: {
        alignItems: "center",
        justifyContent: 'center',
        alignSelf: 'center',
        elevation: 5,
        width: '90%',
        // height: '0%',
        // backgroundColor:'gray'
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },

    modalBtnBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'flex-end',
        right: 30
    },
    modalBtn: {
        padding: 5
    },
    modalBtnTxt: {
        color: '#00abfd',
        fontSize: 17,
    },
});
