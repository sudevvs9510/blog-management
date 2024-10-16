import { Route, Routes } from "react-router-dom";
import SignipForm from "../components/register";
import LoginForm from "../components/login";
import BlogCreate from "../pages/CreateBlog";
import DashboardBlogs from "../pages/DashboardBlogs";
import EditBlog from "../pages/EditBlog";
import ViewBlog from "../pages/ViewBlog"
import Home from "../pages/Home";
import ProtectedRoute from "./ProtectedRoute";

import NotFound from "../components/NotFound";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} /> 

      <Route path="/register" element={<SignipForm />} />
      <Route path="/login" element={<LoginForm />} />

      <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>}/>


      <Route path="/dashboard" element={<ProtectedRoute> <DashboardBlogs /></ProtectedRoute>}/>

      <Route path="/create-blog"element={ <ProtectedRoute><BlogCreate /> </ProtectedRoute>}/>

      <Route path="/edit-blog/:blogId" element={<ProtectedRoute><EditBlog /></ProtectedRoute>}/>

      <Route path="/view-blog/:blogId" element={<ProtectedRoute><ViewBlog /></ProtectedRoute>}/>



    </Routes>
  );
};

export default MainRouter;
