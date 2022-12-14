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
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e.message);
    }
}

export const removeData = async(key)=>{
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        console.log(e.message);
    }
}