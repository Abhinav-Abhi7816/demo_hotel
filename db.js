const mongoose=require('mongoose');

const mongoURL='mongodb://localhost:27017/hotels'

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