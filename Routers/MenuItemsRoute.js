const express=require('express');
const Menu=require('./../Models/MenuItems');
const router=express.Router();

router.post('/',async(req,res)=>{
    try{
        const data=req.body;

        const menuItem=new Menu(data);

        const response=await menuItem.save();

        res.status(200).json(response);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:"Internal server error!"});
    }
})

router.get('/',async(req,res)=>{
    const data=await Menu.find();

    res.send(data);
});

router.put('/:id',async(req,res)=>{
    try{
        const itemId=req.params.id;

        const data=req.body;

        const response=await Menu.findByIdAndUpdate(itemId,data);

        if(response===null)
        {
            res.status(404).json({message:"Id not found!"});
            return;
        }
        res.status(200).json({message:"Updated successfully!",response});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }

});

router.post('/addAll',(req,res)=>{
    try{
        const dataArr=req.body;

        dataArr.map(async (el)=>{
            let data=el;

            let newItem=new Menu(data);
            let response=await newItem.save();
        })
        res.status(200).json({message:"Data Saved Successfully!"});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})

router.get('/:taste',async(req,res)=>{
    try{
        const tasteType=req.params.taste;
        if(tasteType==='spicy'||tasteType==='sour'||tasteType==='sweet')
        {
            const response =await Menu.find({taste:tasteType})
            res.status(200).json(response);
            return;
        }
        res.status(404).json({error:"Taste type not found!"});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const itemId=req.params.id;

    const response=await Menu.findByIdAndDelete(itemId);

    if(response===null)
    {
        res.status(404).json({message:"Id not found!"});
        return;
    }
    res.status(200).json({message:"Successfully deleted!"});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:"Internal server error!"});
    }
})

module.exports=router;