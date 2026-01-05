import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Chip,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Fade,
  Slide,
  Zoom,
  alpha,
  useTheme,
  useMediaQuery,
  LinearProgress,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  TextField,
  InputAdornment,
  Stack,
  Grid,
  Card,
  CardContent,
  CardActions,
  Tabs,
  Tab,
  ToggleButton,
  ToggleButtonGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Maximize2,
  Minimize2,
  Settings,
  Sliders,
  Home,
  FileText,
  Folder,
  Users,
  Activity,
  TrendingUp,
  BarChart3,
  PieChart,
  Database,
  Cloud,
  Mail,
  Phone,
  Video,
  MessageCircle,
  Paperclip,
  Link,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Plus,
  Minus,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  RefreshCw,
  RotateCcw,
  Save,
  Download,
  Upload,
  Share2,
  Heart,
  Star,
  Bookmark,
  Pin,
  PushPin,
  Lock,
  Unlock,
  Shield,
  Award,
  Zap,
  Calendar,
  Clock,
  Timer,
  AlertCircle,
  Info,
  HelpCircle,
  CheckCircle,
  XCircle,
  MoreVertical,
  MoreHorizontal,
  Expand,
  Compress,
  Fullscreen,
  ExitFullscreen,
  Window,
  Close,
  Check,
  CheckSquare,
  Square,
  Circle,
  RadioButtonChecked,
  RadioButtonUnchecked,
  Eye,
  EyeOff,
  Edit3,
  Trash2,
  Copy,
  Scissors,
  Clipboard,
  FolderPlus,
  FilePlus,
  UserPlus,
  UserMinus,
  MailOpen,
  MailCheck,
  MailX,
  PhoneCall,
  PhoneOff,
  VideoOff,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  ScreenShare,
  ScreenShareOff,
  Cast,
  Airplay,
  Wifi,
  WifiOff,
  Bluetooth,
  Battery,
  BatteryCharging,
  Sun,
  Moon,
  Palette,
  Type,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ListOrdered,
  List,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code2,
  Image as ImageIcon,
  Smile,
  Send,
  PaperPlane,
  Archive,
  ArchiveRestore,
  FileArchive,
  DownloadCloud,
  UploadCloud,
  FileSearch,
  FolderSearch,
  SearchX,
  Filter1,
  Filter2,
  SortAsc1,
  SortDesc1
} from 'lucide-react';

interface DrawerItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  type?: 'item' | 'divider' | 'header' | 'submenu';
  action?: () => void;
  href?: string;
  badge?: string | number;
  status?: 'default' | 'success' | 'warning' | 'error' | 'info';
  disabled?: boolean;
  children?: DrawerItem[];
  metadata?: Record<string, any>;
  group?: string;
  variant?: 'default' | 'selected' | 'active' | 'disabled';
}

interface DrawerSection {
  id: string;
  title?: string;
  items: DrawerItem[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  icon?: React.ReactNode;
  badge?: string | number;
  metadata?: Record<string, any>;
}

interface DrawerTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
  tooltip?: string;
}

interface DrawerConfig {
  // Core configuration
  open: boolean;
  onClose: () => void;
  onOpen?: () => void;
  
  // Type variants
  type?: 'temporary' | 'persistent' | 'permanent';
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  variant?: 'default' | 'mini' | 'permanent' | 'overlay' | 'push';
  
  // Content
  title?: string;
  subtitle?: string;
  sections?: DrawerSection[];
  items?: DrawerItem[];
  tabs?: DrawerTab[];
  currentTab?: number;
  content?: React.ReactNode;
  children?: React.ReactNode;
  
  // Layout
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  height?: number | string;
  position?: 'fixed' | 'absolute' | 'relative';
  
  // Styling
  elevation?: number;
  borderRadius?: number;
  background?: string;
  headerSx?: any;
  contentSx?: any;
  footerSx?: any;
  paperSx?: any;
  
