import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import * as SecureStore from "expo-secure-store";

interface Storage {
  key: string;
  value: string;
}

interface value {
  value: string;
  timestamp: number;
}

export async function saveToStorage({ key, value }: Storage) {
  try {
    const item: value = {
      value,
      timestamp: Date.now()
    }
    await AsyncStorage.setItem(key, JSON.stringify(item));
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function removeFromStorage({ key }: Storage) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getFromStorage({ key }: Storage) {
  try {
    const stored = await AsyncStorage.getItem(key);
    const item = JSON.parse(stored as string) as value;
    const now = moment(Date.now());
    const storedTime = moment(item.timestamp);
    const isExpired = now.diff(storedTime, "minutes") > 30;

    if (!item) return null;

    if (isExpired) {
      removeFromStorage(key as any);
      return null;
    }

    return item.value;

  } catch (error: any) {
    throw new Error(error);
  }
}

export async function removeAllFromStorage() {
  try {
    await AsyncStorage.clear();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function saveSecurely({ key, value }: Storage) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function getSecurely({ key }: Storage) {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteSecurely({ key }: Storage) {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error: any) {
    throw new Error(error);
  }
}