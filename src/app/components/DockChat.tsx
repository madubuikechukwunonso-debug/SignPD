import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
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
    { id: 1, name: 'Design Team', members: 8, avatar: 'https://i.pravatar.cc/150?img=11', lastActivity: '2 min ago' },
    { id: 2, name: 'Legal Department', members: 5, avatar: 'https://i.pravatar.cc/150?img=12', lastActivity: '15 min ago' },
    { id: 3, name: 'Finance Team', members: 12, avatar: 'https://i.pravatar.cc/150?img=13', lastActivity: '1 hour ago' }
  ];

  const activities: ActivityItem[] = [
    { id: '1', user: 'Sarah Johnson', action: 'shared a document template', timestamp: '2 min ago', type: 'document' },
    { id: '2', user: 'Mike Chen', action: 'completed contract review', timestamp: '5 min ago', type: 'file' },
    { id: '3', user: 'Emily Davis', action: 'started a video call', timestamp: '12 min ago', type: 'meeting' }
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

      setTimeout(() => {
        setTypingUsers([selectedUser?.name || 'Other']);
        setTimeout(() => setTypingUsers([]), 2000);
      }, 1000);
    }
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const getStatusColor = (status: 'online' | 'offline' | 'away' | 'busy') => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-orange-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusDot = (status: string) => {
    const color = getStatusColor(status as any);
    return <div className={`w-3 h-3 rounded-full ${color} ring-2 ring-white`} />;
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

  const toggleVideoCall = () => setIsVideoCall(!isVideoCall);
  const toggleScreenShare = () => setIsScreenSharing(!isScreenSharing);

  const handleReaction = (messageId: number, emoji: string) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        const existing = msg.reactions?.find(r => r.emoji === emoji);
        if (existing) {
          return {
            ...msg,
            reactions: msg.reactions?.map(r =>
              r.emoji === emoji
                ? { ...r, users: r.users.includes('You') ? r.users.filter(u => u !== 'You') : [...r.users, 'You'] }
                : r
            )
          };
        } else {
          return { ...msg, reactions: [...(msg.reactions || []), { emoji, users: ['You'] }] };
        }
      }
      return msg;
    }));
  };

  return (
    <div className="space-y-8 p-4 md:p-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-green-500 to-teal-400 bg-clip-text text-transparent">
          Enterprise Team Collaboration
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Connect, collaborate, and share documents with your team in real-time with enterprise-grade security
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: <Users className="h-6 w-6" />, label: 'Active Users', value: '247', change: '+12 online', gradient: 'from-green-500 to-green-400' },
          { icon: <MessageCircle className="h-6 w-6" />, label: 'Messages Today', value: '1,823', change: '+245 from yesterday', gradient: 'from-teal-500 to-teal-400' },
          { icon: <Activity className="h-6 w-6" />, label: 'Avg. Response Time', value: '< 2m', change: '98% SLA met', gradient: 'from-blue-500 to-blue-400' },
          { icon: <Video className="h-6 w-6" />, label: 'Active Calls', value: '18', change: '6 screen sharing', gradient: 'from-purple-500 to-purple-400' }
        ].map((stat, i) => (
          <Card key={i} className={`bg-gradient-to-br ${stat.gradient} text-white border-0 hover:-translate-y-1 transition-all shadow-lg`}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-lg bg-white/20 backdrop-blur">{stat.icon}</div>
                <Badge variant="secondary" className="bg-white/20 border-0">{stat.change}</Badge>
              </div>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-sm opacity-90">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation Tabs */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)} className="w-full sm:w-auto">
              <TabsList className="grid w-full grid-cols-3 sm:w-auto">
                <TabsTrigger value="chats" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" /> Direct Messages
                </TabsTrigger>
                <TabsTrigger value="teams" className="flex items-center gap-2">
                  <Users className="h-4 w-4" /> Teams & Channels
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" /> Activity Feed
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowAdvanced(!showAdvanced)}>
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[600px]">
        {/* Sidebar */}
        <div className="lg:col-span-4">
          <Card className="h-full flex flex-col">
            <CardHeader className="bg-gradient-to-r from-green-500/10 to-teal-400/10">
              <CardTitle>
                {viewMode === 'chats' ? 'Conversations' : viewMode === 'teams' ? 'Teams & Channels' : 'Recent Activity'}
              </CardTitle>
              {viewMode === 'chats' && (
                <div className="flex gap-2 mt-3">
                  <Badge variant="secondary"><PushPin className="h-3 w-3 mr-1" />Pinned</Badge>
                  <Badge variant="secondary">Recent</Badge>
                </div>
              )}
            </CardHeader>
            <ScrollArea className="flex-1">
              {viewMode === 'chats' && filteredUsers.map((user) => (
                <div key={user.id}>
                  <button
                    onClick={() => handleUserClick(user)}
                    className={`w-full text-left p-4 hover:bg-accent transition-colors ${selectedUser?.id === user.id ? 'bg-accent border-l-4 border-green-500' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-0 right-0">{getStatusDot(user.status)}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold truncate">{user.name}</p>
                          {user.isPinned && <PushPin className="h-4 w-4 text-green-500" />}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{user.lastMessage}</p>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-xs text-muted-foreground">{user.timestamp} • {user.role}</p>
                        </div>
                      </div>
                      {user.unread > 0 && (
                        <Badge className="bg-gradient-to-r from-green-500 to-teal-400 text-white">
                          {user.unread}
                        </Badge>
                      )}
                    </div>
                  </button>
                  <Separator />
                </div>
              ))}

              {viewMode === 'teams' && teams.map((team) => (
                <div key={team.id}>
                  <button className="w-full text-left p-4 hover:bg-accent transition-colors flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={team.avatar} />
                      <AvatarFallback>{team.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{team.name}</p>
                      <p className="text-sm text-muted-foreground">{team.members} members • Last active: {team.lastActivity}</p>
                    </div>
                    <Users className="h-5 w-5 text-muted-foreground ml-auto" />
                  </button>
                  <Separator />
                </div>
              ))}

              {viewMode === 'activity' && activities.map((activity) => (
                <div key={activity.id}>
                  <div className="p-4 flex items-center gap-4">
                    <Avatar className={activity.type === 'document' ? 'bg-blue-500' : activity.type === 'file' ? 'bg-green-500' : activity.type === 'meeting' ? 'bg-purple-500' : 'bg-red-500'}>
                      {activity.type === 'document' && <FileText className="h-5 w-5 text-white" />}
                      {activity.type === 'file' && <Upload className="h-5 w-5 text-white" />}
                      {activity.type === 'meeting' && <Video className="h-5 w-5 text-white" />}
                    </Avatar>
                    <div>
                      <p className="font-medium">{activity.user} {activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                  <Separator />
                </div>
              ))}
            </ScrollArea>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-8">
          <Card className="h-full flex flex-col">
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="p-4 bg-gradient-to-r from-green-500/10 to-teal-400/10 border-b flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={selectedUser.avatar} />
                        <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-0 right-0">{getStatusDot(selectedUser.status)}</div>
                    </div>
                    <div>
                      <h3 className="font-bold">{selectedUser.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className={`font-medium ${getStatusColor(selectedUser.status).replace('bg-', 'text-')}`}>
                          {selectedUser.status}
                        </span>
                        <span>• {selectedUser.role}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant={isVideoCall ? "destructive" : "secondary"} size="icon" onClick={toggleVideoCall}>
                      {isVideoCall ? <PhoneOff className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
                    </Button>
                    <Button variant={isScreenSharing ? "default" : "secondary"} size="icon" onClick={toggleScreenShare}>
                      {isScreenSharing ? <StopScreenShare className="h-5 w-5" /> : <ScreenShare className="h-5 w-5" />}
                    </Button>
                    <Button variant="secondary" size="icon"><Video className="h-5 w-5" /></Button>
                    <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5" /></Button>
                  </div>
                </div>

                {/* Video Call Bar */}
                {isVideoCall && (
                  <div className="p-4 bg-black flex items-center justify-center gap-4">
                    <p className="text-white font-medium">Video Call Active</p>
                    <div className="flex gap-2">
                      <Button size="icon" variant="secondary"><Mic className="h-5 w-5" /></Button>
                      <Button size="icon" variant="secondary"><Camera className="h-5 w-5" /></Button>
                      <Button size="icon" variant="destructive" onClick={toggleVideoCall}><PhoneOff className="h-5 w-5" /></Button>
                    </div>
                  </div>
                )}

                {/* Messages */}
                <ScrollArea className="flex-1 p-6 bg-muted/30">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                        {message.type === 'system' ? (
                          <div className="w-full text-center my-4">
                            <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                              <Info className="h-3 w-3 mr-1" /> {message.text}
                            </Badge>
                          </div>
                        ) : (
                          <div className={`max-w-[70%] rounded-2xl p-4 shadow-md ${message.sender === 'me' ? 'bg-gradient-to-r from-green-500 to-teal-400 text-white' : 'bg-white'}`}>
                            {message.type === 'file' && (
                              <div className="mb-3 p-3 bg-white/20 rounded-lg flex items-center gap-3">
                                <FileText className="h-5 w-5" />
                                <div>
                                  <p className="text-sm font-medium">{message.fileName}</p>
                                  <p className="text-xs opacity-80">{message.fileSize}</p>
                                </div>
                              </div>
                            )}
                            <p className="text-sm">{message.text}</p>

                            {message.reactions && message.reactions.length > 0 && (
                              <div className="flex gap-1 mt-2 flex-wrap">
                                {message.reactions.map((r, i) => (
                                  <TooltipProvider key={i}>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Badge
                                          variant="secondary"
                                          className={`cursor-pointer ${r.users.includes('You') ? 'bg-green-500/20' : ''}`}
                                          onClick={() => handleReaction(message.id, r.emoji)}
                                        >
                                          {r.emoji} {r.users.length}
                                        </Badge>
                                      </TooltipTrigger>
                                      <TooltipContent>{r.users.join(', ')} reacted with {r.emoji}</TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                ))}
                              </div>
                            )}

                            <p className="text-xs mt-2 text-right opacity-70">{message.timestamp}</p>
                          </div>
                        )}
                      </div>
                    ))}

                    {typingUsers.length > 0 && (
                      <div className="flex justify-start">
                        <div className="bg-white rounded-2xl p-4 shadow-md">
                          <p className="text-sm text-muted-foreground">
                            {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
                          </p>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 border-t">
                  <div className="flex items-end gap-3">
                    <input type="file" onChange={handleFileUpload} className="hidden" id="file-attachment" accept=".pdf,.doc,.docx,.jpg,.png,.txt" />
                    <Button asChild variant="ghost" size="icon">
                      <label htmlFor="file-attachment" className="cursor-pointer">
                        <Paperclip className="h-5 w-5" />
                      </label>
                    </Button>

                    <Button variant="ghost" size="icon" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                      <Smile className="h-5 w-5" />
                    </Button>

                    <Input
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="flex-1"
                    />

                    <Button
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      className="bg-gradient-to-r from-green-500 to-teal-400 hover:from-green-600 hover:to-teal-500"
                    >
                      <Send className="h-4 w-4 mr-2" /> Send
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gradient-to-r from-green-500/5 to-teal-400/5">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-green-500 to-teal-400 flex items-center justify-center mx-auto mb-6 shadow-2xl">
                    <MessageCircle className="h-16 w-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Select a Conversation</h3>
                  <p className="text-muted-foreground mb-6">Choose a contact or team to start collaborating</p>
                  <Button className="bg-gradient-to-r from-green-500 to-teal-400 hover:from-green-600 hover:to-teal-500">
                    <Plus className="h-4 w-4 mr-2" /> Start New Conversation
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
