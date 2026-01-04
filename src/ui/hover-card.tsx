
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Button,
  Chip,
  Avatar,
  AvatarGroup,
  Badge,
  Tooltip,
  Fade,
  Zoom,
  Slide,
  Grow,
  Collapse,
  alpha,
  useTheme,
  useMediaQuery,
  Divider,
  Stack,
  Grid,
  LinearProgress,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton
} from '@mui/material';
import {
  Eye,
  EyeOff,
  Heart,
  HeartOff,
  Bookmark,
  BookmarkPlus,
  Share2,
  Download,
  Upload,
  ExternalLink,
  MoreVertical,
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Plus,
  Minus,
  X,
  Check,
  CheckCircle,
  AlertCircle,
  Info,
  Warning,
  Error as ErrorIcon,
  Star,
  StarOff,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Send,
  PaperPlane,
  Calendar,
  Clock,
  MapPin,
  User,
  Users,
  Mail,
  Phone,
  Video,
  Settings,
  Sliders,
  Home,
  FileText,
  Folder,
  Database,
  Cloud,
  Activity,
  TrendingUp,
  BarChart3,
  PieChart,
  Zap,
  Shield,
  Award,
  Lock,
  Unlock,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  RefreshCw,
  RotateCcw,
  Save,
  Edit3,
  Trash2,
  Copy,
  Scissors,
  Clipboard,
  Link,
  Paperclip,
  Image as ImageIcon,
  Film,
  Music,
  Archive,
  FileArchive,
  DownloadCloud,
  UploadCloud,
  FileSearch,
  FolderSearch,
  SearchX,
  Filter1,
  Filter2,
  SortAsc1,
  SortDesc1,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  ListOrdered,
  List,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code2,
  Terminal,
  Type,
  Palette,
  Sun,
  Moon,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  VideoOff,
  ScreenShare,
  ScreenShareOff,
  Cast,
  Airplay,
  Wifi,
  WifiOff,
  Bluetooth,
  Battery,
  BatteryCharging,
  Location,
  Map,
  Globe,
  Compass,
  Navigation,
  Navigation2
} from 'lucide-react';

interface HoverCardTrigger {
  type: 'hover' | 'click' | 'focus' | 'context-menu';
  delay?: number;
  closeDelay?: number;
  disabled?: boolean;
}

interface HoverCardPosition {
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  alignment?: 'start' | 'center' | 'end';
  offset?: number;
  shift?: boolean;
  flip?: boolean;
  arrow?: boolean;
  constrainViewport?: boolean;
}

interface HoverCardAnimation {
  type: 'fade' | 'zoom' | 'slide' | 'grow' | 'collapse' | 'none';
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  easing?: string;
}

interface HoverCardContent {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  avatar?: string;
  badges?: string[];
  tags?: string[];
  metadata?: Record<string, any>;
  actions?: HoverCardAction[];
  footer?: React.ReactNode;
  header?: React.ReactNode;
  customContent?: React.ReactNode;
}

interface HoverCardAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  disabled?: boolean;
  loading?: boolean;
  tooltip?: string;
  shortcut?: string;
}

interface HoverCardConfig {
  // Core configuration
  children: React.ReactNode;
  content: HoverCardContent;
  open?: boolean;
  defaultOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  
  // Trigger configuration
  trigger?: HoverCardTrigger;
  triggerRef?: React.RefObject<HTMLElement>;
  
  // Position configuration
  position?: HoverCardPosition;
  
  // Appearance
  variant?: 'default' | 'card' | 'compact' | 'expanded' | 'minimal';
  size?: 'small' | 'medium' | 'large' | 'auto';
  maxWidth?: number;
  maxHeight?: number;
  elevation?: number;
  borderRadius?: number;
  background?: string;
  padding?: number;
  margin?: number;
  
  // Content configuration
  showHeader?: boolean;
  showFooter?: boolean;
  showActions?: boolean;
  showBadges?: boolean;
  showTags?: boolean;
  showMetadata?: boolean;
  showArrow?: boolean;
  showClose?: boolean;
  showOverlay?: boolean;
  
  // Features
  interactive?: boolean;
  persistent?: boolean;
  dismissible?: boolean;
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
  closeOnScroll?: boolean;
  closeOnResize?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  
  // Advanced features
  loading?: boolean;
  disabled?: boolean;
  skeleton?: boolean;
  lazy?: boolean;
  cache?: boolean;
  prefetch?: boolean;
  debounce?: number;
  throttle?: number;
  
