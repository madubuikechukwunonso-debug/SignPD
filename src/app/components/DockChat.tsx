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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  PhoneOff,
  ScreenShare,
  StopScreenShare,
  PushPin,
  Info,
  FileText, // ← Added for file icon in messages
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
  sender: 'me' | 'other' | 'system';
  text: string;
  timestamp: string;
  type: 'text' | 'file' | 'image' | 'system';
  fileName?: string;
  fileSize?: string;
  reactions?: { emoji: string; users: string[] }[];
}

export function DockChat() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'chats' | 'teams' | 'activity'>('chats');
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'other',
      text: 'Hey! Did you check the latest document templates? They look amazing!',
      timestamp: '10:30 AM',
      type: 'text',
      reactions: [{ emoji: '👍', users: ['John', 'Sarah'] }],
    },
    {
      id: 2,
      sender: 'me',
      text: 'Yes! The invoice templates look great. I purchased the bundle yesterday.',
      timestamp: '10:32 AM',
      type: 'text',
    },
    {
      id: 3,
      sender: 'other',
      text: 'Awesome! Let me know if you need help with the customization. I can share some tips.',
      timestamp: '10:33 AM',
      type: 'text',
    },
    {
      id: 4,
      sender: 'system',
      text: 'Document shared: Financial_Report_Q4_2024.pdf (2.4 MB)',
      timestamp: '10:35 AM',
      type: 'file',
      fileName: 'Financial_Report_Q4_2024.pdf',
      fileSize: '2.4 MB',
    },
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
      isPinned: true,
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
      department: 'Legal',
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
      department: 'Operations',
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
      department: 'Strategy',
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
      isPinned: true,
    },
  ];

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
        fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      };
      setMessages([...messages, newMessage]);
    }
  };

  const toggleVideoCall = () => setIsVideoCall(!isVideoCall);
  const toggleScreenShare = () => setIsScreenSharing(!isScreenSharing);

  const handleReaction = (messageId: number, emoji: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => {
        if (msg.id === messageId) {
          const existing = msg.reactions?.find((r) => r.emoji === emoji);
          if (existing) {
            return {
              ...msg,
              reactions: msg.reactions?.map((r) =>
                r.emoji === emoji
                  ? {
                      ...r,
                      users: r.users.includes('You')
                        ? r.users.filter((u) => u !== 'You')
                        : [...r.users, 'You'],
                    }
                  : r
              ),
            };
          }
          return {
            ...msg,
            reactions: [...(msg.reactions || []), { emoji, users: ['You'] }],
          };
        }
        return msg;
      })
    );
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: 'me',
        text: messageText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
      };
      setMessages([...messages, newMessage]);
      setMessageText('');

      setTimeout(() => {
        setTypingUsers([selectedUser?.name || 'Someone']);
        setTimeout(() => setTypingUsers([]), 2000);
      }, 1000);
    }
  };

  return (
    <TooltipProvider>
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

        {/* Stats Cards - placeholder (you can fill in real data later) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-500 to-teal-400 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between mb-4">
                <Users className="h-8 w-8" />
                <Badge variant="secondary">+12</Badge>
              </div>
              <h3 className="text-3xl font-bold">247</h3>
              <p>Active Users</p>
            </CardContent>
          </Card>
          {/* Add other stat cards similarly */}
        </div>

        {/* Tabs */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'chats' | 'teams' | 'activity')}>
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="ghost" size="icon">
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
                <CardTitle>Conversations</CardTitle>
              </CardHeader>
              <ScrollArea className="flex-1">
                <div className="space-y-0">
                  {users.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleUserClick(user)}
                      className={`
                        w-full text-left p-4 hover:bg-accent transition-colors flex items-center gap-4
                        ${selectedUser?.id === user.id ? 'bg-accent border-l-4 border-green-500' : ''}
                      `}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute bottom-0 right-0">
                          {getStatusDot(user.status)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold truncate">{user.name}</p>
                          {user.isPinned && <PushPin className="h-4 w-4 text-green-500" />}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{user.lastMessage}</p>
                        <p className="text-xs text-muted-foreground mt-1">{user.timestamp}</p>
                      </div>
                      {user.unread > 0 && (
                        <Badge className="bg-green-500 text-white">{user.unread}</Badge>
                      )}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-8">
            <Card className="h-full flex flex-col">
              {selectedUser ? (
                <>
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
                        <p className="text-sm text-muted-foreground">
                          {selectedUser.status} • {selectedUser.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
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
                                <div className="flex gap-1 mt-2">
                                  {message.reactions.map((r, i) => (
                                    <Tooltip key={i}>
                                      <TooltipTrigger asChild>
                                        <Badge
                                          variant="secondary"
                                          className="cursor-pointer"
                                          onClick={() => handleReaction(message.id, r.emoji)}
                                        >
                                          {r.emoji} {r.users.length}
                                        </Badge>
                                      </TooltipTrigger>
                                      <TooltipContent>{r.users.join(', ')} reacted</TooltipContent>
                                    </Tooltip>
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

                  <div className="p-4 border-t">
                    <div className="flex items-end gap-3">
                      <input type="file" onChange={handleFileUpload} className="hidden" id="file-attachment" />
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessageText(e.target.value)}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
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
                    <p className="text-muted-foreground">Choose a contact or team to start collaborating</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
