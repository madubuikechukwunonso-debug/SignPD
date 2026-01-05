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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Drawer,
  AppBar,
  Toolbar,
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
  X,
  Plus,
  Minus,
  Maximize2,
  Minimize2,
  Expand,
  Compress,
  ExternalLink,
  Download,
  Upload,
  Save,
  RefreshCw,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Zoom,
  Eye,
  EyeOff,
  Settings,
  SlidersHorizontal,
  MoreVertical,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Move,
  MousePointer,
  GripVertical,
  GripHorizontal,
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
  Search,
  Filter,
  SortAsc,
  SortDesc,
  ListIcon,
  Grid as GridIcon,
  Grid3x3,
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
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
  Image as ImageIcon,
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
  Apple,
  Windows,
  Android,
  Linux,
  Ubuntu,
  Debian,
  Fedora,
  Chrome,
  Firefox,
  Safari,
  Edge,
  Opera,
  Brave,
  Tor,
  VPN,
  Firewall,
  Password,
  LogIn,
  LogOut,
  Register,
  SignIn,
  SignOut,
  Profile,
  Account,
  Settings as SettingsIcon,
  Globe,
  World,
  Map,
  Location,
  Navigation,
  Compass,
  Route,
  Directions,
  GPS,
  Radar,
  Satellite,
  Rocket,
  Plane,
  Train,
  Car,
  Bus,
  Bike,
  Walk,
  Run,
  Swim,
  Climb,
  Jump,
  Dance,
  Sing,
  Draw,
  Paint,
  Write,
  Read,
  BookOpen,
  Study,
  GraduationCap,
  Database,
  Server,
  Save,
  Download,
  Upload,
  Share2,
  Export,
  Import,
  Transfer,
  Copy,
  Clipboard,
  Scissors,
  Trash2,
  Eraser,
  RotateCcw,
  RotateCw,
  Undo,
  Redo,
  RefreshCw,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  ListIcon,
  GridIcon,
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  Briefcase,
  Target,
  Flag,
  Bookmark,
  Heart,
  Star,
  Award,
  Trophy,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Print,
  Camera,
  Video,
  ImageIcon,
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
  Apple,
  Windows,
  Android,
  Linux,
  Chrome,
  Firefox,
  Safari,
  Edge,
  Opera,
  Key,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Verified,
  CheckCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  X,
  Plus,
  Minus,
  Maximize2,
  Minimize2,
  Expand,
  Compress,
  ExternalLink,
  SlidersHorizontal,
  MoreVertical,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Move,
  MousePointer,
  GripVertical,
  GripHorizontal
} from 'lucide-react';

export type SheetVariant = 'default' | 'modal' | 'drawer' | 'popover' | 'fullscreen' | 'enterprise' | 'glass' | 'minimal';
export type SheetSize = 'small' | 'medium' | 'large' | 'auto' | 'fullscreen';
export type SheetPlacement = 'top' | 'bottom' | 'left' | 'right' | 'center';
export type SheetStatus = 'closed' | 'opening' | 'open' | 'closing';
export type SheetIntent = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

export interface SheetAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  disabled?: boolean;
  loading?: boolean;
  divider?: boolean;
  position?: 'left' | 'right' | 'center';
  size?: 'small' | 'medium' | 'large';
  shortcut?: string;
  tooltip?: string;
}

export interface SheetSection {
  id: string;
  title?: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  disabled?: boolean;
  order?: number;
  size?: 'auto' | 'small' | 'medium' | 'large' | 'fullscreen';
}

export interface SheetTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  badge?: number | string;
  tooltip?: string;
  closable?: boolean;
}

export interface SheetProps {
  // Core props
  open: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  onSubmit?: () => void;
  onCancel?: () => void;
  
  // Content
  title?: string;
  subtitle?: string;
  description?: string;
  children: React.ReactNode;
  sections?: SheetSection[];
  tabs?: SheetTab[];
  
  // Sheet configuration
  variant?: SheetVariant;
  size?: SheetSize;
  placement?: SheetPlacement;
  intent?: SheetIntent;
  
  // Dimensions
  width?: number | string;
  maxWidth?: number | string;
  minWidth?: number | string;
  height?: number | string;
  maxHeight?: number | string;
  minHeight?: number | string;
  
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
  
  // Footer styling
  footerBackground?: string;
  footerBorder?: boolean;
  footerBorderColor?: string;
  footerBorderWidth?: number;
  footerPadding?: number | string;
  footerElevation?: number;
  footerShadow?: boolean;
  
