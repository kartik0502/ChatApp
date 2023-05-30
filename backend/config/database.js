const mongoose = require('mongoose');

const databaseConnect = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Database connected successfully'))
        .catch(err => console.log(err));
}

module.exports = databaseConnect;