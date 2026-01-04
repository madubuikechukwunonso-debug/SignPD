import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  Chip,
  IconButton,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Checkbox,
  Tooltip,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  alpha,
  CircularProgress,
  Badge,
  Avatar,
  AvatarGroup,
  LinearProgress,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import {
  Search,
  Filter,
  Sort,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Plus,
  Settings,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  Archive,
  Code,
  Database,
  Shield,
  Activity,
  Zap,
  Star,
  StarOff,
  Bookmark,
  BookmarkOff,
  Share2,
  Link,
  ExternalLink,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  format?: (value: any) => string;
  sortable?: boolean;
  filterable?: boolean;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'badge' | 'avatar' | 'progress' | 'actions' | 'custom';
  renderCell?: (row: any, column: Column) => React.ReactNode;
  renderHeader?: (column: Column) => React.ReactNode;
  colorMap?: Record<string, string>;
  iconMap?: Record<string, React.ReactNode>;
}

interface RowAction {
  label: string;
  icon: React.ReactNode;
  onClick: (row: any) => void;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  disabled?: (row: any) => boolean;
  visible?: (row: any) => boolean;
}

interface TableProps {
  columns: Column[];
  rows: any[];
  title?: string;
  description?: string;
  loading?: boolean;
  searchable?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  selectable?: boolean;
  expandable?: boolean;
  exportable?: boolean;
  importable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  actions?: RowAction[];
  batchActions?: RowAction[];
  onRowClick?: (row: any) => void;
  onSelectionChange?: (selectedRows: any[]) => void;
  onSortChange?: (column: string, direction: 'asc' | 'desc') => void;
  onFilterChange?: (filters: Record<string, any>) => void;
  onPageChange?: (page: number, pageSize: number) => void;
  defaultSort?: { column: string; direction: 'asc' | 'desc' };
  defaultFilters?: Record<string, any>;
  showStats?: boolean;
  showAnalytics?: boolean;
  analytics?: {
    totalRows: number;
    filteredRows: number;
    selectedRows: number;
    averageValue?: number;
    totalValue?: number;
  };
  showColumnVisibility?: boolean;
  showDensity?: boolean;
  density?: 'compact' | 'standard' | 'comfortable';
  showRefresh?: boolean;
  onRefresh?: () => void;
  showFullscreen?: boolean;
  customStyles?: {
    headerColor?: string;
    rowColor?: string;
    borderRadius?: number;
    elevation?: number;
  };
  emptyState?: {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    action?: {
      label: string;
      onClick: () => void;
    };
  };
  errorState?: {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    action?: {
      label: string;
      onClick: () => void;
    };
  };
  rowHeight?: number;
  maxHeight?: number;
  virtualized?: boolean;
  stickyHeader?: boolean;
  striped?: boolean;
  hover?: boolean;
  borderless?: boolean;
  dense?: boolean;
}

interface FilterConfig {
  column: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'between' | 'in';
  value: any;
  value2?: any;
}

