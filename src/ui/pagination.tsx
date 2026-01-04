import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Tooltip,
  alpha,
  Fade,
  Zoom,
  Badge,
  Card,
  CardContent,
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  MoreVertical,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  SkipBack,
  SkipForward,
  StepBack,
  StepForward,
  FastForward,
  Rewind,
  Play,
  Pause,
  Stop,
  RefreshCw,
  RotateCcw,
  RotateCw,
  Zap,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  Calendar,
  Filter,
  Search,
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
  Settings,
  User,
  Users,
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
  Settings2,
  HelpCircle,
  Search2,
  Filter2,
  MoreVertical as MoreIcon,
  Copy,
  Edit,
  Trash2,
  Save,
  Share2,
  ExternalLink,
  Eye,
  EyeOff,
  Download2,
  Upload2,
  Plus,
  Minus,
  X,
  Check,
  RotateCcw2,
  RotateCw2
} from 'lucide-react';

export interface PaginationProps {
  // Core pagination props
  total: number;
  current: number;
  pageSize: number;
  onChange: (page: number, pageSize?: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  
  // Display options
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: boolean;
  showPrevNext?: boolean;
  showFirstLast?: boolean;
  showEllipsis?: boolean;
  showInfo?: boolean;
  showProgress?: boolean;
  
  // Size and layout
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'outlined' | 'text' | 'gradient' | 'enterprise';
  shape?: 'circular' | 'rounded' | 'square';
  layout?: 'horizontal' | 'vertical' | 'compact';
  
  // Styling
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gradient';
  disabled?: boolean;
  loading?: boolean;
  animated?: boolean;
  
  // Page size options
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  maxPagesToShow?: number;
  siblingCount?: number;
  boundaryCount?: number;
  
  // Customization
  itemRender?: (page: number | string, type: 'page' | 'prev' | 'next' | 'ellipsis' | 'first' | 'last', originalElement: React.ReactNode) => React.ReactNode;
  showLessItems?: boolean;
  responsive?: boolean;
  hideOnSinglePage?: boolean;
  
  // Advanced features
  quickJump?: boolean;
  jumpToInput?: boolean;
  jumpToButton?: boolean;
  jumpToLabel?: string;
  
  // Bulk operations
  showBulkActions?: boolean;
  bulkActions?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    variant?: 'default' | 'primary' | 'secondary';
  }>;
  
  // Statistics
  showStats?: boolean;
  stats?: Array<{
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    trend?: 'up' | 'down' | 'stable';
  }>;
  
  // Selection
  showSelection?: boolean;
  selectedCount?: number;
  totalSelected?: number;
  onSelectAll?: () => void;
  onSelectNone?: () => void;
  
  // Export
  showExport?: boolean;
  exportOptions?: Array<{
    label: string;
    format: string;
    icon?: React.ReactNode;
    onClick: () => void;
  }>;
  
  // Accessibility
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  
  // Styling overrides
  className?: string;
  sx?: any;
  style?: React.CSSProperties;
  
  // Custom rendering
  renderTotal?: (total: number, range: [number, number]) => React.ReactNode;
  renderPageSize?: (pageSize: number) => React.ReactNode;
  renderPageItem?: (page: number, isActive: boolean, isDisabled: boolean) => React.ReactNode;
  
  // Event handlers
  onShowSizeChange?: (current: number, size: number) => void;
  onPrevClick?: (current: number) => void;
  onNextClick?: (current: number) => void;
  onFirstClick?: (current: number) => void;
  onLastClick?: (current: number) => void;
  
  // Enterprise features
  enterprise?: boolean;
  showQuickStats?: boolean;
  quickStats?: Array<{
    label: string;
    value: string | number;
    icon: React.ReactNode;
    color?: string;
  }>;
  
  // Performance
  virtualized?: boolean;
  bufferSize?: number;
  
  // Mobile
  mobileLayout?: 'dropdown' | 'slider' | 'buttons';
  showMobileQuickJump?: boolean;
}

