import React, { useState, useCallback } from 'react';
import {
  Box,
  Checkbox as MuiCheckbox,
  FormControlLabel,
  Typography,
  Chip,
  Badge,
  Tooltip,
  Fade,
  Zoom,
  alpha,
  useTheme,
  FormHelperText,
  FormGroup,
  FormLabel
} from '@mui/material';
import {
  Check,
  Square,
  CheckSquare,
  MinusSquare,
  AlertCircle,
  Info,
  Shield,
  Lock,
  Star,
  Heart,
  Bookmark,
  Eye,
  EyeOff,
  Circle,
  CheckCircle,
  RadioButtonUnchecked,
  RadioButtonChecked
} from 'lucide-react';

interface CheckboxStyle {
  icon?: 'square' | 'circle' | 'star' | 'heart' | 'bookmark' | 'custom';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  variant?: 'filled' | 'outlined' | 'gradient';
  size?: 'small' | 'medium' | 'large';
  animation?: 'fade' | 'zoom' | 'bounce' | 'none';
}

interface CheckboxOption {
  id: string;
  label: string;
  value: any;
  disabled?: boolean;
  description?: string;
  badge?: string | number;
  icon?: React.ReactNode;
  tooltip?: string;
  status?: 'default' | 'warning' | 'error' | 'success' | 'info';
  metadata?: Record<string, any>;
}

interface EnterpriseCheckboxProps {
  // Basic props
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, value?: any) => void;
  onChangeMultiple?: (selectedValues: any[]) => void;
  
  // Options for checkbox groups
  options?: CheckboxOption[];
  value?: any | any[];
  multiple?: boolean;
  
  // Styling
  style?: CheckboxStyle;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  
  // Layout
  direction?: 'horizontal' | 'vertical';
  spacing?: number;
  wrap?: boolean;
  maxHeight?: number;
  
  // Advanced features
  indeterminate?: boolean;
  selectAll?: boolean;
  showCount?: boolean;
  showProgress?: boolean;
  showStatusIcons?: boolean;
  showBadges?: boolean;
  enableTooltip?: boolean;
  enableAnimation?: boolean;
  
  // Customization
  customIcon?: React.ReactNode;
  customCheckedIcon?: React.ReactNode;
  customIndeterminateIcon?: React.ReactNode;
  className?: string;
  sx?: any;
  
  // Accessibility
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
}

const iconComponents = {
  square: Square,
  check: CheckSquare,
  minus: MinusSquare,
  circle: RadioButtonUnchecked,
  checkCircle: CheckCircle,
  star: Star,
  heart: Heart,
  bookmark: Bookmark,
  eye: Eye,
  eyeOff: EyeOff
};

const statusIcons = {
  warning: AlertCircle,
  error: AlertCircle,
  success: CheckCircle,
  info: Info,
  default: null
};

const statusColors = {
  warning: '#ffa726',
  error: '#f44336',
  success: '#4caf50',
  info: '#2196f3',
  default: 'inherit'
};

