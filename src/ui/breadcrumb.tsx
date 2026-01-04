import React, { useState, useCallback, useRef } from 'react';
import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
  Link,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Chip,
  Collapse,
  Fade,
  alpha,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ChevronRight,
  ChevronLeft,
  Home,
  MoreHorizontal,
  Folder,
  File,
  Link2,
  ExternalLink,
  Copy,
  Share2,
  Download,
  Upload,
  Settings,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  RefreshCw,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Calendar,
  Clock,
  User,
  Users,
  FolderOpen,
  Document,
  Image,
  Video,
  Music,
  Archive,
  Code,
  Database,
  Globe,
  MapPin
} from 'lucide-react';

// Types
type BreadcrumbVariant = 'default' | 'back-button' | 'dropdown' | 'card' | 'minimal';
type BreadcrumbSize = 'sm' | 'md' | 'lg';
type BreadcrumbSeparator = 'chevron' | 'slash' | 'arrow' | 'dot' | 'custom';
type BreadcrumbIconPosition = 'left' | 'right' | 'none';

interface BreadcrumbItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  description?: string;
  tooltip?: string;
  actions?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
  }>;
  metadata?: {
    type?: 'folder' | 'file' | 'link' | 'page';
    size?: string;
    modified?: string;
    author?: string;
    count?: number;
  };
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: BreadcrumbVariant;
  size?: BreadcrumbSize;
  separator?: BreadcrumbSeparator;
  separatorComponent?: React.ReactNode;
  maxItems?: number;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
  showHome?: boolean;
  showCurrent?: boolean;
  showIcons?: boolean;
  showDescriptions?: boolean;
  showActions?: boolean;
  clickable?: boolean;
  collapsible?: boolean;
  expandable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
  onItemAction?: (item: BreadcrumbItem, actionIndex: number) => void;
  renderItem?: (item: BreadcrumbItem, isLast: boolean) => React.ReactNode;
  renderSeparator?: (index: number) => React.ReactNode;
  homeIcon?: React.ReactNode;
  homeLabel?: string;
  homeHref?: string;
  truncateLength?: number;
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
  iconPosition?: BreadcrumbIconPosition;
  animate?: boolean;
  transitionDuration?: number;
  elevation?: number;
  backgroundColor?: string;
  border?: boolean;
  borderRadius?: number;
  darkMode?: boolean;
  compact?: boolean;
}

interface BreadcrumbDropdownProps {
  items: BreadcrumbItem[];
  onItemClick: (item: BreadcrumbItem) => void;
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  size?: BreadcrumbSize;
  maxHeight?: number;
}

interface BreadcrumbCardProps {
  item: BreadcrumbItem;
  isLast: boolean;
  size?: BreadcrumbSize;
  onClick?: () => void;
  onActionClick?: (actionIndex: number) => void;
  showDescription?: boolean;
  showActions?: boolean;
  compact?: boolean;
}

interface BreadcrumbHistoryProps {
  history: BreadcrumbItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  maxHistory?: number;
  size?: BreadcrumbSize;
}

interface BreadcrumbSearchProps {
  items: BreadcrumbItem[];
  onItemSelect: (item: BreadcrumbItem) => void;
  placeholder?: string;
  size?: BreadcrumbSize;
  maxResults?: number;
}

// Utility functions
const getItemIcon = (item: BreadcrumbItem, defaultIcon?: React.ReactNode) => {
  if (item.icon) return item.icon;
  
  if (item.metadata?.type) {
    const typeIcons = {
      folder: <Folder size={16} />,
      file: <File size={16} />,
      link: <Link2 size={16} />,
      page: <Document size={16} />
    };
    return typeIcons[item.metadata.type] || defaultIcon;
  }
  
  return defaultIcon;
};

const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
};

const getContrastColor = (backgroundColor: string): string => {
  const rgb = backgroundColor.match(/\d+/g);
  if (!rgb) return '#000000';
  
  const [r, g, b] = rgb.map(Number);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#ffffff';
};

