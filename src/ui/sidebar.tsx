import React, { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import {
  Box,
  Paper,
  Card,
  CardContent,
  Stack,
  Chip,
  Badge,
  alpha,
  useTheme,
  useMediaQuery,
  Fade,
  Zoom,
  Slide,
  Grow,
  IconButton,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Divider,
  Grid,
  Tooltip,
  LinearProgress,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  TextField,
  InputBase,
  InputAdornment,
  FormControl,
  FormLabel,
  FormHelperText,
  Menu,
  MenuItem,
  Popover,
  Popper,
  ClickAwayListener,
  Backdrop,
  Portal,
  Collapse
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Menu as MenuIcon,
  X,
  Plus,
  Minus,
  Home,
  Users,
  User,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  Settings,
  SlidersHorizontal,
  MoreVertical,
  MoreHorizontal,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  ListIcon,
  Grid,
  Grid3x3,
  Calendar,
  Clock,
  MapPin,
  Briefcase,
  Target,
  Flag,
  Bookmark,
  Heart,
  Star,
  Award,
  Trophy,
  Medal,
  Certificate,
  GraduationCap,
  Database,
  Server,
  Cloud,
  CloudUpload,
  CloudDownload,
  Wifi,
  WifiOff,
  Bluetooth,
  BluetoothOff,
  USB,
  Hdmi,
  Display,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Desktop,
  Print,
  Scanner,
  Camera,
  Video,
  Image,
  Music,
  Play,
  Pause,
  Stop,
  SkipForward,
  SkipBack,
  Rewind,
  FastForward,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Radio,
  Tv,
  Cast,
  Airplay,
  Chromecast,
  Lock,
  Unlock,
  Key,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Verified,
  CheckCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  ExternalLink,
  Share2,
  Save,
  Download,
  Upload,
  RefreshCw,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Eye,
  EyeOff,
  Home2,
  Users2,
  Settings2,
  FileText,
  File,
  Folder,
  FolderOpen,
  Archive,
  BookOpen,
  Book,
  Library,
  BarChart3,
  PieChart,
  Activity,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Percent,
  Hash,
  AtSign,
  Paperclip,
  Plus2,
  Minus2,
  Edit,
  Edit2,
  Trash2,
  Copy,
  Cut,
  Paste,
  Move,
  MousePointer,
  GripVertical,
  GripHorizontal,
  Maximize2,
  Minimize2,
  Expand,
  Compress,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export type SidebarVariant = 'default' | 'collapsed' | 'expanded' | 'floating' | 'docked' | 'overlay' | 'persistent' | 'enterprise' | 'glass' | 'minimal';
export type SidebarPosition = 'left' | 'right' | 'top' | 'bottom';
export type SidebarSize = 'small' | 'medium' | 'large' | 'auto' | 'fullscreen';
export type SidebarMode = 'permanent' | 'temporary' | 'persistent';
export type SidebarIntent = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'navigation' | 'system';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  children?: SidebarItem[];
  disabled?: boolean;
  divider?: boolean;
  group?: string;
  badge?: number | string;
  badgeColor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  tooltip?: string;
  shortcut?: string;
  metadata?: Record<string, any>;
  color?: string;
  backgroundColor?: string;
  selected?: boolean;
  expanded?: boolean;
  collapsible?: boolean;
  order?: number;
  type?: 'item' | 'group' | 'divider' | 'header' | 'action';
}

export interface SidebarGroup {
  id: string;
  label: string;
  icon?: React.ReactNode;
  items: SidebarItem[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  disabled?: boolean;
  order?: number;
  color?: string;
  backgroundColor?: string;
}

export interface SidebarAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: 'contained' | 'outlined' | 'text' | 'icon';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  disabled?: boolean;
  loading?: boolean;
  divider?: boolean;
  position?: 'top' | 'bottom' | 'center';
  size?: 'small' | 'medium' | 'large';
  shortcut?: string;
  tooltip?: string;
}

export interface SidebarSearch {
  enabled?: boolean;
  placeholder?: string;
  debounce?: number;
  minLength?: number;
  maxResults?: number;
  fuzzy?: boolean;
  caseSensitive?: boolean;
  highlightMatches?: boolean;
  searchIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  onSearch?: (query: string) => void;
  onResultSelect?: (result: SidebarItem) => void;
}

export interface SidebarProps {
  // Core props
  open: boolean;
  onToggle?: (open: boolean) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onItemClick?: (item: SidebarItem) => void;
  onItemSelect?: (item: SidebarItem) => void;
  onGroupToggle?: (group: SidebarGroup, expanded: boolean) => void;
  
  // Content
  items?: SidebarItem[];
  groups?: SidebarGroup[];
  actions?: SidebarAction[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  logo?: React.ReactNode;
  title?: string;
  subtitle?: string;
  
  // Configuration
  variant?: SidebarVariant;
  position?: SidebarPosition;
  size?: SidebarSize;
  mode?: SidebarMode;
  intent?: SidebarIntent;
  
  // Dimensions
  width?: number | string;
  maxWidth?: number | string;
  minWidth?: number | string;
  height?: number | string;
  maxHeight?: number | string;
  minHeight?: number | string;
  collapsedWidth?: number | string;
  expandedWidth?: number | string;
  
  // Styling
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  padding?: number | string;
  margin?: number | string;
  elevation?: number;
  shadow?: boolean;
  
  // Header styling
  headerBackground?: string;
  headerBorder?: boolean;
  headerBorderColor?: string;
  headerBorderWidth?: number;
  headerPadding?: number | string;
  headerElevation?: number;
  headerShadow?: boolean;
  
  // Content styling
  contentBackground?: string;
  contentPadding?: number | string;
  contentSpacing?: number | string;
  contentBorder?: boolean;
  contentBorderColor?: string;
  contentBorderWidth?: number;
  
  // Footer styling
  footerBackground?: string;
  footerPadding?: number | string;
  footerBorder?: boolean;
  footerBorderColor?: string;
  footerBorderWidth?: number;
  
  // Behavior
  collapsible?: boolean;
  resizable?: boolean;
  draggable?: boolean;
  dockable?: boolean;
  floatable?: boolean;
  pinnable?: boolean;
  autoCollapse?: boolean;
  autoExpand?: boolean;
  persistent?: boolean;
  dismissible?: boolean;
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
  closeOnBackdrop?: boolean;
  lockScroll?: boolean;
  restoreFocus?: boolean;
  trapFocus?: boolean;
  
  // Animation
  animated?: boolean;
  animationType?: 'slide' | 'fade' | 'zoom' | 'scale' | 'custom';
  animationDuration?: number;
  animationDelay?: number;
  animationEasing?: string;
  animationDirection?: 'left' | 'right' | 'top' | 'bottom';
  
  // Navigation
  searchable?: boolean;
  search?: SidebarSearch;
  sortable?: boolean;
  sortBy?: 'label' | 'order' | 'type' | 'custom';
  sortDirection?: 'asc' | 'desc';
  filterable?: boolean;
  filters?: Array<{
    label: string;
    value: string;
    active?: boolean;
    icon?: React.ReactNode;
  }>;
  
  // Selection
  selectable?: boolean;
  selectedItem?: string;
  defaultSelectedItem?: string;
  multiSelect?: boolean;
  selectedItems?: string[];
  showCheckmarks?: boolean;
  showSelectionCount?: boolean;
  selectionCountText?: string;
  maxSelectionCount?: number;
  
  // Icons and controls
  showToggleButton?: boolean;
  toggleButtonIcon?: React.ReactNode;
  toggleButtonPosition?: 'top' | 'bottom' | 'center';
  showCloseButton?: boolean;
  closeButtonIcon?: React.ReactNode;
  showBackButton?: boolean;
  backButtonIcon?: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showDivider?: boolean;
  showLogo?: boolean;
  showTitle?: boolean;
  
  // Responsive
  responsive?: boolean;
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  responsiveVariant?: SidebarVariant;
  responsiveSize?: SidebarSize;
  responsivePosition?: SidebarPosition;
  responsiveMode?: SidebarMode;
  
  // Loading and states
  loading?: boolean;
  loadingText?: string;
  loadingIcon?: React.ReactNode;
  error?: boolean;
  errorText?: string;
  errorIcon?: React.ReactNode;
  empty?: boolean;
  emptyText?: string;
  emptyIcon?: React.ReactNode;
  
  // Enterprise features
  enterprise?: boolean;
  showQuickActions?: boolean;
  quickActions?: SidebarAction[];
  showStatistics?: boolean;
  statistics?: {
    totalItems?: number;
    selectedItems?: number;
    expandedGroups?: number;
    searchQueries?: number;
  };
  showPerformanceMetrics?: boolean;
  performanceMetrics?: {
    renderTime?: number;
    navigationTime?: number;
    searchTime?: number;
    interactionCount?: number;
  };
  showBreadcrumbs?: boolean;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
  showUserInfo?: boolean;
  userInfo?: {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
    status?: 'online' | 'offline' | 'away' | 'busy';
  };
  
  // Custom rendering
  renderHeader?: () => React.ReactNode;
  renderFooter?: () => React.ReactNode;
  renderItem?: (item: SidebarItem, isSelected: boolean, isExpanded: boolean) => React.ReactNode;
  renderGroup?: (group: SidebarGroup, isExpanded: boolean) => React.ReactNode;
  renderAction?: (action: SidebarAction) => React.ReactNode;
  renderLogo?: () => React.ReactNode;
  renderUserInfo?: () => React.ReactNode;
  renderLoading?: () => React.ReactNode;
  renderError?: () => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  renderSearch?: () => React.ReactNode;
  renderBackdrop?: () => React.ReactNode;
  
  // Accessibility
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  ariaLive?: 'off' | 'polite' | 'assertive';
  ariaAtomic?: boolean;
  ariaRelevant?: string;
  
  // Special modes
  modal?: boolean;
  overlay?: boolean;
  embedded?: boolean;
  floating?: boolean;
  docked?: boolean;
  minimized?: boolean;
  maximized?: boolean;
  pinned?: boolean;
  
  // Styling overrides
  containerSx?: any;
  headerSx?: any;
  contentSx?: any;
  footerSx?: any;
  itemSx?: any;
  groupSx?: any;
  actionSx?: any;
  backdropSx?: any;
  
  // Class names
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  itemClassName?: string;
  groupClassName?: string;
  backdropClassName?: string;
  
  // Style overrides
  style?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  groupStyle?: React.CSSProperties;
}

interface SidebarState {
  isCollapsed: boolean;
  isExpanded: boolean;
  isResizing: boolean;
  isDragging: boolean;
  isFloating: boolean;
  isDocked: boolean;
  isPinned: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  searchQuery: string;
  searchResults: SidebarItem[];
  selectedItems: string[];
  expandedGroups: Set<string>;
  activeFilters: Set<string>;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  metricsVisible: boolean;
  quickActionsVisible: boolean;
}

interface SidebarDimensions {
  width: number | string;
  height: number | string;
  x: number;
  y: number;
}

// Enterprise color schemes
const getEnterpriseColors = (intent: SidebarIntent) => {
  const colors = {
    default: {
      main: '#667eea',
      light: '#764ba2',
      dark: '#5a67d8',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      background: 'rgba(102, 126, 234, 0.1)',
      hover: 'rgba(102, 126, 234, 0.2)',
      selected: 'rgba(102, 126, 234, 0.3)'
    },
    primary: {
      main: '#667eea',
      light: '#764ba2',
      dark: '#5a67d8',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      background: 'rgba(102, 126, 234, 0.1)',
      hover: 'rgba(102, 126, 234, 0.2)',
      selected: 'rgba(102, 126, 234, 0.3)'
    },
    secondary: {
      main: '#f093fb',
      light: '#f5576c',
      dark: '#ec4899',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      background: 'rgba(240, 147, 251, 0.1)',
      hover: 'rgba(240, 147, 251, 0.2)',
      selected: 'rgba(240, 147, 251, 0.3)'
    },
    success: {
      main: '#43e97b',
      light: '#38f9d7',
      dark: '#28a745',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      background: 'rgba(67, 233, 123, 0.1)',
      hover: 'rgba(67, 233, 123, 0.2)',
      selected: 'rgba(67, 233, 123, 0.3)'
    },
    warning: {
      main: '#ffa726',
      light: '#ff7043',
      dark: '#f57c00',
      gradient: 'linear-gradient(135deg, #ffa726 0%, #ff7043 100%)',
      background: 'rgba(255, 167, 38, 0.1)',
      hover: 'rgba(255, 167, 38, 0.2)',
      selected: 'rgba(255, 167, 38, 0.3)'
    },
    error: {
      main: '#f44336',
      light: '#e91e63',
      dark: '#d32f2f',
      gradient: 'linear-gradient(135deg, #f44336 0%, #e91e63 100%)',
      background: 'rgba(244, 67, 54, 0.1)',
      hover: 'rgba(244, 67, 54, 0.2)',
      selected: 'rgba(244, 67, 54, 0.3)'
    },
    info: {
      main: '#4facfe',
      light: '#00f2fe',
      dark: '#2196f3',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      background: 'rgba(79, 172, 254, 0.1)',
      hover: 'rgba(79, 172, 254, 0.2)',
      selected: 'rgba(79, 172, 254, 0.3)'
    },
    navigation: {
      main: '#2c3e50',
      light: '#34495e',
      dark: '#1a252f',
      gradient: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      background: 'rgba(44, 62, 80, 0.1)',
      hover: 'rgba(44, 62, 80, 0.2)',
      selected: 'rgba(44, 62, 80, 0.3)'
    },
    system: {
      main: '#607d8b',
      light: '#78909c',
      dark: '#455a64',
      gradient: 'linear-gradient(135deg, #607d8b 0%, #78909c 100%)',
      background: 'rgba(96, 125, 139, 0.1)',
      hover: 'rgba(96, 125, 139, 0.2)',
      selected: 'rgba(96, 125, 139, 0.3)'
    }
  };
  return colors[intent] || colors.default;
};

// Size mapping
const getSizeStyles = (size: SidebarSize, isCollapsed: boolean, isMobile: boolean) => {
  if (isMobile && size !== 'fullscreen') {
    return { width: '100%', collapsedWidth: '100%' };
  }

  const sizes = {
    small: { width: 240, collapsedWidth: 64 },
    medium: { width: 280, collapsedWidth: 80 },
    large: { width: 320, collapsedWidth: 96 },
    auto: { width: 'auto', collapsedWidth: 80 },
    fullscreen: { width: '100vw', collapsedWidth: '100vw' }
  };

  const baseSize = sizes[size] || sizes.medium;
  return {
    width: isCollapsed ? baseSize.collapsedWidth : baseSize.width,
    collapsedWidth: baseSize.collapsedWidth
  };
};

// Animation variants
const getAnimationVariants = (type: string, position: SidebarPosition, duration: number) => {
  const variants = {
    slide: {
      left: {
        initial: { x: '-100%', opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: '-100%', opacity: 0 }
      },
      right: {
        initial: { x: '100%', opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: '100%', opacity: 0 }
      },
      top: {
        initial: { y: '-100%', opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: '-100%', opacity: 0 }
      },
      bottom: {
        initial: { y: '100%', opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: '100%', opacity: 0 }
      }
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    zoom: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.9, opacity: 0 }
    },
    scale: {
      initial: { scale: 0.95, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.95, opacity: 0 }
    }
  };

  if (type === 'slide') {
    return variants.slide[position] || variants.slide.left;
  }

  return variants[type] || variants.fade;
};

// Flatten items helper
const flattenItems = (items: SidebarItem[]): SidebarItem[] => {
  const result: SidebarItem[] = [];
  
  const traverse = (items: SidebarItem[]) => {
    items.forEach(item => {
      result.push(item);
      if (item.children && item.children.length > 0) {
        traverse(item.children);
      }
    });
  };
  
  traverse(items);
  return result;
};

// Filter items helper
const filterItems = (items: SidebarItem[], query: string, options: {
  fuzzy?: boolean;
  caseSensitive?: boolean;
  highlightMatches?: boolean;
}): SidebarItem[] => {
  if (!query.trim()) return items;
  
  const searchQuery = options.caseSensitive ? query : query.toLowerCase();
  
  const matchesSearch = (text: string): boolean => {
    const searchText = options.caseSensitive ? text : text.toLowerCase();
    
    if (options.fuzzy) {
      // Simple fuzzy matching
      const queryChars = searchQuery.split('');
      let matchIndex = 0;
      for (const char of queryChars) {
        const index = searchText.indexOf(char, matchIndex);
        if (index === -1) return false;
        matchIndex = index + 1;
      }
      return true;
    } else {
      return searchText.includes(searchQuery);
    }
  };
  
  const filterItem = (item: SidebarItem): SidebarItem | null => {
    const matchesLabel = matchesSearch(item.label);
    const matchesDescription = item.metadata?.description ? matchesSearch(item.metadata.description) : false;
    const matchesTags = item.metadata?.tags ? item.metadata.tags.some((tag: string) => matchesSearch(tag)) : false;
    
    if (matchesLabel || matchesDescription || matchesTags) {
      return {
        ...item,
        children: item.children ? filterItems(item.children, query, options) : undefined
      };
    }
    
    return null;
  };
  
  return items.map(filterItem).filter(Boolean) as SidebarItem[];
};

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>((props, ref) => {
  const {
    // Core props
    open = true,
    onToggle,
    onOpen,
    onClose,
    onItemClick,
    onItemSelect,
    onGroupToggle,
    
    // Content
    items = [],
    groups = [],
    actions = [],
    header,
    footer,
    logo,
    title,
    subtitle,
    
    // Configuration
    variant = 'default',
    position = 'left',
    size = 'medium',
    mode = 'permanent',
    intent = 'navigation',
    
    // Dimensions
    width: propWidth,
    maxWidth: propMaxWidth,
    minWidth: propMinWidth,
    height: propHeight = '100vh',
    maxHeight: propMaxHeight,
    minHeight: propMinHeight,
    collapsedWidth: propCollapsedWidth,
    expandedWidth: propExpandedWidth,
    
    // Styling
    backgroundColor = 'white',
    borderRadius = 0,
    borderWidth = 1,
    borderColor = 'divider',
    borderStyle = 'solid',
    padding = 2,
    margin = 0,
    elevation = 8,
    shadow = true,
    
    // Header styling
    headerBackground,
    headerBorder = true,
    headerBorderColor = 'divider',
    headerBorderWidth = 1,
    headerPadding = 2,
    headerElevation = 4,
    headerShadow = true,
    
    // Content styling
    contentBackground,
    contentPadding = 1,
    contentSpacing = 1,
    contentBorder = false,
    contentBorderColor = 'divider',
    contentBorderWidth = 1,
    
    // Footer styling
    footerBackground,
    footerPadding = 2,
    footerBorder = false,
    footerBorderColor = 'divider',
    footerBorderWidth = 1,
    
    // Behavior
    collapsible = true,
    resizable = false,
    draggable = false,
    dockable = false,
    floatable = false,
    pinnable = false,
    autoCollapse = false,
    autoExpand = false,
    persistent = false,
    dismissible = true,
    closeOnEscape = true,
    closeOnClickOutside = false,
    closeOnBackdrop = false,
    lockScroll = false,
    restoreFocus = true,
    trapFocus = false,
    
    // Animation
    animated = true,
    animationType = 'slide',
    animationDuration = 300,
    animationDelay = 0,
    animationEasing = 'ease-out',
    animationDirection = 'left',
    
    // Navigation
    searchable = false,
    search = {},
    sortable = false,
    sortBy = 'order',
    sortDirection = 'asc',
    filterable = false,
    filters = [],
    
    // Selection
    selectable = false,
    selectedItem,
    defaultSelectedItem,
    multiSelect = false,
    selectedItems = [],
    showCheckmarks = true,
    showSelectionCount = false,
    selectionCountText = '{count} selected',
    maxSelectionCount,
    
    // Icons and controls
    showToggleButton = true,
    toggleButtonIcon,
    toggleButtonPosition = 'top',
    showCloseButton = false,
    closeButtonIcon = <X size={20} />,
    showBackButton = false,
    backButtonIcon = <ChevronLeft size={20} />,
    showHeader = true,
    showFooter = true,
    showDivider = true,
    showLogo = true,
    showTitle = true,
    
    // Responsive
    responsive = true,
    breakpoint = 'md',
    responsiveVariant,
    responsiveSize,
    responsivePosition,
    responsiveMode,
    
    // Loading and states
    loading = false,
    loadingText = 'Loading sidebar...',
    loadingIcon = <CircularProgress size={24} />,
    error = false,
    errorText = 'An error occurred',
    errorIcon = <AlertTriangle size={24} />,
    empty = false,
    emptyText = 'No items available',
    emptyIcon = <Info size={24} />,
    
    // Enterprise features
    enterprise = false,
    showQuickActions = false,
    quickActions = [],
    showStatistics = false,
    statistics = {},
    showPerformanceMetrics = false,
    performanceMetrics = {},
    showBreadcrumbs = false,
    breadcrumbs = [],
    showUserInfo = false,
    userInfo,
    
    // Custom rendering
    renderHeader,
    renderFooter,
    renderItem,
    renderGroup,
    renderAction,
    renderLogo,
    renderUserInfo,
    renderLoading,
    renderError,
    renderEmpty,
    renderSearch,
    renderBackdrop,
    
    // Accessibility
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    ariaLive = 'polite',
    ariaAtomic = true,
    ariaRelevant = 'additions text',
    
    // Special modes
    modal = false,
    overlay = false,
    embedded = false,
    floating = false,
    docked = false,
    minimized = false,
    maximized = false,
    pinned = false,
    
    // Styling overrides
    containerSx,
    headerSx,
    contentSx,
    footerSx,
    itemSx,
    groupSx,
    actionSx,
    backdropSx,
    
    // Class names
    className,
    headerClassName,
    contentClassName,
    footerClassName,
    itemClassName,
    groupClassName,
    backdropClassName,
    
    // Style overrides
    style,
    headerStyle,
    contentStyle,
    footerStyle,
    itemStyle,
    groupStyle
  } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoint));
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [state, setState] = useState<SidebarState>({
    isCollapsed: false,
    isExpanded: false,
    isResizing: false,
    isDragging: false,
    isFloating: false,
    isDocked: false,
    isPinned: false,
    isMinimized: false,
    isMaximized: false,
    searchQuery: '',
    searchResults: [],
    selectedItems: selectedItems || (selectedItem ? [selectedItem] : defaultSelectedItem ? [defaultSelectedItem] : []),
    expandedGroups: new Set(),
    activeFilters: new Set(filters.filter(f => f.active).map(f => f.value)),
    sortBy,
    sortDirection,
    metricsVisible: false,
    quickActionsVisible: false
  });

  const colors = getEnterpriseColors(intent);
  const sizeStyles = getSizeStyles(responsive && responsiveSize ? responsiveSize : size, state.isCollapsed, isMobile);
  const animationVariants = getAnimationVariants(animationType, responsive && responsivePosition ? responsivePosition : position, animationDuration);

  // Handle responsive changes
  useEffect(() => {
    if (isMobile && responsive) {
      setState(prev => ({ ...prev, isCollapsed: true }));
    }
  }, [isMobile, responsive]);

  // Handle selection changes
  useEffect(() => {
    if (selectedItem !== undefined) {
      setState(prev => ({ ...prev, selectedItems: [selectedItem] }));
    }
  }, [selectedItem]);

  useEffect(() => {
    if (selectedItems !== undefined) {
      setState(prev => ({ ...prev, selectedItems }));
    }
  }, [selectedItems]);

  // Handle open/close
  useEffect(() => {
    if (open) {
      if (onOpen) onOpen();
    } else {
      if (onClose) onClose();
    }
  }, [open, onOpen, onClose]);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
    
    if (search.onSearch) {
      search.onSearch(query);
    }

    if (query && searchable) {
      const allItems = [...items, ...groups.flatMap(g => g.items)];
      const results = filterItems(allItems, query, {
        fuzzy: search.fuzzy,
        caseSensitive: search.caseSensitive,
        highlightMatches: search.highlightMatches
      });
      setState(prev => ({ ...prev, searchResults: results }));
    } else {
      setState(prev => ({ ...prev, searchResults: [] }));
    }
  }, [searchable, search, items, groups]);

  // Handle item click
  const handleItemClick = useCallback((item: SidebarItem) => {
    if (item.disabled) return;

    if (selectable) {
      if (multiSelect) {
        const isSelected = state.selectedItems.includes(item.id);
        const newSelected = isSelected
          ? state.selectedItems.filter(id => id !== item.id)
          : [...state.selectedItems, item.id];
        
        if (maxSelectionCount && newSelected.length > maxSelectionCount) {
          return;
        }

        setState(prev => ({ ...prev, selectedItems: newSelected }));
      } else {
        setState(prev => ({ ...prev, selectedItems: [item.id] }));
      }
    }

    if (onItemClick) onItemClick(item);
    if (onItemSelect) onItemSelect(item);
  }, [selectable, multiSelect, state.selectedItems, maxSelectionCount, onItemClick, onItemSelect]);

  // Handle group toggle
  const handleGroupToggle = useCallback((group: SidebarGroup) => {
    const newExpanded = new Set(state.expandedGroups);
    if (newExpanded.has(group.id)) {
      newExpanded.delete(group.id);
    } else {
      newExpanded.add(group.id);
    }
    setState(prev => ({ ...prev, expandedGroups: newExpanded }));

    if (onGroupToggle) onGroupToggle(group, newExpanded.has(group.id));
  }, [state.expandedGroups, onGroupToggle]);

  // Handle toggle
  const handleToggle = useCallback(() => {
    setState(prev => ({ ...prev, isCollapsed: !prev.isCollapsed }));
    if (onToggle) onToggle(!state.isCollapsed);
  }, [state.isCollapsed, onToggle]);

  // Handle close
  const handleClose = useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  // Get sorted and filtered items
  const getProcessedItems = useCallback(() => {
    let processedItems = [...items];

    // Apply filters
    if (state.activeFilters.size > 0) {
      processedItems = processedItems.filter(item => {
        return Array.from(state.activeFilters).every(filterValue => {
          return item.metadata?.[filterValue] !== false;
        });
      });
    }

    // Apply sorting
    if (sortable) {
      processedItems.sort((a, b) => {
        let aValue, bValue;
        
        switch (state.sortBy) {
          case 'label':
            aValue = a.label;
            bValue = b.label;
            break;
          case 'order':
            aValue = a.order || 0;
            bValue = b.order || 0;
            break;
          case 'type':
            aValue = a.type || 'item';
            bValue = b.type || 'item';
            break;
          default:
            aValue = a.label;
            bValue = b.label;
        }
        
        const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        return state.sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return processedItems;
  }, [items, state.activeFilters, state.sortBy, state.sortDirection, sortable]);

  const processedItems = getProcessedItems();

  // Get processed groups
  const getProcessedGroups = useCallback(() => {
    let processedGroups = [...groups];

    // Apply sorting
    if (sortable) {
      processedGroups.sort((a, b) => {
        const aValue = a.order || 0;
        const bValue = b.order || 0;
        const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        return state.sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return processedGroups;
  }, [groups, sortable, state.sortDirection]);

  const processedGroups = getProcessedGroups();

  // Render individual item
  const renderItemComponent = (item: SidebarItem, depth = 0) => {
    const isSelected = state.selectedItems.includes(item.id);
    const isHighlighted = state.searchResults.some(result => result.id === item.id);
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = state.expandedGroups.has(item.id);

    if (renderItem) {
      return renderItem(item, isSelected, isExpanded);
    }

    const getItemStyles = () => {
      const baseStyles = {
        py: 1,
        px: 2,
        mx: 1,
        mb: 0.5,
        borderRadius: 2,
        cursor: item.disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        opacity: item.disabled ? 0.5 : 1
      };

      if (isSelected) {
        return {
          ...baseStyles,
          backgroundColor: colors.selected,
          border: `1px solid ${colors.main}`,
          '&:hover': {
            backgroundColor: alpha(colors.selected, 0.9)
          }
        };
      }

      if (isHighlighted) {
        return {
          ...baseStyles,
          backgroundColor: alpha(colors.main, 0.1),
          border: `1px solid ${alpha(colors.main, 0.3)}`,
          '&:hover': {
            backgroundColor: alpha(colors.main, 0.2)
          }
        };
      }

      return {
        ...baseStyles,
        backgroundColor: 'transparent',
        border: '1px solid transparent',
        '&:hover': {
          backgroundColor: colors.hover
        }
      };
    };

    const handleClick = () => {
      if (!item.disabled) {
        handleItemClick(item);
      }
    };

    return (
      <Box key={item.id} sx={{ ml: depth * 2 }}>
        <ListItemButton
          selected={isSelected}
          disabled={item.disabled}
          onClick={handleClick}
          sx={getItemStyles()}
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            {showCheckmarks && multiSelect && (
              <Checkbox
                checked={isSelected}
                size="small"
                sx={{ p: 0 }}
              />
            )}
            {showCheckmarks && !multiSelect && isSelected && (
              <Box sx={{ color: colors.main }}>
                <Check size={16} />
              </Box>
            )}
            {item.icon && !showCheckmarks && (
              <Box sx={{ color: colors.main }}>
                {item.icon}
              </Box>
            )}
            {item.image && (
              <Avatar src={item.image} sx={{ width: 24, height: 24 }} />
            )}
          </ListItemIcon>

          <ListItemText
            primary={
              <Typography
                variant="body2"
                sx={{
                  fontWeight: isSelected ? 600 : 500,
                  color: item.disabled ? 'text.disabled' : 'text.primary',
                  fontSize: '14px'
                }}
              >
                {item.label}
              </Typography>
            }
            secondary={
              item.description && (
                <Typography variant="caption" color="text.secondary">
                  {item.description}
                </Typography>
              )
            }
          />

          {item.badge && (
            <Badge
              badgeContent={item.badge}
              color={item.badgeColor || 'primary'}
              sx={{ ml: 1 }}
            />
          )}

          {hasChildren && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleGroupToggle({ id: item.id, label: item.label, items: item.children || [] });
              }}
              sx={{
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease'
              }}
            >
              <ChevronDown size={16} />
            </IconButton>
          )}
        </ListItemButton>

        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List sx={{ py: 0 }}>
              {item.children!.map(child => renderItemComponent(child, depth + 1))}
            </List>
          </Collapse>
        )}

        {item.divider && <Divider sx={{ my: 1 }} />}
      </Box>
    );
  };

  // Render group
  const renderGroupComponent = (group: SidebarGroup) => {
    const isExpanded = state.expandedGroups.has(group.id);

    if (renderGroup) {
      return renderGroup(group, isExpanded);
    }

    return (
      <Box key={group.id} sx={{ mb: 2 }}>
        <ListItemButton
          onClick={() => handleGroupToggle(group)}
          disabled={group.disabled}
          sx={{
            py: 1.5,
            px: 2,
            mx: 1,
            borderRadius: 2,
            backgroundColor: alpha(colors.main, 0.05),
            '&:hover': {
              backgroundColor: alpha(colors.main, 0.1)
            }
          }}
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            {group.icon || (
              <Box sx={{ 
                transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
                color: colors.main 
              }}>
                <ChevronRight size={16} />
              </Box>
            )}
          </ListItemIcon>

          <ListItemText
            primary={
              <Typography variant="body2" sx={{ fontWeight: 600, color: colors.main }}>
                {group.label}
              </Typography>
            }
            secondary={
              (group.items.length > 0) && (
                <Typography variant="caption" color="text.secondary">
                  {group.items.length} items
                </Typography>
              )
            }
          />

          {group.items.some(item => state.selectedItems.includes(item.id)) && (
            <Badge
              badgeContent={group.items.filter(item => state.selectedItems.includes(item.id)).length}
              color="primary"
              sx={{ ml: 1 }}
            />
          )}
        </ListItemButton>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List sx={{ py: 0 }}>
            {group.items.map(item => renderItemComponent(item))}
          </List>
        </Collapse>
      </Box>
    );
  };

  // Render action
  const renderActionComponent = (action: SidebarAction) => {
    if (renderAction) return renderAction(action);

    return (
      <Button
        key={action.id}
        variant={action.variant || 'text'}
        color={action.color || 'primary'}
        size={action.size || 'small'}
        onClick={action.onClick}
        disabled={action.disabled || action.loading}
        startIcon={action.variant !== 'icon' && action.icon}
        fullWidth
        sx={{
          justifyContent: action.position === 'center' ? 'center' : 'flex-start',
          mb: action.divider ? 2 : 0.5,
          textTransform: 'none',
          fontWeight: 600
        }}
      >
        {action.variant === 'icon' ? action.icon : action.label}
      </Button>
    );
  };

  // Render search
  const renderSearchComponent = () => {
    if (renderSearch) return renderSearch();

    return (
      <TextField
        fullWidth
        size="small"
        placeholder={search.placeholder || 'Search...'}
        value={state.searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {search.searchIcon || <Search size={16} />}
            </InputAdornment>
          ),
          endAdornment: state.searchQuery && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => handleSearch('')}
              >
                {search.clearIcon || <X size={14} />}
              </IconButton>
            </InputAdornment>
          )
        }}
        sx={{ mb: 2 }}
      />
    );
  };

  // Render user info
  const renderUserInfoComponent = () => {
    if (renderUserInfo) return renderUserInfo();

    if (!userInfo) return null;

    return (
      <Card elevation={0} sx={{ mb: 2, backgroundColor: alpha(colors.background, 0.5) }}>
        <CardContent sx={{ p: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={userInfo.avatar}
              alt={userInfo.name}
              sx={{ width: 40, height: 40 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {userInfo.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {userInfo.role}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: userInfo.status === 'online' ? '#4caf50' : 
                                     userInfo.status === 'away' ? '#ffa726' :
                                     userInfo.status === 'busy' ? '#f44336' : '#9e9e9e'
                  }}
                />
                <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                  {userInfo.status}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    );
  };

  // Render loading
  const renderLoadingComponent = () => {
    if (renderLoading) return renderLoading();

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '200px',
          textAlign: 'center'
        }}
      >
        <CircularProgress
          size={32}
          sx={{ color: colors.main, mb: 2 }}
        />
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {loadingText}
        </Typography>
      </Box>
    );
  };

  // Render error
  const renderErrorComponent = () => {
    if (renderError) return renderError();

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '200px',
          textAlign: 'center'
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            backgroundColor: alpha('#f44336', 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2
          }}
        >
          {errorIcon}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#f44336' }}>
          {errorText}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please try again or contact support
        </Typography>
      </Box>
    );
  };

  // Render empty
  const renderEmptyComponent = () => {
    if (renderEmpty) return renderEmpty();

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '200px',
          textAlign: 'center'
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            backgroundColor: alpha(colors.main, 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2
          }}
        >
          {emptyIcon}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          {emptyText}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {state.searchQuery ? 'Try adjusting your search terms' : 'No items available'}
        </Typography>
      </Box>
    );
  };

  // Get responsive variant
  const getResponsiveVariant = () => {
    if (!responsive || !isMobile) return variant;
    return responsiveVariant || variant;
  };

  const currentVariant = getResponsiveVariant();

  // Get responsive size
  const getResponsiveSize = () => {
    if (!responsive || !isMobile) return size;
    return responsiveSize || size;
  };

  const currentSize = getResponsiveSize();

  // Get current dimensions
  const currentDimensions = getSizeStyles(currentSize, state.isCollapsed, isMobile);
  const currentWidth = currentDimensions.width;
  const currentHeight = propHeight || '100vh';

  return (
    <ClickAwayListener onClickAway={() => closeOnClickOutside && handleClose()}>
      <Box
        ref={ref}
        className={className}
        sx={{
          position: embedded ? 'relative' : 'fixed',
          [position]: 0,
          top: position === 'left' || position === 'right' ? 0 : 'auto',
          bottom: position === 'left' || position === 'right' ? 0 : 'auto',
          width: currentWidth,
          height: currentHeight,
          maxWidth: propMaxWidth,
          maxHeight: propMaxHeight,
          minWidth: propMinWidth,
          minHeight: propMinHeight,
          backgroundColor: backgroundColor,
          borderRadius: embedded ? borderRadius : (position === 'left' || position === 'right' ? `0 ${borderRadius}px ${borderRadius}px 0` : `${borderRadius}px ${borderRadius}px 0 0`),
          border: `${borderWidth}px ${borderStyle} ${borderColor}`,
          boxShadow: shadow ? `${elevation}px ${elevation}px ${elevation * 2}px rgba(0,0,0,0.15)` : 'none',
          zIndex: embedded ? 'auto' : 1300,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          ...containerSx,
          ...style
        }}
      >
        {/* Backdrop for overlay mode */}
        {overlay && open && renderBackdrop && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1299,
              ...backdropSx
            }}
            onClick={closeOnBackdrop ? handleClose : undefined}
          />
        )}

        {/* Header */}
        {showHeader && (
          <Box
            className={headerClassName}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: headerPadding,
              backgroundColor: headerBackground || (enterprise ? colors.gradient : 'background.paper'),
              borderBottom: headerBorder ? `${headerBorderWidth}px solid ${headerBorderColor}` : 'none',
              boxShadow: headerShadow ? `${headerElevation}px ${headerElevation}px ${headerElevation * 2}px rgba(0,0,0,0.1)` : 'none',
              minHeight: 64,
              ...headerSx,
              ...headerStyle
            }}
          >
            {renderHeader ? renderHeader() : (
              <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
                {/* Toggle button */}
                {collapsible && showToggleButton && (
                  <IconButton
                    onClick={handleToggle}
                    size="small"
                    sx={{ color: enterprise ? 'white' : 'text.primary' }}
                  >
                    {toggleButtonIcon || (state.isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />)}
                  </IconButton>
                )}

                {/* Logo */}
                {showLogo && logo && (
                  <Box sx={{ display: state.isCollapsed ? 'none' : 'flex' }}>
                    {renderLogo ? renderLogo() : logo}
                  </Box>
                )}

                {/* Title */}
                {showTitle && title && (
                  <Box sx={{ display: state.isCollapsed ? 'none' : 'block', flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: enterprise ? 'white' : 'text.primary',
                        mb: subtitle ? 0.5 : 0
                      }}
                    >
                      {title}
                    </Typography>
                    {subtitle && (
                      <Typography
                        variant="body2"
                        sx={{
                          color: enterprise ? 'rgba(255,255,255,0.8)' : 'text.secondary'
                        }}
                      >
                        {subtitle}
                      </Typography>
                    )}
                  </Box>
                )}

                {/* Back button */}
                {showBackButton && (
                  <IconButton
                    onClick={handleClose}
                    size="small"
                    sx={{ color: enterprise ? 'white' : 'text.primary' }}
                  >
                    {backButtonIcon}
                  </IconButton>
                )}

                {/* Close button */}
                {showCloseButton && dismissible && (
                  <IconButton
                    onClick={handleClose}
                    size="small"
                    sx={{ color: enterprise ? 'white' : 'text.primary' }}
                  >
                    {closeButtonIcon}
                  </IconButton>
                )}
              </Stack>
            )}
          </Box>
        )}

        {/* User Info */}
        {enterprise && showUserInfo && userInfo && (
          <Box sx={{ px: 2, pb: 2, display: state.isCollapsed ? 'none' : 'block' }}>
            {renderUserInfoComponent()}
          </Box>
        )}

        {/* Search */}
        {searchable && !state.isCollapsed && (
          <Box sx={{ px: 2, pb: 2 }}>
            {renderSearchComponent()}
          </Box>
        )}

        {/* Content */}
        <Box
          ref={contentRef}
          className={contentClassName}
          sx={{
            flex: 1,
            overflow: 'auto',
            p: contentPadding,
            backgroundColor: contentBackground || 'background.default',
            border: contentBorder ? `${contentBorderWidth}px solid ${contentBorderColor}` : 'none',
            ...contentSx,
            ...contentStyle
          }}
        >
          {/* Loading state */}
          {loading && renderLoadingComponent()}

          {/* Error state */}
          {error && renderErrorComponent()}

          {/* Empty state */}
          {!loading && !error && processedItems.length === 0 && processedGroups.length === 0 && renderEmptyComponent()}

          {/* Content */}
          {!loading && !error && (processedItems.length > 0 || processedGroups.length > 0) && (
            <List sx={{ py: 0 }}>
              {/* Groups */}
              {processedGroups.map(group => renderGroupComponent(group))}

              {/* Items */}
              {processedItems.map(item => renderItemComponent(item))}
            </List>
          )}
        </Box>

        {/* Actions */}
        {actions.length > 0 && (
          <Box
            className={footerClassName}
            sx={{
              p: footerPadding,
              backgroundColor: footerBackground || 'background.paper',
              borderTop: footerBorder ? `${footerBorderWidth}px solid ${footerBorderColor}` : 'none',
              ...footerSx,
              ...footerStyle
            }}
          >
            {actions.map(action => renderActionComponent(action))}
          </Box>
        )}

        {/* Footer */}
        {footer && (
          <Box
            className={footerClassName}
            sx={{
              p: footerPadding,
              backgroundColor: footerBackground || 'background.paper',
              borderTop: footerBorder ? `${footerBorderWidth}px solid ${footerBorderColor}` : 'none',
              ...footerSx,
              ...footerStyle
            }}
          >
            {renderFooter ? renderFooter() : footer}
          </Box>
        )}

        {/* Enterprise Statistics */}
        {enterprise && showStatistics && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              backgroundColor: alpha(colors.background, 0.9),
              borderRadius: 1,
              p: 1,
              zIndex: 100
            }}
          >
            <Grid container spacing={0.5}>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: colors.main }}>
                  Items: {statistics.totalItems || items.length}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" sx={{ color: colors.main }}>
                  Selected: {statistics.selectedItems || state.selectedItems.length}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Performance Metrics */}
        {enterprise && showPerformanceMetrics && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: alpha(colors.background, 0.9),
              borderRadius: 1,
              p: 1,
              zIndex: 100
            }}
          >
            <Typography variant="caption" sx={{ color: colors.main }}>
              Render: {performanceMetrics.renderTime}ms
            </Typography>
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
});

Sidebar.displayName = 'Sidebar';

export { Sidebar };
export type { 
  SidebarProps, 
  SidebarState, 
  SidebarItem, 
  SidebarGroup, 
  SidebarAction, 
  SidebarSearch,
  SidebarVariant, 
  SidebarPosition, 
  SidebarSize, 
  SidebarMode, 
  SidebarIntent 
};