  // Features
  showHeader?: boolean;
  showFooter?: boolean;
  showClose?: boolean;
  showToggle?: boolean;
  showSearch?: boolean;
  showProgress?: boolean;
  collapsible?: boolean;
  resizable?: boolean;
  draggable?: boolean;
  closable?: boolean;
  backdrop?: boolean;
  swipeable?: boolean;
  
  // Advanced features
  loading?: boolean;
  progress?: number;
  searchable?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  multiLevel?: boolean;
  enableAnimation?: boolean;
  enableDarkMode?: boolean;
  
  // Customization
  customHeader?: React.ReactNode;
  customFooter?: React.ReactNode;
  customToggle?: React.ReactNode;
  loadingComponent?: React.ReactNode;
  emptyState?: React.ReactNode;
  errorState?: React.ReactNode;
  className?: string;
  sx?: any;
  
  // Animation
  animation?: 'slide' | 'fade' | 'zoom' | 'none';
  animationDuration?: number;
  
  // Accessibility
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  role?: string;
  
  // Callbacks
  onItemClick?: (item: DrawerItem) => void;
  onItemSelect?: (item: DrawerItem) => void;
  onSectionToggle?: (section: DrawerSection, expanded: boolean) => void;
  onTabChange?: (tab: number) => void;
  onSearch?: (query: string) => void;
  onFilter?: (filter: string) => void;
  onSort?: (sortBy: string) => void;
}

interface EnterpriseDrawerProps extends DrawerConfig {}

const TransitionComponents = {
  slide: Slide,
  fade: Fade,
  zoom: Zoom,
  none: React.Fragment
};

const sizeMap = {
  mini: 64,
  small: 240,
  medium: 320,
  large: 400,
  xl: 480
};

const statusIcons = {
  success: <CheckCircle size={16} color="#4caf50" />,
  warning: <AlertCircle size={16} color="#ffa726" />,
  error: <XCircle size={16} color="#f44336" />,
  info: <Info size={16} color="#2196f3" />,
  default: null
};

const statusColors = {
  success: '#4caf50',
  error: '#f44336',
  warning: '#ffa726',
  info: '#2196f3',
  default: 'inherit'
};