// Breadcrumb Dropdown Component
function BreadcrumbDropdown({
  items,
  onItemClick,
  anchorEl,
  open,
  onClose,
  size = 'md',
  maxHeight = 300
}: BreadcrumbDropdownProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleItemClick = (item: BreadcrumbItem) => {
    onItemClick(item);
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          maxHeight,
          overflowY: 'auto',
          borderRadius: 2,
          minWidth: 200,
          ...(isMobile && {
            maxWidth: 'calc(100vw - 32px)',
            maxHeight: 'calc(100vh - 64px)'
          })
        }
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {items.map((item) => (
        <MenuItem
          key={item.id}
          onClick={() => handleItemClick(item)}
          disabled={item.disabled}
          sx={{
            py: size === 'sm' ? 1 : size === 'lg' ? 1.5 : 1.25,
            px: 2,
            borderRadius: 1,
            mx: 0.5,
            mb: 0.5,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.08)
            }
          }}
        >
          {item.icon && (
            <Box sx={{ mr: 1.5, color: 'text.secondary' }}>
              {item.icon}
            </Box>
          )}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: item.active ? 600 : 400,
                color: item.active ? 'primary.main' : 'text.primary'
              }}
            >
              {item.label}
            </Typography>
            {item.description && (
              <Typography variant="caption" color="text.secondary">
                {item.description}
              </Typography>
            )}
          </Box>
          {item.metadata && (
            <Box sx={{ ml: 1, color: 'text.secondary' }}>
              {item.metadata.count && (
                <Typography variant="caption">
                  ({item.metadata.count})
                </Typography>
              )}
            </Box>
          )}
        </MenuItem>
      ))}
    </Menu>
  );
}

