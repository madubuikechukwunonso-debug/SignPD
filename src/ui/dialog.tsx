
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Dialog as MuiDialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions,
  DialogContentText,
  Slide,
  Fade,
  Zoom,
  Backdrop,
  useTheme,
  useMediaQuery,
  alpha,
  LinearProgress,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Chip,
  Avatar,
  AvatarGroup,
  Badge,
  Tooltip,
  Card,
  CardContent,
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  InputAdornment,
  Stack,
  Grid,
  Divider
} from '@mui/material';
import {
  X,
  Maximize2,
  Minimize2,
  Save,
  Download,
  Upload,
  Share2,
  Copy,
  CheckCircle,
  AlertCircle,
  Info,
  Warning,
  Error as ErrorIcon,
  Clock,
  Calendar,
  Users,
  FileText,
  Folder,
  Settings,
  Sliders,
  Eye,
  EyeOff,
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
  Mail,
  Phone,
  Video,
  MessageCircle,
  Paperclip,
  Link,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Plus,
  Minus,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  RefreshCw,
  RotateCcw,
  Print,
  Archive,
  Bookmark,
  Heart,
  Star,
  Pin,
  PushPin,
  Home,
  User,
  HelpCircle,
  MoreVertical,
  MoreHorizontal,
  Expand,
  Compress,
  Fullscreen,
  ExitFullscreen,
  Window,
  Close,
  Check,
  CheckSquare,
  Square,
  Circle,
  RadioButtonChecked,
  RadioButtonUnchecked
} from 'lucide-react';

interface DialogAction {
  id: string;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  icon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  tooltip?: string;
  shortcut?: string;
}

interface DialogStep {
  id: string;
  label: string;
  description?: string;
  content: React.ReactNode;
  optional?: boolean;
  disabled?: boolean;
  completed?: boolean;
}

interface DialogField {
  id: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'file' | 'date' | 'time';
  label: string;
  placeholder?: string;
  value?: any;
  options?: { label: string; value: any }[];
  required?: boolean;
  disabled?: boolean;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    message?: string;
  };
  icon?: React.ReactNode;
  helperText?: string;
  metadata?: Record<string, any>;
}

interface DialogTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
  tooltip?: string;
}

interface DialogAlert {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  actions?: DialogAction[];
  persistent?: boolean;
}

interface DialogConfig {
  // Core configuration
  open: boolean;
  onClose: () => void;
  onOpen?: () => void;
  onExited?: () => void;
  
  // Content
  title?: string;
  subtitle?: string;
  content?: React.ReactNode;
  children?: React.ReactNode;
  actions?: DialogAction[];
  
  // Type variants
  type?: 'default' | 'confirm' | 'alert' | 'form' | 'wizard' | 'fullscreen' | 'drawer' | 'popover';
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  
  // Layout
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  fullWidth?: boolean;
  fullScreen?: boolean;
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  
  // Styling
  elevation?: number;
  borderRadius?: number;
  background?: string;
  headerSx?: any;
  contentSx?: any;
  actionsSx?: any;
  paperSx?: any;
  
  // Features
  showClose?: boolean;
  showHeader?: boolean;
  showActions?: boolean;
  showDivider?: boolean;
  draggable?: boolean;
  resizable?: boolean;
  maximizable?: boolean;
  closable?: boolean;
  backdrop?: boolean;
  backdropClick?: boolean;
  escapeKey?: boolean;
  
  // Advanced features
  loading?: boolean;
  progress?: number;
  steps?: DialogStep[];
  currentStep?: number;
  fields?: DialogField[];
  tabs?: DialogTab[];
  currentTab?: number;
  alert?: DialogAlert;
  confirmOptions?: {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
  };
  
  // Customization
  customHeader?: React.ReactNode;
  customFooter?: React.ReactNode;
  customActions?: React.ReactNode;
  loadingComponent?: React.ReactNode;
  emptyState?: React.ReactNode;
  errorState?: React.ReactNode;
  className?: string;
  sx?: any;
  
  // Animation
  animation?: 'fade' | 'slide' | 'zoom' | 'none';
  animationDuration?: number;
  animationDirection?: 'up' | 'down' | 'left' | 'right';
  
  // Accessibility
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  role?: string;
  
