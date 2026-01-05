import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
  Divider,
  Typography,
  Chip,
  Badge,
  Avatar,
  Tooltip,
  Paper,
  alpha,
  Stack,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Drawer,
  useTheme,
  useMediaQuery,
  Zoom,
  Fade,
  Slide
} from '@mui/material';
import {
  ChevronRight,
  ChevronDown,
  Home,
  FileText,
  RefreshCw,
  Store,
  MessageSquare,
  Settings,
  User,
  Bell,
  Search,
  Menu as MenuIcon,
  X,
  LogOut,
  Shield,
  Zap,
  TrendingUp,
  Users,
  Award,
  Clock,
  Star,
  CheckCircle,
  AlertTriangle,
  Info,
  Plus,
  Filter,
  Download,
  Upload,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Globe,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  CreditCard,
  DollarSign,
  MoreVertical,
  ChevronLeft,
  ArrowRight,
  ExternalLink,
  Share2,
  Copy,
  Edit,
  Trash2,
  Save
} from 'lucide-react';
import { styled } from '@mui/material/styles';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.default, 0.95)} 100%)`,
  backdropFilter: 'blur(20px)',
  borderRadius: 16,
  border: '1px solid',
  borderColor: theme.palette.divider,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
  overflow: 'hidden',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: 12,
  mb: 1,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.1),
    transform: 'translateX(4px)',
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 12,
  py: 1.5,
  px: 2,
  '&.Mui-selected': {
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    color: 'white',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
    '&:hover': {
      background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    },
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  fontWeight: 600,
  borderRadius: 8,
  fontSize: '0.75rem',
}));

interface NavigationMenuProps {
  items: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
    href?: string;
    children?: Array<{
      id: string;
      label: string;
      href: string;
      description?: string;
      icon?: React.ReactNode;
    }>;
    badge?: number;
    isNew?: boolean;
    isBeta?: boolean;
  }>;
  onNavigate?: (path: string) => void;
  defaultOpen?: boolean;
  variant?: 'vertical' | 'horizontal';
}

interface NavigationMenuItemProps {
  item: NavigationMenuProps['items'][0];
  depth?: number;
  onNavigate?: (path: string) => void;
}

const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({ item, depth = 0, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleClick = () => {
    if (item.children) {
      setOpen(!open);
    } else if (item.href && onNavigate) {
      onNavigate(item.href);
    }
  };

  const getIndent = () => depth * 24;

  return (
    <>
      <StyledListItem disablePadding sx={{ pl: getIndent / 8 }}>
        <StyledListItemButton onClick={handleClick} selected={false}>
          <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
            {item.icon || <ChevronRight size={20} />}
          </ListItemIcon>
          <ListItemText 
            primary={
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {item.label}
              </Typography>
            }
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {item.isNew && (
              <StyledChip 
                label="NEW" 
                size="small"
                sx={{ background: '#4caf50', color: 'white' }}
              />
            )}
            {item.isBeta && (
              <StyledChip 
                label="BETA" 
                size="small"
                sx={{ background: '#ff9800', color: 'white' }}
              />
            )}
            {item.badge && item.badge > 0 && (
              <Badge badgeContent={item.badge} color="error">
                <Box sx={{ width: 8, height: 8 }} />
              </Badge>
            )}
            {item.children && (
              <ChevronDown 
                size={16} 
                style={{ 
                  transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }} 
              />
            )}
          </Box>
        </StyledListItemButton>
      </StyledListItem>

      {item.children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 2 }}>
            {item.children.map((child) => (
              <NavigationMenuItem 
                key={child.id} 
                item={child} 
                depth={depth + 1}
                onNavigate={onNavigate}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ 
  items, 
  onNavigate, 
  defaultOpen = false,
  variant = 'vertical' 
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <StyledPaper sx={{ height: '100%', p: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
          Navigation
        </Typography>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            <X size={20} />
          </IconButton>
        )}
      </Stack>

      <List sx={{ py: 0 }}>
        {items.map((item) => (
          <NavigationMenuItem 
            key={item.id} 
            item={item} 
            onNavigate={onNavigate}
          />
        ))}
      </List>
    </StyledPaper>
  );

  if (variant === 'horizontal') {
    return (
      <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto' }}>
        {items.map((item) => (
          <Button
            key={item.id}
            onClick={() => item.href && onNavigate?.(item.href)}
            startIcon={item.icon}
            endIcon={item.children ? <ChevronDown size={16} /> : undefined}
            sx={{
              color: 'text.primary',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 3,
              px: 3,
              py: 1.5,
              minWidth: 'auto',
              whiteSpace: 'nowrap',
              '&:hover': {
                background: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            {item.label}
            {item.badge && item.badge > 0 && (
              <Badge badgeContent={item.badge} color="error" sx={{ ml: 1 }}>
                <Box sx={{ width: 4, height: 4 }} />
              </Badge>
            )}
          </Button>
        ))}
      </Box>
    );
  }

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            border: 'none',
            background: 'transparent',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

// Default navigation items for enterprise document management
export const defaultNavigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <Home size={20} />,
    href: '/dashboard',
  },
  {
    id: 'documents',
    label: 'Documents',
    icon: <FileText size={20} />,
    children: [
      {
        id: 'sign',
        label: 'Sign Documents',
        href: '/documents/sign',
        description: 'Digital signature tools',
        icon: <Shield size={16} />,
      },
      {
        id: 'convert',
        label: 'Convert Files',
        href: '/documents/convert',
        description: 'File format conversion',
        icon: <RefreshCw size={16} />,
      },
      {
        id: 'templates',
        label: 'Templates',
        href: '/documents/templates',
        description: 'Professional templates',
        icon: <Store size={16} />,
      },
    ],
  },
  {
    id: 'collaboration',
    label: 'Team Collaboration',
    icon: <MessageSquare size={20} />,
    href: '/collaboration',
    badge: 3,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <BarChart3 size={20} />,
    children: [
      {
        id: 'overview',
        label: 'Overview',
        href: '/analytics/overview',
        icon: <Activity size={16} />,
      },
      {
        id: 'reports',
        label: 'Reports',
        href: '/analytics/reports',
        icon: <PieChart size={16} />,
      },
    ],
  },
  {
    id: 'calendar',
    label: 'Calendar',
    icon: <Calendar size={20} />,
    href: '/calendar',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings size={20} />,
    children: [
      {
        id: 'profile',
        label: 'Profile',
        href: '/settings/profile',
        icon: <User size={16} />,
      },
      {
        id: 'notifications',
        label: 'Notifications',
        href: '/settings/notifications',
        icon: <Bell size={16} />,
        badge: 5,
      },
      {
        id: 'security',
        label: 'Security',
        href: '/settings/security',
        icon: <Lock size={16} />,
      },
    ],
  },
];

export default NavigationMenu;
