import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
  Chip,
  Stack,
  alpha,
  CircularProgress,
  Tooltip,
  InputBase,
  FilledInput,
  OutlinedInput
} from '@mui/material';
import {
  Eye,
  EyeOff,
  Search,
  Mail,
  Phone,
  User,
  Lock,
  Calendar,
  DollarSign,
  Link,
  MapPin,
  Globe,
  Hash,
  AtSign,
  FileText,
  Image,
  Paperclip,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  Copy,
  RefreshCw,
  Zap,
  Shield,
  Key,
  Fingerprint,
  Smartphone,
  CreditCard,
  BarChart3,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react';

// Input variants and types
export type InputVariant = 'outlined' | 'filled' | 'standard';
export type InputSize = 'small' | 'medium' | 'large';
export type InputType = 
  | 'text' 
  | 'password' 
  | 'email' 
  | 'tel' 
  | 'number' 
  | 'search' 
  | 'url' 
  | 'date' 
  | 'datetime-local' 
  | 'time' 
  | 'file' 
  | 'color'
  | 'otp'
  | 'currency'
  | 'percentage'
  | 'phone'
  | 'credit-card'
  | 'ssn'
  | 'custom';

export interface InputProps {
  // Core props
  type?: InputType;
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  
  // Validation and error handling
  error?: string | boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  
  // Styling and appearance
  fullWidth?: boolean;
  margin?: 'none' | 'dense' | 'normal';
  autoFocus?: boolean;
  autoComplete?: string;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  minRows?: number;
  
  // Icons and adornments
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  clearable?: boolean;
  showPasswordToggle?: boolean;
  copyable?: boolean;
  loading?: boolean;
  
  // Enterprise features
  secure?: boolean;
  masked?: boolean;
  validation?: 'email' | 'phone' | 'url' | 'currency' | 'percentage' | 'credit-card' | 'ssn' | 'custom';
  customValidation?: (value: string) => boolean | string;
  format?: (value: string) => string;
  parse?: (value: string) => string;
  transform?: (value: string) => string;
  
  // Advanced features
  chips?: boolean;
  chipSeparator?: string;
  maxChips?: number;
  tags?: string[];
  onTagsChange?: (tags: string[]) => void;
  autoSuggest?: boolean;
  suggestions?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
  
  // File input features
  accept?: string;
  multiple?: boolean;
  onFileSelect?: (files: FileList) => void;
  maxFileSize?: number;
  allowedFileTypes?: string[];
  
  // Styling overrides
  className?: string;
  inputClassName?: string;
  sx?: any;
  inputSx?: any;
  
  // Accessibility
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  id?: string;
  name?: string;
  
  // Performance
  debounce?: number;
  throttle?: number;
  
  // Custom rendering
  renderInput?: (props: any) => React.ReactNode;
  renderAdornment?: (position: 'start' | 'end') => React.ReactNode;
  
  // State management
  defaultHelperText?: string;
  successMessage?: string;
  showSuccessIcon?: boolean;
  showErrorIcon?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
  
  // OTP specific
  otpLength?: number;
  otpSeparator?: React.ReactNode;
  onOtpComplete?: (otp: string) => void;
  
  // Enterprise security
  encrypt?: boolean;
  salt?: string;
  showEncryptionIndicator?: boolean;
}

// Validation functions
const validators = {
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  phone: (value: string) => /^\+?[\d\s\-\(\)]{10,}$/.test(value),
  url: (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },
  currency: (value: string) => /^\$?[\d,]+(\.\d{1,2})?$/.test(value),
  percentage: (value: string) => /^\d{1,3}(\.\d{1,2})?%?$/.test(value),
  'credit-card': (value: string) => /^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/.test(value.replace(/\s/g, '')),
  ssn: (value: string) => /^\d{3}-\d{2}-\d{4}$/.test(value)
};

// Format functions
const formatters = {
  currency: (value: string) => {
    const num = value.replace(/[^\d.]/g, '');
    return num ? `$${parseFloat(num).toFixed(2)}` : '';
  },
  'credit-card': (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/);
    if (!match) return value;
    return [match[1], match[2], match[3], match[4]].filter(Boolean).join(' ');
  },
  phone: (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return value;
    return [match[1], match[2], match[3]].filter(Boolean).join('-');
  },
  ssn: (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,2})(\d{0,4})$/);
    if (!match) return value;
    return [match[1], match[2], match[3]].filter(Boolean).join('-');
  }
};

