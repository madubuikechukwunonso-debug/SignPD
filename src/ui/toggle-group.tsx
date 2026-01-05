import React, { useState, useEffect } from 'react';
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Stack,
  Chip,
  Tooltip,
  Badge,
  alpha,
  Card,
  CardContent,
  Grid,
  IconButton,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  TextField,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import {
  LayoutGrid,
  List,
  Columns,
  Rows,
  Grid3x3,
  BarChart3,
  PieChart,
  LineChart,
  AreaChart,
  ScatterChart,
  RadarChart,
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
  Users,
  User,
  Shield,
  Zap,
  Clock,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  Settings,
  Filter,
  Search,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Star,
  StarOff,
  Heart,
  HeartOff,
  Bookmark,
  BookmarkOff,
  Share2,
  Download,
  Upload,
  Plus,
  MinusCircle,
  RotateCcw,
  RefreshCw,
  Sliders,
  Palette,
  Type,
  Hash,
  DollarSign,
  Percent,
  HashIcon,
  BarChartHorizontal,
  ColumnVertical
} from 'lucide-react';

export interface ToggleOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  badge?: string | number;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  category?: string;
  premium?: boolean;
  hotkey?: string;
  metadata?: any;
}

export interface ToggleGroupProps {
  options: ToggleOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  variant?: 'default' | 'pills' | 'chips' | 'cards' | 'buttons' | 'icons' | 'chart' | 'color' | 'size';
  size?: 'small' | 'medium' | 'large';
  orientation?: 'horizontal' | 'vertical';
  exclusive?: boolean;
  multiple?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  showIcons?: boolean;
  showLabels?: boolean;
  showDescriptions?: boolean;
  showBadges?: boolean;
  showTooltips?: boolean;
  showAnalytics?: boolean;
  analytics?: {
    totalOptions: number;
    selectedOptions: number;
    mostPopular?: string;
    usageData?: Record<string, number>;
  };
  grouped?: boolean;
  groupBy?: string;
  sortable?: boolean;
  filterable?: boolean;
  searchable?: boolean;
  showAllOption?: boolean;
  showNoneOption?: boolean;
  customStyles?: {
    backgroundColor?: string;
    activeColor?: string;
    inactiveColor?: string;
    borderRadius?: number;
    elevation?: number;
  };
  emptyState?: {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
  };
  loading?: boolean;
  loadingText?: string;
  onLoadMore?: () => void;
  hasMore?: boolean;
  virtualized?: boolean;
  maxVisible?: number;
  showCount?: boolean;
  countPosition?: 'top' | 'bottom' | 'inline';
  presetGroups?: Array<{
    name: string;
    options: string[];
    icon?: React.ReactNode;
    description?: string;
  }>;
  showPresets?: boolean;
  onPresetSelect?: (preset: any) => void;
  showPopular?: boolean;
  popularThreshold?: number;
  showRecentlyUsed?: boolean;
  recentlyUsed?: string[];
  maxRecentlyUsed?: number;
  onRecentlyUsedChange?: (items: string[]) => void;
}

