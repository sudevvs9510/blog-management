import { useEffect, useState } from 'react'
import { FaUser, FaCalendarAlt, FaEdit, FaEye } from 'react-icons/fa'
import authAxios from '../api/api'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function BlogDashboard() {
  const { user } = useAuth()
  const [blogs, setBlogs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (user) {
          const response = await authAxios.get(`/blogs/view-blogs/${user}`)
          setBlogs(response.data.blogs)
        }
      } catch (error) {
        console.error('Error fetching blogs:', error)
      }
    }

    fetchBlogs()
  }, [user])

  const handleEdit = (blogId) => {
    navigate(`/edit-blog/${blogId}`)
  }

  const handleViewBlog = (blogId) => {
    navigate(`/view-blog/${blogId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">My Blog Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 flex flex-col h-full"
            >
              <div className="h-48 bg-gradient-to-r from-cyan-400 to-blue-500 relative">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <h2 className="text-2xl font-bold text-white text-center">{blog.title}</h2>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">{blog.description}</p>
                <div className="mt-auto">
                  <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                    <div className="flex items-center">
                      <FaUser className="mr-2 text-cyan-600" />
                      <span>{blog.author.username || 'Unknown Author'}</span>
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-cyan-600" />
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleViewBlog(blog._id)}
                      className="flex items-center justify-center w-1/2 mr-2 bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-700 transition duration-300"
                    >
                      <FaEye className="mr-2" /> View
                    </button>
                    <button
                      onClick={() => handleEdit(blog._id)}
                      className="flex items-center justify-center w-1/2 ml-2 bg-darkerAqua text-white py-2 px-4 rounded-md hover:bg-darkerAqua transition duration-300"
                    >
                      <FaEdit className="mr-2" /> Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}