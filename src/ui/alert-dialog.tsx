import React, { useState, useCallback, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  Typography,
  Divider,
  Stack,
  Alert,
  alpha,
  useTheme,
  useMediaQuery,
  Fade,
  Backdrop,
  CircularProgress
} from '@mui/material';
import {
  X,
  AlertTriangle,
  CheckCircle,
  Info,
  HelpCircle,
  Shield,
  Clock,
  FileText,
  Download,
  Upload,
  RefreshCw,
  Ban,
  Check
} from 'lucide-react';

type AlertType = 'info' | 'success' | 'warning' | 'error' | 'confirm' | 'destructive';
type AlertVariant = 'default' | 'outlined' | 'filled';

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void | Promise<void>;
  title: string;
  description?: string;
  type?: AlertType;
  variant?: AlertVariant;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  showClose?: boolean;
  disableBackdropClick?: boolean;
  disableEscapeKey?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  fullWidth?: boolean;
  fullScreen?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  paperClassName?: string;
  autoFocus?: boolean;
  transitionDuration?: number;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  primaryAction?: {
    text: string;
    onClick: () => void | Promise<void>;
    disabled?: boolean;
    loading?: boolean;
    variant?: 'text' | 'outlined' | 'contained';
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
  };
  secondaryAction?: {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    variant?: 'text' | 'outlined' | 'contained';
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
  };
  details?: {
    title?: string;
    content: React.ReactNode;
    expandable?: boolean;
  };
  showDetails?: boolean;
  onDetailsToggle?: (show: boolean) => void;
}

interface AlertDialogButtonProps {
  action: {
    text: string;
    onClick: () => void | Promise<void>;
    disabled?: boolean;
    loading?: boolean;
    variant?: 'text' | 'outlined' | 'contained';
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
  };
  onClose: () => void;
  type: AlertType;
}

