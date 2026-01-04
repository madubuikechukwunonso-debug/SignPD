import React, { useState, useEffect, useCallback, useRef, useMemo, useImperativeHandle, forwardRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Chip,
  Avatar,
  Badge,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Switch,
  Slider,
  Rating,
  Autocomplete,
  DatePicker,
  TimePicker,
  DateTimePicker,
  LocalizationProvider,
  AdapterDateFns,
  LinearProgress,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Grid,
  Stack,
  Divider,
  Card,
  CardContent,
  CardActions,
  Alert,
  AlertTitle,
  Collapse,
  Fade,
  Zoom,
  alpha,
  useTheme,
  useMediaQuery,
  InputAdornment,
  OutlinedInput,
  InputBase,
  FormGroup,
  FormLabel,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import {
  Save,
  Send,
  Download,
  Upload,
  RefreshCw,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Info,
  Eye,
  EyeOff,
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  Phone,
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
  Paperclip,
  Link,
  ExternalLink,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Plus,
  Minus,
  MoreVertical,
  MoreHorizontal,
  Edit3,
  Trash2,
  Copy,
  Scissors,
  Clipboard,
  Check,
  CheckSquare,
  Square,
  Circle,
  RadioButtonChecked,
  RadioButtonUnchecked,
  Star,
  Heart,
  Bookmark,
  Pin,
  PushPin,
  Home,
  Settings,
  Sliders,
  HelpCircle,
  Warning,
  Error as ErrorIcon,
  FileText,
  Folder,
  FolderPlus,
  FilePlus,
  Image as ImageIcon,
  Film,
  Music,
  Archive,
  FileArchive,
  DownloadCloud,
  UploadCloud,
  FileSearch,
  FolderSearch,
  SearchX,
  Filter1,
  Filter2,
  SortAsc1,
  SortDesc1,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  ListOrdered,
  List,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code2,
  Terminal,
  Type,
  Palette,
  Sun,
  Moon,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Video,
  VideoOff,
  ScreenShare,
  ScreenShareOff,
  Cast,
  Airplay,
  Wifi,
  WifiOff,
  Bluetooth,
  Battery,
  BatteryCharging,
  Location,
  Map,
  Globe,
  Compass,
  Navigation,
  Navigation2
} from 'lucide-react';

// Field Types
type FieldType = 
  | 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  | 'textarea' | 'select' | 'multiselect' | 'checkbox' | 'checkbox-group'
  | 'radio' | 'switch' | 'slider' | 'rating' | 'autocomplete' | 'date'
  | 'time' | 'datetime' | 'file' | 'image' | 'color' | 'range'
  | 'wysiwyg' | 'code' | 'json' | 'markdown' | 'signature' | 'location'
  | 'currency' | 'percentage' | 'phone' | 'custom';

interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  value?: any;
  defaultValue?: any;
  options?: { label: string; value: any; disabled?: boolean }[];
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  hidden?: boolean;
  validation?: {
    required?: boolean | string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp | string;
    custom?: (value: any) => string | boolean;
    message?: string;
  };
  format?: {
    mask?: string;
    transform?: (value: any) => any;
    parse?: (value: any) => any;
  };
  icon?: React.ReactNode;
  helperText?: string;
  tooltip?: string;
  metadata?: Record<string, any>;
  group?: string;
  column?: number;
  dependencies?: string[];
  conditions?: {
    field: string;
    operator: 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'nin' | 'contains';
    value: any;
  }[];
  onChange?: (value: any, field: FormField, form: EnterpriseFormRef) => void;
  onBlur?: (value: any, field: FormField, form: EnterpriseFormRef) => void;
  onFocus?: (value: any, field: FormField, form: EnterpriseFormRef) => void;
  render?: (props: FieldRenderProps) => React.ReactNode;
}

interface FieldRenderProps {
  field: FormField;
  value: any;
  error: string;
  onChange: (value: any) => void;
  onBlur: () => void;
  onFocus: () => void;
  disabled: boolean;
  readonly: boolean;
  form: EnterpriseFormRef;
}

interface FormSection {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  icon?: React.ReactNode;
  badge?: string | number;
  metadata?: Record<string, any>;
  columns?: number;
  columnSpacing?: number;
}

interface FormStep {
  id: string;
  title: string;
  description?: string;
  sections: FormSection[];
  optional?: boolean;
  disabled?: boolean;
  completed?: boolean;
  icon?: React.ReactNode;
  metadata?: Record<string, any>;
}

interface FormAction {
  id: string;
  label: string;
  onClick: (form: EnterpriseFormRef) => void | Promise<void>;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'text';
  icon?: React.ReactNode;
  position?: 'left' | 'center' | 'right';
  disabled?: boolean;
  loading?: boolean;
  tooltip?: string;
  shortcut?: string;
  group?: string;
}

interface FormLayout {
  type: 'default' | 'stepper' | 'tabs' | 'accordion' | 'wizard' | 'inline' | 'grid';
  columns?: number;
  columnSpacing?: number;
  rowSpacing?: number;
  direction?: 'row' | 'column';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
}

interface FormValidation {
  mode: 'onChange' | 'onBlur' | 'onSubmit' | 'onMount';
  delay?: number;
  debounce?: number;
  schema?: any; // Yup schema or similar
  custom?: (values: Record<string, any>) => Record<string, string>;
}

interface FormSubmission {
  mode: 'standard' | 'ajax' | 'websocket' | 'graphql';
  endpoint?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  timeout?: number;
  retry?: number;
  onSuccess?: (response: any, values: Record<string, any>) => void;
  onError?: (error: any, values: Record<string, any>) => void;
  onProgress?: (progress: number) => void;
}

