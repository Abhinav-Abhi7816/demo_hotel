const express=require('express');
const person=require('./../Models/person')
const router=express.Router();


router.get('/',async (req,res)=>{

    const data=await person.find();

    res.send(data);
})

router.post('/',async(req,res)=>{
    try{

        const data=await req.body  
        const newPerson=person(data);

        const response=await newPerson.save();

        res.status(200).json(response);
        
    }
    catch(err)
    {
        res.status(500).json(err);
        
    }
})
//update person based on id
router.put('/:id',async(req,res)=>{
    
   try{
    const perId=req.params.id;
    const data=req.body;

    const response=await person.findByIdAndUpdate(perId,data)
    if(response===null)
    {
        return res.status(404).json({error:"Unable to find id!"});
    }
    res.status(200).json({message:"Added Successfully",response});
   }
   catch(err)
   {
        console.log(err),
        res.status(500).json({messege:'Internal Error!'})
   }

})

router.get('/:workType',async(req,res)=>{
    try{
        const workTypes=req.params.workType;
        if(workTypes==='chef' || workTypes==='owner' || workTypes==='waiter'  || workTypes==='manager')
        {
            const response=await person.find({work:workTypes});
            res.status(200).json(response);
            return;
        }
        res.status(404).json({error:"Wrong Worktype"});
    }
    catch(err)
   {
        console.log(err),
        res.status(500).json({messege:'Internal Error!'})
   }
})

router.delete('/:id',async(req,res)=>{
    try{
        const perId=req.params.id;
        const response=await person.findByIdAndDelete(perId);
        
        if(response===null)
        {
            return res.status(404).json({message:"Unable to find id"});
        }
        res.status(200).json({message:"successfully deleted",response});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:"Internal sever error!"});
    }
})

module.exports=router;