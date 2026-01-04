import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Chip,
  Badge,
  Avatar,
  AvatarGroup,
  LinearProgress,
  CircularProgress,
  Collapse,
  Fade,
  Zoom,
  Slide,
  alpha,
  useTheme,
  useMediaQuery,
  Divider,
  Stack,
  Button,
  Tooltip,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Plus,
  Minus,
  MoreVertical,
  Eye,
  EyeOff,
  Download,
  Upload,
  Share2,
  Heart,
  Bookmark,
  Star,
  Clock,
  Users,
  FileText,
  Folder,
  FolderOpen,
  Lock,
  Unlock,
  AlertCircle,
  CheckCircle,
  Info,
  Settings,
  Filter,
  Search,
  Calendar,
  Activity,
  TrendingUp,
  BarChart3,
  PieChart,
  Zap,
  Shield,
  Award,
  MessageCircle,
  Paperclip,
  Link,
  ExternalLink,
  Maximize2,
  Minimize2,
  RotateCcw,
  RefreshCw
} from 'lucide-react';

interface CollapsibleSection {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string | number;
  status?: 'default' | 'success' | 'warning' | 'error' | 'info';
  progress?: number;
  disabled?: boolean;
  locked?: boolean;
  required?: boolean;
  metadata?: Record<string, any>;
  actions?: CollapsibleAction[];
  children?: CollapsibleSection[];
}

interface CollapsibleAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  tooltip?: string;
}

interface CollapsibleProps {
  // Content configuration
  sections: CollapsibleSection[];
  defaultExpanded?: string[];
  expanded?: string[];
  onChange?: (expanded: string[]) => void;
  multiple?: boolean;
  type?: 'accordion' | 'expandable' | 'tree' | 'nested';
  
  // Styling
  variant?: 'default' | 'card' | 'outlined' | 'filled' | 'gradient';
  size?: 'small' | 'medium' | 'large';
  animation?: 'fade' | 'zoom' | 'slide' | 'none';
  animationDuration?: number;
  elevation?: number;
  borderRadius?: number;
  
  // Header configuration
  showIcon?: boolean;
  showBadge?: boolean;
  showStatus?: boolean;
  showProgress?: boolean;
  showActions?: boolean;
  showDivider?: boolean;
  showIndicator?: boolean;
  enableTooltip?: boolean;
  
  // Advanced features
  searchable?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  draggable?: boolean;
  lazyLoad?: boolean;
  virtualScroll?: boolean;
  maxHeight?: number;
  
  // Customization
  headerSx?: any;
  contentSx?: any;
  className?: string;
  sx?: any;
  
  // Callbacks
  onSectionClick?: (section: CollapsibleSection) => void;
  onSectionExpand?: (section: CollapsibleSection) => void;
  onSectionCollapse?: (section: CollapsibleSection) => void;
  onActionClick?: (action: CollapsibleAction, section: CollapsibleSection) => void;
}

const statusConfig = {
  success: { color: '#4caf50', icon: <CheckCircle size={18} />, bgColor: 'rgba(76, 175, 80, 0.1)' },
  warning: { color: '#ffa726', icon: <AlertCircle size={18} />, bgColor: 'rgba(255, 167, 38, 0.1)' },
  error: { color: '#f44336', icon: <AlertCircle size={18} />, bgColor: 'rgba(244, 67, 54, 0.1)' },
  info: { color: '#2196f3', icon: <Info size={18} />, bgColor: 'rgba(33, 150, 243, 0.1)' },
  default: { color: 'inherit', icon: null, bgColor: 'transparent' }
};

