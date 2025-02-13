const express =require('express');
const app=express();
const db=require('./db');

const bodyParser=require('body-parser')
const personRouter=require('./Routers/PersonRoute')
const menuItemsRouter=require('./Routers/MenuItemsRoute')


app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("Hii this is Server!,What do you want!")
})

app.use('/person',personRouter);

app.use('/menu',menuItemsRouter);

app.listen(3000,()=>{
    console.log("Server is running!")
})

