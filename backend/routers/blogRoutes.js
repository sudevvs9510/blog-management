import express from 'express'
import { createBlog, editBlog, deleteBlog, getBlogs, viewBlog, allBlogs } from "../controllers/blogControllers.js"
import auth from "../middlewares/auth.js"


const blogRoutes = express.Router()

blogRoutes.post('/create-blog',auth,  createBlog)
blogRoutes.post('/update-blogs/:blogId', auth,  editBlog)
blogRoutes.post('/delete-blogs', auth, deleteBlog)

blogRoutes.get('/view-blogs/:id',auth,  getBlogs)
blogRoutes.get('/blog-view/:blogId',auth,  viewBlog)
blogRoutes.get('/view-all-blogs',auth, allBlogs)

export default blogRoutes