// Breadcrumb Card Component
function BreadcrumbCard({
  item,
  isLast,
  size = 'md',
  onClick,
  onActionClick,
  showDescription = false,
  showActions = false,
  compact = false
}: BreadcrumbCardProps) {
  const theme = useTheme();
  const [actionsAnchorEl, setActionsAnchorEl] = useState<HTMLElement | null>(null);

  const handleActionClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setActionsAnchorEl(event.currentTarget);
  };

  const handleActionSelect = (actionIndex: number) => {
    onActionClick?.(actionIndex);
    setActionsAnchorEl(null);
  };

  const sizeStyles = {
    sm: { padding: '8px 12px', fontSize: '0.75rem' },
    md: { padding: '12px 16px', fontSize: '0.875rem' },
    lg: { padding: '16px 20px', fontSize: '1rem' }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: sizeStyles[size].padding,
        backgroundColor: alpha(theme.palette.grey[100], 0.5),
        borderRadius: 2,
        border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: alpha(theme.palette.grey[200], 0.7),
          borderColor: alpha(theme.palette.divider, 0.8)
        },
        ...(isLast && {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          borderColor: alpha(theme.palette.primary.main, 0.3)
        })
      }}
      onClick={onClick}
    >
      {/* Icon */}
      {item.icon && (
        <Box sx={{ color: isLast ? 'primary.main' : 'text.secondary' }}>
          {item.icon}
        </Box>
      )}

      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: isLast ? 600 : 500,
            color: isLast ? 'primary.main' : 'text.primary',
            fontSize: sizeStyles[size].fontSize,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {item.label}
        </Typography>
        
        {showDescription && item.description && !compact && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: size === 'sm' ? '0.6875rem' : '0.75rem',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {item.description}
          </Typography>
        )}

        {item.metadata && !compact && (
          <Box sx={{ display: 'flex', gap: 1.5, mt: 0.5 }}>
            {item.metadata.type && (
              <Chip
                icon={getItemIcon(item)}
                label={item.metadata.type}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.625rem' }}
              />
            )}
            {item.metadata.modified && (
              <Typography variant="caption" color="text.secondary">
                Modified: {item.metadata.modified}
              </Typography>
            )}
            {item.metadata.author && (
              <Typography variant="caption" color="text.secondary">
                By: {item.metadata.author}
              </Typography>
            )}
          </Box>
        )}
      </Box>

      {/* Actions */}
      {showActions && item.actions && item.actions.length > 0 && (
        <>
          <IconButton
            size="small"
            onClick={handleActionClick}
            sx={{ ml: 'auto' }}
          >
            <MoreVertical size={16} />
          </IconButton>

          <Menu
            anchorEl={actionsAnchorEl}
            open={Boolean(actionsAnchorEl)}
            onClose={() => setActionsAnchorEl(null)}
            PaperProps={{
              sx: { borderRadius: 2 }
            }}
          >
            {item.actions.map((action, index) => (
              <MenuItem
                key={index}
                onClick={() => handleActionSelect(index)}
                disabled={action.disabled}
                sx={{ borderRadius: 1 }}
              >
                {action.icon && <Box sx={{ mr: 1 }}>{action.icon}</Box>}
                {action.label}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Box>
  );
}

// Breadcrumb History Component
function BreadcrumbHistory({
  history,
  currentIndex,
  onNavigate,
  maxHistory = 10,
  size = 'md'
}: BreadcrumbHistoryProps) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const recentHistory = history.slice(-maxHistory);
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < history.length - 1;

  const handleBackClick = () => {
    if (canGoBack) {
      onNavigate(currentIndex - 1);
    }
  };

  const handleForwardClick = () => {
    if (canGoForward) {
      onNavigate(currentIndex + 1);
    }
  };

  const handleHistoryClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleHistorySelect = (index: number) => {
    const actualIndex = history.length - maxHistory + index;
    onNavigate(actualIndex);
    setAnchorEl(null);
  };

  const sizeStyles = {
    sm: { iconSize: 16, padding: '4px 8px' },
    md: { iconSize: 20, padding: '6px 12px' },
    lg: { iconSize: 24, padding: '8px 16px' }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      {/* Back button */}
      <IconButton
        size="small"
        onClick={handleBackClick}
        disabled={!canGoBack}
        sx={{ p: sizeStyles[size].padding }}
      >
        <ArrowLeft size={sizeStyles[size].iconSize} />
      </IconButton>

      {/* Forward button */}
      <IconButton
        size="small"
        onClick={handleForwardClick}
        disabled={!canGoForward}
        sx={{ p: sizeStyles[size].padding }}
      >
        <ArrowRight size={sizeStyles[size].iconSize} />
      </IconButton>

      {/* History dropdown */}
      <IconButton
        size="small"
        onClick={handleHistoryClick}
        sx={{ p: sizeStyles[size].padding }}
      >
        <Clock size={sizeStyles[size].iconSize} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: { maxHeight: 300, overflowY: 'auto' }
        }}
      >
        {recentHistory.map((item, index) => (
          <MenuItem
            key={item.id}
            onClick={() => handleHistorySelect(index)}
            selected={history.length - maxHistory + index === currentIndex}
            sx={{ borderRadius: 1 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {getItemIcon(item)}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2">{item.label}</Typography>
                {item.description && (
                  <Typography variant="caption" color="text.secondary">
                    {item.description}
                  </Typography>
                )}
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

// Main Breadcrumb Component
export function Breadcrumb({
  items,
  variant = 'default',
  size = 'md',
  separator = 'chevron',
  separatorComponent,
  maxItems = 8,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
  showHome = true,
  showCurrent = true,
  showIcons = true,
  showDescriptions = false,
  showActions = false,
  clickable = true,
  collapsible = true,
  expandable = true,
  className,
  style,
  onItemClick,
  onItemAction,
  renderItem,
  renderSeparator,
  homeIcon = <Home size={18} />,
  homeLabel = 'Home',
  homeHref = '/',
  truncateLength = 30,
  tooltipPlacement = 'top',
  iconPosition = 'left',
  animate = true,
  transitionDuration = 300,
  elevation = 0,
  backgroundColor,
  border = false,
  borderRadius = 8,
  darkMode = false,
  compact = false
}: BreadcrumbProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [collapsed, setCollapsed] = useState(collapsible && items.length > maxItems);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [history, setHistory] = useState<BreadcrumbItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // Size configuration
  const sizeStyles = {
    sm: {
      fontSize: '0.75rem',
      iconSize: 16,
      padding: '6px 12px',
      separatorSize: 16,
      gap: 0.5
    },
    md: {
      fontSize: '0.875rem',
      iconSize: 18,
      padding: '8px 16px',
      separatorSize: 20,
      gap: 1
    },
    lg: {
      fontSize: '1rem',
      iconSize: 20,
      padding: '10px 20px',
      separatorSize: 24,
      gap: 1.5
    }
  };

  const currentSize = isMobile ? 'sm' : size;
  const styles = sizeStyles[currentSize];

  // Handle collapsed items
  const displayItems = React.useMemo(() => {
    if (!collapsed || items.length <= maxItems) return items;

    const startItems = items.slice(0, itemsBeforeCollapse);
    const endItems = items.slice(-itemsAfterCollapse);
    const collapsedItems = items.slice(itemsBeforeCollapse, -itemsAfterCollapse);

    return [
      ...startItems,
      { id: 'collapsed', label: '...', items: collapsedItems } as BreadcrumbItem,
      ...endItems
    ];
  }, [items, collapsed, maxItems, itemsBeforeCollapse, itemsAfterCollapse]);

  // Handle item click
  const handleItemClick = useCallback((item: BreadcrumbItem, index: number) => {
    if (item.disabled || item.id === 'collapsed') return;

    // Update history
    if (item.href) {
      const newHistory = history.slice(0, currentIndex + 1);
      newHistory.push(item);
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
    }

    onItemClick?.(item, index);
  }, [history, currentIndex, onItemClick]);

  // Handle collapsed item click
  const handleCollapsedClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    // Could show dropdown with collapsed items
  }, []);

  // Handle expansion toggle
  const toggleExpanded = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  // Get separator component
  const getSeparator = (index: number) => {
    if (renderSeparator) {
      return renderSeparator(index);
    }

    const separatorIcons = {
      chevron: <ChevronRight size={styles.separatorSize} />,
      slash: <Typography sx={{ opacity: 0.5 }}>/</Typography>,
      arrow: <ArrowRight size={styles.separatorSize} />,
      dot: <Circle size={8} fill="currentColor" />
    };

    return separatorComponent || separatorIcons[separator] || separatorIcons.chevron;
  };

  // Render individual breadcrumb item
  const renderBreadcrumbItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
    if (renderItem) {
      return renderItem(item, isLast);
    }

    const isDisabled = item.disabled || (!clickable && !isLast);
    const isActive = item.active || isLast;
    const hasHref = item.href && !isDisabled;

    // Handle collapsed item
    if (item.id === 'collapsed') {
      return (
        <Box
          key={item.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: styles.gap
          }}
        >
          <Tooltip title={`${items.length - maxItems} more items`} placement={tooltipPlacement}>
            <Chip
              label="..."
              size={currentSize === 'sm' ? 'small' : 'medium'}
              onClick={handleCollapsedClick}
              sx={{
                cursor: 'pointer',
                fontWeight: 600,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2)
                }
              }}
            />
          </Tooltip>
        </Box>
      );
    }

    // Default breadcrumb item
    const content = (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: styles.gap * 0.5,
          maxWidth: compact ? 120 : 200,
          overflow: 'hidden'
        }}
      >
        {/* Icon */}
        {showIcons && (iconPosition === 'left' || iconPosition === 'none') && (
          <Box sx={{ 
            color: isActive ? 'primary.main' : 'text.secondary',
            flexShrink: 0
          }}>
            {getItemIcon(item, iconPosition === 'none' ? null : undefined)}
          </Box>
        )}

        {/* Text content */}
        <Box sx={{ minWidth: 0 }}>
          <Typography
            component={hasHref ? Link : 'span'}
            href={hasHref ? item.href : undefined}
            onClick={() => handleItemClick(item, index)}
            sx={{
              fontSize: styles.fontSize,
              fontWeight: isActive ? 600 : 500,
              color: isActive ? 'primary.main' : 'text.primary',
              textDecoration: isDisabled ? 'line-through' : 'none',
              cursor: isDisabled ? 'not-allowed' : hasHref ? 'pointer' : 'default',
              opacity: isDisabled ? 0.6 : 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              '&:hover': hasHref && !isDisabled ? {
                textDecoration: 'underline',
                color: 'primary.dark'
              } : {},
              transition: 'all 0.2s ease'
            }}
          >
            {truncateLength ? truncateText(item.label, truncateLength) : item.label}
          </Typography>

          {showDescriptions && item.description && !compact && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                fontSize: currentSize === 'sm' ? '0.625rem' : '0.6875rem',
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {item.description}
            </Typography>
          )}
        </Box>

        {/* Icon right */}
        {showIcons && iconPosition === 'right' && (
          <Box sx={{ 
            color: isActive ? 'primary.main' : 'text.secondary',
            flexShrink: 0
          }}>
            {getItemIcon(item)}
          </Box>
        )}

        {/* Metadata */}
        {item.metadata && !compact && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
            {item.metadata.count && (
              <Chip
                label={item.metadata.count}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.625rem' }}
              />
            )}
          </Box>
        )}

        {/* Actions */}
        {showActions && item.actions && item.actions.length > 0 && (
          <Box sx={{ ml: 1 }}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                // Handle actions menu
              }}
              sx={{ fontSize: styles.iconSize }}
            >
              <MoreHorizontal size={styles.iconSize} />
            </IconButton>
          </Box>
        )}
      </Box>
    );

    // Wrap in tooltip if needed
    if (item.tooltip) {
      return (
        <Tooltip
          key={item.id}
          title={item.tooltip}
          placement={tooltipPlacement}
          arrow
        >
          {content}
        </Tooltip>
      );
    }

    return (
      <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: styles.gap }}>
        {content}
      </Box>
    );
  };

  // Home item
  const HomeItem = () => {
    if (!showHome) return null;

    const homeItem: BreadcrumbItem = {
      id: 'home',
      label: homeLabel,
      href: homeHref,
      icon: homeIcon
    };

    return renderBreadcrumbItem(homeItem, -1, false);
  };

  // Variant-specific rendering
  const renderVariant = () => {
    switch (variant) {
      case 'back-button':
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              size="small"
              onClick={() => {
                if (history.length > 1 && currentIndex > 0) {
                  onNavigate(currentIndex - 1);
                } else if (items.length > 1) {
                  handleItemClick(items[items.length - 2], items.length - 2);
                }
              }}
              disabled={history.length <= 1 && items.length <= 1}
            >
              <ArrowLeft size={styles.iconSize} />
            </IconButton>
            {items.length > 0 && renderBreadcrumbItem(items[items.length - 1], items.length - 1, true)}
          </Box>
        );

      case 'dropdown':
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {items.length > 0 && (
              <>
                <Chip
                  label={items[items.length - 1].label}
                  onClick={(e) => {
                    // Show dropdown with full path
                  }}
                  icon={items[items.length - 1].icon}
                  size={currentSize === 'sm' ? 'small' : 'medium'}
                />
                <IconButton size="small">
                  <ChevronRight size={styles.iconSize} />
                </IconButton>
              </>
            )}
          </Box>
        );

      case 'card':
        return items.map((item, index) => (
          <BreadcrumbCard
            key={item.id}
            item={item}
            isLast={index === items.length - 1}
            size={currentSize}
            onClick={() => handleItemClick(item, index)}
            onActionClick={onItemAction ? (actionIndex) => onItemAction(item, actionIndex) : undefined}
            showDescription={showDescriptions}
            showActions={showActions}
            compact={compact}
          />
        ));

      case 'minimal':
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {items.length > 1 && (
              <Tooltip title={items[items.length - 2].label} placement={tooltipPlacement}>
                <IconButton
                  size="small"
                  onClick={() => handleItemClick(items[items.length - 2], items.length - 2)}
                >
                  <ArrowLeft size={styles.iconSize} />
                </IconButton>
              </Tooltip>
            )}
            <Typography
              variant="body2"
              sx={{
                fontSize: styles.fontSize,
                fontWeight: 600,
                maxWidth: 150,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {items.length > 0 ? items[items.length - 1].label : ''}
            </Typography>
          </Box>
        );

      default: // default
        return (
          <MuiBreadcrumbs
            separator={getSeparator(0)}
            maxItems={maxItems}
            itemsBeforeCollapse={itemsBeforeCollapse}
            itemsAfterCollapse={itemsAfterCollapse}
            sx={{
              fontSize: styles.fontSize,
              color: 'text.secondary',
              '& .MuiBreadcrumbs-separator': {
                marginLeft: styles.gap * 0.5,
                marginRight: styles.gap * 0.5,
                color: 'text.secondary'
              }
            }}
          >
            {showHome && <HomeItem />}
            {displayItems.map((item, index) => {
              const isLast = index === displayItems.length - 1;
              return renderBreadcrumbItem(item, index, isLast);
            })}
          </MuiBreadcrumbs>
        );
    }
  };

  const backgroundStyles = backgroundColor ? {
    backgroundColor,
    color: getContrastColor(backgroundColor)
  } : {};

  const elevationStyles = elevation > 0 ? {
    boxShadow: theme.shadows[elevation]
  } : {};

  const borderStyles = border ? {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: borderRadius
  } : {};

  const darkModeStyles = darkMode ? {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white
  } : {};

  return (
    <Box
      ref={containerRef}
      className={className}
      style={style}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: compact ? '8px 12px' : styles.padding,
        backgroundColor: backgroundColor || (darkMode ? theme.palette.grey[100] : alpha(theme.palette.grey[50], 0.5)),
        borderRadius: borderRadius,
        ...elevationStyles,
        ...borderStyles,
        ...backgroundStyles,
        ...darkModeStyles,
        overflow: 'hidden',
        minWidth: 0
      }}
    >
      {renderVariant()}

      {/* Expand/Collapse button */}
      {collapsible && items.length > maxItems && variant === 'default' && (
        <IconButton
          size="small"
          onClick={toggleExpanded}
          sx={{ ml: 1 }}
        >
          {collapsed ? (
            <ChevronRight size={styles.iconSize} />
          ) : (
            <ChevronLeft size={styles.iconSize} />
          )}
        </IconButton>
      )}

      {/* History navigation */}
      {variant === 'default' && history.length > 1 && (
        <BreadcrumbHistory
          history={history}
          currentIndex={currentIndex}
          onNavigate={setCurrentIndex}
          size={currentSize}
        />
      )}
    </Box>
  );
}

