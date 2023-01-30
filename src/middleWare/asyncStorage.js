import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        if (typeof value !== 'string') value = JSON.stringify(value)
        await AsyncStorage.setItem(key, value)
        return 'storing complete'
    } catch (e) {
        console.log(e.message);
    }
}

export const getData = async (key) => {
    try {
        let value = await AsyncStorage.getItem(key)
        try {
            value = JSON.parse(value)
        } catch (e) {
            return value
        }
        return value
    } catch (e) {
        console.log(e.message);
    }
}

export const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        console.log(e.message);
    }
}