// Icon mapping
const iconMap = {
  email: <Mail size={20} />,
  password: <Lock size={20} />,
  search: <Search size={20} />,
  tel: <Phone size={20} />,
  url: <Link size={20} />,
  date: <Calendar size={20} />,
  'datetime-local': <Clock size={20} />,
  time: <Clock size={20} />,
  number: <Hash size={20} />,
  currency: <DollarSign size={20} />,
  percentage: <BarChart3 size={20} />,
  'credit-card': <CreditCard size={20} />,
  phone: <Phone size={20} />,
  user: <User size={20} />,
  file: <Paperclip size={20} />
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    type = 'text',
    variant = 'outlined',
    size = 'medium',
    label,
    placeholder,
    value,
    defaultValue,
    onChange,
    onBlur,
    onFocus,
    error,
    helperText,
    required = false,
    disabled = false,
    readOnly = false,
    fullWidth = true,
    autoFocus = false,
    autoComplete,
    multiline = false,
    rows,
    maxRows,
    minRows,
    startAdornment,
    endAdornment,
    startIcon,
    endIcon,
    clearable = false,
    showPasswordToggle = type === 'password',
    copyable = false,
    loading = false,
    secure = false,
    masked = false,
    validation,
    customValidation,
    format,
    parse,
    transform,
    chips = false,
    chipSeparator = ',',
    maxChips,
    tags = [],
    onTagsChange,
    autoSuggest = false,
    suggestions = [],
    onSuggestionSelect,
    accept,
    multiple = false,
    onFileSelect,
    maxFileSize,
    allowedFileTypes = [],
    className = '',
    inputClassName = '',
    sx,
    inputSx,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    id,
    name,
    debounce = 0,
    throttle = 0,
    renderInput,
    renderAdornment,
    defaultHelperText = '',
    successMessage = '',
    showSuccessIcon = false,
    showErrorIcon = true,
    maxLength,
    showCharCount = false,
    otpLength = 6,
    otpSeparator,
    onOtpComplete,
    encrypt = false,
    salt = '',
    showEncryptionIndicator = false,
    ...rest
  } = props;

  const [inputValue, setInputValue] = useState(value || defaultValue || '');
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [otpValues, setOtpValues] = useState<string[]>(Array(otpLength).fill(''));
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();
  const throttleRef = useRef<NodeJS.Timeout>();
  const lastCallRef = useRef<number>(0);

  // Expose ref
  useImperativeHandle(ref, () => inputRef.current!, []);

  // Character count
  useEffect(() => {
    setCharCount(String(inputValue).length);
  }, [inputValue]);

  // Validation
  useEffect(() => {
    if (validation && inputValue) {
      const isValidInput = validators[validation](String(inputValue));
      setIsValid(isValidInput);
      setValidationError(isValidInput ? '' : `Please enter a valid ${validation}`);
    } else if (customValidation && inputValue) {
      const result = customValidation(String(inputValue));
      if (typeof result === 'string') {
        setValidationError(result);
        setIsValid(false);
      } else {
        setIsValid(result);
        setValidationError(result ? '' : 'Invalid input');
      }
    } else {
      setValidationError('');
      setIsValid(false);
    }
  }, [inputValue, validation, customValidation]);

  // Debounce and throttle
  const debouncedChange = (value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange?.(value);
    }, debounce);
  };

  const throttledChange = (value: string) => {
    const now = Date.now();
    if (now - lastCallRef.current >= throttle) {
      lastCallRef.current = now;
      onChange?.(value);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    // Max length validation
    if (maxLength && value.length > maxLength) {
      value = value.slice(0, maxLength);
    }

    // Format value
    if (format) {
      value = format(value);
    } else if (type === 'currency' && formatters.currency) {
      value = formatters.currency(value);
    } else if (type === 'credit-card' && formatters['credit-card']) {
      value = formatters['credit-card'](value);
    } else if (type === 'phone' && formatters.phone) {
      value = formatters.phone(value);
    } else if (type === 'ssn' && formatters.ssn) {
      value = formatters.ssn(value);
    }

    // Transform value
    if (transform) {
      value = transform(value);
    }

    setInputValue(value);

    // Handle debounce/throttle
    if (debounce > 0) {
      debouncedChange(value);
    } else if (throttle > 0) {
      throttledChange(value);
    } else {
      onChange?.(value);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleClear = () => {
    setInputValue('');
    onChange?.('');
    inputRef.current?.focus();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(inputValue));
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Validate file size
      if (maxFileSize) {
        const oversizedFiles = Array.from(files).filter(file => file.size > maxFileSize);
        if (oversizedFiles.length > 0) {
          setValidationError(`File size must be less than ${maxFileSize / 1024 / 1024}MB`);
          return;
        }
      }

      // Validate file types
      if (allowedFileTypes.length > 0) {
        const invalidFiles = Array.from(files).filter(file => 
          !allowedFileTypes.some(type => file.type.includes(type) || file.name.endsWith(type))
        );
        if (invalidFiles.length > 0) {
          setValidationError(`Only ${allowedFileTypes.join(', ')} files are allowed`);
          return;
        }
      }

      onFileSelect?.(files);
      setInputValue(Array.from(files).map(f => f.name).join(', '));
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    
    const otpString = newOtpValues.join('');
    if (newOtpValues.every(val => val !== '')) {
      onOtpComplete?.(otpString);
    }
  };

  // Get appropriate icon
  const getStartIcon = () => {
    if (startIcon) return startIcon;
    if (startAdornment) return startAdornment;
    if (iconMap[type as keyof typeof iconMap]) return iconMap[type as keyof typeof iconMap];
    return null;
  };

  const getEndIcon = () => {
    if (loading) return <CircularProgress size={20} />;
    if (endIcon) return endIcon;
    
    // Password toggle
    if (showPasswordToggle && type === 'password') {
      return (
        <IconButton
          onClick={() => setShowPassword(!showPassword)}
          edge="end"
          size="small"
          sx={{ color: '#666' }}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </IconButton>
      );
    }

    // Clear button
    if (clearable && inputValue) {
      return (
        <IconButton
          onClick={handleClear}
          edge="end"
          size="small"
          sx={{ color: '#666' }}
        >
          <X size={20} />
        </IconButton>
      );
    }

    // Copy button
    if (copyable && inputValue) {
      return (
        <IconButton
          onClick={handleCopy}
          edge="end"
          size="small"
          sx={{ color: '#666' }}
        >
          <Copy size={20} />
        </IconButton>
      );
    }

    return endAdornment;
  };

  // Get input type
  const getInputType = () => {
    if (type === 'password' && showPasswordToggle) {
      return showPassword ? 'text' : 'password';
    }
    if (type === 'otp') return 'tel';
    if (type === 'phone') return 'tel';
    if (type === 'credit-card') return 'tel';
    if (type === 'ssn') return 'password';
    return type;
  };

  // Get helper text
  const getHelperText = () => {
    if (error && typeof error === 'string') return error;
    if (validationError) return validationError;
    if (helperText) return helperText;
    if (defaultHelperText) return defaultHelperText;
    if (showCharCount && maxLength) return `${charCount}/${maxLength}`;
    return '';
  };

  // Success state
  const showSuccess = showSuccessIcon && isValid && inputValue;

  // Error state
  const hasError = !!(error || validationError);

  // Common input props
  const inputProps = {
    id,
    name,
    placeholder,
    value: inputValue,
    defaultValue,
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus,
    disabled: disabled || loading,
    readOnly,
    autoFocus,
    autoComplete,
    required,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    inputRef,
    className: inputClassName,
    sx: {
      ...inputSx,
      '& .MuiOutlinedInput-root': {
        borderRadius: 3,
        background: 'white',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: '#667eea',
        },
        '&.Mui-focused': {
          borderColor: '#667eea',
          boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
        },
        '&.Mui-error': {
          borderColor: '#f44336',
        },
      },
      '& .MuiInputBase-input': {
        fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
        padding: size === 'small' ? '8px 12px' : size === 'large' ? '16px 20px' : '12px 16px',
      },
    },
  };

  // File input
  if (type === 'file') {
    return (
      <FormControl fullWidth={fullWidth} error={hasError} required={required}>
        {label && <InputLabel>{label}</InputLabel>}
        <Box
          sx={{
            border: '2px dashed',
            borderColor: hasError ? '#f44336' : '#667eea',
            borderRadius: 3,
            p: 3,
            textAlign: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: '#764ba2',
              background: alpha('#667eea', 0.05),
            },
          }}
        >
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id={id || 'file-input'}
            disabled={disabled}
          />
          <label htmlFor={id || 'file-input'} style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
            <Stack spacing={2} alignItems="center">
              <Paperclip size={32} color="#667eea" />
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {inputValue || 'Click to upload files'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {allowedFileTypes.length > 0 ? allowedFileTypes.join(', ') : 'All file types'} • Max {maxFileSize ? `${maxFileSize / 1024 / 1024}MB` : 'size'}
              </Typography>
            </Stack>
          </label>
        </Box>
        {getHelperText() && <FormHelperText>{getHelperText()}</FormHelperText>}
      </FormControl>
    );
  }

  // OTP input
  if (type === 'otp') {
    return (
      <FormControl fullWidth={fullWidth} error={hasError} required={required}>
        {label && <InputLabel>{label}</InputLabel>}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          {Array.from({ length: otpLength }, (_, index) => (
            <TextField
              key={index}
              type="tel"
              value={otpValues[index] || ''}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              inputProps={{
                maxLength: 1,
                pattern: '[0-9]',
                style: { textAlign: 'center' },
              }}
              sx={{
                width: 60,
                height: 60,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  fontSize: '1.5rem',
                  fontWeight: 700,
                },
              }}
              disabled={disabled}
            />
          ))}
        </Box>
        {getHelperText() && <FormHelperText>{getHelperText()}</FormHelperText>}
      </FormControl>
    );
  }

  // Default input
  return (
    <FormControl
      fullWidth={fullWidth}
      error={hasError}
      required={required}
      disabled={disabled}
      margin={margin}
      className={className}
    >
      {label && <InputLabel>{label}</InputLabel>}
      
      <TextField
        {...rest}
        {...inputProps}
        type={getInputType()}
        variant={variant}
        size={size}
        multiline={multiline}
        rows={rows}
        maxRows={maxRows}
        minRows={minRows}
        InputProps={{
          startAdornment: getStartIcon() && (
            <InputAdornment position="start">
              {getStartIcon()}
            </InputAdornment>
          ),
          endAdornment: getEndIcon() && (
            <InputAdornment position="end">
              {getEndIcon()}
            </InputAdornment>
          ),
        }}
        helperText={
          <Stack direction="row" spacing={1} alignItems="center">
            {showSuccess && <CheckCircle size={16} color="#4caf50" />}
            {hasError && showErrorIcon && <AlertTriangle size={16} color="#f44336" />}
            <span>{getHelperText()}</span>
            {successMessage && isValid && <span style={{ color: '#4caf50' }}>• {successMessage}</span>}
          </Stack>
        }
        sx={{
          ...sx,
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            background: 'white',
            transition: 'all 0.2s ease',
            '&:hover': {
              borderColor: '#667eea',
            },
            '&.Mui-focused': {
              borderColor: '#667eea',
              boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
            },
            '&.Mui-error': {
              borderColor: '#f44336',
            },
          },
          '& .MuiInputBase-input': {
            fontSize: size === 'small' ? '14px' : size === 'large' ? '18px' : '16px',
            padding: size === 'small' ? '8px 12px' : size === 'large' ? '16px 20px' : '12px 16px',
          },
        }}
      />
    </FormControl>
  );
});

