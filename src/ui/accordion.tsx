import React, { useState, useCallback, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Collapse,
  Fade,
  Divider,
  Chip,
  Badge,
  alpha,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  ChevronDown, 
  ChevronRight, 
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Users,
  Calendar,
  MoreVertical,
  Plus,
  Minus
} from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  badge?: {
    count?: number;
    label?: string;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  };
  status?: 'pending' | 'completed' | 'active' | 'error' | 'warning';
  metadata?: {
    date?: string;
    users?: number;
    files?: number;
    size?: string;
  };
  actions?: Array<{
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    color?: string;
  }>;
  disabled?: boolean;
  defaultExpanded?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  variant?: 'default' | 'outlined' | 'filled' | 'elevated';
  size?: 'small' | 'medium' | 'large';
  showDivider?: boolean;
  animate?: boolean;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  onItemToggle?: (itemId: string, isExpanded: boolean) => void;
  onItemAction?: (itemId: string, actionIndex: number) => void;
  renderHeader?: (item: AccordionItem, isExpanded: boolean) => React.ReactNode;
  renderContent?: (item: AccordionItem) => React.ReactNode;
}

export function Accordion({
  items,
  multiple = false,
  variant = 'default',
  size = 'medium',
  showDivider = true,
  animate = true,
  className,
  headerClassName,
  contentClassName,
  onItemToggle,
  onItemAction,
  renderHeader,
  renderContent
}: AccordionProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => {
    const defaultExpanded = items
      .filter(item => item.defaultExpanded)
      .map(item => item.id);
    return new Set(defaultExpanded);
  });

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [focusedItem, setFocusedItem] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleItem = useCallback((itemId: string) => {
    if (multiple) {
      setExpandedItems(prev => {
        const newSet = new Set(prev);
        if (newSet.has(itemId)) {
          newSet.delete(itemId);
        } else {
          newSet.add(itemId);
        }
        return newSet;
      });
    } else {
      setExpandedItems(prev => {
        const newSet = new Set();
        if (!prev.has(itemId)) {
          newSet.add(itemId);
        }
        return newSet;
      });
    }
    
    onItemToggle?.(itemId, !expandedItems.has(itemId));
  }, [multiple, expandedItems, onItemToggle]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent, itemId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleItem(itemId);
    }
  }, [toggleItem]);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'active':
        return 'primary';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'pending':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} />;
      case 'active':
        return <Clock size={16} />;
      case 'error':
        return <AlertCircle size={16} />;
      case 'warning':
        return <AlertCircle size={16} />;
      case 'pending':
        return <Clock size={16} />;
      default:
        return null;
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: 'transparent',
          '&:hover': {
            borderColor: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.02)
          }
        };
      case 'filled':
        return {
          border: 'none',
          backgroundColor: alpha(theme.palette.grey[100], 0.5),
          '&:hover': {
            backgroundColor: alpha(theme.palette.grey[200], 0.7)
          }
        };
      case 'elevated':
        return {
          border: 'none',
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[1],
          '&:hover': {
            boxShadow: theme.shadows[4]
          }
        };
      default:
        return {
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
          '&:hover': {
            borderColor: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.02)
          }
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: theme.spacing(1.5, 2),
          minHeight: 48
        };
      case 'large':
        return {
          padding: theme.spacing(3, 4),
          minHeight: 80
        };
      default:
        return {
          padding: theme.spacing(2, 3),
          minHeight: 64
        };
    }
  };

  return (
    <Box className={className} sx={{ width: '100%' }}>
      {items.map((item, index) => {
        const isExpanded = expandedItems.has(item.id);
        const isHovered = hoveredItem === item.id;
        const isFocused = focusedItem === item.id;
        const statusColor = getStatusColor(item.status);

        return (
          <Box
            key={item.id}
            sx={{
              mb: showDivider && index < items.length - 1 ? 1 : 0,
              borderRadius: 2,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              ...getVariantStyles(),
              ...(isHovered && {
                transform: 'translateY(-1px)',
                boxShadow: theme.shadows[2]
              }),
              ...(isFocused && {
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: 2
              }),
              ...(item.disabled && {
                opacity: 0.6,
                pointerEvents: 'none'
              })
            }}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onFocus={() => setFocusedItem(item.id)}
            onBlur={() => setFocusedItem(null)}
          >
            {/* Header */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                userSelect: 'none',
                ...getSizeStyles(),
                ...(isExpanded && {
                  borderBottom: showDivider ? `1px solid ${theme.palette.divider}` : 'none'
                })
              }}
              onClick={() => !item.disabled && toggleItem(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              tabIndex={item.disabled ? -1 : 0}
              role="button"
              aria-expanded={isExpanded}
              aria-controls={`accordion-content-${item.id}`}
            >
              {/* Expand/Collapse Icon */}
              <Box sx={{ mr: 2 }}>
                {animate ? (
                  <Fade in={true} timeout={200}>
                    <Box>
                      {isExpanded ? (
                        <ChevronDown size={20} />
                      ) : (
                        <ChevronRight size={20} />
                      )}
                    </Box>
                  </Fade>
                ) : (
                  <>
                    {isExpanded ? (
                      <ChevronDown size={20} />
                    ) : (
                      <ChevronRight size={20} />
                    )}
                  </>
                )}
              </Box>

              {/* Item Icon */}
              {item.icon && (
                <Box sx={{ mr: 2, color: 'text.secondary' }}>
                  {item.icon}
                </Box>
              )}

              {/* Main Content */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                {renderHeader ? (
                  renderHeader(item, isExpanded)
                ) : (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          color: 'text.primary',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {item.title}
                      </Typography>
                      
                      {/* Status Badge */}
                      {item.status && (
                        <Chip
                          icon={getStatusIcon(item.status)}
                          label={item.status}
                          size="small"
                          color={statusColor as any}
                          sx={{ fontWeight: 600, textTransform: 'capitalize' }}
                        />
                      )}
                      
                      {/* Custom Badge */}
                      {item.badge && (
                        <Badge
                          badgeContent={item.badge.count}
                          color={item.badge.color as any}
                          max={99}
                        >
                          <Chip
                            label={item.badge.label}
                            size="small"
                            color={item.badge.color as any}
                            sx={{ fontWeight: 600 }}
                          />
                        </Badge>
                      )}
                    </Box>
                    
                    {item.subtitle && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {item.subtitle}
                      </Typography>
                    )}
                    
                    {/* Metadata */}
                    {item.metadata && (
                      <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                        {item.metadata.date && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Calendar size={12} />
                            <Typography variant="caption" color="text.secondary">
                              {item.metadata.date}
                            </Typography>
                          </Box>
                        )}
                        {item.metadata.users && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Users size={12} />
                            <Typography variant="caption" color="text.secondary">
                              {item.metadata.users}
                            </Typography>
                          </Box>
                        )}
                        {item.metadata.files && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <FileText size={12} />
                            <Typography variant="caption" color="text.secondary">
                              {item.metadata.files}
                            </Typography>
                          </Box>
                        )}
                        {item.metadata.size && (
                          <Typography variant="caption" color="text.secondary">
                            {item.metadata.size}
                          </Typography>
                        )}
                      </Box>
                    )}
                  </>
                )}
              </Box>

              {/* Actions */}
              {item.actions && item.actions.length > 0 && (
                <Box sx={{ display: 'flex', gap: 0.5, ml: 2 }}>
                  {item.actions.map((action, actionIndex) => (
                    <IconButton
                      key={actionIndex}
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        onItemAction?.(item.id, actionIndex);
                        action.onClick();
                      }}
                      sx={{
                        color: action.color || 'text.secondary',
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.action.active, 0.1),
                          color: action.color || theme.palette.action.active
                        }
                      }}
                      title={action.label}
                    >
                      {action.icon}
                    </IconButton>
                  ))}
                </Box>
              )}
            </Box>

            {/* Content */}
            {animate ? (
              <Collapse
                in={isExpanded}
                timeout="auto"
                unmountOnExit
                sx={{
                  '& .MuiCollapse-wrapperInner': {
                    width: '100%'
                  }
                }}
              >
                <Box
                  id={`accordion-content-${item.id}`}
                  sx={{
                    p: 3,
                    backgroundColor: alpha(theme.palette.grey[50], 0.3),
                    borderTop: showDivider ? `1px solid ${theme.palette.divider}` : 'none'
                  }}
                  className={contentClassName}
                >
                  {renderContent ? renderContent(item) : item.content}
                </Box>
              </Collapse>
            ) : (
              isExpanded && (
                <Box
                  id={`accordion-content-${item.id}`}
                  sx={{
                    p: 3,
                    backgroundColor: alpha(theme.palette.grey[50], 0.3),
                    borderTop: showDivider ? `1px solid ${theme.palette.divider}` : 'none'
                  }}
                  className={contentClassName}
                >
                  {renderContent ? renderContent(item) : item.content}
                </Box>
              )
            )}
          </Box>
        );
      })}
    </Box>
  );
}

