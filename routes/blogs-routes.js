 import express from 'express'
import { getAllBlogs ,addBlogs} from '../controller/blog_controller';



 const blogRouter =express.Router();

 blogRouter.get('/', getAllBlogs);
 blogRouter.post('/', addBlogs);

 export default blogRouter;