  // Callbacks
  onAction?: (action: DialogAction) => void;
  onStepChange?: (step: number) => void;
  onTabChange?: (tab: number) => void;
  onFieldChange?: (field: DialogField, value: any) => void;
  onSubmit?: (data: Record<string, any>) => void | Promise<void>;
  onCancel?: () => void;
}

interface EnterpriseDialogProps extends DialogConfig {}

const TransitionComponents = {
  fade: Fade,
  slide: Slide,
  zoom: Zoom,
  none: React.Fragment
};

const SlideDirections = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right'
};

const sizeMap = {
  xs: { width: 320, padding: 2 },
  sm: { width: 480, padding: 3 },
  md: { width: 600, padding: 3 },
  lg: { width: 800, padding: 4 },
  xl: { width: 960, padding: 4 },
  fullscreen: { width: '100%', padding: 4 }
};

const statusIcons = {
  success: <CheckCircle size={24} color="#4caf50" />,
  error: <ErrorIcon size={24} color="#f44336" />,
  warning: <Warning size={24} color="#ffa726" />,
  info: <Info size={24} color="#2196f3" />,
  default: null
};

const statusColors = {
  success: '#4caf50',
  error: '#f44336',
  warning: '#ffa726',
  info: '#2196f3',
  default: 'inherit'
};

