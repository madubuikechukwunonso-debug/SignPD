import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  AvatarGroup,
  IconButton,
  Stack,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Badge,
  Tooltip,
  Fab,
  Paper
} from '@mui/material';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Users,
  FileText,
  Video,
  Phone,
  LocationOn,
  Description,
  Event,
  Today,
  Schedule,
  Notifications,
  CheckCircle,
  Pending,
  Cancel,
  Edit,
  Delete,
  Filter,
  Search,
  Star,
  PushPin,
  Visibility,
  Share,
  Download,
  Upload
} from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: 'document-deadline' | 'meeting' | 'workflow' | 'reminder' | 'task';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  participants: string[];
  documents: string[];
  location?: string;
  isRecurring: boolean;
  recurrencePattern?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  isPinned: boolean;
  notifications: boolean;
  createdBy: string;
  tags: string[];
  color: string;
}

interface CalendarView {
  type: 'month' | 'week' | 'day' | 'agenda';
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [view, setView] = useState<CalendarView['type']>('month');
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample events data
  useEffect(() => {
    const sampleEvents: CalendarEvent[] = [
      {
        id: '1',
        title: 'Document Signing Deadline',
        description: 'Complete signing of Q4 financial reports',
        date: new Date(2024, 0, 15),
        startTime: '14:00',
        endTime: '16:00',
        type: 'document-deadline',
        priority: 'high',
        status: 'scheduled',
        participants: ['John Doe', 'Jane Smith'],
        documents: ['Q4_Financial_Report.pdf'],
        location: 'Conference Room A',
        isRecurring: false,
        isPinned: true,
        notifications: true,
        createdBy: 'John Doe',
        tags: ['finance', 'deadline'],
        color: '#f44336'
      },
      {
        id: '2',
        title: 'Team Review Meeting',
        description: 'Weekly team sync and document review',
        date: new Date(2024, 0, 18),
        startTime: '10:00',
        endTime: '11:30',
        type: 'meeting',
        priority: 'medium',
        status: 'scheduled',
        participants: ['Sarah Johnson', 'Mike Chen', 'Emily Davis'],
        documents: ['Weekly_Report.docx'],
        location: 'Virtual Meeting',
        isRecurring: true,
        recurrencePattern: 'weekly',
        isPinned: false,
        notifications: true,
        createdBy: 'Sarah Johnson',
        tags: ['team', 'review'],
        color: '#2196f3'
      },
      {
        id: '3',
        title: 'Contract Workflow',
        description: 'Legal contract approval workflow',
        date: new Date(2024, 0, 20),
        startTime: '09:00',
        endTime: '17:00',
        type: 'workflow',
        priority: 'urgent',
        status: 'in-progress',
        participants: ['Mike Chen', 'Legal Team'],
        documents: ['Partnership_Contract.pdf'],
        isRecurring: false,
        isPinned: true,
        notifications: true,
        createdBy: 'Mike Chen',
        tags: ['legal', 'contract'],
        color: '#ff9800'
      }
    ];
    setEvents(sampleEvents);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#f44336';
      case 'high': return '#ff9800';
      case 'medium': return '#2196f3';
      case 'low': return '#4caf50';
      default: return '#9e9e9e';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document-deadline': return <FileText size={16} />;
      case 'meeting': return <Video size={16} />;
      case 'workflow': return <Schedule size={16} />;
      case 'reminder': return <Notifications size={16} />;
      case 'task': return <CheckCircle size={16} />;
      default: return <Event size={16} />;
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesType = filterType === 'all' || event.type === filterType;
    const matchesPriority = filterPriority === 'all' || event.priority === filterPriority;
    const matchesSearch = searchQuery === '' || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesPriority && matchesSearch;
  });

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowEventDialog(true);
  };

  const handleCreateEvent = () => {
    // Create new event logic here
    setShowEventDialog(false);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2
          }}
        >
          Calendar & Scheduling
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage document deadlines, meetings, and workflows
        </Typography>
      </Box>

      {/* Controls */}
      <Card elevation={0} sx={{ borderRadius: 3, mb: 4, border: '1px solid', borderColor: 'divider' }}>
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" flexWrap="wrap">
            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton onClick={() => navigateMonth('prev')}>
                <ChevronLeft />
              </IconButton>
              
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </Typography>
              
              <IconButton onClick={() => navigateMonth('next')}>
                <ChevronRight />
              </IconButton>

              <Button
                variant="outlined"
                startIcon={<Today />}
                onClick={() => setCurrentDate(new Date())}
                sx={{ borderRadius: 2 }}
              >
                Today
              </Button>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center">
              <ToggleButtonGroup
                value={view}
                exclusive
                onChange={(e, value) => value && setView(value)}
                sx={{
                  '& .MuiToggleButton-root': {
                    borderRadius: 2,
                    border: 'none',
                    background: '#f5f5f5',
                    '&.Mui-selected': {
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white'
                    }
                  }
                }}
              >
                <ToggleButton value="month">Month</ToggleButton>
                <ToggleButton value="week">Week</ToggleButton>
                <ToggleButton value="day">Day</ToggleButton>
                <ToggleButton value="agenda">Agenda</ToggleButton>
              </ToggleButtonGroup>

              <Button
                variant="contained"
                startIcon={<Plus />}
                onClick={() => setShowEventDialog(true)}
                sx={{
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                New Event
              </Button>
            </Stack>
          </Stack>

          {/* Filters */}
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
            <TextField
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <Search size={20} style={{ marginRight: 8 }} />
              }}
              size="small"
              sx={{ width: 300 }}
            />

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={filterType}
                label="Type"
                onChange={(e) => setFilterType(e.target.value)}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="document-deadline">Document Deadline</MenuItem>
                <MenuItem value="meeting">Meeting</MenuItem>
                <MenuItem value="workflow">Workflow</MenuItem>
                <MenuItem value="reminder">Reminder</MenuItem>
                <MenuItem value="task">Task</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={filterPriority}
                label="Priority"
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <MenuItem value="all">All Priorities</MenuItem>
                <MenuItem value="urgent">Urgent</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Calendar Grid */}
        <Grid item xs={12} md={view === 'agenda' ? 12 : 8}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 0 }}>
              {view === 'month' && (
                <>
                  {/* Weekday Headers */}
                  <Grid container sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                    {weekDays.map(day => (
                      <Grid item xs={12/7} key={day}>
                        <Box sx={{ p: 2, textAlign: 'center', background: '#f8f9fa' }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {day}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  {/* Calendar Days */}
                  <Grid container>
                    {getDaysInMonth(currentDate).map((day, index) => (
                      <Grid item xs={12/7} key={index}>
                        {day ? (
                          <Paper
                            sx={{
                              p: 1,
                              minHeight: 100,
                              cursor: 'pointer',
                              background: day.toDateString() === new Date().toDateString() 
                                ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
                                : 'white',
                              border: day.toDateString() === new Date().toDateString()
                                ? '2px solid #667eea'
                                : '1px solid #e0e0e0',
                              borderRadius: 1,
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)'
                              }
                            }}
                            onClick={() => handleDateClick(day)}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: day.toDateString() === new Date().toDateString() ? 700 : 600,
                                mb: 1
                              }}
                            >
                              {day.getDate()}
                            </Typography>
                            
                            <Stack spacing={0.5} sx={{ maxHeight: 80, overflow: 'auto' }}>
                              {getEventsForDate(day).slice(0, 3).map(event => (
                                <Chip
                                  key={event.id}
                                  label={event.title}
                                  size="small"
                                  icon={getTypeIcon(event.type)}
                                  sx={{
                                    fontSize: '0.7rem',
                                    height: 20,
                                    background: alpha(event.color, 0.1),
                                    color: event.color,
                                    '& .MuiChip-icon': {
                                      fontSize: '14px'
                                    }
                                  }}
                                />
                              ))}
                              
                              {getEventsForDate(day).length > 3 && (
                                <Typography variant="caption" color="text.secondary">
                                  +{getEventsForDate(day).length - 3} more
                                </Typography>
                              )}
                            </Stack>
                          </Paper>
                        ) : (
                          <Box sx={{ minHeight: 100 }} />
                        )}
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}

              {view === 'agenda' && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                    Upcoming Events
                  </Typography>
                  
                  <List>
                    {filteredEvents.sort((a, b) => a.date.getTime() - b.date.getTime()).map((event, index) => (
                      <React.Fragment key={event.id}>
                        <ListItem
                          sx={{
                            borderRadius: 2,
                            mb: 1,
                            background: alpha(event.color, 0.05),
                            border: `1px solid ${alpha(event.color, 0.2)}`,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              background: alpha(event.color, 0.1),
                              transform: 'translateX(4px)'
                            }
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar sx={{ background: event.color }}>
                              {getTypeIcon(event.type)}
                            </Avatar>
                          </ListItemAvatar>
                          
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                  {event.title}
                                </Typography>
                                {event.isPinned && <PushPin size={14} color="#667eea" />}
                              </Box>
                            }
                            secondary={
                              <Stack spacing={0.5}>
                                <Typography variant="body2" color="text.secondary">
                                  {event.description}
                                </Typography>
                                <Stack direction="row" spacing={1} alignItems="center">
                                  <CalendarIcon size={14} />
                                  <Typography variant="caption">
                                    {event.date.toLocaleDateString()} at {event.startTime} - {event.endTime}
                                  </Typography>
                                </Stack>
                                <Stack direction="row" spacing={1} alignItems="center">
                                  <Users size={14} />
                                  <Typography variant="caption">
                                    {event.participants.length} participants
                                  </Typography>
                                </Stack>
                              </Stack>
                            }
                          />
                          
                          <Stack direction="row" spacing={1}>
                            <Chip
                              label={event.priority}
                              size="small"
                              sx={{
                                background: alpha(getPriorityColor(event.priority), 0.1),
                                color: getPriorityColor(event.priority),
                                fontWeight: 600
                              }}
                            />
                            <IconButton size="small">
                              <Edit size={16} />
                            </IconButton>
                          </Stack>
                        </ListItem>
                        {index < filteredEvents.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar - Event Details & Quick Stats */}
        {view !== 'agenda' && (
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* Quick Stats */}
              <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    This Month
                  </Typography>
                  
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Event size={18} color="#667eea" />
                        <Typography variant="body2">Total Events</Typography>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {filteredEvents.length}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircle size={18} color="#4caf50" />
                        <Typography variant="body2">Completed</Typography>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#4caf50' }}>
                        {filteredEvents.filter(e => e.status === 'completed').length}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Pending size={18} color="#ff9800" />
                        <Typography variant="body2">In Progress</Typography>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#ff9800' }}>
                        {filteredEvents.filter(e => e.status === 'in-progress').length}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Upcoming Events
                  </Typography>
                  
                  <Stack spacing={2}>
                    {filteredEvents.slice(0, 5).map(event => (
                      <Paper
                        key={event.id}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          background: alpha(event.color, 0.05),
                          border: `1px solid ${alpha(event.color, 0.2)}`
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {event.title}
                          </Typography>
                          {event.isPinned && <PushPin size={14} color="#667eea" />}
                        </Box>
                        
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                          {event.date.toLocaleDateString()} • {event.startTime}
                        </Typography>
                        
                        <Stack direction="row" spacing={1}>
                          <Chip
                            label={event.type}
                            size="small"
                            icon={getTypeIcon(event.type)}
                            sx={{
                              fontSize: '0.7rem',
                              height: 18,
                              background: alpha(event.color, 0.1),
                              color: event.color
                            }}
                          />
                          <Chip
                            label={event.priority}
                            size="small"
                            sx={{
                              fontSize: '0.7rem',
                              height: 18,
                              background: alpha(getPriorityColor(event.priority), 0.1),
                              color: getPriorityColor(event.priority)
                            }}
                          />
                        </Stack>
                      </Paper>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              {/* Event Types Legend */}
              <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Event Types
                  </Typography>
                  
                  <Stack spacing={1.5}>
                    {[
                      { type: 'document-deadline', label: 'Document Deadline', color: '#f44336' },
                      { type: 'meeting', label: 'Meeting', color: '#2196f3' },
                      { type: 'workflow', label: 'Workflow', color: '#ff9800' },
                      { type: 'reminder', label: 'Reminder', color: '#9c27b0' },
                      { type: 'task', label: 'Task', color: '#4caf50' }
                    ].map(item => (
                      <Box key={item.type} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            background: item.color
                          }}
                        />
                        <Typography variant="body2">{item.label}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        )}
      </Grid>

      {/* Event Creation/Edit Dialog */}
      <Dialog
        open={showEventDialog}
        onClose={() => setShowEventDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          {selectedEvent ? 'Edit Event' : 'Create New Event'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Event Title"
              placeholder="Enter event title"
              variant="outlined"
              sx={{ borderRadius: 2 }}
            />
            
            <TextField
              fullWidth
              label="Description"
              placeholder="Enter event description"
              multiline
              rows={3}
              variant="outlined"
              sx={{ borderRadius: 2 }}
            />
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Event Type</InputLabel>
                  <Select label="Event Type">
                    <MenuItem value="document-deadline">Document Deadline</MenuItem>
                    <MenuItem value="meeting">Meeting</MenuItem>
                    <MenuItem value="workflow">Workflow</MenuItem>
                    <MenuItem value="reminder">Reminder</MenuItem>
                    <MenuItem value="task">Task</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select label="Priority">
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="urgent">Urgent</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  defaultValue={selectedDate?.toISOString().split('T')[0]}
                />
              </Grid>
              
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Start Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="End Time"
                  type="time"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
            
            <TextField
              fullWidth
              label="Location"
              placeholder="Enter location (optional)"
              variant="outlined"
            />
            
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Participants
              </Typography>
              <AvatarGroup max={4}>
                <Avatar alt="John Doe" src="/avatar1.jpg" />
                <Avatar alt="Jane Smith" src="/avatar2.jpg" />
                <Avatar alt="Mike Chen" src="/avatar3.jpg" />
                <Avatar alt="Sarah Johnson" src="/avatar4.jpg" />
              </AvatarGroup>
            </Box>
            
            <Stack direction="row" spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select label="Status" defaultValue="scheduled">
                  <MenuItem value="scheduled">Scheduled</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth>
                <InputLabel>Recurrence</InputLabel>
                <Select label="Recurrence" defaultValue="none">
                  <MenuItem value="none">Does not repeat</MenuItem>
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="yearly">Yearly</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setShowEventDialog(false)} sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateEvent}
            sx={{
              borderRadius: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            {selectedEvent ? 'Update Event' : 'Create Event'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Quick Add Event FAB */}
      <Fab
        color="primary"
        aria-label="add event"
        onClick={() => setShowEventDialog(true)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5568d3 0%, #6b4190 100%)'
          }
        }}
      >
        <Plus />
      </Fab>
    </Box>
  );
};

export default Calendar;
