import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Chip,
  Avatar,
  Badge,
  IconButton,
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
  Zoom,
  alpha,
  useTheme,
  useMediaQuery,
  CircularProgress,
  LinearProgress,
  Stack,
  Card,
  CardContent
} from '@mui/material';
import {
  Menu,
  MoreHorizontal,
  MoreVertical,
  Copy,
  Cut,
  Scissors,
  Paste,
  Clipboard,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Download,
  Upload,
  Share2,
  Link,
  ExternalLink,
  Folder,
  FolderPlus,
  FileText,
  FilePlus,
  Save,
  SaveAll,
  RotateCcw,
  RefreshCw,
  Undo,
  Redo,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Settings,
  Sliders,
  Home,
  User,
  Users,
  UserPlus,
  UserMinus,
  Mail,
  Phone,
  Video,
  MessageCircle,
  Bell,
  BellOff,
  Heart,
  Star,
  Bookmark,
  BookmarkPlus,
  Pin,
  PushPin,
  Lock,
  Unlock,
  Shield,
  Award,
  Zap,
  Activity,
  TrendingUp,
  BarChart3,
  PieChart,
  Database,
  Cloud,
  CloudUpload,
  CloudDownload,
  Calendar,
  Clock,
  Timer,
  AlertCircle,
  Info,
  HelpCircle,
  CheckCircle,
  XCircle,
  Plus,
  Minus,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Minimize2,
  Expand,
  Compress,
  Print,
  Archive,
  ArchiveRestore,
  FileArchive,
  Image,
  Film,
  Music,
  Paperclip,
  Link2,
  ExternalLink2,
  Code,
  Terminal,
  Command,
  Settings2,
  UserCheck,
  UserX,
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
  ImageIcon,
  Smile,
  Send,
  PaperPlane,
  Archive1,
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

interface ContextMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  description?: string;
  disabled?: boolean;
  divider?: boolean;
  submenu?: ContextMenuItem[];
  action: () => void | Promise<void>;
  metadata?: Record<string, any>;
  status?: 'default' | 'success' | 'warning' | 'error' | 'info';
  badge?: string | number;
  variant?: 'default' | 'danger' | 'success' | 'warning';
  group?: string;
}

interface ContextMenuProps {
  // Core functionality
  items: ContextMenuItem[];
  trigger?: 'right-click' | 'long-press' | 'click' | 'hover';
  targetRef?: React.RefObject<HTMLElement>;
  disabled?: boolean;
  delay?: number;
  
  // Appearance
  variant?: 'default' | 'compact' | 'expanded';
  size?: 'small' | 'medium' | 'large';
  maxHeight?: number;
  maxWidth?: number;
  position?: 'auto' | 'top' | 'bottom' | 'left' | 'right';
  alignment?: 'start' | 'center' | 'end';
  
  // Features
  enableIcons?: boolean;
  enableShortcuts?: boolean;
  enableTooltips?: boolean;
  enableSubmenus?: boolean;
  enableSearch?: boolean;
  enableGrouping?: boolean;
  enableAnimation?: boolean;
  enableDarkMode?: boolean;
  
  // Advanced features
  showBadges?: boolean;
  showStatus?: boolean;
  showProgress?: boolean;
  showDividers?: boolean;
  enableMultiSelect?: boolean;
  enableKeyboard?: boolean;
  
  // Customization
  customTrigger?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  emptyState?: React.ReactNode;
  loadingState?: React.ReactNode;
  className?: string;
  sx?: any;
  
  // Callbacks
  onOpen?: (position: { x: number; y: number }) => void;
  onClose?: () => void;
  onItemClick?: (item: ContextMenuItem) => void;
  onItemHover?: (item: ContextMenuItem) => void;
  
  // Accessibility
  ariaLabel?: string;
  ariaDescription?: string;
}

interface ContextMenuState {
  isOpen: boolean;
  position: { x: number; y: number };
  selectedIndex: number;
  searchQuery: string;
  activeSubmenu: string | null;
  isLoading: boolean;
  selectedItems: string[];
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  // Core
  items,
  trigger = 'right-click',
  targetRef,
  disabled = false,
  delay = 0,
  