interface FormTheme {
  mode: 'light' | 'dark' | 'auto';
  primaryColor?: string;
  secondaryColor?: string;
  borderRadius?: number;
  elevation?: number;
  spacing?: number;
  typography?: {
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number;
  };
}

interface EnterpriseFormProps {
  // Core configuration
  title?: string;
  subtitle?: string;
  description?: string;
  sections?: FormSection[];
  fields?: FormField[];
  steps?: FormStep[];
  currentStep?: number;
  actions?: FormAction[];
  layout?: FormLayout;
  
  // Data and state
  initialValues?: Record<string, any>;
  defaultValues?: Record<string, any>;
  values?: Record<string, any>;
  onChange?: (values: Record<string, any>) => void;
  onSubmit?: (values: Record<string, any>) => void | Promise<void>;
  
  // Validation and submission
  validation?: FormValidation;
  submission?: FormSubmission;
  
  // Features
  showProgress?: boolean;
  showStepper?: boolean;
  showTabs?: boolean;
  showActions?: boolean;
  showReset?: boolean;
  showCancel?: boolean;
  showSave?: boolean;
  showPreview?: boolean;
  enableAutoSave?: boolean;
  enableDrafts?: boolean;
  enableValidation?: boolean;
  enableConditionalFields?: boolean;
  enableFieldGroups?: boolean;
  enableRepeater?: boolean;
  enableWizard?: boolean;
  
  // Styling
  theme?: FormTheme;
  variant?: 'default' | 'compact' | 'expanded' | 'minimal';
  size?: 'small' | 'medium' | 'large';
  elevation?: number;
  borderRadius?: number;
  spacing?: number;
  className?: string;
  sx?: any;
  
  // Customization
  customActions?: React.ReactNode;
  customHeader?: React.ReactNode;
  customFooter?: React.ReactNode;
  customFieldWrapper?: (field: FormField, content: React.ReactNode) => React.ReactNode;
  loadingComponent?: React.ReactNode;
  emptyState?: React.ReactNode;
  errorState?: React.ReactNode;
  
  // Callbacks
  onFieldChange?: (field: FormField, value: any) => void;
  onFieldBlur?: (field: FormField) => void;
  onFieldFocus?: (field: FormField) => void;
  onStepChange?: (step: number) => void;
  onSectionToggle?: (section: FormSection, expanded: boolean) => void;
  onValidation?: (errors: Record<string, string>) => void;
  onDirty?: (isDirty: boolean) => void;
  onValid?: (isValid: boolean) => void;
  
  // Accessibility
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  role?: string;
}

export interface EnterpriseFormRef {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  dirty: boolean;
  valid: boolean;
  submitting: boolean;
  currentStep: number;
  
  // Methods
  reset: (values?: Record<string, any>) => void;
  submit: () => Promise<void>;
  validate: () => Record<string, string>;
  setValue: (fieldId: string, value: any) => void;
  setValues: (values: Record<string, any>) => void;
  getValue: (fieldId: string) => any;
  setError: (fieldId: string, error: string) => void;
  clearError: (fieldId: string) => void;
  clearErrors: () => void;
  goToStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  saveDraft: () => void;
  loadDraft: () => Record<string, any> | null;
}

