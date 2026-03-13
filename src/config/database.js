import mongoose from 'mongoose'


const ConnectDb = async function(){
    await mongoose.connect(process.env.DB_CONNECTION_SECRET);
}

export default ConnectDb