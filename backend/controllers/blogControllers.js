import BlogModel from "../models/blogModel.js";

export const createBlog = async (req, res) => {
  const { title, description, content, author } = req.body;

  try {
    // Validate required fields
    if (!title || !description || !content || !author) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const blogDatas = content;

    const newBlog = new BlogModel({
      title,
      description,
      contents: blogDatas.map((block) => {
        // Handle different block types
        if (block.type === "image") {
          return {
            type: "image",
            content: block.content,
          };
        } else if (block.type === "header" || block.type === "text") {
          return {
            type: block.type,
            content: block.content,
          };
        } else {
          return {
            type: "unknown", // Default handling for unexpected block types
            content: block.content,
          };
        }
      }),
      author: author,
      isListed: true,
    });
    console.log("Author ID:", author);

    await newBlog.save();

    return res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getBlogs = async (req, res) => {
  const { id } = req.params;
  try {
    const blogs = await BlogModel.find({ author: id }).populate(
      "author",
      "username"
    ); // Populate author with name
    console.log(blogs);
    return res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to fetch blogs", error });
  }
};

export const viewBlog = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Blog fetched successfully", blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to fetch blog", error });
  }
};

export const allBlogs = async (req, res) => {
    try {
      const allBlogs = await BlogModel.find().sort({ createdAt: -1 }).populate(
        "author", 
        "username" 
      );
      if (!allBlogs || allBlogs.length === 0) {
        return res.status(404).json({ message: "No blogs found" });
      }
      return res.status(200).json({ message: "Blogs fetched successfully", blogs: allBlogs });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Failed to fetch blogs", error });
    }
  };
  

export const editBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const { title, description, content, imageUrl, author } = req.body;

    // Parse content if it's a string
    let parsedContent;
    if (typeof content === "string") {
      parsedContent = JSON.parse(content);
    } else {
      parsedContent = content; // If already an array
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      blogId,
      {
        title,
        description,
        contents: parsedContent, // Use the parsed content array here
        imageUrl,
        author,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({
      success: false,
      message: "Error updating blog",
      error: error.message,
    });
  }
};

export const deleteBlog = async (req, res) => {
  const { blogId } = req.body;

  try {
    if (!blogId) {
      return res.status(400).json({ error: "Blog ID is required" });
    }

    const deletedBlog = await BlogModel.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(400).json({ error: "Blog not found" });
    }

    return res
      .status(200)
      .json({ message: "Blog deleted successfully", blog: deletedBlog });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