export function Table({
  columns,
  rows,
  title = 'Data Table',
  description,
  loading = false,
  searchable = true,
  filterable = true,
  sortable = true,
  selectable = true,
  expandable = false,
  exportable = true,
  importable = false,
  pagination = true,
  pageSize = 10,
  pageSizeOptions = [5, 10, 25, 50],
  actions = [],
  batchActions = [],
  onRowClick,
  onSelectionChange,
  onSortChange,
  onFilterChange,
  onPageChange,
  defaultSort,
  defaultFilters,
  showStats = true,
  showAnalytics = false,
  analytics,
  showColumnVisibility = true,
  showDensity = true,
  density = 'standard',
  showRefresh = true,
  onRefresh,
  showFullscreen = false,
  customStyles,
  emptyState = {
    title: 'No data available',
    description: 'There are no records to display at the moment.',
    icon: <Database size={48} />
  },
  errorState = {
    title: 'Error loading data',
    description: 'Something went wrong while loading the data.',
    icon: <XCircle size={48} />
  },
  rowHeight = 52,
  maxHeight = 600,
  virtualized = false,
  stickyHeader = true,
  striped = true,
  hover = true,
  borderless = false,
  dense = false
}: TableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [order, setOrder] = useState<'asc' | 'desc'>(defaultSort?.direction || 'asc');
  const [orderBy, setOrderBy] = useState(defaultSort?.column || '');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, FilterConfig>>(defaultFilters || {});
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(
    columns.reduce((acc, col) => ({ ...acc, [col.id]: true }), {})
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [currentDensity, setCurrentDensity] = useState(density);

  const getDensityStyles = () => {
    switch (currentDensity) {
      case 'compact':
        return { padding: '8px', fontSize: '0.8rem' };
      case 'comfortable':
        return { padding: '16px', fontSize: '1rem' };
      default:
        return { padding: '12px', fontSize: '0.9rem' };
    }
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    const newOrder = isAsc ? 'desc' : 'asc';
    setOrder(newOrder);
    setOrderBy(property);
    if (onSortChange) {
      onSortChange(property, newOrder);
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredRows.map((row) => row.id);
      setSelected(newSelected);
      if (onSelectionChange) {
        onSelectionChange(filteredRows);
      }
      return;
    }
    setSelected([]);
    if (onSelectionChange) {
      onSelectionChange([]);
    }
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    if (onSelectionChange) {
      const selectedRows = filteredRows.filter(row => newSelected.includes(row.id));
      onSelectionChange(selectedRows);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    if (onPageChange) {
      onPageChange(newPage, rowsPerPage);
    }
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    if (onPageChange) {
      onPageChange(0, newRowsPerPage);
    }
  };

  const handleFilterChange = (columnId: string, filter: FilterConfig) => {
    const newFilters = { ...filters, [columnId]: filter };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleExport = () => {
    const dataToExport = filteredRows.map(row => {
      const exportRow: any = {};
      columns.forEach(col => {
        if (columnVisibility[col.id]) {
          exportRow[col.label] = row[col.id];
        }
      });
      return exportRow;
    });

    const csvContent = [
      Object.keys(dataToExport[0] || {}).join(','),
      ...dataToExport.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = e.target?.result as string;
        // Parse CSV and handle import logic
        console.log('CSV content:', csv);
      };
      reader.readAsText(file);
    }
  };

  const toggleRowExpansion = (rowId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(rowId)) {
      newExpanded.delete(rowId);
    } else {
      newExpanded.add(rowId);
    }
    setExpandedRows(newExpanded);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const filteredRows = useMemo(() => {
    let filtered = rows.filter(row => {
      // Search filter
      if (searchQuery) {
        const searchableText = columns
          .filter(col => col.type === 'text' || col.type === undefined)
          .map(col => String(row[col.id] || ''))
          .join(' ')
          .toLowerCase();
        
        if (!searchableText.includes(searchQuery.toLowerCase())) {
          return false;
        }
      }

      // Column filters
      for (const [columnId, filter] of Object.entries(filters)) {
        const value = row[columnId];
        switch (filter.operator) {
          case 'equals':
            if (value !== filter.value) return false;
            break;
          case 'contains':
            if (!String(value).toLowerCase().includes(filter.value.toLowerCase())) return false;
            break;
          case 'greaterThan':
            if (Number(value) <= Number(filter.value)) return false;
            break;
          case 'lessThan':
            if (Number(value) >= Number(filter.value)) return false;
            break;
          // Add more filter operators as needed
        }
      }

      return true;
    });

    return filtered;
  }, [rows, searchQuery, filters, columns]);

  const sortedRows = useMemo(() => {
    if (!orderBy) return filteredRows;

    return [...filteredRows].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [filteredRows, order, orderBy]);

  const paginatedRows = useMemo(() => {
    if (!pagination) return sortedRows;
    return sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [sortedRows, page, rowsPerPage, pagination]);

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      active: '#43e97b',
      inactive: '#f44336',
      pending: '#ffa726',
      completed: '#4facfe',
      approved: '#43e97b',
      rejected: '#f44336',
      draft: '#666',
      published: '#4facfe'
    };
    return statusColors[status.toLowerCase()] || '#666';
  };

  const getFileIcon = (type: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      pdf: <FileText size={16} />,
      doc: <FileText size={16} />,
      docx: <FileText size={16} />,
      jpg: <ImageIcon size={16} />,
      png: <ImageIcon size={16} />,
      mp4: <Video size={16} />,
      mp3: <Music size={16} />,
      zip: <Archive size={16} />,
      js: <Code size={16} />,
      json: <Code size={16} />
    };
    return iconMap[type.toLowerCase()] || <FileText size={16} />;
  };

  const renderCell = (row: any, column: Column) => {
    const value = row[column.id];
    
    if (column.renderCell) {
      return column.renderCell(row, column);
    }

    switch (column.type) {
      case 'badge':
        return (
          <Chip
            label={value}
            size="small"
            sx={{
              background: getStatusColor(value),
              color: 'white',
              fontWeight: 600,
              fontSize: '0.7rem'
            }}
          />
        );
      
      case 'avatar':
        return (
          <Avatar
            src={value}
            alt={row.name || 'Avatar'}
            sx={{ width: 32, height: 32 }}
          />
        );
      
      case 'progress':
        return (
          <Box sx={{ width: '100%' }}>
            <LinearProgress
              variant="determinate"
              value={value}
              sx={{
                height: 6,
                borderRadius: 3,
                background: alpha('#666', 0.1),
                '& .MuiLinearProgress-bar': {
                  background: getColorGradient('primary'),
                  borderRadius: 3
                }
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
              {value}%
            </Typography>
          </Box>
        );
      
      case 'date':
        return new Date(value).toLocaleDateString();
      
      case 'boolean':
        return value ? <CheckCircle size={16} color="#43e97b" /> : <XCircle size={16} color="#f44336" />;
      
      case 'actions':
        return (
          <Stack direction="row" spacing={0.5}>
            {actions.map((action, index) => (
              (!action.visible || action.visible(row)) && (
                <Tooltip key={index} title={action.label}>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      action.onClick(row);
                    }}
                    disabled={action.disabled ? action.disabled(row) : false}
                    sx={{
                      color: action.color === 'error' ? '#f44336' : '#666',
                      '&:hover': {
                        background: alpha(action.color === 'error' ? '#f44336' : '#666', 0.1)
                      }
                    }}
                  >
                    {action.icon}
                  </IconButton>
                </Tooltip>
              )
            ))}
          </Stack>
        );
      
      default:
        return column.format ? column.format(value) : value;
    }
  };

  const getColorGradient = (color: string) => {
    switch (color) {
      case 'primary':
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      case 'secondary':
        return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
      case 'success':
        return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
      default:
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  };

  return (
    <Box>
      {/* Enhanced Header */}
      <Card
        elevation={customStyles?.elevation || 0}
        sx={{
          mb: 3,
          borderRadius: customStyles?.borderRadius || 4,
          background: 'white',
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, background: getColorGradient('primary'), backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {title}
              </Typography>
              {description && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {description}
                </Typography>
              )}
            </Box>
            
            <Stack direction="row" spacing={1}>
              {showRefresh && onRefresh && (
                <IconButton
                  onClick={onRefresh}
                  sx={{
                    background: alpha('#667eea', 0.1),
                    '&:hover': { background: alpha('#667eea', 0.2) }
                  }}
                >
                  <Activity size={18} />
                </IconButton>
              )}
              
              {showFullscreen && (
                <IconButton
                  onClick={() => setFullscreen(!fullscreen)}
                  sx={{
                    background: alpha('#667eea', 0.1),
                    '&:hover': { background: alpha('#667eea', 0.2) }
                  }}
                >
                  {fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </IconButton>
              )}
              
              {importable && (
                <IconButton
                  component="label"
                  sx={{
                    background: alpha('#43e97b', 0.1),
                    '&:hover': { background: alpha('#43e97b', 0.2) }
                  }}
                >
                  <Upload size={18} />
                  <input
                    type="file"
                    hidden
                    accept=".csv,.xlsx"
                    onChange={handleImport}
                  />
                </IconButton>
              )}
              
              {exportable && (
                <IconButton
                  onClick={handleExport}
                  sx={{
                    background: alpha('#4facfe', 0.1),
                    '&:hover': { background: alpha('#4facfe', 0.2) }
                  }}
                >
                  <Download size={18} />
                </IconButton>
              )}
              
              <IconButton
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                  background: alpha('#666', 0.1),
                  '&:hover': { background: alpha('#666', 0.2) }
                }}
              >
                <Settings size={18} />
              </IconButton>
            </Stack>
          </Stack>

          {/* Enhanced Search and Filters */}
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            {searchable && (
              <TextField
                placeholder="Search records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={18} />
                    </InputAdornment>
                  )
                }}
                size="small"
                sx={{
                  flexGrow: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    background: '#f8fafc'
                  }
                }}
              />
            )}
            
            {filterable && (
              <IconButton
                sx={{
                  background: alpha('#667eea', 0.1),
                  '&:hover': { background: alpha('#667eea', 0.2) }
                }}
              >
                <Filter size={18} />
              </IconButton>
            )}
          </Stack>

          {/* Stats */}
          {showStats && analytics && (
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <Card elevation={0} sx={{ background: alpha('#667eea', 0.05), borderRadius: 3 }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="caption" color="text.secondary">Total Records</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{analytics.totalRows}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card elevation={0} sx={{ background: alpha('#43e97b', 0.05), borderRadius: 3 }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="caption" color="text.secondary">Filtered</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{analytics.filteredRows}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card elevation={0} sx={{ background: alpha('#f093fb', 0.05), borderRadius: 3 }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="caption" color="text.secondary">Selected</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>{analytics.selectedRows}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card elevation={0} sx={{ background: alpha('#4facfe', 0.05), borderRadius: 3 }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="caption" color="text.secondary">Page {page + 1}</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      {Math.min((page + 1) * rowsPerPage, sortedRows.length)} / {sortedRows.length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Table Container */}
      <TableContainer
        component={Paper}
        elevation={customStyles?.elevation || 0}
        sx={{
          borderRadius: customStyles?.borderRadius || 4,
          background: 'white',
          border: '1px solid',
          borderColor: 'divider',
          maxHeight: maxHeight,
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: 6,
            height: 6
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0,0,0,0.05)',
            borderRadius: 3
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0,0,0,0.2)',
            borderRadius: 3
          }
        }}
      >
        <MuiTable stickyHeader={stickyHeader} size={dense ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell padding="checkbox" sx={{ background: customStyles?.headerColor || '#f8fafc' }}>
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < filteredRows.length}
                    checked={filteredRows.length > 0 && selected.length === filteredRows.length}
                    onChange={handleSelectAllClick}
                    inputProps={{ 'aria-label': 'select all desserts' }}
                  />
                </TableCell>
              )}
              
              {expandable && (
                <TableCell padding="checkbox" sx={{ background: customStyles?.headerColor || '#f8fafc' }} />
              )}
              
              {columns.filter(col => columnVisibility[col.id]).map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{ minWidth: column.minWidth, background: customStyles?.headerColor || '#f8fafc' }}
                  sx={{
                    fontWeight: 700,
                    color: '#1a1a1a',
                    borderBottom: '2px solid',
                    borderColor: 'divider'
                  }}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                      sx={{
                        '& .MuiTableSortLabel-icon': {
                          color: orderBy === column.id ? '#667eea' : '#666'
                        }
                      }}
                    >
                      {column.renderHeader ? column.renderHeader(column) : column.label}
                    </TableSortLabel>
                  ) : (
                    column.renderHeader ? column.renderHeader(column) : column.label
                  )}
                </TableCell>
              ))}
              
              {actions.length > 0 && (
                <TableCell align="center" sx={{ background: customStyles?.headerColor || '#f8fafc' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Actions</Typography>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0) + (actions.length > 0 ? 1 : 0)}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
                    <CircularProgress sx={{ color: '#667eea' }} />
                  </Box>
                </TableCell>
              </TableRow>
            ) : paginatedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0) + (actions.length > 0 ? 1 : 0)}>
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    {emptyState.icon && (
                      <Box sx={{ color: '#666', mb: 2 }}>
                        {emptyState.icon}
                      </Box>
                    )}
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      {emptyState.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {emptyState.description}
                    </Typography>
                    {emptyState.action && (
                      <Button
                        variant="contained"
                        onClick={emptyState.action.onClick}
                        startIcon={<Plus size={18} />}
                        sx={{
                          borderRadius: 3,
                          fontWeight: 600,
                          background: getColorGradient('primary')
                        }}
                      >
                        {emptyState.action.label}
                      </Button>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              paginatedRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <React.Fragment key={row.id}>
                    <TableRow
                      hover={hover}
                      onClick={(event) => onRowClick && onRowClick(row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        background: striped && index % 2 === 0 ? alpha('#f8fafc', 0.5) : 'white',
                        cursor: onRowClick ? 'pointer' : 'default',
                        height: rowHeight,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          background: hover ? alpha('#667eea', 0.05) : undefined
                        }
                      }}
                    >
                      {selectable && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            onClick={(event) => event.stopPropagation()}
                            onChange={(event) => handleClick(event, row.id)}
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                      )}
                      
                      {expandable && (
                        <TableCell padding="checkbox">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleRowExpansion(row.id);
                            }}
                            sx={{
                              transform: expandedRows.has(row.id) ? 'rotate(90deg)' : 'rotate(0deg)',
                              transition: 'transform 0.2s ease'
                            }}
                          >
                            <MoreVertical size={16} />
                          </IconButton>
                        </TableCell>
                      )}
                      
                      {columns.filter(col => columnVisibility[col.id]).map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align || 'left'}
                          sx={getDensityStyles()}
                        >
                          {renderCell(row, column)}
                        </TableCell>
                      ))}
                      
                      {actions.length > 0 && (
                        <TableCell align="center" sx={getDensityStyles()}>
                          {renderCell(row, { id: 'actions', label: 'Actions', type: 'actions' })}
                        </TableCell>
                      )}
                    </TableRow>
                    
                    {expandable && expandedRows.has(row.id) && (
                      <TableRow>
                        <TableCell colSpan={columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0) + (actions.length > 0 ? 1 : 0)}>
                          <Collapse in={expandedRows.has(row.id)} timeout="auto" unmountOnExit>
                            <Box sx={{ py: 2 }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                Additional Details
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Expanded content for row {row.id}
                              </Typography>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>

      {/* Enhanced Pagination */}
      {pagination && (
        <Box sx={{ mt: 3 }}>
          <TablePagination
            rowsPerPageOptions={pageSizeOptions}
            component="div"
            count={sortedRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              borderRadius: 4,
              background: 'white',
              border: '1px solid',
              borderColor: 'divider',
              '& .MuiTablePagination-toolbar': {
                px: 3
              }
            }}
          />
        </Box>
      )}

      {/* Settings Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
          }
        }}
      >
        {showColumnVisibility && (
          <MenuItem onClick={() => setAnchorEl(null)}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>Column Visibility</Typography>
          </MenuItem>
        )}
        
        {showDensity && (
          <MenuItem onClick={() => setAnchorEl(null)}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>Table Density</Typography>
          </MenuItem>
        )}
        
        <MenuItem onClick={() => setAnchorEl(null)}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>Export Settings</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default Table;
