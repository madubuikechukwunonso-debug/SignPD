import React, { useState, useEffect, useRef } from 'react';
import {
  Tooltip as MuiTooltip,
  Box,
  Typography,
  Stack,
  Chip,
  Avatar,
  LinearProgress,
  alpha,
  Card,
  CardContent,
  Grid,
  IconButton,
  Divider,
  Badge,
  Fade,
  Zoom,
  Slide,
  Grow,
  Collapse,
  FadeProps,
  ZoomProps,
  SlideProps,
  GrowProps,
  CollapseProps
} from '@mui/material';
import {
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Shield,
  Users,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BarChart3,
  PieChart,
  Settings,
  Filter,
  Search,
  Eye,
  EyeOff,
  Download,
  Upload,
  Link,
  ExternalLink,
  Maximize2,
  Minimize2,
  Copy,
  Scissors,
  RotateCcw,
  RefreshCw,
  Star,
  Heart,
  Bookmark,
  Share2,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  Lightbulb,
  Warning,
  ErrorOutline,
  Check,
  Close,
  Play,
  Pause,
  Stop,
  SkipNext,
  SkipPrevious,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Bluetooth,
  BluetoothOff,
  BatteryFull,
  BatteryLow,
  BatteryAlert,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  Thermometer,
  Gauge,
  Speedometer,
  ActivitySquare,
  TrendingUpDown,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CornerUpLeft,
  CornerUpRight,
  CornerDownLeft,
  CornerDownRight,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUp,
  ChevronsDown,
  ChevronsLeft,
  ChevronsRight,
  FirstPage,
  LastPage,
  MoreVert,
  MoreHoriz,
  Menu,
  CloseMenu,
  Apps,
  Dashboard,
  Grid,
  List,
  Table,
  ChartBar,
  ChartLine,
  ChartPie,
  ChartArea,
  ChartScatter,
  ChartRadar,
  Database,
  Server,
  CloudServer,
  HardDrive,
  MemoryStick,
  Cpu,
  Monitor,
  Printer,
  Scanner,
  Camera,
  Video,
  Image,
  Music,
  Mic,
  Speaker,
  Headphones,
  Radio,
  Tv,
  Gamepad,
  Mouse,
  Keyboard,
  Touchpad,
  Fingerprint,
  Face,
  Voice,
  Iris,
  Hand,
  Footprints,
  Accessibility,
  Wheelchair,
  Braille,
  SignLanguage,
  HearingAid,
  Glasses,
  Sunglasses,
  Watch,
  ClockTime,
  Timer,
  Stopwatch,
  Hourglass,
  CalendarDays,
  CalendarRange,
  CalendarCheck,
  CalendarX,
  CalendarPlus,
  CalendarMinus,
  MailOpen,
  MailCheck,
  MailX,
  MailPlus,
  MailMinus,
  MailWarning,
  MailQuestion,
  MailSearch,
  MailLock,
  MailUnlock,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  PhoneOff,
  PhoneForwarded,
  Voicemail,
  MessageSquare,
  MessageCircle,
  MessageText,
  MessageImage,
  MessageFile,
  MessageVideo,
  MessageAudio,
  MessageCode,
  MessageQuote,
  MessageSmile,
  MessageHeart,
  MessageStar,
  MessageThumbsUp,
  MessageThumbsDown,
  MessageCheck,
  MessageX,
  MessagePlus,
  MessageMinus,
  MessageWarning,
  MessageQuestion,
  MessageSearch,
  MessageLock,
  MessageUnlock,
  Send,
  SendHorizontal,
  PaperPlane,
  PaperPlaneRight,
  PaperPlaneTop,
  Archive,
  ArchiveX,
  ArchiveRestore,
  Inbox,
  InboxFull,
  Outbox,
  Trash,
  Trash2,
  TrashRestore,
  TrashX,
  Folder,
  FolderOpen,
  FolderPlus,
  FolderMinus,
  FolderMove,
  FolderCopy,
  FolderArchive,
  FolderCheck,
  FolderX,
  FolderLock,
  FolderUnlock,
  FolderSearch,
  File,
  FileText,
  FileCode,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FilePdf,
  FileWord,
  FileExcel,
  FilePowerpoint,
  FileJson,
  FileXml,
  FileCsv,
  FileMarkdown,
  FileType,
  FilePlus,
  FileMinus,
  FileMove,
  FileCopy,
  FileArchive,
  FileCheck,
  FileX,
  FileLock,
  FileUnlock,
  FileSearch,
  FileTextIcon,
  FileCodeIcon,
  FileImageIcon,
  FileVideoIcon,
  FileAudioIcon,
  FileArchiveIcon,
  FilePdfIcon,
  FileWordIcon,
  FileExcelIcon,
  FilePowerpointIcon,
  FileJsonIcon,
  FileXmlIcon,
  FileCsvIcon,
  FileMarkdownIcon,
  FileTypeIcon,
  Pen,
  PenTool,
  Pencil,
  PencilRuler,
  Eraser,
  Brush,
  Paintbrush,
  PaletteIcon,
  PaintBucket,
  SprayCan,
  Stamp,
  Clipboard,
  ClipboardCopy,
  ClipboardPaste,
  ClipboardCheck,
  ClipboardX,
  ClipboardList,
  ClipboardEdit,
  ClipboardSignature,
  ClipboardType,
  ScissorsIcon,
  Cut,
  CopyIcon,
  CopyCheck,
  CopyX,
  CopyPlus,
  CopyMinus,
  Paste,
  ClipboardPasteIcon,
  HighlighterIcon,
  Marker,
  TextCursor,
  TextCursorInput,
  TextSelection,
  TextQuoteIcon,
  TextSearch,
  TextHighlight,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  ListIcon,
  ListOrderedIcon,
  ListChecks,
  ListTodo,
  ListCollapse,
  ListExpand,
  ListStart,
  ListEnd,
  ListTree,
  ListVideo,
  Indent,
  Outdent,
  IndentIncrease,
  IndentDecrease,
  Space,
  SpaceHorizontal,
  SpaceVertical,
  WrapText,
  WrapTextIcon,
  Square,
  Circle,
  Triangle,
  Diamond,
  Hexagon,
  Octagon,
  Pentagon,
  Heptagon,
  Nonagon,
  Decagon,
  Dodecagon,
  StarIcon,
  HeartIcon,
  BookmarkIcon,
  BookmarkPlus,
  BookmarkMinus,
  BookmarkCheck,
  BookmarkX,
  Flag,
  FlagOff,
  FlagTriangleLeft,
  FlagTriangleRight,
  Trophy,
  TrophyIcon,
  Medal,
  MedalIcon,
  Award,
  AwardIcon,
  Certificate,
  CertificateIcon,
  Ribbon,
  RibbonIcon,
  TargetIcon,
  TargetIcon2,
  Goal,
  GoalIcon,
  CheckIcon,
  CheckCircleIcon,
  CheckSquare,
  CheckSquare2,
  XIcon,
  XCircleIcon,
  XSquare,
  Plus,
  PlusCircle,
  PlusSquare,
  Minus,
  MinusCircle,
  MinusSquare,
  Divide,
  DivideCircle,
  DivideSquare,
  Multiply,
  MultiplyCircle,
  MultiplySquare,
  Power,
  PowerCircle,
  PowerSquare,
  SquareRoot,
  SquareRoot2,
  Pi,
  Sigma,
  Omega,
  Infinity,
  PercentIcon,
  PercentCircle,
  PercentSquare,
  Ratio,
  Fraction,
  FunctionSquare,
  FunctionCircle,
  SigmaSquare,
  OmegaSquare,
  PiSquare,
  InfinitySquare,
  Absolute,
  AbsoluteValue,
  Factorial,
  Integral,
  Derivative,
  Limit,
  Sum,
  Product,
  Union,
  Intersection,
  Subset,
  Superset,
  Element,
  NotElement,
  ForAll,
  ThereExists,
  Therefore,
  Because,
  Approximate,
  NotEqual,
  LessThan,
  GreaterThan,
  LessThanOrEqual,
  GreaterThanOrEqual,
  MuchLessThan,
  MuchGreaterThan,
  Congruent,
  NotCongruent,
  Similar,
  NotSimilar,
  PlusMinus,
  MinusPlus,
  Proportional,
  NotProportional,
  Perpendicular,
  Parallel,
  NotParallel,
  Angle,
  RightAngle,
  AcuteAngle,
  ObtuseAngle,
  StraightAngle,
  ReflexAngle,
  FullAngle,
  ComplementaryAngle,
  SupplementaryAngle,
  AdjacentAngle,
  VerticalAngle,
  AlternateAngle,
  CorrespondingAngle,
  InteriorAngle,
  ExteriorAngle,
  CentralAngle,
  InscribedAngle,
  Arc,
  Chord,
  Radius,
  Diameter,
  Circumference,
  Sector,
  Segment,
  Tangent,
  Secant,
  Cosecant,
  Cotangent,
  Sine,
  Cosine,
  TangentLine,
  SecantLine,
  Vector,
  Vector2,
  Vector3,
  Matrix,
  Determinant,
  Eigenvalue,
  Eigenvector,
  Transpose,
  Inverse,
  Identity,
  Zero,
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  ZeroCircle,
  OneCircle,
  TwoCircle,
  ThreeCircle,
  FourCircle,
  FiveCircle,
  SixCircle,
  SevenCircle,
  EightCircle,
  NineCircle,
  TenCircle,
  ZeroSquare,
  OneSquare,
  TwoSquare,
  ThreeSquare,
  FourSquare,
  FiveSquare,
  SixSquare,
  SevenSquare,
  EightSquare,
  NineSquare,
  TenSquare,
  Roman1,
  Roman2,
  Roman3,
  Roman4,
  Roman5,
  Roman6,
  Roman7,
  Roman8,
  Roman9,
  Roman10,
  Alpha,
  Beta,
  Gamma,
  Delta,
  Epsilon,
  Zeta,
  Eta,
  Theta,
  Iota,
  Kappa,
  Lambda,
  Mu,
  Nu,
  Xi,
  Omicron,
  Pi,
  Rho,
  Sigma,
  Tau,
  Upsilon,
  Phi,
  Chi,
  Psi,
  Omega,
  AlphaUpper,
  BetaUpper,
  GammaUpper,
  DeltaUpper,
  EpsilonUpper,
  ZetaUpper,
  EtaUpper,
  ThetaUpper,
  IotaUpper,
  KappaUpper,
  LambdaUpper,
  MuUpper,
  NuUpper,
  XiUpper,
  OmicronUpper,
  PiUpper,
  RhoUpper,
  SigmaUpper,
  TauUpper,
  UpsilonUpper,
  PhiUpper,
  ChiUpper,
  PsiUpper,
  OmegaUpper
} from 'lucide-react';