const EnterpriseForm = forwardRef<EnterpriseFormRef, EnterpriseFormProps>((props, ref) => {
  const {
    // Core
    title,
    subtitle,
    description,
    sections = [],
    fields = [],
    steps = [],
    currentStep: propCurrentStep = 0,
    actions = [],
    layout = { type: 'default', columns: 1 },
    
    // Data
    initialValues = {},
    defaultValues = {},
    values: propValues,
    onChange,
    onSubmit,
    
    // Validation
    validation = { mode: 'onBlur' },
    submission = { mode: 'standard' },
    
    // Features
    showProgress = false,
    showStepper = steps.length > 0,
    showTabs = false,
    showActions = true,
    showReset = true,
    showCancel = true,
    showSave = enableAutoSave,
    enableAutoSave = false,
    enableValidation = true,
    enableConditionalFields = true,
    enableFieldGroups = true,
    
    // Styling
    theme = { mode: 'auto' },
    variant = 'default',
    size = 'medium',
    elevation = 2,
    borderRadius = 12,
    spacing = 3,
    className,
    sx,
    
    // Customization
    customActions,
    customHeader,
    customFooter,
    loadingComponent,
    emptyState,
    
    // Callbacks
    onFieldChange,
    onFieldBlur,
    onFieldFocus,
    onStepChange,
    onSectionToggle,
    onValidation,
    onDirty,
    onValid,
    
    // Accessibility
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    role = 'form'
  } = props;

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State management
  const [values, setValues] = useState<Record<string, any>>({ ...defaultValues, ...initialValues });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [dirty, setDirty] = useState(false);
  const [valid, setValid] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(propCurrentStep);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const formRef = useRef<HTMLFormElement>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Combine all fields from sections and standalone fields
  const allFields = useMemo(() => {
    const sectionFields = sections.flatMap(section => section.fields);
    return [...sectionFields, ...fields];
  }, [sections, fields]);

  // Size mapping
  const sizeMap = {
    small: { spacing: 2, buttonSize: 'small' as const, typography: 'body2' },
    medium: { spacing: 3, buttonSize: 'medium' as const, typography: 'body1' },
    large: { spacing: 4, buttonSize: 'large' as const, typography: 'h6' }
  };
  const currentSize = sizeMap[size];

  // Validation functions
  const validateField = useCallback((field: FormField, value: any): string => {
    if (!enableValidation || !field.validation) return '';

    const { required, min, max, minLength, maxLength, pattern, custom, message } = field.validation;

    // Required validation
    if (required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return typeof required === 'string' ? required : (message || `${field.label} is required`);
    }

    // Type-based validation
    if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Invalid email format';
    }

    if (field.type === 'url' && value && !/^https?:\/\/.+$/.test(value)) {
      return 'Invalid URL format';
    }

    if (field.type === 'phone' && value && !/^\+?[\d\s-()]+$/.test(value)) {
      return 'Invalid phone format';
    }

    // Numeric validation
    if (typeof value === 'number') {
      if (min !== undefined && value < min) {
        return `Must be at least ${min}`;
      }
      if (max !== undefined && value > max) {
        return `Must be at most ${max}`;
      }
    }

    // String length validation
    if (typeof value === 'string') {
      if (minLength !== undefined && value.length < minLength) {
        return `Must be at least ${minLength} characters`;
      }
      if (maxLength !== undefined && value.length > maxLength) {
        return `Must be at most ${maxLength} characters`;
      }
    }

    // Pattern validation
    if (pattern && value) {
      const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
      if (!regex.test(value)) {
        return message || 'Invalid format';
      }
    }

    // Custom validation
    if (custom && value) {
      const result = custom(value);
      if (result !== true) {
        return typeof result === 'string' ? result : (message || 'Invalid value');
      }
    }

    return '';
  }, [enableValidation]);

  const validateForm = useCallback((): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    
    allFields.forEach(field => {
      const error = validateField(field, values[field.id]);
      if (error) {
        newErrors[field.id] = error;
      }
    });

    return newErrors;
  }, [allFields, values, validateField]);

  // Check field conditions
  const checkFieldConditions = useCallback((field: FormField): boolean => {
    if (!enableConditionalFields || !field.conditions || field.conditions.length === 0) {
      return true;
    }

    return field.conditions.every(condition => {
      const fieldValue = values[condition.field];
      
      switch (condition.operator) {
        case 'eq': return fieldValue === condition.value;
        case 'ne': return fieldValue !== condition.value;
        case 'gt': return Number(fieldValue) > Number(condition.value);
        case 'lt': return Number(fieldValue) < Number(condition.value);
        case 'gte': return Number(fieldValue) >= Number(condition.value);
        case 'lte': return Number(fieldValue) <= Number(condition.value);
        case 'in': return Array.isArray(condition.value) && condition.value.includes(fieldValue);
        case 'nin': return Array.isArray(condition.value) && !condition.value.includes(fieldValue);
        case 'contains': return String(fieldValue).includes(String(condition.value));
        default: return true;
      }
    });
  }, [enableConditionalFields, values]);

  // Field change handlers
  const handleFieldChange = useCallback((field: FormField, value: any) => {
    const newValues = { ...values, [field.id]: value };
    setValues(newValues);
    setDirty(true);
    
    // Validate field
    if (validation.mode === 'onChange') {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field.id]: error }));
    }

    // Call field-specific onChange
    field.onChange?.(value, field, {
      values: newValues,
      errors,
      touched,
      setValue: (id, val) => setValues(prev => ({ ...prev, [id]: val })),
      setValues: (vals) => setValues(vals),
      setError: (id, err) => setErrors(prev => ({ ...prev, [id]: err })),
      clearError: (id) => setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      })
    } as EnterpriseFormRef);

    // Call form onChange
    onChange?.(newValues);
    onFieldChange?.(field, value);

    // Auto-save
    if (enableAutoSave) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      autoSaveTimeoutRef.current = setTimeout(() => {
        saveDraft();
      }, 2000);
    }
  }, [values, errors, validation.mode, validateField, onChange, onFieldChange, enableAutoSave]);

  const handleFieldBlur = useCallback((field: FormField) => {
    setTouched(prev => ({ ...prev, [field.id]: true }));
    
    // Validate field
    if (validation.mode === 'onBlur' || validation.mode === 'onChange') {
      const error = validateField(field, values[field.id]);
      setErrors(prev => ({ ...prev, [field.id]: error }));
    }

    field.onBlur?.(values[field.id], field, {
      values,
      errors,
      touched,
      setValue: (id, val) => setValues(prev => ({ ...prev, [id]: val })),
      setValues: (vals) => setValues(vals),
      setError: (id, err) => setErrors(prev => ({ ...prev, [id]: err })),
      clearError: (id) => setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      })
    } as EnterpriseFormRef);

    onFieldBlur?.(field);
  }, [values, errors, touched, validation.mode, validateField, onFieldBlur]);

  const handleFieldFocus = useCallback((field: FormField) => {
    field.onFocus?.(values[field.id], field, {
      values,
      errors,
      touched,
      setValue: (id, val) => setValues(prev => ({ ...prev, [id]: val })),
      setValues: (vals) => setValues(vals),
      setError: (id, err) => setErrors(prev => ({ ...prev, [id]: err })),
      clearError: (id) => setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      })
    } as EnterpriseFormRef);

    onFieldFocus?.(field);
  }, [values, errors, touched, onFieldFocus]);

  // Form submission
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    // Validate form
    const formErrors = validateForm();
    setErrors(formErrors);
    onValidation?.(formErrors);
    
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(values);
      }
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setSubmitting(false);
    }
  }, [values, validateForm, onSubmit, onValidation]);

  // Auto-save functionality
  const saveDraft = useCallback(() => {
    setIsAutoSaving(true);
    try {
      const draftData = {
        values,
        timestamp: new Date().toISOString(),
        step: currentStep
      };
      localStorage.setItem('form-draft', JSON.stringify(draftData));
    } catch (error) {
      console.error('Failed to save draft:', error);
    } finally {
      setIsAutoSaving(false);
    }
  }, [values, currentStep]);

  const loadDraft = useCallback(() => {
    try {
      const draftData = localStorage.getItem('form-draft');
      if (draftData) {
        const parsed = JSON.parse(draftData);
        setValues(parsed.values);
        setCurrentStep(parsed.step || 0);
        return parsed.values;
      }
    } catch (error) {
      console.error('Failed to load draft:', error);
    }
    return null;
  }, []);

  // Form control methods
  const reset = useCallback((newValues?: Record<string, any>) => {
    setValues(newValues || { ...defaultValues, ...initialValues });
    setErrors({});
    setTouched({});
    setDirty(false);
    setCurrentStep(0);
  }, [defaultValues, initialValues]);

  const setValue = useCallback((fieldId: string, value: any) => {
    const field = allFields.find(f => f.id === fieldId);
    if (field) {
      handleFieldChange(field, value);
    }
  }, [allFields, handleFieldChange]);

  const setValues = useCallback((newValues: Record<string, any>) => {
    setValues(newValues);
    setDirty(true);
    onChange?.(newValues);
  }, [onChange]);

  const getValue = useCallback((fieldId: string) => {
    return values[fieldId];
  }, [values]);

  const setError = useCallback((fieldId: string, error: string) => {
    setErrors(prev => ({ ...prev, [fieldId]: error }));
  }, []);

  const clearError = useCallback((fieldId: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldId];
      return newErrors;
    });
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(0, Math.min(step, steps.length - 1)));
    onStepChange?.(step);
  }, [steps.length, onStepChange]);

  const nextStep = useCallback(() => {
    goToStep(currentStep + 1);
  }, [currentStep, goToStep]);

  const previousStep = useCallback(() => {
    goToStep(currentStep - 1);
  }, [currentStep, goToStep]);

  // Expose form methods via ref
  useImperativeHandle(ref, () => ({
    values,
    errors,
    touched,
    dirty,
    valid,
    submitting,
    currentStep,
    
    reset,
    submit: handleSubmit,
    validate: validateForm,
    setValue,
    setValues,
    getValue,
    setError,
    clearError,
    clearErrors,
    goToStep,
    nextStep,
    previousStep,
    saveDraft,
    loadDraft
  }));

  // Watch for validity changes
  useEffect(() => {
    const isValid = Object.keys(errors).length === 0;
    setValid(isValid);
    onValid?.(isValid);
  }, [errors, onValid]);

  // Watch for dirty changes
  useEffect(() => {
    onDirty?.(dirty);
  }, [dirty, onDirty]);

  // Render individual field
  const renderField = (field: FormField) => {
    const isVisible = checkFieldConditions(field);
    if (!isVisible) return null;

    const value = values[field.id] ?? field.defaultValue ?? '';
    const error = errors[field.id];
    const isTouched = touched[field.id];
    const isDisabled = field.disabled || submitting;
    const isReadonly = field.readonly;

    const commonProps = {
      fullWidth: true,
      size: size === 'small' ? 'small' : size === 'large' ? 'medium' : 'small',
      error: !!error && isTouched,
      helperText: error && isTouched ? error : field.helperText,
      disabled: isDisabled,
      required: field.required,
      InputProps: field.icon ? {
        startAdornment: (
          <InputAdornment position="start">
            {field.icon}
          </InputAdornment>
        )
      } : undefined,
      onChange: (e: any) => handleFieldChange(field, e.target.value),
      onBlur: () => handleFieldBlur(field),
      onFocus: () => handleFieldFocus(field)
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'tel':
      case 'url':
      case 'search':
        return (
          <TextField
            {...commonProps}
            type={field.type}
            label={field.label}
            placeholder={field.placeholder}
            value={value}
            inputProps={{
              min: field.validation?.min,
              max: field.validation?.max,
              maxLength: field.validation?.maxLength
            }}
          />
        );

      case 'textarea':
        return (
          <TextField
            {...commonProps}
            multiline
            rows={field.metadata?.rows || 4}
            label={field.label}
            placeholder={field.placeholder}
            value={value}
            inputProps={{
              maxLength: field.validation?.maxLength
            }}
          />
        );

      case 'select':
        return (
          <FormControl {...commonProps} error={!!error && isTouched}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={value}
              label={field.label}
            >
              {field.options?.map((option) => (
                <MenuItem 
                  key={option.value} 
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case 'multiselect':
        return (
          <Autocomplete
            multiple
            options={field.options || []}
            getOptionLabel={(option) => option.label}
            value={value || []}
            onChange={(event, newValue) => handleFieldChange(field, newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                {...commonProps}
                label={field.label}
                placeholder={field.placeholder}
              />
            )}
            disabled={isDisabled}
          />
        );

      case 'checkbox':
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={!!value}
                onChange={(e) => handleFieldChange(field, e.target.checked)}
                disabled={isDisabled}
              />
            }
            label={field.label}
          />
        );

      case 'checkbox-group':
        return (
          <FormControl component="fieldset" error={!!error && isTouched}>
            <FormLabel component="legend" sx={{ fontWeight: 600, mb: 1 }}>
              {field.label}
            </FormLabel>
            <FormGroup>
              {field.options?.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={Array.isArray(value) && value.includes(option.value)}
                      onChange={(e) => {
                        const newValue = e.target.checked
                          ? [...(value || []), option.value]
                          : (value || []).filter((v: any) => v !== option.value);
                        handleFieldChange(field, newValue);
                      }}
                      disabled={option.disabled || isDisabled}
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
          </FormControl>
        );

      case 'radio':
        return (
          <FormControl component="fieldset" error={!!error && isTouched}>
            <FormLabel component="legend" sx={{ fontWeight: 600, mb: 1 }}>
              {field.label}
            </FormLabel>
            <RadioGroup
              value={value}
              onChange={(e) => handleFieldChange(field, e.target.value)}
            >
              {field.options?.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio disabled={option.disabled || isDisabled} />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );

      case 'switch':
        return (
          <FormControlLabel
            control={
              <Switch
                checked={!!value}
                onChange={(e) => handleFieldChange(field, e.target.checked)}
                disabled={isDisabled}
              />
            }
            label={field.label}
          />
        );

      case 'slider':
        return (
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              {field.label}
            </Typography>
            <Slider
              value={value || 0}
              onChange={(e, newValue) => handleFieldChange(field, newValue)}
              min={field.validation?.min}
              max={field.validation?.max}
              step={field.metadata?.step || 1}
              disabled={isDisabled}
              marks={field.metadata?.marks}
              valueLabelDisplay={field.metadata?.valueLabelDisplay || 'auto'}
            />
          </Box>
        );

      case 'rating':
        return (
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              {field.label}
            </Typography>
            <Rating
              value={value || 0}
              onChange={(e, newValue) => handleFieldChange(field, newValue)}
              max={field.metadata?.max || 5}
              precision={field.metadata?.precision || 1}
              disabled={isDisabled}
              readOnly={isReadonly}
            />
          </Box>
        );

      case 'autocomplete':
        return (
          <Autocomplete
            options={field.options || []}
            getOptionLabel={(option) => option.label}
            value={value ? field.options?.find(opt => opt.value === value) : null}
            onChange={(event, newValue) => handleFieldChange(field, newValue?.value || null)}
            renderInput={(params) => (
              <TextField
                {...params}
                {...commonProps}
                label={field.label}
                placeholder={field.placeholder}
              />
            )}
            disabled={isDisabled}
            readOnly={isReadonly}
          />
        );

      case 'date':
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={value || null}
              onChange={(newValue) => handleFieldChange(field, newValue)}
              disabled={isDisabled}
              readOnly={isReadonly}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...commonProps}
                  label={field.label}
                  placeholder={field.placeholder}
                />
              )}
            />
          </LocalizationProvider>
        );

      case 'time':
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              value={value || null}
              onChange={(newValue) => handleFieldChange(field, newValue)}
              disabled={isDisabled}
              readOnly={isReadonly}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...commonProps}
                  label={field.label}
                  placeholder={field.placeholder}
                />
              )}
            />
          </LocalizationProvider>
        );

      case 'datetime':
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              value={value || null}
              onChange={(newValue) => handleFieldChange(field, newValue)}
              disabled={isDisabled}
              readOnly={isReadonly}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...commonProps}
                  label={field.label}
                  placeholder={field.placeholder}
                />
              )}
            />
          </LocalizationProvider>
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
                disabled={isDisabled}
                sx={{ borderRadius: 2 }}
              >
                {value ? `${value.length} file(s) selected` : `Upload ${field.label}`}
              </Button>
            </label>
          </Box>
        );

      case 'image':
        return (
          <Box>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFieldChange(field, e.target.files)}
              style={{ display: 'none' }}
              id={`image-${field.id}`}
            />
            <label htmlFor={`image-${field.id}`}>
              <Button
                variant="outlined"
                component="span"
                fullWidth
                startIcon={<ImageIcon size={18} />}
                disabled={isDisabled}
                sx={{ borderRadius: 2 }}
              >
                {value ? 'Image selected' : `Upload ${field.label}`}
              </Button>
            </label>
          </Box>
        );

      case 'color':
        return (
          <TextField
            {...commonProps}
            type="color"
            label={field.label}
            value={value || '#000000'}
            onChange={(e) => handleFieldChange(field, e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: value || '#000000',
                      border: '2px solid',
                      borderColor: 'divider'
                    }}
                  />
                </InputAdornment>
              )
            }}
          />
        );

      case 'custom':
        return field.render?.({
          field,
          value,
          error: error || '',
          onChange: (val) => handleFieldChange(field, val),
          onBlur: () => handleFieldBlur(field),
          onFocus: () => handleFieldFocus(field),
          disabled: isDisabled,
          readonly: isReadonly,
          form: {
            values,
            errors,
            touched,
            setValue,
            setValues,
            setError,
            clearError
          } as EnterpriseFormRef
        }) || null;

      default:
        return (
          <TextField
            {...commonProps}
            type="text"
            label={field.label}
            placeholder={field.placeholder}
            value={value}
          />
        );
    }
  };

  // Render section
  const renderSection = (section: FormSection) => {
    const isExpanded = !section.collapsible || expandedSections.has(section.id);

    return (
      <Card
        key={section.id}
        elevation={elevation}
        sx={{
          borderRadius: borderRadius,
          background: isDark ? 'rgba(255,255,255,0.05)' : 'white',
          border: '1px solid',
          borderColor: 'divider',
          mb: currentSize.spacing
        }}
      >
        {(section.title || section.description) && (
          <CardContent
            sx={{
              pb: section.collapsible ? 2 : 3,
              cursor: section.collapsible ? 'pointer' : 'default'
            }}
            onClick={() => section.collapsible && setExpandedSections(prev => {
              const newSet = new Set(prev);
              if (newSet.has(section.id)) {
                newSet.delete(section.id);
              } else {
                newSet.add(section.id);
              }
              return newSet;
            })}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                {section.title && (
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {section.title}
                  </Typography>
                )}
                {section.description && (
                  <Typography variant="body2" color="text.secondary">
                    {section.description}
                  </Typography>
                )}
              </Box>
              
              {section.collapsible && (
                <IconButton size="small">
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </IconButton>
              )}
            </Box>
          </CardContent>
        )}

        <Collapse in={isExpanded}>
          <CardContent sx={{ pt: section.collapsible ? 0 : 3 }}>
            <Grid container spacing={currentSize.spacing} columns={section.columns || layout.columns || 1}>
              {section.fields.map((field) => (
                <Grid item xs={12} md={field.column || 12} key={field.id}>
                  {renderField(field)}
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    );
  };

  // Render stepper
  const renderStepper = () => {
    if (!showStepper || steps.length === 0) return null;

    return (
      <Box sx={{ mb: currentSize.spacing * 2 }}>
        <Stepper
          activeStep={currentStep}
          orientation="horizontal"
          sx={{
            '& .MuiStepLabel-label': {
              fontWeight: 600,
              fontSize: currentSize.typography === 'body2' ? '0.875rem' : '1rem'
            }
          }}
        >
          {steps.map((step, index) => (
            <Step key={step.id} completed={step.completed || index < currentStep}>
              <StepLabel
                optional={step.optional && (
                  <Typography variant="caption">Optional</Typography>
                )}
                error={step.disabled}
                icon={step.icon}
              >
                {step.title}
              </StepLabel>
              {currentStep === index && (
                <StepContent>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {step.description}
                  </Typography>
                  <Grid container spacing={currentSize.spacing} columns={layout.columns || 1}>
                    {step.sections.flatMap(section => section.fields).map((field) => (
                      <Grid item xs={12} md={field.column || 12} key={field.id}>
                        {renderField(field)}
                      </Grid>
                    ))}
                  </Grid>
                </StepContent>
              )}
            </Step>
          ))}
        </Stepper>
      </Box>
    );
  };

  // Render standalone fields
  const renderFields = () => {
    if (fields.length === 0) return null;

    return (
      <Grid container spacing={currentSize.spacing} columns={layout.columns || 1}>
        {fields.map((field) => {
          const isVisible = checkFieldConditions(field);
          if (!isVisible) return null;

          return (
            <Grid item xs={12} md={field.column || 12} key={field.id}>
              {renderField(field)}
            </Grid>
          );
        })}
      </Grid>
    );
  };

  // Render actions
  const renderActions = () => {
    if (!showActions) return null;

    const defaultActions: FormAction[] = [
      ...(showReset ? [{
        id: 'reset',
        label: 'Reset',
        onClick: () => reset(),
        variant: 'text' as const,
        icon: <RotateCcw size={18} />,
        position: 'left' as const
      }] : []),
      ...(showCancel ? [{
        id: 'cancel',
        label: 'Cancel',
        onClick: () => {},
        variant: 'outlined' as const,
        icon: <X size={18} />,
        position: 'center' as const
      }] : []),
      {
        id: 'submit',
        label: submitting ? 'Submitting...' : 'Submit',
        onClick: handleSubmit,
        variant: 'primary' as const,
        icon: submitting ? <CircularProgress size={18} color="inherit" /> : <Send size={18} />,
        position: 'right' as const,
        loading: submitting
      }
    ];

    const allActions = [...defaultActions, ...actions];

    const leftActions = allActions.filter(a => a.position === 'left');
    const centerActions = allActions.filter(a => a.position === 'center');
    const rightActions = allActions.filter(a => a.position === 'right');

    return (
      <Card
        elevation={elevation}
        sx={{
          borderRadius: borderRadius,
          background: isDark ? 'rgba(255,255,255,0.05)' : 'white',
          border: '1px solid',
          borderColor: 'divider',
          mt: currentSize.spacing
        }}
      >
        <CardActions sx={{ px: 3, py: 2, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {leftActions.map((action) => (
              <Button
                key={action.id}
                variant={action.variant === 'primary' ? 'contained' : action.variant === 'text' ? 'text' : 'outlined'}
                onClick={() => action.onClick({
                  values,
                  errors,
                  touched,
                  setValue,
                  setValues,
                  setError,
                  clearError,
                  validate: validateForm,
                  submit: handleSubmit
                } as EnterpriseFormRef)}
                disabled={action.disabled || action.loading || submitting}
                startIcon={action.icon}
                size={currentSize.buttonSize}
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
                {action.loading ? <CircularProgress size={16} color="inherit" /> : action.label}
              </Button>
            ))}
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            {centerActions.map((action) => (
              <Button
                key={action.id}
                variant={action.variant === 'primary' ? 'contained' : action.variant === 'text' ? 'text' : 'outlined'}
                onClick={() => action.onClick({
                  values,
                  errors,
                  touched,
                  setValue,
                  setValues,
                  setError,
                  clearError,
                  validate: validateForm,
                  submit: handleSubmit
                } as EnterpriseFormRef)}
                disabled={action.disabled || action.loading || submitting}
                startIcon={action.icon}
                size={currentSize.buttonSize}
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: 'none'
                }}
              >
                {action.loading ? <CircularProgress size={16} color="inherit" /> : action.label}
              </Button>
            ))}
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            {rightActions.map((action) => (
              <Button
                key={action.id}
                variant={action.variant === 'primary' ? 'contained' : action.variant === 'text' ? 'text' : 'outlined'}
                onClick={() => action.onClick({
                  values,
                  errors,
                  touched,
                  setValue,
                  setValues,
                  setError,
                  clearError,
                  validate: validateForm,
                  submit: handleSubmit
                } as EnterpriseFormRef)}
                disabled={action.disabled || action.loading || submitting}
                startIcon={action.icon}
                size={currentSize.buttonSize}
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: 'none'
                }}
              >
                {action.loading ? <CircularProgress size={16} color="inherit" /> : action.label}
              </Button>
            ))}
          </Box>
        </CardActions>
        
        {/* Auto-save indicator */}
        {enableAutoSave && (
          <Box sx={{ px: 3, pb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isAutoSaving ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={16} />
                <Typography variant="caption" color="text.secondary">
                  Auto-saving...
                </Typography>
              </Box>
            ) : dirty ? (
              <Typography variant="caption" color="text.secondary">
                Changes saved automatically
              </Typography>
            ) : (
              <Typography variant="caption" color="text.secondary">
                All changes saved
              </Typography>
            )}
          </Box>
        )}
      </Card>
    );
  };

  // Main form content
  const formContent = (
    <Box
      component="form"
      ref={formRef}
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        maxWidth: layout.type === 'default' ? 800 : '100%',
        mx: 'auto',
        ...sx
      }}
      className={className}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
    >
      {/* Header */}
      {(title || subtitle || description || customHeader) && (
        <Card
          elevation={elevation}
          sx={{
            borderRadius: borderRadius,
            background: isDark ? 'rgba(255,255,255,0.05)' : 'white',
            border: '1px solid',
            borderColor: 'divider',
            mb: currentSize.spacing,
            ...headerSx
          }}
        >
          <CardContent sx={{ p: currentSize.spacing * 2 }}>
            {customHeader || (
              <>
                {title && (
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                    {title}
                  </Typography>
                )}
                {subtitle && (
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: 'text.secondary' }}>
                    {subtitle}
                  </Typography>
                )}
                {description && (
                  <Typography variant="body1" color="text.secondary">
                    {description}
                  </Typography>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Progress indicator */}
      {showProgress && (
        <Card
          elevation={elevation}
          sx={{
            borderRadius: borderRadius,
            background: isDark ? 'rgba(255,255,255,0.05)' : 'white',
            border: '1px solid',
            borderColor: 'divider',
            mb: currentSize.spacing
          }}
        >
          <CardContent sx={{ p: currentSize.spacing }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                Form Progress
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 700 }}>
                {Object.keys(touched).length} / {allFields.length} fields
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(Object.keys(touched).length / allFields.length) * 100}
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
          </CardContent>
        </Card>
      )}

      {/* Stepper */}
      {renderStepper()}

      {/* Sections */}
      {sections.map((section) => renderSection(section))}

      {/* Standalone fields */}
      {renderFields()}

      {/* Actions */}
      {renderActions()}

      {/* Footer */}
      {customFooter && (
        <Box sx={{ mt: currentSize.spacing }}>
          {customFooter}
        </Box>
      )}
    </Box>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {formContent}
    </LocalizationProvider>
  );
});

