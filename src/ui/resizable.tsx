import React, { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
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
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Divider,
  Grid
} from '@mui/material';
import {
  Maximize,
  Minimize,
  Maximize2,
  Minimize2,
  CornerDownRight,
  CornerDownLeft,
  CornerUpRight,
  CornerUpLeft,
  ArrowUpDown,
  ArrowLeftRight,
  Move,
  RotateCcw,
  RotateCw,
  RefreshCw,
  Save,
  Settings,
  MoreVertical,
  MoreHorizontal,
  Lock,
  Unlock,
  GripVertical,
  GripHorizontal,
  Square,
  Circle,
  Triangle,
  Diamond,
  Expand,
  Compress,
  Expand2,
  Compress2,
  ZoomIn,
  ZoomOut,
  Zoom,
  Scale,
  Ratio,
  Proportional,
  Fixed,
  Auto,
  Custom,
  Preset,
  Reset,
  Undo,
  Redo,
  Copy,
  Paste,
  Cut,
  Delete,
  Trash2,
  Edit,
  Edit2,
  Eye,
  EyeOff,
  Download,
  Upload,
  FileText,
  Image,
  Video,
  Music,
  File,
  Folder,
  Archive,
  BookOpen,
  Award,
  Star,
  CheckCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  Search,
  Filter,
  Plus,
  Minus,
  X,
  Check,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Share2,
  Mail,
  Phone,
  MapPin,
  Globe,
  DollarSign,
  Percent,
  Hash,
  AtSign,
  Paperclip,
  Lock2,
  Unlock2,
  Key,
  Fingerprint,
  CreditCard,
  Calendar,
  Clock,
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Zap,
  Home,
  Users,
  Shield,
  Certificate,
  Verified,
  GraduationCap,
  Briefcase,
  Target,
  Flag,
  Bookmark,
  Heart,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Bell,
  Notification,
  Settings2,
  Home2,
  Users2,
  Shield2,
  Certificate2,
  Verified2,
  GraduationCap2,
  Briefcase2,
  Target2,
  Flag2,
  Bookmark2,
  Heart2,
  ThumbsUp2,
  ThumbsDown2,
  MessageCircle2,
  Bell2,
  Notification2,
  Settings3
} from 'lucide-react';

export type ResizeDirection = 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type ResizeMode = 'absolute' | 'relative' | 'viewport' | 'container';
export type ResizeUnit = 'px' | '%' | 'em' | 'rem' | 'vw' | 'vh' | 'auto';
export type ResizeAspectRatio = 'free' | 'square' | 'video' | 'golden' | 'custom' | 'preset';
export type ResizeHandle = 'corner' | 'edge' | 'both' | 'none';
export type ResizeSnapping = 'grid' | 'pixel' | 'element' | 'container' | 'viewport' | 'none';

export interface ResizableProps {
  // Core props
  children: React.ReactNode;
  defaultWidth?: number | string;
  defaultHeight?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  
  // Resize behavior
  enabled?: boolean;
  direction?: ResizeDirection[];
  handles?: ResizeHandle;
  mode?: ResizeMode;
  unit?: ResizeUnit;
  
  // Aspect ratio
  aspectRatio?: ResizeAspectRatio;
  customAspectRatio?: number;
  preserveAspectRatio?: boolean;
  lockAspectRatio?: boolean;
  
  // Snapping and grid
  snap?: ResizeSnapping;
  snapGrid?: [number, number];
  snapDistance?: number;
  snapElements?: string[];
  
  // Constraints
  bounds?: 'parent' | 'window' | 'document' | HTMLElement;
  container?: HTMLElement | null;
  constrainToContainer?: boolean;
  constrainToBounds?: boolean;
  
  // Handles and controls
  showHandles?: boolean;
  handleSize?: number;
  handleColor?: string;
  handleStyle?: 'default' | 'thin' | 'thick' | 'rounded' | 'square';
  handlePosition?: 'inside' | 'outside' | 'center';
  
  // Controls
  showControls?: boolean;
  controls?: Array<{
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    disabled?: boolean;
    variant?: 'text' | 'outlined' | 'contained';
  }>;
  controlPosition?: 'top' | 'bottom' | 'left' | 'right' | 'corner';
  controlAlignment?: 'start' | 'center' | 'end';
  
  // Presets
  presets?: Array<{
    name: string;
    width: number | string;
    height: number | string;
    icon?: React.ReactNode;
  }>;
  showPresets?: boolean;
  defaultPreset?: string;
  
  // Animation
  animated?: boolean;
  animationDuration?: number;
  animationEasing?: string;
  
