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
export const addBlog = async (req , res, next )=>{
    const { title, description, image, user } = req.body;
    const blog =new Blog({
    //   title:req.body.title,
    //   description: req.body.description,
    //   image: req.body.image,
    //   user: req.body.user,
    title, description, image, user,
    })
    try {
        await blog.save()
    } catch (error) {
       return console.log(error)
    }
    return  res.status(200).json({blog})
}

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
