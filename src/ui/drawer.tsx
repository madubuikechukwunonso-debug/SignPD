import React, { useState, useEffect } from 'react';
import {
  Drawer as MuiDrawer,
  Box,
  Typography,
  IconButton,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
  Badge,
  alpha,
  Paper,
  Button,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  X,
  Search,
  Home,
  Settings,
  User,
  FileText,
  Users,
  BarChart3,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Menu as MenuIcon,
  Plus,
  Filter,
  Download,
  Upload,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Shield,
  Database,
  Activity,
  MessageCircle,
  Video,
  Phone
} from 'lucide-react';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  variant?: 'permanent' | 'persistent' | 'temporary';
  width?: number;
  title?: string;
  subtitle?: string;
  items?: DrawerItem[];
  headerActions?: React.ReactNode;
  footerContent?: React.ReactNode;
  showSearch?: boolean;
  showFilters?: boolean;
  collapsible?: boolean;
  className?: string;
  sx?: any;
}

interface DrawerItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  badge?: number;
  chip?: string;
  children?: DrawerItem[];
  divider?: boolean;
  section?: string;
  featured?: boolean;
  new?: boolean;
}

interface DrawerSectionProps {
  title?: string;
  items: DrawerItem[];
  onItemClick: (item: DrawerItem) => void;
  expandedItems: string[];
  onToggleExpand: (itemId: string) => void;
  searchQuery: string;
  showBadges: boolean;
  dense?: boolean;
}