EnterpriseForm.displayName = 'EnterpriseForm';

// Pre-built form components for common use cases
export const LoginForm: React.FC<{
  onSubmit: (values: { email: string; password: string; rememberMe: boolean }) => void | Promise<void>;
  loading?: boolean;
}> = ({ onSubmit, loading }) => {
  const loginFields: FormField[] = [
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email',
      required: true,
      validation: {
        required: 'Email is required',
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
      },
      icon: <Mail size={18} />
    },
    {
      id: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Enter your password',
      required: true,
      validation: {
        required: 'Password is required',
        minLength: 6,
        message: 'Password must be at least 6 characters'
      },
      icon: <Lock size={18} />
    },
    {
      id: 'rememberMe',
      type: 'checkbox',
      label: 'Remember me',
      defaultValue: false
    }
  ];

  const loginActions: FormAction[] = [
    {
      id: 'forgot',
      label: 'Forgot Password?',
      onClick: () => console.log('Forgot password clicked'),
      variant: 'text',
      position: 'left'
    },
    {
      id: 'submit',
      label: 'Sign In',
      onClick: (form) => {
        const values = form.values;
        return onSubmit({
          email: values.email,
          password: values.password,
          rememberMe: values.rememberMe
        });
      },
      variant: 'primary',
      position: 'right'
    }
  ];

  return (
    <EnterpriseForm
      title="Welcome Back"
      subtitle="Sign in to your account"
      fields={loginFields}
      actions={loginActions}
      showReset={false}
      layout={{ type: 'default', columns: 1 }}
      validation={{ mode: 'onBlur' }}
      size="medium"
      elevation={3}
      loading={loading}
    />
  );
};

