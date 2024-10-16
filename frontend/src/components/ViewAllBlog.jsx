import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaUserAlt, FaCalendarAlt } from "react-icons/fa"
import authAxios from "../api/api"
import toast from "react-hot-toast"

export default function ViewAllBlogs() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await authAxios.get(`/blogs/view-all-blogs`)
        setBlogs(response.data.blogs)
      } catch (error) {
        console.error("Error fetching blogs:", error)
        toast.error("Error fetching blogs")
        setError("Could not load blog details.")
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  if (!blogs.length) {
    return <div className="flex justify-center items-center h-screen">No blogs found.</div>
  }

  const handleBlogClick = (blogId) => {
    navigate(`/view-blog/${blogId}`)
  }

  const truncateDescription = (description) => {
    return description.length > 150 ? description.substring(0, 150) + "..." : description
  }

  const getRandomGradient = () => {
    const gradients = [
      "from-purple-400 to-pink-500",
      "from-cyan-400 to-blue-500",
      "from-green-400 to-teal-500",
      "from-yellow-400 to-orange-500",
      "from-red-400 to-pink-500",
    ]
    return gradients[Math.floor(Math.random() * gradients.length)]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Latest Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 flex flex-col h-full"
            >
              <div
                className={`h-48 bg-gradient-to-r ${getRandomGradient()} relative`}
              >
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <h2 className="text-2xl font-bold text-white text-center">{blog.title}</h2>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-gray-600 text-sm mb-4 flex-grow">{truncateDescription(blog.description)}</p>
                <div className="mt-auto">
                  <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                    <div className="flex items-center">
                      <FaUserAlt className="mr-2 text-customAqua" />
                      <span>
                        {blog.author.username.charAt(0).toUpperCase() + blog.author.username.slice(1).toLowerCase()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-customAqua" />
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleBlogClick(blog._id)}
                    className="w-full bg-customAqua text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-300"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}