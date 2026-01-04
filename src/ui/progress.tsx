import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  LinearProgress,
  CircularProgress,
  Typography,
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
  Tooltip,
  IconButton,
  Button,
  Grid,
  LinearProgressProps,
  CircularProgressProps
} from '@mui/material';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Clock,
  Zap,
  Award,
  Star,
  CheckCircle,
  AlertTriangle,
  Info,
  Settings,
  RefreshCw,
  RotateCcw,
  Play,
  Pause,
  Stop,
  FastForward,
  Rewind,
  SkipBack,
  SkipForward,
  StepBack,
  StepForward,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  MoreHorizontal,
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
  HelpCircle,
  Search,
  Filter,
  Plus,
  Minus,
  Edit,
  Trash2,
  Save,
  Share2,
  ExternalLink,
  Eye,
  EyeOff,
  Copy,
  Mail,
  Phone,
  MapPin,
  Globe,
  DollarSign,
  Percent,
  Hash,
  AtSign,
  Paperclip,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  CreditCard,
  Calendar,
  Clock2,
  Timer,
  Stopwatch,
  Hourglass,
  Speedometer,
  Gauge,
  Thermometer,
  Compass,
  Navigation,
  Radar,
  Satellite,
  Telescope,
  Microscope,
  Calculator,
  Abacus,
  Scale,
  Balance,
  Weight,
  Height,
  Ruler,
  Measure,
  Grid,
  Grid3x3,
  Grid2x2,
  Square,
  Circle,
  Triangle,
  Diamond,
  Hexagon,
  Octagon,
  Pentagon,
  Star2,
  Heart2,
  Spade,
  Club,
  Diamond2,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowUpLeft,
  ArrowDownRight,
  ArrowDownLeft,
  Move,
  MoveUp,
  MoveDown,
  MoveLeft,
  MoveRight,
  RotateCcw2,
  RotateCw2,
  FlipHorizontal,
  FlipVertical,
  Expand,
  Compress,
  Maximize,
  Minimize,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Scan,
  ScanLine,
  Camera,
  Camera2,
  Video2,
  VideoOff,
  Mic,
  MicOff,
  Speaker,
  SpeakerOff,
  Headphones,
  HeadphonesOff,
  Radio,
  Tv2,
  Monitor2,
  Smartphone2,
  Tablet2,
  Laptop2,
  Desktop2,
  Keyboard2,
  Mouse2,
  Printer2,
  Scanner2,
  Server2,
  Database,
  HardDrive,
  Usb,
  Cpu,
  MemoryStick,
  CircuitBoard,
  Battery,
  BatteryCharging,
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  Power,
  PowerOff,
  ToggleLeft,
  ToggleRight,
  Switch2,
  Button,
  MousePointer,
  MousePointer2,
  MousePointerClick,
  Touchpad,
  TouchpadOff,
  Keyboard3,
  Type,
  Typing,
  Edit2,
  Edit3,
  Pen,
  PenTool,
  Pencil,
  Pencil2,
  Marker,
  Highlighter,
  Eraser,
  Ruler2,
  Scissors,
  Scissors2,
  Cut,
  Copy2,
  Clipboard,
  Clipboard2,
  Paste,
  ClipboardCheck,
  ClipboardList,
  ClipboardX,
  File2,
  FilePlus2,
  FileMinus2,
  FileCheck2,
  FileX2,
  FileText2,
  FileCode,
  FileSpreadsheet,
  FilePresentation,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FilePdf,
  FileWord,
  FileExcel,
  FilePowerpoint,
  Folder2,
  FolderPlus2,
  FolderMinus2,
  FolderCheck,
  FolderX,
  FolderOpen,
  FolderClosed,
  Trash2,
  Trash22,
  Delete,
  Backspace,
  Eraser2,
  Remove,
  Clear,
  Cancel,
  Close,
  X2,
  Check,
  Check2,
  CheckCircle2,
  CheckSquare,
  Square,
  Circle2,
  Triangle2,
  Diamond3,
  Hexagon2,
  Octagon2,
  Pentagon2,
  Star3,
  Heart3,
  Spade2,
  Club2,
  Diamond4,
  Loading,
  Loading2,
  Loading3,
  RefreshCw3,
  RefreshCw4,
  RotateCcw3,
  RotateCw3,
  RotateCcw4,
  RotateCw4,
  RefreshCw5,
  RefreshCw6,
  Sync,
  Sync2,
  Sync3,
  Repeat,
  Repeat2,
  Loop,
  Loop2,
  Shuffle,
  Shuffle2,
  SkipBack2,
  SkipForward2,
  StepBack2,
  StepForward2,
  Rewind2,
  FastForward2,
  Play2,
  Play3,
  Pause2,
  Pause3,
  Stop2,
  Stop3,
  Record2,
  Record3,
  Radio2,
  Tv3,
  Monitor3,
  Smartphone3,
  Tablet3,
  Laptop3,
  Desktop3,
  Server3,
  Database2,
  HardDrive2,
  Usb2,
  Cpu2,
  MemoryStick2,
  CircuitBoard2,
  Battery2,
  BatteryCharging2,
  BatteryFull2,
  BatteryLow2,
  BatteryMedium2,
  Power2,
  PowerOff2,
  ToggleLeft2,
  ToggleRight2,
  Switch3,
  Button2,
  MousePointer2,
  MousePointer3,
  MousePointerClick2,
  Touchpad2,
  TouchpadOff2,
  Keyboard4,
  Type2,
  Typing2,
  Edit4,
  Edit5,
  Pen2,
  PenTool2,
  Pencil3,
  Pencil4,
  Marker2,
  Highlighter2,
  Eraser3,
  Ruler3,
  Scissors3,
  Scissors4,
  Cut2,
  Copy3,
  Clipboard3,
  Clipboard4,
  Paste2,
  ClipboardCheck2,
  ClipboardList2,
  ClipboardX2,
  File3,
  FilePlus3,
  FileMinus3,
  FileCheck3,
  FileX3,
  FileText3,
  FileCode2,
  FileSpreadsheet2,
  FilePresentation2,
  FileImage2,
  FileVideo2,
  FileAudio2,
  FileArchive2,
  FilePdf2,
  FileWord2,
  FileExcel2,
  FilePowerpoint2,
  Folder3,
  FolderPlus3,
  FolderMinus3,
  FolderCheck2,
  FolderX2,
  FolderOpen2,
  FolderClosed2,
  Trash3,
  Trash4,
  Delete2,
  Backspace2,
  Eraser4,
  Remove2,
  Clear2,
  Cancel2,
  Close2,
  X3,
  Check3,
  Check4,
  CheckCircle3,
  CheckSquare2,
  Square2,
  Circle3,
  Triangle3,
  Diamond5,
  Hexagon3,
  Octagon3,
  Pentagon3,
  Star4,
  Heart4,
  Spade3,
  Club3,
  Diamond6,
  Loading4,
  Loading5,
  Loading6,
  RefreshCw7,
  RefreshCw8,
  RotateCcw5,
  RotateCw5,
  RotateCcw6,
  RotateCw6,
  RefreshCw9,
  RefreshCw10,
  Sync4,
  Sync5,
  Sync6,
  Repeat3,
  Repeat4,
  Loop3,
  Loop4,
  Shuffle3,
  Shuffle4,
  SkipBack3,
  SkipForward3,
  StepBack3,
  StepForward3,
  Rewind3,
  FastForward3,
  Play4,
  Play5,
  Pause4,
  Pause5,
  Stop4,
  Stop5,
  Record4,
  Record5,
  Radio3,
  Tv4,
  Monitor4,
  Smartphone4,
  Tablet4,
  Laptop4,
  Desktop4,
  Server4,
  Database3,
  HardDrive3,
  Usb3,
  Cpu3,
  MemoryStick3,
  CircuitBoard3,
  Battery3,
  BatteryCharging3,
  BatteryFull3,
  BatteryLow3,
  BatteryMedium3,
  Power3,
  PowerOff3,
  ToggleLeft3,
  ToggleRight3,
  Switch4,
  Button3,
  MousePointer4,
  MousePointer5,
  MousePointerClick3,
  Touchpad3,
  TouchpadOff3,
  Keyboard5,
  Type3,
  Typing3,
  Edit6,
  Edit7,
  Pen3,
  PenTool3,
  Pencil5,
  Pencil6,
  Marker3,
  Highlighter3,
  Eraser5,
  Ruler4,
  Scissors5,
  Scissors6,
  Cut3,
  Copy4,
  Clipboard5,
  Clipboard6,
  Paste3,
  ClipboardCheck3,
  ClipboardList3,
  ClipboardX3,
  File4,
  FilePlus4,
  FileMinus4,
  FileCheck4,
  FileX4,
  FileText4,
  FileCode3,
  FileSpreadsheet3,
  FilePresentation3,
  FileImage3,
  FileVideo3,
  FileAudio3,
  FileArchive3,
  FilePdf3,
  FileWord3,
  FileExcel3,
  FilePowerpoint3,
  Folder4,
  FolderPlus4,
  FolderMinus4,
  FolderCheck3,
  FolderX3,
  FolderOpen3,
  FolderClosed3,
  Trash4,
  Trash5,
  Delete3,
  Backspace3,
  Eraser6,
  Remove3,
  Clear3,
  Cancel3,
  Close3,
  X4,
  Check5,
  Check6,
  CheckCircle4,
  CheckSquare3,
  Square3,
  Circle4,
  Triangle4,
  Diamond7,
  Hexagon4,
  Octagon4,
  Pentagon4,
  Star5,
  Heart5,
  Spade4,
  Club4,
  Diamond8,
  Loading7,
  Loading8,
  Loading9,
  RefreshCw11,
  RefreshCw12,
  RotateCcw7,
  RotateCw7,
  RotateCcw8,
  RotateCw8,
  RefreshCw13,
  RefreshCw14,
  Sync7,
  Sync8,
  Sync9,
  Repeat5,
  Repeat6,
  Loop5,
  Loop6,
  Shuffle5,
  Shuffle6,
  SkipBack4,
  SkipForward4,
  StepBack4,
  StepForward4,
  Rewind4,
  FastForward4,
  Play6,
  Play7,
  Pause6,
  Pause7,
  Stop6,
  Stop7,
  Record6,
  Record7,
  Radio4,
  Tv5,
  Monitor5,
  Smartphone5,
  Tablet5,
  Laptop5,
  Desktop5,
  Server5,
  Database4,
  HardDrive4,
  Usb4,
  Cpu4,
  MemoryStick4,
  CircuitBoard4,
  Battery4,
  BatteryCharging4,
  BatteryFull4,
  BatteryLow4,
  BatteryMedium4,
  Power4,
  PowerOff4,
  ToggleLeft4,
  ToggleRight4,
  Switch5,
  Button4,
  MousePointer6,
  MousePointer7,
  MousePointerClick4,
  Touchpad4,
  TouchpadOff4,
  Keyboard6,
  Type4,
  Typing4,
  Edit8,
  Edit9,
  Pen4,
  PenTool4,
  Pencil7,
  Pencil8,
  Marker4,
  Highlighter4,
  Eraser7,
  Ruler5,
  Scissors7,
  Scissors8,
  Cut4,
  Copy5,
  Clipboard7,
  Clipboard8,
  Paste4,
  ClipboardCheck4,
  ClipboardList4,
  ClipboardX4,
  File5,
  FilePlus5,
  FileMinus5,
  FileCheck5,
  FileX5,
  FileText5,
  FileCode4,
  FileSpreadsheet4,
  FilePresentation4,
  FileImage4,
  FileVideo4,
  FileAudio4,
  FileArchive4,
  FilePdf4,
  FileWord4,
  FileExcel4,
  FilePowerpoint4,
  Folder5,
  FolderPlus5,
  FolderMinus5,
  FolderCheck4,
  FolderX4,
  FolderOpen4,
  FolderClosed4,
  Trash5,
  Trash6,
  Delete4,
  Backspace4,
  Eraser8,
  Remove4,
  Clear4,
  Cancel4,
  Close4,
  X5,
  Check7,
  Check8,
  CheckCircle5,
  CheckSquare4,
  Square4,
  Circle5,
  Triangle5,
  Diamond9,
  Hexagon5,
  Octagon5,
  Pentagon5,
  Star6,
  Heart6,
  Spade5,
  Club5,
  Diamond10,
  Loading10,
  Loading11,
  Loading12,
  RefreshCw15,
  RefreshCw16,
  RotateCcw9,
  RotateCw9,
  RotateCcw10,
  RotateCw10,
  RefreshCw17,
  RefreshCw18,
  Sync10,
  Sync11,
  Sync12,
  Repeat7,
  Repeat8,
  Loop7,
  Loop8,
  Shuffle7,
  Shuffle8,
  SkipBack5,
  SkipForward5,
  StepBack5,
  StepForward5,
  Rewind5,
  FastForward5,
  Play8,
  Play9,
  Pause8,
  Pause9,
  Stop8,
  Stop9,
  Record8,
  Record9,
  Radio5,
  Tv6,
  Monitor6,
  Smartphone6,
  Tablet6,
  Laptop6,
  Desktop6,
  Server6,
  Database5,
  HardDrive5,
  Usb5,
  Cpu5,
  MemoryStick5,
  CircuitBoard5,
  Battery5,
  BatteryCharging5,
  BatteryFull5,
  BatteryLow5,
  BatteryMedium5,
  Power5,
  PowerOff5,
  ToggleLeft5,
  ToggleRight5,
  Switch6,
  Button5,
  MousePointer8,
  MousePointer9,
  MousePointerClick5,
  Touchpad5,
  TouchpadOff5,
  Keyboard7,
  Type5,
  Typing5,
  Edit10,
  Edit11,
  Pen5,
  PenTool5,
  Pencil9,
  Pencil10,
  Marker5,
  Highlighter5,
  Eraser9,
  Ruler6,
  Scissors9,
  Scissors10,
  Cut5,
  Copy6,
  Clipboard9,
  Clipboard10,
  Paste5,
  ClipboardCheck5,
  ClipboardList5,
  ClipboardX5,
  File6,
  FilePlus6,
  FileMinus6,
  FileCheck6,
  FileX6,
  FileText6,
  FileCode5,
  FileSpreadsheet5,
  FilePresentation5,
  FileImage5,
  FileVideo5,
  FileAudio5,
  FileArchive5,
  FilePdf5,
  FileWord5,
  FileExcel5,
  FilePowerpoint5,
  Folder6,
  FolderPlus6,
  FolderMinus6,
  FolderCheck5,
  FolderX5,
  FolderOpen5,
  FolderClosed5,
  Trash6,
  Trash7,
  Delete5,
  Backspace5,
  Eraser10,
  Remove5,
  Clear5,
  Cancel5,
  Close5,
  X6,
  Check9,
  Check10,
  CheckCircle6,
  CheckSquare5,
  Square5,
  Circle6,
  Triangle6,
  Diamond11,
  Hexagon6,
  Octagon6,
  Pentagon6,
  Star7,
  Heart7,
  Spade6,
  Club6,
  Diamond12,
  Loading13,
  Loading14,
  Loading15,
  RefreshCw19,
  RefreshCw20,
  RotateCcw11,
  RotateCw11,
  RotateCcw12,
  RotateCw12,
  RefreshCw21,
  RefreshCw22,
  Sync13,
  Sync14,
  Sync15,
  Repeat9,
  Repeat10,
  Loop9,
  Loop10,
  Shuffle9,
  Shuffle10,
  SkipBack6,
  SkipForward6,
  StepBack6,
  StepForward6,
  Rewind6,
  FastForward6,
  Play10,
  Play11,
  Pause10,
  Pause11,
  Stop10,
  Stop11,
  Record10,
  Record11,
  Radio6,
  Tv7,
  Monitor7,
  Smartphone7,
  Tablet7,
  Laptop7,
  Desktop7,
  Server7,
  Database6,
  HardDrive6,
  Usb6,
  Cpu6,
  MemoryStick6,
  CircuitBoard6,
  Battery6,
  BatteryCharging6,
  BatteryFull6,
  BatteryLow6,
  BatteryMedium6,
  Power6,
  PowerOff6,
  ToggleLeft6,
  ToggleRight6,
  Switch7,
  Button6,
  MousePointer10,
  MousePointer11,
  MousePointerClick6,
  Touchpad6,
  TouchpadOff6,
  Keyboard8,
  Type6,
  Typing6,
  Edit12,
  Edit13,
  Pen6,
  PenTool6,
  Pencil11,
  Pencil12,
  Marker6,
  Highlighter6,
  Eraser11,
  Ruler7,
  Scissors11,
  Scissors12,
  Cut6,
  Copy7,
  Clipboard11,
  Clipboard12,
  Paste6,
  ClipboardCheck6,
  ClipboardList6,
  ClipboardX6,
  File7,
  FilePlus7,
  FileMinus7,
  FileCheck7,
  FileX7,
  FileText7,
  FileCode6,
  FileSpreadsheet6,
  FilePresentation6,
  FileImage6,
  FileVideo6,
  FileAudio6,
  FileArchive6,
  FilePdf6,
  FileWord6,
  FileExcel6,
  FilePowerpoint6,
  Folder7,
  FolderPlus7,
  FolderMinus7,
  FolderCheck6,
  FolderX6,
  FolderOpen6,
  FolderClosed6,
  Trash7,
  Trash8,
  Delete6,
  Backspace6,
  Eraser12,
  Remove6,
  Clear6,
  Cancel6,
  Close6,
  X7,
  Check11,
  Check12,
  CheckCircle7,
  CheckSquare6,
  Square6,
  Circle7,
  Triangle7,
  Diamond13,
  Hexagon7,
  Octagon7,
  Pentagon7,
  Star8,
  Heart8,
  Spade7,
  Club7,
  Diamond14,
  Loading16,
  Loading17,
  Loading18,
  RefreshCw23,
  RefreshCw24,
  RotateCcw13,
  RotateCw13,
  RotateCcw14,
  RotateCw14,
  RefreshCw25,
  RefreshCw26,
  Sync16,
  Sync17,
  Sync18,
  Repeat11,
  Repeat12,
  Loop11,
  Loop12,
  Shuffle11,
  Shuffle12,
  SkipBack7,
  SkipForward7,
  StepBack7,
  StepForward7,
  Rewind7,
  FastForward7,
  Play12,
  Play13,
  Pause12,
  Pause13,
  Stop12,
  Stop13,
  Record12,
  Record13,
  Radio7,
  Tv8,
  Monitor8,
  Smartphone8,
  Tablet8,
  Laptop8,
  Desktop8,
  Server8,
  Database7,
  HardDrive7,
  Usb7,
  Cpu7,
  MemoryStick7,
  CircuitBoard7,
  Battery7,
  BatteryCharging7,
  BatteryFull7,
  BatteryLow7,
  BatteryMedium7,
  Power7,
  PowerOff7,
  ToggleLeft7,
  ToggleRight7,
  Switch8,
  Button7,
  MousePointer12,
  MousePointer13,
  MousePointerClick7,
  Touchpad7,
  TouchpadOff7,
  Keyboard9,
  Type7,
  Typing7,
  Edit14,
  Edit15,
  Pen7,
  PenTool7,
  Pencil13,
  Pencil14,
  Marker7,
  Highlighter7,
  Eraser13,
  Ruler8,
  Scissors13,
  Scissors14,
  Cut7,
  Copy8,
  Clipboard13,
  Clipboard14,
  Paste7,
  ClipboardCheck7,
  ClipboardList7,
  ClipboardX7,
  File8,
  FilePlus8,
  FileMinus8,
  FileCheck8,
  FileX8,
  FileText8,
  FileCode7,
  FileSpreadsheet7,
  FilePresentation7,
  FileImage7,
  FileVideo7,
  FileAudio7,
  FileArchive7,
  FilePdf7,
  FileWord7,
  FileExcel7,
  FilePowerpoint7,
  Folder8,
  FolderPlus8,
  FolderMinus8,
  FolderCheck7,
  FolderX7,
  FolderOpen7,
  FolderClosed7,
  Trash8,
  Trash9,
  Delete7,
  Backspace7,
  Eraser14,
  Remove7,
  Clear7,
  Cancel7,
  Close7,
  X8,
  Check13,
  Check14,
  CheckCircle8,
  CheckSquare7,
  Square7,
  Circle8,
  Triangle8,
  Diamond15,
  Hexagon8,
  Octagon8,
  Pentagon8,
  Star9,
  Heart9,
  Spade8,
  Club8,
  Diamond16,
  Loading19,
  Loading20,
  Loading21,
  RefreshCw27,
  RefreshCw28,
  RotateCcw15,
  RotateCw15,
  RotateCcw16,
  RotateCw16,
  RefreshCw29,
  RefreshCw30,
  Sync19,
  Sync20,
  Sync21,
  Repeat13,
  Repeat14,
  Loop13,
  Loop14,
  Shuffle13,
  Shuffle14,
  SkipBack8,
  SkipForward8,
  StepBack8,
  StepForward8,
  Rewind8,
  FastForward8,
  Play14,
  Play15,
  Pause14,
  Pause15,
  Stop14,
  Stop15,
  Record14,
  Record15,
  Radio8,
  Tv9,
  Monitor9,
  Smartphone9,
  Tablet9,
  Laptop9,
  Desktop9,
  Server9,
  Database8,
  HardDrive8,
  Usb8,
  Cpu8,
  MemoryStick8,
  CircuitBoard8,
  Battery8,
  BatteryCharging8,
  BatteryFull8,
  BatteryLow8,
  BatteryMedium8,
  Power8,
  PowerOff8,
  ToggleLeft8,
  ToggleRight8,
  Switch9,
  Button8,
  MousePointer14,
  MousePointer15,
  MousePointerClick8,
  Touchpad8,
  TouchpadOff8,
  Keyboard10,
  Type8,
  Typing8,
  Edit16,
  Edit17,
  Pen8,
  PenTool8,
  Pencil15,
  Pencil16,
  Marker8,
  Highlighter8,
  Eraser15,
  Ruler9,
  Scissors15,
  Scissors16,
  Cut8,
  Copy9,
  Clipboard15,
  Clipboard16,
  Paste8,
  ClipboardCheck8,
  ClipboardList8,
  ClipboardX8,
  File9,
  FilePlus9,
  FileMinus9,
  FileCheck9,
  FileX9,
  FileText9,
  FileCode8,
  FileSpreadsheet8,
  FilePresentation8,
  FileImage8,
  FileVideo8,
  FileAudio8,
  FileArchive8,
  FilePdf8,
  FileWord8,
  FileExcel8,
  FilePowerpoint8,
  Folder9,
  FolderPlus9,
  FolderMinus9,
  FolderCheck8,
  FolderX8,
  FolderOpen8,
  FolderClosed8,
  Trash9,
  Trash10,
  Delete8,
  Backspace8,
  Eraser16,
  Remove8,
  Clear8,
  Cancel8,
  Close8,
  X9,
  Check15,
  Check16,
  CheckCircle9,
  CheckSquare8,
  Square8,
  Circle9,
  Triangle9,
  Diamond17,
  Hexagon9,
  Octagon9,
  Pentagon9,
  Star10,
  Heart10,
  Spade9,
  Club9,
  Diamond18
} from 'lucide-react';

