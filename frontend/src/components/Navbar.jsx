import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and App Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link to={"/"}>
            <span className="ml-3 text-2xl font-bold text-[#0FA4AF]">S-BLOGS</span>
            </Link>
          </div>

          {/* Middle - Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-700 hover:text-[#0FA4AF] font-medium">
              Blogs
            </Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-[#0FA4AF] font-medium">
              Dashboard
            </Link>
            <Link to="/create-blog" className="text-gray-700 hover:text-[#0FA4AF] font-medium">
              Create Blog
            </Link>
          </div>

          {/* Right side - Logout button */}
          <div className="hidden md:flex items-center">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-[#0e8f98] transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-[#0e8f98] transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#0FA4AF] focus:outline-none"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={!isOpen ? 'M4 6h16M4 12h16M4 18h16' : 'M6 18L18 6M6 6l12 12'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-cyan-600 hover:text-white">
              Blogs
            </Link>
            <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-cyan-600 hover:text-white">
              Dashboard
            </Link>
            <Link to="/create-blog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-cyan-600 hover:text-white">
              Create Blog
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-[#0e8f98] transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block w-full bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-[#0e8f98] transition-colors text-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;