interface TooltipProps {
  title: string | React.ReactNode;
  children: React.ReactElement;
  placement?: 'bottom-end' | 'bottom-start' | 'bottom' | 'left-end' | 'left-start' | 'left' | 'right-end' | 'right-start' | 'right' | 'top-end' | 'top-start' | 'top';
  arrow?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  disableHoverListener?: boolean;
  disableFocusListener?: boolean;
  disableTouchListener?: boolean;
  enterDelay?: number;
  leaveDelay?: number;
  enterNextDelay?: number;
  enterTouchDelay?: number;
  leaveTouchDelay?: number;
  followCursor?: boolean;
  interactive?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  minWidth?: number;
  variant?: 'default' | 'rich' | 'card' | 'menu' | 'analytics' | 'chart' | 'comparison' | 'tutorial' | 'onboarding';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  actions?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
    variant?: 'text' | 'outlined' | 'contained';
  }>;
  data?: any;
  showProgress?: boolean;
  progressValue?: number;
  showTrend?: boolean;
  trendDirection?: 'up' | 'down' | 'neutral';
  trendValue?: number;
  showAnalytics?: boolean;
  analytics?: {
    views: number;
    clicks: number;
    engagement: number;
    conversion: number;
  };
  animation?: 'fade' | 'zoom' | 'slide' | 'grow' | 'collapse' | 'none';
  animationDuration?: number;
  animationDirection?: 'up' | 'down' | 'left' | 'right';
  customStyles?: {
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: number;
    elevation?: number;
    padding?: number;
    fontSize?: number;
  };
  offset?: number;
  disablePortal?: boolean;
  modifiers?: Array<any>;
  className?: string;
  style?: React.CSSProperties;
  components?: {
    Tooltip?: React.ElementType;
    Arrow?: React.ElementType;
    Transition?: React.ElementType;
  };
  slots?: {
    tooltip?: React.ElementType;
    arrow?: React.ElementType;
    transition?: React.ElementType;
  };
  slotProps?: {
    tooltip?: any;
    arrow?: any;
    transition?: any;
  };
}