export const EnterpriseDrawer: React.FC<EnterpriseDrawerProps> = ({
  // Core
  open,
  onClose,
  onOpen,
  
  // Type
  type = 'temporary',
  anchor = 'left',
  variant = 'default',
  
  // Content
  title,
  subtitle,
  sections = [],
  items = [],
  tabs = [],
  currentTab = 0,
  content,
  children,
  
  // Layout
  width = 320,
  minWidth = 240,
  maxWidth = 480,
  height = '100vh',
  position = 'fixed',
  
  // Styling
  elevation = 16,
  borderRadius = 0,
  background,
  headerSx,
  contentSx,
  footerSx,
  paperSx,
  
  // Features
  showHeader = true,
  showFooter = true,
  showClose = true,
  showToggle = true,
  showSearch = false,
  showProgress = false,
  collapsible = false,
  resizable = false,
  draggable = false,
  closable = true,
  backdrop = true,
  swipeable = true,
  
  // Advanced
  loading = false,
  progress,
  searchable = false,
  filterable = false,
  sortable = false,
  multiLevel = false,
  enableAnimation = true,
  enableDarkMode = true,
  
  // Customization
  customHeader,
  customFooter,
  customToggle,
  loadingComponent,
  emptyState,
  errorState,
  className,
  sx,
  
  // Animation
  animation = 'slide',
  animationDuration = 300,
  
  // Accessibility
  ariaLabel = 'Navigation drawer',
  ariaLabelledBy,
  ariaDescribedBy,
  role = 'navigation',
  
  // Callbacks
  onItemClick,
  onItemSelect,
  onSectionToggle,
  onTabChange,
  onSearch,
  onFilter,
  onSort
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isDark = theme.palette.mode === 'dark';

  const [isCollapsed, setIsCollapsed] = useState(variant === 'mini');
  const [isResizing, setIsResizing] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(width);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState<'label' | 'status' | 'date'>('label');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(currentTab);

  const drawerRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  const TransitionComponent = TransitionComponents[animation] || Slide;
  const animationProps = animation !== 'none' ? { timeout: animationDuration } : {};

  // Calculate responsive width
  const responsiveWidth = useMemo(() => {
    if (isMobile) return Math.min(currentWidth, 280);
    if (isTablet) return Math.min(currentWidth, 360);
    return Math.min(currentWidth, maxWidth);
  }, [isMobile, isTablet, currentWidth, maxWidth]);

  // Filter and search items
  const filteredItems = useMemo(() => {
    let filtered = items;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.label.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.keywords?.some(keyword => keyword.toLowerCase().includes(query))
      );
    }

    // Status filter
    if (filterType !== 'all') {
      filtered = filtered.filter(item => item.status === filterType);
    }

    return filtered;
  }, [items, searchQuery, filterType]);

  // Get status configuration
  const getStatusConfig = (status: string = 'default') => {
    return {
      color: statusColors[status as keyof typeof statusColors] || statusColors.default,
      icon: statusIcons[status as keyof typeof statusIcons] || null,
      bgColor: alpha(statusColors[status as keyof typeof statusColors] || statusColors.default, 0.1)
    };
  };

  // Handle drawer open/close
  const handleDrawerToggle = useCallback(() => {
    if (type === 'permanent') return;
    
    if (open) {
      onClose();
    } else {
      onOpen?.();
    }
  }, [open, onClose, onOpen, type]);

  // Handle section toggle
  const handleSectionToggle = useCallback((sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
    
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      onSectionToggle?.(section, !expandedSections.has(sectionId));
    }
  }, [sections, expandedSections, onSectionToggle]);

  // Handle item click
  const handleItemClick = useCallback((item: DrawerItem) => {
    if (item.disabled || item.type === 'divider' || item.type === 'header') return;
    
    setSelectedItem(item.id);
    onItemClick?.(item);
    onItemSelect?.(item);
    
    if (item.action) {
      item.action();
    }
  }, [onItemClick, onItemSelect]);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  }, [onSearch]);

  // Handle filter
  const handleFilter = useCallback((filter: string) => {
    setFilterType(filter);
    onFilter?.(filter);
  }, [onFilter]);

  // Handle sort
  const handleSort = useCallback((sortBy: string) => {
    setSortBy(sortBy as any);
    onSort?.(sortBy);
  }, [onSort]);

  // Handle resize
  const handleResize = useCallback((e: React.MouseEvent) => {
    if (!resizable) return;
    
    setIsResizing(true);
    const startX = e.clientX;
    const startWidth = currentWidth;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      const clampedWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
      setCurrentWidth(clampedWidth);
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [resizable, currentWidth, minWidth, maxWidth]);

  // Render header
  const renderHeader = () => {
    if (customHeader) return customHeader;

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 3,
          borderBottom: '1px solid',
          borderColor: 'divider',
          background: isDark ? '#1a1a1a' : 'white',
          ...headerSx
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
          {showToggle && (
            <IconButton
              size="small"
              onClick={handleDrawerToggle}
              sx={{
                background: alpha('#667eea', 0.1),
                '&:hover': { background: alpha('#667eea', 0.2) }
              }}
            >
              {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </IconButton>
          )}
          
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            {title && (
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  display: isCollapsed ? 'none' : '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {title}
              </Typography>
            )}
            
            {subtitle && !isCollapsed && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {showSearch && !isCollapsed && (
            <IconButton
              size="small"
              sx={{
                background: alpha('#667eea', 0.1),
                '&:hover': { background: alpha('#667eea', 0.2) }
              }}
            >
              <Search size={18} />
            </IconButton>
          )}
          
          {showClose && closable && (
            <IconButton
              size="small"
              onClick={onClose}
              sx={{
                background: alpha('#667eea', 0.1),
                '&:hover': { background: alpha('#667eea', 0.2) }
              }}
            >
              <X size={18} />
            </IconButton>
          )}
        </Box>
      </Box>
    );
  };

  // Render search input
  const renderSearch = () => {
    if (!showSearch) return null;

    return (
      <Box sx={{ px: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} />
              </InputAdornment>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc'
            }
          }}
        />
      </Box>
    );
  };

  // Render filter and sort controls
  const renderFilterControls = () => {
    if (!filterable && !sortable) return null;

    return (
      <Box sx={{ px: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Stack direction="row" spacing={2} alignItems="center">
          {filterable && (
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Filter</InputLabel>
              <Select
                value={filterType}
                onChange={(e) => handleFilter(e.target.value)}
                label="Filter"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="success">Success</MenuItem>
                <MenuItem value="warning">Warning</MenuItem>
                <MenuItem value="error">Error</MenuItem>
                <MenuItem value="info">Info</MenuItem>
              </Select>
            </FormControl>
          )}
          
          {sortable && (
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Sort</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                label="Sort"
              >
                <MenuItem value="label">Label</MenuItem>
                <MenuItem value="status">Status</MenuItem>
                <MenuItem value="date">Date</MenuItem>
              </Select>
            </FormControl>
          )}
        </Stack>
      </Box>
    );
  };

  // Render progress
  const renderProgress = () => {
    if (!showProgress || progress === undefined) return null;

    return (
      <Box sx={{ px: 3, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            Progress
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 700 }}>
            {progress}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 4,
            borderRadius: 2,
            background: alpha('#667eea', 0.1),
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 2
            }
          }}
        />
      </Box>
    );
  };

  // Render tabs
  const renderTabs = () => {
    if (tabs.length === 0) return null;

    return (
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activeTab}
          onChange={(e, value) => {
            setActiveTab(value);
            onTabChange?.(value);
          }}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              minHeight: 48
            }
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={tab.id}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {tab.icon}
                  <Typography variant="body2">{tab.label}</Typography>
                  {tab.badge && (
                    <Badge badgeContent={tab.badge} color="primary" size="small" />
                  )}
                </Box>
              }
              disabled={tab.disabled}
              title={tab.tooltip}
            />
          ))}
        </Tabs>
      </Box>
    );
  };

  // Render section
  const renderSection = (section: DrawerSection) => {
    const isExpanded = expandedSections.has(section.id);
    const hasContent = section.items.length > 0;

    return (
      <Box key={section.id} sx={{ mb: 1 }}>
        {section.title && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 3,
              py: 2,
              cursor: section.collapsible ? 'pointer' : 'default',
              '&:hover': section.collapsible ? { background: alpha('#667eea', 0.05) } : {}
            }}
            onClick={() => section.collapsible && handleSectionToggle(section.id)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {section.icon}
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: 'text.secondary' }}
              >
                {section.title}
              </Typography>
              {section.badge && (
                <Badge badgeContent={section.badge} color="primary" size="small" />
              )}
            </Box>
            
            {section.collapsible && (
              <IconButton size="small">
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </IconButton>
            )}
          </Box>
        )}
        
        {(!section.collapsible || isExpanded) && hasContent && (
          <List sx={{ py: 0 }}>
            {section.items.map((item) => renderDrawerItem(item))}
          </List>
        )}
      </Box>
    );
  };

  // Render drawer item
  const renderDrawerItem = (item: DrawerItem) => {
    if (item.type === 'divider') {
      return <Divider sx={{ my: 1 }} />;
    }

    if (item.type === 'header') {
      return (
        <Box sx={{ px: 3, py: 1 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: 0.5
            }}
          >
            {item.label}
          </Typography>
        </Box>
      );
    }

    const isSelected = selectedItem === item.id;
    const isDisabled = item.disabled;
    const statusConfig = getStatusConfig(item.status || 'default');

    return (
      <Tooltip
        key={item.id}
        title={item.label}
        disableHoverListener={!enableTooltips}
        placement="right"
        arrow
      >
        <ListItem
          disablePadding
          sx={{
            opacity: isDisabled ? 0.5 : 1,
            mb: 0.5
          }}
        >
          <ListItemButton
            selected={isSelected}
            onClick={() => !isDisabled && handleItemClick(item)}
            disabled={isDisabled}
            sx={{
              py: 1.5,
              px: 3,
              borderRadius: 1,
              transition: 'all 0.2s ease',
              background: isSelected
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : item.variant === 'active'
                ? alpha('#667eea', 0.08)
                : 'transparent',
              color: isSelected ? 'white' : 'inherit',
              '&:hover': {
                background: isSelected
                  ? 'linear-gradient(135deg, #5568d3 0%, #6b4190 100%)'
                  : alpha('#667eea', 0.08)
              }
            }}
          >
            {enableIcons && item.icon && (
              <ListItemIcon sx={{ 
                color: isSelected ? 'white' : 'inherit',
                minWidth: 40
              }}>
                {item.icon}
              </ListItemIcon>
            )}

            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      display: isCollapsed ? 'none' : '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {item.label}
                  </Typography>
                  
                  {showBadges && item.badge && !isCollapsed && (
                    <Chip
                      label={item.badge}
                      size="small"
                      sx={{
                        height: 16,
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        background: isSelected ? 'rgba(255,255,255,0.2)' : alpha('#667eea', 0.1),
                        color: isSelected ? 'white' : '#667eea',
                        ml: 'auto'
                      }}
                    />
                  )}
                  
                  {showStatus && item.status && item.status !== 'default' && (
                    <Box sx={{ ml: 'auto' }}>
                      {statusConfig.icon}
                    </Box>
                  )}
                </Box>
              }
            />

            {item.children && enableSubmenus && (
              <ChevronRight size={16} style={{ marginLeft: 'auto' }} />
            )}
          </ListItemButton>
        </ListItem>
      </Tooltip>
    );
  };

  // Render content area
  const renderContent = () => {
    if (loading && loadingComponent) return loadingComponent;
    
    if (loading) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={48} sx={{ color: '#667eea' }} />
        </Box>
      );
    }

    if (tabs.length > 0) {
      return (
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          {tabs[activeTab]?.content}
        </Box>
      );
    }

    if (content || children) {
      return (
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 3 }}>
          {content || children}
        </Box>
      );
    }

    return (
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        {showSearch && renderSearch()}
        {renderFilterControls()}
        {showProgress && renderProgress()}
        {renderTabs()}
        
        {sections.length > 0 ? (
          sections.map((section) => renderSection(section))
        ) : (
          <List sx={{ py: 0 }}>
            {filteredItems.map((item) => renderDrawerItem(item))}
          </List>
        )}
      </Box>
    );
  };

  // Render footer
  const renderFooter = () => {
    if (customFooter) return customFooter;
    if (!showFooter) return null;

    return (
      <Box
        sx={{
          p: 3,
          borderTop: '1px solid',
          borderColor: 'divider',
          background: isDark ? '#1a1a1a' : 'white',
          ...footerSx
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Enterprise Navigation Drawer
        </Typography>
      </Box>
    );
  };

  // Render resize handle
  const renderResizeHandle = () => {
    if (!resizable) return null;

    return (
      <Box
        ref={resizeRef}
        sx={{
          position: 'absolute',
          [anchor === 'left' ? 'right' : 'left']: -4,
          top: 0,
          bottom: 0,
          width: 8,
          cursor: 'col-resize',
          background: isResizing ? alpha('#667eea', 0.3) : 'transparent',
          '&:hover': {
            background: alpha('#667eea', 0.2)
          }
        }}
        onMouseDown={handleResize}
      />
    );
  };

  // Main drawer content
  const drawerContent = (
    <Box
      ref={drawerRef}
      sx={{
        width: isCollapsed ? sizeMap.mini : responsiveWidth,
        height: height,
        display: 'flex',
        flexDirection: 'column',
        background: background || (isDark ? '#1a1a1a' : 'white'),
        borderRadius: borderRadius,
        position: 'relative',
        ...sx
      }}
      className={className}
    >
      {renderResizeHandle()}
      {showHeader && renderHeader()}
      {renderContent()}
      {showFooter && renderFooter()}
    </Box>
  );

  // Determine drawer props
  const getDrawerProps = () => {
    const baseProps = {
      anchor,
      open,
      onClose,
      variant: type === 'permanent' ? 'permanent' : type === 'persistent' ? 'persistent' : 'temporary',
      ModalProps: {
        keepMounted: true
      },
      PaperProps: {
        elevation,
        sx: {
          background: background || (isDark ? '#1a1a1a' : 'white'),
          backgroundImage: 'none',
          borderRadius: borderRadius,
          ...paperSx
        }
      },
      SlideProps: {
        direction: anchor === 'left' ? 'right' : anchor === 'right' ? 'left' : anchor === 'top' ? 'down' : 'up'
      },
      className,
      role,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy
    };

    if (animation !== 'none') {
      return {
        ...baseProps,
        TransitionComponent: TransitionComponent as any,
        transitionDuration: animationDuration
      };
    }

    return baseProps;
  };

  // Render mini variant toggle
  const renderMiniToggle = () => {
    if (!showToggle || variant !== 'mini') return null;

    return (
      <Box
        sx={{
          position: 'fixed',
          [anchor]: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1200
        }}
      >
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5568d3 0%, #6b4190 100%)',
              boxShadow: '0 6px 16px rgba(102, 126, 234, 0.5)'
            }
          }}
        >
          {open ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </IconButton>
      </Box>
    );
  };

  return (
    <>
      {renderMiniToggle()}
      
      <MuiDrawer
        {...getDrawerProps()}
        sx={{
          '& .MuiDrawer-paper': {
            width: isCollapsed && variant === 'mini' ? sizeMap.mini : responsiveWidth,
            height: height,
            position: position,
            background: background || (isDark ? '#1a1a1a' : 'white'),
            backgroundImage: 'none',
            borderRadius: borderRadius,
            ...sx
          }
        }}
      >
        {drawerContent}
      </MuiDrawer>
    </>
  );
};

