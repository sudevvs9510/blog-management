import { useState } from "react"
import axios from "axios"
import { AiOutlinePlusCircle, AiOutlineClose } from "react-icons/ai"
import { FaImage, FaArrowUp, FaArrowDown } from "react-icons/fa"
import toast from "react-hot-toast"
import authAxios from "../api/api"

export default function BlogCreator() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [contentBlocks, setContentBlocks] = useState([
    { type: "text", content: "" },
  ])
  const [isUploading, setIsUploading] = useState(false)

  const addContentBlock = (type) => {
    setContentBlocks([...contentBlocks, { type, content: "" }])
  }

  const updateContentBlock = (index, content) => {
    const updatedBlocks = [...contentBlocks]
    updatedBlocks[index].content = content
    setContentBlocks(updatedBlocks)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userData = localStorage.getItem("userId")
    if (!userData) {
      toast.error("User data not found. Please log in.")
      
    }
    const parsedData = JSON.parse(userData)
    const authorId = parsedData.userId

    const blogData = {
      title,
      description,
      content: JSON.stringify(contentBlocks),
      imageUrl,
      author: authorId,
    }

    try {
      const response = await authAxios.post("/blogs/create-blog", blogData)
      toast.success("Blog created successfully!")
      console.log("Blog created successfully", response.data)
      setTitle("")
      setDescription("")
      setImageUrl("")
      setContentBlocks([{ type: "text", content: "" }])
    } catch (error) {
      console.error("Error creating blog:", error)
      toast.error("Error creating blog")
    }
  }

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
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: false,
          }
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

  const moveBlock = (index, direction) => {
    const newBlocks = [...contentBlocks]
    const [movedBlock] = newBlocks.splice(index, 1)
    newBlocks.splice(index + direction, 0, movedBlock)
    setContentBlocks(newBlocks)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <h1 className="text-4xl font-bold text-center text-gray-800 mt-8 mb-4">Create Your Blog</h1>
  
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                      onClick={() => moveBlock(index, -1)}
                      disabled={index === 0}
                      className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                      <FaArrowUp />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveBlock(index, 1)}
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
                      onChange={(e) => updateContentBlock(index, e.target.value)}
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
                    onClick={() => {
                      const updatedBlocks = contentBlocks.filter((_, i) => i !== index)
                      setContentBlocks(updatedBlocks)
                    }}
                    className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition-colors"
                  >
                    <AiOutlineClose className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addContentBlock("text")}
              className="mt-4 flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
            >
              <AiOutlinePlusCircle className="mr-2 h-5 w-5" /> Add Block
            </button>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Publish Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}