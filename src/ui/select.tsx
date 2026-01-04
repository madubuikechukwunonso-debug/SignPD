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
  TextField,
  InputBase,
  InputAdornment,
  FormControl,
  FormLabel,
  FormHelperText,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  Checkbox,
  Radio,
  Switch,
  Collapse,
  Popover,
  ClickAwayListener,
  Autocomplete
} from '@mui/material';
import {
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Check,
  X,
  Plus,
  Minus,
  Edit,
  Trash2,
  Copy,
  Download,
  Upload,
  RefreshCw,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Expand,
  Compress,
  Eye,
  EyeOff,
  Settings,
  SlidersHorizontal,
  ListIcon,
  Grid,
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
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  CreditCard,
  Mail,
  Phone,
  Globe,
  Home,
  Building,
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
  Verified,
  CheckCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  Search2,
  Filter2,
  SortAsc2,
  SortDesc2,
  Check2,
  X2,
  Plus2,
  Minus2,
  Edit2,
  Trash3,
  Copy2,
  Download2,
  Upload2,
  RefreshCw2,
  RefreshCw3,
  RotateCw2,
  RotateCw3,
  ZoomIn2,
  ZoomOut2,
  Maximize2,
  Minimize2,
  Expand2,
  Compress2,
  Eye2,
  EyeOff2,
  Settings2,
  SlidersHorizontal2,
  List2,
  Grid2,
  Grid3x32,
  Calendar2,
  Clock2,
  MapPin2,
  Users2,
  User2,
  UserPlus2,
  UserMinus2,
  UserCheck2,
  UserX2,
  Shield2,
  ShieldCheck2,
  ShieldAlert2,
  Lock2,
  Unlock2,
  Key2,
  Fingerprint2,
  CreditCard2,
  Mail2,
  Phone2,
  Globe2,
  Home2,
  Building2,
  Briefcase2,
  Target2,
  Flag2,
  Bookmark2,
  Heart2,
  Star2,
  Award2,
  Trophy2,
  Medal2,
  Certificate2,
  Verified2,
  CheckCircle2,
  AlertTriangle2,
  Info2,
  HelpCircle2,
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
  MoreVertical,
  MoreHorizontal,
  ExternalLink,
  Share2,
  Save,
  Folder,
  FolderOpen,
  File,
  FileText,
  FilePlus,
  FileMinus,
  FileEdit,
  FileSearch,
  Archive,
  BookOpen,
  Book,
  Library,
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
  Antivirus,
  Password,
  Login,
  Logout,
  Register,
  SignIn,
  SignOut,
  Profile,
  Account,
  Settings3,
  Preferences,
  Options,
  Configuration,
  Customize,
  Personalize,
  Theme,
  DarkMode,
  LightMode,
  AutoMode,
  Language,
  Translate,
  Globe2,
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
  Study,
  Learn,
  Teach,
  Train,
  Practice,
  Exercise,
  Workout,
  Yoga,
  Meditate,
  Relax,
  Sleep,
  Wake,
  Eat,
  Drink,
  Cook,
  Bake,
  Grill,
  Boil,
  Fry,
  Steam,
  Wash,
  Clean,
  Vacuum,
  Mop,
  Sweep,
  Dust,
  Organize,
  Declutter,
  Store,
  Save2,
  Backup,
  Restore,
  Sync,
  Share3,
  Export,
  Import,
  Download3,
  Upload3,
  Transfer,
  Move,
  Copy3,
  Paste2,
  Cut2,
  Delete3,
  Remove,
  Clear,
  Reset2,
  Undo2,
  Redo2,
  Refresh3,
  Reload,
  Update,
  Upgrade,
  Install,
  Uninstall,
  Setup,
  Configure2,
  Customize2,
  Personalize2,
  Theme2,
  Style,
  Design,
  Layout,
  Grid3,
  Flex,
  Align,
  Justify,
  Center,
  Left,
  Right,
  Up,
  Down,
  Top,
  Bottom,
  Middle,
  Edge,
  Corner,
  Side,
  Front,
  Back,
  Inside,
  Outside,
  Around,
  Between,
  Across,
  Through,
  Over,
  Under,
  Above,
  Below,
  Near,
  Far,
  Close,
  Open,
  Locked,
  Unlocked,
  Secure,
  Safe,
  Protected,
  Private,
  Public,
  Shared,
  Collaborative,
  Team,
  Group,
  Community,
  Network,
  Connection,
  Link,
  Chain,
  Network2,
  Web,
  Internet,
  Online,
  Offline,
  Cloud2,
  Server2,
  Database2,
  Storage,
  Memory,
  CPU,
  GPU,
  RAM,
  ROM,
  SSD,
  HDD,
  USB2,
  HDMI2,
  Display2,
  Monitor2,
  Smartphone2,
  Tablet2,
  Laptop2,
  Desktop2,
  Print2,
  Scanner2,
  Camera2,
  Video2,
  Image2,
  Music2,
  Play2,
  Pause2,
  Stop2,
  SkipForward2,
  SkipBack2,
  Rewind2,
  FastForward2,
  Volume22,
  VolumeX2,
  Mic2,
  MicOff2,
  Radio2,
  Tv2,
  Cast2,
  Airplay2,
  Chromecast2
} from 'lucide-react';

export type SelectVariant = 'default' | 'outlined' | 'filled' | 'standard' | 'enterprise' | 'glass' | 'minimal';
export type SelectSize = 'small' | 'medium' | 'large';
export type SelectColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gradient';
export type SelectShape = 'rounded' | 'square' | 'pill';
export type SelectPlacement = 'bottom' | 'top' | 'left' | 'right' | 'auto';
export type SelectMode = 'single' | 'multiple' | 'tags' | 'chips' | 'pills';

export interface SelectOption {
  value: string | number;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  image?: string;
  disabled?: boolean;
  group?: string;
  tags?: string[];
  metadata?: Record<string, any>;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  selectedColor?: string;
  selectedBackgroundColor?: string;
  selectedBorderColor?: string;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
  icon?: React.ReactNode;
  color?: string;
  disabled?: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export interface SelectFilter {
  label: string;
  value: string;
  icon?: React.ReactNode;
  color?: string;
  active?: boolean;
  count?: number;
}

export interface SelectAction {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  color?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  divider?: boolean;
}

export interface SelectProps {
  // Core props
  value?: string | number | (string | number)[] | null;
  defaultValue?: string | number | (string | number)[] | null;
  options: SelectOption[] | SelectGroup[];
  onChange?: (value: string | number | (string | number)[] | null, option?: SelectOption | SelectOption[]) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: SelectFilter[]) => void;
  onClear?: () => void;
  
  // Selection behavior
  multiple?: boolean;
  mode?: SelectMode;
  clearable?: boolean;
  searchable?: boolean;
  creatable?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  
  // Component styling
  variant?: SelectVariant;
  size?: SelectSize;
  color?: SelectColor;
  shape?: SelectShape;
  placement?: SelectPlacement;
  