  // Animation
  animation?: HoverCardAnimation;
  transition?: 'fade' | 'zoom' | 'slide' | 'grow' | 'collapse' | 'none';
  transitionDuration?: number;
  transitionTiming?: string;
  
  // Customization
  customTrigger?: React.ReactNode;
  customContent?: React.ReactNode;
  customArrow?: React.ReactNode;
  customOverlay?: React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  className?: string;
  sx?: any;
  
  // Accessibility
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  role?: string;
  tabIndex?: number;
  
  // Callbacks
  onTrigger?: (event: React.SyntheticEvent) => void;
  onContentClick?: (event: React.MouseEvent) => void;
  onActionClick?: (action: HoverCardAction) => void;
  onPositionChange?: (position: { x: number; y: number }) => void;
  
  // Performance
  portal?: boolean;
  portalContainer?: HTMLElement;
  zIndex?: number;
  updatePosition?: boolean;
  resizeDebounce?: number;
  scrollDebounce?: number;
}

interface EnterpriseHoverCardProps extends HoverCardConfig {}

const HoverCard: React.FC<EnterpriseHoverCardProps> = ({
  // Core
  children,
  content,
  open: controlledOpen,
  defaultOpen = false,
  onOpen,
  onClose,
  
  // Trigger
  trigger = { type: 'hover', delay: 500, closeDelay: 200 },
  triggerRef,
  
  // Position
  position = { placement: 'auto', alignment: 'center', offset: 8, arrow: true },
  
  // Appearance
  variant = 'default',
  size = 'medium',
  maxWidth = 350,
  maxHeight = 400,
  elevation = 8,
  borderRadius = 12,
  background,
  padding = 2,
  margin = 1,
  
  // Content
  showHeader = true,
  showFooter = true,
  showActions = true,
  showBadges = true,
  showTags = true,
  showMetadata = true,
  showArrow = position.arrow !== false,
  showClose = true,
  showOverlay = false,
  
  // Features
  interactive = true,
  persistent = false,
  dismissible = true,
  closeOnEscape = true,
  closeOnClickOutside = true,
  closeOnScroll = false,
  closeOnResize = false,
  preventDefault = false,
  stopPropagation = false,
  
  // Advanced
  loading = false,
  disabled = false,
  skeleton = false,
  lazy = true,
  cache = true,
  debounce = 0,
  throttle = 0,
  
  // Animation
  animation = { type: 'fade', duration: 200 },
  transition = 'fade',
  transitionDuration = 200,
  transitionTiming = 'ease-out',
  
  // Customization
  customTrigger,
  customContent,
  customArrow,
  customOverlay,
  loadingComponent,
  errorComponent,
  emptyComponent,
  className,
  sx,
  
  // Accessibility
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  role = 'tooltip',
  tabIndex = 0,
  
  // Callbacks
  onTrigger,
  onContentClick,
  onActionClick,
  onPositionChange,
  
  // Performance
  portal = true,
  portalContainer,
  zIndex = 1300,
  updatePosition = true,
  resizeDebounce = 100,
  scrollDebounce = 100
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isOpen, setIsOpen] = useState(controlledOpen ?? defaultOpen);
  const [isVisible, setIsVisible] = useState(!lazy || (controlledOpen ?? defaultOpen));
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [arrowPosition, setArrowPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(loading);
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const throttleRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const isControlled = controlledOpen !== undefined;

  // Size mapping
  const sizeMap = {
    small: { width: 280, padding: 1.5, spacing: 1 },
    medium: { width: 350, padding: 2, spacing: 1.5 },
    large: { width: 450, padding: 3, spacing: 2 },
    auto: { width: maxWidth, padding: padding, spacing: margin }
  };
  const currentSize = sizeMap[size] || sizeMap.medium;

  // Animation components
  const AnimationComponents = {
    fade: Fade,
    zoom: Zoom,
    slide: Slide,
    grow: Grow,
    collapse: Collapse,
    none: React.Fragment
  };

  const AnimationComponent = AnimationComponents[animation.type] || AnimationComponents[transition] || Fade;

  // Calculate optimal position
  const calculatePosition = useCallback((triggerElement: HTMLElement) => {
    if (!triggerElement || !contentRef.current) return { x: 0, y: 0 };

    const triggerRect = triggerElement.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = 0;
    let y = 0;
    let placement = position.placement || 'auto';
    let alignment = position.alignment || 'center';

    // Auto placement logic
    if (placement === 'auto') {
      const space = {
        top: triggerRect.top,
        bottom: viewportHeight - triggerRect.bottom,
        left: triggerRect.left,
        right: viewportWidth - triggerRect.right
      };

      // Choose placement with most space
      if (space.bottom >= space.top && space.bottom >= contentRect.height + position.offset) {
        placement = 'bottom';
      } else if (space.top >= contentRect.height + position.offset) {
        placement = 'top';
      } else if (space.right >= contentRect.width + position.offset) {
        placement = 'right';
      } else if (space.left >= contentRect.width + position.offset) {
        placement = 'left';
      } else {
        placement = 'bottom'; // Default fallback
      }
    }

    // Calculate position based on placement
    switch (placement) {
      case 'top':
        y = triggerRect.top - contentRect.height - position.offset;
        if (alignment === 'center') {
          x = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
        } else if (alignment === 'start') {
          x = triggerRect.left;
        } else if (alignment === 'end') {
          x = triggerRect.right - contentRect.width;
        }
        break;
      
      case 'bottom':
        y = triggerRect.bottom + position.offset;
        if (alignment === 'center') {
          x = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
        } else if (alignment === 'start') {
          x = triggerRect.left;
        } else if (alignment === 'end') {
          x = triggerRect.right - contentRect.width;
        }
        break;
      
      case 'left':
        x = triggerRect.left - contentRect.width - position.offset;
        if (alignment === 'center') {
          y = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
        } else if (alignment === 'start') {
          y = triggerRect.top;
        } else if (alignment === 'end') {
          y = triggerRect.bottom - contentRect.height;
        }
        break;
      
      case 'right':
        x = triggerRect.right + position.offset;
        if (alignment === 'center') {
          y = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
        } else if (alignment === 'start') {
          y = triggerRect.top;
        } else if (alignment === 'end') {
          y = triggerRect.bottom - contentRect.height;
        }
        break;
    }

    // Constrain to viewport
    if (position.constrainViewport !== false) {
      x = Math.max(16, Math.min(x, viewportWidth - contentRect.width - 16));
      y = Math.max(16, Math.min(y, viewportHeight - contentRect.height - 16));
    }

    return { x, y };
  }, [position, maxWidth, maxHeight]);

  // Handle trigger events
  const handleTrigger = useCallback((event: React.SyntheticEvent) => {
    if (disabled) return;
    
    if (preventDefault) event.preventDefault();
    if (stopPropagation) event.stopPropagation();

    onTrigger?.(event);

    const triggerElement = triggerRef.current;
    if (!triggerElement) return;

    if (debounce > 0) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        handleOpen(triggerElement);
      }, debounce);
    } else {
      handleOpen(triggerElement);
    }
  }, [disabled, debounce, preventDefault, stopPropagation, onTrigger]);

  const handleOpen = useCallback((triggerElement: HTMLElement) => {
    if (isControlled) {
      onOpen?.();
      return;
    }

    setIsLoading(loading);
    setIsAnimating(true);
    
    // Calculate position
    const newPosition = calculatePosition(triggerElement);
    setPosition(newPosition);
    onPositionChange?.(newPosition);

    setIsOpen(true);
    onOpen?.();

    if (lazy && !isVisible) {
      setIsVisible(true);
    }

    // Auto-close timers
    if (trigger.closeDelay && !persistent) {
      timeoutRef.current = setTimeout(() => {
        handleClose();
      }, trigger.closeDelay);
    }
  }, [isControlled, loading, calculatePosition, onOpen, onPositionChange, lazy, isVisible, trigger.closeDelay, persistent]);

  const handleClose = useCallback(() => {
    if (isControlled) {
      onClose?.();
      return;
    }

    setIsAnimating(false);
    
    setTimeout(() => {
      setIsOpen(false);
      onClose?.();
      
      if (lazy && cache === false) {
        setIsVisible(false);
      }
    }, animationDuration);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [isControlled, onClose, lazy, cache, animationDuration]);

  // Handle mouse events
  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    if (trigger.type === 'hover') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      handleTrigger(e);
    }
  }, [trigger.type, handleTrigger]);

  const handleMouseLeave = useCallback(() => {
    if (trigger.type === 'hover' && !persistent) {
      if (trigger.closeDelay) {
        timeoutRef.current = setTimeout(() => {
          handleClose();
        }, trigger.closeDelay);
      } else {
        handleClose();
      }
    }
  }, [trigger.type, persistent, trigger.closeDelay, handleClose]);

  // Handle click events
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (trigger.type === 'click') {
      handleTrigger(e);
    }
  }, [trigger.type, handleTrigger]);

  // Handle focus events
  const handleFocus = useCallback((e: React.FocusEvent) => {
    if (trigger.type === 'focus') {
      handleTrigger(e);
    }
  }, [trigger.type, handleTrigger]);

  // Handle context menu
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    if (trigger.type === 'context-menu') {
      e.preventDefault();
      handleTrigger(e);
    }
  }, [trigger.type, handleTrigger]);

  // Handle action click
  const handleActionClick = useCallback((action: HoverCardAction) => {
    if (action.disabled || action.loading) return;
    
    action.onClick();
    onActionClick?.(action);
    
    if (!persistent) {
      handleClose();
    }
  }, [onActionClick, persistent, handleClose]);

  // Handle content click
  const handleContentClick = useCallback((e: React.MouseEvent) => {
    onContentClick?.(e);
  }, [onContentClick]);

  // Handle close button
  const handleCloseClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    handleClose();
  }, [handleClose]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, handleClose]);

  // Handle click outside
  useEffect(() => {
    if (!isOpen || !closeOnClickOutside || !contentRef.current) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
          handleClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeOnClickOutside, handleClose]);

  // Handle scroll and resize
  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => {
      if (closeOnScroll) {
        handleClose();
      } else if (updatePosition) {
        // Debounced position update
        if (throttleRef.current) clearTimeout(throttleRef.current);
        throttleRef.current = setTimeout(() => {
          if (triggerRef.current) {
            const newPosition = calculatePosition(triggerRef.current);
            setPosition(newPosition);
          }
        }, scrollDebounce);
      }
    };

    const handleResize = () => {
      if (closeOnResize) {
        handleClose();
      } else if (updatePosition) {
        // Debounced position update
        if (throttleRef.current) clearTimeout(throttleRef.current);
        throttleRef.current = setTimeout(() => {
          if (triggerRef.current) {
            const newPosition = calculatePosition(triggerRef.current);
            setPosition(newPosition);
          }
        }, resizeDebounce);
      }
    };

    if (closeOnScroll || updatePosition) {
      window.addEventListener('scroll', handleScroll, true);
    }
    
    if (closeOnResize || updatePosition) {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (closeOnScroll || updatePosition) {
        window.removeEventListener('scroll', handleScroll, true);
      }
      if (closeOnResize || updatePosition) {
        window.removeEventListener('resize', handleResize);
      }
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
      }
    };
  }, [isOpen, closeOnScroll, closeOnResize, updatePosition, calculatePosition, scrollDebounce, resizeDebounce, handleClose]);

  // Control open state
  useEffect(() => {
    if (isControlled) {
      setIsOpen(controlledOpen);
    }
  }, [controlledOpen, isControlled]);

  // Loading state
  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (throttleRef.current) clearTimeout(throttleRef.current);
    };
  }, []);

  // Render arrow
  const renderArrow = () => {
    if (!showArrow || !position.placement) return null;

    const placement = position.placement === 'auto' ? 'bottom' : position.placement;
    
    return (
      <Box
        ref={arrowRef}
        sx={{
          position: 'absolute',
          width: 12,
          height: 12,
          background: background || (isDark ? '#1a1a1a' : 'white'),
          border: '1px solid',
          borderColor: 'divider',
          transform: 'rotate(45deg)',
          zIndex: -1,
          ...(() => {
            switch (placement) {
              case 'top':
                return { bottom: -6, left: '50%', marginLeft: -6 };
              case 'bottom':
                return { top: -6, left: '50%', marginLeft: -6 };
              case 'left':
                return { right: -6, top: '50%', marginTop: -6 };
              case 'right':
                return { left: -6, top: '50%', marginTop: -6 };
              default:
                return {};
            }
          })()
        }}
      />
    );
  };

  // Render header
  const renderHeader = () => {
    if (!showHeader) return null;

    return (
      <Box sx={{ mb: 2 }}>
        {content.header}
        
        {(content.title || content.subtitle || content.image) && (
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
            {content.avatar && (
              <Avatar
                src={content.avatar}
                alt={content.title}
                sx={{ width: 48, height: 48 }}
              />
            )}
            
            <Box sx={{ flexGrow: 1 }}>
              {content.title && (
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {content.title}
                </Typography>
              )}
              
              {content.subtitle && (
                <Typography variant="body2" color="text.secondary">
                  {content.subtitle}
                </Typography>
              )}
              
              {content.image && (
                <CardMedia
                  component="img"
                  image={content.image}
                  alt={content.title}
                  sx={{
                    height: 120,
                    borderRadius: 2,
                    mt: 1
                  }}
                />
              )}
            </Box>
            
            {showClose && (
              <IconButton
                size="small"
                onClick={handleCloseClick}
                sx={{
                  background: alpha('#667eea', 0.1),
                  '&:hover': { background: alpha('#667eea', 0.2) }
                }}
              >
                <X size={16} />
              </IconButton>
            )}
          </Box>
        )}
      </Box>
    );
  };

  // Render badges
  const renderBadges = () => {
    if (!showBadges || !content.badges || content.badges.length === 0) return null;

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {content.badges.map((badge, index) => (
          <Chip
            key={index}
            label={badge}
            size="small"
            sx={{
              fontWeight: 600,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}
          />
        ))}
      </Box>
    );
  };

  // Render tags
  const renderTags = () => {
    if (!showTags || !content.tags || content.tags.length === 0) return null;

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {content.tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            variant="outlined"
            size="small"
            sx={{
              fontWeight: 500,
              borderColor: '#667eea',
              color: '#667eea'
            }}
          />
        ))}
      </Box>
    );
  };

  // Render metadata
  const renderMetadata = () => {
    if (!showMetadata || !content.metadata) return null;

    return (
      <Box sx={{ mb: 2 }}>
        <List dense sx={{ py: 0 }}>
          {Object.entries(content.metadata).map(([key, value]) => (
            <ListItem key={key} sx={{ px: 0, py: 0.5 }}>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {String(value)}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };

  // Render description
  const renderDescription = () => {
    if (!content.description) return null;

    return (
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          mb: 2,
          display: '-webkit-box',
          WebkitLineClamp: variant === 'compact' ? 2 : 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {content.description}
      </Typography>
    );
  };

  // Render actions
  const renderActions = () => {
    if (!showActions || !content.actions || content.actions.length === 0) return null;

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
        {content.actions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant === 'primary' ? 'contained' : 'outlined'}
            size={variant === 'compact' ? 'small' : 'medium'}
            onClick={() => handleActionClick(action)}
            disabled={action.disabled || action.loading}
            startIcon={action.icon}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
              ...(action.variant === 'danger' && {
                background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
                color: 'white'
              }),
              ...(action.variant === 'success' && {
                background: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
                color: 'white'
              }),
              ...(action.variant === 'warning' && {
                background: 'linear-gradient(135deg, #ffa726 0%, #f57c00 100%)',
                color: 'white'
              })
            }}
          >
            {action.loading ? <CircularProgress size={16} color="inherit" /> : action.label}
          </Button>
        ))}
      </Box>
    );
  };

  // Render footer
  const renderFooter = () => {
    if (!showFooter) return null;

    return (
      <Box sx={{ mt: 2 }}>
        {content.footer}
      </Box>
    );
  };

  // Render content
  const renderContent = () => {
    if (customContent) return customContent;
    if (skeleton) return renderSkeleton();
    if (isLoading && loadingComponent) return loadingComponent;
    if (isLoading) return renderLoading();
    if (!content && emptyComponent) return emptyComponent;

    return (
      <Box onClick={handleContentClick}>
        {renderHeader()}
        {renderBadges()}
        {renderTags()}
        {renderDescription()}
        {renderMetadata()}
        {renderActions()}
        {renderFooter()}
      </Box>
    );
  };

  // Render skeleton
  const renderSkeleton = () => {
    return (
      <Box sx={{ p: currentSize.padding }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ width: 48, height: 48, borderRadius: '50%', background: alpha('#000000', 0.1) }} />
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ width: '60%', height: 20, borderRadius: 2, background: alpha('#000000', 0.1), mb: 1 }} />
            <Box sx={{ width: '40%', height: 16, borderRadius: 2, background: alpha('#000000', 0.1) }} />
          </Box>
        </Box>
        
        <Box sx={{ width: '100%', height: 16, borderRadius: 2, background: alpha('#000000', 0.1), mb: 1 }} />
        <Box sx={{ width: '80%', height: 16, borderRadius: 2, background: alpha('#000000', 0.1), mb: 2 }} />
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box sx={{ width: 60, height: 32, borderRadius: 2, background: alpha('#000000', 0.1) }} />
          <Box sx={{ width: 80, height: 32, borderRadius: 2, background: alpha('#000000', 0.1) }} />
        </Box>
      </Box>
    );
  };

  // Render loading
  const renderLoading = () => {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <CircularProgress size={48} sx={{ mb: 3, color: '#667eea' }} />
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
          Loading...
        </Typography>
      </Box>
    );
  };

  // Render trigger element
  const renderTrigger = () => {
    if (customTrigger) {
      return (
        <Box
          ref={triggerRef}
          onMouseEnter={trigger.type === 'hover' ? handleMouseEnter : undefined}
          onMouseLeave={trigger.type === 'hover' ? handleMouseLeave : undefined}
          onClick={handleClick}
          onFocus={handleFocus}
          onContextMenu={handleContextMenu}
          sx={{ cursor: disabled ? 'not-allowed' : 'pointer', display: 'inline-block' }}
          tabIndex={disabled ? -1 : tabIndex}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          role={role}
        >
          {customTrigger}
        </Box>
      );
    }

    return (
      <Box
        ref={triggerRef}
        onMouseEnter={trigger.type === 'hover' ? handleMouseEnter : undefined}
        onMouseLeave={trigger.type === 'hover' ? handleMouseLeave : undefined}
        onClick={handleClick}
        onFocus={handleFocus}
        onContextMenu={handleContextMenu}
        sx={{ cursor: disabled ? 'not-allowed' : 'pointer', display: 'inline-block' }}
        tabIndex={disabled ? -1 : tabIndex}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        role={role}
      >
        {children}
      </Box>
    );
  };

  // Main content
  const mainContent = (
    <Box
      ref={contentRef}
      sx={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: currentSize.width,
        maxWidth: maxWidth,
        maxHeight: maxHeight,
        zIndex: zIndex,
        pointerEvents: interactive ? 'auto' : 'none'
      }}
      style={{
        transform: isAnimating ? 'translateZ(0)' : undefined,
        willChange: isAnimating ? 'transform, opacity' : undefined
      }}
    >
      <AnimationComponent
        in={isOpen}
        timeout={animationDuration}
        direction={animation.direction}
        mountOnEnter
        unmountOnExit
        onEnter={() => setIsAnimating(true)}
        onExited={() => setIsAnimating(false)}
      >
        <Paper
          elevation={elevation}
          sx={{
            borderRadius: borderRadius,
            background: background || (isDark ? '#1a1a1a' : 'white'),
            border: '1px solid',
            borderColor: 'divider',
            p: currentSize.padding,
            maxHeight: maxHeight,
            overflow: 'auto',
            position: 'relative',
            ...sx
          }}
          className={className}
        >
          {renderArrow()}
          {renderContent()}
        </Paper>
      </AnimationComponent>
    </Box>
  );

  return (
    <>
      {renderTrigger()}
      
      {isVisible && portal && ReactDOM.createPortal(
        mainContent,
        portalContainer || document.body
      )}
      
      {isVisible && !portal && mainContent}
    </>
  );
};