export const ContactForm: React.FC<{
  onSubmit: (values: Record<string, any>) => void | Promise<void>;
  loading?: boolean;
}> = ({ onSubmit, loading }) => {
  const contactFields: FormField[] = [
    {
      id: 'name',
      type: 'text',
      label: 'Full Name',
      placeholder: 'Enter your full name',
      required: true,
      validation: { required: 'Name is required' },
      icon: <User size={18} />,
      column: 6
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'Enter your email',
      required: true,
      validation: {
        required: 'Email is required',
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email'
      },
      icon: <Mail size={18} />,
      column: 6
    },
    {
      id: 'subject',
      type: 'text',
      label: 'Subject',
      placeholder: 'Enter message subject',
      required: true,
      validation: { required: 'Subject is required' },
      icon: <FileText size={18} />
    },
    {
      id: 'message',
      type: 'textarea',
      label: 'Message',
      placeholder: 'Enter your message',
      required: true,
      validation: {
        required: 'Message is required',
        minLength: 10,
        message: 'Message must be at least 10 characters'
      },
      metadata: { rows: 5 }
    },
    {
      id: 'priority',
      type: 'select',
      label: 'Priority',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
        { label: 'Urgent', value: 'urgent' }
      ],
      defaultValue: 'medium'
    }
  ];

  return (
    <EnterpriseForm
      title="Contact Us"
      subtitle="We'd love to hear from you"
      description="Send us a message and we'll respond as soon as possible"
      fields={contactFields}
      onSubmit={onSubmit}
      showProgress={true}
      enableAutoSave={true}
      layout={{ type: 'default', columns: 2 }}
      validation={{ mode: 'onBlur' }}
      size="medium"
      elevation={2}
      loading={loading}
    />
  );
};