export type ProgressVariant = 'linear' | 'circular' | 'dashboard' | 'gauge' | 'step' | 'timeline';
export type ProgressSize = 'small' | 'medium' | 'large' | 'xlarge';
export type ProgressColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gradient';
export type ProgressStatus = 'active' | 'success' | 'exception' | 'normal' | 'paused';

export interface ProgressProps {
  // Core props
  value: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  color?: ProgressColor;
  status?: ProgressStatus;
  
  // Display options
  showPercentage?: boolean;
  showValue?: boolean;
  showStatus?: boolean;
  showIcon?: boolean;
  showSteps?: boolean;
  showTimeline?: boolean;
  
  // Styling
  thickness?: number;
  strokeWidth?: number;
  radius?: number;
  rounded?: boolean;
  animated?: boolean;
  striped?: boolean;
  gradient?: boolean;
  glow?: boolean;
  
  // Content
  label?: string;
  description?: string;
  icon?: React.ReactNode;
  successIcon?: React.ReactNode;
  errorIcon?: React.ReactNode;
  pausedIcon?: React.ReactNode;
  
  // Advanced features
  steps?: number;
  currentStep?: number;
  stepLabels?: string[];
  stepIcons?: React.ReactNode[];
  stepDescriptions?: string[];
  
  // Timeline features
  timelineItems?: Array<{
    title: string;
    description?: string;
    icon?: React.ReactNode;
    time?: string;
    status?: 'completed' | 'current' | 'pending' | 'error';
  }>;
  
