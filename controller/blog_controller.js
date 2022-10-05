import Blog from "../model/Blog";


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

//post blogs 
export const addBlogs = async (req , res, next )=>{
    const { title, description, image, user } = req.body;
    const blog =new Blog({
      title,
      description,
      image,
      user,
    })
    try {
        await blog.save()
    } catch (error) {
       return console.log(error)
    }
    return  res.status(200).json({blog})
}