export const Collapsible: React.FC<CollapsibleProps> = ({
  // Content
  sections,
  defaultExpanded = [],
  expanded: controlledExpanded,
  onChange,
  multiple = true,
  type = 'expandable',
  
  // Styling
  variant = 'default',
  size = 'medium',
  animation = 'fade',
  animationDuration = 300,
  elevation = 0,
  borderRadius = 12,
  
  // Header config
  showIcon = true,
  showBadge = true,
  showStatus = true,
  showProgress = true,
  showActions = true,
  showDivider = true,
  showIndicator = true,
  enableTooltip = true,
  
  // Advanced features
  searchable = false,
  filterable = false,
  sortable = false,
  draggable = false,
  lazyLoad = false,
  virtualScroll = false,
  maxHeight,
  
  // Customization
  headerSx,
  contentSx,
  className,
  sx,
  
  // Callbacks
  onSectionClick,
  onSectionExpand,
  onSectionCollapse,
  onActionClick
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [internalExpanded, setInternalExpanded] = useState<string[]>(defaultExpanded);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'title' | 'status' | 'progress' | 'date'>('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [loadingSections, setLoadingSections] = useState<Set<string>>(new Set());

  const isControlled = controlledExpanded !== undefined;
  const expanded = isControlled ? controlledExpanded : internalExpanded;

  // Size mapping
  const sizeMap = {
    small: { padding: 2, iconSize: 18, typography: 'body2', spacing: 1 },
    medium: { padding: 3, iconSize: 24, typography: 'body1', spacing: 2 },
    large: { padding: 4, iconSize: 32, typography: 'h6', spacing: 3 }
  };
  const currentSize = sizeMap[size];

  // Animation components
  const AnimationComponent = {
    fade: Fade,
    zoom: Zoom,
    slide: Slide,
    none: React.Fragment
  }[animation];

  const animationProps = animation !== 'none' ? { timeout: animationDuration, in: true } : {};

  // Filter and search sections
  const filterSections = (sections: CollapsibleSection[]): CollapsibleSection[] => {
    let filtered = sections;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(section =>
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.metadata?.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(section => section.status === filterStatus);
    }

    return filtered;
  };

  // Sort sections
  const sortSections = (sections: CollapsibleSection[]): CollapsibleSection[] => {
    return [...sections].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'status':
          comparison = (a.status || 'default').localeCompare(b.status || 'default');
          break;
        case 'progress':
          comparison = (a.progress || 0) - (b.progress || 0);
          break;
        case 'date':
          comparison = (a.metadata?.createdAt || '').localeCompare(b.metadata?.createdAt || '');
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };

  const processedSections = sortSections(filterSections(sections));

  // Handle expand/collapse
  const handleToggle = (sectionId: string) => {
    if (type === 'accordion' && !multiple) {
      const newExpanded = expanded.includes(sectionId) ? [] : [sectionId];
      if (!isControlled) setInternalExpanded(newExpanded);
      onChange?.(newExpanded);
      
      const section = sections.find(s => s.id === sectionId);
      if (section) {
        if (expanded.includes(sectionId)) {
          onSectionCollapse?.(section);
        } else {
          onSectionExpand?.(section);
        }
      }
    } else {
      const newExpanded = expanded.includes(sectionId)
        ? expanded.filter(id => id !== sectionId)
        : multiple ? [...expanded, sectionId] : [sectionId];
      
      if (!isControlled) setInternalExpanded(newExpanded);
      onChange?.(newExpanded);
      
      const section = sections.find(s => s.id === sectionId);
      if (section) {
        if (expanded.includes(sectionId)) {
          onSectionCollapse?.(section);
        } else {
          onSectionExpand?.(section);
        }
      }
    }
  };

  // Handle section click
  const handleSectionClick = (section: CollapsibleSection) => {
    if (!section.disabled && !section.locked) {
      onSectionClick?.(section);
    }
  };

  // Handle action click
  const handleActionClick = (action: CollapsibleAction, section: CollapsibleSection, e: React.MouseEvent) => {
    e.stopPropagation();
    onActionClick?.(action, section);
    action.onClick();
  };

  // Get status configuration
  const getStatusConfig = (status: string = 'default') => {
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.default;
  };

  // Render status indicator
  const renderStatusIndicator = (section: CollapsibleSection) => {
    if (!showStatus || !section.status) return null;
    
    const config = getStatusConfig(section.status);
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          background: config.bgColor,
          px: 1.5,
          py: 0.5,
          borderRadius: 2,
          border: `1px solid ${alpha(config.color, 0.3)}`
        }}
      >
        {config.icon}
        <Typography variant="caption" sx={{ color: config.color, fontWeight: 600, textTransform: 'capitalize' }}>
          {section.status}
        </Typography>
      </Box>
    );
  };

  // Render progress indicator
  const renderProgressIndicator = (section: CollapsibleSection) => {
    if (!showProgress || section.progress === undefined) return null;

    return (
      <Box sx={{ width: 120, mr: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            Progress
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 700 }}>
            {section.progress}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={section.progress}
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
      </Box>
    );
  };

  // Render badge
  const renderBadge = (section: CollapsibleSection) => {
    if (!showBadge || !section.badge) return null;

    return (
      <Badge
        badgeContent={section.badge}
        color="primary"
        sx={{
          '& .MuiBadge-badge': {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontWeight: 700
          }
        }}
      />
    );
  };

  // Render actions
  const renderActions = (section: CollapsibleSection) => {
    if (!showActions || !section.actions || section.actions.length === 0) return null;

    return (
      <Box sx={{ display: 'flex', gap: 1 }}>
        {section.actions.slice(0, 3).map((action) => (
          <Tooltip key={action.id} title={action.tooltip || action.label} arrow>
            <IconButton
              size="small"
              onClick={(e) => handleActionClick(action, section, e)}
              disabled={action.disabled || section.disabled}
              sx={{
                background: alpha('#667eea', 0.1),
                '&:hover': { background: alpha('#667eea', 0.2) },
                '&:disabled': { opacity: 0.5 }
              }}
            >
              {action.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Box>
    );
  };

  // Render header icon
  const renderHeaderIcon = (section: CollapsibleSection, isExpanded: boolean) => {
    if (!showIcon) return null;

    const IconComponent = section.icon || (section.children ? (isExpanded ? FolderOpen : Folder) : FileText);
    
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: currentSize.iconSize + 8,
          height: currentSize.iconSize + 8,
          borderRadius: 2,
          background: isExpanded
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : alpha('#667eea', 0.1),
          color: isExpanded ? 'white' : '#667eea',
          transition: 'all 0.3s ease'
        }}
      >
        <IconComponent size={currentSize.iconSize} />
      </Box>
    );
  };

  // Render expand indicator
  const renderExpandIndicator = (isExpanded: boolean, disabled: boolean = false) => {
    if (!showIndicator) return null;

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: disabled ? alpha('#bdbdbd', 0.1) : alpha('#667eea', 0.1),
          color: disabled ? '#bdbdbd' : '#667eea',
          transition: 'all 0.3s ease',
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
        }}
      >
        <ChevronDown size={20} />
      </Box>
    );
  };

  // Render section header
  const renderSectionHeader = (section: CollapsibleSection, isExpanded: boolean) => {
    const isDisabled = section.disabled || section.locked;
    
    return (
      <Paper
        elevation={elevation}
        sx={{
          p: currentSize.padding,
          borderRadius: borderRadius,
          background: variant === 'filled' ? alpha('#667eea', 0.05) :
                     variant === 'gradient' ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)' :
                     'white',
          border: variant === 'outlined' ? '2px solid' : '1px solid',
          borderColor: isExpanded ? '#667eea' : 'divider',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          opacity: isDisabled ? 0.6 : 1,
          position: 'relative',
          overflow: 'hidden',
          '&:hover': !isDisabled ? {
            borderColor: '#667eea',
            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.15)',
            transform: 'translateY(-2px)'
          } : {},
          ...headerSx
        }}
        onClick={() => !isDisabled && handleToggle(section.id)}
      >
        {/* Lock overlay for locked sections */}
        {section.locked && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: alpha('#ffffff', 0.9),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Lock size={32} color="#bdbdbd" />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Locked Content
              </Typography>
            </Box>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: currentSize.spacing }}>
          {renderHeaderIcon(section, isExpanded)}
          
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: section.subtitle ? 0.5 : 0 }}>
              <Typography
                variant={currentSize.typography as any}
                sx={{
                  fontWeight: 700,
                  color: isDisabled ? 'text.disabled' : 'text.primary',
                  textDecoration: isDisabled ? 'line-through' : 'none'
                }}
              >
                {section.title}
              </Typography>
              
              {section.required && (
                <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 600 }}>
                  * Required
                </Typography>
              )}
              
              {renderBadge(section)}
              {renderStatusIndicator(section)}
            </Box>
            
            {section.subtitle && (
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
                {section.subtitle}
              </Typography>
            )}
          </Box>

          {renderProgressIndicator(section)}
          {renderActions(section)}
          {renderExpandIndicator(isExpanded, isDisabled)}
        </Box>
      </Paper>
    );
  };

  // Render section content
  const renderSectionContent = (section: CollapsibleSection) => {
    const ContentWrapper = AnimationComponent;
    
    return (
      <ContentWrapper {...animationProps}>
        <Box
          sx={{
            p: currentSize.padding,
            background: 'white',
            borderRadius: `0 0 ${borderRadius}px ${borderRadius}px`,
            border: '1px solid',
            borderColor: 'divider',
            borderTop: 'none',
            ...contentSx
          }}
        >
          {section.content}
        </Box>
      </ContentWrapper>
    );
  };

  // Render nested sections (tree view)
  const renderNestedSections = (sections: CollapsibleSection[], level: number = 0) => {
    return sections.map((section) => {
      const isExpanded = expanded.includes(section.id);
      
      return (
        <Box key={section.id} sx={{ mb: 1, ml: level * 3 }}>
          {renderSectionHeader(section, isExpanded)}
          
          {section.children && section.children.length > 0 && (
            <Collapse in={isExpanded} timeout={animationDuration}>
              <Box sx={{ mt: 1 }}>
                {renderNestedSections(section.children, level + 1)}
              </Box>
            </Collapse>
          )}
          
          {!section.children && section.content && isExpanded && renderSectionContent(section)}
        </Box>
      );
    });
  };

  // Render search and filter controls
  const renderSearchControls = () => {
    if (!searchable && !filterable) return null;

    return (
      <Card elevation={0} sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            {searchable && (
              <Box sx={{ flexGrow: 1, position: 'relative' }}>
                <Search size={20} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                <input
                  type="text"
                  placeholder="Search sections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 40px',
                    border: '1px solid #e0e0e0',
                    borderRadius: 8,
                    fontSize: 14,
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    background: '#f8fafc'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </Box>
            )}
            
            {filterable && (
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: 8,
                  fontSize: 14,
                  background: '#f8fafc',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Status</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
                <option value="info">Info</option>
              </select>
            )}
            
            {sortable && (
              <IconButton
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                sx={{ background: alpha('#667eea', 0.1) }}
              >
                <BarChart3 size={18} />
              </IconButton>
            )}
          </Stack>
        </CardContent>
      </Card>
    );
  };

  // Main render
  return (
    <Box sx={{ width: '100%', ...sx }} className={className}>
      {renderSearchControls()}
      
      {type === 'tree' || type === 'nested' ? (
        <Box>
          {renderNestedSections(processedSections)}
        </Box>
      ) : (
        <Box>
          {processedSections.map((section) => {
            const isExpanded = expanded.includes(section.id);
            
            return (
              <Box key={section.id} sx={{ mb: 2 }}>
                {renderSectionHeader(section, isExpanded)}
                
                {section.content && (
                  <Collapse in={isExpanded} timeout={animationDuration}>
                    {renderSectionContent(section)}
                  </Collapse>
                )}
              </Box>
            );
          })}
        </Box>
      )}
      
      {processedSections.length === 0 && (
        <Card elevation={0} sx={{ borderRadius: 3, background: alpha('#667eea', 0.05) }}>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Search size={48} color="#bdbdbd" style={{ marginBottom: 16 }} />
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
              No sections found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or filter criteria
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

// Pre-built collapsible components for common use cases
export const DocumentSectionsCollapsible: React.FC<{ documents: any[] }> = ({ documents }) => {
  const sections: CollapsibleSection[] = documents.map((doc, index) => ({
    id: `doc-${index}`,
    title: doc.name,
    subtitle: `Type: ${doc.type} • Size: ${doc.size} • Modified: ${doc.modified}`,
    content: (
      <Box>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {doc.description || 'Document details and preview would appear here.'}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            size="small"
            startIcon={<Eye size={16} />}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Preview
          </Button>
          <Button
            size="small"
            startIcon={<Download size={16} />}
            variant="contained"
            sx={{ borderRadius: 2 }}
          >
            Download
          </Button>
        </Stack>
      </Box>
    ),
    icon: <FileText size={currentSize.iconSize} />,
    status: doc.status as any,
    progress: doc.progress,
    badge: doc.version,
    metadata: {
      type: doc.type,
      size: doc.size,
      modified: doc.modified,
      tags: doc.tags
    },
    actions: [
      {
        id: 'share',
        label: 'Share',
        icon: <Share2 size={16} />,
        onClick: () => console.log('Share document:', doc.name),
        tooltip: 'Share this document'
      },
      {
        id: 'bookmark',
        label: 'Bookmark',
        icon: <Bookmark size={16} />,
        onClick: () => console.log('Bookmark document:', doc.name),
        tooltip: 'Add to bookmarks'
      }
    ]
  }));

  return (
    <Collapsible
      sections={sections}
      variant="card"
      size="medium"
      showProgress
      showActions
      searchable
      filterable
      sortable
      onSectionClick={(section) => console.log('Document clicked:', section.title)}
    />
  );
};

export const WorkflowStepsCollapsible: React.FC<{ steps: any[] }> = ({ steps }) => {
  const sections: CollapsibleSection[] = steps.map((step, index) => ({
    id: `step-${index}`,
    title: step.name,
    subtitle: step.description,
    content: (
      <Box>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {step.details || 'Step execution details would appear here.'}
        </Typography>
        {step.assignee && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Avatar src={step.assignee.avatar} alt={step.assignee.name} sx={{ width: 32, height: 32 }} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Assigned to: {step.assignee.name}
            </Typography>
          </Box>
        )}
        <Stack direction="row" spacing={2}>
          <Button
            size="small"
            startIcon={<Activity size={16} />}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            View Details
          </Button>
          {step.status === 'pending' && (
            <Button
              size="small"
              startIcon={<Zap size={16} />}
              variant="contained"
              sx={{ borderRadius: 2 }}
            >
              Start Step
            </Button>
          )}
        </Stack>
      </Box>
    ),
    icon: <CheckCircle size={currentSize.iconSize} />,
    status: step.status as any,
    progress: step.progress,
    required: step.required,
    metadata: {
      assignee: step.assignee,
      dueDate: step.dueDate,
      dependencies: step.dependencies
    },
    actions: [
      {
        id: 'edit',
        label: 'Edit',
        icon: <Settings size={16} />,
        onClick: () => console.log('Edit step:', step.name),
        tooltip: 'Edit this step'
      }
    ]
  }));

  return (
    <Collapsible
      sections={sections}
      variant="gradient"
      size="large"
      type="accordion"
      multiple={false}
      showProgress
      showStatus
      showActions
      animation="slide"
      onSectionExpand={(section) => console.log('Workflow step expanded:', section.title)}
    />
  );
};

export const TeamMembersCollapsible: React.FC<{ members: any[] }> = ({ members }) => {
  const sections: CollapsibleSection[] = members.map((member, index) => ({
    id: `member-${index}`,
    title: member.name,
    subtitle: `${member.role} • ${member.department}`,
    content: (
      <Box>
        <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">Email</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{member.email}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Phone</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{member.phone}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Status</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: member.status === 'online' ? '#4caf50' : '#bdbdbd' }}>
              {member.status}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button
            size="small"
            startIcon={<MessageCircle size={16} />}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Message
          </Button>
          <Button
            size="small"
            startIcon={<Users size={16} />}
            variant="contained"
            sx={{ borderRadius: 2 }}
          >
            View Profile
          </Button>
        </Stack>
      </Box>
    ),
    icon: <Users size={currentSize.iconSize} />,
    status: member.status === 'online' ? 'success' : 'default',
    badge: member.projectsCount,
    metadata: {
      email: member.email,
      phone: member.phone,
      status: member.status,
      avatar: member.avatar
    },
    actions: [
      {
        id: 'message',
        label: 'Message',
        icon: <MessageCircle size={16} />,
        onClick: () => console.log('Message member:', member.name),
        tooltip: 'Send a message'
      }
    ]
  }));

  return (
    <Collapsible
      sections={sections}
      variant="outlined"
      size="medium"
      showBadge
      showStatus
      showActions
      animation="fade"
      elevation={2}
      onSectionClick={(section) => console.log('Member clicked:', section.title)}
    />
  );
};

// Usage examples:
export const UsageExamples = () => {
  const sampleDocuments = [
    {
      name: 'Q4 Financial Report',
      type: 'PDF',
      size: '2.4 MB',
      modified: '2 hours ago',
      status: 'success',
      progress: 100,
      version: 'v2.1',
      description: 'Comprehensive financial analysis for Q4 2024',
      tags: ['finance', 'quarterly', 'report']
    },
    {
      name: 'Project Proposal',
      type: 'DOCX',
      size: '1.8 MB',
      modified: '1 day ago',
      status: 'warning',
      progress: 75,
      version: 'v1.3',
      description: 'New project proposal document',
      tags: ['project', 'proposal']
    },
    {
      name: 'Meeting Minutes',
      type: 'TXT',
      size: '156 KB',
      modified: '3 days ago',
      status: 'default',
      progress: 0,
      version: 'v1.0',
      description: 'Minutes from last team meeting',
      tags: ['meeting', 'minutes']
    }
  ];

  const workflowSteps = [
    {
      name: 'Document Review',
      description: 'Initial document review and validation',
      status: 'success',
      progress: 100,
      required: true,
      assignee: { name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
      dueDate: '2024-01-15',
      details: 'Review the document for completeness and accuracy'
    },
    {
      name: 'Legal Approval',
      description: 'Legal team approval and compliance check',
      status: 'warning',
      progress: 60,
      required: true,
      assignee: { name: 'Mike Chen', avatar: 'https://i.pravatar.cc/150?img=2' },
      dueDate: '2024-01-18',
      details: 'Ensure all legal requirements are met'
    },
    {
      name: 'Final Approval',
      description: 'Final approval from department head',
      status: 'pending',
      progress: 0,
      required: false,
      assignee: null,
      dueDate: '2024-01-20',
      details: 'Get final sign-off from department head'
    }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Senior Designer',
      department: 'Design',
      email: 'sarah@company.com',
      phone: '+1 (555) 123-4567',
      status: 'online',
      projectsCount: 12,
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      name: 'Mike Chen',
      role: 'Legal Advisor',
      department: 'Legal',
      email: 'mike@company.com',
      phone: '+1 (555) 234-5678',
      status: 'away',
      projectsCount: 8,
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
      name: 'Emily Davis',
      role: 'Project Manager',
      department: 'Operations',
      email: 'emily@company.com',
      phone: '+1 (555) 345-6789',
      status: 'offline',
      projectsCount: 15,
      avatar: 'https://i.pravatar.cc/150?img=3'
    }
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 800, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Collapsible Component Examples
      </Typography>

      {/* Document Sections */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Document Library</Typography>
        <DocumentSectionsCollapsible documents={sampleDocuments} />
      </Box>

      {/* Workflow Steps */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Workflow Progress</Typography>
        <WorkflowStepsCollapsible steps={workflowSteps} />
      </Box>

      {/* Team Members */}
      <Box>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Team Directory</Typography>
        <TeamMembersCollapsible members={teamMembers} />
      </Box>
    </Box>
  );
};

export default Collapsible;