interface PageItem {
  type: 'page' | 'prev' | 'next' | 'ellipsis' | 'first' | 'last';
  page: number | string;
  disabled?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  total,
  current,
  pageSize,
  onChange,
  onPageSizeChange,
  showSizeChanger = true,
  showQuickJumper = true,
  showTotal = true,
  showPrevNext = true,
  showFirstLast = true,
  showEllipsis = true,
  showInfo = true,
  showProgress = false,
  size = 'medium',
  variant = 'default',
  shape = 'circular',
  layout = 'horizontal',
  color = 'primary',
  disabled = false,
  loading = false,
  animated = true,
  pageSizeOptions = [10, 20, 50, 100],
  defaultPageSize = 20,
  maxPagesToShow = 7,
  siblingCount = 1,
  boundaryCount = 1,
  itemRender,
  showLessItems = false,
  responsive = true,
  hideOnSinglePage = true,
  quickJump = false,
  jumpToInput = true,
  jumpToButton = true,
  jumpToLabel = 'Go to',
  showBulkActions = false,
  bulkActions = [],
  showStats = false,
  stats = [],
  showSelection = false,
  selectedCount = 0,
  totalSelected = 0,
  onSelectAll,
  onSelectNone,
  showExport = false,
  exportOptions = [],
  ariaLabel = 'Pagination navigation',
  ariaLabelledBy,
  ariaDescribedBy,
  className = '',
  sx,
  style,
  renderTotal,
  renderPageSize,
  renderPageItem,
  onShowSizeChange,
  onPrevClick,
  onNextClick,
  onFirstClick,
  onLastClick,
  enterprise = false,
  showQuickStats = false,
  quickStats = [],
  virtualized = false,
  bufferSize = 5,
  mobileLayout = 'dropdown',
  showMobileQuickJump = true
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [jumpToPage, setJumpToPage] = useState('');
  const [showAllPages, setShowAllPages] = useState(false);

  const totalPages = Math.ceil(total / pageSize);
  const startItem = (current - 1) * pageSize + 1;
  const endItem = Math.min(current * pageSize, total);

