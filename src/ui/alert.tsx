import React, { useState, useCallback, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Collapse,
  Fade,
  Slide,
  Grow,
  Chip,
  LinearProgress,
  alpha,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  Clock,
  RefreshCw,
  ArrowRight,
  AlertCircle,
  Shield,
  FileText,
  Download,
  Upload,
  Bell,
  Settings,
  HelpCircle,
  MessageCircle,
  Activity
} from 'lucide-react';

type AlertType = 'success' | 'error' | 'warning' | 'info' | 'neutral';
type AlertVariant = 'standard' | 'filled' | 'outlined' | 'banner';
type AlertSize = 'small' | 'medium' | 'large';
type AlertPosition = 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
type AlertAnimation = 'fade' | 'slide' | 'grow' | 'none';

interface AlertAction {
  label: string;
  onClick: () => void;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  variant?: 'text' | 'outlined' | 'contained';
  icon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

interface AlertDetails {
  title?: string;
  content: React.ReactNode;
  actions?: AlertAction[];
  expandable?: boolean;
}

interface AlertProps {
  type?: AlertType;
  variant?: AlertVariant;
  size?: AlertSize;
  title?: string;
  message: string;
  icon?: React.ReactNode;
  actions?: AlertAction[];
  onClose?: () => void;
  onAutoClose?: () => void;
  autoClose?: number;
  showProgress?: boolean;
  dismissible?: boolean;
  className?: string;
  style?: React.CSSProperties;
  details?: AlertDetails;
  showDetails?: boolean;
  onDetailsToggle?: (show: boolean) => void;
  banner?: boolean;
  position?: AlertPosition;
  animation?: AlertAnimation;
  duration?: number;
  elevation?: number;
  border?: boolean;
  square?: boolean;
  iconMapping?: Partial<Record<AlertType, React.ReactNode>>;
  closeIcon?: React.ReactNode;
  children?: React.ReactNode;
  renderContent?: (props: AlertProps) => React.ReactNode;
  renderActions?: (actions: AlertAction[]) => React.ReactNode;
  id?: string;
  'data-testid'?: string;
}

interface AlertSystemProps {
  alerts: AlertProps[];
  maxAlerts?: number;
  position?: AlertPosition;
  spacing?: number;
  animation?: AlertAnimation;
  duration?: number;
  onAlertClose?: (id: string) => void;
  container?: HTMLElement | null;
}

interface AlertState {
  id: string;
  props: AlertProps;
  startTime: number;
  remainingTime: number;
  isPaused: boolean;
}

// Default icon mapping
const defaultIconMapping: Record<AlertType, React.ReactNode> = {
  success: <CheckCircle size={20} />,
  error: <AlertTriangle size={20} />,
  warning: <AlertTriangle size={20} />,
  info: <Info size={20} />,
  neutral: <Info size={20} />
};

// Color mapping
const getAlertColors = (type: AlertType, theme: any) => {
  switch (type) {
    case 'success':
      return {
        background: alpha(theme.palette.success.main, 0.08),
        border: theme.palette.success.main,
        icon: theme.palette.success.main,
        text: theme.palette.success.dark
      };
    case 'error':
      return {
        background: alpha(theme.palette.error.main, 0.08),
        border: theme.palette.error.main,
        icon: theme.palette.error.main,
        text: theme.palette.error.dark
      };
    case 'warning':
      return {
        background: alpha(theme.palette.warning.main, 0.08),
        border: theme.palette.warning.main,
        icon: theme.palette.warning.main,
        text: theme.palette.warning.dark
      };
    case 'info':
      return {
        background: alpha(theme.palette.info.main, 0.08),
        border: theme.palette.info.main,
        icon: theme.palette.info.main,
        text: theme.palette.info.dark
      };
    default:
      return {
        background: alpha(theme.palette.grey[500], 0.08),
        border: theme.palette.grey[400],
        icon: theme.palette.grey[600],
        text: theme.palette.grey[800]
      };
  }
};

function AlertActionButton({ action, type }: { action: AlertAction; type: AlertType }) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(async () => {
    if (action.disabled || loading) return;

    try {
      setLoading(true);
      await action.onClick();
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setLoading(false);
    }
  }, [action, loading]);

