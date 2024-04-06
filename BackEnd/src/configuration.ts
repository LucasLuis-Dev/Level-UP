export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    mongoUri: process.env.DB_URI
});