// Pre-built drawer components for common use cases
export const NavigationDrawer: React.FC<{
  open: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  currentPath?: string;
}> = ({ open, onClose, onNavigate, currentPath = '/' }) => {
  const navItems: DrawerItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home size={20} />,
      href: '/dashboard',
      variant: currentPath === '/dashboard' ? 'active' : 'default',
      action: () => onNavigate('/dashboard')
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: <FileText size={20} />,
      href: '/documents',
      variant: currentPath === '/documents' ? 'active' : 'default',
      badge: 12,
      action: () => onNavigate('/documents')
    },
    {
      id: 'templates',
      label: 'Templates',
      icon: <Folder size={20} />,
      href: '/templates',
      variant: currentPath === '/templates' ? 'active' : 'default',
      action: () => onNavigate('/templates')
    },
    {
      id: 'team',
      label: 'Team',
      icon: <Users size={20} />,
      href: '/team',
      variant: currentPath === '/team' ? 'active' : 'default',
      action: () => onNavigate('/team')
    },
    { id: 'divider1', label: '', type: 'divider' as const },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 size={20} />,
      href: '/analytics',
      variant: currentPath === '/analytics' ? 'active' : 'default',
      action: () => onNavigate('/analytics')
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={20} />,
      href: '/settings',
      variant: currentPath === '/settings' ? 'active' : 'default',
      action: () => onNavigate('/settings')
    }
  ];

  return (
    <EnterpriseDrawer
      open={open}
      onClose={onClose}
      title="Navigation Menu"
      items={navItems}
      variant="default"
      anchor="left"
      type="temporary"
      showHeader={true}
      showToggle={true}
      onItemClick={(item) => {
        if (item.href) {
          onNavigate(item.href);
        }
      }}
    />
  );
};

export default EnterpriseDrawer;
