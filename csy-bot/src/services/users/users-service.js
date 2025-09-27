import {usersStorage} from "../../storage/users/users-storage.js";
import {wgService} from "../wg/wg-service.js";

class User {
    constructor(dbUserRaw) {
        this.id = dbUserRaw.id
        this.userName = dbUserRaw.username
        this.firstName = dbUserRaw.first_name || ''
        this.lastName = dbUserRaw.last_name || ''
        this.createdAt = dbUserRaw.createdAt
    }
}

export const usersService = {
    createUser: async (telegramUserRaw) => {
      return  await usersStorage.saveUser(new User(telegramUserRaw));
    },

    findUserByTgId: async (tgId) => {
        const user = await usersStorage.findByTgId(tgId);
        return user ? user : null;
    },

    generateWgConfig: async (tgId) => {

        const user = await usersStorage.findByTgId(tgId);

        if (!user) {
            throw new Error('Пользователь не найден');
        }

        const config = await wgService.createWgClient(user.id);
        console.log(config)
        return {
            config,
            filename: `wg-${user.userName}.conf`
        };
    }
};