  // Dimensions
  width?: number | string;
  maxWidth?: number | string;
  minWidth?: number | string;
  height?: number | string;
  maxHeight?: number | string;
  minHeight?: number | string;
  dropdownHeight?: number | string;
  dropdownMaxHeight?: number | string;
  
  // Visual styling
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  padding?: number | string;
  margin?: number | string;
  fontSize?: number | string;
  fontWeight?: number | string;
  textColor?: string;
  placeholderColor?: string;
  
  // Advanced features
  loading?: boolean;
  loadingText?: string;
  emptyText?: string;
  error?: boolean;
  errorText?: string;
  helperText?: string;
  label?: string;
  placeholder?: string;
  
  // Icons and adornments
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  dropdownIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  searchIcon?: React.ReactNode;
  loadingIcon?: React.ReactNode;
  emptyIcon?: React.ReactNode;
  errorIcon?: React.ReactNode;
  
  // Grouping and organization
  grouped?: boolean;
  groupCollapsible?: boolean;
  showGroupCount?: boolean;
  sortable?: boolean;
  sortBy?: 'label' | 'value' | 'count' | 'custom';
  sortDirection?: 'asc' | 'desc';
  
  // Filtering and search
  filterable?: boolean;
  filters?: SelectFilter[];
  filterPlaceholder?: string;
  filterMultiple?: boolean;
  filterCaseSensitive?: boolean;
  filterFuzzy?: boolean;
  filterHighlight?: boolean;
  
  // Selection visualization
  showCheckmarks?: boolean;
  showSelectionCount?: boolean;
  maxSelectionCount?: number;
  selectionCountText?: string;
  showSelectionPreview?: boolean;
  selectionPreviewLimit?: number;
  
  // Dropdown behavior
  dropdownWidth?: number | string;
  dropdownMatchWidth?: boolean;
  dropdownPlacement?: SelectPlacement;
  dropdownOffset?: number;
  dropdownAnimation?: boolean;
  dropdownShadow?: boolean;
  dropdownBorder?: boolean;
  dropdownBackground?: string;
  
  // Virtualization
  virtualized?: boolean;
  itemHeight?: number;
  bufferSize?: number;
  
  // Keyboard navigation
  keyboardNavigation?: boolean;
  keyboardShortcut?: string;
  tabIndex?: number;
  
  // Touch and mobile
  touchEnabled?: boolean;
  swipeEnabled?: boolean;
  momentum?: boolean;
  bounce?: boolean;
  
  // Enterprise features
  enterprise?: boolean;
  showQuickActions?: boolean;
  quickActions?: SelectAction[];
  showStatistics?: boolean;
  statistics?: {
    totalCount?: number;
    selectedCount?: number;
    filteredCount?: number;
    searchCount?: number;
  };
  showPerformanceMetrics?: boolean;
  performanceMetrics?: {
    renderTime?: number;
    searchTime?: number;
    filterTime?: number;
    selectionTime?: number;
  };
  
  // Custom rendering
  renderOption?: (option: SelectOption, isSelected: boolean, isHighlighted: boolean) => React.ReactNode;
  renderGroup?: (group: SelectGroup, isExpanded: boolean) => React.ReactNode;
  renderValue?: (value: string | number | (string | number)[] | null, options: SelectOption[]) => React.ReactNode;
  renderPlaceholder?: () => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  renderLoading?: () => React.ReactNode;
  renderError?: () => React.ReactNode;
  renderDropdown?: (children: React.ReactNode) => React.ReactNode;
  renderDropdownHeader?: () => React.ReactNode;
  renderDropdownFooter?: () => React.ReactNode;
  
  // Accessibility
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  ariaLive?: 'off' | 'polite' | 'assertive';
  ariaAtomic?: boolean;
  ariaRelevant?: string;
  
  // Special modes
  fullscreen?: boolean;
  floating?: boolean;
  embedded?: boolean;
  modal?: boolean;
  drawer?: boolean;
  
  // Styling overrides
  containerSx?: any;
  triggerSx?: any;
  dropdownSx?: any;
  optionSx?: any;
  groupSx?: any;
  actionSx?: any;
  
  // Event handlers
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onKeyUp?: (event: React.KeyboardEvent) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onClick?: (event: React.MouseEvent) => void;
  onDoubleClick?: (event: React.MouseEvent) => void;
  onContextMenu?: (event: React.MouseEvent) => void;
  
  // Advanced callbacks
  onOptionHover?: (option: SelectOption, index: number) => void;
  onOptionSelect?: (option: SelectOption, isSelected: boolean) => void;
  onGroupToggle?: (group: SelectGroup, isExpanded: boolean) => void;
  onCreateOption?: (inputValue: string) => void;
  onRemoveOption?: (option: SelectOption) => void;
  onReorderOptions?: (options: SelectOption[]) => void;
}

interface SelectState {
  isOpen: boolean;
  isFocused: boolean;
  isHovered: boolean;
  isDisabled: boolean;
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  searchQuery: string;
  activeIndex: number;
  selectedOptions: SelectOption[];
  filteredOptions: SelectOption[] | SelectGroup[];
  expandedGroups: string[];
  appliedFilters: SelectFilter[];
  isAllSelected: boolean;
  isIndeterminate: boolean;
  statistics: {
    total: number;
    selected: number;
    filtered: number;
    visible: number;
  };
}

interface VirtualizationState {
  startIndex: number;
  endIndex: number;
  scrollTop: number;
  itemHeight: number;
  containerHeight: number;
}

// Enterprise color schemes
const getEnterpriseColors = (color: SelectColor) => {
  const colors = {
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
    gradient: {
      main: '#667eea',
      light: '#764ba2',
      dark: '#5a67d8',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      background: 'rgba(102, 126, 234, 0.1)',
      hover: 'rgba(102, 126, 234, 0.2)',
      selected: 'rgba(102, 126, 234, 0.3)'
    }
  };
  return colors[color] || colors.primary;
};

// Utility functions
const flattenOptions = (options: SelectOption[] | SelectGroup[]): SelectOption[] => {
  if (!Array.isArray(options)) return [];
  
  const firstItem = options[0];
  if (!firstItem) return [];
  
  // Check if it's grouped options
  if ('options' in firstItem && Array.isArray(firstItem.options)) {
    return options.flatMap(group => (group as SelectGroup).options);
  }
  
  return options as SelectOption[];
};

const getSelectedOptions = (value: string | number | (string | number)[] | null, options: SelectOption[]): SelectOption[] => {
  const flatOptions = flattenOptions(options);
  
  if (value === null || value === undefined) return [];
  if (Array.isArray(value)) {
    return flatOptions.filter(option => value.includes(option.value));
  }
  return flatOptions.filter(option => option.value === value);
};

