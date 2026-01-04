import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
  Box,
  Paper,
  Divider,
  Typography,
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
  Grid,
  Tooltip,
  LinearProgress,
  CircularProgress,
  Card,
  CardContent
} from '@mui/material';
import {
  Minus,
  GripVertical,
  GripHorizontal,
  MoreVertical,
  MoreHorizontal,
  Settings,
  RotateCcw,
  Expand,
  Compress,
  Maximize2,
  Minimize2,
  Palette,
  Layout,
  Grid3,
  Grid2x2,
  Columns,
  Rows,
  Line,
  BarChart3,
  Activity,
  Zap,
  Clock,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Percent,
  Hash,
  AtSign,
  Paperclip,
  ExternalLink,
  Share2,
  Save,
  Download,
  Upload,
  RefreshCw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Eye,
  EyeOff,
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
  Plus,
  Minus,
  X,
  Check,
  Home,
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
  Settings2,
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
  Save,
  Backup,
  Restore,
  Sync,
  Share,
  Export,
  Import,
  Transfer,
  Move,
  Copy,
  Paste,
  Cut,
  Delete,
  Remove,
  Clear,
  Reset,
  Undo,
  Redo,
  Refresh,
  Reload,
  Update,
  Upgrade,
  Install,
  Uninstall,
  Setup,
  Configure,
  Customize2,
  Personalize2,
  Theme2,
  Style,
  Design,
  Layout2,
  Grid22,
  Flex,
  Align,
  Justify,
  Center2,
  Left2,
  Right2,
  Up2,
  Down2,
  Top2,
  Bottom2,
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

export type SeparatorVariant = 'default' | 'dashed' | 'dotted' | 'double' | 'gradient' | 'shadow' | 'glass' | 'minimal';
export type SeparatorOrientation = 'horizontal' | 'vertical';
export type SeparatorAlignment = 'left' | 'center' | 'right' | 'stretch';
export type SeparatorStyle = 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
export type SeparatorThickness = 'hairline' | 'thin' | 'medium' | 'thick' | 'extra-thick';
export type SeparatorColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gradient' | 'custom';

export interface SeparatorProps {
  // Core props
  orientation?: SeparatorOrientation;
  variant?: SeparatorVariant;
  style?: SeparatorStyle;
  thickness?: SeparatorThickness;
  color?: SeparatorColor;
  customColor?: string;
  
  // Dimensions
  width?: number | string;
  height?: number | string;
  length?: number | string;
  weight?: number;
  
  // Alignment and positioning
  alignment?: SeparatorAlignment;
  spacing?: number | string;
  margin?: number | string;
  padding?: number | string;
  
  // Visual enhancements
  gradient?: boolean;
  gradientColors?: [string, string, ...string[]];
  gradientDirection?: 'horizontal' | 'vertical' | 'diagonal' | 'radial';
  gradientIntensity?: number;
  shadow?: boolean;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffset?: [number, number];
  shadowSpread?: number;
  shadowIntensity?: 'light' | 'medium' | 'strong' | 'enterprise';
  
  // Content and labels
  text?: string;
  subtext?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'center' | 'right' | 'top' | 'bottom';
  showIcon?: boolean;
  showText?: boolean;
  textAlignment?: 'left' | 'center' | 'right';
  textColor?: string;
  textSize?: number | string;
  textWeight?: number | string;
  
  // Decorative elements
  decorative?: boolean;
  decorativeStyle?: 'dots' | 'stars' | 'hearts' | 'arrows' | 'custom';
  decorativeCount?: number;
  decorativeSpacing?: number;
  decorativeColor?: string;
  decorativeSize?: number;
  
  // Interactive features
  interactive?: boolean;
  clickable?: boolean;
  hoverable?: boolean;
  hoverEffect?: 'grow' | 'shrink' | 'glow' | 'pulse' | 'custom';
  onClick?: () => void;
  onHover?: () => void;
  onLeave?: () => void;
  
  // Animation and transitions
  animated?: boolean;
  animationType?: 'fade' | 'slide' | 'zoom' | 'pulse' | 'custom';
  animationDuration?: number;
  animationDelay?: number;
  animationEasing?: string;
  animationIteration?: number | 'infinite';
  
  // Responsive behavior
  responsive?: boolean;
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  responsiveBehavior?: 'hide' | 'show' | 'change' | 'stack';
  responsiveVariant?: SeparatorVariant;
  responsiveThickness?: SeparatorThickness;
  
  // Accessibility
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  role?: string;
  focusable?: boolean;
  tabIndex?: number;
  
  // Enterprise features
  enterprise?: boolean;
  showMetrics?: boolean;
  metrics?: {
    length?: number;
    thickness?: number;
    colorValue?: string;
    styleValue?: string;
  };
  showQuickStats?: boolean;
  quickStats?: Array<{
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    trend?: 'up' | 'down' | 'stable';
  }>;
  showPerformanceData?: boolean;
  performanceData?: {
    renderTime?: number;
    animationTime?: number;
    interactionCount?: number;
  };
  
  // Special modes
  divider?: boolean;
  section?: boolean;
  page?: boolean;
  chapter?: boolean;
  part?: boolean;
  
  // Custom rendering
  renderContent?: () => React.ReactNode;
  renderDecorative?: () => React.ReactNode;
  renderMetrics?: () => React.ReactNode;
  renderQuickStats?: () => React.ReactNode;
  
  // Styling overrides
  containerSx?: any;
  lineSx?: any;
  textSx?: any;
  decorativeSx?: any;
  metricsSx?: any;
  
  // Class names
  className?: string;
  lineClassName?: string;
  textClassName?: string;
  decorativeClassName?: string;
  
  // Style overrides
  style?: React.CSSProperties;
  lineStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  decorativeStyle?: React.CSSProperties;
}

interface SeparatorState {
  isHovered: boolean;
  isClicked: boolean;
  isAnimated: boolean;
  metricsVisible: boolean;
  quickStatsVisible: boolean;
}

interface DecorativeElement {
  id: string;
  type: string;
  position: number;
  rotation: number;
  scale: number;
  opacity: number;
}

// Enterprise color schemes
const getEnterpriseColors = (color: SeparatorColor) => {
  const colors = {
    primary: {
      main: '#667eea',
      light: '#764ba2',
      dark: '#5a67d8',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      background: 'rgba(102, 126, 234, 0.1)',
      hover: 'rgba(102, 126, 234, 0.2)',
      shadow: 'rgba(102, 126, 234, 0.3)'
    },
    secondary: {
      main: '#f093fb',
      light: '#f5576c',
      dark: '#ec4899',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      background: 'rgba(240, 147, 251, 0.1)',
      hover: 'rgba(240, 147, 251, 0.2)',
      shadow: 'rgba(240, 147, 251, 0.3)'
    },
    success: {
      main: '#43e97b',
      light: '#38f9d7',
      dark: '#28a745',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      background: 'rgba(67, 233, 123, 0.1)',
      hover: 'rgba(67, 233, 123, 0.2)',
      shadow: 'rgba(67, 233, 123, 0.3)'
    },
    warning: {
      main: '#ffa726',
      light: '#ff7043',
      dark: '#f57c00',
      gradient: 'linear-gradient(135deg, #ffa726 0%, #ff7043 100%)',
      background: 'rgba(255, 167, 38, 0.1)',
      hover: 'rgba(255, 167, 38, 0.2)',
      shadow: 'rgba(255, 167, 38, 0.3)'
    },
    error: {
      main: '#f44336',
      light: '#e91e63',
      dark: '#d32f2f',
      gradient: 'linear-gradient(135deg, #f44336 0%, #e91e63 100%)',
      background: 'rgba(244, 67, 54, 0.1)',
      hover: 'rgba(244, 67, 54, 0.2)',
      shadow: 'rgba(244, 67, 54, 0.3)'
    },
    info: {
      main: '#4facfe',
      light: '#00f2fe',
      dark: '#2196f3',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      background: 'rgba(79, 172, 254, 0.1)',
      hover: 'rgba(79, 172, 254, 0.2)',
      shadow: 'rgba(79, 172, 254, 0.3)'
    },
    gradient: {
      main: '#667eea',
      light: '#764ba2',
      dark: '#5a67d8',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      background: 'rgba(102, 126, 234, 0.1)',
      hover: 'rgba(102, 126, 234, 0.2)',
      shadow: 'rgba(102, 126, 234, 0.3)'
    }
  };
  return colors[color] || colors.primary;
};

// Thickness mapping
const getThicknessStyles = (thickness: SeparatorThickness) => {
  const styles = {
    hairline: { width: 0.5, height: 0.5 },
    thin: { width: 1, height: 1 },
    medium: { width: 2, height: 2 },
    thick: { width: 4, height: 4 },
    'extra-thick': { width: 8, height: 8 }
  };
  return styles[thickness] || styles.medium;
};

// Style mapping
const getBorderStyles = (style: SeparatorStyle) => {
  const styles = {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted',
    double: 'double',
    groove: 'groove',
    ridge: 'ridge',
    inset: 'inset',
    outset: 'outset'
  };
  return styles[style] || styles.solid;
};

// Variant-specific styles
const getVariantStyles = (variant: SeparatorVariant, color: string) => {
  const baseStyles = {
    default: {
      backgroundColor: color,
      border: 'none'
    },
    dashed: {
      background: `repeating-linear-gradient(90deg, ${color} 0px, ${color} 8px, transparent 8px, transparent 16px)`,
      border: 'none'
    },
    dotted: {
      background: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
      backgroundSize: '4px 4px',
      border: 'none'
    },
    double: {
      background: `linear-gradient(to right, ${color} 0%, ${color} 45%, transparent 45%, transparent 55%, ${color} 55%, ${color} 100%)`,
      border: 'none'
    },
    gradient: {
      background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
      border: 'none'
    },
    shadow: {
      backgroundColor: color,
      boxShadow: `0 2px 8px ${alpha(color, 0.3)}`,
      border: 'none'
    },
    glass: {
      backgroundColor: alpha(color, 0.3),
      backdropFilter: 'blur(10px)',
      border: `1px solid ${alpha(color, 0.5)}`
    },
    minimal: {
      backgroundColor: alpha(color, 0.5),
      border: 'none'
    }
  };
  return baseStyles[variant] || baseStyles.default;
};

// Decorative elements generator
const generateDecorativeElements = (
  style: string,
  count: number,
  color: string,
  size: number
): DecorativeElement[] => {
  const elements: DecorativeElement[] = [];
  
  for (let i = 0; i < count; i++) {
    const position = (i / (count - 1)) * 100;
    const rotation = Math.random() * 360;
    const scale = 0.8 + Math.random() * 0.4;
    const opacity = 0.6 + Math.random() * 0.4;
    
    elements.push({
      id: `decorative-${i}`,
      type: style,
      position,
      rotation,
      scale,
      opacity
    });
  }
  
  return elements;
};

// Render decorative element
const renderDecorativeElement = (element: DecorativeElement, color: string, size: number) => {
  const baseStyle = {
    position: 'absolute' as const,
    left: `${element.position}%`,
    top: '50%',
    transform: `translate(-50%, -50%) rotate(${element.rotation}deg) scale(${element.scale})`,
    opacity: element.opacity,
    color: color,
    fontSize: size
  };

  switch (element.type) {
    case 'dots':
      return <Box sx={{ ...baseStyle, width: size, height: size, borderRadius: '50%', backgroundColor: color }} />;
    case 'stars':
      return <Star size={size} style={baseStyle} />;
    case 'hearts':
      return <Heart size={size} style={baseStyle} />;
    case 'arrows':
      return <ChevronRight size={size} style={baseStyle} />;
    default:
      return <Box sx={{ ...baseStyle, width: size, height: size, backgroundColor: color }} />;
  }
};

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>((props, ref) => {
  const {
    // Core props
    orientation = 'horizontal',
    variant = 'default',
    style = 'solid',
    thickness = 'medium',
    color = 'primary',
    customColor,
    
    // Dimensions
    width: propWidth,
    height: propHeight,
    length,
    weight = 1,
    
    // Alignment and positioning
    alignment = 'stretch',
    spacing = 2,
    margin = 0,
    padding = 0,
    
    // Visual enhancements
    gradient = false,
    gradientColors = ['#667eea', '#764ba2'],
    gradientDirection = 'horizontal',
    gradientIntensity = 1,
    shadow = false,
    shadowColor = '#000',
    shadowBlur = 8,
    shadowOffset = [0, 4],
    shadowSpread = 0,
    shadowIntensity = 'medium',
    
    // Content and labels
    text,
    subtext,
    icon,
    iconPosition = 'center',
    showIcon = false,
    showText = false,
    textAlignment = 'center',
    textColor,
    textSize = '14px',
    textWeight = 600,
    
    // Decorative elements
    decorative = false,
    decorativeStyle = 'dots',
    decorativeCount = 5,
    decorativeSpacing = 20,
    decorativeColor,
    decorativeSize = 8,
    
    // Interactive features
    interactive = false,
    clickable = false,
    hoverable = false,
    hoverEffect = 'grow',
    onClick,
    onHover,
    onLeave,
    
    // Animation and transitions
    animated = false,
    animationType = 'fade',
    animationDuration = 300,
    animationDelay = 0,
    animationEasing = 'ease-in-out',
    animationIteration = 1,
    
    // Responsive behavior
    responsive = false,
    breakpoint = 'md',
    responsiveBehavior = 'change',
    responsiveVariant,
    responsiveThickness,
    
    // Accessibility
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    role = 'separator',
    focusable = false,
    tabIndex = -1,
    
    // Enterprise features
    enterprise = false,
    showMetrics = false,
    metrics = {},
    showQuickStats = false,
    quickStats = [],
    showPerformanceData = false,
    performanceData = {},
    
    // Special modes
    divider = false,
    section = false,
    page = false,
    chapter = false,
    part = false,
    
    // Custom rendering
    renderContent,
    renderDecorative,
    renderMetrics,
    renderQuickStats,
    
    // Styling overrides
    containerSx,
    lineSx,
    textSx,
    decorativeSx,
    metricsSx,
    
    // Class names
    className,
    lineClassName,
    textClassName,
    decorativeClassName,
    
    // Style overrides
    style,
    lineStyle,
    textStyle,
    decorativeStyle
  } = props;

  const [state, setState] = useState<SeparatorState>({
    isHovered: false,
    isClicked: false,
    isAnimated: false,
    metricsVisible: false,
    quickStatsVisible: false
  });

  const separatorRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoint));

  const colors = getEnterpriseColors(color);
  const thicknessStyles = getThicknessStyles(thickness);
  const borderStyle = getBorderStyles(style);
  const variantStyles = getVariantStyles(variant, customColor || colors.main);

  // Calculate dimensions
  const getDimensions = () => {
    const isHorizontal = orientation === 'horizontal';
    const baseLength = length || (isHorizontal ? '100%' : 'auto');
    
    return {
      width: isHorizontal ? (propWidth || baseLength) : thicknessStyles.width,
      height: isHorizontal ? thicknessStyles.height : (propHeight || baseLength)
    };
  };

  const dimensions = getDimensions();

  // Get responsive styles
  const getResponsiveStyles = () => {
    if (!responsive || !isMobile) return {};

    const behaviors = {
      hide: { display: 'none' },
      show: {},
      change: {
        variant: responsiveVariant ? getVariantStyles(responsiveVariant, customColor || colors.main) : variantStyles,
        thickness: responsiveThickness ? getThicknessStyles(responsiveThickness) : thicknessStyles
      },
      stack: { flexDirection: 'column' as const }
    };

    return behaviors[responsiveBehavior] || {};
  };

  const responsiveStyles = getResponsiveStyles();

  // Handle interactions
  const handleClick = () => {
    if (!clickable) return;
    
    setState(prev => ({ ...prev, isClicked: true }));
    setTimeout(() => setState(prev => ({ ...prev, isClicked: false })), 200);
    
    if (onClick) onClick();
  };

  const handleMouseEnter = () => {
    if (!hoverable) return;
    
    setState(prev => ({ ...prev, isHovered: true }));
    if (onHover) onHover();
  };

  const handleMouseLeave = () => {
    if (!hoverable) return;
    
    setState(prev => ({ ...prev, isHovered: false }));
    if (onLeave) onLeave();
  };

  // Get hover effects
  const getHoverStyles = () => {
    if (!state.isHovered) return {};

    const effects = {
      grow: { transform: 'scale(1.05)' },
      shrink: { transform: 'scale(0.95)' },
      glow: { 
        boxShadow: `0 0 20px ${alpha(customColor || colors.main, 0.5)}`,
        filter: 'brightness(1.2)'
      },
      pulse: { 
        animation: 'pulse 1s infinite',
        '@keyframes pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        }
      },
      custom: {}
    };

    return effects[hoverEffect] || effects.custom;
  };

  const hoverStyles = getHoverStyles();

  // Get animation styles
  const getAnimationStyles = () => {
    if (!animated) return {};

    const animations = {
      fade: {
        animation: `fadeIn ${animationDuration}ms ${animationEasing} ${animationDelay}ms ${animationIteration === 'infinite' ? 'infinite' : `${animationIteration}`}`
      },
      slide: {
        animation: `slideIn ${animationDuration}ms ${animationEasing} ${animationDelay}ms ${animationIteration === 'infinite' ? 'infinite' : `${animationIteration}`}`
      },
      zoom: {
        animation: `zoomIn ${animationDuration}ms ${animationEasing} ${animationDelay}ms ${animationIteration === 'infinite' ? 'infinite' : `${animationIteration}`}`
      },
      pulse: {
        animation: `pulse ${animationDuration}ms ${animationEasing} ${animationDelay}ms ${animationIteration === 'infinite' ? 'infinite' : `${animationIteration}`}`
      },
      custom: {}
    };

    return animations[animationType] || animations.custom;
  };

  const animationStyles = getAnimationStyles();

  // Generate decorative elements
  const decorativeElements = decorative ? generateDecorativeElements(
    decorativeStyle,
    decorativeCount,
    decorativeColor || colors.main,
    decorativeSize
  ) : [];

  // Render metrics
  const renderMetricsComponent = () => {
    if (renderMetrics) return renderMetrics();

    return (
      <Box sx={{ position: 'absolute', top: -8, right: -8, zIndex: 10 }}>
        <Chip
          label={`${metrics.length || dimensions.width}x${thickness}`}
          size="small"
          sx={{
            backgroundColor: alpha(colors.main, 0.9),
            color: 'white',
            fontSize: '10px',
            fontWeight: 600
          }}
        />
      </Box>
    );
  };

  // Render quick stats
  const renderQuickStatsComponent = () => {
    if (renderQuickStats) return renderQuickStats();

    return (
      <Box
        sx={{
          position: 'absolute',
          [orientation === 'horizontal' ? 'bottom' : 'right']: -48,
          [orientation === 'horizontal' ? 'left' : 'top']: '50%',
          transform: orientation === 'horizontal' ? 'translateX(-50%)' : 'translateY(-50%)',
          zIndex: 10
        }}
      >
        <Grid container spacing={0.5}>
          {quickStats.map((stat, index) => (
            <Grid item xs={12} key={index}>
              <Card elevation={0} sx={{ backgroundColor: alpha(colors.background, 0.9), borderRadius: 1 }}>
                <CardContent sx={{ p: 0.5, textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: colors.main }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontSize: '10px' }}>
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  // Render performance data
  const renderPerformanceDataComponent = () => {
    return (
      <Box
        sx={{
          position: 'absolute',
          [orientation === 'horizontal' ? 'top' : 'left']: -32,
          [orientation === 'horizontal' ? 'left' : 'top']: '50%',
          transform: orientation === 'horizontal' ? 'translateX(-50%)' : 'translateY(-50%)',
          zIndex: 10
        }}
      >
        <Typography variant="caption" sx={{ color: colors.main, fontWeight: 600 }}>
          {performanceData.renderTime}ms
        </Typography>
      </Box>
    );
  };

  // Get alignment styles
  const getAlignmentStyles = () => {
    const alignments = {
      left: { justifyContent: 'flex-start', textAlign: 'left' as const },
      center: { justifyContent: 'center', textAlign: 'center' as const },
      right: { justifyContent: 'flex-end', textAlign: 'right' as const },
      stretch: { justifyContent: 'space-between', textAlign: 'center' as const }
    };
    return alignments[alignment] || alignments.center;
  };

  const alignmentStyles = getAlignmentStyles();

  // Get shadow styles
  const getShadowStyles = () => {
    if (!shadow) return {};

    const intensities = {
      light: `0 2px 4px ${alpha(shadowColor, 0.1)}`,
      medium: `0 4px 12px ${alpha(shadowColor, 0.15)}`,
      strong: `0 8px 24px ${alpha(shadowColor, 0.2)}`,
      enterprise: `${shadowOffset[0]}px ${shadowOffset[1]}px ${shadowBlur}px ${shadowSpread}px ${alpha(shadowColor, 0.25)}`
    };

    return { boxShadow: intensities[shadowIntensity] || intensities.medium };
  };

  const shadowStyles = getShadowStyles();

  // Get gradient styles
  const getGradientStyles = () => {
    if (!gradient) return {};

    const directions = {
      horizontal: `linear-gradient(to right, ${gradientColors.join(', ')})`,
      vertical: `linear-gradient(to bottom, ${gradientColors.join(', ')})`,
      diagonal: `linear-gradient(45deg, ${gradientColors.join(', ')})`,
      radial: `radial-gradient(circle, ${gradientColors.join(', ')})`
    };

    return {
      background: directions[gradientDirection] || directions.horizontal,
      opacity: gradientIntensity
    };
  };

  const gradientStyles = getGradientStyles();

  // Main content rendering
  const renderContentComponent = () => {
    if (renderContent) return renderContent();

    return (
      <Box sx={{ position: 'relative', width: '100%', height: '100%', ...alignmentStyles }}>
        {/* Main separator line */}
        <Box
          ref={separatorRef}
          className={lineClassName}
          sx={{
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: customColor || colors.main,
            borderStyle: borderStyle,
            borderWidth: `${weight}px`,
            borderColor: customColor || colors.main,
            borderRadius: orientation === 'horizontal' ? '2px' : '50%',
            ...variantStyles,
            ...gradientStyles,
            ...shadowStyles,
            ...hoverStyles,
            ...animationStyles,
            ...responsiveStyles,
            ...lineSx,
            ...lineStyle,
            cursor: clickable ? 'pointer' : 'default',
            transition: 'all 0.2s ease',
            position: 'relative'
          }}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          role={role}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          tabIndex={focusable ? tabIndex : -1}
        />

        {/* Decorative elements */}
        {decorative && decorativeElements.map(element => 
          renderDecorativeElement(element, decorativeColor || colors.main, decorativeSize)
        )}

        {/* Text content */}
        {showText && text && (
          <Box
            className={textClassName}
            sx={{
              position: 'absolute',
              [iconPosition === 'center' ? 'top' : 'bottom']: '50%',
              [iconPosition === 'center' ? 'left' : 'right']: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              px: 2,
              py: 0.5,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              zIndex: 2,
              ...textSx,
              ...textStyle
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              {showIcon && icon && iconPosition === 'left' && (
                <Box sx={{ color: textColor || colors.main }}>
                  {icon}
                </Box>
              )}
              
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: textWeight,
                    fontSize: textSize,
                    color: textColor || colors.main,
                    textAlign: textAlignment
                  }}
                >
                  {text}
                </Typography>
                
                {subtext && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mt: 0.5 }}
                  >
                    {subtext}
                  </Typography>
                )}
              </Box>
              
              {showIcon && icon && iconPosition === 'right' && (
                <Box sx={{ color: textColor || colors.main }}>
                  {icon}
                </Box>
              )}
            </Stack>
          </Box>
        )}

        {/* Enterprise metrics */}
        {enterprise && showMetrics && renderMetricsComponent()}

        {/* Quick stats */}
        {enterprise && showQuickStats && renderQuickStatsComponent()}

        {/* Performance data */}
        {enterprise && showPerformanceData && renderPerformanceDataComponent()}
      </Box>
    );
  };

  return (
    <Box
      ref={ref}
      className={className}
      sx={{
        width: orientation === 'horizontal' ? '100%' : dimensions.width,
        height: orientation === 'vertical' ? '100%' : dimensions.height,
        margin: margin,
        padding: padding,
        display: 'flex',
        flexDirection: orientation === 'horizontal' ? 'column' : 'row',
        alignItems: alignment === 'stretch' ? 'stretch' : 'center',
        justifyContent: alignment === 'stretch' ? 'space-between' : 'center',
        position: 'relative',
        ...containerSx,
        ...style
      }}
    >
      {renderContentComponent()}
    </Box>
  );
});

Separator.displayName = 'Separator';

export { Separator };
export type { 
  SeparatorProps, 
  SeparatorState, 
  SeparatorVariant, 
  SeparatorOrientation, 
  SeparatorAlignment, 
  SeparatorStyle, 
  SeparatorThickness, 
  SeparatorColor,
  DecorativeElement 
};
