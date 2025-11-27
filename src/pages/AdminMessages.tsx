import { useState, useEffect, useContext } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Mail, Trash2, Check, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { AuthContext } from '../utils/AuthContext';
import { API_URL } from '../api';

interface Message {
  _id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  status: 'read' | 'unread';
  createdAt: string;
}

export default function AdminMessages() {
  const { token } = useContext(AuthContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // GET messages from backend
  useEffect(() => {
    if (!token) return;
    setLoading(true);

    axios
      .get<Message[]>(`${API_URL}/api/contact/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMessages(res.data))
      .catch((err) =>
        toast.error(err.response?.data?.message || 'Failed to load messages')
      )
      .finally(() => setLoading(false));
  }, [token]);

  // Mark as read
  const handleMarkAsRead = async (_id: string) => {
    try {
      await axios.put(
        `${API_URL}/api/contact/messages/${_id}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(
        messages.map((msg) =>
          msg._id === _id ? { ...msg, status: 'read' } : msg
        )
      );
      toast.success('Message marked as read');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update message');
    }
  };

  // Delete message
  const handleDelete = async (_id: string) => {
    try {
      await axios.delete(`${API_URL}/api/contact/messages/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(messages.filter((msg) => msg._id !== _id));
      toast.success('Message deleted');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete message');
    }
  };

  const unreadCount = messages.filter((msg) => msg.status === 'unread').length;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">
            {messages.length} total message{messages.length !== 1 ? 's' : ''} •{' '}
            {unreadCount} unread
          </p>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {loading ? (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-gray-600">Loading messages...</p>
              </CardContent>
            </Card>
          ) : messages.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No messages yet</p>
              </CardContent>
            </Card>
          ) : (
            messages.map((message) => (
              <Card
                key={message._id}
                className={`shadow-sm hover:shadow-md transition-shadow ${
                  message.status === 'unread'
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-gray-100 border-gray-200'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    {/* Message Content */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {message.name}
                        </h3>
                        <Badge
                          variant={message.status === 'unread' ? 'default' : 'secondary'}
                          className={
                            message.status === 'unread'
                              ? 'bg-[#2563EB] hover:bg-[#1d4ed8]'
                              : 'bg-gray-500'
                          }
                        >
                          {message.status === 'unread' ? 'Unread' : 'Read'}
                        </Badge>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {message.email}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          {message.company || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(message.createdAt).toLocaleString('sr-RS', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>

                      <p className="text-gray-700 leading-relaxed">
                        {message.message}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex md:flex-col gap-2 md:min-w-[140px]">
                      {message.status === 'unread' && (
                        <Button
                          onClick={() => handleMarkAsRead(message._id)}
                          variant="outline"
                          className="flex-1 md:flex-none border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Mark as Read
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDelete(message._id)}
                        variant="outline"
                        className="flex-1 md:flex-none border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