const filterOptions = (options: SelectOption[], query: string, caseSensitive = false, fuzzy = false): SelectOption[] => {
  if (!query.trim()) return options;
  
  const searchQuery = caseSensitive ? query : query.toLowerCase();
  
  return options.filter(option => {
    const label = caseSensitive ? option.label : option.label.toLowerCase();
    const description = option.description ? (caseSensitive ? option.description : option.description.toLowerCase()) : '';
    const tags = option.tags ? option.tags.map(tag => caseSensitive ? tag : tag.toLowerCase()).join(' ') : '';
    
    if (fuzzy) {
      // Simple fuzzy matching - can be enhanced with more sophisticated algorithms
      const searchChars = searchQuery.split('');
      const labelChars = label.split('');
      let matchCount = 0;
      let lastIndex = -1;
      
      for (const char of searchChars) {
        const index = labelChars.indexOf(char, lastIndex + 1);
        if (index > lastIndex) {
          matchCount++;
          lastIndex = index;
        }
      }
      
      return matchCount === searchChars.length;
    } else {
      return label.includes(searchQuery) || 
             description.includes(searchQuery) || 
             tags.includes(searchQuery);
    }
  });
};

const sortOptions = (options: SelectOption[], sortBy: string, sortDirection: 'asc' | 'desc'): SelectOption[] => {
  return [...options].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'value':
        aValue = a.value;
        bValue = b.value;
        break;
      case 'count':
        aValue = a.metadata?.count || 0;
        bValue = b.metadata?.count || 0;
        break;
      case 'custom':
        aValue = a.metadata?.sortOrder || a.label;
        bValue = b.metadata?.sortOrder || b.label;
        break;
      default:
        aValue = a.label;
        bValue = b.label;
    }
    
    const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    return sortDirection === 'asc' ? comparison : -comparison;
  });
};

// Sub-components
interface SelectTriggerProps {
  value: string | number | (string | number)[] | null;
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  errorText?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  loading?: boolean;
  multiple?: boolean;
  showSelectionCount?: boolean;
  maxSelectionCount?: number;
  selectionCountText?: string;
  showSelectionPreview?: boolean;
  selectionPreviewLimit?: number;
  clearable?: boolean;
  searchable?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  dropdownIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  searchIcon?: React.ReactNode;
  loadingIcon?: React.ReactNode;
  errorIcon?: React.ReactNode;
  variant?: SelectVariant;
  size?: SelectSize;
  color?: SelectColor;
  shape?: SelectShape;
  width?: number | string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  fontSize?: number | string;
  fontWeight?: number | string;
  textColor?: string;
  placeholderColor?: string;
  isOpen?: boolean;
  isFocused?: boolean;
  isHovered?: boolean;
  selectedOptions?: SelectOption[];
  searchQuery?: string;
  onClear?: () => void;
  onSearch?: (query: string) => void;
  onClick?: () => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  renderValue?: (value: string | number | (string | number)[] | null, options: SelectOption[]) => React.ReactNode;
  renderPlaceholder?: () => React.ReactNode;
  enterprise?: boolean;
  tabIndex?: number;
  triggerSx?: any;
}