  const buttonColor = action.color || (type === 'error' ? 'error' : 'primary');

  return (
    <Box
      component="button"
      onClick={handleClick}
      disabled={action.disabled || loading}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        px: 2,
        py: 0.75,
        borderRadius: 1,
        border: 'none',
        backgroundColor: 
          action.variant === 'contained' 
            ? theme.palette[buttonColor].main 
            : 'transparent',
        color: 
          action.variant === 'contained' 
            ? theme.palette[buttonColor].contrastText 
            : theme.palette[buttonColor].main,
        fontSize: '0.875rem',
        fontWeight: 600,
        cursor: action.disabled || loading ? 'not-allowed' : 'pointer',
        opacity: action.disabled || loading ? 0.6 : 1,
        transition: 'all 0.2s ease',
        '&:hover:not(:disabled)': {
          backgroundColor: 
            action.variant === 'contained' 
              ? theme.palette[buttonColor].dark 
              : alpha(theme.palette[buttonColor].main, 0.08)
        },
        '&:active:not(:disabled)': {
          transform: 'scale(0.98)'
        }
      }}
    >
      {loading ? (
        <Box
          sx={{
            width: 12,
            height: 12,
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}
        />
      ) : action.icon}
      <span>{action.label}</span>
    </Box>
  );
}

function AlertProgress({ duration, autoClose }: { duration: number; autoClose: number }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, autoClose - elapsed);
      const newProgress = (remaining / autoClose) * 100;
      
      setProgress(newProgress);
      
      if (remaining > 0) {
        requestAnimationFrame(updateProgress);
      }
    };

    const animationId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationId);
  }, [duration, autoClose]);

  return (
    <LinearProgress
      variant="determinate"
      value={progress}
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: 'transparent',
        '& .MuiLinearProgress-bar': {
          backgroundColor: 'currentColor',
          transition: 'none'
        }
      }}
    />
  );
}

