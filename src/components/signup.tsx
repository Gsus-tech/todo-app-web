import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const apiUrl = `${import.meta.env.VITE_API_URL}/user/`;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [passwordVerification, setPasswordVerification] = useState({
    passwordV: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // For form data (firstName, lastName, email, password)
    if (name === 'password') {
      setFormData({ ...formData, password: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // For password verification
    if (name === 'passwordV') {
      setPasswordVerification({ passwordV: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if passwords match
    if (formData.password !== passwordVerification.passwordV) {
        setError('Passwords do not match');
        return; // Stop the form from submitting
    }

    setLoading(true);
    setError(null);

    try {
        // Make the API request to your backend to create a new user
        const response = await fetch(`${apiUrl}signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password, // Send the password (backend should handle hashing)
        }),
        });

        const data = await response.json();

        if (response.ok) {
        console.log('Signup successful!', data);
        navigate('/login'); // Navigate to dashboard after successful signup
        } else {
            setError(data.message || 'Something went wrong. Please try again.');
        }
    } catch (error) {
        if(error)
        console.error('Signup failed:', error);
        setError('Something went wrong, please try again.');
    } finally {
        setLoading(false);
    }
    };


  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-soft-pattern bg-pattern bg-gray-100 z-7">
      <div className="absolute inset-0 bg-black opacity-50 z-8"></div>
      
      {/* Sign-up Form */}
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md z-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Sign Up</h2>

            {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                {error}
            </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your first name"
                />
            </div>

            {/* Last Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your last name"
                />
            </div>

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

            {/* Confirm Password */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                type="password"
                name="passwordV"
                value={passwordVerification.passwordV}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Confirm your password"
                />
            </div>

            <button
                type="submit"
                className={`w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
            >
                {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            </form>
        </div>
    </div>
  );
  
};

export default Signup;
