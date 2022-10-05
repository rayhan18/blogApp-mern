import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routes/blogs-routes';
import router from './routes/user-routes';


var app = express();
app.use(express.json())
app.use("/api/user",router)
app.use('/api/blog' ,blogRouter)


 // http://localhost:5000/api/user/login 
// app.use('/',(req,res,next)=>{
//     res.send('hello world')
// })
//password = etqxpC7mVbsGannU
mongoose.connect('mongodb+srv://admin:etqxpC7mVbsGannU@cluster0.4u87xmd.mongodb.net/?retryWrites=true&w=majority')
.then(()=>app.listen(5000)).then(()=>console.log('connected data base with mongoose'))
.catch((error)=>console.log(error))