// Pre-built hover card components for common use cases
export const UserHoverCard: React.FC<{
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role?: string;
    department?: string;
    status?: 'online' | 'offline' | 'away' | 'busy';
    lastSeen?: string;
    projectsCount?: number;
    documentsCount?: number;
  };
  children: React.ReactNode;
  onAction?: (action: string) => void;
}> = ({ user, children, onAction }) => {
  const content: HoverCardContent = {
    title: user.name,
    subtitle: user.role,
    description: user.department,
    avatar: user.avatar,
    metadata: {
      email: user.email,
      status: user.status,
      lastSeen: user.lastSeen,
      projects: user.projectsCount,
      documents: user.documentsCount
    },
    badges: [user.status || 'offline'],
    actions: [
      {
        id: 'message',
        label: 'Message',
        icon: <MessageCircle size={16} />,
        onClick: () => onAction?.('message')
      },
      {
        id: 'email',
        label: 'Email',
        icon: <Mail size={16} />,
        onClick: () => onAction?.('email')
      },
      {
        id: 'video',
        label: 'Video Call',
        icon: <Video size={16} />,
        onClick: () => onAction?.('video')
      }
    ]
  };

  return (
    <HoverCard
      content={content}
      variant="card"
      size="medium"
      showActions={true}
      showMetadata={true}
      showBadges={true}
      animation={{ type: 'fade', duration: 200 }}
    >
      {children}
    </HoverCard>
  );
};