export function Alert({
  type = 'info',
  variant = 'standard',
  size = 'medium',
  title,
  message,
  icon,
  actions,
  onClose,
  onAutoClose,
  autoClose,
  showProgress = false,
  dismissible = true,
  className,
  style,
  details,
  showDetails: initialShowDetails = false,
  onDetailsToggle,
  banner = false,
  elevation = 2,
  border = true,
  square = false,
  iconMapping,
  closeIcon,
  children,
  renderContent,
  renderActions,
  id,
  'data-testid': dataTestId
}: AlertProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showDetails, setShowDetails] = useState(initialShowDetails);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [remainingTime, setRemainingTime] = useState(autoClose || 0);
  const autoCloseTimer = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef<number>(0);

  const colors = getAlertColors(type, theme);
  const displayIcon = icon || (iconMapping?.[type] ?? defaultIconMapping[type]);

  // Auto-close functionality
  useEffect(() => {
    if (!autoClose || isPaused) return;

    startTime.current = Date.now();
    
    const updateTimer = () => {
      const elapsed = Date.now() - startTime.current;
      const remaining = Math.max(0, autoClose - elapsed);
      
      setRemainingTime(remaining);
      
      if (remaining === 0) {
        handleAutoClose();
      } else {
        autoCloseTimer.current = setTimeout(updateTimer, 100);
      }
    };

    autoCloseTimer.current = setTimeout(updateTimer, 100);
    
    return () => {
      if (autoCloseTimer.current) {
        clearTimeout(autoCloseTimer.current);
      }
    };
  }, [autoClose, isPaused]);

  const handleAutoClose = useCallback(() => {
    setIsVisible(false);
    onAutoClose?.();
  }, [onAutoClose]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    onClose?.();
  }, [onClose]);

  const handleDetailsToggle = useCallback(() => {
    const newShowDetails = !showDetails;
    setShowDetails(newShowDetails);
    onDetailsToggle?.(newShowDetails);
  }, [showDetails, onDetailsToggle]);

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: theme.spacing(1, 1.5),
          fontSize: '0.8125rem',
          iconSize: 16
        };
      case 'large':
        return {
          padding: theme.spacing(2.5, 3),
          fontSize: '1rem',
          iconSize: 24
        };
      default:
        return {
          padding: theme.spacing(1.5, 2),
          fontSize: '0.875rem',
          iconSize: 20
        };
    }
  };

  const getVariantStyles = () => {
    const baseStyles = {
      backgroundColor: colors.background,
      color: colors.text,
      borderRadius: square ? 0 : theme.shape.borderRadius,
      boxShadow: elevation ? theme.shadows[elevation] : 'none'
    };

    switch (variant) {
      case 'filled':
        return {
          ...baseStyles,
          backgroundColor: colors.icon,
          color: theme.palette.getContrastText(colors.icon)
        };
      case 'outlined':
        return {
          ...baseStyles,
          border: border ? `1px solid ${colors.border}` : 'none'
        };
      case 'banner':
        return {
          ...baseStyles,
          borderRadius: 0,
          borderLeft: border ? `4px solid ${colors.border}` : 'none',
          borderRight: border ? `4px solid ${colors.border}` : 'none'
        };
      default:
        return {
          ...baseStyles,
          border: border ? `1px solid ${colors.border}` : 'none'
        };
    }
  };

  // Content rendering
  const renderAlertContent = () => {
    if (renderContent) {
      return renderContent({
        type,
        variant,
        size,
        title,
        message,
        icon,
        actions,
        onClose,
        onAutoClose,
        autoClose,
        showProgress,
        dismissible,
        className,
        style,
        details,
        showDetails,
        onDetailsToggle,
        banner,
        elevation,
        border,
        square,
        iconMapping,
        closeIcon,
        children,
        renderContent,
        renderActions,
        id,
        'data-testid': dataTestId
      });
    }

    return (
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
        {/* Icon */}
        {displayIcon && (
          <Box
            sx={{
              color: colors.icon,
              flexShrink: 0,
              mt: 0.25,
              fontSize: getSizeStyles().iconSize
            }}
          >
            {displayIcon}
          </Box>
        )}

        {/* Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Title */}
          {title && (
            <Typography
              variant="subtitle2"
              component="div"
              sx={{
                fontWeight: 600,
                mb: 0.5,
                color: variant === 'filled' ? 'inherit' : colors.text
              }}
            >
              {title}
            </Typography>
          )}

          {/* Message */}
          <Typography
            variant="body2"
            component="div"
            sx={{
              color: variant === 'filled' ? 'inherit' : colors.text,
              wordBreak: 'break-word'
            }}
          >
            {message}
          </Typography>

          {/* Children */}
          {children}

          {/* Details */}
          {details && (
            <Box sx={{ mt: 1.5 }}>
              <Box
                component="button"
                onClick={handleDetailsToggle}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                  background: 'none',
                  border: 'none',
                  color: colors.icon,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0,
                  '&:hover': {
                    color: colors.text
                  }
                }}
              >
                {showDetails ? 'Hide details' : 'Show details'}
                <ArrowRight
                  size={14}
                  style={{
                    transform: showDetails ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }}
                />
              </Box>

              {showDetails && (
                <Collapse in={showDetails} timeout="auto">
                  <Box
                    sx={{
                      mt: 1.5,
                      p: 1.5,
                      backgroundColor: alpha(colors.icon, 0.08),
                      borderRadius: 1,
                      border: `1px solid ${alpha(colors.border, 0.3)}`
                    }}
                  >
                    {details.title && (
                      <Typography
                        variant="subtitle2"
                        sx={{ mb: 1, fontWeight: 600, color: colors.text }}
                      >
                        {details.title}
                      </Typography>
                    )}
                    <Box sx={{ color: colors.text }}>
                      {details.content}
                    </Box>
                    {details.actions && details.actions.length > 0 && (
                      <Box sx={{ display: 'flex', gap: 1, mt: 1.5, flexWrap: 'wrap' }}>
                        {details.actions.map((action, index) => (
                          <AlertActionButton
                            key={index}
                            action={action}
                            type={type}
                          />
                        ))}
                      </Box>
                    )}
                  </Box>
                </Collapse>
              )}
            </Box>
          )}

          {/* Actions */}
          {actions && actions.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1, mt: 1.5, flexWrap: 'wrap' }}>
              {renderActions
                ? renderActions(actions)
                : actions.map((action, index) => (
                    <AlertActionButton
                      key={index}
                      action={action}
                      type={type}
                    />
                  ))}
            </Box>
          )}
        </Box>

        {/* Close button */}
        {dismissible && onClose && (
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{
              color: variant === 'filled' ? 'inherit' : colors.text,
              opacity: 0.7,
              '&:hover': {
                opacity: 1,
                backgroundColor: alpha(colors.icon, 0.1)
              }
            }}
          >
            {closeIcon || <X size={16} />}
          </IconButton>
        )}
      </Box>
    );
  };

  if (!isVisible) return null;

  const alertContent = (
    <Box
      className={className}
      style={style}
      sx={{
        position: 'relative',
        ...getVariantStyles(),
        ...getSizeStyles(),
        width: '100%',
        '&:hover': autoClose ? {
          cursor: 'pointer'
        } : {},
        '&:focus-within': {
          outline: `2px solid ${colors.icon}`,
          outlineOffset: 2
        }
      }}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      data-testid={dataTestId}
      id={id}
      onMouseEnter={() => autoClose && setIsPaused(true)}
      onMouseLeave={() => autoClose && setIsPaused(false)}
      onClick={autoClose ? handleAutoClose : undefined}
      tabIndex={0}
    >
      {renderAlertContent()}

      {/* Progress indicator */}
      {autoClose && showProgress && (
        <AlertProgress duration={transitionDuration} autoClose={autoClose} />
      )}
    </Box>
  );

  // Animation wrapper
  if (banner) {
    return alertContent;
  }

  const AnimationComponent = {
    fade: Fade,
    slide: Slide,
    grow: Grow,
    none: React.Fragment
  }[type === 'error' || type === 'success' ? 'fade' : 'slide'];

  const animationProps = {
    fade: { timeout: 300, in: true },
    slide: { timeout: 300, in: true, direction: 'down' as const },
    grow: { timeout: 300, in: true },
    none: {}
  }[type === 'error' || type === 'success' ? 'fade' : 'slide'];

  return (
    <AnimationComponent {...animationProps}>
      {alertContent}
    </AnimationComponent>
  );
}