interface RichTooltipContent {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  image?: string;
  metadata?: Record<string, any>;
  actions?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    color?: string;
    variant?: string;
  }>;
  progress?: number;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: number;
    label: string;
  };
  analytics?: {
    views: number;
    clicks: number;
    engagement: number;
    conversion: number;
  };
}

const getAnimationComponent = (
  animation: string,
  duration: number,
  direction: string
): React.ElementType => {
  const animationProps = {
    timeout: duration,
    direction: direction as any
  };

  switch (animation) {
    case 'fade':
      return (props: FadeProps) => <Fade {...props} {...animationProps} />;
    case 'zoom':
      return (props: ZoomProps) => <Zoom {...props} {...animationProps} />;
    case 'slide':
      return (props: SlideProps) => <Slide {...props} {...animationProps} />;
    case 'grow':
      return (props: GrowProps) => <Grow {...props} {...animationProps} />;
    case 'collapse':
      return (props: CollapseProps) => <Collapse {...props} {...animationProps} />;
    default:
      return (props: any) => <div {...props} />;
  }
};

const getColorStyles = (color: string, variant: string) => {
  const isRich = variant === 'rich' || variant === 'card' || variant === 'analytics' || variant === 'chart' || variant === 'comparison';
  
  switch (color) {
    case 'primary':
      return {
        background: isRich ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : alpha('#667eea', 0.1),
        text: 'white',
        border: '#667eea'
      };
    case 'secondary':
      return {
        background: isRich ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' : alpha('#f093fb', 0.1),
        text: 'white',
        border: '#f093fb'
      };
    case 'success':
      return {
        background: isRich ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' : alpha('#43e97b', 0.1),
        text: 'white',
        border: '#43e97b'
      };
    case 'error':
      return {
        background: isRich ? 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)' : alpha('#f44336', 0.1),
        text: 'white',
        border: '#f44336'
      };
    case 'warning':
      return {
        background: isRich ? 'linear-gradient(135deg, #ffa726 0%, #ff9800 100%)' : alpha('#ffa726', 0.1),
        text: 'white',
        border: '#ffa726'
      };
    case 'info':
      return {
        background: isRich ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' : alpha('#4facfe', 0.1),
        text: 'white',
        border: '#4facfe'
      };
    default:
      return {
        background: isRich ? '#1a1a1a' : 'white',
        text: isRich ? 'white' : '#1a1a1a',
        border: 'rgba(0,0,0,0.1)'
      };
  }
};