  // Visual features
  showBorder?: boolean;
  showShadow?: boolean;
  showOverlay?: boolean;
  showGrid?: boolean;
  showGuides?: boolean;
  showPreview?: boolean;
  
  // Styling
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  backgroundColor?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  
  // Enterprise features
  enterprise?: boolean;
  showQuickActions?: boolean;
  quickActions?: Array<{
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    color?: string;
  }>;
  showSizeDisplay?: boolean;
  sizeDisplayFormat?: 'width-height' | 'dimensions' | 'area' | 'ratio';
  
  // Event handlers
  onResizeStart?: (event: MouseEvent | TouchEvent, direction: ResizeDirection) => void;
  onResize?: (event: MouseEvent | TouchEvent, direction: ResizeDirection, size: { width: number; height: number }) => void;
  onResizeStop?: (event: MouseEvent | TouchEvent, direction: ResizeDirection, size: { width: number; height: number }) => void;
  onSizeChange?: (size: { width: number; height: number }) => void;
  onAspectRatioChange?: (ratio: number) => void;
  onPresetSelect?: (preset: { name: string; width: number | string; height: number | string }) => void;
  
  // State management
  onMinSizeReached?: (dimension: 'width' | 'height') => void;
  onMaxSizeReached?: (dimension: 'width' | 'height') => void;
  onSnap?: (element: HTMLElement | null) => void;
  
  // Custom rendering
  renderHandle?: (direction: ResizeDirection, isActive: boolean) => React.ReactNode;
  renderControls?: () => React.ReactNode;
  renderOverlay?: () => React.ReactNode;
  renderGrid?: () => React.ReactNode;
  renderGuides?: () => React.ReactNode;
  
  // Performance
  debounce?: number;
  throttle?: number;
  bufferSize?: number;
  
  // Accessibility
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  role?: string;
  
  // Mobile optimization
  mobileOptimized?: boolean;
  touchEnabled?: boolean;
  touchThreshold?: number;
  mobileHandles?: boolean;
  
  // Special modes
  fullscreen?: boolean;
  floating?: boolean;
  dockable?: boolean;
  minimizable?: boolean;
  maximizable?: boolean;
  pinnable?: boolean;
  
  // Styling overrides
  className?: string;
  sx?: any;
  style?: React.CSSProperties;
  handleSx?: any;
  controlsSx?: any;
  overlaySx?: any;
  
  // Performance optimization
  virtualized?: boolean;
  lazy?: boolean;
  memoized?: boolean;
}

interface ResizeState {
  width: number;
  height: number;
  x: number;
  y: number;
  isResizing: boolean;
  direction: ResizeDirection | null;
  aspectRatio: number;
  snapElements: HTMLElement[];
}

interface ResizeHandleProps {
  direction: ResizeDirection;
  isActive: boolean;
  isHovered: boolean;
  onMouseDown: (e: React.MouseEvent, direction: ResizeDirection) => void;
  onTouchStart: (e: React.TouchEvent, direction: ResizeDirection) => void;
  size: number;
  color: string;
  style: string;
  position: string;
  enterprise: boolean;
  renderHandle?: (direction: ResizeDirection, isActive: boolean) => React.ReactNode;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({
  direction,
  isActive,
  isHovered,
  onMouseDown,
  onTouchStart,
  size,
  color,
  style,
  position,
  enterprise,
  renderHandle
}) => {
  if (renderHandle) {
    return <>{renderHandle(direction, isActive)}</>;
  }

  const getHandleStyles = () => {
    const baseStyles = {
      position: 'absolute',
      backgroundColor: isActive ? color : alpha(color, 0.6),
      cursor: getResizeCursor(direction),
      transition: 'all 0.2s ease',
      zIndex: 1000,
      '&:hover': {
        backgroundColor: color,
        transform: 'scale(1.1)'
      }
    };

    const sizeStyles = {
      thin: { width: 2, height: 2 },
      thick: { width: 8, height: 8 },
      rounded: { borderRadius: '50%' },
      square: { borderRadius: 0 }
    };

    const positionStyles = getHandlePositionStyles(direction, size, position);

    return {
      ...baseStyles,
      ...sizeStyles[style] || sizeStyles.thick,
      ...positionStyles
    };
  };

  const getResizeCursor = (dir: ResizeDirection) => {
    const cursors = {
      'top': 'n-resize',
      'right': 'e-resize',
      'bottom': 's-resize',
      'left': 'w-resize',
      'top-left': 'nw-resize',
      'top-right': 'ne-resize',
      'bottom-left': 'sw-resize',
      'bottom-right': 'se-resize'
    };
    return cursors[dir] || 'pointer';
  };

  const getHandlePositionStyles = (dir: ResizeDirection, size: number, pos: string) => {
    const offset = pos === 'outside' ? -size / 2 : pos === 'inside' ? size / 2 : 0;
    
    const positions = {
      'top': { top: offset, left: '50%', transform: 'translateX(-50%)', width: size * 3, height: size },
      'right': { right: offset, top: '50%', transform: 'translateY(-50%)', width: size, height: size * 3 },
      'bottom': { bottom: offset, left: '50%', transform: 'translateX(-50%)', width: size * 3, height: size },
      'left': { left: offset, top: '50%', transform: 'translateY(-50%)', width: size, height: size * 3 },
      'top-left': { top: offset, left: offset, width: size, height: size },
      'top-right': { top: offset, right: offset, width: size, height: size },
      'bottom-left': { bottom: offset, left: offset, width: size, height: size },
      'bottom-right': { bottom: offset, right: offset, width: size, height: size }
    };

    return positions[dir] || {};
  };

  return (
    <Box
      sx={getHandleStyles()}
      onMouseDown={(e) => onMouseDown(e, direction)}
      onTouchStart={(e) => onTouchStart(e, direction)}
    >
      {/* Enterprise handle with grip indicator */}
      {enterprise && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '12px'
          }}
        >
          {direction.includes('right') && <ChevronRight size={12} />}
          {direction.includes('left') && <ChevronLeft size={12} />}
          {direction.includes('bottom') && <ChevronDown size={12} />}
          {direction.includes('top') && <ChevronUp size={12} />}
        </Box>
      )}
    </Box>
  );
};

