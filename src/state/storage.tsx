import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
    id: 'podcast_ai_storage',
    encryptionKey: 'podcast_ai_encryption_key',

});

export const mmkvStorage = {
    setItem: (key: string, value: string) => {
        storage.set(key, value);
    },
    getItem: (key: string) => {
        const value = storage.getString(key);
        return value ?? null; // ✅ co
    },
    removeItem: (key: string) => {
        storage.delete(key);
    },
    clear: () => {
        storage.clearAll();
    },
}; // Exporting the storage instance for direct access if needed