const renderRichContent = (content: RichTooltipContent, variantStyles: any) => {
  return (
    <Card
      elevation={0}
      sx={{
        background: variantStyles.background,
        color: variantStyles.text,
        borderRadius: 4,
        border: `1px solid ${variantStyles.border}`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        overflow: 'hidden',
        minWidth: 280,
        maxWidth: 400
      }}
    >
      {/* Header with Icon and Title */}
      <CardContent sx={{ p: 3, pb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          {content.icon && (
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: alpha(variantStyles.text, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              {content.icon}
            </Box>
          )}
          
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              {content.title}
            </Typography>
            {content.description && (
              <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.5 }}>
                {content.description}
              </Typography>
            )}
          </Box>
        </Stack>

        {/* Progress Bar */}
        {content.progress !== undefined && (
          <Box sx={{ mt: 2 }}>
            <LinearProgress
              variant="determinate"
              value={content.progress}
              sx={{
                height: 4,
                borderRadius: 2,
                background: alpha(variantStyles.text, 0.2),
                '& .MuiLinearProgress-bar': {
                  background: variantStyles.text,
                  borderRadius: 2
                }
              }}
            />
            <Typography variant="caption" sx={{ opacity: 0.8, mt: 0.5, display: 'block' }}>
              {content.progress}% Complete
            </Typography>
          </Box>
        )}

        {/* Trend Indicator */}
        {content.trend && (
          <Box sx={{ mt: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              {content.trend.direction === 'up' && <TrendingUp size={16} />}
              {content.trend.direction === 'down' && <TrendingDown size={16} />}
              {content.trend.direction === 'neutral' && <Minus size={16} />}
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {content.trend.value > 0 ? '+' : ''}{content.trend.value}% {content.trend.label}
              </Typography>
            </Stack>
          </Box>
        )}

        {/* Metadata */}
        {content.metadata && Object.keys(content.metadata).length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={1}>
              {Object.entries(content.metadata).map(([key, val]) => (
                <Grid item xs={6} key={key}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="caption" sx={{ opacity: 0.7, textTransform: 'capitalize' }}>
                      {key}:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {val}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Image */}
        {content.image && (
          <Box sx={{ mt: 2 }}>
            <img
              src={content.image}
              alt={content.title}
              style={{
                width: '100%',
                height: 120,
                objectFit: 'cover',
                borderRadius: 8
              }}
            />
          </Box>
        )}
      </CardContent>

      {/* Analytics Section */}
      {content.analytics && (
        <>
          <Divider sx={{ borderColor: alpha(variantStyles.text, 0.2) }} />
          <CardContent sx={{ p: 3, pt: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
              Performance Metrics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Stack alignItems="center">
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {content.analytics.views.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    Views
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack alignItems="center">
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {content.analytics.clicks.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    Clicks
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack alignItems="center">
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {content.analytics.engagement}%
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    Engagement
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack alignItems="center">
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {content.analytics.conversion}%
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    Conversion
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </>
      )}

      {/* Actions */}
      {content.actions && content.actions.length > 0 && (
        <>
          <Divider sx={{ borderColor: alpha(variantStyles.text, 0.2) }} />
          <CardContent sx={{ p: 3, pt: 2 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {content.actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant as any || 'text'}
                  size="small"
                  onClick={action.onClick}
                  startIcon={action.icon}
                  sx={{
                    background: action.color ? alpha(action.color, 0.1) : alpha(variantStyles.text, 0.1),
                    color: action.color || variantStyles.text,
                    borderColor: action.color || variantStyles.text,
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: 2,
                    '&:hover': {
                      background: action.color ? alpha(action.color, 0.2) : alpha(variantStyles.text, 0.2)
                    }
                  }}
                >
                  {action.label}
                </Button>
              ))}
            </Stack>
          </CardContent>
        </>
      )}
    </Card>
  );
};

const renderChartTooltip = (data: any, variantStyles: any) => {
  return (
    <Card
      elevation={0}
      sx={{
        background: variantStyles.background,
        color: variantStyles.text,
        borderRadius: 3,
        border: `1px solid ${variantStyles.border}`,
        backdropFilter: 'blur(20px)',
        minWidth: 200
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {data.title}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {data.value}
            </Typography>
            {data.trend && (
              <Stack direction="row" spacing={0.5} alignItems="center">
                {data.trend.direction === 'up' && <TrendingUp size={14} />}
                {data.trend.direction === 'down' && <TrendingDown size={14} />}
                <Typography variant="caption">
                  {data.trend.value}%
                </Typography>
              </Stack>
            )}
          </Stack>
          {data.label && (
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              {data.label}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

const renderComparisonTooltip = (data: any, variantStyles: any) => {
  return (
    <Card
      elevation={0}
      sx={{
        background: variantStyles.background,
        color: variantStyles.text,
        borderRadius: 4,
        border: `1px solid ${variantStyles.border}`,
        backdropFilter: 'blur(20px)',
        minWidth: 300
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          {data.title}
        </Typography>
        
        <Stack spacing={2}>
          {data.items.map((item: any, index: number) => (
            <Box key={index}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                  {item.icon}
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {item.name}
                  </Typography>
                </Stack>
                
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    {item.value}
                  </Typography>
                  {item.trend && (
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      {item.trend.direction === 'up' && <TrendingUp size={14} color="#43e97b" />}
                      {item.trend.direction === 'down' && <TrendingDown size={14} color="#f44336" />}
                      <Typography variant="caption" sx={{ color: item.trend.direction === 'up' ? '#43e97b' : '#f44336' }}>
                        {item.trend.value}%
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Stack>
              
              {item.description && (
                <Typography variant="caption" sx={{ opacity: 0.7, mt: 0.5, display: 'block' }}>
                  {item.description}
                </Typography>
              )}
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

const renderTutorialTooltip = (data: any, variantStyles: any) => {
  return (
    <Card
      elevation={0}
      sx={{
        background: variantStyles.background,
        color: variantStyles.text,
        borderRadius: 4,
        border: `1px solid ${variantStyles.border}`,
        backdropFilter: 'blur(20px)',
        maxWidth: 350
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          {/* Step Indicator */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={`Step ${data.step}`}
              size="small"
              sx={{
                background: alpha(variantStyles.text, 0.1),
                color: variantStyles.text,
                fontWeight: 600
              }}
            />
            {data.totalSteps && (
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                of {data.totalSteps}
              </Typography>
            )}
          </Box>

          {/* Title and Content */}
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {data.title}
          </Typography>
          
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            {data.content}
          </Typography>

          {/* Visual Example */}
          {data.visual && (
            <Box
              sx={{
                p: 2,
                background: alpha(variantStyles.text, 0.1),
                borderRadius: 3,
                border: `1px dashed ${alpha(variantStyles.text, 0.3)}`
              }}
            >
              {data.visual}
            </Box>
          )}

          {/* Navigation */}
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Button
              size="small"
              variant="text"
              startIcon={<ChevronLeft size={16} />}
              sx={{ color: variantStyles.text }}
            >
              Previous
            </Button>
            
            <Button
              size="small"
              variant="contained"
              endIcon={<ChevronRight size={16} />}
              sx={{
                background: variantStyles.text,
                color: variantStyles.background,
                '&:hover': {
                  background: alpha(variantStyles.text, 0.9)
                }
              }}
            >
              Next
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
const getColorStyles = (color: string = 'default', variant: string = 'default') => {
  const styles = {
    default: { background: 'rgba(0, 0, 0, 0.85)', text: '#ffffff', border: '#333333' },
    light: { background: 'rgba(255, 255, 255, 0.95)', text: '#000000', border: '#e0e0e0' },
    primary: { background: '#667eea', text: '#ffffff', border: '#667eea' },
    error: { background: '#f44336', text: '#ffffff', border: '#f44336' },
    success: { background: '#4caf50', text: '#ffffff', border: '#4caf50' },
  };
  return styles[color as keyof typeof styles] || styles.default;
};

const getAnimationComponent = (animation: string, duration: number, direction: string) => {
  const props = { timeout: duration };
  switch (animation) {
    case 'fade': return Fade;
    case 'zoom': return Zoom;
    case 'grow': return Grow;
    case 'slide':
      return (props: any) => <Slide direction={direction as any} {...props} {...props} />;
    default: return Fade;
  }
};
export function Tooltip({
  title,
  children,
  placement = 'top',
  arrow = true,
  open,
  defaultOpen,
  onOpen,
  onClose,
  disableHoverListener = false,
  disableFocusListener = false,
  disableTouchListener = false,
  enterDelay = 100,
  leaveDelay = 0,
  enterNextDelay = 0,
  enterTouchDelay = 700,
  leaveTouchDelay = 1500,
  followCursor = false,
  interactive = false,
  maxWidth = 'sm',
  minWidth,
  variant = 'default',
  color = 'default',
  size = 'medium',
  icon,
  actions = [],
  data,
  showProgress = false,
  progressValue = 0,
  showTrend = false,
  trendDirection = 'neutral',
  trendValue = 0,
  showAnalytics = false,
  analytics,
  animation = 'fade',
  animationDuration = 300,
  animationDirection = 'up',
  customStyles,
  offset = 0,
  disablePortal = false,
  modifiers,
  className,
  style,
  components,
  slots,
  slotProps
}: TooltipProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen || false);
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const variantStyles = getColorStyles(color, variant);
  const AnimationComponent = getAnimationComponent(animation, animationDuration, animationDirection);

  // Handle rich content for advanced variants
  const renderContent = () => {
    if (variant === 'default') {
      return (
        <Box
          sx={{
            background: variantStyles.background,
            color: variantStyles.text,
            borderRadius: customStyles?.borderRadius || 2,
            border: `1px solid ${variantStyles.border}`,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            p: customStyles?.padding || 1.5,
            minWidth: minWidth,
            fontSize: customStyles?.fontSize || (size === 'small' ? '0.75rem' : size === 'large' ? '1rem' : '0.875rem'),
            boxShadow: customStyles?.elevation ? `0 ${customStyles.elevation}px ${customStyles.elevation * 2}px rgba(0,0,0,0.1)` : '0 8px 32px rgba(0,0,0,0.12)'
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            {icon && <Box sx={{ color: variantStyles.text }}>{icon}</Box>}
            <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.4 }}>
              {title}
            </Typography>
          </Stack>

          {/* Progress Bar */}
          {showProgress && (
            <Box sx={{ mt: 1 }}>
              <LinearProgress
                variant="determinate"
                value={progressValue}
                sx={{
                  height: 3,
                  borderRadius: 1.5,
                  background: alpha(variantStyles.text, 0.2),
                  '& .MuiLinearProgress-bar': {
                    background: variantStyles.text,
                    borderRadius: 1.5
                  }
                }}
              />
            </Box>
          )}

          {/* Trend Indicator */}
          {showTrend && (
            <Box sx={{ mt: 1 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                {trendDirection === 'up' && <TrendingUp size={14} />}
                {trendDirection === 'down' && <TrendingDown size={14} />}
                {trendDirection === 'neutral' && <Minus size={14} />}
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {trendValue > 0 ? '+' : ''}{trendValue}% trend
                </Typography>
              </Stack>
            </Box>
          )}

          {/* Actions */}
          {actions.length > 0 && (
            <Box sx={{ mt: 1.5 }}>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant as any || 'text'}
                    size="small"
                    onClick={action.onClick}
                    startIcon={action.icon}
                    sx={{
                      background: action.color ? alpha(action.color, 0.1) : alpha(variantStyles.text, 0.1),
                      color: action.color || variantStyles.text,
                      borderColor: action.color || variantStyles.text,
                      fontWeight: 600,
                      textTransform: 'none',
                      borderRadius: 2,
                      py: 0.5,
                      px: 1.5,
                      fontSize: '0.75rem',
                      '&:hover': {
                        background: action.color ? alpha(action.color, 0.2) : alpha(variantStyles.text, 0.2)
                      }
                    }}
                  >
                    {action.label}
                  </Button>
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      );
    }

    if (variant === 'rich' && typeof title === 'object') {
      return renderRichContent(title as RichTooltipContent, variantStyles);
    }

    if (variant === 'card' && data) {
      return renderRichContent(data, variantStyles);
    }

    if (variant === 'chart' && data) {
      return renderChartTooltip(data, variantStyles);
    }

    if (variant === 'comparison' && data) {
      return renderComparisonTooltip(data, variantStyles);
    }

    if (variant === 'tutorial' && data) {
      return renderTutorialTooltip(data, variantStyles);
    }

    if (variant === 'analytics' && analytics) {
      return (
        <Card
          elevation={0}
          sx={{
            background: variantStyles.background,
            color: variantStyles.text,
            borderRadius: 4,
            border: `1px solid ${variantStyles.border}`,
            backdropFilter: 'blur(20px)',
            minWidth: 250,
            maxWidth: 350
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              {title}
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Stack alignItems="center">
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    {analytics.views.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Views
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack alignItems="center">
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    {analytics.clicks.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Clicks
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack alignItems="center">
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    {analytics.engagement}%
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Engagement
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack alignItems="center">
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    {analytics.conversion}%
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    Conversion
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      );
    }

    // Default simple tooltip
    return (
      <Box
        sx={{
          background: variantStyles.background,
          color: variantStyles.text,
          borderRadius: customStyles?.borderRadius || 2,
          border: `1px solid ${variantStyles.border}`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          p: customStyles?.padding || 1,
          minWidth: minWidth,
          fontSize: customStyles?.fontSize || (size === 'small' ? '0.75rem' : size === 'large' ? '1rem' : '0.875rem'),
          boxShadow: customStyles?.elevation ? `0 ${customStyles.elevation}px ${customStyles.elevation * 2}px rgba(0,0,0,0.1)` : '0 4px 20px rgba(0,0,0,0.15)',
          maxWidth: typeof maxWidth === 'number' ? maxWidth : undefined
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          {icon && <Box sx={{ color: variantStyles.text }}>{icon}</Box>}
          <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.4 }}>
            {title}
          </Typography>
        </Stack>
      </Box>
    );
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsVisible(true);
    onOpen?.();
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setIsVisible(false), animationDuration);
    onClose?.();
  };

  const TransitionComponent = animation !== 'none' ? AnimationComponent : undefined;

  return (
    <MuiTooltip
      title={renderContent()}
      placement={placement}
      arrow={arrow}
      open={open !== undefined ? open : isOpen}
      defaultOpen={defaultOpen}
      onOpen={handleOpen}
      onClose={handleClose}
      disableHoverListener={disableHoverListener}
      disableFocusListener={disableFocusListener}
      disableTouchListener={disableTouchListener}
      enterDelay={enterDelay}
      leaveDelay={leaveDelay}
      enterNextDelay={enterNextDelay}
      enterTouchDelay={enterTouchDelay}
      leaveTouchDelay={leaveTouchDelay}
      followCursor={followCursor}
      interactive={interactive || actions.length > 0 || variant !== 'default'}
      maxWidth={maxWidth}
      components={components}
      slots={{
        ...slots,
        transition: TransitionComponent
      }}
      slotProps={{
        ...slotProps,
        tooltip: {
          sx: {
            background: 'transparent',
            boxShadow: 'none',
            padding: 0,
            margin: 0,
            '& .MuiTooltip-arrow': {
              color: variantStyles.border
            },
            ...style
          },
          ...slotProps?.tooltip
        },
        arrow: {
          sx: {
            color: variantStyles.border,
            fontSize: 16
          },
          ...slotProps?.arrow
        },
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, offset]
              }
            },
            ...(modifiers || [])
          ],
          disablePortal: disablePortal,
          ...slotProps?.popper
        }
      }}
      className={className}
    >
      {children}
    </MuiTooltip>
  );
};

export default Tooltip;
