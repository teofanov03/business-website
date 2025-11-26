import { useState, useContext } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import axios from 'axios';
import { AuthContext } from '../utils/AuthContext';
import { API_URL } from '../api';

interface LoginResponse {
  token: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error('Please enter username and password');
      return;
    }

    try {
      setLoading(true);

      // Poziv backend-a
      const response = await axios.post<LoginResponse>(
        `${API_URL}/api/auth/login`,
        {
          username: formData.username,
          password: formData.password,
        }
      );

     
        login(response.data.token);
        console.log("Token after login:", localStorage.getItem("token"));
        navigate("/admin/messages");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center pb-8">
          <CardTitle className="text-3xl font-bold text-gray-900">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-gray-900">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="h-11 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-900">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="h-11 border-gray-300 focus:border-blue-600 focus:ring-blue-600"
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-medium transition-colors"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
