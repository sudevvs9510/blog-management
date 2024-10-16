// import mongoose from "mongoose";

// const blogSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     contents: {
//         content:String,
//       type: String,
      
//     },
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     isListed:{
//         type:Boolean,
//         default: true
//     }
//   },
//   { timestamps: true }
// );

// const BlogModel = mongoose.model("Blog", blogSchema);

// export default BlogModel


import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    contents: [
      {
        type: {
          type: String,
          required: true,
          enum: ["text", "header", "image"], 
        },
        content: {
          type: String, 
          required: true,
        },
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isListed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const BlogModel = mongoose.model("Blog", blogSchema);

export default BlogModel;