export const DocumentHoverCard: React.FC<{
  document: {
    id: string;
    title: string;
    type: string;
    size: string;
    modified: string;
    preview?: string;
    tags?: string[];
    author?: string;
    version?: string;
    downloads?: number;
  };
  children: React.ReactNode;
  onAction?: (action: string) => void;
}> = ({ document, children, onAction }) => {
  const content: HoverCardContent = {
    title: document.title,
    subtitle: document.type,
    description: `Modified ${document.modified}`,
    image: document.preview,
    tags: document.tags,
    metadata: {
      size: document.size,
      author: document.author,
      version: document.version,
      downloads: document.downloads
    },
    actions: [
      {
        id: 'preview',
        label: 'Preview',
        icon: <Eye size={16} />,
        onClick: () => onAction?.('preview')
      },
      {
        id: 'download',
        label: 'Download',
        icon: <Download size={16} />,
        onClick: () => onAction?.('download')
      },
      {
        id: 'share',
        label: 'Share',
        icon: <Share2 size={16} />,
        onClick: () => onAction?.('share')
      }
    ]
  };

  return (
    <HoverCard
      content={content}
      variant="card"
      size="medium"
      showActions={true}
      showTags={true}
      showMetadata={true}
      animation={{ type: 'zoom', duration: 200 }}
    >
      {children}
    </HoverCard>
  );
};