Input.displayName = 'Input';

// Specialized input components
export const EmailInput = (props: Omit<InputProps, 'type' | 'validation' | 'startIcon'>) => (
  <Input
    {...props}
    type="email"
    validation="email"
    startIcon={<Mail size={20} />}
    autoComplete="email"
  />
);

export const PasswordInput = (props: Omit<InputProps, 'type' | 'showPasswordToggle'>) => (
  <Input
    {...props}
    type="password"
    showPasswordToggle={true}
    autoComplete="current-password"
  />
);

export const SearchInput = (props: Omit<InputProps, 'type' | 'startIcon'>) => (
  <Input
    {...props}
    type="search"
    startIcon={<Search size={20} />}
    placeholder={props.placeholder || 'Search...'}
  />
);

export const PhoneInput = (props: Omit<InputProps, 'type' | 'validation' | 'format' | 'startIcon'>) => (
  <Input
    {...props}
    type="phone"
    validation="phone"
    format={formatters.phone}
    startIcon={<Phone size={20} />}
    placeholder={props.placeholder || '(555) 123-4567'}
  />
);

export const CurrencyInput = (props: Omit<InputProps, 'type' | 'validation' | 'format' | 'startIcon'>) => (
  <Input
    {...props}
    type="currency"
    validation="currency"
    format={formatters.currency}
    startIcon={<DollarSign size={20} />}
    placeholder={props.placeholder || '$0.00'}
  />
);

export const CreditCardInput = (props: Omit<InputProps, 'type' | 'validation' | 'format' | 'startIcon'>) => (
  <Input
    {...props}
    type="credit-card"
    validation="credit-card"
    format={formatters['credit-card']}
    startIcon={<CreditCard size={20} />}
    placeholder={props.placeholder || '1234 5678 9012 3456'}
  />
);

export const URLInput = (props: Omit<InputProps, 'type' | 'validation' | 'startIcon'>) => (
  <Input
    {...props}
    type="url"
    validation="url"
    startIcon={<Link size={20} />}
    placeholder={props.placeholder || 'https://example.com'}
  />
);

export const FileInput = (props: Omit<InputProps, 'type'>) => (
  <Input
    {...props}
    type="file"
  />
);

export const OTPInput = (props: Omit<InputProps, 'type' | 'otpLength'>) => (
  <Input
    {...props}
    type="otp"
    otpLength={props.otpLength || 6}
  />
);

export default Input;