const DrawerSection: React.FC<DrawerSectionProps> = ({
  title,
  items,
  onItemClick,
  expandedItems,
  onToggleExpand,
  searchQuery,
  showBadges,
  dense = false
}) => {
  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.section?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredItems.length === 0) return null;

  return (
    <Box sx={{ mb: 2 }}>
      {title && (
        <Typography
          variant="caption"
          sx={{
            px: 2,
            py: 1,
            fontWeight: 700,
            color: 'text.secondary',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          {title}
        </Typography>
      )}
      
      <List dense={dense}>
        {filteredItems.map((item, index) => (
          <React.Fragment key={item.id}>
            {item.divider && <Divider sx={{ my: 1 }} />}
            
            <ListItem
              disablePadding
              sx={{
                mb: 0.5,
                '&:hover': {
                  backgroundColor: 'action.hover',
                  borderRadius: 1
                }
              }}
            >
              <ListItemButton
                onClick={() => {
                  if (item.children && item.children.length > 0) {
                    onToggleExpand(item.id);
                  } else {
                    item.onClick?.();
                    onItemClick(item);
                  }
                }}
                disabled={item.disabled}
                sx={{
                  borderRadius: 1,
                  minHeight: dense ? 32 : 40,
                  '&.Mui-disabled': {
                    opacity: 0.6
                  }
                }}
              >
                {item.icon && (
                  <ListItemIcon
                    sx={{
                      minWidth: dense ? 32 : 40,
                      color: item.featured ? 'primary.main' : 'text.secondary'
                    }}
                  >
                    {item.featured ? (
                      <Badge
                        overlap="circular"
                        badgeContent={
                          <Star size={8} color="#ffc107" fill="#ffc107" />
                        }
                      >
                        {item.icon}
                      </Badge>
                    ) : (
                      item.icon
                    )}
                  </ListItemIcon>
                )}

                <ListItemText
                  primary={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: item.featured ? 'primary.main' : 'text.primary'
                        }}
                      >
                        {item.label}
                      </Typography>
                      
                      {item.new && (
                        <Chip
                          label="NEW"
                          size="small"
                          sx={{
                            height: 16,
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                            color: 'white'
                          }}
                        />
                      )}
                      
                      {item.chip && (
                        <Chip
                          label={item.chip}
                          size="small"
                          variant="outlined"
                          sx={{
                            height: 16,
                            fontSize: '0.65rem',
                            fontWeight: 600
                          }}
                        />
                      )}
                    </Stack>
                  }
                />

                <Stack direction="row" spacing={1} alignItems="center">
                  {showBadges && item.badge !== undefined && item.badge > 0 && (
                    <Badge
                      badgeContent={item.badge}
                      color="error"
                      max={99}
                      sx={{
                        '& .MuiBadge-badge': {
                          fontSize: '0.65rem',
                          fontWeight: 700
                        }
                      }}
                    />
                  )}
                  
                  {item.children && item.children.length > 0 && (
                    <ChevronRight
                      size={16}
                      style={{
                        transform: expandedItems.includes(item.id) ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                      }}
                    />
                  )}
                </Stack>
              </ListItemButton>
            </ListItem>

            {/* Expanded children */}
            {item.children && item.children.length > 0 && expandedItems.includes(item.id) && (
              <Box sx={{ pl: 4, backgroundColor: alpha('#000', 0.02) }}>
                <DrawerSection
                  items={item.children}
                  onItemClick={onItemClick}
                  expandedItems={expandedItems}
                  onToggleExpand={onToggleExpand}
                  searchQuery={searchQuery}
                  showBadges={showBadges}
                  dense={true}
                />
              </Box>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  anchor = 'left',
  variant = 'temporary',
  width = 320,
  title,
  subtitle,
  items = [],
  headerActions,
  footerContent,
  showSearch = false,
  showFilters = false,
  collapsible = false,
  className,
  sx = {}
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [showFiltersState, setShowFiltersState] = useState(false);

  const handleItemClick = (item: DrawerItem) => {
    if (item.href) {
      window.location.href = item.href;
    }
    if (variant === 'temporary') {
      onClose();
    }
  };

  const handleToggleExpand = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const groupedItems = items.reduce((acc, item) => {
    const section = item.section || 'General';
    if (!acc[section]) acc[section] = [];
    acc[section].push(item);
    return acc;
  }, {} as Record<string, DrawerItem[]>);

  const drawerContent = (
    <Box
      sx={{
        width: width,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)'
      }}
      className={className}
    >
      {/* Header */}
      <Box sx={{ 
        p: 3, 
        borderBottom: '1px solid',
        borderColor: 'divider',
        background: 'linear-gradient(135deg, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 254, 0.1) 100%)'
      }}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Box>
            {title && (
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          
          <Stack direction="row" spacing={1}>
            {headerActions}
            <IconButton onClick={onClose} size="small">
              <X size={18} />
            </IconButton>
          </Stack>
        </Stack>

        {showSearch && (
          <TextField
            fullWidth
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} />
                </InputAdornment>
              ),
              endAdornment: showFilters && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setShowFiltersState(!showFiltersState)}>
                    <Filter size={16} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            size="small"
            sx={{ mt: 2 }}
          />
        )}

        {showFiltersState && (
          <Card elevation={0} sx={{ mt: 2, p: 2 }}>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>
              Quick Filters
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label="Online" size="small" />
              <Chip label="Active" size="small" />
              <Chip label="New" size="small" />
            </Stack>
          </Card>
        )}
      </Box>

      {/* Content */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {Object.entries(groupedItems).map(([section, sectionItems]) => (
          <DrawerSection
            key={section}
            title={section !== 'General' ? section : undefined}
            items={sectionItems}
            onItemClick={handleItemClick}
            expandedItems={expandedItems}
            onToggleExpand={handleToggleExpand}
            searchQuery={searchQuery}
            showBadges={true}
          />
        ))}
        
        {items.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Database size={48} color="#ccc" style={{ marginBottom: 16 }} />
            <Typography variant="body2" color="text.secondary">
              No items available
            </Typography>
          </Box>
        )}
      </Box>

      {/* Footer */}
      {footerContent && (
        <Box sx={{ 
          p: 3, 
          borderTop: '1px solid',
          borderColor: 'divider',
          background: 'linear-gradient(135deg, rgba(67, 233, 123, 0.1) 0%, rgba(56, 249, 215, 0.1) 100%)'
        }}>
          {footerContent}
        </Box>
      )}
    </Box>
  );

  return (
    <MuiDrawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      variant={variant}
      sx={{
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
          border: 'none',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          ...sx
        }
      }}
    >
      {drawerContent}
    </MuiDrawer>
  );
};

// Predefined drawer configurations for common
