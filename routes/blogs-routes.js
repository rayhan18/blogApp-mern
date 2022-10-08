 import express from 'express'
import { getAllBlogs ,addBlog,updateBlog ,getById, deletedBlog} from '../controller/blog_controller';



 const blogRouter =express.Router();

 blogRouter.get('/', getAllBlogs);
 blogRouter.post('/add', addBlog);
 blogRouter.post('/update/:id', updateBlog);
 blogRouter.get('/:id', getById);
 blogRouter.delete('/:id', deletedBlog );

 export default blogRouter;