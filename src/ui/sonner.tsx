import React, { useState, useEffect } from 'react';
import {
  Box,
  Snackbar,
  Alert,
  IconButton,
  Typography,
  Stack,
  Chip,
  LinearProgress,
  alpha,
  Collapse,
  Slide,
  Fade,
  Zoom,
  Grow,
  SlideProps
} from '@mui/material';
import {
  CheckCircle,
  AlertCircle,
  Info,
  XCircle,
  X,
  Clock,
  RotateCcw,
  Settings,
  Bell,
  Activity,
  TrendingUp,
  Zap,
  Shield,
  Download,
  Upload,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  Archive,
  Code,
  Database
} from 'lucide-react';

interface ToastPosition {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

interface ToastVariant {
  type: 'success' | 'error' | 'warning' | 'info' | 'loading';
  title?: string;
  description?: string;
  duration?: number;
  position?: ToastPosition;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
  onAutoClose?: () => void;
  persistent?: boolean;
  progress?: boolean;
  icon?: React.ReactNode;
  richContent?: boolean;
  expandable?: boolean;
  sound?: boolean;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  category?: 'system' | 'user' | 'document' | 'security' | 'performance';
  data?: any;
  id?: string;
}

interface Toast extends ToastVariant {
  id: string;
  timestamp: Date;
  visible: boolean;
}

interface SonnerProps {
  position?: ToastPosition;
  maxToasts?: number;
  duration?: number;
  richColors?: boolean;
  expandByDefault?: boolean;
  closeButton?: boolean;
  invert?: boolean;
  stacked?: boolean;
  gap?: number;
  theme?: 'light' | 'dark' | 'system';
  visibleToasts?: number;
  className?: string;
  style?: React.CSSProperties;
  offset?: string | number;
  dir?: 'ltr' | 'rtl';
  loadingIcon?: React.ReactNode;
  successIcon?: React.ReactNode;
  errorIcon?: React.ReactNode;
  warningIcon?: React.ReactNode;
  infoIcon?: React.ReactNode;
  pauseWhenPageIsHidden?: boolean;
  icons?: {
    success?: React.ReactNode;
    error?: React.ReactNode;
    warning?: React.ReactNode;
    info?: React.ReactNode;
    loading?: React.ReactNode;
  };
  sounds?: {
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
  };
}

interface SonnerToastProps {
  toast: Toast;
  onClose: (id: string) => void;
  richColors?: boolean;
  expandByDefault?: boolean;
  closeButton?: boolean;
  invert?: boolean;
  position?: ToastPosition;
  theme?: 'light' | 'dark' | 'system';
  icons?: {
    success?: React.ReactNode;
    error?: React.ReactNode;
    warning?: React.ReactNode;
    info?: React.ReactNode;
    loading?: React.ReactNode;
  };
}

const ToastIcon: React.FC<{ type: ToastVariant['type']; icon?: React.ReactNode; richColors?: boolean }> = ({ 
  type, 
  icon, 
  richColors 
}) => {
  const getIconColor = () => {
    if (richColors) {
      switch (type) {
        case 'success': return '#43e97b';
        case 'error': return '#f44336';
        case 'warning': return '#ffa726';
        case 'info': return '#4facfe';
        case 'loading': return '#667eea';
        default: return '#666';
      }
    }
    return 'currentColor';
  };

  if (icon) return <Box sx={{ color: getIconColor() }}>{icon}</Box>;

  const iconProps = { size: 20, color: getIconColor() };

  switch (type) {
    case 'success': return <CheckCircle {...iconProps} />;
    case 'error': return <XCircle {...iconProps} />;
    case 'warning': return <AlertCircle {...iconProps} />;
    case 'info': return <Info {...iconProps} />;
    case 'loading': return <Activity {...iconProps} className="animate-spin" />;
    default: return <Bell {...iconProps} />;
  }
};

const getCategoryIcon = (category?: string) => {
  switch (category) {
    case 'document': return <FileText size={16} />;
    case 'security': return <Shield size={16} />;
    case 'performance': return <TrendingUp size={16} />;
    case 'system': return <Zap size={16} />;
    default: return <Bell size={16} />;
  }
};

const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case 'urgent': return '#f44336';
    case 'high': return '#ffa726';
    case 'normal': return '#4facfe';
    case 'low': return '#43e97b';
    default: return '#666';
  }
};