const SelectTrigger: React.FC<SelectTriggerProps> = ({
  value,
  placeholder = 'Select an option',
  label,
  helperText,
  error = false,
  errorText,
  disabled = false,
  readonly = false,
  required = false,
  loading = false,
  multiple = false,
  showSelectionCount = false,
  maxSelectionCount,
  selectionCountText = '{count} selected',
  showSelectionPreview = true,
  selectionPreviewLimit = 3,
  clearable = true,
  searchable = false,
  prefix,
  suffix,
  dropdownIcon = <ChevronDown size={16} />,
  clearIcon = <X size={14} />,
  searchIcon = <Search size={14} />,
  loadingIcon = <RefreshCw size={14} className="animate-spin" />,
  errorIcon = <AlertTriangle size={14} />,
  variant = 'default',
  size = 'medium',
  color = 'primary',
  shape = 'rounded',
  width = '100%',
  backgroundColor = 'white',
  borderColor,
  borderRadius = 8,
  fontSize,
  fontWeight = 600,
  textColor,
  placeholderColor = '#6c757d',
  isOpen = false,
  isFocused = false,
  isHovered = false,
  selectedOptions = [],
  searchQuery = '',
  onClear,
  onSearch,
  onClick,
  onFocus,
  onBlur,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  renderValue,
  renderPlaceholder,
  enterprise = false,
  tabIndex = 0,
  triggerSx
}) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const colors = getEnterpriseColors(color);

  const getSizeStyles = () => {
    const sizes = {
      small: { height: 32, fontSize: '12px', padding: '6px 12px' },
      medium: { height: 44, fontSize: '14px', padding: '10px 16px' },
      large: { height: 56, fontSize: '16px', padding: '14px 20px' }
    };
    return sizes[size] || sizes.medium;
  };

  const getShapeStyles = () => {
    const shapes = {
      rounded: { borderRadius: 8 },
      square: { borderRadius: 0 },
      pill: { borderRadius: 24 }
    };
    return shapes[shape] || shapes.rounded;
  };

  const getVariantStyles = () => {
    const baseStyles = {
      width: '100%',
      minWidth: 200,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      fontWeight
    };

    const sizeStyles = getSizeStyles();
    const shapeStyles = getShapeStyles();

    const variants = {
      default: {
        backgroundColor: disabled ? alpha(backgroundColor, 0.5) : backgroundColor,
        border: `2px solid ${error ? '#f44336' : isFocused ? colors.main : borderColor || alpha(colors.main, 0.3)}`,
        color: textColor || (disabled ? '#6c757d' : '#1a1a1a'),
        ...shapeStyles,
        '&:hover:not(:disabled)': {
          borderColor: colors.main,
          backgroundColor: alpha(colors.background, 0.5)
        },
        '&:focus': {
          borderColor: colors.main,
          boxShadow: `0 0 0 3px ${alpha(colors.main, 0.2)}`
        }
      },
      outlined: {
        backgroundColor: 'transparent',
        border: `2px solid ${error ? '#f44336' : isFocused ? colors.main : borderColor || alpha(colors.main, 0.5)}`,
        color: textColor || colors.main,
        ...shapeStyles,
        '&:hover:not(:disabled)': {
          backgroundColor: alpha(colors.background, 0.1),
          borderColor: colors.dark
        },
        '&:focus': {
          backgroundColor: alpha(colors.background, 0.2),
          boxShadow: `0 0 0 3px ${alpha(colors.main, 0.2)}`
        }
      },
      filled: {
        backgroundColor: alpha(colors.background, isFocused ? 0.3 : 0.1),
        border: `2px solid transparent`,
        color: textColor || colors.main,
        ...shapeStyles,
        '&:hover:not(:disabled)': {
          backgroundColor: alpha(colors.background, 0.2)
        },
        '&:focus': {
          backgroundColor: alpha(colors.background, 0.3),
          boxShadow: `0 0 0 3px ${alpha(colors.main, 0.2)}`
        }
      },
      standard: {
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: `2px solid ${error ? '#f44336' : isFocused ? colors.main : borderColor || alpha(colors.main, 0.5)}`,
        color: textColor || colors.main,
        borderRadius: 0,
        '&:hover:not(:disabled)': {
          borderBottomColor: colors.dark
        },
        '&:focus': {
          borderBottomColor: colors.main,
          boxShadow: `0 2px 0 ${colors.main}`
        }
      },
      enterprise: {
        background: enterprise ? colors.gradient : backgroundColor,
        border: `2px solid ${error ? '#f44336' : isFocused ? 'white' : 'rgba(255, 255, 255, 0.3)'}`,
        color: enterprise ? 'white' : (textColor || '#1a1a1a'),
        boxShadow: enterprise ? '0 8px 32px rgba(0, 0, 0, 0.12)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
        backdropFilter: enterprise ? 'blur(10px)' : 'none',
        ...shapeStyles,
        '&:hover:not(:disabled)': {
          transform: 'translateY(-2px)',
          boxShadow: enterprise ? '0 12px 48px rgba(0, 0, 0, 0.2)' : '0 4px 16px rgba(0, 0, 0, 0.15)'
        },
        '&:focus': {
          boxShadow: enterprise ? '0 0 0 4px rgba(255, 255, 255, 0.3)' : `0 0 0 3px ${alpha(colors.main, 0.3)}`
        }
      },
      glass: {
        background: 'rgba(255, 255, 255, 0.1)',
        border: `2px solid rgba(255, 255, 255, 0.2)`,
        color: textColor || 'white',
        backdropFilter: 'blur(20px)',
        ...shapeStyles,
        '&:hover:not(:disabled)': {
          background: 'rgba(255, 255, 255, 0.2)',
          borderColor: 'rgba(255, 255, 255, 0.3)'
        },
        '&:focus': {
          background: 'rgba(255, 255, 255, 0.3)',
          boxShadow: '0 0 0 3px rgba(255, 255, 255, 0.3)'
        }
      },
      minimal: {
        backgroundColor: 'transparent',
        border: 'none',
        color: textColor || colors.main,
        borderRadius: 0,
        '&:hover:not(:disabled)': {
          backgroundColor: alpha(colors.background, 0.1)
        },
        '&:focus': {
          backgroundColor: alpha(colors.background, 0.2)
        }
      }
    };

    return {
      ...baseStyles,
      ...sizeStyles,
      ...variants[variant]
    };
  };

  const getDisplayValue = () => {
    if (renderValue && value !== null && value !== undefined) {
      return renderValue(value, selectedOptions);
    }

    if (selectedOptions.length === 0) {
      return renderPlaceholder ? renderPlaceholder() : (
        <span style={{ color: placeholderColor, fontWeight: 400 }}>
          {placeholder}
        </span>
      );
    }

    if (multiple && showSelectionCount) {
      const count = selectedOptions.length;
      return selectionCountText.replace('{count}', count.toString());
    }

    if (multiple && showSelectionPreview) {
      const preview = selectedOptions.slice(0, selectionPreviewLimit);
      const remaining = selectedOptions.length - preview.length;
      const previewText = preview.map(opt => opt.label).join(', ');
      return remaining > 0 ? `${previewText} +${remaining} more` : previewText;
    }

    return selectedOptions[0]?.label || String(value);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClear) onClear();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setLocalSearchQuery(query);
    if (onSearch) onSearch(query);
  };

  const styles = getVariantStyles();

  return (
    <Box sx={{ width, ...triggerSx }}>
      {label && (
        <FormLabel
          required={required}
          error={error}
          sx={{
            mb: 1,
            display: 'block',
            fontWeight: 600,
            fontSize: '14px',
            color: error ? '#f44336' : (enterprise ? (enterpriseColors.main) : '#1a1a1a')
          }}
        >
          {label}
        </FormLabel>
      )}
      
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          ...styles,
          ...(isHovered && !disabled && { transform: variant === 'enterprise' ? 'translateY(-1px)' : 'none' })
        }}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        tabIndex={tabIndex}
      >
        {prefix && (
          <InputAdornment position="start" sx={{ mr: 1 }}>
            {prefix}
          </InputAdornment>
        )}

        <Box sx={{ flex: 1, minWidth: 0 }}>
          {searchable && isOpen ? (
            <input
              type="text"
              value={localSearchQuery}
              onChange={handleSearchChange}
              placeholder={placeholder}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: styles.fontSize,
                fontWeight: styles.fontWeight,
                color: styles.color
              }}
              autoFocus
            />
          ) : (
            <Typography
              variant="body2"
              sx={{
                fontSize: styles.fontSize,
                fontWeight: styles.fontWeight,
                color: styles.color,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {getDisplayValue()}
            </Typography>
          )}
        </Box>

        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ ml: 1 }}>
          {loading && (
            <InputAdornment position="end">
              {loadingIcon}
            </InputAdornment>
          )}
          
          {error && (
            <InputAdornment position="end">
              {errorIcon}
            </InputAdornment>
          )}
          
          {clearable && selectedOptions.length > 0 && !disabled && !readonly && (
            <IconButton
              size="small"
              onClick={handleClear}
              sx={{
                p: 0.5,
                color: placeholderColor,
                '&:hover': { color: enterpriseColors.main }
              }}
            >
              {clearIcon}
            </IconButton>
          )}
          
          {suffix && (
            <InputAdornment position="end">
              {suffix}
            </InputAdornment>
          )}
          
          <InputAdornment position="end">
            <Box sx={{ 
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }}>
              {dropdownIcon}
            </Box>
          </InputAdornment>
        </Stack>
      </Box>

      {helperText && !error && (
        <FormHelperText sx={{ mt: 0.5, fontSize: '12px' }}>
          {helperText}
        </FormHelperText>
      )}

      {error && errorText && (
        <FormHelperText error sx={{ mt: 0.5, fontSize: '12px' }}>
          {errorText}
        </FormHelperText>
      )}
    </Box>
  );
};

