import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'users.json');



export const initUsersDb = async () => {
    try {
        await fs.access(DB_PATH);
    } catch {
        await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
        await fs.writeFile(DB_PATH, '[]');
    } finally {
        const data = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
        console.log('dn connected, users in DB:', data.length);
    }
};

export const usersStorage = {
    saveUser: async (userData) => {
        const data = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));

        // Ищем существующего пользователя
        const existingIndex = data.findIndex(item => item.id === userData.id);

        if (existingIndex >= 0) {
            // Обновляем существующего
            data[existingIndex] = { ...data[existingIndex], ...userData };
        } else {
            // Добавляем нового
            data.push({
                ...userData,
                createdAt: new Date().toISOString()
            });
        }

        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));

        return data.find(item => item.id === userData.id);
    },

    findByTgId: async (tgId) => {
        const data = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
        return data.find(item => item.id === tgId); // ищем по id, а не tgId
    },

    getAllUsers: async () => {
        const data = JSON.parse(await fs.readFile(DB_PATH, 'utf8'));
        return data;
    }
};