// Breadcrumb with Search Component
export function BreadcrumbWithSearch({
  items,
  onItemSelect,
  placeholder = "Search...",
  size = 'md',
  maxResults = 10,
  ...breadcrumbProps
}: BreadcrumbSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<BreadcrumbItem[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = items
        .filter(item =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, maxResults);
      
      setFilteredItems(filtered);
      setShowResults(true);
    } else {
      setFilteredItems([]);
      setShowResults(false);
    }
  }, [searchQuery, items, maxResults]);

  const handleItemSelect = (item: BreadcrumbItem) => {
    setSearchQuery('');
    setShowResults(false);
    onItemSelect(item);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative' }}>
      <Breadcrumb
        items={items}
        size={size}
        {...breadcrumbProps}
      />
      
      <Box sx={{ position: 'relative', minWidth: 200 }}>
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          style={{
            width: '100%',
            padding: '8px 12px',
            border: `1px solid ${alpha(useTheme().palette.divider, 0.5)}`,
            borderRadius: 4,
            fontSize: size === 'sm' ? '0.75rem' : '0.875rem',
            backgroundColor: alpha(useTheme().palette.background.paper, 0.8)
          }}
        />
        
        {showResults && filteredItems.length > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              mt: 0.5,
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              boxShadow: 2,
              maxHeight: 300,
              overflowY: 'auto',
              zIndex: 1000
            }}
          >
            {filteredItems.map((item, index) => (
              <Box
                key={item.id}
                onClick={() => handleItemSelect(item)}
                sx={{
                  p: 1.5,
                  cursor: 'pointer',
                  borderBottom: index < filteredItems.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider',
                  '&:hover': {
                    backgroundColor: alpha(useTheme().palette.primary.main, 0.08)
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {item.icon && (
                    <Box sx={{ color: 'text.secondary' }}>
                      {item.icon}
                    </Box>
                  )}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {item.label}
                    </Typography>
                    {item.description && (
                      <Typography variant="caption" color="text.secondary">
                        {item.description}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

// Breadcrumb with Dropdown Component
export function BreadcrumbDropdown({
  items,
  onItemSelect,
  placeholder = "Select location...",
  size = 'md',
  maxHeight = 300,
  triggerIcon = <FolderOpen size={18} />,
  ...breadcrumbProps
}: BreadcrumbSearchProps & { triggerIcon?: React.ReactNode }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<BreadcrumbItem | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemSelect = (item: BreadcrumbItem) => {
    setSelectedItem(item);
    onItemSelect(item);
    handleClose();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton size="small" onClick={handleClick}>
        {triggerIcon}
      </IconButton>
      
      <Breadcrumb
        items={selectedItem ? [selectedItem] : []}
        size={size}
        variant="minimal"
        {...breadcrumbProps}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            maxHeight,
            overflowY: 'auto',
            borderRadius: 2,
            minWidth: 250
          }
        }}
      >
        <MenuItem disabled sx={{ opacity: 0.7 }}>
          <Typography variant="caption" color="text.secondary">
            {placeholder}
          </Typography>
        </MenuItem>
        
        <Divider />
        
        {items.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => handleItemSelect(item)}
            sx={{ borderRadius: 1, mx: 0.5, mb: 0.5 }}
          >
            {item.icon && (
              <Box sx={{ mr: 1.5, color: 'text.secondary' }}>
                {item.icon}
              </Box>
            )}
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2">{item.label}</Typography>
              {item.description && (
                <Typography variant="caption" color="text.secondary">
                  {item.description}
                </Typography>
              )}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

// File Path Breadcrumb Component
interface FilePathBreadcrumbProps extends Omit<BreadcrumbProps, 'items'> {
  path: string;
  onPathChange: (path: string) => void;
  rootLabel?: string;
  showRoot?: boolean;
  separator?: '/' | '\\';
}

export function FilePathBreadcrumb({
  path,
  onPathChange,
  rootLabel = 'Root',
  showRoot = true,
  separator = '/',
  ...breadcrumbProps
}: FilePathBreadcrumbProps) {
  const pathItems = React.useMemo(() => {
    const parts = path.split(separator).filter(Boolean);
    const items: BreadcrumbItem[] = [];
    
    let currentPath = '';
    
    if (showRoot) {
      items.push({
        id: 'root',
        label: rootLabel,
        href: separator,
        icon: <Folder size={16} />
      });
      currentPath = separator;
    }

    parts.forEach((part, index) => {
      currentPath += (index === 0 && !showRoot ? '' : separator) + part;
      items.push({
        id: `part-${index}`,
        label: part,
        href: currentPath,
        icon: <Folder size={16} />,
        metadata: { type: 'folder' }
      });
    });

    return items;
  }, [path, separator, rootLabel, showRoot]);

  const handleItemClick = (item: BreadcrumbItem) => {
    if (item.href) {
      onPathChange(item.href);
    }
  };

  return (
    <Breadcrumb
      items={pathItems}
      separator="chevron"
      showIcons={true}
      onItemClick={handleItemClick}
      {...breadcrumbProps}
    />
  );
}

// URL Breadcrumb Component
interface URLBreadcrumbProps extends Omit<BreadcrumbProps, 'items'> {
  url: string;
  onURLChange?: (url: string) => void;
  showProtocol?: boolean;
  showQuery?: boolean;
  showHash?: boolean;
}

export function URLBreadcrumb({
  url,
  onURLChange,
  showProtocol = false,
  showQuery = false,
  showHash = false,
  ...breadcrumbProps
}: URLBreadcrumbProps) {
  const [protocol, hostname, pathname, search, hash] = React.useMemo(() => {
    try {
      const urlObj = new URL(url);
      return [
        urlObj.protocol,
        urlObj.hostname,
        urlObj.pathname,
        urlObj.search,
        urlObj.hash
      ];
    } catch {
      return ['', '', url, '', ''];
    }
  }, [url]);

  const urlItems = React.useMemo(() => {
    const items: BreadcrumbItem[] = [];
    
    // Protocol
    if (showProtocol && protocol) {
      items.push({
        id: 'protocol',
        label: protocol,
        href: protocol,
        icon: <Globe size={16} />
      });
    }

    // Hostname
    if (hostname) {
      items.push({
        id: 'hostname',
        label: hostname,
        href: `${protocol}//${hostname}`,
        icon: <Globe size={16} />
      });
    }

    // Path segments
    const pathSegments = pathname.split('/').filter(Boolean);
    let currentPath = `${protocol}//${hostname}`;
    
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      items.push({
        id: `path-${index}`,
        label: segment || '/',
        href: currentPath,
        icon: <Document size={16} />,
        metadata: { type: 'page' }
      });
    });

    // Query parameters
    if (showQuery && search) {
      items.push({
        id: 'query',
        label: search,
        href: currentPath + search,
        icon: <Settings size={16} />,
        metadata: { type: 'query' }
      });
    }

    // Hash
    if (showHash && hash) {
      items.push({
        id: 'hash',
        label: hash,
        href: currentPath + search + hash,
        icon: <Link2 size={16} />,
        metadata: { type: 'hash' }
      });
    }

    return items;
  }, [protocol, hostname, pathname, search, hash, showProtocol, showQuery, showHash]);

  const handleItemClick = (item: BreadcrumbItem) => {
    if (item.href && onURLChange) {
      onURLChange(item.href);
    }
  };

  return (
    <Breadcrumb
      items={urlItems}
      separator="chevron"
      showIcons={true}
      onItemClick={handleItemClick}
      {...breadcrumbProps}
    />
  );
}

/* ============================
 * Export Default
 * ============================
 */

export default Breadcrumb;
