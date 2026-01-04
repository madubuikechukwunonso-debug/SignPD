import React, { useState } from 'react';
import { Tabs, Tab, Box, AppBar, Toolbar, Typography, Container, Avatar, IconButton, Badge, Menu, MenuItem, Button } from '@mui/material';
import { FilePen, RefreshCw, Store, MessageSquare, Bell, Settings, User, ChevronDown, Search, Plus } from 'lucide-react';
import { SignPD } from './components/SignPD';
import { DocFun } from './components/DocFun';
import { DocPawn } from './components/DocPawn';
import { DockChat } from './components/DockChat';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 4 }}>{children}</Box>}
    </div>
  );
}

export default function App() {
  const [currentTab, setCurrentTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsEl, setNotificationsEl] = useState<null | HTMLElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsClose = () => {
    setNotificationsEl(null);
  };

  const tabConfigs = [
    { icon: FilePen, label: 'Document Signing', description: 'Secure digital signatures' },
    { icon: RefreshCw, label: 'File Converter', description: 'Format transformation' },
    { icon: Store, label: 'Template Store', description: 'Professional templates' },
    { icon: MessageSquare, label: 'Team Collaboration', description: 'Real-time communication' }
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      {/* Enterprise AppBar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          color: '#1a1a1a'
        }}
      >
        <Toolbar sx={{ py: 1, px: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexGrow: 1 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)'
              }}
            >
              <FilePen size={24} color="white" />
            </Box>
            <Box>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: '#1a1a1a',
                  fontSize: '1.5rem'
                }}
              >
                SignPro Enterprise
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#666',
                  letterSpacing: '0.5px',
                  fontSize: '0.75rem',
                  fontWeight: 500
                }}
              >
                Document Management Platform
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<Plus size={18} />}
              sx={{
                borderRadius: '8px',
                px: 2,
                py: 1,
                fontWeight: 600,
                borderColor: '#e0e0e0',
                color: '#666',
                '&:hover': {
                  borderColor: '#667eea',
                  color: '#667eea'
                }
              }}
            >
              New Document
            </Button>
            
            <IconButton
              onClick={handleNotificationsClick}
              sx={{
                color: '#666',
                background: 'rgba(0, 0, 0, 0.04)',
                '&:hover': { background: 'rgba(0, 0, 0, 0.08)' }
              }}
            >
              <Badge badgeContent={5} color="error">
                <Bell size={20} />
              </Badge>
            </IconButton>
            
            <IconButton
              sx={{
                color: '#666',
                background: 'rgba(0, 0, 0, 0.04)',
                '&:hover': { background: 'rgba(0, 0, 0, 0.08)' }
              }}
            >
              <Settings size={20} />
            </IconButton>
            
            <IconButton onClick={handleMenuClick}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  border: '2px solid rgba(102, 126, 234, 0.3)',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                <User size={20} />
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>

        {/* Professional Tabs */}
        <Box sx={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)' }}>
          <Container maxWidth="xl">
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              sx={{
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderRadius: '3px 3px 0 0',
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
                },
                '& .MuiTab-root': {
                  color: '#666',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  textTransform: 'none',
                  minHeight: 64,
                  px: 4,
                  '&.Mui-selected': {
                    color: '#667eea'
                  },
                  '&:hover': {
                    color: '#667eea',
                    background: 'rgba(102, 126, 234, 0.05)'
                  }
                }
              }}
            >
              {tabConfigs.map((tab, index) => (
                <Tab
                  key={index}
                  icon={<tab.icon size={20} />}
                  label={
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {tab.label}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#999', fontSize: '0.7rem' }}>
                        {tab.description}
                      </Typography>
                    </Box>
                  }
                  iconPosition="start"
                  sx={{ minWidth: 200 }}
                />
              ))}
            </Tabs>
          </Container>
        </Box>
      </AppBar>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationsEl}
        open={Boolean(notificationsEl)}
        onClose={handleNotificationsClose}
        PaperProps={{
          sx: {
            width: 320,
            mt: 1.5,
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
          }
        }}
      >
        <MenuItem onClick={handleNotificationsClose}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 32, height: 32, background: '#4caf50' }}>JD</Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>John Doe signed a document</Typography>
              <Typography variant="caption" sx={{ color: '#666' }}>2 minutes ago</Typography>
            </Box>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleNotificationsClose}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 32, height: 32, background: '#2196f3' }}>AS</Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>New template available</Typography>
              <Typography variant="caption" sx={{ color: '#666' }}>1 hour ago</Typography>
            </Box>
          </Box>
        </MenuItem>
      </Menu>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            width: 200,
            mt: 1.5,
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
          }
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <User size={16} />
            <Typography variant="body2">Profile</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Settings size={16} />
            <Typography variant="body2">Settings</Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 16, height: 16, background: '#d32f2f', borderRadius: '50%' }} />
            <Typography variant="body2" sx={{ color: '#d32f2f' }}>Logout</Typography>
          </Box>
        </MenuItem>
      </Menu>

      <Container maxWidth="xl">
        <TabPanel value={currentTab} index={0}>
          <SignPD />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <DocFun />
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
          <DocPawn />
        </TabPanel>
        <TabPanel value={currentTab} index={3}>
          <DockChat />
        </TabPanel>
      </Container>
    </Box>
  );
}