export const DocumentUploadForm: React.FC<{
  onSubmit: (values: Record<string, any>) => void | Promise<void>;
  loading?: boolean;
  progress?: number;
}> = ({ onSubmit, loading, progress }) => {
  const uploadSections: FormSection[] = [
    {
      id: 'basic-info',
      title: 'Document Information',
      description: 'Provide basic details about your document',
      fields: [
        {
          id: 'title',
          type: 'text',
          label: 'Document Title',
          placeholder: 'Enter document title',
          required: true,
          validation: { required: 'Title is required' },
          icon: <FileText size={18} />
        },
        {
          id: 'description',
          type: 'textarea',
          label: 'Description',
          placeholder: 'Enter document description',
          metadata: { rows: 3 }
        },
        {
          id: 'category',
          type: 'select',
          label: 'Category',
          options: [
            { label: 'Contract', value: 'contract' },
            { label: 'Report', value: 'report' },
            { label: 'Presentation', value: 'presentation' },
            { label: 'Other', value: 'other' }
          ],
          required: true
        }
      ],
      columns: 2
    },
    {
      id: 'file-upload',
      title: 'File Upload',
      description: 'Upload your document files',
      fields: [
        {
          id: 'document',
          type: 'file',
          label: 'Document File',
          required: true,
          validation: { required: 'Document file is required' },
          metadata: {
            accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx',
            multiple: false
          },
          icon: <Upload size={18} />
        },
        {
          id: 'thumbnail',
          type: 'image',
          label: 'Thumbnail Image',
          metadata: {
            accept: 'image/*',
            multiple: false
          },
          icon: <ImageIcon size={18} />
        }
      ],
      columns: 2
    },
    {
      id: 'permissions',
      title: 'Sharing & Permissions',
      description: 'Configure who can access this document',
      fields: [
        {
          id: 'visibility',
          type: 'radio',
          label: 'Visibility',
          options: [
            { label: 'Private', value: 'private' },
            { label: 'Team', value: 'team' },
            { label: 'Public', value: 'public' }
          ],
          defaultValue: 'private'
        },
        {
          id: 'allowDownload',
          type: 'switch',
          label: 'Allow Downloads',
          defaultValue: true
        },
        {
          id: 'allowComments',
          type: 'switch',
          label: 'Allow Comments',
          defaultValue: true
        }
      ]
    }
  ];

  const uploadActions: FormAction[] = [
    {
      id: 'save-draft',
      label: 'Save Draft',
      onClick: (form) => form.saveDraft(),
      variant: 'secondary',
      position: 'left'
    },
    {
      id: 'submit',
      label: 'Upload Document',
      onClick: (form) => form.submit(),
      variant: 'primary',
      position: 'right'
    }
  ];

  return (
    <EnterpriseForm
      title="Upload Document"
      subtitle="Share your documents with the team"
      sections={uploadSections}
      actions={uploadActions}
      onSubmit={onSubmit}
      showProgress={true}
      showStepper={true}
      layout={{ type: 'stepper' }}
      validation={{ mode: 'onBlur' }}
      size="large"
      elevation={3}
      loading={loading}
    />
  );
};

