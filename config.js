module.exports={
    port: process.env.PORT || 8080,
    db: process.env.MONGODB || 'mongodb://localhost:27017/b2b',
    SECRET_TOKEN: 'miclavedetokens'
}