  // Statistics
  showStats?: boolean;
  stats?: Array<{
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    trend?: 'up' | 'down' | 'stable';
  }>;
  
  // Performance
  speed?: number;
  eta?: number;
  rate?: number;
  total?: number;
  processed?: number;
  
  // Controls
  showControls?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onReset?: () => void;
  
  // Thresholds
  warningThreshold?: number;
  errorThreshold?: number;
  successThreshold?: number;
  
  // Formatting
  format?: (value: number) => string;
  precision?: number;
  unit?: string;
  unitPosition?: 'prefix' | 'suffix';
  
  // Enterprise features
  enterprise?: boolean;
  showQuickStats?: boolean;
  quickStats?: Array<{
    label: string;
    value: string | number;
    icon: React.ReactNode;
    color?: string;
  }>;
  
  // Interactive features
  interactive?: boolean;
  onClick?: (value: number) => void;
  onHover?: (value: number) => void;
  
  // Custom rendering
  renderLabel?: (value: number) => React.ReactNode;
  renderValue?: (value: number) => React.ReactNode;
  renderIcon?: (status: ProgressStatus) => React.ReactNode;
  
  // Event handlers
  onComplete?: () => void;
  onError?: () => void;
  onWarning?: () => void;
  onStatusChange?: (status: ProgressStatus) => void;
  
