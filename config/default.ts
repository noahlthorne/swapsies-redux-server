export default {
    port: 5000,
    host: "localhost",
    dbUri: process.env.MONGO_URI,
    saltWorkFactor: 10,
    accessTokenTtl: "3hr",
    refreshTokenTtl: "1y",
    privateKey: process.env.PRIVATE_KEY,
};
