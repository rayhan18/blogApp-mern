import User from "../model/user";
import bcrypt from 'bcryptjs'

//all user data 
export const getAllUsers = async (req, res, next)=>{
        let users 
        try {
            users = await User.find()
        } catch (error) {
           return console.log(error)
        }
        if(!users){
          return  res.status(404).json({message:'user not found'})
        }
        return res.status(200).json({users})

}
//signup
export const signup = async (req , res, next )=>{
    const {name ,email,password} = req.body;
    let existingUer;
    try {
        existingUer =await User.findOne({email})
    } catch (error) {
       return console.log(error)
    }
    if(existingUer){
        return  res.status(400).json({message:'user already exist! login instead'})
    }
 //check password 
    const hasPassword = bcrypt.hashSync(password)
    let user = new User({
    name,
    email,
    password: hasPassword,
    blogs:[]
   })
  
   try {
    await user.save()
   } catch (error) {
       return console.log(error)
   }
   return  res.status(201).json({user})
}
//login 
export const login =async (req , res, next )=>{
    const {email,password} = req.body;
    let existingUer;
    try {
        existingUer =await User.findOne({email})
    } catch (error) {
       return console.log(error)
    }
    if(!existingUer){
        return  res.status(404).json({message:'could not find email this user'})
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUer.password);
      if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  return res.status(200).json({message:'login is successful'})
}