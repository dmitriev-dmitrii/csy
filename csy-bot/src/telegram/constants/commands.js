export const  COMMANDS  = {
  PROFILE : 'profile',
  CREATE_CONFIG : 'create-config',
  WG_STATUS:'wg-status'
}

export const PROFILE_BUTTON = {
  text: 'Ваш Профиль',
  callback_data: COMMANDS.PROFILE,
};

export const CREATE_CONFIG_BUTTON = {
  text: 'скачать vpn конфиг',
  callback_data: COMMANDS.CREATE_CONFIG,
};

export const WG_STATUS_BUTTON = {
  text: 'статус сервера',
  callback_data: COMMANDS.WG_STATUS,
};
