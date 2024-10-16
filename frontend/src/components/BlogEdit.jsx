/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { MdDeleteOutline } from "react-icons/md"
import { FaArrowDown, FaArrowUp, FaImage } from "react-icons/fa"
import toast from "react-hot-toast"
import axios from "axios"
import authAxios from "../api/api"

export default function EditBlog() {
  const { blogId } = useParams()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [contentBlocks, setContentBlocks] = useState([])
  const [isUploading, setIsUploading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await authAxios.get(`/blogs/blog-view/${blogId}`)
        const blog = response.data.blog
        setContentBlocks(blog.contents && Array.isArray(blog.contents) ? blog.contents : [])
        setTitle(blog.title)
        setDescription(blog.description)
        setImageUrl(blog.imageUrl)
      } catch (error) {
        console.error("Error fetching blog:", error)
        toast.error("Error fetching blog")
      }
    }
    fetchBlog()
  }, [blogId])

  const handleImageChange = async (e, index) => {
    const file = e.target.files[0]
    if (file) {
      setIsUploading(true)
      try {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "blog-management")
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/sudev99/image/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        const imageUrl = response.data.secure_url
        const updatedBlocks = [...contentBlocks]
        updatedBlocks[index].content = imageUrl
        setContentBlocks(updatedBlocks)
        toast.success("Image uploaded successfully")
      } catch (error) {
        console.log(error)
        toast.error("Error uploading image")
      } finally {
        setIsUploading(false)
      }
    }
  }

  const handleDeleteBlock = (index) => {
    const updatedBlocks = contentBlocks.filter((_, i) => i !== index)
    setContentBlocks(updatedBlocks)
    toast.success("Content block removed", { duration: 3000 })
  }

  const handleSwapBlocks = (index, direction) => {
    if (
      (direction === "up" && index > 0) ||
      (direction === "down" && index < contentBlocks.length - 1)
    ) {
      const updatedBlocks = [...contentBlocks]
      const swapIndex = direction === "up" ? index - 1 : index + 1
      ;[updatedBlocks[index], updatedBlocks[swapIndex]] = [updatedBlocks[swapIndex], updatedBlocks[index]]
      setContentBlocks(updatedBlocks)
      toast.success(`Block moved ${direction}`, { duration: 2000 })
    }
  }

  const validateFields = () => {
    if (!title) {
      toast.error("Title is required.")
      return false
    }
    if (!description) {
      toast.error("Description is required.")
      return false
    }
    if (contentBlocks.length === 0) {
      toast.error("At least one content block is required.")
      return false
    }
    for (let i = 0; i < contentBlocks.length; i++) {
      const block = contentBlocks[i]
      if ((block.type === "text" || block.type === "header") && !block.content.trim()) {
        toast.error(`Content block ${i + 1} cannot be empty.`)
        return false
      }
      if (block.type === "image" && !block.content) {
        toast.error(`Image block ${i + 1} must have an image uploaded.`)
        return false
      }
    }
    return true
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    
    const authorId = localStorage.getItem("userId")
    if (!authorId) {
      toast.error("User data not found. Please log in.")
      
      return
    }
    
    if (!validateFields()) return
  
    const updatedBlogData = {
      title,
      description,
      content: contentBlocks,
      imageUrl,
      author: authorId,
    }
  
    try {
      const response = await authAxios.post(`/blogs/update-blogs/${blogId}`, updatedBlogData)
      console.log("Blog updated successfully", response.data)
      toast.success("Blog updated successfully!")
    } catch (error) {
      console.error("Error updating blog:", error)
      toast.error("Error updating blog")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <h1 className="text-4xl font-bold text-center text-gray-800 mt-8 mb-4">Edit Blog</h1>
        <form onSubmit={handleUpdate} className="p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a brief description of your blog"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              rows={4}
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Content Blocks</h2>
            <div className="space-y-4">
              {contentBlocks.map((block, index) => (
                <div key={index} className="flex items-start space-x-2 bg-gray-50 p-4 rounded-lg">
                  <div className="flex flex-col space-y-2">
                    <button
                      type="button"
                      onClick={() => handleSwapBlocks(index, "up")}
                      disabled={index === 0}
                      className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                      <FaArrowUp />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSwapBlocks(index, "down")}
                      disabled={index === contentBlocks.length - 1}
                      className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                      <FaArrowDown />
                    </button>
                  </div>
                  <select
                    value={block.type}
                    onChange={(e) => {
                      const updatedBlocks = [...contentBlocks]
                      updatedBlocks[index].type = e.target.value
                      setContentBlocks(updatedBlocks)
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  >
                    <option value="text">Text</option>
                    <option value="header">Header</option>
                    <option value="image">Image</option>
                  </select>

                  {block.type === "text" || block.type === "header" ? (
                    <input
                      type="text"
                      value={block.content}
                      onChange={(e) => {
                        const updatedBlocks = [...contentBlocks]
                        updatedBlocks[index].content = e.target.value
                        setContentBlocks(updatedBlocks)
                      }}
                      placeholder={`Enter ${block.type} content`}
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 flex-grow">
                      {block.content ? (
                        <img src={block.content} alt="Uploaded" className="h-16 w-16 object-cover rounded" />
                      ) : (
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, index)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 flex items-center">
                            <FaImage className="mr-2" />
                            Choose Image
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDeleteBlock(index)}
                    className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition-colors"
                  >
                    <MdDeleteOutline size={24} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setContentBlocks([...contentBlocks, { type: "text", content: "" }])
              }}
              className="mt-4 flex items-center text-cyan-600 hover:text-cyan-800 transition-colors"
            >
              <AiOutlinePlusCircle className="mr-2" size={20} />
              Add Content Block
            </button>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-md hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 transition-colors"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  )
}