  // Content styling
  contentBackground?: string;
  contentPadding?: number | string;
  contentSpacing?: number | string;
  contentBorder?: boolean;
  contentBorderColor?: string;
  contentBorderWidth?: number;
  
  // Actions and controls
  actions?: SheetAction[];
  showActions?: boolean;
  actionAlignment?: 'left' | 'center' | 'right' | 'space-between';
  showCloseButton?: boolean;
  closeButtonIcon?: React.ReactNode;
  showBackButton?: boolean;
  backButtonIcon?: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  showDivider?: boolean;
  
  // Behavior
  dismissible?: boolean;
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
  closeOnClickOutside?: boolean;
  preventClose?: boolean;
  lockScroll?: boolean;
  restoreScroll?: boolean;
  autoFocus?: boolean;
  trapFocus?: boolean;
  
  // Animation
  animated?: boolean;
  animationType?: 'fade' | 'slide' | 'zoom' | 'scale' | 'custom';
  animationDuration?: number;
  animationDelay?: number;
  animationEasing?: string;
  animationDirection?: 'in' | 'out' | 'both';
  
  // Positioning
  offset?: number;
  offsetX?: number;
  offsetY?: number;
  anchorOrigin?: {
    vertical: 'top' | 'center' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  transformOrigin?: {
    vertical: 'top' | 'center' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
  
  // Responsive
  responsive?: boolean;
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  responsiveVariant?: SheetVariant;
  responsiveSize?: SheetSize;
  responsivePlacement?: SheetPlacement;
  
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
  quickActions?: SheetAction[];
  showStatistics?: boolean;
  statistics?: {
    viewCount?: number;
    interactionCount?: number;
    submitCount?: number;
    closeCount?: number;
  };
  showPerformanceMetrics?: boolean;
  performanceMetrics?: {
    renderTime?: number;
    openTime?: number;
    closeTime?: number;
    animationTime?: number;
  };
  showBreadcrumbs?: boolean;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
  showProgress?: boolean;
  progress?: number;
  progressText?: string;
  
  // Custom rendering
  renderHeader?: () => React.ReactNode;
  renderFooter?: () => React.ReactNode;
  renderActions?: () => React.ReactNode;
  renderLoading?: () => React.ReactNode;
  renderError?: () => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
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
  drawer?: boolean;
  popover?: boolean;
  fullscreen?: boolean;
  embedded?: boolean;
  floating?: boolean;
  
  // Styling overrides
  containerSx?: any;
  headerSx?: any;
  contentSx?: any;
  footerSx?: any;
  backdropSx?: any;
  
  // Class names
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  backdropClassName?: string;
  
  // Style overrides
  style?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
  backdropStyle?: React.CSSProperties;
}

interface SheetState {
  status: SheetStatus;
  isAnimating: boolean;
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  activeTab: string;
  expandedSections: Set<string>;
  isMinimized: boolean;
  isMaximized: boolean;
  isPinned: boolean;
  isFullscreen: boolean;
  metricsVisible: boolean;
  quickActionsVisible: boolean;
}

interface SheetDimensions {
  width: number | string;
  height: number | string;
  x: number;
  y: number;
}

// Enterprise color schemes
const getEnterpriseColors = (intent: SheetIntent) => {
  const colors = {
    default: {
      main: '#667eea',
      light: '#764ba2',
      dark: '#5a67d8',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      background: 'rgba(102, 126, 234, 0.1)',
      hover: 'rgba(102, 126, 234, 0.2)'
    },
    primary: {
      main: '#667eea',
      light: '#764ba2',
      dark: '#5a67d8',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      background: 'rgba(102, 126, 234, 0.1)',
      hover: 'rgba(102, 126, 234, 0.2)'
    },
    secondary: {
      main: '#f093fb',
      light: '#f5576c',
      dark: '#ec4899',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      background: 'rgba(240, 147, 251, 0.1)',
      hover: 'rgba(240, 147, 251, 0.2)'
    },
    success: {
      main: '#43e97b',
      light: '#38f9d7',
      dark: '#28a745',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      background: 'rgba(67, 233, 123, 0.1)',
      hover: 'rgba(67, 233, 123, 0.2)'
    },
    warning: {
      main: '#ffa726',
      light: '#ff7043',
      dark: '#f57c00',
      gradient: 'linear-gradient(135deg, #ffa726 0%, #ff7043 100%)',
      background: 'rgba(255, 167, 38, 0.1)',
      hover: 'rgba(255, 167, 38, 0.2)'
    },
    error: {
      main: '#f44336',
      light: '#e91e63',
      dark: '#d32f2f',
      gradient: 'linear-gradient(135deg, #f44336 0%, #e91e63 100%)',
      background: 'rgba(244, 67, 54, 0.1)',
      hover: 'rgba(244, 67, 54, 0.2)'
    },
    info: {
      main: '#4facfe',
      light: '#00f2fe',
      dark: '#2196f3',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      background: 'rgba(79, 172, 254, 0.1)',
      hover: 'rgba(79, 172, 254, 0.2)'
    }
  };
  return colors[intent] || colors.default;
};

// Size mapping
const getSizeStyles = (size: SheetSize, isMobile: boolean) => {
  if (isMobile && size !== 'fullscreen') {
    return { width: '100%', height: 'auto', maxWidth: '100%', maxHeight: '80vh' };
  }

  const sizes = {
    small: { width: 400, maxWidth: 400, minWidth: 300, height: 'auto', maxHeight: 400, minHeight: 200 },
    medium: { width: 600, maxWidth: 600, minWidth: 400, height: 'auto', maxHeight: 600, minHeight: 300 },
    large: { width: 800, maxWidth: 800, minWidth: 500, height: 'auto', maxHeight: 800, minHeight: 400 },
    auto: { width: 'auto', maxWidth: '90vw', minWidth: 300, height: 'auto', maxHeight: '90vh', minHeight: 200 },
    fullscreen: { width: '100vw', maxWidth: '100vw', minWidth: '100vw', height: '100vh', maxHeight: '100vh', minHeight: '100vh' }
  };
  return sizes[size] || sizes.medium;
};

// Animation variants
const getAnimationVariants = (type: string, placement: SheetPlacement, duration: number) => {
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    slide: {
      top: {
        initial: { y: '-100%', opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: '-100%', opacity: 0 }
      },
      bottom: {
        initial: { y: '100%', opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: '100%', opacity: 0 }
      },
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
      center: {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.8, opacity: 0 }
      }
    },
    zoom: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.8, opacity: 0 }
    },
    scale: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.9, opacity: 0 }
    }
  };

  if (type === 'slide') {
    return variants.slide[placement] || variants.slide.center;
  }

  return variants[type] || variants.fade;
};

