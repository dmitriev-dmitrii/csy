import {Telegraf} from "telegraf";
import { message , callbackQuery } from 'telegraf/filters'

import {CREATE_CONFIG_BUTTON, PROFILE_BUTTON, WG_STATUS_BUTTON} from "./constants/buttons.js";
import {env} from "../constants/env.js";
import {usersService} from "../services/users/users-service.js";
import {wgService} from "../services/wg/wg-service.js";
import {COMMANDS} from "./constants/commands.js";

const {BOT_TOKEN } = env

const bot = new Telegraf(BOT_TOKEN)

function setupHandlers() {

    const CALLBACK_COMMANDS_MAP = {
        // [COMMANDS.CREATE_CONFIG]: handleCreateConfig,
        [COMMANDS.PROFILE]: handleProfile,
        // [WG_STATUS_BUTTON]: checkWgStatus
    };

    bot.start(async (ctx) => {
        // Просто передаем ctx.from (сырые данные)
        const user = await usersService.createUser(ctx.from);

        await ctx.reply(`Привет, ${user.firstName}!`);

        await showMainMenu(ctx)
    })

    // bot.on('webhook', () => {
    //     console.log('Webhook received');
    // });

    bot.on(message('text'), async (ctx) => {
        await ctx.reply(`Вы написали: ${ctx.message.text}`)
    })

    bot.on(callbackQuery(), async (ctx) => {

            const command = ctx.callbackQuery.data;

            if (CALLBACK_COMMANDS_MAP[command]) {

                await CALLBACK_COMMANDS_MAP[command](ctx);
                await ctx.answerCbQuery();
                return
            }

            await showMainMenu(ctx)

    })
}

const handleCreateConfig = async (ctx) => {

    try {
        // Показываем что бот печатает
        await ctx.sendChatAction('upload_document');

        const { config, filename } =  await usersService.generateWgConfig(ctx.from.id)

        await ctx.replyWithDocument({
            source: Buffer.from(config),
            filename: filename
        }, {
            caption: '🔐 Твой VPN конфиг\n\nСохрани файл и импортируй в WireGuard'
        });

    } catch (error) {
        await ctx.reply('❌ Ошибка: ' + error.message);
    }
}

const handleProfile = async (ctx) => {

    const user = await usersService.findUserByTgId(ctx.from.id)

    await ctx.reply(JSON.stringify(user));
}

const checkWgStatus = async (ctx) => {

    try {
        const status = await wgService.getWgStatus()
        await ctx.reply(JSON.stringify(status));

    }catch (e) {
        await ctx.reply('gg');
    }

}

const showMainMenu = async (ctx) => {


    await ctx.reply('Главное Меню:', {
        reply_markup: {
            inline_keyboard: [
                [CREATE_CONFIG_BUTTON],
                [PROFILE_BUTTON] ,
                [WG_STATUS_BUTTON]
            ],
            remove_keyboard: true

        }
    });
}

export const setupTelegramBot = async () => {

    try {
        setupHandlers();
        bot.launch() //не вешать await

        const {username}  =  await  bot.telegram.getMe()

        console.log(`app bot started : https://t.me/${username}`)

    } catch (e) {
        console.log(`app bot start error: ${e}`);
        throw e
    }




}