/* ============================
 * Alert System Component
 * ============================
 */

export function AlertSystem({
  alerts,
  maxAlerts = 3,
  position = 'top-right',
  spacing = 8,
  animation = 'slide',
  duration = 300,
  onAlertClose,
  container
}: AlertSystemProps) {
  const theme = useTheme();
  const [alertStates, setAlertStates] = useState<AlertState[]>([]);

  // Add new alerts
  useEffect(() => {
    const newAlerts = alerts.slice(-maxAlerts).map(alert => ({
      id: alert.id || Math.random().toString(36).substr(2, 9),
      props: alert,
      startTime: Date.now(),
      remainingTime: alert.autoClose || 0,
      isPaused: false
    }));

    setAlertStates(prev => {
      const existingIds = new Set(prev.map(state => state.id));
      const filteredNewAlerts = newAlerts.filter(alert => !existingIds.has(alert.id));
      return [...prev, ...filteredNewAlerts].slice(-maxAlerts);
    });
  }, [alerts, maxAlerts]);

  // Handle alert close
  const handleAlertClose = useCallback((id: string) => {
    setAlertStates(prev => prev.filter(state => state.id !== id));
    onAlertClose?.(id);
  }, [onAlertClose]);

  // Position styles
  const getPositionStyles = () => {
    const positions = {
      'top': { top: spacing, left: '50%', transform: 'translateX(-50%)' },
      'bottom': { bottom: spacing, left: '50%', transform: 'translateX(-50%)' },
      'top-left': { top: spacing, left: spacing },
      'top-right': { top: spacing, right: spacing },
      'bottom-left': { bottom: spacing, left: spacing },
      'bottom-right': { bottom: spacing, right: spacing }
    };
    return positions[position];
  };

  const containerElement = container || document.body;

  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: theme.zIndex.snackbar,
        ...getPositionStyles(),
        display: 'flex',
        flexDirection: position.includes('bottom') ? 'column-reverse' : 'column',
        gap: 1,
        maxWidth: 400,
        width: '100%',
        pointerEvents: 'none'
      }}
    >
      {alertStates.map((alertState, index) => (
        <Box
          key={alertState.id}
          sx={{
            pointerEvents: 'auto',
            animation: `${animation} ${duration}ms ease-out`
          }}
          style={{
            animationDelay: `${index * 100}ms`
          }}
        >
          <Alert
            {...alertState.props}
            onClose={() => handleAlertClose(alertState.id)}
            onAutoClose={() => handleAlertClose(alertState.id)}
            banner={false}
            className={alertState.props.className}
          />
        </Box>
      ))}
    </Box>
  );
}

