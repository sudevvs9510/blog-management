import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    email: '',
    password: '',
  };
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  const { loginAPI } = useAuth();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await loginAPI(values.email, values.password);
      console.log('Login successfull');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
    }
    setLoading(false)
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
              Login
            </h2>

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
                  disabled={loading} // Disable the button while loading
                  className={`w-full bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-[#0e8f98] transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>

            {/* Signup Link */}
            <div className="mt-4 text-center">
              <span className="text-gray-600">Don&apos;t have an account? </span>
              <Link
                to="/register"
                className="text-[#0FA4AF] hover:underline"
              >
                Signup
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;