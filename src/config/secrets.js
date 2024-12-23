require('dotenv').config()

//This is for managing all secrets in a single place , making it easily managable.

module.exports = {
    PORT : process.env.PORT || 3000 
}