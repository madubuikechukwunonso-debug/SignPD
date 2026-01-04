import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Stack,
  Chip,
  Badge,
  Tooltip,
  alpha,
  Card,
  CardContent,
  Grid,
  IconButton,
  Button,
  Divider,
  Fade,
  Zoom,
  useTheme,
  useMediaQuery,
  FormHelperText,
  FormGroup,
  Checkbox,
  Switch
} from '@mui/material';
import {
  Circle,
  CheckCircle,
  Info,
  AlertTriangle,
  HelpCircle,
  Star,
  Shield,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  CreditCard,
  DollarSign,
  Percent,
  Hash,
  AtSign,
  Paperclip,
  Globe,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Bell,
  Notification,
  Settings,
  User,
  Users,
  Award,
  Certificate,
  Verified,
  Clock,
  Calendar,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Plus,
  Minus,
  Edit,
  Trash2,
  Save,
  Share2,
  ExternalLink,
  Eye,
  EyeOff,
  Download,
  Upload,
  Copy,
  RefreshCw,
  RotateCcw,
  RotateCw,
  Search,
  Filter,
  MoreVertical,
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export type RadioGroupVariant = 'default' | 'card' | 'button' | 'tile' | 'list' | 'enterprise' | 'glass';
export type RadioGroupSize = 'small' | 'medium' | 'large';
export type RadioGroupColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gradient';
export type RadioGroupDirection = 'vertical' | 'horizontal' | 'grid';
export type RadioGroupAlignment = 'start' | 'center' | 'end' | 'space-between';

export interface RadioOption {
  value: string | number;
  label: string;
  description?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: string | number;
  tooltip?: string;
  color?: string;
  backgroundColor?: string;
  image?: string;
  meta?: Record<string, any>;
  actions?: Array<{
    icon: React.ReactNode;
    onClick: () => void;
    label?: string;
    disabled?: boolean;
  }>;
}

export interface RadioGroupProps {
  // Core props
  options: RadioOption[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  
  // Form integration
  name?: string;
  id?: string;
  label?: string;
  helperText?: string;
  error?: string | boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  
  // Display options
  variant?: RadioGroupVariant;
  size?: RadioGroupSize;
  color?: RadioGroupColor;
  direction?: RadioGroupDirection;
  alignment?: RadioGroupAlignment;
  
  // Layout and styling
  columns?: number;
  gap?: number;
  itemSpacing?: number;
  itemPadding?: number;
  itemBorderRadius?: number;
  itemMinWidth?: number;
  itemMaxWidth?: number;
  itemHeight?: number;
  
  // Visual features
  showIcon?: boolean;
  showBadge?: boolean;
  showDescription?: boolean;
  showTooltip?: boolean;
  showImage?: boolean;
  showActions?: boolean;
  showBorder?: boolean;
  showShadow?: boolean;
  showHover?: boolean;
  showSelectionIndicator?: boolean;
  
  // Advanced features
  multiple?: boolean;
  maxSelections?: number;
  minSelections?: number;
  exclusive?: boolean;
  nullable?: boolean;
  searchable?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  groupable?: boolean;
  
  // Selection features
  defaultSelected?: string | number | (string | number)[];
  selectedIcon?: React.ReactNode;
  unselectedIcon?: React.ReactNode;
  selectionColor?: string;
  selectionIndicator?: 'check' | 'dot' | 'border' | 'background' | 'icon';
  
  // Interactive features
  clickable?: boolean;
  hoverable?: boolean;
  selectable?: boolean;
  deselectable?: boolean;
  toggleable?: boolean;
  
  // Validation
  validation?: 'required' | 'min' | 'max' | 'custom';
  customValidation?: (value: any) => boolean | string;
  validateOnMount?: boolean;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  
  // Enterprise features
  enterprise?: boolean;
  showQuickStats?: boolean;
  quickStats?: Array<{
    label: string;
    value: string | number;
    icon?: React.ReactNode;
  }>;
  showSelectionSummary?: boolean;
  selectionSummary?: {
    total: number;
    selected: number;
    label?: string;
  };
  
  // Performance
  virtualized?: boolean;
  bufferSize?: number;
  debounce?: number;
  
  // Animation
  animated?: boolean;
  animationType?: 'fade' | 'zoom' | 'slide' | 'grow' | 'none';
  animationDuration?: number;
  staggerAnimation?: boolean;
  
  // Mobile optimization
  mobileOptimized?: boolean;
  mobileVariant?: RadioGroupVariant;
  mobileSize?: RadioGroupSize;
  mobileDirection?: RadioGroupDirection;
  
  // Accessibility
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  role?: string;
  
  // Custom rendering
  renderOption?: (option: RadioOption, isSelected: boolean, isDisabled: boolean) => React.ReactNode;
  renderLabel?: (option: RadioOption, isSelected: boolean) => React.ReactNode;
  renderIcon?: (option: RadioOption, isSelected: boolean) => React.ReactNode;
  renderBadge?: (option: RadioOption, isSelected: boolean) => React.ReactNode;
  renderActions?: (option: RadioOption, isSelected: boolean) => React.ReactNode;
  
  // Event handlers
  onSelectionChange?: (value: string | number | (string | number)[]) => void;
  onOptionClick?: (option: RadioOption, index: number) => void;
  onOptionHover?: (option: RadioOption, index: number) => void;
  onOptionSelect?: (option: RadioOption, index: number) => void;
  onOptionDeselect?: (option: RadioOption, index: number) => void;
  
  // Styling overrides
  className?: string;
  sx?: any;
  style?: React.CSSProperties;
  itemSx?: any;
  labelSx?: any;
  helperTextSx?: any;
  
  // Special modes
  compact?: boolean;
  inline?: boolean;
  grid?: boolean;
  card?: boolean;
  button?: boolean;
  tile?: boolean;
  list?: boolean;
}

interface RadioOptionProps {
  option: RadioOption;
  isSelected: boolean;
  isDisabled: boolean;
  isMultiple: boolean;
  variant: RadioGroupVariant;
  size: RadioGroupSize;
  color: RadioGroupColor;
  showIcon: boolean;
  showBadge: boolean;
  showDescription: boolean;
  showActions: boolean;
  selectionIndicator: string;
  selectedIcon?: React.ReactNode;
  unselectedIcon?: React.ReactNode;
  onChange: (value: string | number) => void;
  onOptionClick?: (option: RadioOption, index: number) => void;
  onOptionHover?: (option: RadioOption, index: number) => void;
  renderOption?: (option: RadioOption, isSelected: boolean, isDisabled: boolean) => React.ReactNode;
  renderLabel?: (option: RadioOption, isSelected: boolean) => React.ReactNode;
  renderIcon?: (option: RadioOption, isSelected: boolean) => React.ReactNode;
  renderBadge?: (option: RadioOption, isSelected: boolean) => React.ReactNode;
  renderActions?: (option: RadioOption, isSelected: boolean) => React.ReactNode;
  index: number;
  enterprise?: boolean;
  animated?: boolean;
  animationType?: string;
  animationDuration?: number;
  staggerDelay?: number;
  sx?: any;
}

const RadioOptionComponent: React.FC<RadioOptionProps> = ({
  option,
  isSelected,
  isDisabled,
  isMultiple,
  variant,
  size,
  color,
  showIcon,
  showBadge,
  showDescription,
  showActions,
  selectionIndicator,
  selectedIcon,
  unselectedIcon,
  onChange,
  onOptionClick,
  onOptionHover,
  renderOption,
  renderLabel,
  renderIcon,
  renderBadge,
  renderActions,
  index,
  enterprise = false,
  animated = false,
  animationType = 'fade',
  animationDuration = 200,
  staggerDelay = 0,
  sx
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Animation components
  const AnimationComponent = {
    fade: Fade,
    zoom: Zoom,
    slide: Slide,
    grow: Grow,
    none: React.Fragment
  }[animationType];

  const animationProps = animationType === 'slide' 
    ? { direction: "up" as const }
    : animationType === 'grow'
    ? { timeout: animationDuration }
    : { timeout: animationDuration };

  // Get color based on variant and selection
  const getColor = () => {
    const colors = {
      primary: '#667eea',
      secondary: '#f093fb',
      success: '#43e97b',
      warning: '#ffa726',
      error: '#f44336',
      info: '#4facfe',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    };
    return colors[color] || colors.primary;
  };

  const primaryColor = getColor();

  // Get size styles
  const getSizeStyles = () => {
    const sizes = {
      small: { 
        padding: '8px 12px', 
        fontSize: '12px', 
        iconSize: 16, 
        spacing: 1,
        borderRadius: 2
      },
      medium: { 
        padding: '12px 16px', 
        fontSize: '14px', 
        iconSize: 20, 
        spacing: 2,
        borderRadius: 3
      },
      large: { 
        padding: '16px 20px', 
        fontSize: '16px', 
        iconSize: 24, 
        spacing: 3,
        borderRadius: 4
      }
    };
    return sizes[size] || sizes.medium;
  };

  const sizeStyles = getSizeStyles();

  // Handle option click
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDisabled) {
      onChange(option.value);
      onOptionClick?.(option, index);
    }
  };

  // Handle option hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    onOptionHover?.(option, index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Render selection indicator
  const renderSelectionIndicator = () => {
    if (selectionIndicator === 'none') return null;

    const iconColor = isSelected ? primaryColor : alpha('#000', 0.3);
    const icon = isSelected 
      ? (selectedIcon || <CheckCircle size={sizeStyles.iconSize} color={iconColor} />)
      : (unselectedIcon || <Circle size={sizeStyles.iconSize} color={iconColor} />);

    switch (selectionIndicator) {
      case 'check':
        return icon;
      case 'dot':
        return (
          <Box
            sx={{
              width: sizeStyles.iconSize,
              height: sizeStyles.iconSize,
              borderRadius: '50%',
              backgroundColor: isSelected ? primaryColor : 'transparent',
              border: `2px solid ${iconColor}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            {isSelected && <Circle size={sizeStyles.iconSize * 0.5} color="white" fill="white" />}
          </Box>
        );
      case 'border':
        return null; // Border is handled in the main container
      case 'background':
        return null; // Background is handled in the main container
      default:
        return icon;
    }
  };

  // Render option content
  const renderOptionContent = () => {
    if (renderOption) {
      return renderOption(option, isSelected, isDisabled);
    }

    const baseContent = (
      <Stack
        direction="row"
        spacing={sizeStyles.spacing}
        alignItems="center"
        sx={{ width: '100%' }}
      >
        {/* Selection indicator */}
        {selectionIndicator !== 'none' && selectionIndicator !== 'background' && (
          <Box sx={{ flexShrink: 0 }}>
            {renderSelectionIndicator()}
          </Box>
        )}

        {/* Icon */}
        {showIcon && (renderIcon ? renderIcon(option, isSelected) : option.icon) && (
          <Box sx={{ 
            flexShrink: 0,
            color: isSelected ? primaryColor : 'text.secondary',
            fontSize: sizeStyles.iconSize
          }}>
            {renderIcon ? renderIcon(option, isSelected) : option.icon}
          </Box>
        )}

        {/* Main content */}
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Stack spacing={0.5}>
            {/* Label */}
            <Typography
              variant={size === 'small' ? 'body2' : 'body1'}
              sx={{
                fontWeight: isSelected ? 700 : 600,
                color: isSelected ? primaryColor : 'text.primary',
                ...(renderLabel && renderLabel(option, isSelected))
              }}
            >
              {renderLabel ? renderLabel(option, isSelected) : option.label}
            </Typography>

            {/* Description */}
            {showDescription && option.description && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {option.description}
              </Typography>
            )}
          </Stack>
        </Box>

        {/* Badge */}
        {showBadge && (renderBadge ? renderBadge(option, isSelected) : option.badge) && (
          <Box sx={{ flexShrink: 0 }}>
            {renderBadge ? (
              renderBadge(option, isSelected)
            ) : (
              <Chip
                label={option.badge}
                size="small"
                sx={{
                  backgroundColor: isSelected ? alpha(primaryColor, 0.1) : alpha('#000', 0.05),
                  color: isSelected ? primaryColor : 'text.secondary',
                  fontWeight: 600,
                  fontSize: size === 'small' ? '10px' : '11px'
                }}
              />
            )}
          </Box>
        )}

        {/* Actions */}
        {showActions && option.actions && option.actions.length > 0 && (
          <Box sx={{ flexShrink: 0 }}>
            {renderActions ? (
              renderActions(option, isSelected)
            ) : (
              <Stack direction="row" spacing={0.5}>
                {option.actions.map((action, actionIndex) => (
                  <Tooltip key={actionIndex} title={action.label || ''}>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        action.onClick();
                      }}
                      disabled={action.disabled || isDisabled}
                      sx={{ color: 'text.secondary' }}
                    >
                      {action.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </Stack>
            )}
          </Box>
        )}
      </Stack>
    );

    // Variant-specific styling
    const variantStyles = {
      default: {
        padding: sizeStyles.padding,
        borderRadius: sizeStyles.borderRadius,
        backgroundColor: 'white',
        border: `1px solid ${isSelected ? primaryColor : alpha('#000', 0.1)}`,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: !isDisabled ? alpha(primaryColor, 0.05) : 'white',
          borderColor: !isDisabled ? primaryColor : alpha('#000', 0.1),
          transform: !isDisabled ? 'translateY(-1px)' : 'none',
          boxShadow: !isDisabled ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none'
        }
      },
      card: {
        padding: sizeStyles.padding,
        borderRadius: sizeStyles.borderRadius * 2,
        backgroundColor: 'white',
        border: `2px solid ${isSelected ? primaryColor : alpha('#000', 0.08)}`,
        boxShadow: isSelected ? '0 8px 24px rgba(0, 0, 0, 0.12)' : '0 2px 8px rgba(0, 0, 0, 0.08)',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: !isDisabled ? alpha(primaryColor, 0.02) : 'white',
          borderColor: !isDisabled ? primaryColor : alpha('#000', 0.08),
          transform: !isDisabled ? 'translateY(-2px)' : 'none',
          boxShadow: !isDisabled ? '0 12px 32px rgba(0, 0, 0, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.08)'
        }
      },
      button: {
        padding: `${sizeStyles.padding} ${sizeStyles.padding * 1.5}`,
        borderRadius: sizeStyles.borderRadius * 2,
        backgroundColor: isSelected 
          ? (gradient && color === 'gradient' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : primaryColor)
          : 'white',
        color: isSelected ? 'white' : primaryColor,
        border: `2px solid ${primaryColor}`,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: !isDisabled 
            ? (isSelected ? primaryColor : alpha(primaryColor, 0.1))
            : (isSelected ? primaryColor : 'white'),
          transform: !isDisabled ? 'translateY(-1px)' : 'none',
          boxShadow: !isDisabled ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none'
        }
      },
      tile: {
        padding: sizeStyles.padding * 1.5,
        borderRadius: sizeStyles.borderRadius * 2,
        backgroundColor: isSelected ? alpha(primaryColor, 0.05) : 'white',
        border: `2px solid ${isSelected ? primaryColor : alpha('#000', 0.1)}`,
        boxShadow: isSelected ? '0 8px 24px rgba(0, 0, 0, 0.12)' : '0 2px 8px rgba(0, 0, 0, 0.08)',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        minHeight: 80,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '&:hover': {
          backgroundColor: !isDisabled ? alpha(primaryColor, 0.08) : 'white',
          borderColor: !isDisabled ? primaryColor : alpha('#000', 0.1),
          transform: !isDisabled ? 'translateY(-2px)' : 'none',
          boxShadow: !isDisabled ? '0 12px 32px rgba(0, 0, 0, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.08)'
        }
      },
      list: {
        padding: `${sizeStyles.padding} 0`,
        borderBottom: `1px solid ${alpha('#000', 0.1)}`,
        backgroundColor: 'transparent',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: !isDisabled ? alpha(primaryColor, 0.02) : 'transparent',
          paddingLeft: !isDisabled ? '8px' : '0',
          paddingRight: !isDisabled ? '8px' : '0'
        },
        '&:last-child': {
          borderBottom: 'none'
        }
      },
      enterprise: {
        padding: sizeStyles.padding * 1.5,
        borderRadius: sizeStyles.borderRadius * 3,
        background: isSelected
          ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)'
          : 'white',
        border: `2px solid ${isSelected ? primaryColor : alpha('#000', 0.08)}`,
        boxShadow: isSelected 
          ? '0 12px 40px rgba(102, 126, 234, 0.2)' 
          : '0 4px 16px rgba(0, 0, 0, 0.08)',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: isSelected ? primaryColor : 'transparent',
          transition: 'all 0.3s ease'
        },
        '&:hover': {
          background: !isDisabled 
            ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)'
            : 'white',
          borderColor: !isDisabled ? primaryColor : alpha('#000', 0.08),
          transform: !isDisabled ? 'translateY(-3px)' : 'none',
          boxShadow: !isDisabled 
            ? '0 16px 48px rgba(102, 126, 234, 0.25)' 
            : '0 4px 16px rgba(0, 0, 0, 0.08)'
        }
      },
      glass: {
        padding: sizeStyles.padding * 1.5,
        borderRadius: sizeStyles.borderRadius * 3,
        background: `rgba(255, 255, 255, ${isSelected ? 0.9 : 0.7})`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid rgba(255, 255, 255, ${isSelected ? 0.5 : 0.3})`,
        boxShadow: isSelected 
          ? '0 8px 32px rgba(0, 0, 0, 0.2)' 
          : '0 4px 16px rgba(0, 0, 0, 0.1)',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          background: !isDisabled 
            ? `rgba(255, 255, 255, ${isSelected ? 0.95 : 0.8})`
            : `rgba(255, 255, 255, 0.7)`,
          borderColor: !isDisabled ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.3)',
          transform: !isDisabled ? 'translateY(-2px)' : 'none',
          boxShadow: !isDisabled 
            ? '0 12px 40px rgba(0, 0, 0, 0.25)' 
            : '0 4px 16px rgba(0, 0, 0, 0.1)'
        }
      }
    };

    return (
      <AnimationComponent
        in={true}
        timeout={animationDuration}
        {...animationProps}
        style={{ transitionDelay: `${staggerDelay}ms` }}
      >
        <Box
          sx={{
            ...variantStyles[variant],
            opacity: isDisabled ? 0.6 : 1,
            pointerEvents: isDisabled ? 'none' : 'auto',
            ...sx
          }}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {baseContent}
        </Box>
      </AnimationComponent>
    );
  };

  return renderOptionContent();
};

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  const {
    options,
    value: controlledValue,
    defaultValue,
    onChange,
    onBlur,
    onFocus,
    name,
    id,
    label,
    helperText,
    error,
    required = false,
    disabled = false,
    readOnly = false,
    variant = 'default',
    size = 'medium',
    color = 'primary',
    direction = 'vertical',
    alignment = 'start',
    columns = direction === 'grid' ? 2 : 1,
    gap = 2,
    itemSpacing = 2,
    itemPadding,
    itemBorderRadius,
    itemMinWidth,
    itemMaxWidth,
    itemHeight,
    showIcon = true,
    showBadge = true,
    showDescription = true,
    showTooltip = true,
    showImage = false,
    showActions = false,
    showBorder = true,
    showShadow = false,
    showHover = true,
    showSelectionIndicator = true,
    multiple = false,
    maxSelections,
    minSelections,
    exclusive = true,
    nullable = false,
    searchable = false,
    filterable = false,
    sortable = false,
    groupable = false,
    defaultSelected,
    selectedIcon,
    unselectedIcon,
    selectionColor,
    selectionIndicator = 'check',
    clickable = true,
    hoverable = true,
    selectable = true,
    deselectable = true,
    toggleable = true,
    validation,
    customValidation,
    validateOnMount = false,
    validateOnChange = true,
    validateOnBlur = true,
    enterprise = false,
    showQuickStats = false,
    quickStats = [],
    showSelectionSummary = false,
    selectionSummary,
    virtualized = false,
    bufferSize = 5,
    debounce = 0,
    animated = true,
    animationType = 'fade',
    animationDuration = 200,
    staggerAnimation = true,
    mobileOptimized = true,
    mobileVariant,
    mobileSize,
    mobileDirection,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    role = 'radiogroup',
    renderOption,
    renderLabel,
    renderIcon,
    renderBadge,
    renderActions,
    onSelectionChange,
    onOptionClick,
    onOptionHover,
    onOptionSelect,
    onOptionDeselect,
    className,
    sx,
    style,
    itemSx,
    labelSx,
    helperTextSx,
    compact = false,
    inline = false,
    grid = false,
    card = false,
    button = false,
    tile = false,
    list = false
  } = props;

  const [selectedValue, setSelectedValue] = useState<string | number | (string | number)[]>(
    controlledValue !== undefined ? controlledValue : (defaultValue || (multiple ? [] : ''))
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [validationError, setValidationError] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Determine final variant based on props
  const finalVariant = card ? 'card' : 
                     button ? 'button' : 
                     tile ? 'tile' : 
                     list ? 'list' : 
                     grid ? 'grid' : 
                     variant;

  // Determine final direction
  const finalDirection = inline ? 'horizontal' : 
                        grid ? 'grid' : 
                        mobileDirection && isMobile ? mobileDirection : 
                        direction;

  // Filter options based on search
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery) return options;
    
    return options.filter(option => 
      option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option.value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery, searchable]);

  // Sort options if sortable
  const sortedOptions = useMemo(() => {
    if (!sortable) return filteredOptions;
    return [...filteredOptions].sort((a, b) => a.label.localeCompare(b.label));
  }, [filteredOptions, sortable]);

  // Handle value changes
  const handleValueChange = (value: string | number) => {
    let newValue: string | number | (string | number)[];

    if (multiple) {
      const currentArray = Array.isArray(selectedValue) ? selectedValue : [];
      
      if (currentArray.includes(value)) {
        // Deselect
        if (!deselectable || (minSelections && currentArray.length <= minSelections)) {
          return; // Prevent deselection if not allowed
        }
        newValue = currentArray.filter(v => v !== value);
      } else {
        // Select
        if (maxSelections && currentArray.length >= maxSelections) {
          return; // Prevent selection if max reached
        }
        newValue = [...currentArray, value];
      }
    } else {
      // Single selection
      if (value === selectedValue && nullable) {
        newValue = '';
      } else {
        newValue = value;
      }
    }

    setSelectedValue(newValue);
    
    // Call event handlers
    onChange?.(newValue);
    onSelectionChange?.(newValue);
    
    if (Array.isArray(newValue)) {
      const wasSelected = Array.isArray(selectedValue) && selectedValue.includes(value);
      if (wasSelected) {
        onOptionDeselect?.(options.find(opt => opt.value === value)!, 
          options.findIndex(opt => opt.value === value));
      } else {
        onOptionSelect?.(options.find(opt => opt.value === value)!, 
          options.findIndex(opt => opt.value === value));
      }
    } else {
      const option = options.find(opt => opt.value === newValue);
      if (option) {
        onOptionSelect?.(option, options.findIndex(opt => opt.value === newValue));
      }
    }
  };

  // Validate selection
  const validateSelection = () => {
    if (!validation) return '';

    if (validation === 'required' && required) {
      if (multiple) {
        const array = Array.isArray(selectedValue) ? selectedValue : [];
        if (array.length === 0) return 'Please select at least one option';
      } else {
        if (!selectedValue) return 'Please select an option';
      }
    }

    if (validation === 'min' && minSelections) {
      const array = Array.isArray(selectedValue) ? selectedValue : [];
      if (array.length < minSelections) return `Please select at least ${minSelections} options`;
    }

    if (validation === 'max' && maxSelections) {
      const array = Array.isArray(selectedValue) ? selectedValue : [];
      if (array.length > maxSelections) return `Please select no more than ${maxSelections} options`;
    }

    if (validation === 'custom' && customValidation) {
      const result = customValidation(selectedValue);
      if (typeof result === 'string') return result;
      if (!result) return 'Invalid selection';
    }

    return '';
  };

  // Update validation error
  useEffect(() => {
    const error = validateSelection();
    setValidationError(error);
  }, [selectedValue, validation, minSelections, maxSelections, required]);

  // Get layout styles
  const getLayoutStyles = () => {
    const baseStyles = {
      display: 'flex',
      gap: gap,
      flexWrap: finalDirection === 'grid' ? 'wrap' : 'nowrap',
      justifyContent: alignment === 'start' ? 'flex-start' :
                     alignment === 'center' ? 'center' :
                     alignment === 'end' ? 'flex-end' :
                     'space-between',
      alignItems: finalDirection === 'vertical' ? 'stretch' : 'center'
    };

    if (finalDirection === 'grid') {
      return {
        ...baseStyles,
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridGap: gap
      };
    }

    if (finalDirection === 'horizontal') {
      return {
        ...baseStyles,
        flexDirection: 'row' as const,
        overflowX: 'auto' as const
      };
    }

    return {
      ...baseStyles,
      flexDirection: 'column' as const
    };
  };

  // Render individual option
  const renderRadioOption = (option: RadioOption, index: number) => {
    const isSelected = multiple 
      ? (Array.isArray(selectedValue) ? selectedValue : []).includes(option.value)
      : selectedValue === option.value;

    const isDisabled = disabled || readOnly || option.disabled;
    const staggerDelay = staggerAnimation ? index * 50 : 0;

    return (
      <RadioOptionComponent
        key={`${option.value}-${index}`}
        option={option}
        isSelected={isSelected}
        isDisabled={isDisabled}
        isMultiple={multiple}
        variant={finalVariant}
        size={mobileSize && isMobile ? mobileSize : size}
        color={color}
        showIcon={showIcon}
        showBadge={showBadge}
        showDescription={showDescription}
        showActions={showActions}
        selectionIndicator={selectionIndicator}
        selectedIcon={selectedIcon}
        unselectedIcon={unselectedIcon}
        onChange={handleValueChange}
        onOptionClick={onOptionClick}
        onOptionHover={onOptionHover}
        renderOption={renderOption}
        renderLabel={renderLabel}
        renderIcon={renderIcon}
        renderBadge={renderBadge}
        renderActions={renderActions}
        index={index}
        enterprise={enterprise}
        animated={animated}
        animationType={animationType}
        animationDuration={animationDuration}
        staggerDelay={staggerDelay}
        sx={itemSx}
      />
    );
  };

  // Render quick stats for enterprise
  const renderQuickStats = () => {
    if (!showQuickStats || quickStats.length === 0) return null;

    return (
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {quickStats.map((stat, index) => (
          <Grid item xs={6} md={3} key={index}>
            <Card elevation={0} sx={{ borderRadius: 3, background: alpha('#667eea', 0.05) }}>
              <CardContent sx={{ p: 2, textAlign: 'center' }}>
                <Stack spacing={1} alignItems="center">
                  <Box sx={{ color: '#667eea' }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#667eea' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  // Render selection summary for enterprise
  const renderSelectionSummary = () => {
    if (!showSelectionSummary || !selectionSummary) return null;

    const { total, selected, label = 'items selected' } = selectionSummary;

    return (
      <Card elevation={0} sx={{ borderRadius: 3, background: alpha('#667eea', 0.05), mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              {selected} of {total} {label}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                onClick={() => {
                  const allValues = options.map(opt => opt.value);
                  setSelectedValue(multiple ? allValues : allValues[0]);
                }}
                disabled={disabled}
                sx={{ minWidth: 60 }}
              >
                All
              </Button>
              <Button
                size="small"
                onClick={() => setSelectedValue(multiple ? [] : '')}
                disabled={disabled}
                sx={{ minWidth: 60 }}
              >
                None
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    );
  };

  // Main content
  const mainContent = () => (
    <FormControl
      component="fieldset"
      error={!!error || !!validationError}
      required={required}
      disabled={disabled}
      fullWidth
    >
      {/* Label */}
      {label && (
        <FormLabel
          component="legend"
          sx={{
            mb: 2,
            fontWeight: 700,
            color: enterprise ? '#667eea' : 'text.primary',
            ...labelSx
          }}
        >
          {label}
          {required && <span style={{ color: '#f44336', marginLeft: '4px' }}>*</span>}
        </FormLabel>
      )}

      {/* Quick stats */}
      {enterprise && renderQuickStats()}

      {/* Selection summary */}
      {enterprise && renderSelectionSummary()}

      {/* Search input */}
      {searchable && (
        <Box sx={{ mb: 2 }}>
          <TextField
            size="small"
            placeholder="Search options..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <Search size={16} style={{ marginRight: 8, color: '#6c757d' }} />
            }}
            fullWidth
          />
        </Box>
      )}

      {/* Radio group container */}
      <MuiRadioGroup
        ref={ref}
        name={name}
        value={selectedValue}
        onChange={(e) => handleValueChange(e.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        role={role}
        sx={{
          ...getLayoutStyles(),
          ...(compact && { gap: 1 }),
          ...sx
        }}
      >
        {sortedOptions.map((option, index) => renderRadioOption(option, index))}
      </MuiRadioGroup>

      {/* Helper text */}
      {(helperText || validationError) && (
        <FormHelperText sx={helperTextSx}>
          {validationError || helperText}
        </FormHelperText>
      )}
    </FormControl>
  );

  return (
    <Box
      className={className}
      sx={{
        width: '100%',
        position: 'relative',
        ...style
      }}
    >
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
});

RadioGroup.displayName = 'RadioGroup';

// Specialized radio group components
export const CardRadioGroup: React.FC<Omit<RadioGroupProps, 'variant'>> = (props) => (
  <RadioGroup {...props} variant="card" showShadow={true} showDescription={true} />
);

export const ButtonRadioGroup: React.FC<Omit<RadioGroupProps, 'variant'>> = (props) => (
  <RadioGroup {...props} variant="button" direction="horizontal" showIcon={true} />
);

export const TileRadioGroup: React.FC<Omit<RadioGroupProps, 'variant'>> = (props) => (
  <RadioGroup {...props} variant="tile" direction="grid" columns={2} showIcon={true} showDescription={true} />
);

export const ListRadioGroup: React.FC<Omit<RadioGroupProps, 'variant'>> = (props) => (
  <RadioGroup {...props} variant="list" direction="vertical" compact={true} />
);

export const EnterpriseRadioGroup: React.FC<RadioGroupProps> = (props) => (
  <RadioGroup
    {...props}
    enterprise={true}
    showQuickStats={true}
    showSelectionSummary={true}
    showTooltip={true}
    showActions={true}
    variant="enterprise"
    animated={true}
    animationType="zoom"
  />
);

export const GlassRadioGroup: React.FC<Omit<RadioGroupProps, 'variant'>> = (props) => (
  <RadioGroup {...props} variant="glass" showShadow={false} showBorder={false} animated={true} />
);

export const SearchableRadioGroup: React.FC<Omit<RadioGroupProps, 'searchable'>> = (props) => (
  <RadioGroup {...props} searchable={true} showDescription={true} showTooltip={true} />
);

export const MultiSelectRadioGroup: React.FC<Omit<RadioGroupProps, 'multiple'>> = (props) => (
  <RadioGroup {...props} multiple={true} showSelectionSummary={true} variant="card" />
);

export const ColorPickerRadioGroup: React.FC<Omit<RadioGroupProps, 'variant' | 'showIcon'>> = (props) => (
  <RadioGroup
    {...props}
    variant="tile"
    direction="grid"
    columns={6}
    size="small"
    showIcon={false}
    showDescription={false}
    itemHeight={60}
  />
);

export default RadioGroup;
