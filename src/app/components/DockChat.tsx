import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  TextField,
  Button,
  Paper,
  Divider,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Stack,
  Chip,
  alpha,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  LinearProgress,
  Tooltip,
  Fab
} from '@mui/material';
import {
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Search,
  Users,
  MessageCircle,
  Activity,
  Settings,
  Bell,
  Star,
  PhoneOff,
  VideoOff,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  ScreenShare,
  StopScreenShare,
  Record,
  CheckCircle,
  Clock,
  BarChart3,
  FileText,
  Image as ImageIcon,
  Download,
  Upload,
  Plus,
  Filter,
  Pin,
  PushPin,
  Info
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  lastMessage: string;
  timestamp: string;
  unread: number;
  role: string;
  department: string;
  isPinned?: boolean;
}

interface Message {
  id: number;
  sender: 'me' | 'other';
  text: string;
  timestamp: string;
  type: 'text' | 'file' | 'image' | 'system';
  fileName?: string;
  fileSize?: string;
  isEdited?: boolean;
  isDeleted?: boolean;
  reactions?: { emoji: string; users: string[] }[];
}

interface Team {
  id: number;
  name: string;
  members: number;
  avatar: string;
  lastActivity: string;
}

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  type: 'document' | 'message' | 'meeting' | 'file';
}