interface ResizeControlsProps {
  controls?: Array<{
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    disabled?: boolean;
    variant?: 'text' | 'outlined' | 'contained';
  }>;
  position: string;
  alignment: string;
  onReset: () => void;
  onMaximize: () => void;
  onMinimize: () => void;
  enterprise?: boolean;
  renderControls?: () => React.ReactNode;
}

const ResizeControls: React.FC<ResizeControlsProps> = ({
  controls = [],
  position,
  alignment,
  onReset,
  onMaximize,
  onMinimize,
  enterprise,
  renderControls
}) => {
  if (renderControls) {
    return <>{renderControls()}</>;
  }

  const getPositionStyles = () => {
    const baseStyles = {
      position: 'absolute',
      display: 'flex',
      gap: 1,
      zIndex: 1001
    };

    const positionStyles = {
      top: { top: 8, left: '50%', transform: 'translateX(-50%)' },
      bottom: { bottom: 8, left: '50%', transform: 'translateX(-50%)' },
      left: { left: 8, top: '50%', transform: 'translateY(-50%)', flexDirection: 'column' as const },
      right: { right: 8, top: '50%', transform: 'translateY(-50%)', flexDirection: 'column' as const },
      corner: { top: 8, right: 8 }
    };

    const alignmentStyles = {
      start: { justifyContent: 'flex-start' },
      center: { justifyContent: 'center' },
      end: { justifyContent: 'flex-end' }
    };

    return {
      ...baseStyles,
      ...positionStyles[position],
      ...alignmentStyles[alignment]
    };
  };

  const defaultControls = [
    {
      icon: <Maximize2 size={16} />,
      label: 'Maximize',
      onClick: onMaximize,
      variant: 'text' as const
    },
    {
      icon: <RotateCcw size={16} />,
      label: 'Reset',
      onClick: onReset,
      variant: 'text' as const
    }
  ];

  const allControls = [...defaultControls, ...controls];

  return (
    <Box sx={getPositionStyles()}>
      {allControls.map((control, index) => (
        <Tooltip key={index} title={control.label} arrow>
          <IconButton
            size="small"
            onClick={control.onClick}
            disabled={control.disabled}
            sx={{
              backgroundColor: enterprise ? 'rgba(255, 255, 255, 0.9)' : 'white',
              color: enterprise ? '#667eea' : 'inherit',
              backdropFilter: 'blur(10px)',
              border: enterprise ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: enterprise ? 'white' : 'rgba(255, 255, 255, 0.95)',
                transform: 'scale(1.05)'
              }
            }}
          >
            {control.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};

interface ResizePresetsProps {
  presets: Array<{
    name: string;
    width: number | string;
    height: number | string;
    icon?: React.ReactNode;
  }>;
  onSelect: (preset: { name: string; width: number | string; height: number | string }) => void;
  currentSize: { width: number; height: number };
  enterprise?: boolean;
}

const ResizePresets: React.FC<ResizePresetsProps> = ({
  presets,
  onSelect,
  currentSize,
  enterprise
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePresetSelect = (preset: { name: string; width: number | string; height: number | string }) => {
    onSelect(preset);
    handleClose();
  };

  return (
    <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1002 }}>
      <Tooltip title="Size presets" arrow>
        <IconButton
          size="small"
          onClick={handleClick}
          sx={{
            backgroundColor: enterprise ? 'rgba(255, 255, 255, 0.9)' : 'white',
            color: enterprise ? '#667eea' : 'inherit',
            backdropFilter: 'blur(10px)',
            border: enterprise ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Settings size={16} />
        </IconButton>
      </Tooltip>

      {/* Preset menu would be implemented here with Popover/Material-UI Menu */}
      <Box sx={{ display: 'none' }}>{/* Menu implementation */}</Box>
    </Box>
  );
};

interface SizeDisplayProps {
  width: number;
  height: number;
  format: string;
  enterprise?: boolean;
}

const SizeDisplay: React.FC<SizeDisplayProps> = ({ width, height, format, enterprise }) => {
  const getDisplayText = () => {
    switch (format) {
      case 'width-height':
        return `${Math.round(width)} × ${Math.round(height)}`;
      case 'dimensions':
        return `${Math.round(width)}W × ${Math.round(height)}H`;
      case 'area':
        return `Area: ${Math.round(width * height)}px²`;
      case 'ratio':
        const ratio = width / height;
        return `Ratio: ${ratio.toFixed(2)}:1`;
      default:
        return `${Math.round(width)} × ${Math.round(height)}`;
    }
  };

  return (
    <Box sx={{ position: 'absolute', bottom: 8, right: 8, zIndex: 1002 }}>
      <Card
        elevation={0}
        sx={{
          backgroundColor: enterprise ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
          color: enterprise ? '#667eea' : 'white',
          padding: '4px 8px',
          borderRadius: 2,
          fontSize: '12px',
          fontWeight: 600,
          backdropFilter: 'blur(10px)',
          border: enterprise ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        {getDisplayText()}
      </Card>
    </Box>
  );
};

export const Resizable = forwardRef<HTMLDivElement, ResizableProps>((props, ref) => {
  const {
    children,
    defaultWidth = 400,
    defaultHeight = 300,
    minWidth = 100,
    minHeight = 100,
    maxWidth = '100%',
    maxHeight = '100%',
    enabled = true,
    direction = ['bottom-right', 'bottom', 'right'],
    handles = 'corner',
    mode = 'absolute',
    unit = 'px',
    aspectRatio = 'free',
    customAspectRatio = 1,
    preserveAspectRatio = false,
    lockAspectRatio = false,
    snap = 'none',
    snapGrid = [10, 10],
    snapDistance = 10,
    snapElements = [],
    bounds = 'parent',
    container = null,
    constrainToContainer = true,
    constrainToBounds = true,
    showHandles = true,
    handleSize = 8,
    handleColor = '#667eea',
    handleStyle = 'rounded',
    handlePosition = 'outside',
    showControls = true,
    controls = [],
    controlPosition = 'corner',
    controlAlignment = 'end',
    presets = [],
    showPresets = false,
    defaultPreset,
    animated = true,
    animationDuration = 200,
    animationEasing = 'ease-out',
    showBorder = true,
    showShadow = true,
    showOverlay = false,
    showGrid = false,
    showGuides = false,
    showPreview = false,
    borderColor = '#667eea',
    borderWidth = 2,
    borderRadius = 8,
    backgroundColor = 'white',
    overlayColor = '#000',
    overlayOpacity = 0.1,
    enterprise = false,
    showQuickActions = false,
    quickActions = [],
    showSizeDisplay = true,
    sizeDisplayFormat = 'width-height',
    onResizeStart,
    onResize,
    onResizeStop,
    onSizeChange,
    onAspectRatioChange,
    onPresetSelect,
    onMinSizeReached,
    onMaxSizeReached,
    onSnap,
    renderHandle,
    renderControls,
    renderOverlay,
    renderGrid,
    renderGuides,
    debounce = 0,
    throttle = 0,
    bufferSize = 5,
    ariaLabel = 'Resizable container',
    ariaLabelledBy,
    ariaDescribedBy,
    role = 'region',
    mobileOptimized = true,
    touchEnabled = true,
    touchThreshold = 10,
    mobileHandles = true,
    fullscreen = false,
    floating = false,
    dockable = false,
    minimizable = false,
    maximizable = false,
    pinnable = false,
    className,
    sx,
    style,
    handleSx,
    controlsSx,
    overlaySx,
    virtualized = false,
    lazy = false,
    memoized = false
  } = props;

  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<ResizeDirection | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [snapElements, setSnapElements] = useState<HTMLElement[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef({ startX: 0, startY: 0, startWidth: 0, startHeight: 0 });
  const animationRef = useRef<number>(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Handle ref forwarding
  useImperativeHandle(ref, () => containerRef.current!, []);

  // Convert size to pixels
  const convertToPixels = useCallback((value: number | string, dimension: 'width' | 'height'): number => {
    if (typeof value === 'number') return value;
    
    if (value.includes('%')) {
      const containerSize = containerRef.current?.parentElement?.getBoundingClientRect();
      const percentage = parseFloat(value) / 100;
      return dimension === 'width' 
        ? (containerSize?.width || 0) * percentage
        : (containerSize?.height || 0) * percentage;
    }
    
    if (value.includes('vw')) {
      return (parseFloat(value) / 100) * window.innerWidth;
    }
    
    if (value.includes('vh')) {
      return (parseFloat(value) / 100) * window.innerHeight;
    }
    
    return parseFloat(value);
  }, []);

  // Get current size in pixels
  const getCurrentSize = useCallback(() => {
    return {
      width: convertToPixels(size.width, 'width'),
      height: convertToPixels(size.height, 'height')
    };
  }, [size, convertToPixels]);

  // Handle resize start
  const handleResizeStart = useCallback((e: React.MouseEvent | React.TouchEvent, direction: ResizeDirection) => {
    e.preventDefault();
    e.stopPropagation();

    const currentSize = getCurrentSize();
    
    resizeRef.current = {
      startX: 'touches' in e ? e.touches[0].clientX : e.clientX,
      startY: 'touches' in e ? e.touches[0].clientY : e.clientY,
      startWidth: currentSize.width,
      startHeight: currentSize.height
    };

    setIsResizing(true);
    setResizeDirection(direction);

    onResizeStart?.(e.nativeEvent as MouseEvent | TouchEvent, direction);
  }, [getCurrentSize, onResizeStart]);

  // Handle resize move
  const handleResizeMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isResizing || !resizeDirection) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    let deltaX = clientX - resizeRef.current.startX;
    let deltaY = clientY - resizeRef.current.startY;

    let newWidth = resizeRef.current.startWidth;
    let newHeight = resizeRef.current.startHeight;

    // Apply direction-specific resizing
    if (resizeDirection.includes('right')) {
      newWidth = resizeRef.current.startWidth + deltaX;
    }
    if (resizeDirection.includes('left')) {
      newWidth = resizeRef.current.startWidth - deltaX;
      deltaX = -deltaX;
    }
    if (resizeDirection.includes('bottom')) {
      newHeight = resizeRef.current.startHeight + deltaY;
    }
    if (resizeDirection.includes('top')) {
      newHeight = resizeRef.current.startHeight - deltaY;
      deltaY = -deltaY;
    }

    // Apply aspect ratio constraints
    if (lockAspectRatio || preserveAspectRatio) {
      const aspectRatio = resizeRef.current.startWidth / resizeRef.current.startHeight;
      if (resizeDirection.includes('right') || resizeDirection.includes('left')) {
        newHeight = newWidth / aspectRatio;
      } else if (resizeDirection.includes('top') || resizeDirection.includes('bottom')) {
        newWidth = newHeight * aspectRatio;
      }
    }

    // Apply custom aspect ratio
    if (aspectRatio === 'custom' && customAspectRatio) {
      if (resizeDirection.includes('right') || resizeDirection.includes('left')) {
        newHeight = newWidth / customAspectRatio;
      } else {
        newWidth = newHeight * customAspectRatio;
      }
    }

    // Apply min/max constraints
    const minW = convertToPixels(minWidth, 'width');
    const maxW = convertToPixels(maxWidth, 'width');
    const minH = convertToPixels(minHeight, 'height');
    const maxH = convertToPixels(maxHeight, 'height');

    newWidth = Math.max(minW, Math.min(maxW, newWidth));
    newHeight = Math.max(minH, Math.min(maxH, newHeight));

    // Apply snapping
    if (snap === 'grid' && snapGrid) {
      newWidth = Math.round(newWidth / snapGrid[0]) * snapGrid[0];
      newHeight = Math.round(newHeight / snapGrid[1]) * snapGrid[1];
    }

    // Check for snap elements
    if (snap === 'element' && snapElements.length > 0) {
      const threshold = snapDistance;
      for (const element of snapElements) {
        const rect = element.getBoundingClientRect();
        const containerRect = containerRef.current?.getBoundingClientRect();
        
        if (containerRect) {
          const elementRelative = {
            left: rect.left - containerRect.left,
            top: rect.top - containerRect.top,
            right: rect.right - containerRect.left,
            bottom: rect.bottom - containerRect.top
          };

          // Snap to element edges
          if (Math.abs(newWidth - elementRelative.left) < threshold) {
            newWidth = elementRelative.left;
            onSnap?.(element);
          }
          if (Math.abs(newWidth - elementRelative.right) < threshold) {
            newWidth = elementRelative.right;
            onSnap?.(element);
          }
          if (Math.abs(newHeight - elementRelative.top) < threshold) {
            newHeight = elementRelative.top;
            onSnap?.(element);
          }
          if (Math.abs(newHeight - elementRelative.bottom) < threshold) {
            newHeight = elementRelative.bottom;
            onSnap?.(element);
          }
        }
      }
    }

    // Check for min/max size reached
    if (newWidth <= minW) onMinSizeReached?.('width');
    if (newWidth >= maxW) onMaxSizeReached?.('width');
    if (newHeight <= minH) onMinSizeReached?.('height');
    if (newHeight >= maxH) onMaxSizeReached?.('height');

    setSize({ width: newWidth, height: newHeight });
    setPosition({ x: deltaX, y: deltaY });

    onResize?.(e, resizeDirection, { width: newWidth, height: newHeight });
  }, [isResizing, resizeDirection, lockAspectRatio, preserveAspectRatio, aspectRatio, customAspectRatio, 
      minWidth, maxWidth, minHeight, maxHeight, snap, snapGrid, snapDistance, snapElements, 
      convertToPixels, onResize, onMinSizeReached, onMaxSizeReached, onSnap]);

  // Handle resize end
  const handleResizeEnd = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isResizing) return;

    const finalSize = getCurrentSize();
    
    setIsResizing(false);
    setResizeDirection(null);
    setPosition({ x: 0, y: 0 });

    onResizeStop?.(e, resizeDirection!, finalSize);
    onSizeChange?.(finalSize);
  }, [isResizing, resizeDirection, getCurrentSize, onResizeStop, onSizeChange]);

  // Add global event listeners
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      document.addEventListener('touchmove', handleResizeMove);
      document.addEventListener('touchend', handleResizeEnd);

      return () => {
        document.removeEventListener('mousemove', handleResizeMove);
        document.removeEventListener('mouseup', handleResizeEnd);
        document.removeEventListener('touchmove', handleResizeMove);
        document.removeEventListener('touchend', handleResizeEnd);
      };
    }
  }, [isResizing, handleResizeMove, handleResizeEnd]);

  // Handle reset
  const handleReset = useCallback(() => {
    setSize({ width: defaultWidth, height: defaultHeight });
    onSizeChange?.({ width: convertToPixels(defaultWidth, 'width'), height: convertToPixels(defaultHeight, 'height') });
  }, [defaultWidth, defaultHeight, convertToPixels, onSizeChange]);

  // Handle maximize/minimize
  const handleMaximize = useCallback(() => {
    if (isMaximized) {
      // Restore previous size
      setIsMaximized(false);
    } else {
      // Maximize to container or viewport
      const containerRect = containerRef.current?.parentElement?.getBoundingClientRect();
      if (containerRect) {
        setSize({ width: containerRect.width - 32, height: containerRect.height - 32 });
        setIsMaximized(true);
      }
    }
  }, [isMaximized]);

  const handleMinimize = useCallback(() => {
    setIsMinimized(!isMinimized);
  }, [isMinimized]);

  // Get handle visibility
  const shouldShowHandles = showHandles && enabled && !isMinimized && (mobileHandles || !isMobile);

  // Get control visibility
  const shouldShowControls = showControls && !isMinimized;

  // Get size display
  const shouldShowSizeDisplay = showSizeDisplay && !isMinimized;

  // Render handles
  const renderHandles = () => {
    if (!shouldShowHandles) return null;

    return (
      <>
        {direction.map((dir) => (
          <ResizeHandle
            key={dir}
            direction={dir}
            isActive={isResizing && resizeDirection === dir}
            isHovered={isHovered}
            onMouseDown={handleResizeStart}
            onTouchStart={handleResizeStart}
            size={handleSize}
            color={handleColor}
            style={handleStyle}
            position={handlePosition}
            enterprise={enterprise}
            renderHandle={renderHandle}
          />
        ))}
      </>
    );
  };

  // Render controls
  const renderControlElements = () => {
    if (!shouldShowControls) return null;

    return (
      <ResizeControls
        controls={controls}
        position={controlPosition}
        alignment={controlAlignment}
        onReset={handleReset}
        onMaximize={handleMaximize}
        onMinimize={handleMinimize}
        enterprise={enterprise}
        renderControls={renderControls}
      />
    );
  };

  // Render presets
  const renderPresetElements = () => {
    if (!showPresets || presets.length === 0) return null;

    return (
      <ResizePresets
        presets={presets}
        onSelect={onPresetSelect}
        currentSize={size}
        enterprise={enterprise}
      />
    );
  };

  // Render size display
  const renderSizeDisplayElement = () => {
    if (!shouldShowSizeDisplay) return null;

    return (
      <SizeDisplay
        width={size.width}
        height={size.height}
        format={sizeDisplayFormat}
        enterprise={enterprise}
      />
    );
  };

  // Render quick actions
  const renderQuickActions = () => {
    if (!showQuickActions || quickActions.length === 0) return null;

    return (
      <Box sx={{ position: 'absolute', top: 8, left: showPresets ? 48 : 8, zIndex: 1002 }}>
        <Stack direction="row" spacing={1}>
          {quickActions.map((action, index) => (
            <Tooltip key={index} title={action.label} arrow>
              <IconButton
                size="small"
                onClick={action.onClick}
                sx={{
                  backgroundColor: enterprise ? 'rgba(255, 255, 255, 0.9)' : 'white',
                  color: action.color || (enterprise ? '#667eea' : 'inherit'),
                  backdropFilter: 'blur(10px)',
                  border: enterprise ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid rgba(0, 0, 0, 0.1)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    backgroundColor: enterprise ? 'white' : 'rgba(255, 255, 255, 0.95)',
                    transform: 'scale(1.05)'
                  }
                }}
              >
                {action.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Stack>
      </Box>
    );
  };

  // Get container styles
  const getContainerStyles = () => {
    const currentSize = getCurrentSize();
    
    return {
      position: mode === 'absolute' ? 'absolute' : 'relative',
      width: currentSize.width,
      height: currentSize.height,
      minWidth: convertToPixels(minWidth, 'width'),
      minHeight: convertToPixels(minHeight, 'height'),
      maxWidth: convertToPixels(maxWidth, 'width'),
      maxHeight: convertToPixels(maxHeight, 'height'),
      backgroundColor: backgroundColor,
      border: showBorder ? `${borderWidth}px solid ${borderColor}` : 'none',
      borderRadius: borderRadius,
      boxShadow: showShadow ? '0 8px 32px rgba(0, 0, 0, 0.12)' : 'none',
      overflow: 'hidden',
      transition: animated && !isResizing 
        ? `all ${animationDuration}ms ${animationEasing}` 
        : 'none',
      cursor: isResizing ? 'grabbing' : 'default',
      ...sx
    };
  };

  // Handle minimized state
  if (isMinimized) {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          background: 'white',
          padding: 2,
          cursor: 'pointer',
          '&:hover': {
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
          }
        }}
        onClick={handleMinimize}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Maximize2 size={20} color="#667eea" />
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Click to restore
          </Typography>
        </Stack>
      </Card>
    );
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        ...getContainerStyles(),
        ...style
      }}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
    >
      {/* Overlay */}
      {showOverlay && isResizing && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
            zIndex: 999,
            ...overlaySx
          }}
        >
          {renderOverlay?.()}
        </Box>
      )}

      {/* Grid */}
      {showGrid && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: `${snapGrid[0]}px ${snapGrid[1]}px`,
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          {renderGrid?.()}
        </Box>
      )}

      {/* Guides */}
      {showGuides && (
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2 }}>
          {renderGuides?.()}
        </Box>
      )}

      {/* Content */}
      <Box sx={{ position: 'relative', zIndex: 3, width: '100%', height: '100%', overflow: 'auto' }}>
        {children}
      </Box>

      {/* Handles */}
      {renderHandles()}

      {/* Controls */}
      {renderControlElements()}

      {/* Presets */}
      {renderPresetElements()}

      {/* Size Display */}
      {renderSizeDisplayElement()}

      {/* Quick Actions */}
      {renderQuickActions()}
    </Box>
  );
});

