export default {
    port: process.env.PORT,
    host: "localhost",
    dbUri: process.env.MONGO_URI,
    saltWorkFactor: 10,
    accessTokenTtl: "3hr",
    refreshTokenTtl: "1y",
    privateKey: process.env.PRIVATE_KEY,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    igdbAuth: process.env.IGDB_AUTHORIZATION,
};