export const EnterpriseDialog: React.FC<EnterpriseDialogProps> = ({
  // Core
  open,
  onClose,
  onOpen,
  onExited,
  
  // Content
  title,
  subtitle,
  content,
  children,
  actions = [],
  
  // Type
  type = 'default',
  variant = 'default',
  
  // Layout
  size = 'md',
  maxWidth = 'md',
  fullWidth = true,
  fullScreen = false,
  position = 'center',
  
  // Styling
  elevation = 24,
  borderRadius = 12,
  background,
  headerSx,
  contentSx,
  actionsSx,
  paperSx,
  
  // Features
  showClose = true,
  showHeader = true,
  showActions = true,
  showDivider = true,
  draggable = false,
  resizable = false,
  maximizable = false,
  closable = true,
  backdrop = true,
  backdropClick = true,
  escapeKey = true,
  
  // Advanced
  loading = false,
  progress,
  steps = [],
  currentStep = 0,
  fields = [],
  tabs = [],
  currentTab = 0,
  alert,
  confirmOptions,
  
  // Customization
  customHeader,
  customFooter,
  customActions,
  loadingComponent,
  emptyState,
  errorState,
  className,
  sx,
  
  // Animation
  animation = 'fade',
  animationDuration = 300,
  animationDirection = 'up',
  
  // Accessibility
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  role = 'dialog',
  
  // Callbacks
  onAction,
  onStepChange,
  onTabChange,
  onFieldChange,
  onSubmit,
  onCancel
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isDark = theme.palette.mode === 'dark';

  const [isMaximized, setIsMaximized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [positionState, setPositionState] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const sizeConfig = sizeMap[size] || sizeMap.md;
  const TransitionComponent = TransitionComponents[animation] || Fade;

  // Calculate responsive size
  const responsiveSize = useMemo(() => {
    if (isMobile) return { ...sizeMap.sm, width: 'calc(100% - 32px)' };
    if (isTablet) return { ...sizeMap.md, width: 'calc(100% - 64px)' };
    return sizeConfig;
  }, [isMobile, isTablet, sizeConfig]);

  // Get status configuration
  const getStatusConfig = (status: string = 'default') => {
    return {
      color: statusColors[status as keyof typeof statusColors] || statusColors.default,
      icon: statusIcons[status as keyof typeof statusIcons] || null,
      bgColor: alpha(statusColors[status as keyof typeof statusColors] || statusColors.default, 0.1)
    };
  };

  // Handle dialog open
  useEffect(() => {
    if (open) {
      onOpen?.();
      // Initialize form data with default values
      const initialData: Record<string, any> = {};
      fields?.forEach(field => {
        if (field.value !== undefined) {
          initialData[field.id] = field.value;
        }
      });
      setFormData(initialData);
    }
  }, [open, onOpen, fields]);

  // Handle maximize
  const handleMaximize = useCallback(() => {
    setIsMaximized(!isMaximized);
  }, [isMaximized]);

  // Handle drag start
  const handleDragStart = useCallback((e: React.MouseEvent) => {
    if (!draggable) return;
    setIsDragging(true);
    setPositionState({ x: e.clientX, y: e.clientY });
  }, [draggable]);

  // Handle field change
  const handleFieldChange = useCallback((field: DialogField, value: any) => {
    setFormData(prev => ({ ...prev, [field.id]: value }));
    onFieldChange?.(field, value);
    
    // Validate field
    if (field.validation) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field.id]: error }));
    }
  }, [onFieldChange]);

  // Validate field
  const validateField = (field: DialogField, value: any): string => {
    if (!field.validation) return '';
    
    const { required, minLength, maxLength, pattern, message } = field.validation;
    
    if (required && !value) {
      return message || 'This field is required';
    }
    
    if (minLength && value.length < minLength) {
      return message || `Minimum length is ${minLength}`;
    }
    
    if (maxLength && value.length > maxLength) {
      return message || `Maximum length is ${maxLength}`;
    }
    
    if (pattern && !pattern.test(value)) {
      return message || 'Invalid format';
    }
    
    return '';
  };

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    // Validate all fields
    const newErrors: Record<string, string> = {};
    fields?.forEach(field => {
      const error = validateField(field, formData[field.id]);
      if (error) {
        newErrors[field.id] = error;
      }
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit?.(formData);
      onClose();
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, fields, onSubmit, onClose]);

  // Handle action click
  const handleActionClick = useCallback((action: DialogAction) => {
    onAction?.(action);
    action.onClick();
  }, [onAction]);

  // Handle step change
  const handleStepChange = useCallback((step: number) => {
    onStepChange?.(step);
  }, [onStepChange]);

  // Handle tab change
  const handleTabChange = useCallback((tab: number) => {
    onTabChange?.(tab);
  }, [onTabChange]);

  // Render header
  const renderHeader = () => {
    if (customHeader) return customHeader;

    const statusConfig = getStatusConfig(variant);

    return (
      <Box
        ref={headerRef}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: responsiveSize.padding,
          background: background || (isDark ? '#1a1a1a' : 'white'),
          borderBottom: showDivider ? '1px solid' : 'none',
          borderColor: 'divider',
          cursor: draggable ? 'move' : 'default',
          ...headerSx
        }}
        onMouseDown={handleDragStart}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
          {variant !== 'default' && statusConfig.icon && (
            <Box sx={{ color: statusConfig.color }}>
              {statusConfig.icon}
            </Box>
          )}
          
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: variant === 'default' ? 'text.primary' : statusConfig.color,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {title}
            </Typography>
            
            {subtitle && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {maximizable && (
            <IconButton
              size="small"
              onClick={handleMaximize}
              sx={{
                background: alpha('#667eea', 0.1),
                '&:hover': { background: alpha('#667eea', 0.2) }
              }}
            >
              {isMaximized ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </IconButton>
          )}
          
          {showClose && closable && (
            <IconButton
              size="small"
              onClick={onClose}
              sx={{
                background: alpha('#667eea', 0.1),
                '&:hover': { background: alpha('#667eea', 0.2) }
              }}
            >
              <X size={18} />
            </IconButton>
          )}
        </Box>
      </Box>
    );
  };

  // Render content
  const renderContent = () => {
    if (loading && loadingComponent) return loadingComponent;
    if (loading) {
      return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <CircularProgress size={48} sx={{ mb: 3, color: '#667eea' }} />
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
            Loading...
          </Typography>
          {progress !== undefined && (
            <Box sx={{ mt: 3, px: 4 }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  background: alpha('#667eea', 0.1),
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: 3
                  }
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {progress}% complete
              </Typography>
            </Box>
          )}
        </Box>
      );
    }

    if (alert) {
      const alertConfig = getStatusConfig(alert.type);
      
      return (
        <Box sx={{ textAlign: 'center', py: 6, px: 4 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: alertConfig.bgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3
            }}
          >
            {alertConfig.icon}
          </Box>
          
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: alertConfig.color }}>
            {alert.title}
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {alert.message}
          </Typography>
          
          {alert.actions && alert.actions.length > 0 && (
            <Stack direction="row" spacing={2} justifyContent="center">
              {alert.actions.map((action) => (
                <Button
                  key={action.id}
                  variant={action.variant === 'primary' ? 'contained' : 'outlined'}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  startIcon={action.icon}
                  sx={{ borderRadius: 2 }}
                >
                  {action.label}
                </Button>
              ))}
            </Stack>
          )}
        </Box>
      );
    }

    if (type === 'confirm' && confirmOptions) {
      const confirmConfig = getStatusConfig(confirmOptions.variant || 'info');
      
      return (
        <Box sx={{ textAlign: 'center', py: 6, px: 4 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: confirmConfig.bgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3
            }}
          >
            {confirmConfig.icon}
          </Box>
          
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: confirmConfig.color }}>
            {confirmOptions.title || 'Confirm Action'}
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {confirmOptions.message || 'Are you sure you want to proceed?'}
          </Typography>
        </Box>
      );
    }

    if (type === 'wizard' && steps.length > 0) {
      return (
        <Box sx={{ py: 3 }}>
          <Stepper
            activeStep={currentStep}
            orientation="horizontal"
            sx={{
              px: responsiveSize.padding,
              mb: 4,
              '& .MuiStepLabel-label': {
                fontWeight: 600
              }
            }}
          >
            {steps.map((step, index) => (
              <Step key={step.id} completed={step.completed || index < currentStep}>
                <StepLabel
                  optional={step.optional && <Typography variant="caption">Optional</Typography>}
                  error={step.disabled}
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {step.description}
                  </Typography>
                  {step.content}
                </StepContent>
              </Step>
            ))}
          </Stepper>
          
          {steps[currentStep]?.content}
        </Box>
      );
    }

    if (type === 'form' && fields.length > 0) {
      return (
        <Box sx={{ py: 3 }}>
          <Grid container spacing={3}>
            {fields.map((field) => (
              <Grid item xs={12} md={field.type === 'textarea' ? 12 : 6} key={field.id}>
                {renderFormField(field)}
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    }

    if (tabs.length > 0) {
      return (
        <Box sx={{ py: 3 }}>
          {/* Tab headers */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Stack direction="row" spacing={1} sx={{ overflowX: 'auto' }}>
              {tabs.map((tab, index) => (
                <Button
                  key={tab.id}
                  variant={index === currentTab ? 'contained' : 'text'}
                  onClick={() => handleTabChange(index)}
                  disabled={tab.disabled}
                  startIcon={tab.icon}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    minWidth: 120
                  }}
                >
                  {tab.label}
                  {tab.badge && (
                    <Badge
                      badgeContent={tab.badge}
                      color="primary"
                      sx={{ ml: 1 }}
                    />
                  )}
                </Button>
              ))}
            </Stack>
          </Box>
          
          {/* Tab content */}
          {tabs[currentTab]?.content}
        </Box>
      );
    }

    return (
      <Box sx={{ py: responsiveSize.padding }}>
        {content || children}
      </Box>
    );
  };

  // Render form field
  const renderFormField = (field: DialogField) => {
    const error = errors[field.id];
    const value = formData[field.id] || '';

    const commonProps = {
      fullWidth: true,
      size: 'small' as const,
      error: !!error,
      helperText: error || field.helperText,
      disabled: field.disabled || loading,
      required: field.required,
      InputProps: field.icon ? {
        startAdornment: (
          <InputAdornment position="start">
            {field.icon}
          </InputAdornment>
        )
      } : undefined
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <TextField
            {...commonProps}
            type={field.type}
            label={field.label}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(field, e.target.value)}
          />
        );
      
      case 'textarea':
        return (
          <TextField
            {...commonProps}
            multiline
            rows={4}
            label={field.label}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleFieldChange(field, e.target.value)}
          />
        );
      
      case 'select':
        return (
          <FormControl {...commonProps} error={!!error}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={value}
              onChange={(e) => handleFieldChange(field, e.target.value)}
              label={field.label}
            >
              {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      
      case 'checkbox':
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={!!value}
                onChange={(e) => handleFieldChange(field, e.target.checked)}
                disabled={field.disabled}
              />
            }
            label={field.label}
          />
        );
      
      case 'radio':
        return (
          <FormControl component="fieldset" error={!!error}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              {field.label}
            </Typography>
            <RadioGroup
              value={value}
              onChange={(e) => handleFieldChange(field, e.target.value)}
            >
              {field.options?.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      
      case 'file':
        return (
          <Box>
            <input
              type="file"
              accept={field.metadata?.accept}
              multiple={field.metadata?.multiple}
              onChange={(e) => handleFieldChange(field, e.target.files)}
              style={{ display: 'none' }}
              id={`file-${field.id}`}
            />
            <label htmlFor={`file-${field.id}`}>
              <Button
                variant="outlined"
                component="span"
                fullWidth
                startIcon={<Upload size={18} />}
                sx={{ borderRadius: 2 }}
              >
                {value ? `${value.length} file(s) selected` : `Upload ${field.label}`}
              </Button>
            </label>
          </Box>
        );
      
      case 'date':
        return (
          <TextField
            {...commonProps}
            type="date"
            label={field.label}
            value={value}
            onChange={(e) => handleFieldChange(field, e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        );
      
      case 'time':
        return (
          <TextField
            {...commonProps}
            type="time"
            label={field.label}
            value={value}
            onChange={(e) => handleFieldChange(field, e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        );
      
      default:
        return null;
    }
  };

  // Render actions
  const renderActions = () => {
    if (customActions) return customActions;
    if (!showActions) return null;

    // Default actions based on type
    let defaultActions: DialogAction[] = actions;
    
    if (type === 'confirm' && confirmOptions) {
      defaultActions = [
        {
          id: 'cancel',
          label: confirmOptions.cancelText || 'Cancel',
          onClick: onCancel || onClose,
          variant: 'secondary'
        },
        {
          id: 'confirm',
          label: confirmOptions.confirmText || 'Confirm',
          onClick: handleSubmit,
          variant: confirmOptions.variant === 'danger' ? 'danger' : 'primary'
        }
      ];
    } else if (type === 'form') {
      defaultActions = [
        {
          id: 'cancel',
          label: 'Cancel',
          onClick: onCancel || onClose,
          variant: 'secondary'
        },
        {
          id: 'submit',
          label: 'Submit',
          onClick: handleSubmit,
          variant: 'primary',
          loading: isSubmitting
        }
      ];
    } else if (type === 'wizard') {
      defaultActions = [
        {
          id: 'back',
          label: 'Back',
          onClick: () => handleStepChange(Math.max(0, currentStep - 1)),
          variant: 'secondary',
          disabled: currentStep === 0
        },
        {
          id: 'next',
          label: currentStep === steps.length - 1 ? 'Finish' : 'Next',
          onClick: () => handleStepChange(Math.min(steps.length - 1, currentStep + 1)),
          variant: 'primary'
        }
      ];
    }

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 2,
          p: responsiveSize.padding,
          borderTop: showDivider ? '1px solid' : 'none',
          borderColor: 'divider',
          ...actionsSx
        }}
      >
        {defaultActions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant === 'primary' ? 'contained' : 'outlined'}
            onClick={() => handleActionClick(action)}
            disabled={action.disabled || action.loading || loading}
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
            {action.loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              action.label
            )}
          </Button>
        ))}
      </Box>
    );
  };

  // Render footer
  const renderFooter = () => {
    if (customFooter) return customFooter;

    return null;
  };

  // Determine dialog props based on type
  const getDialogProps = () => {
    const baseProps = {
      open,
      onClose,
      maxWidth: maxWidth as any,
      fullWidth,
      fullScreen: fullScreen || isMaximized,
      PaperProps: {
        elevation,
        sx: {
          borderRadius: borderRadius,
          background: background || (isDark ? '#1a1a1a' : 'white'),
          backgroundImage: 'none',
          ...paperSx
        }
      },
      BackdropProps: {
        sx: {
          backgroundColor: backdrop ? alpha('#000000', 0.5) : 'transparent'
        }
      },
      closeAfterTransition: true,
      disableEscapeKeyDown: !escapeKey,
      disableBackdropClick: !backdropClick,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      role,
      className
    };

    if (animation !== 'none') {
      return {
        ...baseProps,
        TransitionComponent: TransitionComponent as any,
        transitionDuration: animationDuration,
        TransitionProps: {
          direction: animation === 'slide' ? SlideDirections[animationDirection] : undefined
        }
      };
    }

    return baseProps;
  };

  // Main dialog content
  const dialogContent = (
    <Box
      ref={dialogRef}
      sx={{
        width: responsiveSize.width,
        maxWidth: '100%',
        maxHeight: fullScreen || isMaximized ? '100vh' : '90vh',
        display: 'flex',
        flexDirection: 'column',
        ...sx
      }}
    >
      {/* Progress bar */}
      {showProgress && progress !== undefined && (
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 4,
            borderRadius: 0,
            background: alpha('#667eea', 0.1),
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
            }
          }}
        />
      )}

      {/* Header */}
      {showHeader && renderHeader()}

      {/* Content */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', ...contentSx }}>
        {renderContent()}
      </Box>

      {/* Footer */}
      {renderFooter()}

      {/* Actions */}
      {renderActions()}
    </Box>
  );

  return (
    <MuiDialog
      {...getDialogProps()}
      sx={{
        '& .MuiDialog-paper': {
          margin: isMobile ? 1 : 2,
          width: responsiveSize.width,
          maxWidth: '100%',
          maxHeight: fullScreen || isMaximized ? '100vh' : '90vh'
        }
      }}
    >
      {dialogContent}
    </MuiDialog>
  );
};