export const StatsHoverCard: React.FC<{
  stats: {
    label: string;
    value: string | number;
    change?: number;
    trend?: 'up' | 'down';
    description?: string;
    details?: Record<string, any>;
  };
  children: React.ReactNode;
}> = ({ stats, children }) => {
  const content: HoverCardContent = {
    title: stats.label,
    subtitle: `Current: ${stats.value}`,
    description: stats.description,
    metadata: {
      ...stats.details,
      change: stats.change ? `${stats.change > 0 ? '+' : ''}${stats.change}%` : undefined,
      trend: stats.trend
    },
    badges: stats.trend ? [stats.trend === 'up' ? 'Trending Up' : 'Trending Down'] : []
  };

  return (
    <HoverCard
      content={content}
      variant="compact"
      size="small"
      showMetadata={true}
      showBadges={true}
      animation={{ type: 'slide', duration: 150 }}
    >
      {children}
    </HoverCard>
  );
};

export const NotificationHoverCard: React.FC<{
  notification: {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    timestamp: string;
    read?: boolean;
    actions?: Array<{ label: string; action: string }>;
  };
  children: React.ReactNode;
  onAction?: (action: string) => void;
}> = ({ notification, children, onAction }) => {
  const content: HoverCardContent = {
    title: notification.title,
    subtitle: notification.timestamp,
    description: notification.message,
    badges: [notification.type],
    metadata: {
      status: notification.read ? 'Read' : 'Unread'
    },
    actions: notification.actions?.map((action, index) => ({
      id: `action-${index}`,
      label: action.label,
      onClick: () => onAction?.(action.action),
      variant: 'secondary'
    }))
  };

  return (
    <HoverCard
      content={content}
      variant="default"
      size="medium"
      showActions={!!notification.actions?.length}
      showMetadata={true}
      showBadges={true}
      animation={{ type: 'fade', duration: 200 }}
    >
      {children}
    </HoverCard>
  );
};