export const Sheet = forwardRef<HTMLDivElement, SheetProps>((props, ref) => {
  const {
    // Core props
    open,
    onClose,
    onOpen,
    onSubmit,
    onCancel,
    
    // Content
    title,
    subtitle,
    description,
    children,
    sections = [],
    tabs = [],
    
    // Sheet configuration
    variant = 'default',
    size = 'medium',
    placement = 'center',
    intent = 'default',
    
    // Dimensions
    width: propWidth,
    maxWidth: propMaxWidth,
    minWidth: propMinWidth,
    height: propHeight,
    maxHeight: propMaxHeight,
    minHeight: propMinHeight,
    
    // Styling
    backgroundColor = 'white',
    borderRadius = 12,
    borderWidth = 1,
    borderColor = 'divider',
    borderStyle = 'solid',
    padding = 3,
    margin = 0,
    elevation = 24,
    shadow = true,
    
    // Header styling
    headerBackground,
    headerBorder = true,
    headerBorderColor = 'divider',
    headerBorderWidth = 1,
    headerPadding = 3,
    headerElevation = 4,
    headerShadow = true,
    
    // Footer styling
    footerBackground,
    footerBorder = true,
    footerBorderColor = 'divider',
    footerBorderWidth = 1,
    footerPadding = 3,
    footerElevation = 4,
    footerShadow = true,
    
    // Content styling
    contentBackground,
    contentPadding = 3,
    contentSpacing = 2,
    contentBorder = false,
    contentBorderColor = 'divider',
    contentBorderWidth = 1,
    
    // Actions and controls
    actions = [],
    showActions = true,
    actionAlignment = 'right',
    showCloseButton = true,
    closeButtonIcon = <X size={20} />,
    showBackButton = false,
    backButtonIcon = <ChevronLeft size={20} />,
    showHeader = true,
    showFooter = true,
    showDivider = true,
    
    // Behavior
    dismissible = true,
    closeOnEscape = true,
    closeOnBackdrop = true,
    closeOnClickOutside = true,
    preventClose = false,
    lockScroll = true,
    restoreScroll = true,
    autoFocus = true,
    trapFocus = true,
    
    // Animation
    animated = true,
    animationType = 'slide',
    animationDuration = 300,
    animationDelay = 0,
    animationEasing = 'ease-out',
    animationDirection = 'both',
    
    // Positioning
    offset = 0,
    offsetX = 0,
    offsetY = 0,
    anchorOrigin = { vertical: 'center', horizontal: 'center' },
    transformOrigin = { vertical: 'center', horizontal: 'center' },
    
    // Responsive
    responsive = true,
    breakpoint = 'md',
    responsiveVariant,
    responsiveSize,
    responsivePlacement,
    
    // Loading and states
    loading = false,
    loadingText = 'Loading...',
    loadingIcon = <CircularProgress size={24} />,
    error = false,
    errorText = 'An error occurred',
    errorIcon = <AlertTriangle size={24} />,
    empty = false,
    emptyText = 'No content available',
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
    showProgress = false,
    progress = 0,
    progressText,
    
    // Custom rendering
    renderHeader,
    renderFooter,
    renderActions,
    renderLoading,
    renderError,
    renderEmpty,
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
    drawer = false,
    popover = false,
    fullscreen = false,
    embedded = false,
    floating = false,
    
    // Styling overrides
    containerSx,
    headerSx,
    contentSx,
    footerSx,
    backdropSx,
    
    // Class names
    className,
    headerClassName,
    contentClassName,
    footerClassName,
    backdropClassName,
    
    // Style overrides
    style,
    headerStyle,
    contentStyle,
    footerStyle,
    backdropStyle
  } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoint));
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [state, setState] = useState<SheetState>({
    status: 'closed',
    isAnimating: false,
    isLoading: loading,
    isError: error,
    isEmpty: empty,
    activeTab: tabs.length > 0 ? tabs[0].id : '',
    expandedSections: new Set(),
    isMinimized: false,
    isMaximized: false,
    isPinned: false,
    isFullscreen: false,
    metricsVisible: false,
    quickActionsVisible: false
  });

  const colors = getEnterpriseColors(intent);
  const sizeStyles = getSizeStyles(responsive && responsiveSize ? responsiveSize : size, isMobile);
  const animationVariants = getAnimationVariants(animationType, responsive && responsivePlacement ? responsivePlacement : placement, animationDuration);

  // Handle state changes
  useEffect(() => {
    setState(prev => ({
      ...prev,
      isLoading: loading,
      isError: error,
      isEmpty: empty
    }));
  }, [loading, error, empty]);

  // Handle open/close
  useEffect(() => {
    if (open) {
      setState(prev => ({ ...prev, status: 'opening', isAnimating: true }));
      if (onOpen) onOpen();
      
      // Lock scroll
      if (lockScroll && !embedded) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      setState(prev => ({ ...prev, status: 'closing', isAnimating: true }));
      
      // Restore scroll
      if (restoreScroll && !embedded) {
        document.body.style.overflow = '';
      }
    }
  }, [open, onOpen, lockScroll, restoreScroll, embedded]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape && !preventClose && open) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [open, closeOnEscape, preventClose]);

  // Handle close
  const handleClose = useCallback(() => {
    if (preventClose) return;
    
    setState(prev => ({ ...prev, status: 'closing', isAnimating: true }));
    setTimeout(() => {
      if (onClose) onClose();
      setState(prev => ({ ...prev, status: 'closed', isAnimating: false }));
    }, animationDuration);
  }, [onClose, preventClose, animationDuration]);

  // Handle submit
  const handleSubmit = useCallback(() => {
    if (onSubmit) onSubmit();
  }, [onSubmit]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    if (onCancel) onCancel();
    handleClose();
  }, [onCancel, handleClose]);

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setState(prev => ({ ...prev, activeTab: tabId }));
  };

  // Handle section toggle
  const handleSectionToggle = (sectionId: string) => {
    const newExpanded = new Set(state.expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setState(prev => ({ ...prev, expandedSections: newExpanded }));
  };

  // Get responsive variant
  const getResponsiveVariant = () => {
    if (!responsive || !isMobile) return variant;
    return responsiveVariant || variant;
  };

  const currentVariant = getResponsiveVariant();

  // Get responsive placement
  const getResponsivePlacement = () => {
    if (!responsive || !isMobile) return placement;
    return responsivePlacement || placement;
  };

  const currentPlacement = getResponsivePlacement();

  // Get responsive size
  const getResponsiveSize = () => {
    if (!responsive || !isMobile) return size;
    return responsiveSize || size;
  };

  const currentSize = getResponsiveSize();

  // Determine container component
  const getContainerComponent = () => {
    if (embedded) return Box;
    if (drawer) return Drawer;
    if (modal || currentVariant === 'modal') return Dialog;
    if (popover) return Popover;
    return Dialog; // Default to modal-like behavior
  };

  const ContainerComponent = getContainerComponent();

  // Get container props
  const getContainerProps = () => {
    const baseProps = {
      open: open && state.status !== 'closed',
      onClose: handleClose,
      ref: sheetRef,
      className: className,
      sx: { ...containerSx, ...style }
    };

    if (embedded) {
      return {
        ...baseProps,
        sx: {
          ...baseProps.sx,
          position: 'relative',
          width: '100%',
          height: '100%'
        }
      };
    }

    if (drawer) {
      return {
        ...baseProps,
        anchor: currentPlacement === 'left' ? 'left' : currentPlacement === 'right' ? 'right' : currentPlacement === 'top' ? 'top' : 'bottom',
        variant: currentVariant === 'persistent' ? 'persistent' : 'temporary'
      };
    }

    if (popover) {
      return {
        ...baseProps,
        anchorOrigin: anchorOrigin,
        transformOrigin: transformOrigin,
        marginThreshold: 16
      };
    }

    return {
      ...baseProps,
      maxWidth: false,
      fullWidth: currentSize === 'fullscreen',
      fullScreen: currentSize === 'fullscreen' || fullscreen
    };
  };

  const containerProps = getContainerProps();

  // Render header
  const renderHeaderComponent = () => {
    if (!showHeader) return null;
    if (renderHeader) return renderHeader();

    return (
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
          ...headerSx,
          ...headerStyle
        }}
      >
        {/* Left section */}
        <Stack direction="row" spacing={2} alignItems="center" sx={{ flex: 1 }}>
          {showBackButton && (
            <IconButton
              onClick={handleClose}
              size="small"
              sx={{ color: enterprise ? 'white' : 'text.primary' }}
            >
              {backButtonIcon}
            </IconButton>
          )}
          
          <Box sx={{ flex: 1 }}>
            {title && (
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
            )}
            
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
            
            {description && (
              <Typography
                variant="caption"
                sx={{
                  color: enterprise ? 'rgba(255,255,255,0.6)' : 'text.secondary',
                  display: 'block',
                  mt: 0.5
                }}
              >
                {description}
              </Typography>
            )}
          </Box>
        </Stack>

        {/* Right section */}
        <Stack direction="row" spacing={1} alignItems="center">
          {/* Quick actions */}
          {enterprise && showQuickActions && quickActions.length > 0 && (
            <ToggleButtonGroup size="small" exclusive={false}>
              {quickActions.map(action => (
                <ToggleButton
                  key={action.id}
                  value={action.id}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  sx={{
                    backgroundColor: enterprise ? 'rgba(255,255,255,0.1)' : 'transparent',
                    color: enterprise ? 'white' : 'text.primary',
                    '&:hover': {
                      backgroundColor: enterprise ? 'rgba(255,255,255,0.2)' : 'action.hover'
                    }
                  }}
                >
                  {action.icon}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          )}

          {/* Close button */}
          {showCloseButton && dismissible && (
            <IconButton
              onClick={handleClose}
              size="small"
              sx={{
                color: enterprise ? 'white' : 'text.primary',
                '&:hover': {
                  backgroundColor: enterprise ? 'rgba(255,255,255,0.1)' : 'action.hover'
                }
              }}
            >
              {closeButtonIcon}
            </IconButton>
          )}
        </Stack>

        {/* Progress bar */}
        {showProgress && (
          <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <LinearProgress
              variant={progress ? 'determinate' : 'indeterminate'}
              value={progress}
              sx={{
                height: 2,
                backgroundColor: alpha(enterprise ? 'white' : colors.main, 0.2),
                '& .MuiLinearProgress-bar': {
                  backgroundColor: enterprise ? 'white' : colors.main
                }
              }}
            />
            {progressText && (
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  right: 8,
                  bottom: -20,
                  color: enterprise ? 'rgba(255,255,255,0.8)' : 'text.secondary'
                }}
              >
                {progressText}
              </Typography>
            )}
          </Box>
        )}

        {/* Breadcrumbs */}
        {showBreadcrumbs && breadcrumbs.length > 0 && (
          <Box sx={{ position: 'absolute', top: '100%', left: 0, right: 0, mt: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <Button
                    size="small"
                    onClick={crumb.onClick}
                    sx={{
                      color: enterprise ? 'rgba(255,255,255,0.8)' : 'text.secondary',
                      textTransform: 'none',
                      fontSize: '12px'
                    }}
                  >
                    {crumb.label}
                  </Button>
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight size={12} sx={{ color: enterprise ? 'rgba(255,255,255,0.5)' : 'text.secondary' }} />
                  )}
                </React.Fragment>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    );
  };

  // Render content
  const renderContentComponent = () => {
    if (state.isLoading && renderLoading) return renderLoading();
    if (state.isError && renderError) return renderError();
    if (state.isEmpty && renderEmpty) return renderEmpty();

    return (
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
        {/* Tabs */}
        {tabs.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <ToggleButtonGroup
              value={state.activeTab}
              exclusive
              onChange={(e, value) => value && handleTabChange(value)}
              sx={{ width: '100%' }}
            >
              {tabs.map(tab => (
                <ToggleButton
                  key={tab.id}
                  value={tab.id}
                  disabled={tab.disabled}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    px: 2,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    {tab.icon}
                    <Typography variant="body2">{tab.label}</Typography>
                    {tab.badge && (
                      <Badge badgeContent={tab.badge} color="primary" sx={{ ml: 1 }}>
                        <Box />
                      </Badge>
                    )}
                  </Stack>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        )}

        {/* Active tab content */}
        {tabs.length > 0 && (
          <Box>
            {tabs.find(tab => tab.id === state.activeTab)?.content}
          </Box>
        )}

        {/* Sections */}
        {sections.length > 0 && tabs.length === 0 && (
          <Stack spacing={contentSpacing}>
            {sections.map(section => (
              <Card
                key={section.id}
                elevation={section.disabled ? 0 : 2}
                sx={{
                  backgroundColor: section.disabled ? 'action.disabledBackground' : 'background.paper',
                  opacity: section.disabled ? 0.6 : 1
                }}
              >
                {section.title && (
                  <CardContent sx={{ pb: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: section.collapsible ? 'pointer' : 'default'
                      }}
                      onClick={() => section.collapsible && handleSectionToggle(section.id)}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        {section.icon}
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {section.title}
                        </Typography>
                      </Stack>
                      
                      {section.collapsible && (
                        <IconButton size="small">
                          <ChevronDown
                            size={16}
                            sx={{
                              transform: state.expandedSections.has(section.id) ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.2s ease'
                            }}
                          />
                        </IconButton>
                      )}
                    </Box>
                  </CardContent>
                )}
                
                <Collapse in={!section.collapsible || state.expandedSections.has(section.id)} timeout="auto">
                  <CardContent sx={{ pt: section.title ? 0 : 2 }}>
                    {section.content}
                  </CardContent>
                </Collapse>
              </Card>
            ))}
          </Stack>
        )}

        {/* Regular children */}
        {sections.length === 0 && tabs.length === 0 && children}
      </Box>
    );
  };

  // Render footer
  const renderFooterComponent = () => {
    if (!showFooter) return null;
    if (renderFooter) return renderFooter();

    const hasActions = actions.length > 0 || (enterprise && showQuickActions && quickActions.length > 0);

    if (!hasActions) return null;

    return (
      <Box
        className={footerClassName}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: getActionAlignment(),
          p: footerPadding,
          backgroundColor: footerBackground || 'background.paper',
          borderTop: footerBorder ? `${footerBorderWidth}px solid ${footerBorderColor}` : 'none',
          boxShadow: footerShadow ? `${footerElevation}px ${footerElevation}px ${footerElevation * 2}px rgba(0,0,0,0.1)` : 'none',
          gap: 2,
          ...footerSx,
          ...footerStyle
        }}
      >
        {/* Regular actions */}
        {actions.map(action => (
          <Button
            key={action.id}
            variant={action.variant || 'outlined'}
            color={action.color || 'primary'}
            size={action.size || 'medium'}
            onClick={action.onClick}
            disabled={action.disabled || action.loading}
            startIcon={action.icon}
            sx={{ minWidth: 100 }}
          >
            {action.label}
          </Button>
        ))}

        {/* Enterprise quick actions */}
        {enterprise && showQuickActions && quickActions.length > 0 && (
          <ToggleButtonGroup size="small" exclusive={false}>
            {quickActions.map(action => (
              <Tooltip key={action.id} title={action.tooltip || action.label}>
                <ToggleButton
                  value={action.id}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  sx={{ color: 'text.primary' }}
                >
                  {action.icon}
                </ToggleButton>
              </Tooltip>
            ))}
          </ToggleButtonGroup>
        )}
      </Box>
    );
  };

  // Get action alignment
  const getActionAlignment = () => {
    const alignments = {
      left: 'flex-start',
      center: 'center',
      right: 'flex-end',
      'space-between': 'space-between'
    };
    return alignments[actionAlignment] || alignments.right;
  };

  // Render backdrop
  const renderBackdropComponent = () => {
    if (embedded) return null;
    if (renderBackdrop) return renderBackdrop();

    return (
      <Backdrop
        open={open}
        onClick={closeOnBackdrop ? handleClose : undefined}
        sx={{
          backgroundColor: enterprise 
            ? 'rgba(0, 0, 0, 0.7)' 
            : 'rgba(0, 0, 0, 0.5)',
          backdropFilter: enterprise ? 'blur(5px)' : 'none',
          ...backdropSx,
          ...backdropStyle
        }}
        className={backdropClassName}
      />
    );
  };

  // Main content
  const renderSheetContent = () => (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        width: sizeStyles.width,
        maxWidth: sizeStyles.maxWidth,
        minWidth: sizeStyles.minWidth,
        height: sizeStyles.height,
        maxHeight: sizeStyles.maxHeight,
        minHeight: sizeStyles.minHeight,
        backgroundColor: backgroundColor,
        borderRadius: embedded ? 0 : borderRadius,
        border: `${borderWidth}px ${borderStyle} ${borderColor}`,
        padding: padding,
        margin: margin,
        boxShadow: shadow ? `${elevation}px ${elevation}px ${elevation * 2}px rgba(0,0,0,0.15)` : 'none',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...containerSx,
        ...style
      }}
    >
      {/* Header */}
      {renderHeaderComponent()}

      {/* Divider */}
      {showHeader && showDivider && (
        <Divider sx={{ borderColor: headerBorderColor }} />
      )}

      {/* Content */}
      {renderContentComponent()}

      {/* Divider */}
      {showFooter && showDivider && (
        <Divider sx={{ borderColor: footerBorderColor }} />
      )}

      {/* Footer */}
      {renderFooterComponent()}

      {/* Enterprise statistics */}
      {enterprise && showStatistics && (
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
          <Grid container spacing={0.5}>
            <Grid item xs={6}>
              <Typography variant="caption" sx={{ color: colors.main }}>
                Views: {statistics.viewCount || 0}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" sx={{ color: colors.main }}>
                Interactions: {statistics.interactionCount || 0}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Performance metrics */}
      {enterprise && showPerformanceMetrics && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            backgroundColor: alpha(colors.background, 0.9),
            borderRadius: 1,
            p: 1,
            zIndex: 100
          }}
        >
          <Typography variant="caption" sx={{ color: colors.main }}>
            Render: {performanceMetrics.renderTime}ms | 
            Open: {performanceMetrics.openTime}ms
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <ContainerComponent
      {...containerProps}
      BackdropComponent={renderBackdropComponent}
      PaperProps={{
        ref: sheetRef,
        sx: {
          position: 'relative',
          overflow: 'visible',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          margin: 0,
          padding: 0
        }
      }}
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          margin: 0,
          padding: 0
        },
        '& .MuiDrawer-paper': {
          backgroundColor: 'transparent',
          boxShadow: 'none'
        }
      }}
    >
      <Fade
        in={open}
        timeout={animationDuration}
        appear={animated}
        unmountOnExit
      >
        <Box>
          {renderSheetContent()}
        </Box>
      </Fade>
    </ContainerComponent>
  );
});

Sheet.displayName = 'Sheet';

export { Sheet };
export type { 
  SheetProps, 
  SheetState, 
  SheetVariant, 
  SheetSize, 
  SheetPlacement, 
  SheetStatus, 
  SheetIntent,
  SheetAction,
  SheetSection,
  SheetTab
};