export function DockChat() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'chats' | 'teams' | 'activity'>('chats');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'other',
      text: 'Hey! Did you check the latest document templates? They look amazing!',
      timestamp: '10:30 AM',
      type: 'text',
      reactions: [{ emoji: '👍', users: ['John', 'Sarah'] }]
    },
    {
      id: 2,
      sender: 'me',
      text: 'Yes! The invoice templates look great. I purchased the bundle yesterday.',
      timestamp: '10:32 AM',
      type: 'text'
    },
    {
      id: 3,
      sender: 'other',
      text: 'Awesome! Let me know if you need help with the customization. I can share some tips.',
      timestamp: '10:33 AM',
      type: 'text'
    },
    {
      id: 4,
      sender: 'system',
      text: 'Document shared: Financial_Report_Q4_2024.pdf (2.4 MB)',
      timestamp: '10:35 AM',
      type: 'file',
      fileName: 'Financial_Report_Q4_2024.pdf',
      fileSize: '2.4 MB'
    }
  ]);

  const users: User[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      status: 'online',
      lastMessage: 'Awesome! Let me know if you need help...',
      timestamp: '10:33 AM',
      unread: 0,
      role: 'Senior Designer',
      department: 'Design',
      isPinned: true
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar: 'https://i.pravatar.cc/150?img=2',
      status: 'online',
      lastMessage: 'The contract template is perfect!',
      timestamp: '9:45 AM',
      unread: 2,
      role: 'Legal Advisor',
      department: 'Legal'
    },
    {
      id: 3,
      name: 'Emily Davis',
      avatar: 'https://i.pravatar.cc/150?img=3',
      status: 'away',
      lastMessage: 'Can you send me the NDA template?',
      timestamp: 'Yesterday',
      unread: 0,
      role: 'Project Manager',
      department: 'Operations'
    },
    {
      id: 4,
      name: 'James Wilson',
      avatar: 'https://i.pravatar.cc/150?img=4',
      status: 'busy',
      lastMessage: 'Thanks for the recommendation!',
      timestamp: 'Yesterday',
      unread: 0,
      role: 'Business Analyst',
      department: 'Strategy'
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      avatar: 'https://i.pravatar.cc/150?img=5',
      status: 'online',
      lastMessage: 'Just signed the document!',
      timestamp: '8:20 AM',
      unread: 1,
      role: 'HR Manager',
      department: 'Human Resources',
      isPinned: true
    }
  ];

  const teams: Team[] = [
    {
      id: 1,
      name: 'Design Team',
      members: 8,
      avatar: 'https://i.pravatar.cc/150?img=11',
      lastActivity: '2 min ago'
    },
    {
      id: 2,
      name: 'Legal Department',
      members: 5,
      avatar: 'https://i.pravatar.cc/150?img=12',
      lastActivity: '15 min ago'
    },
    {
      id: 3,
      name: 'Finance Team',
      members: 12,
      avatar: 'https://i.pravatar.cc/150?img=13',
      lastActivity: '1 hour ago'
    }
  ];

  const activities: ActivityItem[] = [
    {
      id: '1',
      user: 'Sarah Johnson',
      action: 'shared a document template',
      timestamp: '2 min ago',
      type: 'document'
    },
    {
      id: '2',
      user: 'Mike Chen',
      action: 'completed contract review',
      timestamp: '5 min ago',
      type: 'file'
    },
    {
      id: '3',
      user: 'Emily Davis',
      action: 'started a video call',
      timestamp: '12 min ago',
      type: 'meeting'
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: 'me',
        text: messageText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
      
      // Simulate typing indicator
      setTimeout(() => {
        setTypingUsers([selectedUser?.name || 'Other']);
        setTimeout(() => {
          setTypingUsers([]);
        }, 2000);
      }, 1000);
    }
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#44b700';
      case 'away': return '#ffa726';
      case 'busy': return '#f44336';
      default: return '#bdbdbd';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: '#44b700' }} />;
      case 'away': return <Clock size={12} color="#ffa726" />;
      case 'busy': return <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: '#f44336' }} />;
      default: return <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: '#bdbdbd' }} />;
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: 'me',
        text: `File shared: ${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB)`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'file',
        fileName: file.name,
        fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`
      };
      setMessages([...messages, newMessage]);
    }
  };

  const toggleVideoCall = () => {
    setIsVideoCall(!isVideoCall);
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleReaction = (messageId: number, emoji: string) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions?.find(r => r.emoji === emoji);
        if (existingReaction) {
          return {
            ...msg,
            reactions: msg.reactions?.map(r => 
              r.emoji === emoji 
                ? { ...r, users: r.users.includes('You') ? r.users.filter(u => u !== 'You') : [...r.users, 'You'] }
                : r
            )
          };
        } else {
          return {
            ...msg,
            reactions: [...(msg.reactions || []), { emoji, users: ['You'] }]
          };
        }
      }
      return msg;
    }));
  };

  return (
    <Box>
      {/* Enhanced Header */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            fontSize: '2.5rem'
          }}
        >
          Enterprise Team Collaboration
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.2rem', maxWidth: 600 }}>
          Connect, collaborate, and share documents with your team in real-time with enterprise-grade security
        </Typography>
      </Box>

      {/* Enhanced Activity Stats */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {[
          { icon: <Users size={24} />, label: 'Active Users', value: '247', color: '#43e97b', change: '+12 online' },
          { icon: <MessageCircle size={24} />, label: 'Messages Today', value: '1,823', color: '#38f9d7', change: '+245 from yesterday' },
          { icon: <Activity size={24} />, label: 'Avg. Response Time', value: '< 2m', color: '#4facfe', change: '98% SLA met' },
          { icon: <Video size={24} />, label: 'Active Calls', value: '18', color: '#f093fb', change: '6 screen sharing' }
        ].map((stat, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Card
              elevation={0}
              sx={{
                background: `linear-gradient(135deg, ${stat.color} 0%, ${alpha(stat.color, 0.8)} 100%)`,
                color: 'white',
                borderRadius: 4,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Chip
                    label={stat.change}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.7rem'
                    }}
                  />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.8rem' }}>
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Enhanced Navigation */}
      <Card elevation={0} sx={{ borderRadius: 4, mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(e, value) => value && setViewMode(value)}
              sx={{
                '& .MuiToggleButton-root': {
                  borderRadius: 3,
                  px: 3,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: 'none',
                  border: 'none',
                  background: '#f8fafc',
                  '&.Mui-selected': {
                    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(67, 233, 123, 0.4)'
                  },
                  '&:hover': {
                    background: 'linear-gradient(135deg, #32d86b 0%, #27e8c6 100%)'
                  }
                }
              }}
            >
              <ToggleButton value="chats">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MessageCircle size={18} />
                  Direct Messages
                </Box>
              </ToggleButton>
              <ToggleButton value="teams">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Users size={18} />
                  Teams & Channels
                </Box>
              </ToggleButton>
              <ToggleButton value="activity">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Activity size={18} />
                  Activity Feed
                </Box>
              </ToggleButton>
            </ToggleButtonGroup>

            <Stack direction="row" spacing={1}>
              <TextField
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={18} />
                    </InputAdornment>
                  )
                }}
                size="small"
                sx={{
                  width: 300,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    background: '#f8fafc'
                  }
                }}
              />
              <IconButton
                onClick={() => setShowAdvanced(!showAdvanced)}
                sx={{ color: '#666' }}
              >
                <Settings size={20} />
              </IconButton>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Grid container spacing={3} sx={{ height: 'calc(100vh - 500px)', minHeight: 600 }}>
        {/* Enhanced Users/Teams/Activity List */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            {/* List Header */}
            <Box sx={{ 
              p: 3, 
              background: 'linear-gradient(135deg, rgba(67, 233, 123, 0.1) 0%, rgba(56, 249, 215, 0.1) 100%)',
              borderBottom: '1px solid',
              borderColor: 'divider'
            }}>
              <Typography variant="h6" sx={{ color: '#1a1a1a', fontWeight: 700, mb: 2 }}>
                {viewMode === 'chats' ? 'Conversations' : 
                 viewMode === 'teams' ? 'Teams & Channels' : 'Recent Activity'}
              </Typography>
              {viewMode === 'chats' && (
                <Stack direction="row" spacing={1}>
                  <Chip
                    label="Pinned"
                    size="small"
                    icon={<PushPin size={14} />}
                    sx={{ fontWeight: 600 }}
                  />
                  <Chip
                    label="Recent"
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                </Stack>
              )}
            </Box>

            <List sx={{ flexGrow: 1, overflow: 'auto', p: 0 }}>
              {viewMode === 'chats' && filteredUsers.map((user) => (
                <React.Fragment key={user.id}>
                  <ListItem
                    button
                    onClick={() => handleUserClick(user)}
                    selected={selectedUser?.id === user.id}
                    sx={{
                      py: 2,
                      px: 3,
                      transition: 'all 0.2s ease',
                      '&.Mui-selected': {
                        bgcolor: alpha('#43e97b', 0.1),
                        borderLeft: '4px solid #43e97b',
                      },
                      '&:hover': {
                        bgcolor: alpha('#43e97b', 0.05),
                      }
                    }}
                  >
                    <ListItemAvatar>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={getStatusIcon(user.status)}
                      >
                        <Avatar
                          src={user.avatar}
                          alt={user.name}
                          sx={{ width: 48, height: 48 }}
                        />
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                            {user.name}
                          </Typography>
                          {user.isPinned && (
                            <PushPin size={14} color="#43e97b" />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 0.5 }}>
                            {user.lastMessage}
                          </Typography>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="caption" color="text.secondary">
                              {user.timestamp}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              • {user.role}
                            </Typography>
                          </Stack>
                        </Box>
                      }
                    />
                    {user.unread > 0 && (
                      <Badge
                        badgeContent={user.unread}
                        color="error"
                        sx={{
                          '& .MuiBadge-badge': {
                            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                            color: 'white',
                            fontWeight: 700
                          }
                        }}
                      />
                    )}
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}

              {viewMode === 'teams' && teams.map((team) => (
                <React.Fragment key={team.id}>
                  <ListItem
                    button
                    sx={{
                      py: 2,
                      px: 3,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: alpha('#43e97b', 0.05),
                      }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={team.avatar}
                        alt={team.name}
                        sx={{ width: 48, height: 48 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                          {team.name}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {team.members} members
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Last active: {team.lastActivity}
                          </Typography>
                        </Box>
                      }
                    />
                    <Users size={20} color="#666" />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}

              {viewMode === 'activity' && activities.map((activity) => (
                <React.Fragment key={activity.id}>
                  <ListItem
                    sx={{
                      py: 2,
                      px: 3,
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          background: activity.type === 'document' ? '#4facfe' :
                                    activity.type === 'file' ? '#43e97b' :
                                    activity.type === 'meeting' ? '#f093fb' : '#f5576c'
                        }}
                      >
                        {activity.type === 'document' && <FileText size={18} />}
                        {activity.type === 'file' && <Upload size={18} />}
                        {activity.type === 'meeting' && <Video size={18} />}
                        {activity.type === 'message' && <MessageCircle size={18} />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {activity.user} {activity.action}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="caption" color="text.secondary">
                          {activity.timestamp}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Grid>

        {/* Enhanced Chat Area */}
        <Grid item xs={12} md={8}>
          <Card
            elevation={0}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            {selectedUser ? (
              <>
                {/* Enhanced Chat Header */}
                <Box
                  sx={{
                    p: 3,
                    background: 'linear-gradient(135deg, rgba(67, 233, 123, 0.1) 0%, rgba(56, 249, 215, 0.1) 100%)',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={getStatusIcon(selectedUser.status)}
                    >
                      <Avatar
                        src={selectedUser.avatar}
                        alt={selectedUser.name}
                        sx={{ width: 48, height: 48 }}
                      />
                    </Badge>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {selectedUser.name}
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="caption" sx={{ color: getStatusColor(selectedUser.status), fontWeight: 600 }}>
                          {selectedUser.status}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          • {selectedUser.role}
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                  
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      onClick={toggleVideoCall}
                      sx={{
                        background: isVideoCall ? '#f44336' : alpha('#43e97b', 0.1),
                        color: isVideoCall ? 'white' : '#43e97b',
                        '&:hover': {
                          background: isVideoCall ? '#d32f2f' : alpha('#43e97b', 0.2)
                        }
                      }}
                    >
                      {isVideoCall ? <PhoneOff size={20} /> : <Phone size={20} />}
                    </IconButton>
                    
                    <IconButton
                      onClick={toggleScreenShare}
                      sx={{
                        background: isScreenSharing ? '#ff9800' : alpha('#43e97b', 0.1),
                        color: isScreenSharing ? 'white' : '#43e97b',
                        '&:hover': {
                          background: isScreenSharing ? '#f57c00' : alpha('#43e97b', 0.2)
                        }
                      }}
                    >
                      {isScreenSharing ? <StopScreenShare size={20} /> : <ScreenShare size={20} />}
                    </IconButton>
                    
                    <IconButton
                      sx={{
                        background: alpha('#43e97b', 0.1),
                        '&:hover': { background: alpha('#43e97b', 0.2) }
                      }}
                    >
                      <Video size={20} />
                    </IconButton>
                    
                    <IconButton
                      sx={{
                        background: alpha('#43e97b', 0.1),
                        '&:hover': { background: alpha('#43e97b', 0.2) }
                      }}
                    >
                      <MoreVertical size={20} />
                    </IconButton>
                  </Stack>
                </Box>

                {/* Video Call Interface */}
                {isVideoCall && (
                  <Box sx={{ 
                    p: 3, 
                    background: '#1a1a1a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2
                  }}>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                      Video Call Active
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton sx={{ color: 'white', background: 'rgba(255,255,255,0.2)' }}>
                        <Mic size={20} />
                      </IconButton>
                      <IconButton sx={{ color: 'white', background: 'rgba(255,255,255,0.2)' }}>
                        <Camera size={20} />
                      </IconButton>
                      <IconButton 
                        onClick={toggleVideoCall}
                        sx={{ color: 'white', background: '#f44336' }}
                      >
                        <PhoneOff size={20} />
                      </IconButton>
                    </Box>
                  </Box>
                )}

                {/* Enhanced Messages */}
                <Box sx={{ flexGrow: 1, overflow: 'auto', p: 3, background: '#fafafa' }}>
                  {messages.map((message) => (
                    <Box
                      key={message.id}
                      sx={{
                        display: 'flex',
                        justifyContent: message.sender === 'me' ? 'flex-end' : 'flex-start',
                        mb: 2
                      }}
                    >
                      {message.type === 'system' ? (
                        <Box sx={{ width: '100%', textAlign: 'center', mb: 2 }}>
                          <Chip
                            label={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Info size={14} />
                                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                  {message.text}
                                </Typography>
                              </Box>
                            }
                            size="small"
                            sx={{
                              background: alpha('#43e97b', 0.1),
                              color: '#43e97b'
                            }}
                          />
                        </Box>
                      ) : (
                        <Paper
                          sx={{
                            p: 2,
                            maxWidth: '70%',
                            background: message.sender === 'me'
                              ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
                              : 'white',
                            color: message.sender === 'me' ? 'white' : 'text.primary',
                            borderRadius: 3,
                            boxShadow: message.sender === 'me'
                              ? '0 4px 12px rgba(67, 233, 123, 0.3)'
                              : '0 2px 8px rgba(0,0,0,0.1)',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              boxShadow: message.sender === 'me'
                                ? '0 6px 16px rgba(67, 233, 123, 0.4)'
                                : '0 4px 12px rgba(0,0,0,0.15)'
                            }
                          }}
                        >
                          {message.type === 'file' && (
                            <Card
                              elevation={0}
                              sx={{
                                mb: 1,
                                p: 1.5,
                                background: alpha(message.sender === 'me' ? 'white' : '#43e97b', 0.1),
                                borderRadius: 2
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <FileText size={16} />
                                <Box>
                                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                    {message.fileName}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                    {message.fileSize}
                                  </Typography>
                                </Box>
                              </Box>
                            </Card>
                          )}
                          
                          <Typography variant="body1" sx={{ mb: 0.5 }}>
                            {message.text}
                          </Typography>

                          {/* Message Reactions */}
                          {message.reactions && message.reactions.length > 0 && (
                            <Stack direction="row" spacing={0.5} sx={{ mt: 1 }}>
                              {message.reactions.map((reaction, index) => (
                                <Tooltip key={index} title={`${reaction.users.join(', ')} reacted with ${reaction.emoji}`}>
                                  <Chip
                                    label={`${reaction.emoji} ${reaction.users.length}`}
                                    size="small"
                                    onClick={() => handleReaction(message.id, reaction.emoji)}
                                    sx={{
                                      background: reaction.users.includes('You') 
                                        ? alpha('#43e97b', 0.2) 
                                        : alpha('#000', 0.05),
                                      color: reaction.users.includes('You') ? '#43e97b' : 'text.secondary',
                                      fontSize: '0.7rem',
                                      height: 20,
                                      '&:hover': {
                                        background: reaction.users.includes('You') 
                                          ? alpha('#43e97b', 0.3) 
                                          : alpha('#000', 0.1)
                                      }
                                    }}
                                  />
                                </Tooltip>
                              ))}
                            </Stack>
                          )}
                          
                          <Typography
                            variant="caption"
                            sx={{
                              display: 'block',
                              textAlign: 'right',
                              opacity: message.sender === 'me' ? 0.8 : 0.6
                            }}
                          >
                            {message.timestamp}
                          </Typography>
                        </Paper>
                      )}
                    </Box>
                  ))}
                  
                  {/* Typing Indicator */}
                  {typingUsers.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                      <Paper
                        sx={{
                          p: 2,
                          background: 'white',
                          borderRadius: 3,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
                        </Typography>
                      </Paper>
                    </Box>
                  )}
                  
                  <div ref={messagesEndRef} />
                </Box>

                {/* Enhanced Message Input */}
                <Box
                  sx={{
                    p: 3,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    background: 'white'
                  }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="flex-end">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                      id="file-attachment"
                      accept=".pdf,.doc,.docx,.jpg,.png,.txt"
                    />
                    
                    <IconButton
                      component="label"
                      htmlFor="file-attachment"
                      sx={{
                        background: alpha('#43e97b', 0.1),
                        '&:hover': { background: alpha('#43e97b', 0.2) }
                      }}
                    >
                      <Paperclip size={20} />
                    </IconButton>
                    
                    <IconButton
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      sx={{
                        background: alpha('#43e97b', 0.1),
                        '&:hover': { background: alpha('#43e97b', 0.2) }
                      }}
                    >
                      <Smile size={20} />
                    </IconButton>
                    
                    <TextField
                      fullWidth
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      multiline
                      maxRows={4}
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3,
                          background: alpha('#43e97b', 0.05)
                        }
                      }}
                    />
                    
                    <Button
                      variant="contained"
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      endIcon={<Send size={18} />}
                      sx={{
                        borderRadius: 3,
                        px: 3,
                        py: 1.5,
                        fontWeight: 600,
                        background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                        boxShadow: '0 4px 12px rgba(67, 233, 123, 0.4)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #32d86b 0%, #27e8c6 100%)'
                        },
                        '&:disabled': {
                          background: '#e0e0e0',
                          boxShadow: 'none'
                        }
                      }}
                    >
                      Send
                    </Button>
                  </Stack>
                </Box>
              </>
            ) : (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '100%',
                background: 'linear-gradient(135deg, rgba(67, 233, 123, 0.05) 0%, rgba(56, 249, 215, 0.05) 100%)'
              }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      boxShadow: '0 8px 24px rgba(67, 233, 123, 0.3)'
                    }}
                  >
                    <MessageCircle size={56} color="white" />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    Select a Conversation
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Choose a contact or team to start collaborating
                  </Typography>
                  
                  <Button
                    variant="contained"
                    startIcon={<Plus size={18} />}
                    sx={{
                      mt: 3,
                      borderRadius: 3,
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                      boxShadow: '0 4px 12px rgba(67, 233, 123, 0.4)'
                    }}
                  >
                    Start New Conversation
                  </Button>
                </Box>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
