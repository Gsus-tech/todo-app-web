import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// 
const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setTimeout(() => navigate("/"), 0);
    }
  }, [navigate]);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const apiUrl = `${import.meta.env.VITE_API_URL}/user/`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        const response = await fetch(`${apiUrl}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();  // Get the server response

        if (!response.ok) {
            // Display the backend error message
            setError(data.message || 'An unexpected error occurred.');
            return;
        }

        console.log('Login successful:');
        console.log('token:', data.token);
        
        // Save the token to localStorage or sessionStorage
        localStorage.setItem('token', data.token);

        navigate('/');

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Login failed:', error.message);
            setError('Network error or server not responding');
        } else {
            setError('An unexpected error occurred.');
        }
    } finally {
        setLoading(false);
    }
  };



  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-soft-pattern bg-pattern bg-gray-100 z-7">
      <div className="absolute inset-0 bg-black opacity-50 z-8"></div>
      
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md z-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>
  
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
  
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
  
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
  
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
  
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{' '}
          <a href="/sign-up" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
  
};

export default Login;
