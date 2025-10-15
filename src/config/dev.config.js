

module.exports = {
    APP_SHORT_NAME: process.env.APP_SHORT_NAME || 'Hugo',
    REDIS_HOST: "127.0.0.1",
    REDIS_PORT: 6379,
    SECRET: process.env.SECRET,
    PG_HOST: process.env.PG_HOST || 'localhost',
    PG_DB: process.env.PG_DB || 'visuti_userdb',
    PG_USER: process.env.PG_USER || 'postgres',
    PG_PASS: process.env.PG_PASS || 'visutiCarrer',
JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
    // EMAIL_CONFIG: {
    //     host: process.env.smshost,
    //     port: process.env.smsport,
    //     username: process.env.mail_username,
    //     password: process.env.password,
    //     from_name: process.env.from_name,
    //     from_address: process.env.from_address
    // },
    // HOST: process.env.HOST || 'http://play2plus.prometteur.in',
    PORT: process.env.PORT || 6060,
    ADMINPORT: process.env.ADMINPORT || 6161,
    CRONPORT: process.env.CRONPORT || 6363,
    DB_URL: process.env.DB_URL,
    // FCM_SERVER_KEY: process.env.FCM_SERVER_KEY,
    // apk: '----',
    // rapidApiKey: process.env.api_key,
    // url: process.env.url || 'http://play2plus.prometteur.in:6262/',
    PER_PAGE: process.env.PER_PAGE || 10
};