  // Appearance
  variant = 'default',
  size = 'medium',
  maxHeight = 400,
  maxWidth = 300,
  position = 'auto',
  alignment = 'start',
  
  // Features
  enableIcons = true,
  enableShortcuts = true,
  enableTooltips = true,
  enableSubmenus = true,
  enableSearch = false,
  enableGrouping = true,
  enableAnimation = true,
  enableDarkMode = true,
  
  // Advanced
  showBadges = true,
  showStatus = true,
  showProgress = false,
  showDividers = true,
  enableMultiSelect = false,
  enableKeyboard = true,
  
  // Customization
  customTrigger,
  header,
  footer,
  emptyState,
  loadingState,
  className,
  sx,
  
  // Callbacks
  onOpen,
  onClose,
  onItemClick,
  onItemHover,
  
  // Accessibility
  ariaLabel = 'Context menu',
  ariaDescription = 'Context menu with actions'
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDark = theme.palette.mode === 'dark';
  
  const [state, setState] = useState<ContextMenuState>({
    isOpen: false,
    position: { x: 0, y: 0 },
    selectedIndex: -1,
    searchQuery: '',
    activeSubmenu: null,
    isLoading: false,
    selectedItems: []
  });

  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isControlled = targetRef !== undefined;

  // Size mapping
  const sizeMap = {
    small: { 
      padding: '6px 12px', 
      iconSize: 16, 
      typography: 'caption',
      spacing: 1,
      borderRadius: 6
    },
    medium: { 
      padding: '10px 16px', 
      iconSize: 18, 
      typography: 'body2',
      spacing: 1.5,
      borderRadius: 8
    },
    large: { 
      padding: '14px 20px', 
      iconSize: 20, 
      typography: 'body1',
      spacing: 2,
      borderRadius: 10
    }
  };
  const currentSize = sizeMap[size];

  // Animation wrapper
  const AnimationWrapper = enableAnimation ? Fade : React.Fragment;
  const animationProps = enableAnimation ? { timeout: 200, in: state.isOpen } : {};

