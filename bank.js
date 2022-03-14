// "mongodb+srv://Tanya:kishuanisha24@cluster0.twigb.mongodb.net/banking"
// mongodb+srv://Tanya:kishuanisha24@cluster0.0nwgt.mongodb.net/banking
const express = require("express")
const mongoose = require("mongoose")
const app = express()
app.use(express.json())

const connect = ()=>{
  return mongoose.connect("mongodb+srv://Tanya:kishuanisha24@cluster0.0nwgt.mongodb.net/banking")
}


const userSchema = new mongoose.Schema({
  firstName:{type:String,required:true},
  middleName:{type:String,required:false},
  lastName:{type:String,required:true},
  age:{type:Number,required:true},
  gender:{type:String, required:false,default:"Female"},
  type:{type:String, required:false,default:"customer"}
},
{
  timestamps:true,
  versionKey:false
})

const User = mongoose.model("user",userSchema)

const branchDetailSchema = new mongoose.Schema({
  name: {type:String,required:true},
  address: {type:String,required:true},
  IFSC:{type:String,required:true},
  MICR:{type:Number,required:true}

},
{
  timestamps:true,
  versionKey:false
}
)
const Branchdetail = mongoose.model("BranchDetail",branchDetailSchema)

const masteraccountSchema = new mongoose.Schema({
  
  balance:{type:Number,required:true},
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
  branchId:{type:mongoose.Schema.Types.ObjectId,ref:"BranchDetail",required:true},
  managerId:{type:Number}
  

},
{
  timestamps:true,
  versionKey:false
}
)
const Masteraccount = mongoose.model("MasterAccount",masteraccountSchema)

const savingaccountSchema = new mongoose.Schema({
  
  account_number:{type:Number,required:true,unique:true},
  balance:{type:Number,required:true},
  interestRate:{type:Number,required:true},
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
  masterId:{type:mongoose.Schema.Types.ObjectId,ref:"MasterAccount",required:true},
  branchId:{type:mongoose.Schema.Types.ObjectId,ref:"BranchDetail",required:true},

},
{
  timestamps:true,
  versionKey:false
}
)
const Savingaccount = mongoose.model("SavingsAccount",savingaccountSchema)

const fixedaccountSchema = new mongoose.Schema({
  
  account_number:{type:Number,required:true,unique:true},
  balance:{type:Number,required:true},
  interestRate:{type:Number,required:true},
  startDate:{type:Number,required:true},
  maturityDate:{type:Number,required:true},
  masterId:{type:mongoose.Schema.Types.ObjectId,ref:"MasterAccount",required:true},

  
  

},
{
  timestamps:true,
  versionKey:false
}
)
const Fixedaccount = mongoose.model("FixedAccount",fixedaccountSchema)

// USER CRUD......................................................
app.post("/user",async(req,res)=>
{
  try{
    const user = await User.create(req.body)
    return res.status(201).send(user)
  }
  catch(err)
  {
    return res.status(201).send(err.message)
  }
 
})

app.get("/user",async(req,res)=>
{
  try{
    const user = await User.find().lean().exec()
    return res.status(200).send(user)
  }
  catch(err)
  {
    return res.status(200).send(err.message)
  }
 
})


app.post("/branch",async(req,res)=>
{
  try{
    const branch = await Branchdetail.create(req.body)
    return res.status(201).send(branch)
  }
  catch(err)
  {
    return res.status(201).send(err.message)
  }
 
})

app.get("/branch",async(req,res)=>
{
  try{
    const user = await User.find().lean().exec()
    return res.status(200).send(user)
  }
  catch(err)
  {
    return res.status(200).send(err.message)
  }
 
})

app.post("/master",async(req,res)=>
{
  try{
    const master = await Masteraccount.create(req.body)
    return res.status(201).send(branch)
  }
  catch(err)
  {
    return res.status(201).send(err.message)
  }
 
})

app.get("/master",async(req,res)=>
{
  try{
    const master = await Masteraccount.find().lean().exec()
    return res.status(200).send(master)
  }
  catch(err)
  {
    return res.status(200).send(err.message)
  }
 
})


app.get("/master/:id",async(req,res)=>
{
  try{
    const master = await Masteraccount.findById().populate({path:"userId"}).lean().exec()
    return res.status(200).send(master)
  }
  catch(err)
  {
    return res.status(200).send(err.message)
  }
 
})

app.patch("/fixed/:id",async(req,res)=>{
  try{
   const fixed=await Fixedaccount.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec()
 return  res.status(200).send(fixed)

  }
  catch(err){

   return res.status(404).send(err.message)
  }
})

app.post("/save",async(req,res)=>
{
  try{
    const save = await Savingaccount.create(req.body)
    return res.status(201).send(save)
  }
  catch(err)
  {
    return res.status(201).send(err.message)
  }
 
})

app.listen(4000,async()=>
{
  try{
    await connect()
    console.log("4000")
  }
  catch(err)
  {
    console.log(err)
  }
})