interface SelectDropdownProps {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
  options: SelectOption[] | SelectGroup[];
  selectedOptions: SelectOption[];
  searchQuery: string;
  multiple?: boolean;
  mode?: SelectMode;
  searchable?: boolean;
  filterable?: boolean;
  filters?: SelectFilter[];
  grouped?: boolean;
  groupCollapsible?: boolean;
  showGroupCount?: boolean;
  sortable?: boolean;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  showCheckmarks?: boolean;
  virtualized?: boolean;
  itemHeight?: number;
  dropdownHeight?: number | string;
  dropdownMaxHeight?: number | string;
  dropdownWidth?: number | string;
  dropdownMatchWidth?: boolean;
  dropdownPlacement?: SelectPlacement;
  dropdownOffset?: number;
  dropdownAnimation?: boolean;
  dropdownShadow?: boolean;
  dropdownBorder?: boolean;
  dropdownBackground?: string;
  emptyText?: string;
  loading?: boolean;
  loadingText?: string;
  error?: boolean;
  errorText?: string;
  renderOption?: (option: SelectOption, isSelected: boolean, isHighlighted: boolean) => React.ReactNode;
  renderGroup?: (group: SelectGroup, isExpanded: boolean) => React.ReactNode;
  renderDropdownHeader?: () => React.ReactNode;
  renderDropdownFooter?: () => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  renderLoading?: () => React.ReactNode;
  renderError?: () => React.ReactNode;
  onOptionSelect?: (option: SelectOption) => void;
  onOptionHover?: (option: SelectOption, index: number) => void;
  onGroupToggle?: (group: SelectGroup, isExpanded: boolean) => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: SelectFilter[]) => void;
  onClose?: () => void;
  enterprise?: boolean;
  color?: SelectColor;
  dropdownSx?: any;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  isOpen,
  anchorEl,
  options,
  selectedOptions,
  searchQuery,
  multiple = false,
  mode = 'single',
  searchable = false,
  filterable = false,
  filters = [],
  grouped = false,
  groupCollapsible = false,
  showGroupCount = false,
  sortable = false,
  sortBy = 'label',
  sortDirection = 'asc',
  showCheckmarks = true,
  virtualized = false,
  itemHeight = 48,
  dropdownHeight = 'auto',
  dropdownMaxHeight = 320,
  dropdownWidth,
  dropdownMatchWidth = true,
  dropdownPlacement = 'bottom',
  dropdownOffset = 8,
  dropdownAnimation = true,
  dropdownShadow = true,
  dropdownBorder = true,
  dropdownBackground = 'white',
  emptyText = 'No options available',
  loading = false,
  loadingText = 'Loading options...',
  error = false,
  errorText = 'An error occurred',
  renderOption,
  renderGroup,
  renderDropdownHeader,
  renderDropdownFooter,
  renderEmpty,
  renderLoading,
  renderError,
  onOptionSelect,
  onOptionHover,
  onGroupToggle,
  onSearch,
  onFilter,
  onClose,
  enterprise = false,
  color = 'primary',
  dropdownSx
}) => {
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [filteredOptions, setFilteredOptions] = useState<SelectOption[] | SelectGroup[]>(options);
  const [appliedFilters, setAppliedFilters] = useState<SelectFilter[]>(filters);
  const listRef = useRef<HTMLDivElement>(null);
  const colors = getEnterpriseColors(color);

  // Process options based on grouping and filtering
  useEffect(() => {
    let processedOptions = options;

    // Apply search filter
    if (searchQuery && searchable) {
      const flatOptions = flattenOptions(options);
      const filtered = filterOptions(flatOptions, searchQuery);
      processedOptions = grouped ? groupOptions(filtered) : filtered;
    }

    // Apply filters
    if (appliedFilters.length > 0) {
      const activeFilters = appliedFilters.filter(f => f.active);
      if (activeFilters.length > 0) {
        const flatOptions = flattenOptions(processedOptions);
        const filtered = flatOptions.filter(option => {
          return activeFilters.every(filter => {
            // Custom filter logic based on filter value
            return option.metadata?.[filter.value] !== false;
          });
        });
        processedOptions = grouped ? groupOptions(filtered) : filtered;
      }
    }

    // Apply sorting
    if (sortable) {
      if (grouped) {
        processedOptions = (processedOptions as SelectGroup[]).map(group => ({
          ...group,
          options: sortOptions(group.options, sortBy, sortDirection)
        }));
      } else {
        processedOptions = sortOptions(processedOptions as SelectOption[], sortBy, sortDirection);
      }
    }

    setFilteredOptions(processedOptions);
  }, [options, searchQuery, appliedFilters, searchable, grouped, sortable, sortBy, sortDirection]);

  // Group options helper
  const groupOptions = (options: SelectOption[]): SelectGroup[] => {
    const groups = new Map<string, SelectOption[]>();
    
    options.forEach(option => {
      const groupKey = option.group || 'Ungrouped';
      if (!groups.has(groupKey)) {
        groups.set(groupKey, []);
      }
      groups.get(groupKey)!.push(option);
    });

    return Array.from(groups.entries()).map(([label, options]) => ({
      label,
      options,
      collapsible: groupCollapsible,
      defaultCollapsed: false
    }));
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    const flatOptions = flattenOptions(filteredOptions);
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setHighlightedIndex(prev => Math.min(prev + 1, flatOptions.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setHighlightedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        event.preventDefault();
        if (flatOptions[highlightedIndex]) {
          handleOptionSelect(flatOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        event.preventDefault();
        if (onClose) onClose();
        break;
    }
  };

  // Handle option selection
  const handleOptionSelect = (option: SelectOption) => {
    if (option.disabled) return;
    if (onOptionSelect) onOptionSelect(option);
  };

  // Handle option hover
  const handleOptionHover = (option: SelectOption, index: number) => {
    if (option.disabled) return;
    setHighlightedIndex(index);
    if (onOptionHover) onOptionHover(option, index);
  };

  // Toggle group expansion
  const toggleGroup = (groupLabel: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupLabel)) {
      newExpanded.delete(groupLabel);
    } else {
      newExpanded.add(groupLabel);
    }
    setExpandedGroups(newExpanded);
    
    const group = (filteredOptions as SelectGroup[]).find(g => g.label === groupLabel);
    if (group && onGroupToggle) {
      onGroupToggle(group, newExpanded.has(groupLabel));
    }
  };

  // Render individual option
  const renderOptionItem = (option: SelectOption, index: number) => {
    const isSelected = selectedOptions.some(selected => selected.value === option.value);
    const isHighlighted = index === highlightedIndex;
    const isDisabled = option.disabled;

    if (renderOption) {
      return renderOption(option, isSelected, isHighlighted);
    }

    return (
      <ListItemButton
        key={option.value}
        selected={isSelected}
        disabled={isDisabled}
        onClick={() => handleOptionSelect(option)}
        onMouseEnter={() => handleOptionHover(option, index)}
        sx={{
          py: 1.5,
          px: 2,
          mx: 1,
          borderRadius: 2,
          mb: 0.5,
          backgroundColor: isHighlighted ? alpha(colors.hover, 0.5) : 'transparent',
          border: '1px solid transparent',
          borderColor: isSelected ? colors.main : 'transparent',
          '&:hover': {
            backgroundColor: alpha(colors.hover, 0.3)
          },
          '&.Mui-selected': {
            backgroundColor: alpha(colors.selected, 0.8),
            borderColor: colors.main,
            '&:hover': {
              backgroundColor: alpha(colors.selected, 0.9)
            }
          },
          '&.Mui-disabled': {
            opacity: 0.5,
            cursor: 'not-allowed'
          }
        }}
      >
        <ListItemIcon sx={{ minWidth: 32 }}>
          {showCheckmarks && multiple && (
            <Checkbox
              checked={isSelected}
              size="small"
              sx={{ p: 0 }}
            />
          )}
          {showCheckmarks && !multiple && isSelected && (
            <Box sx={{ color: colors.main }}>
              <Check size={16} />
            </Box>
          )}
          {option.icon && !showCheckmarks && (
            <Box sx={{ color: colors.main }}>
              {option.icon}
            </Box>
          )}
          {option.image && (
            <Avatar src={option.image} sx={{ width: 24, height: 24 }} />
          )}
        </ListItemIcon>

        <ListItemText
          primary={
            <Typography
              variant="body2"
              sx={{
                fontWeight: isSelected ? 600 : 500,
                color: isDisabled ? 'text.disabled' : 'text.primary'
              }}
            >
              {option.label}
            </Typography>
          }
          secondary={
            option.description && (
              <Typography variant="caption" color="text.secondary">
                {option.description}
              </Typography>
            )
          }
        />

        {option.tags && option.tags.length > 0 && (
          <Stack direction="row" spacing={0.5} sx={{ ml: 1 }}>
            {option.tags.slice(0, 2).map(tag => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  fontSize: '10px',
                  height: 18,
                  backgroundColor: alpha(colors.main, 0.1),
                  color: colors.main
                }}
              />
            ))}
          </Stack>
        )}

        {option.color && (
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: option.color,
              ml: 1
            }}
          />
        )}
      </ListItemButton>
    );
  };

  // Render group
  const renderGroupItem = (group: SelectGroup) => {
    const isExpanded = !expandedGroups.has(group.label);
    const itemCount = group.options.length;
    const selectedCount = group.options.filter(opt => 
      selectedOptions.some(selected => selected.value === opt.value)
    ).length;

    if (renderGroup) {
      return renderGroup(group, isExpanded);
    }

    return (
      <Box key={group.label} sx={{ mb: 1 }}>
        <ListItemButton
          onClick={() => toggleGroup(group.label)}
          disabled={group.disabled}
          sx={{
            py: 1,
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
              (showGroupCount || selectedCount > 0) && (
                <Typography variant="caption" color="text.secondary">
                  {selectedCount > 0 ? `${selectedCount}/${itemCount} selected` : `${itemCount} items`}
                </Typography>
              )
            }
          />

          {selectedCount > 0 && (
            <Badge
              badgeContent={selectedCount}
              color="primary"
              sx={{ ml: 1 }}
            />
          )}
        </ListItemButton>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List sx={{ py: 0 }}>
            {group.options.map((option, index) => 
              renderOptionItem(option, index)
            )}
          </List>
        </Collapse>
      </Box>
    );
  };

  // Render empty state
  const renderEmptyState = () => {
    if (renderEmpty) return renderEmpty();

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
          px: 2,
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
          <Search size={24} color={colors.main} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          {emptyText}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {searchQuery ? 'Try adjusting your search terms' : 'No options available'}
        </Typography>
      </Box>
    );
  };

  // Render loading state
  const renderLoadingState = () => {
    if (renderLoading) return renderLoading();

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
          px: 2
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

  // Render error state
  const renderErrorState = () => {
    if (renderError) return renderError();

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
          px: 2
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
          <AlertTriangle size={24} color="#f44336" />
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

  // Get dropdown position
  const getDropdownPosition = () => {
    const positions = {
      top: { bottom: '100%', mb: dropdownOffset },
      bottom: { top: '100%', mt: dropdownOffset },
      left: { right: '100%', mr: dropdownOffset },
      right: { left: '100%', ml: dropdownOffset },
      auto: {}
    };
    return positions[dropdownPlacement] || positions.bottom;
  };

  return (
    <Popper
      open={isOpen}
      anchorEl={anchorEl}
      placement={dropdownPlacement}
      transition
      modifiers={[
        {
          name: 'offset',
          options: {
            offset: [0, dropdownOffset]
          }
        },
        {
          name: 'preventOverflow',
          options: {
            boundary: 'viewport',
            padding: 8
          }
        }
      ]}
      sx={{ zIndex: 1300 }}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={dropdownAnimation ? 200 : 0}>
          <Paper
            elevation={dropdownShadow ? 8 : 0}
            sx={{
              width: dropdownMatchWidth ? undefined : dropdownWidth,
              maxWidth: 'calc(100vw - 32px)',
              maxHeight: dropdownMaxHeight,
              overflow: 'hidden',
              backgroundColor: dropdownBackground,
              border: dropdownBorder ? `1px solid ${alpha('#000', 0.1)}` : 'none',
              borderRadius: 3,
              ...getDropdownPosition(),
              ...dropdownSx
            }}
          >
            {/* Dropdown Header */}
            {renderDropdownHeader && (
              <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                {renderDropdownHeader()}
              </Box>
            )}

            {/* Search and Filters */}
            {(searchable || filterable) && (
              <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                {searchable && (
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search options..."
                    value={searchQuery}
                    onChange={(e) => onSearch && onSearch(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search size={16} />
                        </InputAdornment>
                      )
                    }}
                    sx={{ mb: filterable ? 1 : 0 }}
                  />
                )}
                
                {filterable && filters.length > 0 && (
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {filters.map(filter => (
                      <Chip
                        key={filter.value}
                        label={filter.label}
                        icon={filter.icon}
                        onClick={() => {
                          const newFilters = filters.map(f => 
                            f.value === filter.value ? { ...f, active: !f.active } : f
                          );
                          setAppliedFilters(newFilters);
                          if (onFilter) onFilter(newFilters);
                        }}
                        color={filter.active ? 'primary' : 'default'}
                        variant={filter.active ? 'filled' : 'outlined'}
                        size="small"
                      />
                    ))}
                  </Stack>
                )}
              </Box>
            )}

            {/* Options List */}
            <Box sx={{ overflow: 'auto', maxHeight: `calc(${dropdownMaxHeight} - 160px)` }}>
              {loading && renderLoadingState()}
              {error && renderErrorState()}
              {!loading && !error && filteredOptions.length === 0 && renderEmptyState()}
              {!loading && !error && filteredOptions.length > 0 && (
                <List sx={{ py: 1 }}>
                  {grouped
                    ? (filteredOptions as SelectGroup[]).map(group => renderGroupItem(group))
                    : (filteredOptions as SelectOption[]).map((option, index) => renderOptionItem(option, index))
                  }
                </List>
              )}
            </Box>

            {/* Dropdown Footer */}
            {renderDropdownFooter && (
              <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                {renderDropdownFooter()}
              </Box>
            )}
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

// Main Select Component
export const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const {
    value: controlledValue,
    defaultValue,
    options,
    onChange,
    onOpen,
    onClose,
    onSearch,
    onFilter,
    onClear,
    
    // Selection behavior
    multiple = false,
    mode = multiple ? 'multiple' : 'single',
    clearable = true,
    searchable = false,
    creatable = false,
    disabled = false,
    readonly = false,
    required = false,
    
    // Component styling
    variant = 'default',
    size = 'medium',
    color = 'primary',
    shape = 'rounded',
    placement = 'bottom',
    
    // Dimensions
    width = '100%',
    maxWidth,
    minWidth = 200,
    height,
    maxHeight,
    minHeight,
    dropdownHeight = 'auto',
    dropdownMaxHeight = 320,
    
    // Visual styling
    backgroundColor = 'white',
    borderColor,
    borderWidth = 2,
    borderRadius = 8,
    padding,
    margin,
    fontSize,
    fontWeight = 600,
    textColor,
    placeholderColor = '#6c757d',
    
    // Advanced features
    loading = false,
    loadingText = 'Loading options...',
    emptyText = 'No options available',
    error = false,
    errorText,
    helperText,
    label,
    placeholder = 'Select an option',
    
    // Icons and adornments
    prefix,
    suffix,
    dropdownIcon,
    clearIcon,
    searchIcon,
    loadingIcon,
    emptyIcon,
    errorIcon,
    
    // Grouping and organization
    grouped = false,
    groupCollapsible = false,
    showGroupCount = false,
    sortable = false,
    sortBy = 'label',
    sortDirection = 'asc',
    
    // Filtering and search
    filterable = false,
    filters = [],
    filterPlaceholder = 'Filter options...',
    filterMultiple = false,
    filterCaseSensitive = false,
    filterFuzzy = false,
    filterHighlight = false,
    
    // Selection visualization
    showCheckmarks = true,
    showSelectionCount = false,
    maxSelectionCount,
    selectionCountText = '{count} selected',
    showSelectionPreview = true,
    selectionPreviewLimit = 3,
    
    // Dropdown behavior
    dropdownWidth,
    dropdownMatchWidth = true,
    dropdownPlacement = 'bottom',
    dropdownOffset = 8,
    dropdownAnimation = true,
    dropdownShadow = true,
    dropdownBorder = true,
    dropdownBackground = 'white',
    
    // Virtualization
    virtualized = false,
    itemHeight = 48,
    bufferSize = 5,
    
    // Keyboard navigation
    keyboardNavigation = true,
    keyboardShortcut,
    tabIndex = 0,
    
    // Touch and mobile
    touchEnabled = true,
    swipeEnabled = true,
    momentum = true,
    bounce = true,
    
    // Enterprise features
    enterprise = false,
    showQuickActions = false,
    quickActions = [],
    showStatistics = false,
    statistics = {},
    showPerformanceMetrics = false,
    performanceMetrics = {},
    
    // Custom rendering
    renderOption,
    renderGroup,
    renderValue,
    renderPlaceholder,
    renderEmpty,
    renderLoading,
    renderError,
    renderDropdown,
    renderDropdownHeader,
    renderDropdownFooter,
    
    // Accessibility
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    ariaLive = 'polite',
    ariaAtomic = true,
    ariaRelevant = 'additions text',
    
    // Special modes
    fullscreen = false,
    floating = false,
    embedded = false,
    modal = false,
    drawer = false,
    
    // Styling overrides
    containerSx,
    triggerSx,
    dropdownSx,
    optionSx,
    groupSx,
    actionSx,
    
    // Event handlers
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp,
    onMouseEnter,
    onMouseLeave,
    onClick,
    onDoubleClick,
    onContextMenu,
    
    // Advanced callbacks
    onOptionHover,
    onOptionSelect,
    onGroupToggle,
    onCreateOption,
    onRemoveOption,
    onReorderOptions
  } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<SelectFilter[]>(filters);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  
  // Performance tracking
  const [renderStartTime] = useState(Date.now());
  const [performanceState, setPerformanceState] = useState({
    renderTime: 0,
    searchTime: 0,
    filterTime: 0,
    selectionTime: 0
  });

  const colors = getEnterpriseColors(color);

  // Initialize value
  useEffect(() => {
    const initialValue = controlledValue !== undefined ? controlledValue : defaultValue;
    const initialOptions = getSelectedOptions(initialValue, options);
    setSelectedOptions(initialOptions);
  }, [controlledValue, defaultValue, options]);

  // Calculate performance metrics
  useEffect(() => {
    if (showPerformanceMetrics) {
      setPerformanceState(prev => ({
        ...prev,
        renderTime: Date.now() - renderStartTime
      }));
    }
  }, [renderStartTime, showPerformanceMetrics]);

  // Handle dropdown open/close
  const handleOpen = useCallback(() => {
    if (disabled || readonly) return;
    
    setIsOpen(true);
    setIsFocused(true);
    if (onOpen) onOpen();
    
    // Performance tracking
    if (showPerformanceMetrics) {
      const startTime = Date.now();
      setTimeout(() => {
        setPerformanceState(prev => ({
          ...prev,
          selectionTime: Date.now() - startTime
        }));
      }, 0);
    }
  }, [disabled, readonly, onOpen, showPerformanceMetrics]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setSearchQuery('');
    if (onClose) onClose();
  }, [onClose]);

  // Handle value change
  const handleChange = useCallback((newValue: string | number | (string | number)[] | null, newOptions: SelectOption[]) => {
    setSelectedOptions(newOptions);
    if (onChange) onChange(newValue, newOptions);
    
    if (!multiple) {
      handleClose();
    }
  }, [multiple, onChange, handleClose]);

  // Handle clear
  const handleClear = useCallback(() => {
    handleChange(null, []);
    if (onClear) onClear();
  }, [handleChange, onClear]);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (onSearch) onSearch(query);
    
    // Performance tracking
    if (showPerformanceMetrics) {
      const startTime = Date.now();
      setTimeout(() => {
        setPerformanceState(prev => ({
          ...prev,
          searchTime: Date.now() - startTime
        }));
      }, 0);
    }
  }, [onSearch, showPerformanceMetrics]);

  // Handle filter
  const handleFilter = useCallback((newFilters: SelectFilter[]) => {
    setAppliedFilters(newFilters);
    if (onFilter) onFilter(newFilters);
    
    // Performance tracking
    if (showPerformanceMetrics) {
      const startTime = Date.now();
      setTimeout(() => {
        setPerformanceState(prev => ({
          ...prev,
          filterTime: Date.now() - startTime
        }));
      }, 0);
    }
  }, [onFilter, showPerformanceMetrics]);

  // Handle option selection
  const handleOptionSelect = useCallback((option: SelectOption) => {
    if (option.disabled) return;

    let newValue: string | number | (string | number)[] | null;
    let newOptions: SelectOption[];

    if (multiple) {
      const isSelected = selectedOptions.some(selected => selected.value === option.value);
      
      if (isSelected) {
        newOptions = selectedOptions.filter(selected => selected.value !== option.value);
      } else {
        if (maxSelectionCount && selectedOptions.length >= maxSelectionCount) {
          return; // Don't exceed max selection
        }
        newOptions = [...selectedOptions, option];
      }
      newValue = newOptions.map(opt => opt.value);
    } else {
      newOptions = [option];
      newValue = option.value;
    }

    handleChange(newValue, newOptions);
    if (onOptionSelect) onOptionSelect(option, newOptions.some(selected => selected.value === option.value));
  }, [multiple, selectedOptions, maxSelectionCount, handleChange, onOptionSelect]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!keyboardNavigation) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (isOpen) {
          handleClose();
        } else {
          handleOpen();
        }
        break;
      case 'Escape':
        if (isOpen) {
          handleClose();
        }
        break;
      case 'ArrowDown':
      case 'ArrowUp':
        if (!isOpen) {
          handleOpen();
        }
        break;
      case 'Tab':
        if (isOpen) {
          handleClose();
        }
        break;
    }

    if (onKeyDown) onKeyDown(event);
  }, [keyboardNavigation, isOpen, handleOpen, handleClose, onKeyDown]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && 
          triggerRef.current && 
          !triggerRef.current.contains(event.target as Node) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, handleClose]);

  // Get current value for display
  const getDisplayValue = () => {
    if (controlledValue !== undefined) {
      return getSelectedOptions(controlledValue, options);
    }
    return selectedOptions;
  };

  const displayOptions = getDisplayValue();

  // Get statistics
  const getStatistics = () => {
    const flatOptions = flattenOptions(options);
    const filteredCount = searchQuery ? filterOptions(flatOptions, searchQuery).length : flatOptions.length;
    const activeFilters = appliedFilters.filter(f => f.active).length;
    
    return {
      total: flatOptions.length,
      selected: displayOptions.length,
      filtered: filteredCount,
      visible: filteredCount,
      activeFilters
    };
  };

  const stats = getStatistics();

  return (
    <FormControl
      fullWidth
      error={error}
      disabled={disabled}
      required={required}
      sx={{ minWidth, maxWidth, ...containerSx }}
    >
      <ClickAwayListener onClickAway={handleClose}>
        <Box ref={triggerRef} sx={{ position: 'relative' }}>
          {/* Label */}
          {label && (
            <FormLabel
              required={required}
              error={error}
              sx={{
                mb: 1,
                display: 'block',
                fontWeight: 600,
                fontSize: '14px',
                color: error ? '#f44336' : (enterprise ? enterpriseColors.main : '#1a1a1a')
              }}
            >
              {label}
            </FormLabel>
          )}

          {/* Trigger */}
          <SelectTrigger
            value={controlledValue !== undefined ? controlledValue : displayOptions.map(opt => opt.value)}
            placeholder={placeholder}
            helperText={helperText}
            error={error}
            errorText={errorText}
            disabled={disabled}
            readonly={readonly}
            required={required}
            loading={loading}
            multiple={multiple}
            showSelectionCount={showSelectionCount}
            maxSelectionCount={maxSelectionCount}
            selectionCountText={selectionCountText}
            showSelectionPreview={showSelectionPreview}
            selectionPreviewLimit={selectionPreviewLimit}
            clearable={clearable}
            searchable={searchable}
            prefix={prefix}
            suffix={suffix}
            dropdownIcon={dropdownIcon}
            clearIcon={clearIcon}
            searchIcon={searchIcon}
            loadingIcon={loadingIcon}
            errorIcon={errorIcon}
            variant={variant}
            size={size}
            color={color}
            shape={shape}
            width={width}
            backgroundColor={backgroundColor}
            borderColor={borderColor}
            borderRadius={borderRadius}
            fontSize={fontSize}
            fontWeight={fontWeight}
            textColor={textColor}
            placeholderColor={placeholderColor}
            isOpen={isOpen}
            isFocused={isFocused}
            isHovered={isHovered}
            selectedOptions={displayOptions}
            searchQuery={searchQuery}
            onClear={handleClear}
            onSearch={handleSearch}
            onClick={handleOpen}
            onFocus={(e) => setIsFocused(true) && onFocus && onFocus(e)}
            onBlur={(e) => setIsFocused(false) && onBlur && onBlur(e)}
            onKeyDown={handleKeyDown}
            onMouseEnter={(e) => setIsHovered(true) && onMouseEnter && onMouseEnter(e)}
            onMouseLeave={(e) => setIsHovered(false) && onMouseLeave && onMouseLeave(e)}
            renderValue={renderValue}
            renderPlaceholder={renderPlaceholder}
            enterprise={enterprise}
            tabIndex={tabIndex}
            triggerSx={triggerSx}
          />

          {/* Dropdown */}
          {isOpen && (
            <SelectDropdown
              isOpen={isOpen}
              anchorEl={triggerRef.current}
              options={options}
              selectedOptions={displayOptions}
              searchQuery={searchQuery}
              multiple={multiple}
              mode={mode}
              searchable={searchable}
              filterable={filterable}
              filters={appliedFilters}
              grouped={grouped}
              groupCollapsible={groupCollapsible}
              showGroupCount={showGroupCount}
              sortable={sortable}
              sortBy={sortBy}
              sortDirection={sortDirection}
              showCheckmarks={showCheckmarks}
              virtualized={virtualized}
              itemHeight={itemHeight}
              dropdownHeight={dropdownHeight}
              dropdownMaxHeight={dropdownMaxHeight}
              dropdownWidth={dropdownWidth}
              dropdownMatchWidth={dropdownMatchWidth}
              dropdownPlacement={dropdownPlacement}
              dropdownOffset={dropdownOffset}
              dropdownAnimation={dropdownAnimation}
              dropdownShadow={dropdownShadow}
              dropdownBorder={dropdownBorder}
              dropdownBackground={dropdownBackground}
              emptyText={emptyText}
              loading={loading}
              loadingText={loadingText}
              error={error}
              errorText={errorText}
              renderOption={renderOption}
              renderGroup={renderGroup}
              renderDropdownHeader={renderDropdownHeader}
              renderDropdownFooter={renderDropdownFooter}
              renderEmpty={renderEmpty}
              renderLoading={renderLoading}
              renderError={renderError}
              onOptionSelect={handleOptionSelect}
              onOptionHover={onOptionHover}
              onGroupToggle={onGroupToggle}
              onSearch={handleSearch}
              onFilter={handleFilter}
              onClose={handleClose}
              enterprise={enterprise}
              color={color}
              dropdownSx={dropdownSx}
            />
          )}

          {/* Helper Text */}
          {helperText && !error && (
            <FormHelperText sx={{ mt: 0.5, fontSize: '12px' }}>
              {helperText}
            </FormHelperText>
          )}

          {error && errorText && (
            <FormHelperText error sx={{ mt: 0.5, fontSize: '12px' }}>
              {errorText}
            </FormHelperText>
          )}

          {/* Enterprise Statistics */}
          {enterprise && showStatistics && (
            <Box sx={{ mt: 1, p: 1, backgroundColor: alpha(enterpriseColors.background, 0.5), borderRadius: 1 }}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Total: {stats.total}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Selected: {stats.selected}
                  </Typography>
                </Grid>
                {stats.activeFilters > 0 && (
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">
                      Filters: {stats.activeFilters}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}

          {/* Performance Metrics */}
          {enterprise && showPerformanceMetrics && (
            <Box sx={{ mt: 1, p: 1, backgroundColor: alpha(enterpriseColors.background, 0.3), borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Render: {performanceState.renderTime}ms | 
                Search: {performanceState.searchTime}ms | 
                Filter: {performanceState.filterTime}ms
              </Typography>
            </Box>
          )}
        </Box>
      </ClickAwayListener>
    </FormControl>
  );
});

Select.displayName = 'Select';

export { Select };
export type { 
  SelectProps, 
  SelectOption, 
  SelectGroup, 
  SelectFilter, 
  SelectAction, 
  SelectState, 
  SelectVariant, 
  SelectSize, 
  SelectColor, 
  SelectShape, 
  SelectPlacement, 
  SelectMode 
};
