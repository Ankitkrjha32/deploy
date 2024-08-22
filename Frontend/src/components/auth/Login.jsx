import React, { useState } from 'react';
import Navbar from '../shared/Navbar.jsx';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../../redux/authSlice.jsx';
import { Loader2 } from 'lucide-react';
// import { USER_API_END_POINT } from '../../utils/constant.js';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle input changes
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Start loading
      dispatch(setLoading(true));

      // Send login request to the backend
      const res = await axios.post('https://deploy-s5i8.onrender.com/api/v1/user/login', input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,  // Ensures cookies are sent with the request
      });

      console.log('Response:', res);

      // Safeguard against missing data in response
      if (res && res.data && res.data.success) {
        // Update Redux store with the user data
        dispatch(setUser(res.data.user));

        // Navigate to notes page after successful login
        navigate('/notes');

        // Show success message
        toast.success(res.data.message);
      } else {
        // Handle case where the backend response is unexpected
        toast.error('Unexpected response from the server.');
      }

    } catch (error) {
      console.error(error);
      
      // Handle error from server or network
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred during login.');
      }
      
    } finally {
      // Stop loading
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center font-sans overflow-x-hidden">
      <Navbar />
      <div className="flex items-center justify-center w-full h-full px-4 sm:px-8 md:px-16">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-gray-800 bg-opacity-80 border border-gray-700 rounded-lg p-8 shadow-lg my-10"
        >
          <h1 className="font-bold text-3xl mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
            Login
          </h1>

          {/* Email Input */}
          <div className="my-4">
            <Label className="text-sm text-gray-300">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="patel@gmail.com"
              className="w-full mt-1 p-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="my-4">
            <Label className="text-sm text-gray-300">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="w-full mt-1 p-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role Radio Group */}
          <div className="my-6">
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1" className="text-gray-300">Student</Label>
              </div>
              {/* Additional role options can be added here */}
            </RadioGroup>
          </div>

          {/* Submit Button with Loading Indicator */}
          {loading ? (
            <Button className="w-full py-3 text-lg bg-blue-600 rounded-lg flex justify-center items-center">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full py-3 text-lg bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors duration-200">
              Login
            </Button>
          )}

          {/* Redirect to Signup */}
          <div className="text-center mt-4">
            <span className="text-sm text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-400 hover:text-blue-500 transition-colors duration-200">Signup</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