// Usage examples:
export const UsageExamples = () => {
  const [userOpen, setUserOpen] = useState(false);
  const [docOpen, setDocOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const sampleUser = {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    role: 'Senior Designer',
    department: 'Design Team',
    status: 'online' as const,
    lastSeen: '2 minutes ago',
    projectsCount: 12,
    documentsCount: 24,
    avatar: 'https://i.pravatar.cc/150?img=1'
  };

  const sampleDocument = {
    id: '1',
    title: 'Q4 Financial Report',
    type: 'PDF',
    size: '2.4 MB',
    modified: '2 hours ago',
    preview: 'https://images.unsplash.com/photo-1603796846097-bee99e4a601f?w=400',
    tags: ['finance', 'quarterly', 'report'],
    author: 'John Doe',
    version: 'v2.1',
    downloads: 156
  };

  const sampleStats = {
    label: 'Total Revenue',
    value: '$125,420',
    change: 12.5,
    trend: 'up' as const,
    description: 'Revenue increased compared to last month',
    details: {
      'Last Month': '$111,500',
      'Growth': '+12.5%',
      'Target': '$120,000',
      'Achievement': '104.5%'
    }
  };

  const sampleNotification = {
    id: '1',
    title: 'Document Shared',
    message: 'Sarah Johnson shared "Q4 Financial Report" with you',
    type: 'info' as const,
    timestamp: '2 minutes ago',
    read: false,
    actions: [
      { label: 'View Document', action: 'view' },
      { label: 'Mark as Read', action: 'mark-read' }
    ]
  };

  const handleUserAction = (action: string) => {
    console.log('User action:', action);
  };

  const handleDocumentAction = (action: string) => {
    console.log('Document action:', action);
  };

  const handleNotificationAction = (action: string) => {
    console.log('Notification action:', action);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 800, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Enterprise Hover Card Examples
      </Typography>

      <Grid container spacing={4}>
        {/* User Hover Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', cursor: 'pointer' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Avatar sx={{ width: 64, height: 64, mx: 'auto', mb: 2, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                SJ
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Sarah Johnson
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hover for details
              </Typography>
            </CardContent>
          </Card>
          <UserHoverCard user={sampleUser} onAction={handleUserAction}>
            <Box sx={{ display: 'none' }}>Hidden trigger</Box>
          </UserHoverCard>
        </Grid>

        {/* Document Hover Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', cursor: 'pointer' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <FileText size={48} color="#667eea" style={{ marginBottom: 16 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Document Preview
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hover for preview
              </Typography>
            </CardContent>
          </Card>
          <DocumentHoverCard document={sampleDocument} onAction={handleDocumentAction}>
            <Box sx={{ display: 'none' }}>Hidden trigger</Box>
          </DocumentHoverCard>
        </Grid>

        {/* Stats Hover Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', cursor: 'pointer' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <TrendingUp size={48} color="#4caf50" style={{ marginBottom: 16 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                $125,420
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Revenue - Hover for details
              </Typography>
            </CardContent>
          </Card>
          <StatsHoverCard stats={sampleStats}>
            <Box sx={{ display: 'none' }}>Hidden trigger</Box>
          </StatsHoverCard>
        </Grid>

        {/* Notification Hover Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', cursor: 'pointer' }}>
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Bell size={48} color="#2196f3" style={{ marginBottom: 16 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                New Notification
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hover to view
              </Typography>
            </CardContent>
          </Card>
          <NotificationHoverCard notification={sampleNotification} onAction={handleNotificationAction}>
            <Box sx={{ display: 'none' }}>Hidden trigger</Box>
          </NotificationHoverCard>
        </Grid>
      </Grid>

      {/* Advanced Examples */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Advanced Features</Typography>
        
        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          <Button
            variant="outlined"
            startIcon={<Search size={18} />}
            onClick={() => console.log('Search hover card')}
            sx={{ borderRadius: 2 }}
          >
            Search Integration
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Filter size={18} />}
            onClick={() => console.log('Filter hover card')}
            sx={{ borderRadius: 2 }}
          >
            Filter Integration
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<BarChart3 size={18} />}
            onClick={() => console.log('Analytics hover card')}
            sx={{ borderRadius: 2 }}
          >
            Analytics Card
          </Button>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          The Enterprise HoverCard component provides a comprehensive solution for rich 
          hover interactions in your application. It supports various trigger types, 
          positioning options, animations, and content types while maintaining excellent 
          performance and accessibility standards.
        </Typography>
      </Box>
    </Box>
  );
};

export default HoverCard;
