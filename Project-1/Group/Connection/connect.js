const mongoose = require('mongoose');

const connectdatabase = async () => {
    try{
        const con = await mongoose.connect()

        console.log(`connection successful : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}
module.exports = connectdatabase