Resizable.displayName = 'Resizable';

// Specialized resizable components
export const ResizablePanel: React.FC<Omit<ResizableProps, 'mode' | 'direction' | 'handles'>> = (props) => (
  <Resizable
    {...props}
    mode="relative"
    direction={['bottom', 'right']}
    handles="edge"
    showControls={true}
    showSizeDisplay={true}
  />
);

export const ResizableWindow: React.FC<Omit<ResizableProps, 'mode' | 'bounds' | 'showShadow'>> = (props) => (
  <Resizable
    {...props}
    mode="absolute"
    bounds="window"
    showShadow={true}
    showBorder={true}
    showControls={true}
  />
);

export const ResizableCard: React.FC<Omit<ResizableProps, 'variant' | 'showShadow' | 'borderRadius'>> = (props) => (
  <Resizable
    {...props}
    showShadow={true}
    borderRadius={12}
    showControls={true}
    controlPosition="top"
    enterprise={true}
  />
);

export const ResizableDialog: React.FC<Omit<ResizableProps, 'mode' | 'showShadow' | 'showOverlay'>> = (props) => (
  <Resizable
    {...props}
    mode="absolute"
    showShadow={true}
    showOverlay={true}
    showControls={true}
    controlPosition="corner"
    animated={true}
  />
);