  // Filter items based on search
  const filteredItems = useMemo(() => {
    if (!state.searchQuery) return items;

    const query = state.searchQuery.toLowerCase();
    return items.filter(item =>
      item.label.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query) ||
      item.keywords?.some(keyword => keyword.toLowerCase().includes(query))
    );
  }, [items, state.searchQuery]);

  // Group items by category
  const groupedItems = useMemo(() => {
    if (!enableGrouping) return { 'default': filteredItems };

    const groups: Record<string, ContextMenuItem[]> = {};
    
    filteredItems.forEach(item => {
      const group = item.group || 'default';
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(item);
    });
    
    return groups;
  }, [filteredItems, enableGrouping]);

  // Get status color
  const getStatusColor = (status: string = 'default') => {
    const colors = {
      success: '#4caf50',
      warning: '#ffa726',
      error: '#f44336',
      info: '#2196f3',
      default: 'inherit'
    };
    return colors[status as keyof typeof colors] || colors.default;
  };

  // Get status icon
  const getStatusIcon = (status: string = 'default') => {
    const icons = {
      success: <CheckCircle size={14} color="#4caf50" />,
      warning: <AlertCircle size={14} color="#ffa726" />,
      error: <XCircle size={14} color="#f44336" />,
      info: <Info size={14} color="#2196f3" />,
      default: null
    };
    return icons[status as keyof typeof icons];
  };

  // Calculate optimal position
  const calculatePosition = useCallback((event: MouseEvent | TouchEvent) => {
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    
    let x = clientX;
    let y = clientY;
    
    // Adjust position to keep menu on screen
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Horizontal positioning
      if (x + rect.width > viewportWidth - 10) {
        x = viewportWidth - rect.width - 10;
      }
      if (x < 10) {
        x = 10;
      }
      
      // Vertical positioning
      if (y + rect.height > viewportHeight - 10) {
        y = viewportHeight - rect.height - 10;
      }
      if (y < 10) {
        y = 10;
      }
    }
    
    return { x, y };
  }, []);

  // Handle trigger events
  const handleTrigger = useCallback((event: MouseEvent | TouchEvent) => {
    if (disabled) return;
    
    event.preventDefault();
    event.stopPropagation();
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      const position = calculatePosition(event);
      
      setState(prev => ({
        ...prev,
        isOpen: true,
        position,
        selectedIndex: -1
      }));
      
      onOpen?.(position);
    }, delay);
  }, [disabled, delay, calculatePosition, onOpen]);

  // Handle close
  const handleClose = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    setState(prev => ({
      ...prev,
      isOpen: false,
      activeSubmenu: null,
      searchQuery: ''
    }));
    
    onClose?.();
  }, [onClose]);

  // Handle item click
  const handleItemClick = useCallback(async (item: ContextMenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (item.disabled || item.submenu) return;
    
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      await item.action();
      
      if (enableMultiSelect) {
        setState(prev => ({
          ...prev,
          selectedItems: prev.selectedItems.includes(item.id)
            ? prev.selectedItems.filter(id => id !== item.id)
            : [...prev.selectedItems, item.id]
        }));
      }
      
      onItemClick?.(item);
      
      if (!item.submenu) {
        handleClose();
      }
    } catch (error) {
      console.error('Menu item action failed:', error);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [enableMultiSelect, onItemClick, handleClose]);

  // Handle item hover
  const handleItemHover = useCallback((item: ContextMenuItem) => {
    onItemHover?.(item);
    
    if (item.submenu) {
      setState(prev => ({ ...prev, activeSubmenu: item.id }));
    } else {
      setState(prev => ({ ...prev, activeSubmenu: null }));
    }
  }, [onItemHover]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!state.isOpen || !enableKeyboard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setState(prev => ({
            ...prev,
            selectedIndex: Math.min(prev.selectedIndex + 1, filteredItems.length - 1)
          }));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setState(prev => ({
            ...prev,
            selectedIndex: Math.max(prev.selectedIndex - 1, 0)
          }));
          break;
        case 'Enter':
          e.preventDefault();
          if (state.selectedIndex >= 0 && filteredItems[state.selectedIndex]) {
            handleItemClick(filteredItems[state.selectedIndex], e as any);
          }
          break;
        case 'Escape':
          e.preventDefault();
          handleClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [state.isOpen, filteredItems, state.selectedIndex, enableKeyboard, handleItemClick, handleClose]);

  // Handle click outside
  useEffect(() => {
    if (!state.isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [state.isOpen, handleClose]);

  // Setup event listeners
  useEffect(() => {
    const targetElement = targetRef?.current || document;
    
    const setupListeners = () => {
      if (trigger === 'right-click') {
        targetElement.addEventListener('contextmenu', handleTrigger);
      } else if (trigger === 'click') {
        targetElement.addEventListener('click', handleTrigger);
      } else if (trigger === 'long-press') {
        let pressTimer: NodeJS.Timeout;
        
        const startPress = (e: TouchEvent) => {
          pressTimer = setTimeout(() => handleTrigger(e), 500);
        };
        
        const endPress = () => {
          clearTimeout(pressTimer);
        };
        
        targetElement.addEventListener('touchstart', startPress);
        targetElement.addEventListener('touchend', endPress);
        targetElement.addEventListener('touchcancel', endPress);
        
        return () => {
          clearTimeout(pressTimer);
          targetElement.removeEventListener('touchstart', startPress);
          targetElement.removeEventListener('touchend', endPress);
          targetElement.removeEventListener('touchcancel', endPress);
        };
      }
    };

    const cleanup = setupListeners();
    return cleanup;
  }, [targetRef, trigger, handleTrigger]);

  // Render menu item
  const renderMenuItem = (item: ContextMenuItem, index: number, isSelected: boolean) => {
    const isDisabled = item.disabled || state.isLoading;
    const isActive = state.activeSubmenu === item.id;
    const isSelectedItem = enableMultiSelect && state.selectedItems.includes(item.id);
    
    return (
      <React.Fragment key={item.id}>
        {item.divider && showDividers && (
          <Divider sx={{ my: 0.5, borderColor: 'divider' }} />
        )}
        
        <Tooltip
          title={item.description || ''}
          disableHoverListener={!enableTooltips || !item.description}
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
              onClick={(e) => handleItemClick(item, e)}
              onMouseEnter={() => {
                setState(prev => ({ ...prev, selectedIndex: index }));
                handleItemHover(item);
              }}
              disabled={isDisabled}
              sx={{
                py: size === 'small' ? 1 : size === 'large' ? 1.5 : 1.25,
                px: currentSize.spacing,
                borderRadius: currentSize.borderRadius,
                transition: 'all 0.2s ease',
                background: isSelected
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : isActive
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
                  minWidth: currentSize.iconSize + 8,
                  mr: currentSize.spacing
                }}>
                  {item.icon}
                </ListItemIcon>
              )}

              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      variant={currentSize.typography as any}
                      sx={{
                        fontWeight: 600,
                        fontSize: variant === 'compact' ? '0.8rem' : 'inherit',
                        textDecoration: isSelectedItem ? 'line-through' : 'none'
                      }}
                    >
                      {item.label}
                    </Typography>
                    
                    {showBadges && item.badge && (
                      <Chip
                        label={item.badge}
                        size="small"
                        sx={{
                          height: 16,
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          background: isSelected ? 'rgba(255,255,255,0.2)' : alpha('#667eea', 0.1),
                          color: isSelected ? 'white' : '#667eea'
                        }}
                      />
                    )}
                    
                    {showStatus && item.status && item.status !== 'default' && (
                      <Box sx={{ ml: 'auto' }}>
                        {getStatusIcon(item.status)}
                      </Box>
                    )}
                    
                    {item.submenu && (
                      <ChevronRight size={16} style={{ marginLeft: 'auto' }} />
                    )}
                  </Box>
                }
                secondary={
                  item.description && variant !== 'compact' && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: isSelected ? 'rgba(255,255,255,0.8)' : 'text.secondary',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {item.description}
                    </Typography>
                  )
                }
              />

              {enableShortcuts && item.shortcut && (
                <Box sx={{ ml: 'auto', display: 'flex', gap: 0.5 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      px: 1,
                      py: 0.25,
                      background: isSelected ? 'rgba(255,255,255,0.2)' : alpha('#667eea', 0.1),
                      border: '1px solid',
                      borderColor: isSelected ? 'rgba(255,255,255,0.3)' : alpha('#667eea', 0.2),
                      borderRadius: 1
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color: isSelected ? 'white' : '#667eea'
                      }}
                    >
                      {item.shortcut}
                    </Typography>
                  </Paper>
                </Box>
              )}
            </ListItemButton>
            
            {/* Submenu */}
            {enableSubmenus && item.submenu && isActive && (
              <Box
                sx={{
                  position: 'absolute',
                  left: '100%',
                  top: 0,
                  ml: 1,
                  zIndex: 1300
                }}
              >
                <Paper
                  elevation={8}
                  sx={{
                    borderRadius: currentSize.borderRadius,
                    background: isDark ? '#1a1a1a' : 'white',
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                    minWidth: 200,
                    maxHeight: maxHeight,
                    overflowY: 'auto'
                  }}
                >
                  <List sx={{ py: 1 }}>
                    {item.submenu.map((subItem, subIndex) => 
                      renderMenuItem(subItem, subIndex, false)
                    )}
                  </List>
                </Paper>
              </Box>
            )}
          </ListItem>
        </Tooltip>
      </React.Fragment>
    );
  };

  // Render grouped items
  const renderGroupedItems = () => {
    return Object.entries(groupedItems).map(([group, groupItems]) => (
      <Box key={group} sx={{ mb: 1 }}>
        {group !== 'default' && (
          <Box sx={{ px: currentSize.spacing, py: 1 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                color: 'text.secondary',
                textTransform: 'uppercase',
                letterSpacing: 0.5
              }}
            >
              {group}
            </Typography>
          </Box>
        )}
        
        <List sx={{ py: 0 }}>
          {groupItems.map((item, index) => 
            renderMenuItem(item, index, index === state.selectedIndex)
          )}
        </List>
        
        {group !== 'default' && <Divider sx={{ my: 0.5 }} />}
      </Box>
    ));
  };

  // Render search input
  const renderSearch = () => {
    if (!enableSearch) return null;

    return (
      <Box sx={{ px: currentSize.spacing, py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
        <input
          type="text"
          placeholder="Search actions..."
          value={state.searchQuery}
          onChange={(e) => setState(prev => ({ ...prev, searchQuery: e.target.value }))}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #e0e0e0',
            borderRadius: 6,
            fontSize: 14,
            outline: 'none',
            transition: 'border-color 0.2s ease',
            background: isDark ? 'rgba(255,255,255,0.05)' : '#f8fafc'
          }}
          onFocus={(e) => e.target.style.borderColor = '#667eea'}
          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
        />
      </Box>
    );
  };

  // Render header
  const renderHeader = () => {
    if (!header) return null;

    return (
      <Box sx={{ px: currentSize.spacing, py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
        {header}
      </Box>
    );
  };

  // Render footer
  const renderFooter = () => {
    if (!footer) return null;

    return (
      <Box sx={{ px: currentSize.spacing, py: 1, borderTop: '1px solid', borderColor: 'divider' }}>
        {footer}
      </Box>
    );
  };

  // Render empty state
  const renderEmptyState = () => {
    if (filteredItems.length > 0) return null;

    return (
      <Box sx={{ textAlign: 'center', py: 6, px: 4 }}>
        {emptyState || (
          <>
            <SearchX size={48} color="#bdbdbd" style={{ marginBottom: 16 }} />
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
              No actions available
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {state.searchQuery ? 'No results found for your search' : 'No actions match your criteria'}
            </Typography>
          </>
        )}
      </Box>
    );
  };

  // Main menu component
  const MenuComponent = (
    <AnimationWrapper {...animationProps}>
      <Paper
        ref={menuRef}
        elevation={8}
        sx={{
          position: 'fixed',
          left: state.position.x,
          top: state.position.y,
          minWidth: 200,
          maxWidth: maxWidth,
          maxHeight: maxHeight,
          background: isDark ? '#1a1a1a' : 'white',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: currentSize.borderRadius,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          overflow: 'hidden',
          zIndex: 1300,
          ...sx
        }}
        className={className}
        role="menu"
        aria-label={ariaLabel}
        aria-description={ariaDescription}
      >
        {renderHeader()}
        {renderSearch()}
        
        <Box sx={{ overflowY: 'auto', maxHeight: maxHeight - 120 }}>
          {renderEmptyState()}
          {enableGrouping ? renderGroupedItems() : (
            <List sx={{ py: 1 }}>
              {filteredItems.map((item, index) => 
                renderMenuItem(item, index, index === state.selectedIndex)
              )}
            </List>
          )}
        </Box>
        
        {renderFooter()}
      </Paper>
    </AnimationWrapper>
  );

  // Render trigger element
  const renderTrigger = () => {
    if (customTrigger) {
      return (
        <Box
          ref={triggerRef}
          onContextMenu={trigger === 'right-click' ? handleTrigger : undefined}
          onClick={trigger === 'click' ? handleTrigger : undefined}
          style={{ cursor: 'context-menu' }}
        >
          {customTrigger}
        </Box>
      );
    }

    return null;
  };

  return (
    <>
      {renderTrigger()}
      
      {/* Portal for menu */}
      {state.isOpen && ReactDOM.createPortal(
        MenuComponent,
        document.body
      )}
    </>
  );
};

// Pre-built context menu components for common use cases
export const FileContextMenu: React.FC<{ onAction: (action: string) => void; fileType?: string }> = ({ onAction, fileType = 'document' }) => {
  const fileItems: ContextMenuItem[] = [
    {
      id: 'open',
      label: 'Open',
      icon: <Eye size={18} />,
      shortcut: 'Enter',
      action: () => onAction('open')
    },
    {
      id: 'open-with',
      label: 'Open With',
      icon: <ExternalLink size={18} />,
      submenu: [
        {
          id: 'open-default',
          label: 'Default Application',
          action: () => onAction('open-default')
        },
        {
          id: 'open-preview',
          label: 'Preview',
          action: () => onAction('open-preview')
        }
      ],
      action: () => {} // Parent action
    },
    { id: 'divider1', label: '', divider: true },
    {
      id: 'cut',
      label: 'Cut',
      icon: <Scissors size={18} />,
      shortcut: 'Ctrl+X',
      action: () => onAction('cut')
    },
    {
      id: 'copy',
      label: 'Copy',
      icon: <Copy size={18} />,
      shortcut: 'Ctrl+C',
      action: () => onAction('copy')
    },
    {
      id: 'paste',
      label: 'Paste',
      icon: <Clipboard size={18} />,
      shortcut: 'Ctrl+V',
      action: () => onAction('paste')
    },
    { id: 'divider2', label: '', divider: true },
    {
      id: 'rename',
      label: 'Rename',
      icon: <Edit3 size={18} />,
      shortcut: 'F2',
      action: () => onAction('rename')
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <Trash2 size={18} />,
      shortcut: 'Del',
      variant: 'danger',
      action: () => onAction('delete')
    },
    { id: 'divider3', label: '', divider: true },
    {
      id: 'properties',
      label: 'Properties',
      icon: <Info size={18} />,
      action: () => onAction('properties')
    }
  ];

  if (fileType === 'folder') {
    fileItems.splice(2, 0, {
      id: 'explore',
      label: 'Explore',
      icon: <FolderOpen size={18} />,
      action: () => onAction('explore')
    });
  }

  return (
    <ContextMenu
      items={fileItems}
      enableSubmenus
      enableShortcuts
      showBadges
      variant="default"
      size="medium"
      onAction={(item) => console.log('File action:', item.id)}
    />
  );
};

export const TextContextMenu: React.FC<{ onAction: (action: string) => void }> = ({ onAction }) => {
  const textItems: ContextMenuItem[] = [
    {
      id: 'cut',
      label: 'Cut',
      icon: <Scissors size={18} />,
      shortcut: 'Ctrl+X',
      action: () => onAction('cut')
    },
    {
      id: 'copy',
      label: 'Copy',
      icon: <Copy size={18} />,
      shortcut: 'Ctrl+C',
      action: () => onAction('copy')
    },
    {
      id: 'paste',
      label: 'Paste',
      icon: <Clipboard size={18} />,
      shortcut: 'Ctrl+V',
      action: () => onAction('paste')
    },
    { id: 'divider1', label: '', divider: true },
    {
      id: 'select-all',
      label: 'Select All',
      icon: <CheckSquare size={18} />,
      shortcut: 'Ctrl+A',
      action: () => onAction('select-all')
    },
    { id: 'divider2', label: '', divider: true },
    {
      id: 'format',
      label: 'Format',
      icon: <Type size={18} />,
      submenu: [
        {
          id: 'bold',
          label: 'Bold',
          icon: <Bold size={16} />,
          shortcut: 'Ctrl+B',
          action: () => onAction('bold')
        },
        {
          id: 'italic',
          label: 'Italic',
          icon: <Italic size={16} />,
          shortcut: 'Ctrl+I',
          action: () => onAction('italic')
        },
        {
          id: 'underline',
          label: 'Underline',
          icon: <Underline size={16} />,
          shortcut: 'Ctrl+U',
          action: () => onAction('underline')
        }
      ],
      action: () => {}
    },
    {
      id: 'align',
      label: 'Align',
      icon: <AlignLeft size={18} />,
      submenu: [
        {
          id: 'align-left',
          label: 'Left',
          icon: <AlignLeft size={16} />,
          action: () => onAction('align-left')
        },
        {
          id: 'align-center',
          label: 'Center',
          icon: <AlignCenter size={16} />,
          action: () => onAction('align-center')
        },
        {
          id: 'align-right',
          label: 'Right',
          icon: <AlignRight size={16} />,
          action: () => onAction('align-right')
        }
      ],
      action: () => {}
    }
  ];

  return (
    <ContextMenu
      items={textItems}
      enableSubmenus
      enableShortcuts
      variant="default"
      size="medium"
      onAction={(item) => console.log('Text action:', item.id)}
    />
  );
};

export const UserContextMenu: React.FC<{ user: any; onAction: (action: string) => void }> = ({ user, onAction }) => {
  const userItems: ContextMenuItem[] = [
    {
      id: 'view-profile',
      label: 'View Profile',
      icon: <User size={18} />,
      action: () => onAction('view-profile')
    },
    {
      id: 'send-message',
      label: 'Send Message',
      icon: <MessageCircle size={18} />,
      action: () => onAction('send-message')
    },
    {
      id: 'video-call',
      label: 'Video Call',
      icon: <Video size={18} />,
      action: () => onAction('video-call')
    },
    { id: 'divider1', label: '', divider: true },
    {
      id: 'share-contact',
      label: 'Share Contact',
      icon: <Share2 size={18} />,
      action: () => onAction('share-contact')
    },
    {
      id: 'block-user',
      label: 'Block User',
      icon: <UserX size={18} />,
      variant: 'danger',
      action: () => onAction('block-user')
    },
    { id: 'divider2', label: '', divider: true },
    {
      id: 'add-to-favorites',
      label: 'Add to Favorites',
      icon: <Star size={18} />,
      action: () => onAction('add-to-favorites')
    }
  ];

  return (
    <ContextMenu
      items={userItems}
      enableShortcuts
      showStatus
      variant="default"
      size="medium"
      onAction={(item) => console.log('User action:', item.id)}
    />
  );
};

// Usage examples:
export const UsageExamples = () => {
  const fileRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const handleFileAction = (action: string) => {
    console.log('File action:', action);
  };

  const handleTextAction = (action: string) => {
    console.log('Text action:', action);
  };

  const handleUserAction = (action: string) => {
    console.log('User action:', action);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 800, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Context Menu Examples
      </Typography>

      <Grid container spacing={4}>
        {/* File Context Menu */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              cursor: 'context-menu'
            }}
            ref={fileRef}
          >
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <FileText size={48} color="#667eea" style={{ marginBottom: 16 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Document File
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Right-click to see file actions
              </Typography>
            </CardContent>
          </Card>
          <FileContextMenu onAction={handleFileAction} />
        </Grid>

        {/* Text Context Menu */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              cursor: 'text'
            }}
            ref={textRef}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Select this text and right-click to see formatting options.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                You can cut, copy, paste, and format text using the context menu.
              </Typography>
            </CardContent>
          </Card>
          <TextContextMenu onAction={handleTextAction} />
        </Grid>

        {/* User Context Menu */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              cursor: 'context-menu'
            }}
            ref={userRef}
          >
            <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ width: 48, height: 48, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                SJ
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Sarah Johnson
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Right-click for user actions
                </Typography>
              </Box>
            </CardContent>
          </Card>
          <UserContextMenu 
            user={{ name: 'Sarah Johnson', role: 'Senior Designer' }} 
            onAction={handleUserAction} 
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Advanced Features</Typography>
        
        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          <Button
            variant="outlined"
            startIcon={<Search size={18} />}
            onClick={() => console.log('Enable search')}
          >
            Searchable Menu
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Filter size={18} />}
            onClick={() => console.log('Enable filtering')}
          >
            Filterable Menu
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Users size={18} />}
            onClick={() => console.log('Multi-select')}
          >
            Multi-Select
          </Button>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          Try right-clicking on any of the cards above to see the context menus in action. 
          Each menu is optimized for the specific content type and provides relevant actions.
        </Typography>
      </Box>
    </Box>
  );
};

export default ContextMenu;