/* ============================
 * Specialized Alert Components
 * ============================
 */

interface ToastProps extends Omit<AlertProps, 'banner' | 'position' | 'animation'> {
  id?: string;
  position?: AlertPosition;
  duration?: number;
}

export function Toast({
  id,
  position = 'top-right',
  duration = 300,
  ...alertProps
}: ToastProps) {
  return (
    <AlertSystem
      alerts={[{ ...alertProps, id }]}
      position={position}
      animation="slide"
      duration={duration}
      maxAlerts={1}
    />
  );
}

interface NotificationBannerProps {
  type: AlertType;
  message: string;
  title?: string;
  icon?: React.ReactNode;
  actions?: AlertAction[];
  onClose?: () => void;
  persistent?: boolean;
}

export function NotificationBanner({
  type,
  message,
  title,
  icon,
  actions,
  onClose,
  persistent = false
}: NotificationBannerProps) {
  return (
    <Alert
      type={type}
      variant="banner"
      message={message}
      title={title}
      icon={icon}
      actions={actions}
      onClose={onClose}
      dismissible={!persistent}
      banner={true}
      square={true}
      autoClose={persistent ? undefined : 5000}
    />
  );
}

interface FormAlertProps {
  type: AlertType;
  message: string;
  field?: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}

export function FormAlert({
  type,
  message,
  field,
  onRetry,
  onDismiss
}: FormAlertProps) {
  const actions: AlertAction[] = [];
  
  if (onRetry) {
    actions.push({
      label: 'Retry',
      onClick: onRetry,
      color: 'primary',
      variant: 'text'
    });
  }
  
  if (onDismiss) {
    actions.push({
      label: 'Dismiss',
      onClick: onDismiss,
      color: 'default',
      variant: 'text'
    });
  }

  return (
    <Alert
      type={type}
      variant="outlined"
      size="small"
      message={message}
      title={field ? `${field} error` : undefined}
      actions={actions}
      onClose={onDismiss}
      dismissible={!!onDismiss}
      iconMapping={{
        error: <AlertCircle size={16} />,
        warning: <AlertTriangle size={16} />,
        info: <Info size={16} />,
        success: <CheckCircle size={16} />
      }}
    />
  );
}

interface StatusIndicatorProps {
  status: 'loading' | 'success' | 'error' | 'warning' | 'info';
  message: string;
  size?: 'small' | 'medium' | 'large';
  inline?: boolean;
}

export function StatusIndicator({
  status,
  message,
  size = 'medium',
  inline = false
}: StatusIndicatorProps) {
  const type: AlertType = status === 'loading' ? 'info' : status;
  
  return (
    <Alert
      type={type}
      variant="standard"
      size={size}
      message={message}
      iconMapping={{
        loading: <Box className="animate-spin" sx={{ animation: 'spin 1s linear infinite' }} />,
        success: <CheckCircle size={16} />,
        error: <AlertTriangle size={16} />,
        warning: <AlertTriangle size={16} />,
        info: <Info size={16} />
      }}
      className={inline ? 'inline-alert' : ''}
    />
  );
}

/* ============================
 * Export Default
 * ============================
 */

export default Alert;
