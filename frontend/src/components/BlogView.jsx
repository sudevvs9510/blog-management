// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import authAxios from "../api/api";
// import toast from "react-hot-toast";

// const BlogView = () => {
//   const { blogId } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const response = await authAxios.get(`/blogs/blog-view/${blogId}`);
//         setBlog(response.data.blog);
//       } catch (error) {
//         console.error("Error fetching blog:", error);
//         toast.error("Error fetching blog");
//         setError("Could not load blog details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlog();
//   }, [blogId]);

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   if (error) {
//     return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
//   }

//   if (!blog) {
//     return <div className="flex justify-center items-center h-screen">No blog found.</div>;
//   }

//   return (
//     <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-32 max-w-5xl mt-10 mb-10">
//       <div className="bg-white p-8 shadow-lg rounded-lg">
//         <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">{blog.title}</h1>

//         {blog.imageUrl && (
//           <div className="mb-6 flex justify-center">
//             <img
//               src={blog.imageUrl}
//               alt={blog.title}
//               className="w-full h-auto rounded-md shadow-md max-w-2xl" // Center and limit image width
//             />
//           </div>
//         )}

//         <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto text-center">{blog.description}</p> {/* Center description */}

//         <div className="space-y-6 max-w-2xl mx-auto"> {/* Limit width and center-align content */}
//           {blog.contents.map((block, index) => (
//             <div key={index} className="blog-content">
//               {block.type === "text" && (
//                 <p className="text-base text-gray-600 leading-relaxed">{block.content}</p>
//               )}
//               {block.type === "header" && (
//                 <h2 className="text-3xl font-semibold text-gray-800 mb-4">{block.content}</h2>
//               )}
//               {block.type === "image" && block.content && (
//                 <div className="flex justify-center mb-6">
//                   <img
//                     src={block.content}
//                     alt={`Content Block ${index + 1}`}
//                     className="w-full h-auto rounded-md shadow-md max-w-sm"
//                   />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BlogView;



import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import authAxios from "../api/api"
import toast from "react-hot-toast"

export default function BlogView() {
  const { blogId } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await authAxios.get(`/blogs/blog-view/${blogId}`)
        setBlog(response.data.blog)
      } catch (error) {
        console.error("Error fetching blog:", error)
        toast.error("Error fetching blog")
        setError("Could not load blog details.")
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [blogId])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  if (!blog) {
    return <div className="flex justify-center items-center h-screen">No blog found.</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 ">
      <div className="relative bg-gray-900 text-white py-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full">
          <div className="absolute top-4 right-4 w-24 h-16 bg-purple-700 opacity-50 rounded-lg transform rotate-12"></div>
          <div className="absolute bottom-8 right-8 w-32 h-20 bg-teal-500 opacity-50 rounded-lg transform -rotate-6"></div>
        </div>
        <div className="container flex flex-col items-center mx-auto px-6 relative z-10">
          <p className="text-sm mb-2">{new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">{blog.title}</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-white p-8 rounded-lg">
          {blog.imageUrl && (
            <div className="mb-6 flex justify-center">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-auto rounded-md shadow-md max-w-2xl"
              />
            </div>
          )}

          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto text-center">{blog.description}</p>

          <div className="space-y-6 max-w-2xl mx-auto">
            {blog.contents.map((block, index) => (
              <div key={index} className="blog-content">
                {block.type === "text" && (
                  <p className="text-base text-gray-600 leading-relaxed">{block.content}</p>
                )}
                {block.type === "header" && (
                  <h2 className="text-3xl font-semibold text-gray-800 mb-4">{block.content}</h2>
                )}
                {block.type === "image" && block.content && (
                  <div className="flex justify-center mb-6">
                    <img
                      src={block.content}
                      alt={`Content Block ${index + 1}`}
                      className="w-full h-auto rounded-md shadow-md max-w-sm"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}