/* ============================
 * Specialized Accordion Components
 * ============================
 */

interface DocumentAccordionItem extends AccordionItem {
  document: {
    id: string;
    title: string;
    type: string;
    size: string;
    modified: string;
    status: 'pending' | 'signed' | 'completed';
    signers: Array<{
      name: string;
      avatar: string;
      signed: boolean;
    }>;
  };
}

interface DocumentAccordionProps {
  documents: DocumentAccordionItem[];
  onDocumentAction?: (documentId: string, action: string) => void;
  onSignerClick?: (documentId: string, signerId: string) => void;
}

export function DocumentAccordion({
  documents,
  onDocumentAction,
  onSignerClick
}: DocumentAccordionProps) {
  const theme = useTheme();

  const items: AccordionItem[] = documents.map(doc => ({
    id: doc.id,
    title: doc.document.title,
    subtitle: `${doc.document.type} • ${doc.document.size} • Modified ${doc.document.modified}`,
    status: doc.document.status,
    icon: <FileText size={20} />,
    metadata: {
      users: doc.document.signers.length,
      date: doc.document.modified
    },
    content: (
      <Box>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Document requires signatures from {doc.document.signers.length} parties.
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Signers:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {doc.document.signers.map((signer, index) => (
              <Chip
                key={index}
                avatar={
                  <Avatar sx={{ width: 24, height: 24 }}>
                    {signer.name[0]}
                  </Avatar>
                }
                label={signer.name}
                color={signer.signed ? 'success' : 'default'}
                size="small"
                onClick={() => onSignerClick?.(doc.id, signer.name)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onDocumentAction?.(doc.id, 'preview')}
          >
            Preview
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => onDocumentAction?.(doc.id, 'sign')}
            disabled={doc.document.status === 'completed'}
          >
            Sign Document
          </Button>
        </Box>
      </Box>
    ),
    actions: [
      {
        icon: <MoreVertical size={16} />,
        label: 'More options',
        onClick: () => onDocumentAction?.(doc.id, 'menu')
      }
    ]
  }));

  return <Accordion items={items} variant="elevated" animate={true} />;
}

interface TeamAccordionItem extends AccordionItem {
  team: {
    id: string;
    name: string;
    description: string;
    members: number;
    lastActive: string;
    projects: number;
    avatar: string;
  };
}

interface TeamAccordionProps {
  teams: TeamAccordionItem[];
  onTeamAction?: (teamId: string, action: string) => void;
}

export function TeamAccordion({
  teams,
  onTeamAction
}: TeamAccordionProps) {
  const items: AccordionItem[] = teams.map(team => ({
    id: team.id,
    title: team.team.name,
    subtitle: team.team.description,
    icon: <Users size={20} />,
    metadata: {
      users: team.team.members,
      date: team.team.lastActive,
      files: team.team.projects
    },
    content: (
      <Box>
        <Typography variant="body2" sx={{ mb: 2 }}>
          {team.team.description}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Chip
            icon={<Users size={14} />}
            label={`${team.team.members} members`}
            size="small"
          />
          <Chip
            icon={<FileText size={14} />}
            label={`${team.team.projects} projects`}
            size="small"
          />
          <Typography variant="caption" color="text.secondary">
            Last active: {team.team.lastActive}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onTeamAction?.(team.id, 'view')}
          >
            View Team
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => onTeamAction?.(team.id, 'join')}
          >
            Join Team
          </Button>
        </Box>
      </Box>
    )
  }));

  return <Accordion items={items} multiple={true} variant="outlined" />;
}

/* ============================
 * Export Default
 * ============================
 */

export default Accordion;