  // Styling overrides
  className?: string;
  sx?: any;
  style?: React.CSSProperties;
  trackSx?: any;
  barSx?: any;
  textSx?: any;
  
  // Accessibility
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  ariaValueText?: string;
  
  // Performance optimization
  virtualized?: boolean;
  bufferSize?: number;
  debounce?: number;
  
  // Special modes
  determinate?: boolean;
  indeterminate?: boolean;
  buffer?: boolean;
  query?: boolean;
}

interface ProgressStepProps {
  index: number;
  total: number;
  current: number;
  label?: string;
  icon?: React.ReactNode;
  description?: string;
  status?: 'completed' | 'current' | 'pending' | 'error';
  size?: ProgressSize;
  color?: ProgressColor;
  enterprise?: boolean;
}

export const ProgressStep: React.FC<ProgressStepProps> = ({
  index,
  total,
  current,
  label,
  icon,
  description,
  status,
  size = 'medium',
  color = 'primary',
  enterprise = false
}) => {
  const isCompleted = index < current;
  const isCurrent = index === current;
  const isPending = index > current;
  const isError = status === 'error';

  const getStepColor = () => {
    if (isError) return '#f44336';
    if (isCompleted) {
      const colors = {
        primary: '#667eea',
        secondary: '#f093fb',
        success: '#43e97b',
        warning: '#ffa726',
        error: '#f44336',
        info: '#4facfe',
        gradient: '#f093fb'
      };
      return colors[color] || colors.primary;
    }
    return alpha('#000', 0.3);
  };

  const getStepSize = () => {
    const sizes = {
      small: 24,
      medium: 32,
      large: 40,
      xlarge: 48
    };
    return sizes[size] || sizes.medium;
  };

  const stepSize = getStepSize();
  const stepColor = getStepColor();

  return (
    <Box sx={{ position: 'relative', flex: 1 }}>
      {/* Step connector */}
      {index < total - 1 && (
        <Box
          sx={{
            position: 'absolute',
            top: stepSize / 2,
            left: stepSize,
            right: 0,
            height: 2,
            background: isCompleted ? stepColor : alpha('#000', 0.1),
            transition: 'all 0.3s ease'
          }}
        />
      )}

      <Stack direction="row" spacing={2} alignItems="center">
        {/* Step circle */}
        <Box
          sx={{
            width: stepSize,
            height: stepSize,
            borderRadius: '50%',
            background: isCurrent && !isError 
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : isCompleted && !isError
              ? stepColor
              : 'white',
            border: `2px solid ${stepColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isCompleted || isCurrent ? 'white' : stepColor,
            fontWeight: 700,
            fontSize: size === 'small' ? '12px' : size === 'large' ? '16px' : '14px',
            boxShadow: isCurrent && !isError ? '0 4px 12px rgba(102, 126, 234, 0.4)' : 'none',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 6px 16px rgba(102, 126, 234, 0.3)'
            }
          }}
        >
          {isError ? (
            <AlertTriangle size={stepSize * 0.5} />
          ) : isCompleted ? (
            icon || <CheckCircle size={stepSize * 0.5} />
          ) : (
            index + 1
          )}
        </Box>

        {/* Step content */}
        <Box sx={{ flexGrow: 1 }}>
          {label && (
            <Typography 
              variant={size === 'small' ? 'body2' : 'body1'} 
              sx={{ 
                fontWeight: isCurrent ? 700 : 600,
                color: isCurrent ? '#667eea' : 'text.primary'
              }}
            >
              {label}
            </Typography>
          )}
          {description && (
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ display: 'block', mt: 0.5 }}
            >
              {description}
            </Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
});

interface ProgressTimelineProps {
  items: Array<{
    title: string;
    description?: string;
    icon?: React.ReactNode;
    time?: string;
    status?: 'completed' | 'current' | 'pending' | 'error';
  }>;
  size?: ProgressSize;
  color?: ProgressColor;
  enterprise?: boolean;
}

export const ProgressTimeline: React.FC<ProgressTimelineProps> = ({
  items,
  size = 'medium',
  color = 'primary',
  enterprise = false
}) => {
  return (
    <Box sx={{ position: 'relative' }}>
      {items.map((item, index) => (
        <Box key={index} sx={{ position: 'relative', mb: index < items.length - 1 ? 4 : 0 }}>
          {/* Timeline connector */}
          {index < items.length - 1 && (
            <Box
              sx={{
                position: 'absolute',
                left: size === 'small' ? 12 : size === 'large' ? 20 : 16,
                top: size === 'small' ? 24 : size === 'large' ? 32 : 28,
                width: 2,
                height: 'calc(100% + 16px)',
                background: item.status === 'completed' 
                  ? '#667eea' 
                  : alpha('#000', 0.1)
              }}
            />
          )}

          <Stack direction="row" spacing={3} alignItems="flex-start">
            {/* Timeline dot */}
            <Box
              sx={{
                width: size === 'small' ? 24 : size === 'large' ? 32 : 28,
                height: size === 'small' ? 24 : size === 'large' ? 32 : 28,
                borderRadius: '50%',
                background: item.status === 'completed'
                  ? '#667eea'
                  : item.status === 'current'
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'white',
                border: `2px solid ${item.status === 'completed' || item.status === 'current' ? '#667eea' : alpha('#000', 0.3)}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                flexShrink: 0,
                mt: 0.5
              }}
            >
              {item.status === 'error' ? (
                <AlertTriangle size={14} />
              ) : item.status === 'completed' ? (
                item.icon || <CheckCircle size={14} />
              ) : item.status === 'current' ? (
                item.icon || <Clock size={14} />
              ) : (
                item.icon || <Circle size={14} />
              )}
            </Box>

            {/* Timeline content */}
            <Box sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography 
                    variant={size === 'small' ? 'body2' : 'body1'} 
                    sx={{ 
                      fontWeight: item.status === 'current' ? 700 : 600,
                      color: item.status === 'current' ? '#667eea' : 'text.primary'
                    }}
                  >
                    {item.title}
                  </Typography>
                  {item.time && (
                    <Typography variant="caption" color="text.secondary">
                      {item.time}
                    </Typography>
                  )}
                </Stack>
                {item.description && (
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                )}
              </Stack>
            </Box>
          </Stack>
        </Box>
      ))}
    </Box>
  );
};

