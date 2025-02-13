const mongoose=require('mongoose');

require('dotenv').config();
// const mongoURL='mongodb://localhost:27017/hotels'
const Atlas_Url=process.env.mongoAtlas_Url;
 const mongoURL=Atlas_Url;
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
});

const db=mongoose.connection;

db.on('open',()=>{
    console.log("Mongoose server connected");
})

db.on('error',(err)=>{
    console.log("mogoose server error",err)
})

db.on('disconnected',()=>{
    console.log("Mongoose server disconnected")
})

module.exports=db;