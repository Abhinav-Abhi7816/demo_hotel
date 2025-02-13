const mongoose=require('mongoose');

const menuItemsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    taste:{
        type:String,
        enum:["sweet","sour","spicy"],
        required:true
    },
    is_drink:{
        type:Boolean
    },
    ingredients:{
        type:Array,
    },
    num_sales:{
        type:Number,
        default:0
    }
})

const Menu=mongoose.model("Menu",menuItemsSchema);

module.exports=Menu;