function AlertDialogButton({ action, onClose, type }: AlertDialogButtonProps) {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleClick = useCallback(async () => {
    if (action.disabled || loading) return;

    try {
      setLoading(true);
      await action.onClick();
      onClose();
    } catch (error) {
      console.error('Action failed:', error);
      setLoading(false);
    }
  }, [action, loading, onClose]);

  const getButtonColor = () => {
    if (action.color) return action.color;
    
    switch (type) {
      case 'error':
      case 'destructive':
        return 'error';
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'primary';
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={action.disabled || loading}
      variant={action.variant || (type === 'destructive' ? 'contained' : 'contained')}
      color={getButtonColor()}
      startIcon={loading ? <CircularProgress size={16} /> : action.startIcon}
      endIcon={action.endIcon}
      sx={{
        minWidth: 100,
        fontWeight: 600,
        textTransform: 'none',
        borderRadius: 2,
        px: 3,
        py: 1,
        ...(type === 'destructive' && {
          backgroundColor: theme.palette.error.main,
          '&:hover': {
            backgroundColor: theme.palette.error.dark
          }
        })
      }}
    >
      {action.text}
    </Button>
  );
}

export function AlertDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  type = 'info',
  variant = 'default',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  showCancel = true,
  showClose = true,
  disableBackdropClick = false,
  disableEscapeKey = false,
  maxWidth = 'sm',
  fullWidth = true,
  fullScreen: forceFullScreen = false,
  loading = false,
  icon,
  children,
  actions,
  className,
  contentClassName,
  paperClassName,
  autoFocus = true,
  transitionDuration = 300,
  ariaLabelledBy,
  ariaDescribedBy,
  primaryAction,
  secondaryAction,
  details,
  showDetails: initialShowDetails = false,
  onDetailsToggle
}: AlertDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const fullScreen = forceFullScreen || isMobile;
  const [showDetails, setShowDetails] = useState(initialShowDetails);
  const [localLoading, setLocalLoading] = useState(false);

  const handleClose = useCallback((event?: React.SyntheticEvent, reason?: string) => {
    if (loading || localLoading) return;
    
    if (reason === 'backdropClick' && disableBackdropClick) return;
    if (reason === 'escapeKeyDown' && disableEscapeKey) return;
    
    onClose();
  }, [onClose, loading, localLoading, disableBackdropClick, disableEscapeKey]);

  const handleConfirm = useCallback(async () => {
    if (loading || localLoading) return;

    try {
      setLocalLoading(true);
      await onConfirm?.();
      handleClose();
    } catch (error) {
      console.error('Confirmation failed:', error);
      setLocalLoading(false);
    }
  }, [onConfirm, handleClose, loading, localLoading]);

  const getIcon = () => {
    if (icon) return icon;
    
    switch (type) {
      case 'success':
        return <CheckCircle size={24} />;
      case 'warning':
        return <AlertTriangle size={24} />;
      case 'error':
        return <AlertTriangle size={24} />;
      case 'destructive':
        return <Shield size={24} />;
      case 'confirm':
        return <HelpCircle size={24} />;
      default:
        return <Info size={24} />;
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return theme.palette.success.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'error':
      case 'destructive':
        return theme.palette.error.main;
      case 'confirm':
        return theme.palette.info.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          border: `2px solid ${getIconColor()}`,
          backgroundColor: 'transparent'
        };
      case 'filled':
        return {
          border: 'none',
          backgroundColor: alpha(getIconColor(), 0.08)
        };
      default:
        return {
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper
        };
    }
  };

  const getHeaderIcon = () => {
    if (type === 'info' && !icon) return null;
    
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 48,
          height: 48,
          borderRadius: '50%',
          backgroundColor: alpha(getIconColor(), 0.1),
          color: getIconColor(),
          mr: 2,
          flexShrink: 0
        }}
      >
        {getIcon()}
      </Box>
    );
  };

  const handleDetailsToggle = useCallback(() => {
    const newShowDetails = !showDetails;
    setShowDetails(newShowDetails);
    onDetailsToggle?.(newShowDetails);
  }, [showDetails, onDetailsToggle]);

  // Auto-focus management
  useEffect(() => {
    if (open && autoFocus) {
      const timer = setTimeout(() => {
        const firstButton = document.querySelector('[role="dialog"] button') as HTMLButtonElement;
        if (firstButton) {
          firstButton.focus();
        }
      }, transitionDuration);
      
      return () => clearTimeout(timer);
    }
  }, [open, autoFocus, transitionDuration]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      className={className}
      PaperProps={{
        className: paperClassName,
        sx: {
          borderRadius: fullScreen ? 0 : 3,
          ...getVariantStyles(),
          ...(loading && {
            pointerEvents: 'none'
          })
        }
      }}
      BackdropProps={{
        sx: {
          backgroundColor: alpha(theme.palette.common.black, 0.5),
          backdropFilter: 'blur(4px)'
        }
      }}
      TransitionComponent={Fade}
      transitionDuration={transitionDuration}
      disableBackdropClick={disableBackdropClick}
      disableEscapeKeyDown={disableEscapeKey}
      aria-labelledby={ariaLabelledBy || 'alert-dialog-title'}
      aria-describedby={ariaDescribedBy || 'alert-dialog-description'}
    >
      {/* Loading Overlay */}
      {(loading || localLoading) && (
        <Backdrop
          open={true}
          sx={{
            position: 'absolute',
            zIndex: theme.zIndex.modal + 1,
            color: '#fff',
            backgroundColor: alpha(theme.palette.common.black, 0.3)
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      {/* Header */}
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          pb: description ? 1 : 2,
          pr: showClose ? 6 : 3
        }}
      >
        {getHeaderIcon()}
        
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontWeight: 600,
              color: type === 'destructive' ? theme.palette.error.main : 'text.primary'
            }}
          >
            {title}
          </Typography>
        </Box>

        {showClose && (
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'text.secondary'
            }}
            disabled={loading || localLoading}
          >
            <X size={20} />
          </IconButton>
        )}
      </DialogTitle>

      {/* Content */}
      <DialogContent
        className={contentClassName}
        sx={{
          pt: description ? 2 : 1,
          pb: 3
        }}
      >
        {description && (
          <Typography
            id="alert-dialog-description"
            variant="body1"
            color="text.secondary"
            sx={{ mb: children ? 2 : 0 }}
          >
            {description}
          </Typography>
        )}

        {children}

        {/* Details Section */}
        {details && (
          <Box sx={{ mt: 2 }}>
            <Button
              size="small"
              onClick={handleDetailsToggle}
              endIcon={showDetails ? <Minus size={16} /> : <Plus size={16} />}
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </Button>
            
            {showDetails && (
              <Fade in={showDetails} timeout={200}>
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    backgroundColor: alpha(theme.palette.grey[100], 0.5),
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`
                  }}
                >
                  {details.title && (
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                      {details.title}
                    </Typography>
                  )}
                  <Box sx={{ color: 'text.secondary' }}>
                    {details.content}
                  </Box>
                </Box>
              </Fade>
            )}
          </Box>
        )}
      </DialogContent>

      {/* Actions */}
      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          pt: 2,
          gap: 1.5,
          flexWrap: 'wrap'
        }}
      >
        {actions ? (
          actions
        ) : (
          <>
            {/* Secondary Action */}
            {showCancel && secondaryAction && (
              <AlertDialogButton
                action={secondaryAction}
                onClose={handleClose}
                type={type}
              />
            )}
            
            {/* Primary Action */}
            {primaryAction ? (
              <AlertDialogButton
                action={primaryAction}
                onClose={handleClose}
                type={type}
              />
            ) : onConfirm ? (
              <AlertDialogButton
                action={{
                  text: confirmText,
                  onClick: handleConfirm,
                  disabled: loading || localLoading,
                  loading: loading || localLoading
                }}
                onClose={handleClose}
                type={type}
              />
            ) : null}
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

/* ============================
 * Specialized Alert Dialogs
 * ============================
 */

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
}

export function ConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  destructive = false
}: ConfirmationDialogProps) {
  return (
    <AlertDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      description={description}
      type={destructive ? 'destructive' : 'confirm'}
      confirmText={confirmText}
      cancelText={cancelText}
      maxWidth="xs"
    />
  );
}

interface ErrorDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  error: {
    message: string;
    details?: string;
    code?: string;
  };
  onRetry?: () => void;
}

export function ErrorDialog({
  open,
  onClose,
  title,
  error,
  onRetry
}: ErrorDialogProps) {
  return (
    <AlertDialog
      open={open}
      onClose={onClose}
      title={title}
      type="error"
      maxWidth="sm"
      primaryAction={
        onRetry
          ? {
              text: 'Retry',
              onClick: onRetry,
              variant: 'outlined'
            }
          : undefined
      }
      secondaryAction={{
        text: 'Close',
        onClick: onClose,
        variant: 'text'
      }}
    >
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {error.message}
      </Typography>
      
      {error.details && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.details}
        </Alert>
      )}
      
      {error.code && (
        <Typography variant="caption" color="text.secondary">
          Error Code: {error.code}
        </Typography>
      )}
    </AlertDialog>
  );
}

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onContinue?: () => void;
  continueText?: string;
  autoClose?: number;
}

export function SuccessDialog({
  open,
  onClose,
  title,
  message,
  onContinue,
  continueText = 'Continue',
  autoClose
}: SuccessDialogProps) {
  useEffect(() => {
    if (autoClose && open) {
      const timer = setTimeout(() => {
        onClose();
        onContinue?.();
      }, autoClose);
      
      return () => clearTimeout(timer);
    }
  }, [open, autoClose, onClose, onContinue]);

  return (
    <AlertDialog
      open={open}
      onClose={onClose}
      title={title}
      type="success"
      maxWidth="xs"
      showCancel={false}
      primaryAction={
        onContinue
          ? {
              text: continueText,
              onClick: onContinue
            }
          : {
              text: 'OK',
              onClick: onClose
            }
      }
    >
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </AlertDialog>
  );
}

interface FileUploadDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void | Promise<void>;
  title?: string;
  description?: string;
  maxFiles?: number;
  maxSize?: number;
  acceptedTypes?: string[];
  multiple?: boolean;
}

export function FileUploadDialog({
  open,
  onClose,
  onUpload,
  title = 'Upload Files',
  description = 'Select files to upload',
  maxFiles = 5,
  maxSize = 25 * 1024 * 1024, // 25MB
  acceptedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.png'],
  multiple = true
}: FileUploadDialogProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const newErrors: string[] = [];
    const validFiles: File[] = [];

    selectedFiles.forEach(file => {
      if (file.size > maxSize) {
        newErrors.push(`${file.name} exceeds maximum size of ${maxSize / (1024 * 1024)}MB`);
      } else if (files.length + validFiles.length >= maxFiles) {
        newErrors.push(`Maximum ${maxFiles} files allowed`);
      } else {
        validFiles.push(file);
      }
    });

    setErrors(newErrors);
    setFiles(prev => [...prev, ...validFiles]);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    try {
      setUploading(true);
      await onUpload(files);
      onClose();
      setFiles([]);
      setErrors([]);
    } catch (error) {
      setErrors(['Upload failed. Please try again.']);
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <AlertDialog
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      type="info"
      maxWidth="md"
      fullWidth
      loading={uploading}
      primaryAction={{
        text: 'Upload',
        onClick: handleUpload,
        disabled: files.length === 0,
        startIcon: <Upload size={16} />
      }}
      secondaryAction={{
        text: 'Cancel',
        onClick: onClose,
        variant: 'text'
      }}
    >
      <Box sx={{ mb: 3 }}>
        <input
          type="file"
          multiple={multiple}
          onChange={handleFileSelect}
          accept={acceptedTypes.join(',')}
          style={{ display: 'none' }}
          id="file-upload-dialog"
        />
        <label htmlFor="file-upload-dialog">
          <Button
            variant="outlined"
            component="span"
            fullWidth
            startIcon={<Upload size={16} />}
            sx={{ mb: 2 }}
          >
            Choose Files
          </Button>
        </label>

        {errors.length > 0 && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.map((error, index) => (
              <Typography key={index} variant="body2">
                • {error}
              </Typography>
            ))}
          </Alert>
        )}

        {files.length > 0 && (
          <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
            {files.map((file, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1.5,
                  mb: 1,
                  backgroundColor: 'action.hover',
                  borderRadius: 1
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FileText size={16} />
                  <Box>
                    <Typography variant="body2" noWrap>
                      {file.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {(file.size / (1024 * 1024)).toFixed(1)} MB
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  size="small"
                  onClick={() => removeFile(index)}
                  color="error"
                >
                  <X size={14} />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Typography variant="caption" color="text.secondary">
        Accepted formats: {acceptedTypes.join(', ')}
        <br />
        Maximum size: {maxSize / (1024 * 1024)}MB per file
        <br />
        Maximum files: {maxFiles}
      </Typography>
    </AlertDialog>
  );
}

/* ============================
 * Export Default
 * ============================
 */

export default AlertDialog;
