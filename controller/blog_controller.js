import Blog from "../model/Blog";
import User from "../model/user";

//getAllBlogs
export const getAllBlogs = async (req , res, next )=>{
    let blogs;

    try {
        blogs =await Blog.find()

    } catch (error) {
      return  console.log(error)
    }
    if(!blogs){
        return  res.status(404).json({message:'blogs not found'})
    }
    return  res.status(200).json({blogs})
}

//post /add blogs 
// export const addBlog = async (req , res, next )=>{
//     const { title, description, image, user } = req.body;

//     let existingUer;
//     try {
//         existingUer = await User.findById(user)
//     } catch (error) {
//         return console.log(error)
//     }
//     if(!existingUer){
//         res.status(400).json({ message: 'unable to user id'})
//     }
   
//     const blog =new Blog({
//     title, description, image, user,
//     })
   
//     try {
//         const session = await mongoose.startSession();
//         session.startTransaction();
//         await blog.save({ session });
//         existingUer.blogs.push(blog);
//         await existingUer.save({ session });
//         await session.commitTransaction();
//       } catch (err) {
//         console.log(err);
//         return res.status(500).json({ message: err });
//       }
//     return  res.status(200).json({blog})
// }
export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
  
    let existingUser;
    try {
      existingUser = await User.findById(user);
    } catch (err) {
      return console.log(err);
    }
    if (!existingUser) {
      return res.status(400).json({ message: "Unable TO FInd User By This ID" });
    }
    const blog = new Blog({
      title,
      description,
      image,
      user,
    });
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await blog.save({ session });
      existingUser.blogs.push(blog);
      await existingUser.save({ session });
      await session.commitTransaction();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  
    return res.status(200).json({ blog });
  };
  
//update blogs 
export const updateBlog = async (req , res, next )=>{
    const { title , description} = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog =await Blog.findByIdAndUpdate(blogId ,{
            title,
            description,
        })
    } catch (error) {
      return console.log(error)
    }
    if(!blog ){
     return  res.status(500).json({message:'unable to update the blog'})
    }
      return  res.status(200).json({blog})
}

export const getById = async (req , res, next )=>{
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id);
    } catch (error) {
        return console.log(error)
    }
    if(!blog){
        return  res.status(404).json({message:'blogs not found'})
    }
    return res.status(200).json({blog})
}

//delete post 
export const deletedBlog = async (req , res, next )=>{
    const  id = req.params.id
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id)
    } catch (error) {
        return console.log(error)
    }
   if(!blog){
    return res.status(500).json({message:'unable to delete blog'})
   }
   return  res.status(200).json({messages:" blog successfully delete"})
}