// Pre-built dialog components for common use cases
export const ConfirmDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}> = ({ open, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', variant = 'info' }) => {
  return (
    <EnterpriseDialog
      open={open}
      onClose={onClose}
      type="confirm"
      title={title || 'Confirm Action'}
      subtitle={message || 'Are you sure you want to proceed?'}
      confirmOptions={{
        title,
        message,
        confirmText,
        cancelText,
        variant
      }}
      size="sm"
      showClose={false}
      variant={variant}
      onCancel={onClose}
      actions={[
        {
          id: 'cancel',
          label: cancelText,
          onClick: onClose,
          variant: 'secondary'
        },
        {
          id: 'confirm',
          label: confirmText,
          onClick: onConfirm,
          variant: variant === 'danger' ? 'danger' : 'primary'
        }
      ]}
    />
  );
};

export const AlertDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  actions?: DialogAction[];
}> = ({ open, onClose, type, title, message, actions = [] }) => {
  return (
    <EnterpriseDialog
      open={open}
      onClose={onClose}
      type="alert"
      title={title}
      subtitle={message}
      variant={type}
      size="sm"
      showClose={false}
      alert={{
        type,
        title,
        message,
        actions: actions.length > 0 ? actions : [
          {
            id: 'ok',
            label: 'OK',
            onClick: onClose,
            variant: 'primary'
          }
        ]
      }}
    />
  );
};

