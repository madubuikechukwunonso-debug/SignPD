
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Chip,
  Avatar,
  Badge,
  Divider,
  Stack,
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
  LinearProgress
} from '@mui/material';
import {
  Search,
  Command,
  ArrowUp,
  ArrowDown,
  Enter,
  Escape,
  FileText,
  Folder,
  Users,
  Settings,
  Activity,
  TrendingUp,
  Clock,
  Star,
  Heart,
  Bookmark,
  Share2,
  Download,
  Upload,
  Plus,
  Filter,
  MoreVertical,
  Zap,
  Shield,
  Award,
  Calendar,
  MessageCircle,
  Paperclip,
  Link,
  ExternalLink,
  Copy,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  RefreshCw,
  RotateCcw,
  Save,
  Send,
  Mail,
  Phone,
  Video,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  ScreenShare,
  Maximize2,
  Minimize2,
  Pin,
  PushPin,
  SearchX,
  ArrowLeft,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  ChevronsUp,
  ChevronsDown,
  Home,
  File,
  FolderPlus,
  UserPlus,
  Settings2,
  Sliders,
  BarChart3,
  PieChart,
  Database,
  Cloud,
  CloudUpload,
  CloudDownload,
  Wifi,
  WifiOff,
  Battery,
  BatteryCharging,
  Sun,
  Moon,
  Bell,
  BellOff,
  HelpCircle,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Pause,
  Play,
  Stop,
  SkipBack,
  SkipForward,
  Rewind,
  FastForward,
  Volume2,
  VolumeX,
  Image,
  Film,
  Music,
  Archive,
  Lock1,
  Unlock1
} from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  category: string;
  icon?: React.ReactNode;
  shortcut?: string[];
  description?: string;
  keywords?: string[];
  badge?: string | number;
  status?: 'default' | 'success' | 'warning' | 'error' | 'info';
  disabled?: boolean;
  group?: string;
  priority?: number;
  metadata?: Record<string, any>;
  action: () => void | Promise<void>;
  children?: CommandItem[];
}

interface CommandPaletteProps {
  // Core functionality
  commands: CommandItem[];
  open?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  
  // Appearance
  placeholder?: string;
  emptyText?: string;
  loadingText?: string;
  maxHeight?: number;
  maxWidth?: number;
  position?: 'top' | 'center' | 'bottom';
  variant?: 'default' | 'compact' | 'expanded';
  
  // Features
  enableSearch?: boolean;
  enableCategories?: boolean;
  enableShortcuts?: boolean;
  enableHistory?: boolean;
  enableFavorites?: boolean;
  enableRecent?: boolean;
  enableSuggestions?: boolean;
  enableVoice?: boolean;
  enableAI?: boolean;
  
  // Advanced features
  showCategories?: boolean;
  showShortcuts?: boolean;
  showIcons?: boolean;
  showBadges?: boolean;
  showStatus?: boolean;
  showProgress?: boolean;
  showPreview?: boolean;
  
  // Customization
  categories?: string[];
  recentCommands?: string[];
  favoriteCommands?: string[];
  theme?: 'light' | 'dark' | 'auto';
  animation?: 'fade' | 'zoom' | 'slide' | 'none';
  animationDuration?: number;
  
  // Callbacks
  onCommandExecute?: (command: CommandItem) => void;
  onCommandSelect?: (command: CommandItem) => void;
  onSearchChange?: (query: string) => void;
  onCategoryChange?: (category: string) => void;
  
  // Accessibility
  ariaLabel?: string;
  ariaDescription?: string;
}

interface CommandState {
  query: string;
  selectedIndex: number;
  selectedCategory: string;
  isLoading: boolean;
  isVoiceActive: boolean;
  isAIThinking: boolean;
  history: string[];
  favorites: string[];
  recent: string[];
  suggestions: CommandItem[];
}

const defaultCategories = [
  'Files',
  'Edit',
  'View',
  'Insert',
  'Format',
  'Tools',
  'Table',
  'Help',
  'Account',
  'Settings'
];