// Usage examples:
export const UsageExamples = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleLogin = async (values: { email: string; password: string; rememberMe: boolean }) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Login values:', values);
    setLoading(false);
  };

  const handleContact = async (values: Record<string, any>) => {
    setLoading(true);
    // Simulate API call with progress
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    console.log('Contact values:', values);
    setLoading(false);
    setProgress(0);
  };

  const handleUpload = async (values: Record<string, any>) => {
    setLoading(true);
    // Simulate file upload
    for (let i = 0; i <= 100; i += 20) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log('Upload values:', values);
    setLoading(false);
    setProgress(0);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 800, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Enterprise Form Examples
      </Typography>

      <Grid container spacing={4}>
        {/* Login Form */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
                Login Form
              </Typography>
              <LoginForm onSubmit={handleLogin} loading={loading} />
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
                Contact Form
              </Typography>
              <ContactForm onSubmit={handleContact} loading={loading} />
            </CardContent>
          </Card>
        </Grid>

        {/* Document Upload Form */}
        <Grid item xs={12}>
          <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
                Document Upload Form
              </Typography>
              <DocumentUploadForm 
                onSubmit={handleUpload} 
                loading={loading} 
                progress={progress} 
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Advanced Features */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Advanced Features</Typography>
        
        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          <Button
            variant="outlined"
            startIcon={<BarChart3 size={18} />}
            onClick={() => console.log('Multi-step form')}
            sx={{ borderRadius: 2 }}
          >
            Multi-Step Form
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Filter size={18} />}
            onClick={() => console.log('Conditional fields')}
            sx={{ borderRadius: 2 }}
          >
            Conditional Fields
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Calendar size={18} />}
            onClick={() => console.log('Date/time pickers')}
            sx={{ borderRadius: 2 }}
          >
            Date/Time Pickers
          </Button>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          The Enterprise Form component provides a comprehensive solution for form handling 
          with advanced features like validation, conditional fields, auto-save, multi-step 
          wizards, and support for 30+ field types. It includes built-in accessibility 
          features and follows enterprise-grade design patterns.
        </Typography>
      </Box>
    </Box>
  );
};

export default EnterpriseForm;