const SonnerToast: React.FC<SonnerToastProps> = ({
  toast,
  onClose,
  richColors,
  expandByDefault,
  closeButton,
  invert,
  position,
  theme,
  icons
}) => {
  const [expanded, setExpanded] = useState(expandByDefault);
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (toast.type === 'loading' || toast.persistent) return;

    const duration = toast.duration || 5000;
    const interval = 50;
    const decrement = (100 * interval) / duration;

    const timer = setInterval(() => {
      if (!isPaused) {
        setProgress((prev) => {
          if (prev <= 0) {
            handleAutoClose();
            return 0;
          }
          return prev - decrement;
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, [toast.duration, toast.persistent, toast.type, isPaused, isPaused]);

  const handleAutoClose = () => {
    if (toast.onAutoClose) {
      toast.onAutoClose();
    }
    onClose(toast.id);
  };

  const handleClose = () => {
    if (toast.onClose) {
      toast.onClose();
    }
    onClose(toast.id);
  };

  const getBackgroundColor = () => {
    if (!richColors) return invert ? '#1a1a1a' : 'white';
    
    switch (toast.type) {
      case 'success': return 'linear-gradient(135deg, rgba(67, 233, 123, 0.1) 0%, rgba(56, 249, 215, 0.1) 100%)';
      case 'error': return 'linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(211, 47, 47, 0.1) 100%)';
      case 'warning': return 'linear-gradient(135deg, rgba(255, 167, 38, 0.1) 0%, rgba(255, 152, 0, 0.1) 100%)';
      case 'info': return 'linear-gradient(135deg, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 254, 0.1) 100%)';
      case 'loading': return 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)';
      default: return invert ? '#1a1a1a' : 'white';
    }
  };

  const getBorderColor = () => {
    if (!richColors) return invert ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
    
    switch (toast.type) {
      case 'success': return '#43e97b';
      case 'error': return '#f44336';
      case 'warning': return '#ffa726';
      case 'info': return '#4facfe';
      case 'loading': return '#667eea';
      default: return invert ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
    }
  };

  const getTextColor = () => {
    return invert ? 'white' : '#1a1a1a';
  };

  return (
    <Box
      sx={{
        mb: 1,
        position: 'relative',
        background: getBackgroundColor(),
        border: `1px solid ${getBorderColor()}`,
        borderRadius: 4,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        overflow: 'hidden',
        cursor: toast.expandable ? 'pointer' : 'default',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.16)',
          transform: 'translateY(-2px)'
        }
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={() => toast.expandable && setExpanded(!expanded)}
    >
      {/* Progress Bar */}
      {!toast.persistent && toast.type !== 'loading' && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: alpha('#666', 0.1),
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: `${progress}%`,
              background: getBorderColor(),
              transition: 'width 0.05s linear'
            }}
          />
        </Box>
      )}

      {/* Priority Indicator */}
      {toast.priority && toast.priority !== 'normal' && (
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 4,
            background: getPriorityColor(toast.priority)
          }}
        />
      )}

      {/* Main Content */}
      <Box sx={{ p: 3, pb: toast.persistent || toast.type === 'loading' ? 3 : 4 }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          {/* Icon */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: alpha(getBorderColor(), 0.1),
              flexShrink: 0
            }}
          >
            <ToastIcon type={toast.type} icon={toast.icon} richColors={richColors} />
          </Box>

          {/* Content */}
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
              {/* Category */}
              {toast.category && (
                <Chip
                  icon={getCategoryIcon(toast.category)}
                  label={toast.category}
                  size="small"
                  sx={{
                    background: alpha(getBorderColor(), 0.1),
                    color: getBorderColor(),
                    fontWeight: 600,
                    fontSize: '0.7rem'
                  }}
                />
              )}
              
              {/* Priority */}
              {toast.priority && toast.priority !== 'normal' && (
                <Chip
                  label={toast.priority}
                  size="small"
                  sx={{
                    background: alpha(getPriorityColor(toast.priority), 0.1),
                    color: getPriorityColor(toast.priority),
                    fontWeight: 600,
                    fontSize: '0.7rem'
                  }}
                />
              )}
              
              {/* Timestamp */}
              <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                {new Date(toast.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            </Stack>

            {/* Title */}
            {toast.title && (
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  color: getTextColor(),
                  mb: 0.5,
                  lineHeight: 1.3
                }}
              >
                {toast.title}
              </Typography>
            )}

            {/* Description */}
            {toast.description && (
              <Collapse in={expanded || !toast.expandable} timeout="auto">
                <Typography
                  variant="body2"
                  sx={{
                    color: alpha(getTextColor(), 0.8),
                    lineHeight: 1.5,
                    wordBreak: 'break-word'
                  }}
                >
                  {toast.description}
                </Typography>
              </Collapse>
            )}

            {/* Rich Content */}
            {toast.richContent && toast.data && (
              <Collapse in={expanded} timeout="auto">
                <Box sx={{ mt: 2 }}>
                  {renderRichContent(toast.data, toast.type)}
                </Box>
              </Collapse>
            )}

            {/* Action Button */}
            {toast.action && (
              <Button
                variant="contained"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  toast.action?.onClick();
                }}
                sx={{
                  mt: 1,
                  background: getBorderColor(),
                  color: 'white',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 2,
                  py: 0.5,
                  '&:hover': {
                    background: alpha(getBorderColor(), 0.9)
                  }
                }}
              >
                {toast.action.label}
              </Button>
            )}
          </Box>

          {/* Close Button */}
          {closeButton && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              sx={{
                color: alpha(getTextColor(), 0.5),
                '&:hover': {
                  color: getTextColor(),
                  background: alpha(getTextColor(), 0.1)
                }
              }}
            >
              <X size={16} />
            </IconButton>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

const renderRichContent = (data: any, type: string) => {
  switch (type) {
    case 'document':
      return (
        <Card elevation={0} sx={{ p: 2, background: alpha('#4facfe', 0.05), borderRadius: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <FileText size={20} color="#4facfe" />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {data.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {data.size} • {data.type}
              </Typography>
            </Box>
          </Stack>
        </Card>
      );
    
    case 'security':
      return (
        <Card elevation={0} sx={{ p: 2, background: alpha('#43e97b', 0.05), borderRadius: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Shield size={20} color="#43e97b" />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Security Alert
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {data.message}
              </Typography>
            </Box>
          </Stack>
        </Card>
      );
    
    default:
      return (
        <Card elevation={0} sx={{ p: 2, background: alpha('#666', 0.05), borderRadius: 2 }}>
          <Typography variant="body2">
            {JSON.stringify(data, null, 2)}
          </Typography>
        </Card>
      );
  }
};

const getSlideDirection = (position: ToastPosition): SlideProps['direction> => {
  if (position.vertical === 'top') return 'down';
  if (position.vertical === 'bottom') return 'up';
  return 'right';
};

export const toast = {
  success: (title: string, description?: string, options?: Partial<ToastVariant>) => {
    const event = new CustomEvent('sonner-toast', {
      detail: { type: 'success', title, description, ...options }
    });
    window.dispatchEvent(event);
  },
  
  error: (title: string, description?: string, options?: Partial<ToastVariant>) => {
    const event = new CustomEvent('sonner-toast', {
      detail: { type: 'error', title, description, ...options }
    });
    window.dispatchEvent(event);
  },
  
  warning: (title: string, description?: string, options?: Partial<ToastVariant>) => {
    const event = new CustomEvent('sonner-toast', {
      detail: { type: 'warning', title, description, ...options }
    });
    window.dispatchEvent(event);
  },
  
  info: (title: string, description?: string, options?: Partial<ToastVariant>) => {
    const event = new CustomEvent('sonner-toast', {
      detail: { type: 'info', title, description, ...options }
    });
    window.dispatchEvent(event);
  },
  
  loading: (title: string, description?: string, options?: Partial<ToastVariant>) => {
    const event = new CustomEvent('sonner-toast', {
      detail: { type: 'loading', title, description, ...options }
    });
    window.dispatchEvent(event);
  },
  
  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    },
    options?: Partial<ToastVariant>
  ) => {
    const loadingEvent = new CustomEvent('sonner-toast', {
      detail: { type: 'loading', title: messages.loading, ...options }
    });
    window.dispatchEvent(loadingEvent);
    
    return promise
      .then((result) => {
        const successEvent = new CustomEvent('sonner-toast', {
          detail: { type: 'success', title: messages.success, ...options }
        });
        window.dispatchEvent(successEvent);
        return result;
      })
      .catch((error) => {
        const errorEvent = new CustomEvent('sonner-toast', {
          detail: { type: 'error', title: messages.error, ...options }
        });
        window.dispatchEvent(errorEvent);
        throw error;
      });
  },
  
  dismiss: (id?: string) => {
    const event = new CustomEvent('sonner-dismiss', { detail: { id } });
    window.dispatchEvent(event);
  }
};

export function Sonner({
  position = { vertical: 'bottom', horizontal: 'right' },
  maxToasts = 5,
  duration = 5000,
  richColors = true,
  expandByDefault = false,
  closeButton = true,
  invert = false,
  stacked = true,
  gap = 1,
  theme = 'light',
  visibleToasts = 3,
  className,
  style,
  offset = '16px',
  dir = 'ltr',
  icons,
  pauseWhenPageIsHidden = true
}: SonnerProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [expanded, setExpanded] = useState(expandByDefault);

  useEffect(() => {
    const handleToast = (event: CustomEvent) => {
      const toastData = event.detail as ToastVariant;
      const newToast: Toast = {
        ...toastData,
        id: toastData.id || Date.now().toString(),
        timestamp: new Date(),
        visible: true
      };

      setToasts(prev => {
        const updatedToasts = [newToast, ...prev].slice(0, maxToasts);
        return updatedToasts;
      });
    };

    const handleDismiss = (event: CustomEvent) => {
      const { id } = event.detail;
      if (id) {
        setToasts(prev => prev.filter(toast => toast.id !== id));
      } else {
        setToasts([]);
      }
    };

    window.addEventListener('sonner-toast', handleToast as EventListener);
    window.addEventListener('sonner-dismiss', handleDismiss as EventListener);

    return () => {
      window.removeEventListener('sonner-toast', handleToast as EventListener);
      window.removeEventListener('sonner-dismiss', handleDismiss as EventListener);
    };
  }, [maxToasts]);

  const handleClose = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const getPositionStyles = () => {
    const styles: React.CSSProperties = {
      position: 'fixed',
      zIndex: 9999,
      pointerEvents: 'none'
    };

    if (position.vertical === 'top') {
      styles.top = offset;
    } else {
      styles.bottom = offset;
    }

    if (position.horizontal === 'left') {
      styles.left = offset;
    } else if (position.horizontal === 'right') {
      styles.right = offset;
    } else {
      styles.left = '50%';
      styles.transform = 'translateX(-50%)';
    }

    return styles;
  };

  return (
    <Box
      className={className}
      style={{
        ...getPositionStyles(),
        ...style
      }}
      sx={{
        '& > *': {
          pointerEvents: 'auto'
        }
      }}
    >
      <Stack
        spacing={gap}
        sx={{
          maxHeight: `calc(100vh - ${offset} * 2)`,
          overflowY: 'auto',
          direction: dir === 'rtl' ? 'rtl' : 'ltr'
        }}
      >
        {toasts.slice(0, visibleToasts).map((toast) => (
          <SonnerToast
            key={toast.id}
            toast={toast}
            onClose={handleClose}
            richColors={richColors}
            expandByDefault={expanded}
            closeButton={closeButton}
            invert={invert}
            position={position}
            theme={theme}
            icons={icons}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default Sonner;