export const EnterpriseCheckbox: React.FC<EnterpriseCheckboxProps> = ({
  // Basic props
  checked,
  defaultChecked,
  onChange,
  onChangeMultiple,
  
  // Options for groups
  options = [],
  value,
  multiple = false,
  
  // Styling
  style = {},
  label,
  disabled = false,
  required = false,
  error = false,
  helperText,
  
  // Layout
  direction = 'vertical',
  spacing = 2,
  wrap = false,
  maxHeight,
  
  // Advanced features
  indeterminate = false,
  selectAll = false,
  showCount = false,
  showProgress = false,
  showStatusIcons = false,
  showBadges = true,
  enableTooltip = true,
  enableAnimation = true,
  
  // Customization
  customIcon,
  customCheckedIcon,
  customIndeterminateIcon,
  className,
  sx,
  
  // Accessibility
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy
}) => {
  const theme = useTheme();
  const {
    icon = 'square',
    color = 'primary',
    variant = 'filled',
    size = 'medium',
    animation = 'fade'
  } = style;

  const [internalChecked, setInternalChecked] = useState<boolean>(
    checked ?? defaultChecked ?? false
  );
  const [selectedValues, setSelectedValues] = useState<any[]>(
    multiple ? (value ?? []) : []
  );
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  // Animation components
  const AnimationWrapper = enableAnimation ? (animation === 'zoom' ? Zoom : Fade) : React.Fragment;
  const animationProps = enableAnimation && animation !== 'none' ? { timeout: 300 } : {};

  // Size mapping
  const sizeMap = {
    small: { checkbox: 'small', typography: 'body2', spacing: 1 },
    medium: { checkbox: 'medium', typography: 'body1', spacing: 1.5 },
    large: { checkbox: 'medium', typography: 'h6', spacing: 2 }
  };
  const currentSize = sizeMap[size];

  // Custom icons
  const renderIcon = (checked: boolean, indeterminate: boolean) => {
    if (indeterminate && customIndeterminateIcon) {
      return customIndeterminateIcon;
    }
    if (checked && customCheckedIcon) {
      return customCheckedIcon;
    }
    if (!checked && customIcon) {
      return customIcon;
    }

    // Default icons based on style
    if (indeterminate) {
      const MinusIcon = iconComponents.minus;
      return <MinusIcon size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />;
    }

    if (checked) {
      switch (icon) {
        case 'star':
          return <Star size={size === 'small' ? 16 : size === 'large' ? 24 : 20} fill="currentColor" />;
        case 'heart':
          return <Heart size={size === 'small' ? 16 : size === 'large' ? 24 : 20} fill="currentColor" />;
        case 'bookmark':
          return <Bookmark size={size === 'small' ? 16 : size === 'large' ? 24 : 20} fill="currentColor" />;
        case 'circle':
          return <CheckCircle size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />;
        default:
          const CheckIcon = iconComponents.check;
          return <CheckIcon size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />;
      }
    }

    switch (icon) {
      case 'star':
        return <Star size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />;
      case 'heart':
        return <Heart size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />;
      case 'bookmark':
        return <Bookmark size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />;
      case 'circle':
        return <Circle size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />;
      default:
        const SquareIcon = iconComponents.square;
        return <SquareIcon size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />;
    }
  };

  // Color styling based on variant
  const getCheckboxColor = () => {
    if (variant === 'gradient') {
      return {
        color: color,
        '&.Mui-checked': {
          background: `linear-gradient(135deg, ${theme.palette[color].main} 0%, ${theme.palette[color].dark} 100%)`,
          borderRadius: icon === 'circle' ? '50%' : 2,
        }
      };
    }
    return { color: color };
  };

  // Handle single checkbox change
  const handleSingleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
  };

  // Handle multiple checkbox changes
  const handleMultipleChange = (option: CheckboxOption) => {
    if (option.disabled) return;

    const newSelectedValues = selectedValues.includes(option.value)
      ? selectedValues.filter(v => v !== option.value)
      : [...selectedValues, option.value];

    setSelectedValues(newSelectedValues);
    onChangeMultiple?.(newSelectedValues);
  };

  // Handle select all
  const handleSelectAll = () => {
    const enabledOptions = options.filter(opt => !opt.disabled);
    const allSelected = enabledOptions.every(opt => selectedValues.includes(opt.value));
    
    const newSelectedValues = allSelected
      ? selectedValues.filter(v => !enabledOptions.some(opt => opt.value === v))
      : [...selectedValues, ...enabledOptions.map(opt => opt.value)];
    
    setSelectedValues(newSelectedValues);
    onChangeMultiple?.(newSelectedValues);
  };

  // Get selection count
  const getSelectionCount = () => {
    if (multiple) {
      return selectedValues.length;
    }
    return isChecked ? 1 : 0;
  };

  // Get progress percentage
  const getProgressPercentage = () => {
    if (!multiple || options.length === 0) return 0;
    const enabledOptions = options.filter(opt => !opt.disabled);
    return (selectedValues.length / enabledOptions.length) * 100;
  };

  // Render status icon
  const renderStatusIcon = (status: string) => {
    if (!showStatusIcons || status === 'default') return null;
    const StatusIcon = statusIcons[status];
    return (
      <Box sx={{ color: statusColors[status], ml: 1 }}>
        <StatusIcon size={16} />
      </Box>
    );
  };

  // Render individual checkbox option
  const renderCheckboxOption = (option: CheckboxOption) => {
    const isSelected = selectedValues.includes(option.value);
    const isHovered = hoveredItem === option.id;

    return (
      <Tooltip
        key={option.id}
        title={option.tooltip || ''}
        disableHoverListener={!enableTooltip || !option.tooltip}
        arrow
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: currentSize.spacing,
            p: 1.5,
            borderRadius: 2,
            transition: 'all 0.2s ease',
            opacity: option.disabled ? 0.6 : 1,
            background: isHovered ? alpha(theme.palette[color].main, 0.05) : 'transparent',
            border: '1px solid transparent',
            '&:hover': {
              background: alpha(theme.palette[color].main, 0.08),
              borderColor: alpha(theme.palette[color].main, 0.2),
            },
            cursor: option.disabled ? 'not-allowed' : 'pointer',
          }}
          onMouseEnter={() => setHoveredItem(option.id)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <AnimationWrapper {...animationProps}>
            <MuiCheckbox
              checked={isSelected}
              onChange={() => handleMultipleChange(option)}
              disabled={option.disabled || disabled}
              indeterminate={indeterminate}
              icon={renderIcon(false, false)}
              checkedIcon={renderIcon(true, false)}
              indeterminateIcon={renderIcon(false, true)}
              size={currentSize.checkbox}
              sx={{
                ...getCheckboxColor(),
                p: 0,
                '& .MuiSvgIcon-root': {
                  fontSize: size === 'large' ? '28px' : 'inherit'
                }
              }}
            />
          </AnimationWrapper>

          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              {option.icon && (
                <Box sx={{ mr: 1, color: 'text.secondary' }}>
                  {option.icon}
                </Box>
              )}
              <Typography
                variant={currentSize.typography as any}
                sx={{
                  fontWeight: 600,
                  color: option.disabled ? 'text.disabled' : 'text.primary',
                  textDecoration: option.disabled ? 'line-through' : 'none'
                }}
              >
                {option.label}
              </Typography>
              {renderStatusIcon(option.status || 'default')}
              {option.badge && showBadges && (
                <Chip
                  label={option.badge}
                  size="small"
                  sx={{
                    ml: 1,
                    height: 20,
                    fontSize: '0.7rem',
                    fontWeight: 600
                  }}
                />
              )}
              {option.disabled && (
                <Lock size={14} style={{ marginLeft: 8, color: theme.palette.text.disabled }} />
              )}
            </Box>

            {option.description && (
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                {option.description}
              </Typography>
            )}
          </Box>
        </Box>
      </Tooltip>
    );
  };

  // Render single checkbox
  if (!multiple && options.length === 0) {
    return (
      <Box sx={sx} className={className}>
        <AnimationWrapper {...animationProps}>
          <FormControlLabel
            control={
              <MuiCheckbox
                checked={isChecked}
                onChange={handleSingleChange}
                disabled={disabled}
                required={required}
                indeterminate={indeterminate}
                icon={renderIcon(false, indeterminate)}
                checkedIcon={renderIcon(true, false)}
                indeterminateIcon={renderIcon(false, true)}
                size={currentSize.checkbox}
                sx={{
                  ...getCheckboxColor(),
                  '& .MuiSvgIcon-root': {
                    fontSize: size === 'large' ? '28px' : 'inherit'
                  }
                }}
                inputProps={{
                  'aria-label': ariaLabel,
                  'aria-labelledby': ariaLabelledBy,
                  'aria-describedby': ariaDescribedBy
                }}
              />
            }
            label={
              <Typography variant={currentSize.typography as any} sx={{ fontWeight: 600 }}>
                {label}
              </Typography>
            }
            disabled={disabled}
          />
        </AnimationWrapper>

        {helperText && (
          <FormHelperText error={error} sx={{ ml: 4, mt: 1 }}>
            {helperText}
          </FormHelperText>
        )}
      </Box>
    );
  }

  // Render checkbox group
  return (
    <Box sx={sx} className={className}>
      {(label || selectAll || showCount || showProgress) && (
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {label}
              {required && <span style={{ color: theme.palette.error.main }}>*</span>}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {showCount && (
                <Chip
                  label={`${getSelectionCount()} selected`}
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              )}
              {selectAll && options.length > 0 && (
                <Button
                  size="small"
                  onClick={handleSelectAll}
                  sx={{ textTransform: 'none', fontWeight: 600 }}
                >
                  Select All
                </Button>
              )}
            </Box>
          </Box>

          {showProgress && (
            <Box sx={{ mb: 2 }}>
              <LinearProgress
                variant="determinate"
                value={getProgressPercentage()}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  background: alpha(theme.palette[color].main, 0.1),
                  '& .MuiLinearProgress-bar': {
                    background: `linear-gradient(90deg, ${theme.palette[color].main} 0%, ${theme.palette[color].dark} 100%)`,
                    borderRadius: 3
                  }
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                {Math.round(getProgressPercentage())}% complete
              </Typography>
            </Box>
          )}
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: direction,
          gap: spacing,
          flexWrap: wrap ? 'wrap' : 'nowrap',
          maxHeight: maxHeight,
          overflowY: maxHeight ? 'auto' : 'visible',
          '& > *': {
            flex: wrap ? '0 0 auto' : '1 1 auto'
          }
        }}
      >
        {options.map(renderCheckboxOption)}
      </Box>

      {helperText && (
        <FormHelperText error={error} sx={{ mt: 1 }}>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
};

// Pre-built checkbox components for common use cases
export const SecurityCheckbox: React.FC<{ onChange: (checked: boolean) => void }> = ({ onChange }) => (
  <EnterpriseCheckbox
    label="I agree to the security terms and conditions"
    style={{ icon: 'shield', color: 'success', variant: 'gradient' }}
    onChange={onChange}
    required
    showStatusIcons
    options={[{
      id: 'security',
      label: 'Enable advanced security features',
      value: 'security',
      status: 'success',
      description: 'Adds extra layers of protection to your documents',
      icon: <Shield size={18} />
    }]}
  />
);

export const NotificationCheckbox: React.FC<{ onChange: (selected: string[]) => void }> = ({ onChange }) => (
  <EnterpriseCheckbox
    label="Notification Preferences"
    multiple
    style={{ color: 'info', animation: 'zoom' }}
    onChangeMultiple={onChange}
    options={[
      {
        id: 'email',
        label: 'Email notifications',
        value: 'email',
        description: 'Receive updates via email',
        icon: <Info size={18} />
      },
      {
        id: 'sms',
        label: 'SMS notifications',
        value: 'sms',
        description: 'Receive updates via text message',
        icon: <Info size={18} />
      },
      {
        id: 'push',
        label: 'Push notifications',
        value: 'push',
        description: 'Receive updates in your browser',
        icon: <Info size={18} />
      }
    ]}
    showProgress
    enableAnimation
  />
);

export const DocumentTypeCheckbox: React.FC<{ onChange: (selected: string[]) => void }> = ({ onChange }) => (
  <EnterpriseCheckbox
    label="Document Types"
    multiple
    style={{ icon: 'square', color: 'primary', variant: 'gradient' }}
    onChangeMultiple={onChange}
    direction="horizontal"
    spacing={3}
    wrap
    options={[
      {
        id: 'pdf',
        label: 'PDF',
        value: 'pdf',
        badge: 'Most Popular',
        status: 'success'
      },
      {
        id: 'docx',
        label: 'Word Document',
        value: 'docx',
        badge: 'Editable'
      },
      {
        id: 'xlsx',
        label: 'Excel Spreadsheet',
        value: 'xlsx',
        status: 'info'
      },
      {
        id: 'pptx',
        label: 'PowerPoint',
        value: 'pptx',
        status: 'warning'
      }
    ]}
    showBadges
    showStatusIcons
  />
);

// Usage examples:
export const UsageExamples = () => (
  <Box sx={{ p: 4 }}>
    {/* Basic Checkbox */}
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>Basic Checkbox</Typography>
      <EnterpriseCheckbox
        label="I accept the terms and conditions"
        style={{ color: 'primary', size: 'medium' }}
        onChange={(checked) => console.log('Basic checkbox:', checked)}
      />
    </Box>

    {/* Checkbox with Custom Icons */}
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>Custom Icon Checkbox</Typography>
      <EnterpriseCheckbox
        label="Add to favorites"
        style={{ icon: 'heart', color: 'error', animation: 'bounce' }}
        enableAnimation
        onChange={(checked) => console.log('Favorite:', checked)}
      />
    </Box>

    {/* Multiple Selection Group */}
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>Multiple Selection</Typography>
      <EnterpriseCheckbox
        label="Select Features"
        multiple
        style={{ color: 'secondary' }}
        onChangeMultiple={(selected) => console.log('Selected features:', selected)}
        options={[
          {
            id: 'feature1',
            label: 'Advanced Analytics',
            value: 'analytics',
            description: 'Get detailed insights and reports',
            badge: 'Premium',
            status: 'success'
          },
          {
            id: 'feature2',
            label: 'Real-time Collaboration',
            value: 'collaboration',
            description: 'Work together in real-time',
            status: 'info'
          },
          {
            id: 'feature3',
            label: 'Custom Branding',
            value: 'branding',
            description: 'Add your company logo and colors',
            badge: 'Pro',
            status: 'warning'
          }
        ]}
        selectAll
        showCount
        showProgress
        showBadges
        showStatusIcons
      />
    </Box>

    {/* Horizontal Layout */}
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>Horizontal Layout</Typography>
      <EnterpriseCheckbox
        label="Quick Selection"
        style={{ color: 'success' }}
        direction="horizontal"
        spacing={4}
        wrap
        onChangeMultiple={(selected) => console.log('Quick selection:', selected)}
        options={[
          { id: 'opt1', label: 'Option 1', value: '1' },
          { id: 'opt2', label: 'Option 2', value: '2' },
          { id: 'opt3', label: 'Option 3', value: '3' },
          { id: 'opt4', label: 'Option 4', value: '4' }
        ]}
      />
    </Box>

    {/* Pre-built Components */}
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>Security Settings</Typography>
      <SecurityCheckbox onChange={(checked) => console.log('Security enabled:', checked)} />
    </Box>

    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>Notification Preferences</Typography>
      <NotificationCheckbox onChange={(selected) => console.log('Notifications:', selected)} />
    </Box>

    <Box>
      <Typography variant="h6" gutterBottom>Document Format Selection</Typography>
      <DocumentTypeCheckbox onChange={(selected) => console.log('Document types:', selected)} />
    </Box>
  </Box>
);

export default EnterpriseCheckbox;