const categoryIcons: Record<string, React.ReactNode> = {
  Files: <FileText size={18} />,
  Edit: <Edit3 size={18} />,
  View: <Eye size={18} />,
  Insert: <Plus size={18} />,
  Format: <Sliders size={18} />,
  Tools: <Settings size={18} />,
  Table: <Database size={18} />,
  Help: <HelpCircle size={18} />,
  Account: <Users size={18} />,
  Settings: <Settings2 size={18} />
};

const statusIcons = {
  success: <CheckCircle size={16} color="#4caf50" />,
  warning: <AlertCircle size={16} color="#ffa726" />,
  error: <XCircle size={16} color="#f44336" />,
  info: <Info size={16} color="#2196f3" />,
  default: null
};

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  // Core
  commands,
  open: controlledOpen,
  onClose,
  onOpen,
  
  // Appearance
  placeholder = 'Type a command or search...',
  emptyText = 'No commands found',
  loadingText = 'Loading commands...',
  maxHeight = 500,
  maxWidth = 800,
  position = 'top',
  variant = 'default',
  
  // Features
  enableSearch = true,
  enableCategories = true,
  enableShortcuts = true,
  enableHistory = true,
  enableFavorites = true,
  enableRecent = true,
  enableSuggestions = true,
  enableVoice = false,
  enableAI = false,
  
  // Display options
  showCategories = true,
  showShortcuts = true,
  showIcons = true,
  showBadges = true,
  showStatus = true,
  showProgress = false,
  showPreview = false,
  
  // Customization
  categories = defaultCategories,
  recentCommands = [],
  favoriteCommands = [],
  theme = 'auto',
  animation = 'fade',
  animationDuration = 200,
  
  // Callbacks
  onCommandExecute,
  onCommandSelect,
  onSearchChange,
  onCategoryChange,
  
  // Accessibility
  ariaLabel = 'Command palette',
  ariaDescription = 'Search and execute commands'
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDark = theme.palette.mode === 'dark' || theme.palette.mode === 'auto';
  
  const [state, setState] = useState<CommandState>({
    query: '',
    selectedIndex: 0,
    selectedCategory: 'all',
    isLoading: false,
    isVoiceActive: false,
    isAIThinking: false,
    history: [],
    favorites: favoriteCommands,
    recent: recentCommands.slice(0, 5),
    suggestions: []
  });

  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const voiceRef = useRef<SpeechRecognition | null>(null);

  // Filter and categorize commands
  const filteredCommands = useMemo(() => {
    let filtered = commands;

    // Category filter
    if (state.selectedCategory !== 'all') {
      filtered = filtered.filter(cmd => cmd.category === state.selectedCategory);
    }

    // Search filter
    if (state.query) {
      const query = state.query.toLowerCase();
      filtered = filtered.filter(cmd => 
        cmd.label.toLowerCase().includes(query) ||
        cmd.description?.toLowerCase().includes(query) ||
        cmd.keywords?.some(keyword => keyword.toLowerCase().includes(query)) ||
        cmd.category.toLowerCase().includes(query)
      );
    }

    // Sort by priority and label
    return filtered.sort((a, b) => {
      const priorityDiff = (b.priority || 0) - (a.priority || 0);
      if (priorityDiff !== 0) return priorityDiff;
      return a.label.localeCompare(b.label);
    });
  }, [commands, state.query, state.selectedCategory]);

  // Group commands by category
  const groupedCommands = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    
    filteredCommands.forEach(cmd => {
      if (!groups[cmd.category]) {
        groups[cmd.category] = [];
      }
      groups[cmd.category].push(cmd);
    });
    
    return groups;
  }, [filteredCommands]);

  // Get recent commands
  const recentCommandsList = useMemo(() => {
    return commands.filter(cmd => state.recent.includes(cmd.id));
  }, [commands, state.recent]);

  // Get favorite commands
  const favoriteCommandsList = useMemo(() => {
    return commands.filter(cmd => state.favorites.includes(cmd.id));
  }, [commands, state.favorites]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setState(prev => ({
            ...prev,
            selectedIndex: Math.min(prev.selectedIndex + 1, filteredCommands.length - 1)
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
          if (filteredCommands[state.selectedIndex]) {
            executeCommand(filteredCommands[state.selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          handleClose();
          break;
        case 'Tab':
          e.preventDefault();
          // Move between categories
          const currentIndex = categories.indexOf(state.selectedCategory);
          const nextIndex = e.shiftKey 
            ? (currentIndex - 1 + categories.length) % categories.length
            : (currentIndex + 1) % categories.length;
          setState(prev => ({ ...prev, selectedCategory: categories[nextIndex] }));
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, state.selectedIndex, state.selectedCategory]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current && state.selectedIndex >= 0) {
      const selectedElement = listRef.current.children[state.selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [state.selectedIndex]);

  // Handle open/close
  const handleOpen = useCallback(() => {
    if (!isControlled) setInternalOpen(true);
    onOpen?.();
  }, [isControlled, onOpen]);

  const handleClose = useCallback(() => {
    if (!isControlled) setInternalOpen(false);
    setState(prev => ({ ...prev, query: '', selectedIndex: 0 }));
    onClose?.();
  }, [isControlled, onClose]);

  // Execute command
  const executeCommand = useCallback(async (command: CommandItem) => {
    if (command.disabled) return;

    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      await command.action();
      
      // Update history and recent
      setState(prev => ({
        ...prev,
        history: [command.id, ...prev.history.filter(id => id !== command.id)].slice(0, 20),
        recent: [command.id, ...prev.recent.filter(id => id !== command.id)].slice(0, 5)
      }));

      onCommandExecute?.(command);
      handleClose();
    } catch (error) {
      console.error('Command execution failed:', error);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [onCommandExecute, handleClose]);

  // Toggle favorite
  const toggleFavorite = useCallback((commandId: string) => {
    setState(prev => ({
      ...prev,
      favorites: prev.favorites.includes(commandId)
        ? prev.favorites.filter(id => id !== commandId)
        : [...prev.favorites, commandId]
    }));
  }, []);

  // Handle search change
  const handleSearchChange = useCallback((value: string) => {
    setState(prev => ({ ...prev, query: value, selectedIndex: 0 }));
    onSearchChange?.(value);
  }, [onSearchChange]);

  // Handle category change
  const handleCategoryChange = useCallback((category: string) => {
    setState(prev => ({ ...prev, selectedCategory: category, selectedIndex: 0 }));
    onCategoryChange?.(category);
  }, [onCategoryChange]);

  // Render command item
  const renderCommandItem = (command: CommandItem, index: number, isSelected: boolean) => {
    const isFavorite = state.favorites.includes(command.id);
    
    return (
      <ListItem
        key={command.id}
        disablePadding
        sx={{
          mb: 0.5,
          opacity: command.disabled ? 0.5 : 1
        }}
      >
        <ListItemButton
          selected={isSelected}
          onClick={() => !command.disabled && executeCommand(command)}
          onMouseEnter={() => setState(prev => ({ ...prev, selectedIndex: index }))}
          disabled={command.disabled || state.isLoading}
          sx={{
            borderRadius: 2,
            py: 1.5,
            px: 2,
            transition: 'all 0.2s ease',
            background: isSelected
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'transparent',
            color: isSelected ? 'white' : 'inherit',
            '&:hover': {
              background: isSelected
                ? 'linear-gradient(135deg, #5568d3 0%, #6b4190 100%)'
                : alpha('#667eea', 0.08)
            }
          }}
        >
          {showIcons && command.icon && (
            <ListItemIcon sx={{ color: isSelected ? 'white' : 'inherit', minWidth: 40 }}>
              {command.icon}
            </ListItemIcon>
          )}

          <ListItemText
            primary={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    fontSize: variant === 'compact' ? '0.8rem' : '0.9rem'
                  }}
                >
                  {command.label}
                </Typography>
                
                {showBadges && command.badge && (
                  <Chip
                    label={command.badge}
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      background: isSelected ? 'rgba(255,255,255,0.2)' : alpha('#667eea', 0.1),
                      color: isSelected ? 'white' : '#667eea'
                    }}
                  />
                )}
                
                {showStatus && command.status && command.status !== 'default' && (
                  <Box sx={{ ml: 'auto' }}>
                    {statusIcons[command.status]}
                  </Box>
                )}
              </Box>
            }
            secondary={
              command.description && (
                <Typography
                  variant="caption"
                  sx={{
                    color: isSelected ? 'rgba(255,255,255,0.8)' : 'text.secondary',
                    fontSize: variant === 'compact' ? '0.7rem' : '0.8rem'
                  }}
                >
                  {command.description}
                </Typography>
              )
            }
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {enableFavorites && (
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(command.id);
                }}
                sx={{
                  color: isSelected ? 'white' : '#bdbdbd',
                  '&:hover': { color: '#f44336' }
                }}
              >
                <Heart size={16} fill={isFavorite ? '#f44336' : 'none'} />
              </IconButton>
            )}
            
            {showShortcuts && command.shortcut && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 0.5,
                  ml: 1
                }}
              >
                {command.shortcut.map((key, i) => (
                  <Paper
                    key={i}
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
                      {key}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            )}
          </Box>
        </ListItemButton>
      </ListItem>
    );
  };

  // Render category section
  const renderCategorySection = (category: string, commands: CommandItem[]) => {
    if (commands.length === 0) return null;

    const startIndex = filteredCommands.findIndex(cmd => cmd.category === category);
    
    return (
      <Box key={category} sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, px: 2 }}>
          {showCategories && categoryIcons[category]}
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: 0.5
            }}
          >
            {category}
          </Typography>
          <Box sx={{ flexGrow: 1, height: 1, background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }} />
          <Chip
            label={commands.length}
            size="small"
            sx={{
              height: 20,
              fontSize: '0.7rem',
              fontWeight: 600,
              background: alpha('#667eea', 0.1),
              color: '#667eea'
            }}
          />
        </Box>
        
        <List sx={{ py: 0 }}>
          {commands.map((command, index) => 
            renderCommandItem(command, startIndex + index, startIndex + index === state.selectedIndex)
          )}
        </List>
      </Box>
    );
  };

  // Render empty state
  const renderEmptyState = () => {
    if (state.isLoading) {
      return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <CircularProgress size={48} sx={{ mb: 3, color: '#667eea' }} />
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
            {loadingText}
          </Typography>
        </Box>
      );
    }

    if (filteredCommands.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <SearchX size={48} color="#bdbdbd" style={{ marginBottom: 16 }} />
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
            {emptyText}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search terms or browse different categories
          </Typography>
        </Box>
      );
    }

    return null;
  };

  // Render suggestions
  const renderSuggestions = () => {
    if (!enableSuggestions || state.query) return null;

    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', ml: 2, mb: 1, display: 'block' }}>
          Suggestions
        </Typography>
        <Stack direction="row" spacing={1} sx={{ px: 2, flexWrap: 'wrap', gap: 1 }}>
          {['New Document', 'Share File', 'View Analytics', 'Settings'].map((suggestion) => (
            <Chip
              key={suggestion}
              label={suggestion}
              size="small"
              onClick={() => handleSearchChange(suggestion)}
              sx={{
                fontWeight: 600,
                background: alpha('#667eea', 0.1),
                color: '#667eea',
                '&:hover': { background: alpha('#667eea', 0.2) }
              }}
            />
          ))}
        </Stack>
      </Box>
    );
  };

  // Render recent and favorites
  const renderRecentAndFavorites = () => {
    if (state.query) return null;

    return (
      <Box sx={{ mb: 3 }}>
        {enableRecent && recentCommandsList.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', ml: 2, mb: 1, display: 'block' }}>
              Recent
            </Typography>
            <List sx={{ py: 0 }}>
              {recentCommandsList.slice(0, 3).map((command, index) => 
                renderCommandItem(command, index, false)
              )}
            </List>
          </Box>
        )}
        
        {enableFavorites && favoriteCommandsList.length > 0 && (
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', ml: 2, mb: 1, display: 'block' }}>
              Favorites
            </Typography>
            <List sx={{ py: 0 }}>
              {favoriteCommandsList.slice(0, 3).map((command, index) => 
                renderCommandItem(command, index, false)
              )}
            </List>
          </Box>
        )}
      </Box>
    );
  };

  // Main dialog content
  const renderContent = () => {
    const AnimationWrapper = animation === 'none' ? React.Fragment : 
                           animation === 'zoom' ? Zoom : 
                           animation === 'slide' ? Slide : Fade;

    return (
      <AnimationWrapper
        in={isOpen}
        timeout={animationDuration}
        direction={position === 'top' ? 'down' : position === 'bottom' ? 'up' : undefined}
      >
        <Dialog
          open={isOpen}
          onClose={handleClose}
          maxWidth="lg"
          fullWidth
          fullScreen={isMobile}
          PaperProps={{
            sx: {
              maxWidth: maxWidth,
              maxHeight: maxHeight,
              borderRadius: isMobile ? 0 : 3,
              background: isDark ? '#1a1a1a' : 'white',
              backgroundImage: 'none',
              overflow: 'hidden'
            }
          }}
        >
          <DialogTitle sx={{ p: 2, pb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 1,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white'
                }}
              >
                <Command size={20} />
              </Paper>
              
              <Box sx={{ flexGrow: 1 }}>
                <TextField
                  fullWidth
                  inputRef={inputRef}
                  placeholder={placeholder}
                  value={state.query}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  variant="outlined"
                  size="small"
                  disabled={state.isLoading}
                  InputProps={{
                    startAdornment: <Search size={18} style={{ marginRight: 8, color: '#666' }} />,
                    endAdornments: (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {enableVoice && (
                          <IconButton
                            size="small"
                            onClick={() => setState(prev => ({ ...prev, isVoiceActive: !prev.isVoiceActive }))}
                            sx={{
                              color: state.isVoiceActive ? '#f44336' : '#666',
                              background: state.isVoiceActive ? alpha('#f44336', 0.1) : 'transparent'
                            }}
                          >
                            <Mic size={16} />
                          </IconButton>
                        )}
                        <IconButton size="small" onClick={handleClose}>
                          <Escape size={16} />
                        </IconButton>
                      </Box>
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
            </Box>
          </DialogTitle>
          
          <DialogContent sx={{ p: 0, overflow: 'hidden' }}>
            {/* Categories */}
            {enableCategories && showCategories && (
              <Box sx={{ p: 2, pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Stack direction="row" spacing={1} sx={{ overflowX: 'auto' }}>
                  <Chip
                    label="All Categories"
                    size="small"
                    onClick={() => handleCategoryChange('all')}
                    sx={{
                      fontWeight: 600,
                      background: state.selectedCategory === 'all'
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : alpha('#667eea', 0.1),
                      color: state.selectedCategory === 'all' ? 'white' : '#667eea'
                    }}
                  />
                  {categories.map((category) => (
                    <Chip
                      key={category}
                      label={category}
                      size="small"
                      icon={categoryIcons[category]}
                      onClick={() => handleCategoryChange(category)}
                      sx={{
                        fontWeight: 600,
                        background: state.selectedCategory === category
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          : alpha('#667eea', 0.1),
                        color: state.selectedCategory === category ? 'white' : '#667eea'
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            )}

            {/* Content area */}
            <Box sx={{ maxHeight: maxHeight - 200, overflowY: 'auto', p: 2 }}>
              {renderSuggestions()}
              {renderRecentAndFavorites()}
              {renderEmptyState()}
              
              {/* Commands by category */}
              {Object.entries(groupedCommands).map(([category, commands]) =>
                renderCategorySection(category, commands)
              )}
            </Box>
          </DialogContent>
          
          {/* Footer */}
          <DialogActions sx={{ p: 2, pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Typography variant="caption" color="text.secondary">
                Navigate with ↑↓ • Execute with Enter • Close with Esc
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  label={`${filteredCommands.length} commands`}
                  size="small"
                  sx={{
                    fontSize: '0.7rem',
                    background: alpha('#667eea', 0.1),
                    color: '#667eea'
                  }}
                />
                {state.isAIThinking && (
                  <Chip
                    label="AI Thinking..."
                    size="small"
                    sx={{
                      fontSize: '0.7rem',
                      background: alpha('#f093fb', 0.1),
                      color: '#f093fb'
                    }}
                    icon={<Zap size={12} />}
                  />
                )}
              </Box>
            </Box>
          </DialogActions>
        </Dialog>
      </AnimationWrapper>
    );
  };

  return renderContent();
};

// Pre-built command palettes for common use cases
export const FileCommandPalette: React.FC<{ onAction: (action: string) => void }> = ({ onAction }) => {
  const fileCommands: CommandItem[] = [
    {
      id: 'new-file',
      label: 'New File',
      category: 'Files',
      icon: <FileText size={18} />,
      shortcut: ['Ctrl', 'N'],
      description: 'Create a new document',
      action: () => onAction('new-file')
    },
    {
      id: 'open-file',
      label: 'Open File',
      category: 'Files',
      icon: <Folder size={18} />,
      shortcut: ['Ctrl', 'O'],
      description: 'Open an existing document',
      action: () => onAction('open-file')
    },
    {
      id: 'save-file',
      label: 'Save File',
      category: 'Files',
      icon: <Save size={18} />,
      shortcut: ['Ctrl', 'S'],
      description: 'Save the current document',
      action: () => onAction('save-file')
    },
    {
      id: 'save-as',
      label: 'Save As...',
      category: 'Files',
      icon: <Save size={18} />,
      shortcut: ['Ctrl', 'Shift', 'S'],
      description: 'Save with a new name',
      action: () => onAction('save-as')
    },
    {
      id: 'export-pdf',
      label: 'Export as PDF',
      category: 'Files',
      icon: <FileText size={18} />,
      description: 'Export document to PDF format',
      action: () => onAction('export-pdf')
    },
    {
      id: 'share-file',
      label: 'Share File',
      category: 'Files',
      icon: <Share2 size={18} />,
      shortcut: ['Ctrl', 'Shift', 'S'],
      description: 'Share document with others',
      action: () => onAction('share-file')
    }
  ];

  return (
    <CommandPalette
      commands={fileCommands}
      placeholder="Search file operations..."
      showShortcuts
      enableCategories
      enableRecent
      variant="compact"
      onCommandExecute={(cmd) => console.log('File command executed:', cmd.label)}
    />
  );
};

export const EditCommandPalette: React.FC<{ onAction: (action: string) => void }> = ({ onAction }) => {
  const editCommands: CommandItem[] = [
    {
      id: 'undo',
      label: 'Undo',
      category: 'Edit',
      icon: <RotateCcw size={18} />,
      shortcut: ['Ctrl', 'Z'],
      description: 'Undo the last action',
      action: () => onAction('undo')
    },
    {
      id: 'redo',
      label: 'Redo',
      category: 'Edit',
      icon: <RefreshCw size={18} />,
      shortcut: ['Ctrl', 'Y'],
      description: 'Redo the last undone action',
      action: () => onAction('redo')
    },
    {
      id: 'cut',
      label: 'Cut',
      category: 'Edit',
      icon: <Scissors size={18} />,
      shortcut: ['Ctrl', 'X'],
      description: 'Cut selected content',
      action: () => onAction('cut')
    },
    {
      id: 'copy',
      label: 'Copy',
      category: 'Edit',
      icon: <Copy size={18} />,
      shortcut: ['Ctrl', 'C'],
      description: 'Copy selected content',
      action: () => onAction('copy')
    },
    {
      id: 'paste',
      label: 'Paste',
      category: 'Edit',
      icon: <Clipboard size={18} />,
      shortcut: ['Ctrl', 'V'],
      description: 'Paste copied content',
      action: () => onAction('paste')
    },
    {
      id: 'find',
      label: 'Find',
      category: 'Edit',
      icon: <Search size={18} />,
      shortcut: ['Ctrl', 'F'],
      description: 'Find text in document',
      action: () => onAction('find')
    },
    {
      id: 'replace',
      label: 'Replace',
      category: 'Edit',
      icon: <Edit3 size={18} />,
      shortcut: ['Ctrl', 'H'],
      description: 'Find and replace text',
      action: () => onAction('replace')
    }
  ];

  return (
    <CommandPalette
      commands={editCommands}
      placeholder="Search edit operations..."
      showShortcuts
      enableCategories
      enableRecent
      variant="compact"
      onCommandExecute={(cmd) => console.log('Edit command executed:', cmd.label)}
    />
  );
};

export const ViewCommandPalette: React.FC<{ onAction: (action: string) => void }> = ({ onAction }) => {
  const viewCommands: CommandItem[] = [
    {
      id: 'zoom-in',
      label: 'Zoom In',
      category: 'View',
      icon: <ZoomIn size={18} />,
      shortcut: ['Ctrl', '+'],
      description: 'Increase zoom level',
      action: () => onAction('zoom-in')
    },
    {
      id: 'zoom-out',
      label: 'Zoom Out',
      category: 'View',
      icon: <ZoomOut size={18} />,
      shortcut: ['Ctrl', '-'],
      description: 'Decrease zoom level',
      action: () => onAction('zoom-out')
    },
    {
      id: 'reset-zoom',
      label: 'Reset Zoom',
      category: 'View',
      icon: <Maximize2 size={18} />,
      shortcut: ['Ctrl', '0'],
      description: 'Reset zoom to 100%',
      action: () => onAction('reset-zoom')
    },
    {
      id: 'fullscreen',
      label: 'Toggle Fullscreen',
      category: 'View',
      icon: <Maximize size={18} />,
      shortcut: ['F11'],
      description: 'Toggle fullscreen mode',
      action: () => onAction('fullscreen')
    },
    {
      id: 'preview',
      label: 'Preview Mode',
      category: 'View',
      icon: <Eye size={18} />,
      shortcut: ['Ctrl', 'P'],
      description: 'Toggle preview mode',
      action: () => onAction('preview')
    }
  ];

  return (
    <CommandPalette
      commands={viewCommands}
      placeholder="Search view options..."
      showShortcuts
      enableCategories
      enableRecent
      variant="compact"
      onCommandExecute={(cmd) => console.log('View command executed:', cmd.label)}
    />
  );
};

// Usage examples:
export const UsageExamples = () => {
  const [openFile, setOpenFile] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);

  const handleCommandAction = (action: string) => {
    console.log('Command action:', action);
    // Implement actual command logic here
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 800, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Command Palette Examples
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <Button
          variant="contained"
          startIcon={<FileText size={18} />}
          onClick={() => setOpenFile(true)}
          sx={{ borderRadius: 2, fontWeight: 600 }}
        >
          File Commands
        </Button>
        
        <Button
          variant="contained"
          startIcon={<Edit3 size={18} />}
          onClick={() => setOpenEdit(true)}
          sx={{ borderRadius: 2, fontWeight: 600 }}
        >
          Edit Commands
        </Button>
        
        <Button
          variant="contained"
          startIcon={<Eye size={18} />}
          onClick={() => setOpenView(true)}
          sx={{ borderRadius: 2, fontWeight: 600 }}
        >
          View Commands
        </Button>
      </Stack>

      <FileCommandPalette onAction={handleCommandAction} />
      {openFile && <FileCommandPalette onAction={handleCommandAction} />}
      {openEdit && <EditCommandPalette onAction={handleCommandAction} />}
      {openView && <ViewCommandPalette onAction={handleCommandAction} />}
    </Box>
  );
};

export default CommandPalette;
