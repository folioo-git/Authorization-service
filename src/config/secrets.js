require('dotenv').config()

//This is for managing all secrets in a single place , making it easily managable.

module.exports = {
    PORT : process.env.PORT || 3000 ,
    SALT_ROUND : process.env.SALT_ROUND,
    DB_HOST : process.env.DB_HOST,
    DB_USER : process.env.DB_USER,
    DB_PASSWORD : process.env.DB_PASSWORD,
    DB_NAME : process.env.DB_NAME,
    DB_POOL_LIMIT : process.env.DB_POOL_LIMIT || 5,
    REDIS_HOST : process.env.REDIS_HOST,
    REDIS_PORT : process.env.REDIS_PORT,
    REDIS_USER : process.env.REDIS_USER,
    REDIS_PASSWORD : process.env.REDIS_PASSWORD,
    JWT_SECRET : process.env.JWT_SECRET
}