export const ResizableSplitPane: React.FC<{
  left: React.ReactNode;
  right: React.ReactNode;
  defaultSplit?: number;
  minSplit?: number;
  maxSplit?: number;
  direction?: 'horizontal' | 'vertical';
}> = ({ left, right, defaultSplit = 50, minSplit = 20, maxSplit = 80, direction = 'horizontal' }) => {
  const [split, setSplit] = useState(defaultSplit);

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%' }}>
      <Box sx={{ 
        [direction === 'horizontal' ? 'width' : 'height']: `${split}%`,
        minWidth: direction === 'horizontal' ? `${minSplit}%` : undefined,
        maxWidth: direction === 'horizontal' ? `${maxSplit}%` : undefined,
        minHeight: direction === 'vertical' ? `${minSplit}%` : undefined,
        maxHeight: direction === 'vertical' ? `${maxSplit}%` : undefined,
        overflow: 'auto'
      }}>
        {left}
      </Box>
      <Resizable
        defaultWidth={direction === 'horizontal' ? 8 : '100%'}
        defaultHeight={direction === 'vertical' ? 8 : '100%'}
        direction={direction === 'horizontal' ? ['left', 'right'] : ['top', 'bottom']}
        handles="edge"
        showControls={false}
        onResize={(_, __, size) => {
          const newSplit = direction === 'horizontal' 
            ? (size.width / (size.width + (containerRef.current?.parentElement?.clientWidth || 0))) * 100
            : (size.height / (size.height + (containerRef.current?.parentElement?.clientHeight || 0))) * 100;
          setSplit(Math.max(minSplit, Math.min(maxSplit, newSplit)));
        }}
      >
        <Box sx={{ 
          width: '100%', 
          height: '100%', 
          backgroundColor: '#667eea',
          cursor: direction === 'horizontal' ? 'col-resize' : 'row-resize',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <GripVertical size={16} color="white" />
        </Box>
      </Resizable>
      <Box sx={{ 
        [direction === 'horizontal' ? 'width' : 'height']: `${100 - split}%`,
        flexGrow: 1,
        overflow: 'auto'
      }}>
        {right}
      </Box>
    </Box>
  );
};

export const ResizableGrid: React.FC<{
  items: React.ReactNode[];
  columns?: number;
  defaultItemSize?: { width: number; height: number };
  minItemSize?: { width: number; height: number };
  maxItemSize?: { width: number; height: number };
}> = ({ items, columns = 3, defaultItemSize = { width: 200, height: 150 }, minItemSize = { width: 100, height: 100 }, maxItemSize = { width: 400, height: 300 } }) => {
  return (
    <Grid container spacing={2}>
      {items.map((item, index) => (
        <Grid item xs={12} sm={6} md={Math.floor(12 / columns)} key={index}>
          <Resizable
            defaultWidth={defaultItemSize.width}
            defaultHeight={defaultItemSize.height}
            minWidth={minItemSize.width}
            minHeight={minItemSize.height}
            maxWidth={maxItemSize.width}
            maxHeight={maxItemSize.height}
            showControls={true}
            showSizeDisplay={true}
            enterprise={true}
          >
            {item}
          </Resizable>
        </Grid>
      ))}
    </Grid>
  );
};

export const EnterpriseResizable: React.FC<ResizableProps> = (props) => (
  <Resizable
    {...props}
    enterprise={true}
    showQuickActions={true}
    showSizeDisplay={true}
    showPresets={true}
    showGrid={true}
    showGuides={true}
    animated={true}
    handleStyle="rounded"
    handleColor="#667eea"
    borderColor="#667eea"
    borderRadius={12}
  />
);

export default Resizable;