interface ToggleGroupAnalytics {
  selections: Record<string, number>;
  timestamps: Record<string, Date[]>;
  totalInteractions: number;
  averageSelectionTime: number;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  label,
  description,
  disabled = false,
  required = false,
  error = false,
  helperText,
  variant = 'default',
  size = 'medium',
  orientation = 'horizontal',
  exclusive = true,
  multiple = false,
  color = 'primary',
  showIcons = true,
  showLabels = true,
  showDescriptions = false,
  showBadges = true,
  showTooltips = true,
  showAnalytics = false,
  analytics,
  grouped = false,
  groupBy = 'category',
  sortable = false,
  filterable = false,
  searchable = false,
  showAllOption = false,
  showNoneOption = false,
  customStyles,
  emptyState = {
    title: 'No options available',
    description: 'There are no toggle options to display.',
    icon: <LayoutGrid size={48} />
  },
  loading = false,
  loadingText = 'Loading options...',
  onLoadMore,
  hasMore = false,
  virtualized = false,
  maxVisible = 10,
  showCount = false,
  countPosition = 'top',
  presetGroups = [],
  showPresets = false,
  onPresetSelect,
  showPopular = false,
  popularThreshold = 5,
  showRecentlyUsed = false,
  recentlyUsed = [],
  maxRecentlyUsed = 5,
  onRecentlyUsedChange
}) => {
  const [internalValue, setInternalValue] = useState<string | string[]>(defaultValue || (multiple ? [] : ''));
  const [value, setValue] = useState<string | string[]>(controlledValue !== undefined ? controlledValue : internalValue);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [sortBy, setSortBy] = useState<'label' | 'usage' | 'recent'>('label');
  const [showAll, setShowAll] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<ToggleGroupAnalytics>({
    selections: {},
    timestamps: {},
    totalInteractions: 0,
    averageSelectionTime: 0
  });

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  useEffect(() => {
    let filtered = options;

    // Search filter
    if (searchQuery && searchable) {
      filtered = filtered.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        option.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        option.value.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort options
    if (sortable) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'usage':
            return (analyticsData.selections[b.value] || 0) - (analyticsData.selections[a.value] || 0);
          case 'recent':
            const aRecent = analyticsData.timestamps[a.value]?.[0] || new Date(0);
            const bRecent = analyticsData.timestamps[b.value]?.[0] || new Date(0);
            return bRecent.getTime() - aRecent.getTime();
          default:
            return a.label.localeCompare(b.label);
        }
      });
    }

    setFilteredOptions(filtered);
  }, [options, searchQuery, sortBy, analyticsData, searchable, sortable]);

  const getColorGradient = (color: string, active: boolean) => {
    if (!active) return 'transparent';
    
    switch (color) {
      case 'primary':
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      case 'secondary':
        return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
      case 'success':
        return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
      case 'error':
        return 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)';
      case 'warning':
        return 'linear-gradient(135deg, #ffa726 0%, #ff9800 100%)';
      case 'info':
        return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
      default:
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  };

  const getVariantStyles = (variant: string, active: boolean) => {
    const baseStyles = {
      borderRadius: 4,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      fontWeight: 600,
      textTransform: 'none'
    };

    switch (variant) {
      case 'pills':
        return {
          ...baseStyles,
          borderRadius: 20,
          px: 3,
          py: 1,
          background: active ? getColorGradient(color, active) : alpha('#666', 0.1),
          color: active ? 'white' : '#666',
          border: 'none',
          '&:hover': {
            background: active ? getColorGradient(color, active) : alpha('#666', 0.2),
            transform: 'translateY(-1px)'
          }
        };
      
      case 'chips':
        return {
          ...baseStyles,
          borderRadius: 3,
          px: 2,
          py: 1,
          background: active ? alpha(color, 0.1) : 'transparent',
          color: active ? color : '#666',
          border: `2px solid ${active ? color : alpha('#666', 0.2)}`,
          '&:hover': {
            background: active ? alpha(color, 0.2) : alpha('#666', 0.1),
            borderColor: active ? color : alpha('#666', 0.3)
          }
        };
      
      case 'cards':
        return {
          ...baseStyles,
          borderRadius: 3,
          p: 2,
          background: active ? alpha(color, 0.05) : 'white',
          border: `2px solid ${active ? color : alpha('#666', 0.2)}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          textAlign: 'left' as const,
          '&:hover': {
            background: active ? alpha(color, 0.1) : alpha('#666', 0.05),
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }
        };
      
      case 'icons':
        return {
          ...baseStyles,
          borderRadius: '50%',
          width: 48,
          height: 48,
          minWidth: 48,
          p: 0,
          background: active ? getColorGradient(color, active) : alpha('#666', 0.1),
          color: active ? 'white' : '#666',
          '&:hover': {
            background: active ? getColorGradient(color, active) : alpha('#666', 0.2),
            transform: 'scale(1.05)'
          }
        };
      
      case 'chart':
        return {
          ...baseStyles,
          borderRadius: 3,
          px: 2,
          py: 1.5,
          background: active ? getColorGradient(color, active) : 'white',
          color: active ? 'white' : '#666',
          border: `1px solid ${active ? 'transparent' : alpha('#666', 0.2)}`,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          '&:hover': {
            background: active ? getColorGradient(color, active) : alpha('#666', 0.05),
            transform: 'translateY(-1px)'
          }
        };
      
      case 'color':
        return {
          ...baseStyles,
          borderRadius: 3,
          width: 40,
          height: 40,
          minWidth: 40,
          p: 0,
          background: active ? 'currentColor' : alpha('currentColor', 0.3),
          border: `3px solid ${active ? 'currentColor' : 'transparent'}`,
          '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }
        };
      
      default:
        return {
          ...baseStyles,
          px: 2,
          py: 1,
          background: active ? getColorGradient(color, active) : 'white',
          color: active ? 'white' : '#666',
          border: `2px solid ${active ? 'transparent' : alpha('#666', 0.2)}`,
          '&:hover': {
            background: active ? getColorGradient(color, active) : alpha('#666', 0.05),
            transform: 'translateY(-1px)'
          }
        };
    }
  };

  const getSizeStyles = (size: string) => {
    switch (size) {
      case 'small':
        return { fontSize: '0.75rem', px: 1.5, py: 0.5 };
      case 'large':
        return { fontSize: '1rem', px: 3, py: 1.5 };
      default:
        return { fontSize: '0.875rem', px: 2, py: 1 };
    }
  };

  const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: string | string[]) => {
    if (newValue === null) return;

    // Track analytics
    if (multiple && Array.isArray(newValue)) {
      newValue.forEach(val => {
        trackSelection(val);
      });
    } else if (typeof newValue === 'string') {
      trackSelection(newValue);
    }

    // Update recently used
    if (showRecentlyUsed && onRecentlyUsedChange) {
      updateRecentlyUsed(newValue);
    }

    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    setValue(newValue);
    onChange?.(newValue);
  };

  const trackSelection = (optionValue: string) => {
    setAnalyticsData(prev => ({
      selections: {
        ...prev.selections,
        [optionValue]: (prev.selections[optionValue] || 0) + 1
      },
      timestamps: {
        ...prev.timestamps,
        [optionValue]: [new Date(), ...(prev.timestamps[optionValue] || [])].slice(0, 10)
      },
      totalInteractions: prev.totalInteractions + 1,
      averageSelectionTime: 0 // Calculate based on timestamps
    }));
  };

  const updateRecentlyUsed = (newValue: string | string[]) => {
    if (!onRecentlyUsedChange) return;

    const values = multiple && Array.isArray(newValue) ? newValue : [newValue];
    const updated = [...values, ...recentlyUsed.filter(item => !values.includes(item))].slice(0, maxRecentlyUsed);
    onRecentlyUsedChange(updated);
  };

  const getPopularOptions = () => {
    if (!showPopular) return [];
    
    return options
      .filter(option => (analyticsData.selections[option.value] || 0) >= popularThreshold)
      .sort((a, b) => (analyticsData.selections[b.value] || 0) - (analyticsData.selections[a.value] || 0));
  };

  const getRecentlyUsedOptions = () => {
    if (!showRecentlyUsed) return [];
    
    return recentlyUsed
      .map(value => options.find(option => option.value === value))
      .filter(Boolean) as ToggleOption[];
  };

  const getFilteredOptions = () => {
    let result = filteredOptions;

    if (!showAll && maxVisible && result.length > maxVisible) {
      result = result.slice(0, maxVisible);
    }

    return result;
  };

  const renderOption = (option: ToggleOption) => {
    const isSelected = multiple 
      ? Array.isArray(value) && value.includes(option.value)
      : value === option.value;

    const isPopular = getPopularOptions().includes(option);
    const isRecentlyUsed = getRecentlyUsedOptions().includes(option);

    const button = (
      <ToggleButton
        value={option.value}
        disabled={option.disabled || disabled}
        aria-label={option.label}
        sx={{
          ...getVariantStyles(variant, isSelected),
          ...getSizeStyles(size),
          ...((option.disabled || disabled) && {
            opacity: 0.5,
            cursor: 'not-allowed'
          }),
          ...(isPopular && {
            boxShadow: '0 2px 8px rgba(255, 167, 38, 0.3)'
          }),
          ...(isRecentlyUsed && {
            borderColor: '#4facfe !important'
          })
        }}
      >
        <Stack
          direction={variant === 'cards' ? 'column' : 'row'}
          spacing={1}
          alignItems={variant === 'cards' ? 'flex-start' : 'center'}
          sx={{ width: '100%' }}
        >
          {/* Icon */}
          {showIcons && option.icon && (
            <Box sx={{ 
              color: isSelected && variant !== 'color' ? 'inherit' : undefined,
              display: 'flex',
              alignItems: 'center'
            }}>
              {option.icon}
            </Box>
          )}

          {/* Label and Description */}
          {showLabels && (
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: 'inherit',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {option.label}
              </Typography>
              {showDescriptions && option.description && (
                <Typography
                  variant="caption"
                  sx={{
                    color: 'inherit',
                    opacity: 0.8,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {option.description}
                </Typography>
              )}
            </Box>
          )}

          {/* Badges and Indicators */}
          <Stack direction="row" spacing={0.5} alignItems="center">
            {showBadges && option.badge && (
              <Badge
                badgeContent={option.badge}
                color={option.color as any || 'primary'}
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.7rem',
                    fontWeight: 700
                  }
                }}
              />
            )}

            {option.premium && (
              <Chip
                icon={<Star size={12} />}
                label="Premium"
                size="small"
                sx={{
                  background: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
                  color: 'white',
                  fontSize: '0.6rem',
                  fontWeight: 600
                }}
              />
            )}

            {isPopular && showPopular && (
              <Tooltip title="Popular choice">
                <TrendingUp size={14} color="#ffa726" />
              </Tooltip>
            )}

            {isRecentlyUsed && showRecentlyUsed && (
              <Tooltip title="Recently used">
                <Clock size={14} color="#4facfe" />
              </Tooltip>
            )}

            {option.hotkey && (
              <Tooltip title={`Hotkey: ${option.hotkey}`}>
                <Chip
                  label={option.hotkey}
                  size="small"
                  sx={{
                    background: alpha('#666', 0.1),
                    color: '#666',
                    fontSize: '0.6rem',
                    fontWeight: 600
                  }}
                />
              </Tooltip>
            )}
          </Stack>
        </Stack>
      </ToggleButton>
    );

    if (!showTooltips) return button;

    return (
      <Tooltip
        title={
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {option.label}
            </Typography>
            {option.description && (
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                {option.description}
              </Typography>
            )}
            {analyticsData.selections[option.value] && (
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                Used {analyticsData.selections[option.value]} times
              </Typography>
            )}
          </Box>
        }
        arrow
      >
        {button}
      </Tooltip>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Card elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
          <CircularProgress sx={{ color: '#667eea' }} />
          <Typography variant="body2" sx={{ mt: 2 }}>
            {loadingText}
          </Typography>
        </Card>
      );
    }

    if (filteredOptions.length === 0) {
      return (
        <Card elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
          {emptyState.icon && (
            <Box sx={{ color: '#666', mb: 2 }}>
              {emptyState.icon}
            </Box>
          )}
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            {emptyState.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {emptyState.description}
          </Typography>
        </Card>
      );
    }

    return (
      <>
        {/* Search and Filters */}
        {(searchable || filterable) && (
          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            {searchable && (
              <TextField
                placeholder="Search options..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={18} />
                    </InputAdornment>
                  )
                }}
                sx={{ flexGrow: 1 }}
              />
            )}
            
            {filterable && (
              <IconButton size="small">
                <Filter size={18} />
              </IconButton>
            )}
          </Stack>
        )}

        {/* Presets Section */}
        {showPresets && presetGroups.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
              Preset Groups
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {presetGroups.map((preset, index) => (
                <Chip
                  key={index}
                  label={preset.name}
                  icon={preset.icon}
                  onClick={() => onPresetSelect?.(preset)}
                  sx={{ fontWeight: 600 }}
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* Popular and Recently Used */}
        {(showPopular || showRecentlyUsed) && (
          <Box sx={{ mb: 3 }}>
            {showPopular && getPopularOptions().length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Popular Choices
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {getPopularOptions().map(option => renderOption(option))}
                </Stack>
              </Box>
            )}

            {showRecentlyUsed && getRecentlyUsedOptions().length > 0 && (
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Recently Used
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {getRecentlyUsedOptions().map(option => renderOption(option))}
                </Stack>
              </Box>
            )}
          </Box>
        )}

        {/* Main Toggle Group */}
        <ToggleButtonGroup
          value={value}
          onChange={handleChange}
          exclusive={exclusive}
          orientation={orientation}
          disabled={disabled}
          sx={{
            flexWrap: orientation === 'horizontal' ? 'wrap' : 'nowrap',
            gap: 1,
            '& .MuiToggleButton-root': {
              border: 'none',
              margin: 0
            }
          }}
        >
          {showAllOption && (
            <ToggleButton
              value="all"
              sx={getVariantStyles(variant, Array.isArray(value) && value.includes('all'))}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <CheckCircle size={16} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>All</Typography>
              </Stack>
            </ToggleButton>
          )}

          {showNoneOption && (
            <ToggleButton
              value="none"
              sx={getVariantStyles(variant, Array.isArray(value) && value.includes('none'))}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <XCircle size={16} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>None</Typography>
              </Stack>
            </ToggleButton>
          )}

          {getFilteredOptions().map(option => renderOption(option))}
        </ToggleButtonGroup>

        {/* Load More */}
        {hasMore && onLoadMore && !showAll && (
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              variant="outlined"
              onClick={onLoadMore}
              startIcon={<Plus size={16} />}
              sx={{ borderRadius: 3 }}
            >
              Load More
            </Button>
          </Box>
        )}

        {/* Analytics */}
        {showAnalytics && analytics && (
          <Card elevation={0} sx={{ mt: 3, background: alpha('#43e97b', 0.05), borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                Usage Analytics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#43e97b' }}>
                      {analytics.totalOptions}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">Total Options</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#4facfe' }}>
                      {analytics.selectedOptions}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">Selected</Typography>
                  </Box>
                </Grid>
                {analytics.mostPopular && (
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Most Popular</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {analytics.mostPopular}
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        )}
      </>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      {(label || showCount) && (
        <Box sx={{ mb: 3 }}>
          {label && (
            <FormControl fullWidth>
              <FormLabel
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: error ? '#f44336' : '#1a1a1a',
                  fontSize: '1.1rem'
                }}
              >
                {label}
                {required && <span style={{ color: '#f44336' }}>*</span>}
              </FormLabel>
              {description && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {description}
                </Typography>
              )}
            </FormControl>
          )}

          {/* Count Display */}
          {showCount && (
            <Chip
              label={`${Array.isArray(value) ? value.length : (value ? 1 : 0)} selected`}
              size="small"
              sx={{
                fontWeight: 600,
                background: alpha('#667eea', 0.1),
                color: '#667eea'
              }}
            />
          )}
        </Box>
      )}

      {/* Main Content */}
      <Card
        elevation={customStyles?.elevation || 0}
        sx={{
          background: customStyles?.backgroundColor || 'white',
          borderRadius: customStyles?.borderRadius || 4,
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {renderContent()}
        </CardContent>
      </Card>

      {/* Helper Text */}
      {helperText && (
        <FormHelperText
          error={error}
          sx={{
            mt: 1,
            fontWeight: error ? 600 : 400,
            color: error ? '#f44336' : alpha('#1a1a1a', 0.7)
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
};

export default ToggleGroup;