  // Generate page items
  const pageItems = useMemo(() => {
    const items: PageItem[] = [];
    
    // First page
    if (showFirstLast && current > boundaryCount + siblingCount + 1) {
      items.push({ type: 'first', page: 1 });
    }

    // Previous
    if (showPrevNext) {
      items.push({ 
        type: 'prev', 
        page: 'Previous',
        disabled: current <= 1 
      });
    }

    // Page numbers
    const startPage = Math.max(1, current - siblingCount);
    const endPage = Math.min(totalPages, current + siblingCount);

    // Left boundary
    for (let i = 1; i <= Math.min(boundaryCount, startPage - 1); i++) {
      items.push({ type: 'page', page: i });
    }

    // Left ellipsis
    if (startPage > boundaryCount + 1) {
      items.push({ type: 'ellipsis', page: '...' });
    }

    // Current page range
    for (let i = startPage; i <= endPage; i++) {
      items.push({ type: 'page', page: i });
    }

    // Right ellipsis
    if (endPage < totalPages - boundaryCount) {
      items.push({ type: 'ellipsis', page: '...' });
    }

    // Right boundary
    for (let i = Math.max(totalPages - boundaryCount + 1, endPage + 1); i <= totalPages; i++) {
      items.push({ type: 'page', page: i });
    }

    // Next
    if (showPrevNext) {
      items.push({ 
        type: 'next', 
        page: 'Next',
        disabled: current >= totalPages 
      });
    }

    // Last page
    if (showFirstLast && current < totalPages - boundaryCount - siblingCount) {
      items.push({ type: 'last', page: totalPages });
    }

    return items;
  }, [current, totalPages, siblingCount, boundaryCount, showPrevNext, showFirstLast, showEllipsis]);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages && page !== current) {
      onChange(page, pageSize);
    }
  }, [current, totalPages, pageSize, onChange]);

  // Handle jump to page
  const handleJumpToPage = useCallback(() => {
    const page = parseInt(jumpToPage);
    if (page >= 1 && page <= totalPages) {
      handlePageChange(page);
      setJumpToPage('');
    }
  }, [jumpToPage, totalPages, handlePageChange]);

  // Get button styles
  const getButtonStyles = (isActive = false, isDisabled = false) => {
    const baseStyles = {
      minWidth: size === 'small' ? '32px' : size === 'large' ? '48px' : '40px',
      height: size === 'small' ? '32px' : size === 'large' ? '48px' : '40px',
      borderRadius: shape === 'circular' ? '50%' : shape === 'rounded' ? '12px' : '4px',
      fontWeight: 600,
      fontSize: size === 'small' ? '12px' : size === 'large' ? '16px' : '14px',
      transition: 'all 0.2s ease',
    };

    if (isDisabled) {
      return {
        ...baseStyles,
        backgroundColor: alpha('#000', 0.05),
        color: alpha('#000', 0.4),
        cursor: 'not-allowed',
      };
    }

    if (isActive) {
      const colors = {
        primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        success: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        warning: 'linear-gradient(135deg, #ffa726 0%, #ff9800 100%)',
        error: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
        info: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      };

      return {
        ...baseStyles,
        background: colors[color] || colors.primary,
        color: 'white',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
        },
      };
    }

    const variantStyles = {
      default: {
        backgroundColor: 'white',
        color: '#1a1a1a',
        border: '1px solid',
        borderColor: alpha('#000', 0.1),
        '&:hover': {
          backgroundColor: alpha('#667eea', 0.05),
          borderColor: '#667eea',
        },
      },
      outlined: {
        backgroundColor: 'transparent',
        color: '#667eea',
        border: '2px solid',
        borderColor: '#667eea',
        '&:hover': {
          backgroundColor: alpha('#667eea', 0.1),
        },
      },
      text: {
        backgroundColor: 'transparent',
        color: '#1a1a1a',
        '&:hover': {
          backgroundColor: alpha('#000', 0.05),
        },
      },
      gradient: {
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        color: '#667eea',
        border: '1px solid',
        borderColor: alpha('#667eea', 0.3),
        '&:hover': {
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
        },
      },
      enterprise: {
        backgroundColor: alpha('#667eea', 0.05),
        color: '#667eea',
        border: '1px solid',
        borderColor: alpha('#667eea', 0.2),
        fontWeight: 700,
        '&:hover': {
          backgroundColor: alpha('#667eea', 0.1),
          borderColor: '#667eea',
        },
      },
    };

    return {
      ...baseStyles,
      ...variantStyles[variant],
    };
  };

  // Render page item
  const renderPageItem = (item: PageItem, index: number) => {
    const isActive = item.type === 'page' && item.page === current;
    const isDisabled = item.disabled || disabled || loading;

    let content: React.ReactNode;

    switch (item.type) {
      case 'page':
        content = (
          <Zoom in={animated} timeout={200 + index * 50}>
            <Button
              onClick={() => handlePageChange(item.page as number)}
              disabled={isDisabled}
              sx={getButtonStyles(isActive, isDisabled)}
            >
              {item.page}
            </Button>
          </Zoom>
        );
        break;

      case 'prev':
        content = (
          <Tooltip title="Previous page" arrow>
            <IconButton
              onClick={() => {
                handlePageChange(current - 1);
                onPrevClick?.(current);
              }}
              disabled={isDisabled}
              sx={getButtonStyles(false, isDisabled)}
            >
              <ChevronLeft size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />
            </IconButton>
          </Tooltip>
        );
        break;

      case 'next':
        content = (
          <Tooltip title="Next page" arrow>
            <IconButton
              onClick={() => {
                handlePageChange(current + 1);
                onNextClick?.(current);
              }}
              disabled={isDisabled}
              sx={getButtonStyles(false, isDisabled)}
            >
              <ChevronRight size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />
            </IconButton>
          </Tooltip>
        );
        break;

      case 'first':
        content = (
          <Tooltip title="First page" arrow>
            <IconButton
              onClick={() => {
                handlePageChange(1);
                onFirstClick?.(current);
              }}
              disabled={isDisabled}
              sx={getButtonStyles(false, isDisabled)}
            >
              <ChevronsLeft size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />
            </IconButton>
          </Tooltip>
        );
        break;

      case 'last':
        content = (
          <Tooltip title="Last page" arrow>
            <IconButton
              onClick={() => {
                handlePageChange(totalPages);
                onLastClick?.(current);
              }}
              disabled={isDisabled}
              sx={getButtonStyles(false, isDisabled)}
            >
              <ChevronsRight size={size === 'small' ? 16 : size === 'large' ? 24 : 20} />
            </IconButton>
          </Tooltip>
        );
        break;

      case 'ellipsis':
        content = (
          <Box sx={{ display: 'flex', alignItems: 'center', px: 1 }}>
            <MoreHorizontal size={20} color={alpha('#000', 0.4)} />
          </Box>
        );
        break;

      default:
        content = null;
    }

    if (itemRender) {
      return (
        <Box key={`${item.type}-${item.page}`}>
          {itemRender(item.page, item.type, content)}
        </Box>
      );
    }

    return (
      <Box key={`${item.type}-${item.page}`} sx={{ display: 'flex', alignItems: 'center' }}>
        {content}
      </Box>
    );
  };

  // Mobile layout
  if (isMobile && responsive) {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          background: 'white',
          ...sx
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack spacing={3}>
            {/* Mobile stats */}
            {showStats && stats.length > 0 && (
              <Grid container spacing={2}>
                {stats.slice(0, 2).map((stat, index) => (
                  <Grid item xs={6} key={index}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: stat.color || '#667eea' }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Mobile page selector */}
            <FormControl fullWidth size="small">
              <InputLabel>Page</InputLabel>
              <Select
                value={current}
                onChange={(e) => handlePageChange(Number(e.target.value))}
                label="Page"
                disabled={disabled}
              >
                {Array.from({ length: Math.min(totalPages, 50) }, (_, i) => i + 1).map(page => (
                  <MenuItem key={page} value={page}>
                    Page {page} of {totalPages}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Mobile navigation buttons */}
            <Stack direction="row" spacing={1} justifyContent="center">
              <IconButton
                onClick={() => handlePageChange(current - 1)}
                disabled={current <= 1 || disabled}
                sx={getButtonStyles(false, current <= 1 || disabled)}
              >
                <ChevronLeft size={20} />
              </IconButton>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                px: 2,
                background: alpha('#667eea', 0.1),
                borderRadius: 2
              }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {current} / {totalPages}
                </Typography>
              </Box>
              
              <IconButton
                onClick={() => handlePageChange(current + 1)}
                disabled={current >= totalPages || disabled}
                sx={getButtonStyles(false, current >= totalPages || disabled)}
              >
                <ChevronRight size={20} />
              </IconButton>
            </Stack>

            {/* Quick jump for mobile */}
            {showMobileQuickJump && totalPages > 10 && (
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  size="small"
                  placeholder="Page #"
                  value={jumpToPage}
                  onChange={(e) => setJumpToPage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleJumpToPage()}
                  sx={{ width: 80 }}
                  inputProps={{ style: { textAlign: 'center' } }}
                />
                <Button
                  size="small"
                  onClick={handleJumpToPage}
                  disabled={!jumpToPage || disabled}
                  sx={{ minWidth: 60 }}
                >
                  Go
                </Button>
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>
    );
  }

  // Desktop layout
  return (
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
        },
        ...sx
      }}
      style={style}
      className={className}
    >
      <CardContent sx={{ p: 4 }}>
        <Grid container spacing={3} alignItems="center">
          {/* Left section - Stats and Bulk Actions */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              {/* Quick Stats for Enterprise */}
              {enterprise && showQuickStats && quickStats.length > 0 && (
                <Grid container spacing={1}>
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
              )}

              {/* Total and Range */}
              {showTotal && (
                <Box>
                  {renderTotal ? (
                    renderTotal(total, [startItem, endItem])
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Showing <strong>{startItem}-{endItem}</strong> of <strong>{total}</strong> results
                    </Typography>
                  )}
                </Box>
              )}

              {/* Progress indicator */}
              {showProgress && (
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ 
                    height: 4, 
                    background: alpha('#000', 0.1), 
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}>
                    <Box sx={{ 
                      height: '100%', 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      width: `${(current / totalPages) * 100}%`,
                      transition: 'width 0.3s ease'
                    }} />
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                    Page {current} of {totalPages}
                  </Typography>
                </Box>
              )}

              {/* Bulk Actions */}
              {showBulkActions && bulkActions.length > 0 && (
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {bulkActions.map((action, index) => (
                    <Button
                      key={index}
                      size="small"
                      variant={action.variant === 'primary' ? 'contained' : 'outlined'}
                      onClick={action.onClick}
                      disabled={action.disabled || disabled}
                      startIcon={action.icon}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: '12px'
                      }}
                    >
                      {action.label}
                    </Button>
                  ))}
                </Stack>
              )}

              {/* Selection controls */}
              {showSelection && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Selected: {selectedCount} of {totalSelected}
                  </Typography>
                  <Button
                    size="small"
                    onClick={onSelectAll}
                    disabled={disabled}
                    sx={{ minWidth: 60, fontSize: '12px' }}
                  >
                    All
                  </Button>
                  <Button
                    size="small"
                    onClick={onSelectNone}
                    disabled={disabled}
                    sx={{ minWidth: 60, fontSize: '12px' }}
                  >
                    None
                  </Button>
                </Stack>
              )}
            </Stack>
          </Grid>

          {/* Center section - Page navigation */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2} alignItems="center">
              {/* Page items */}
              <Stack 
                direction="row" 
                spacing={size === 'small' ? 0.5 : 1} 
                alignItems="center"
                justifyContent="center"
                flexWrap="wrap"
                useFlexGap
              >
                {pageItems.map((item, index) => renderPageItem(item, index))}
              </Stack>

              {/* Quick jump */}
              {showQuickJumper && totalPages > 10 && (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    {jumpToLabel}:
                  </Typography>
                  <TextField
                    size="small"
                    placeholder="Page"
                    value={jumpToPage}
                    onChange={(e) => setJumpToPage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleJumpToPage()}
                    sx={{ width: 80 }}
                    inputProps={{ style: { textAlign: 'center' } }}
                    disabled={disabled}
                  />
                  {jumpToButton && (
                    <Button
                      size="small"
                      onClick={handleJumpToPage}
                      disabled={!jumpToPage || disabled}
                      sx={{ minWidth: 60 }}
                    >
                      Go
                    </Button>
                  )}
                </Stack>
              )}
            </Stack>
          </Grid>

          {/* Right section - Page size and export */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2} alignItems="flex-end">
              {/* Stats */}
              {showStats && stats.length > 0 && (
                <Grid container spacing={1}>
                  {stats.map((stat, index) => (
                    <Grid item xs={6} key={index}>
                      <Box sx={{ textAlign: 'right' }}>
                        <Stack spacing={0.5} alignItems="flex-end">
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
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}

              {/* Page size selector */}
              {showSizeChanger && (
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Items per page</InputLabel>
                  <Select
                    value={pageSize}
                    onChange={(e) => {
                      const newSize = Number(e.target.value);
                      onPageSizeChange?.(newSize);
                      onShowSizeChange?.(current, newSize);
                    }}
                    label="Items per page"
                    disabled={disabled}
                  >
                    {pageSizeOptions.map(size => (
                      <MenuItem key={size} value={size}>
                        {renderPageSize ? renderPageSize(size) : `${size} per page`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {/* Export options */}
              {showExport && exportOptions.length > 0 && (
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Export</InputLabel>
                  <Select
                    defaultValue=""
                    onChange={(e) => {
                      const option = exportOptions.find(opt => opt.format === e.target.value);
                      option?.onClick();
                    }}
                    label="Export"
                    disabled={disabled}
                  >
                    <MenuItem value="" disabled>
                      Export data
                    </MenuItem>
                    {exportOptions.map((option, index) => (
                      <MenuItem key={index} value={option.format}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          {option.icon}
                          <span>{option.label}</span>
                        </Stack>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

// Specialized pagination components
export const SimplePagination: React.FC<Omit<PaginationProps, 'showSizeChanger' | 'showQuickJumper' | 'showTotal' | 'showStats' | 'showBulkActions' | 'showSelection' | 'showExport'>> = (props) => (
  <Pagination
    {...props}
    showSizeChanger={false}
    showQuickJumper={false}
    showTotal={false}
    showStats={false}
    showBulkActions={false}
    showSelection={false}
    showExport={false}
    size="small"
    variant="text"
  />
);

export const EnterprisePagination: React.FC<PaginationProps> = (props) => (
  <Pagination
    {...props}
    enterprise={true}
    showQuickStats={true}
    variant="enterprise"
    color="gradient"
    animated={true}
    showProgress={true}
  />
);

export const MobilePagination: React.FC<Omit<PaginationProps, 'layout' | 'responsive'>> = (props) => (
  <Pagination
    {...props}
    layout="compact"
    responsive={true}
    mobileLayout="dropdown"
    showMobileQuickJump={true}
    size="medium"
  />
);

export const DataTablePagination: React.FC<PaginationProps> = (props) => (
  <Pagination
    {...props}
    showBulkActions={true}
    showSelection={true}
    showExport={true}
    showStats={true}
    showQuickStats={true}
    variant="enterprise"
    size="medium"
  />
);

export default Pagination;