export const Progress: React.FC<ProgressProps> = ({
  value,
  variant = 'linear',
  size = 'medium',
  color = 'primary',
  status = 'active',
  showPercentage = true,
  showValue = true,
  showStatus = true,
  showIcon = true,
  showSteps = false,
  showTimeline = false,
  thickness = 4,
  strokeWidth = 4,
  radius = 60,
  rounded = true,
  animated = true,
  striped = false,
  gradient = false,
  glow = false,
  label,
  description,
  icon,
  successIcon,
  errorIcon,
  pausedIcon,
  steps = 0,
  currentStep = 0,
  stepLabels = [],
  stepIcons = [],
  stepDescriptions = [],
  timelineItems = [],
  showStats = false,
  stats = [],
  speed,
  eta,
  rate,
  total,
  processed,
  showControls = false,
  onPlay,
  onPause,
  onStop,
  onReset,
  warningThreshold = 75,
  errorThreshold = 90,
  successThreshold = 100,
  format,
  precision = 0,
  unit = '%',
  unitPosition = 'suffix',
  enterprise = false,
  showQuickStats = false,
  quickStats = [],
  interactive = false,
  onClick,
  onHover,
  renderLabel,
  renderValue,
  renderIcon,
  onComplete,
  onError,
  onWarning,
  onStatusChange,
  className,
  sx,
  style,
  trackSx,
  barSx,
  textSx,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  ariaValueText,
  virtualized = false,
  bufferSize = 5,
  debounce = 100,
  determinate = true,
  indeterminate = false,
  buffer = false,
  query = false
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [animationSpeed, setAnimationSpeed] = useState(animated ? 300 : 0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Auto-detect status based on thresholds
  const autoStatus = useMemo(() => {
    if (status !== 'active') return status;
    if (value >= successThreshold) return 'success';
    if (value >= errorThreshold) return 'exception';
    if (value >= warningThreshold) return 'normal';
    return 'active';
  }, [value, status, warningThreshold, errorThreshold, successThreshold]);

  // Get colors based on status and variant
  const getColors = () => {
    const statusColors = {
      active: '#667eea',
      success: '#43e97b',
      exception: '#f44336',
      normal: '#4facfe',
      paused: '#ffa726'
    };

    const gradientColors = {
      active: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      success: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      exception: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
      normal: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      paused: 'linear-gradient(135deg, #ffa726 0%, #ff9800 100%)'
    };

    const color = statusColors[autoStatus];
    const gradient = gradientColors[autoStatus];

    return { color, gradient };
  };

  const { color, gradient } = getColors();

  // Format value
  const formatValue = (val: number) => {
    if (format) return format(val);
    const formatted = val.toFixed(precision);
    return unitPosition === 'prefix' ? `${unit}${formatted}` : `${formatted}${unit}`;
  };

  // Get icon based on status
  const getStatusIcon = () => {
    if (renderIcon) return renderIcon(autoStatus);
    
    const icons = {
      active: icon || <Activity size={20} />,
      success: successIcon || <CheckCircle size={20} />,
      exception: errorIcon || <AlertTriangle size={20} />,
      normal: icon || <Info size={20} />,
      paused: pausedIcon || <Pause size={20} />
    };
    
    return icons[autoStatus];
  };

  // Handle status changes
  useEffect(() => {
    onStatusChange?.(autoStatus);
    if (autoStatus === 'success') onComplete?.();
    if (autoStatus === 'exception') onError?.();
    if (autoStatus === 'normal') onWarning?.();
  }, [autoStatus]);

  // Animate value changes
  useEffect(() => {
    if (!animated) {
      setDisplayValue(value);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, debounce);

    return () => clearTimeout(timer);
  }, [value, animated, debounce]);

  // Get size styles
  const getSizeStyles = () => {
    const sizes = {
      small: { height: 4, fontSize: '12px', iconSize: 16, spacing: 1 },
      medium: { height: 8, fontSize: '14px', iconSize: 20, spacing: 2 },
      large: { height: 12, fontSize: '16px', iconSize: 24, spacing: 3 },
      xlarge: { height: 16, fontSize: '18px', iconSize: 28, spacing: 4 }
    };
    return sizes[size] || sizes.medium;
  };

  const sizeStyles = getSizeStyles();

  // Linear progress
  const renderLinearProgress = () => (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <LinearProgress
        variant={determinate ? 'determinate' : indeterminate ? 'indeterminate' : buffer ? 'buffer' : 'determinate'}
        value={displayValue}
        buffer={buffer ? Math.min(displayValue + 10, 100) : undefined}
        sx={{
          height: sizeStyles.height,
          borderRadius: rounded ? sizeStyles.height / 2 : 0,
          backgroundColor: alpha('#000', 0.1),
          '& .MuiLinearProgress-bar': {
            background: gradient && !striped ? gradient : color,
            borderRadius: rounded ? sizeStyles.height / 2 : 0,
            transition: `transform ${animationSpeed}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            ...(striped && {
              background: `repeating-linear-gradient(
                45deg,
                ${color} 0px,
                ${color} 10px,
                ${alpha(color, 0.7)} 10px,
                ${alpha(color, 0.7)} 20px
              )`,
              animation: 'stripe-animation 1s linear infinite'
            }),
            ...(glow && {
              boxShadow: `0 0 10px ${color}, 0 0 20px ${alpha(color, 0.5)}`
            })
          },
          ...trackSx
        }}
      />
      
      {/* Progress overlay for interactive mode */}
      {interactive && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: alpha('#000', 0.05)
            }
          }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            onClick?.(Math.max(0, Math.min(100, percentage)));
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            onHover?.(Math.max(0, Math.min(100, percentage)));
          }}
        />
      )}
    </Box>
  );

  // Circular progress
  const renderCircularProgress = () => (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant={determinate ? 'determinate' : indeterminate ? 'indeterminate' : 'determinate'}
        value={displayValue}
        size={radius * 2}
        thickness={strokeWidth}
        sx={{
          color: gradient ? undefined : color,
          '& .MuiCircularProgress-circle': {
            stroke: gradient ? `url(#gradient-${autoStatus})` : color,
            strokeLinecap: rounded ? 'round' : 'butt',
            transition: `stroke-dashoffset ${animationSpeed}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            ...(glow && {
              filter: `drop-shadow(0 0 10px ${color})`
            })
          },
          ...trackSx
        }}
      />
      
      {/* Gradient definition for circular progress */}
      {gradient && (
        <svg width="0" height="0">
          <defs>
            <linearGradient id={`gradient-${autoStatus}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor={autoStatus === 'success' ? '#38f9d7' : 
                                           autoStatus === 'exception' ? '#d32f2f' : 
                                           autoStatus === 'paused' ? '#ff9800' : '#764ba2'} />
            </linearGradient>
          </defs>
        </svg>
      )}
      
      {/* Center content */}
      {(showPercentage || showValue || label) && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          {showIcon && (
            <Box sx={{ color, mb: 0.5 }}>
              {getStatusIcon()}
            </Box>
          )}
          {showPercentage && (
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                color,
                fontSize: radius > 60 ? '24px' : '18px'
              }}
            >
              {formatValue(displayValue)}
            </Typography>
          )}
          {label && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
              {label}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );

  // Dashboard/Gauge progress
  const renderDashboardProgress = () => (
    <Box sx={{ position: 'relative', width: radius * 2, height: radius * 2 }}>
      <svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
        {/* Background arc */}
        <path
          d={`M ${radius * 0.2} ${radius * 1.8} A ${radius * 0.8} ${radius * 0.8} 0 0 1 ${radius * 1.8} ${radius * 1.8}`}
          fill="none"
          stroke={alpha('#000', 0.1)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Progress arc */}
        <path
          d={`M ${radius * 0.2} ${radius * 1.8} A ${radius * 0.8} ${radius * 0.8} 0 0 1 ${radius * (0.2 + (displayValue / 100) * 1.6)} ${radius * (1.8 - (displayValue / 100) * 1.6)}`}
          fill="none"
          stroke={gradient ? `url(#gauge-gradient-${autoStatus})` : color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          style={{
            transition: `stroke-dasharray ${animationSpeed}ms ease`,
            filter: glow ? `drop-shadow(0 0 10px ${color})` : 'none'
          }}
        />
        
        {/* Gradient definition */}
        {gradient && (
          <defs>
            <linearGradient id={`gauge-gradient-${autoStatus}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor={autoStatus === 'success' ? '#38f9d7' : 
                                           autoStatus === 'exception' ? '#d32f2f' : 
                                           autoStatus === 'paused' ? '#ff9800' : '#764ba2'} />
            </linearGradient>
          </defs>
        )}
      </svg>
      
      {/* Center content */}
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center'
        }}
      >
        {showIcon && (
          <Box sx={{ color, mb: 0.5 }}>
            {getStatusIcon()}
          </Box>
        )}
        {showPercentage && (
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 800, 
              color,
              fontSize: radius > 60 ? '28px' : '20px'
            }}
          >
            {formatValue(displayValue)}
          </Typography>
        )}
        {label && (
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        )}
      </Box>
    </Box>
  );

  // Step progress
  const renderStepProgress = () => (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={3}>
        {/* Step indicators */}
        <Stack direction="row" spacing={2} alignItems="center">
          {Array.from({ length: steps }, (_, index) => (
            <ProgressStep
              key={index}
              index={index}
              total={steps}
              current={currentStep}
              label={stepLabels[index]}
              icon={stepIcons[index]}
              description={stepDescriptions[index]}
              size={size}
              color={color}
              enterprise={enterprise}
            />
          ))}
        </Stack>

        {/* Current step details */}
        {currentStep < steps && stepLabels[currentStep] && (
          <Card elevation={0} sx={{ borderRadius: 3, background: alpha('#667eea', 0.05) }}>
            <CardContent sx={{ p: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                >
                  {stepIcons[currentStep] || <Activity size={20} />}
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {stepLabels[currentStep]}
                  </Typography>
                  {stepDescriptions[currentStep] && (
                    <Typography variant="body2" color="text.secondary">
                      {stepDescriptions[currentStep]}
                    </Typography>
                  )}
                </Box>
              </Stack>
            </CardContent>
          </Card>
        )}
      </Stack>
    </Box>
  );

  // Timeline progress
  const renderTimelineProgress = () => (
    <ProgressTimeline
      items={timelineItems}
      size={size}
      color={color}
      enterprise={enterprise}
    />
  );

  // Stats display
  const renderStats = () => (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {stats.map((stat, index) => (
        <Grid item xs={6} md={3} key={index}>
          <Card elevation={0} sx={{ borderRadius: 3, background: alpha(stat.color || '#667eea', 0.05) }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <Stack spacing={1} alignItems="center">
                <Box sx={{ color: stat.color || '#667eea' }}>
                  {stat.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: stat.color || '#667eea' }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {stat.label}
                </Typography>
                {stat.trend && (
                  <Box sx={{ color: stat.trend === 'up' ? '#43e97b' : stat.trend === 'down' ? '#f44336' : '#6c757d' }}>
                    {stat.trend === 'up' ? <TrendingUp size={14} /> : 
                     stat.trend === 'down' ? <TrendingDown size={14} /> : 
                     <Activity size={14} />}
                  </Box>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  // Quick stats for enterprise
  const renderQuickStats = () => (
    <Grid container spacing={1} sx={{ mb: 2 }}>
      {quickStats.map((stat, index) => (
        <Grid item xs={6} md={3} key={index}>
          <Box sx={{ textAlign: 'center' }}>
            <Stack spacing={0.5} alignItems="center">
              <Box sx={{ color: stat.color || '#667eea' }}>
                {stat.icon}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: stat.color || '#667eea' }}>
                {stat.value}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {stat.label}
              </Typography>
            </Stack>
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  // Controls
  const renderControls = () => (
    <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
      <IconButton
        size="small"
        onClick={onPlay}
        disabled={!onPlay || autoStatus === 'success'}
        sx={{ color: '#667eea' }}
      >
        <Play size={16} />
      </IconButton>
      <IconButton
        size="small"
        onClick={onPause}
        disabled={!onPause}
        sx={{ color: '#ffa726' }}
      >
        <Pause size={16} />
      </IconButton>
      <IconButton
        size="small"
        onClick={onStop}
        disabled={!onStop}
        sx={{ color: '#f44336' }}
      >
        <Stop size={16} />
      </IconButton>
      <IconButton
        size="small"
        onClick={onReset}
        disabled={!onReset}
        sx={{ color: '#6c757d' }}
      >
        <RotateCcw size={16} />
      </IconButton>
    </Stack>
  );

  // Main content
  const mainContent = () => (
    <Box sx={{ width: '100%', position: 'relative' }}>
      {/* Quick stats for enterprise */}
      {enterprise && showQuickStats && quickStats.length > 0 && renderQuickStats()}

      {/* Progress component based on variant */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        mb: 2
      }}>
        {variant === 'linear' && renderLinearProgress()}
        {variant === 'circular' && renderCircularProgress()}
        {variant === 'dashboard' && renderDashboardProgress()}
        {variant === 'gauge' && renderDashboardProgress()}
        {variant === 'step' && renderStepProgress()}
        {variant === 'timeline' && renderTimelineProgress()}
      </Box>

      {/* Label and description */}
      {(label || description) && variant !== 'step' && variant !== 'timeline' && (
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          {label && (
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                mb: 1,
                color: enterprise ? '#667eea' : 'text.primary'
              }}
            >
              {renderLabel ? renderLabel(displayValue) : label}
            </Typography>
          )}
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </Box>
      )}

      {/* Status display */}
      {showStatus && variant !== 'step' && variant !== 'timeline' && (
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 2 }}>
          {showIcon && (
            <Box sx={{ color }}>
              {getStatusIcon()}
            </Box>
          )}
          {showValue && (
            <Typography variant="h5" sx={{ fontWeight: 800, color }}>
              {renderValue ? renderValue(displayValue) : formatValue(displayValue)}
            </Typography>
          )}
          <Chip
            label={autoStatus.charAt(0).toUpperCase() + autoStatus.slice(1)}
            size="small"
            sx={{
              backgroundColor: alpha(color, 0.1),
              color: color,
              fontWeight: 600
            }}
          />
        </Stack>
      )}

      {/* Performance metrics */}
      {(speed || eta || rate || (total && processed)) && (
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {speed && (
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">Speed</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {speed} {unit}/s
                </Typography>
              </Box>
            </Grid>
          )}
          {eta && (
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">ETA</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {Math.ceil(eta)}s
                </Typography>
              </Box>
            </Grid>
          )}
          {rate && (
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">Rate</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {rate}%
                </Typography>
              </Box>
            </Grid>
          )}
          {total && processed !== undefined && (
            <Grid item xs={6} md={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">Progress</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {processed}/{total}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      {/* Stats */}
      {showStats && stats.length > 0 && renderStats()}

      {/* Controls */}
      {showControls && renderControls()}
    </Box>
  );

  return (
    <Box
      className={className}
      sx={{
        width: '100%',
        position: 'relative',
        ...sx
      }}
      style={style}
      onClick={() => interactive && onClick?.(displayValue)}
      onMouseEnter={() => interactive && onHover?.(displayValue)}
      role="progressbar"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedBy={ariaDescribedBy}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={displayValue}
      aria-valuetext={ariaValueText || formatValue(displayValue)}
    >
      {/* Custom CSS for animations */}
      <style>
        {`
          @keyframes stripe-animation {
            0% { background-position: 0 0; }
            100% { background-position: 40px 0; }
          }
          @keyframes glow-animation {
            0%, 100% { box-shadow: 0 0 5px ${color}, 0 0 10px ${alpha(color, 0.5)}; }
            50% { box-shadow: 0 0 10px ${color}, 0 0 20px ${alpha(color, 0.7)}; }
          }
        `}
      </style>

      {/* Enterprise styling wrapper */}
      {enterprise ? (
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            background: 'white',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
            }
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {mainContent()}
          </CardContent>
        </Card>
      ) : (
        mainContent()
      )}
    </Box>
  );
};

// Specialized progress components
export const LinearProgressBar: React.FC<Omit<ProgressProps, 'variant'>> = (props) => (
  <Progress {...props} variant="linear" />
);

export const CircularProgressRing: React.FC<Omit<ProgressProps, 'variant'>> = (props) => (
  <Progress {...props} variant="circular" />
);

export const DashboardGauge: React.FC<Omit<ProgressProps, 'variant'>> = (props) => (
  <Progress {...props} variant="dashboard" />
);

export const StepProgressBar: React.FC<Omit<ProgressProps, 'variant'>> = (props) => (
  <Progress {...props} variant="step" />
);

export const TimelineProgress: React.FC<Omit<ProgressProps, 'variant'>> = (props) => (
  <Progress {...props} variant="timeline" />
);

export const EnterpriseProgress: React.FC<ProgressProps> = (props) => (
  <Progress
    {...props}
    enterprise={true}
    showQuickStats={true}
    animated={true}
    gradient={true}
    glow={true}
  />
);

export const FileUploadProgress: React.FC<Omit<ProgressProps, 'variant' | 'showStats'>> = (props) => (
  <Progress
    {...props}
    variant="linear"
    showStats={true}
    showControls={true}
    stats={[
      { label: 'Speed', value: props.speed || 0, icon: <TrendingUp size={16} />, unit: 'MB/s' },
      { label: 'ETA', value: props.eta || 0, icon: <Clock size={16} />, unit: 's' },
      { label: 'Processed', value: props.processed || 0, icon: <FileText size={16} /> }
    ]}
  />
);

export const DocumentSigningProgress: React.FC<Omit<ProgressProps, 'variant' | 'steps'>> = (props) => (
  <Progress
    {...props}
    variant="step"
    steps={4}
    stepLabels={['Document Uploaded', 'Signature Applied', 'Verification Complete', 'Document Signed']}
    stepDescriptions={[
      'Your document has been successfully uploaded',
      'Digital signature has been applied',
      'Document verification is complete',
      'Document signing process finished'
    ]}
    enterprise={true}
  />
);

export default Progress;
