import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const navigate = useNavigate();
  const { registerAPI } = useAuth();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await registerAPI(values.username, values.email, values.password);
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    }
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors }) => (
          <Form className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-2xl font-semibold text-center text-[#0FA4AF] mb-6">
              Register
            </h2>

            {/* Username Field */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
                Username
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                className={`w-full px-4 py-2 border ${
                  touched.username && errors.username ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]`}
                placeholder="Enter your username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className={`w-full px-4 py-2 border ${
                  touched.email && errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]`}
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password Field */}
            <div className="mb-6 relative">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                Password
              </label>
              <Field
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className={`w-full px-4 py-2 border ${
                  touched.password && errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-[#0FA4AF]`}
                placeholder="Enter your password"
              />
              {/* Toggle Icon */}
              <div
                className="absolute right-3 top-11 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-[#0e8f98] transition-colors"
            >
              Register
            </button>

            {/* Login Link */}
            <div className="mt-4 text-center">
              <span className="text-gray-600">Have an account? </span>
              <Link
                to="/login"
                className="text-[#0FA4AF] hover:underline"
              >
                Login
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;