export const FormDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, any>) => void | Promise<void>;
  title: string;
  subtitle?: string;
  fields: DialogField[];
  size?: 'sm' | 'md' | 'lg';
}> = ({ open, onClose, onSubmit, title, subtitle, fields, size = 'md' }) => {
  return (
    <EnterpriseDialog
      open={open}
      onClose={onClose}
      type="form"
      title={title}
      subtitle={subtitle}
      fields={fields}
      size={size}
      onSubmit={onSubmit}
      onCancel={onClose}
      showClose={true}
      showDivider={true}
    />
  );
};

export const WizardDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  steps: DialogStep[];
  onFinish: () => void | Promise<void>;
  size?: 'md' | 'lg';
}> = ({ open, onClose, title, subtitle, steps, onFinish, size = 'md' }) => {
  return (
    <EnterpriseDialog
      open={open}
      onClose={onClose}
      type="wizard"
      title={title}
      subtitle={subtitle}
      steps={steps}
      size={size}
      onSubmit={onFinish}
      onCancel={onClose}
      showClose={true}
    />
  );
};

// Usage examples:
export const UsageExamples = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  const formFields: DialogField[] = [
    {
      id: 'name',
      type: 'text',
      label: 'Document Name',
      placeholder: 'Enter document name',
      required: true,
      validation: {
        required: true,
        minLength: 3,
        message: 'Name must be at least 3 characters'
      },
      icon: <FileText size={18} />
    },
    {
      id: 'type',
      type: 'select',
      label: 'Document Type',
      options: [
        { label: 'PDF', value: 'pdf' },
        { label: 'Word Document', value: 'docx' },
        { label: 'Excel Spreadsheet', value: 'xlsx' }
      ],
      required: true,
      value: 'pdf'
    },
    {
      id: 'description',
      type: 'textarea',
      label: 'Description',
      placeholder: 'Enter document description',
      validation: {
        maxLength: 500,
        message: 'Description cannot exceed 500 characters'
      }
    },
    {
      id: 'tags',
      type: 'text',
      label: 'Tags',
      placeholder: 'Enter tags separated by commas',
      helperText: 'Add relevant tags for better organization'
    }
  ];

  const wizardSteps: DialogStep[] = [
    {
      id: 'step1',
      label: 'Document Information',
      description: 'Provide basic document details',
      content: (
        <Box>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Enter the basic information for your new document.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Document Name"
                placeholder="Enter document name"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                placeholder="Enter document description"
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </Box>
      )
    },
    {
      id: 'step2',
      label: 'Document Settings',
      description: 'Configure document settings',
      content: (
        <Box>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Configure the settings for your document.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Document Type</InputLabel>
                <Select defaultValue="pdf">
                  <MenuItem value="pdf">PDF</MenuItem>
                  <MenuItem value="docx">Word Document</MenuItem>
                  <MenuItem value="xlsx">Excel Spreadsheet</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Enable version control"
              />
            </Grid>
          </Grid>
        </Box>
      )
    },
    {
      id: 'step3',
      label: 'Review & Confirm',
      description: 'Review your settings and confirm',
      content: (
        <Box>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Review your document settings before creating.
          </Typography>
          <Card elevation={0} sx={{ borderRadius: 2, background: alpha('#667eea', 0.05) }}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                Document Summary
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Name:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Sample Document</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Type:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>PDF</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Version Control:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>Enabled</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      )
    }
  ];

  const handleFormSubmit = async (data: Record<string, any>) => {
    console.log('Form submitted:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setFormOpen(false);
  };

  const handleWizardFinish = async () => {
    console.log('Wizard completed');
    setWizardOpen(false);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 800, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Dialog Component Examples
      </Typography>

      <Grid container spacing={3}>
        {/* Confirm Dialog */}
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setConfirmOpen(true)}
            startIcon={<AlertCircle size={18} />}
            sx={{ borderRadius: 2, fontWeight: 600 }}
          >
            Confirm Dialog
          </Button>
          <ConfirmDialog
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            onConfirm={() => {
              console.log('Confirmed!');
              setConfirmOpen(false);
            }}
            title="Delete Document"
            message="Are you sure you want to delete this document? This action cannot be undone."
            variant="danger"
            confirmText="Delete"
          />
        </Grid>

        {/* Alert Dialog */}
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setAlertOpen(true)}
            startIcon={<Info size={18} />}
            sx={{ borderRadius: 2, fontWeight: 600 }}
          >
            Alert Dialog
          </Button>
          <AlertDialog
            open={alertOpen}
            onClose={() => setAlertOpen(false)}
            type="success"
            title="Success!"
            message="Your document has been saved successfully."
          />
        </Grid>

        {/* Form Dialog */}
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setFormOpen(true)}
            startIcon={<FileText size={18} />}
            sx={{ borderRadius: 2, fontWeight: 600 }}
          >
            Form Dialog
          </Button>
          <FormDialog
            open={formOpen}
            onClose={() => setFormOpen(false)}
            onSubmit={handleFormSubmit}
            title="Create New Document"
            subtitle="Fill in the details to create a new document"
            fields={formFields}
            size="md"
          />
        </Grid>

        {/* Wizard Dialog */}
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => setWizardOpen(true)}
            startIcon={<Zap size={18} />}
            sx={{ borderRadius: 2, fontWeight: 600 }}
          >
            Wizard Dialog
          </Button>
          <WizardDialog
            open={wizardOpen}
            onClose={() => setWizardOpen(false)}
            onFinish={handleWizardFinish}
            title="Create Document Wizard"
            subtitle="Follow the steps to create your document"
            steps={wizardSteps}
            size="lg"
          />
        </Grid>
      </Grid>

      {/* Advanced Examples */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Advanced Features</Typography>
        
        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          <Button
            variant="outlined"
            startIcon={<Maximize2 size={18} />}
            onClick={() => setFullscreenOpen(true)}
            sx={{ borderRadius: 2 }}
          >
            Fullscreen Dialog
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<BarChart3 size={18} />}
            onClick={() => console.log('Loading dialog')}
            sx={{ borderRadius: 2 }}
          >
            Loading Dialog
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Users size={18} />}
            onClick={() => console.log('Multi-tab dialog')}
            sx={{ borderRadius: 2 }}
          >
            Multi-Tab Dialog
          </Button>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          The Enterprise Dialog component provides a comprehensive solution for all modal dialog needs 
          in your application. It supports various types including confirmations, alerts, forms, wizards, 
          and custom content with advanced features like validation, progress tracking, and responsive design.
        </Typography>
      </Box>
    </Box>
  );
};

export default EnterpriseDialog;
