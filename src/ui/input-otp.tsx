import React, { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
  Stack,
  Chip,
  alpha,
  CircularProgress,
  FormHelperText,
  FormControl,
  InputLabel,
  Card,
  CardContent
} from '@mui/material';
import {
  Shield,
  Copy,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  Eye,
  EyeOff,
  Zap,
  Lock,
  Key,
  Fingerprint,
  Smartphone,
  Mail
} from 'lucide-react';

interface InputOTPProps {
  length?: number;
  onComplete: (otp: string) => void;
  onChange?: (otp: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  secure?: boolean;
  type?: 'numeric' | 'alphanumeric' | 'alphabetic';
  caseSensitive?: boolean;
  inputMode?: 'text' | 'numeric' | 'tel' | 'url' | 'email' | 'search' | 'none';
  pattern?: string;
  placeholder?: string;
  separator?: React.ReactNode;
  containerClassName?: string;
  inputClassName?: string;
  error?: string;
  hint?: string;
  label?: string;
  required?: boolean;
  loading?: boolean;
  autoSubmit?: boolean;
  resendEnabled?: boolean;
  resendTimeout?: number;
  onResend?: () => void;
  resendLabel?: string;
  verificationMethod?: 'email' | 'sms' | 'authenticator' | 'biometric';
  masked?: boolean;
  copyEnabled?: boolean;
  pasteEnabled?: boolean;
  clearEnabled?: boolean;
  showTimer?: boolean;
  timerDuration?: number;
  onTimerComplete?: () => void;
  customValidation?: (otp: string) => boolean | string;
  successMessage?: string;
  formatDisplay?: (char: string, index: number) => string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
}

export function InputOTP({
  length = 6,
  onComplete,
  onChange,
  disabled = false,
  autoFocus = true,
  secure = false,
  type = 'numeric',
  caseSensitive = false,
  inputMode = 'numeric',
  pattern,
  placeholder = '•',
  separator,
  containerClassName = '',
  inputClassName = '',
  error = '',
  hint = '',
  label = 'Verification Code',
  required = false,
  loading = false,
  autoSubmit = true,
  resendEnabled = true,
  resendTimeout = 30,
  onResend,
  resendLabel = 'Resend code',
  verificationMethod = 'email',
  masked = false,
  copyEnabled = false,
  pasteEnabled = true,
  clearEnabled = true,
  showTimer = true,
  timerDuration = 300,
  onTimerComplete,
  customValidation,
  successMessage = 'Verification successful!',
  formatDisplay,
  ariaLabel = 'One-time password input',
  ariaLabelledBy,
  ariaDescribedBy
}: InputOTPProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPasted, setIsPasted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timerDuration);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isSecure, setIsSecure] = useState(secure);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const getInputPattern = () => {
    if (pattern) return pattern;
    switch (type) {
      case 'numeric':
        return '[0-9]';
      case 'alphabetic':
        return '[A-Za-z]';
      case 'alphanumeric':
        return '[A-Za-z0-9]';
      default:
        return '[0-9]';
    }
  };

  const getInputType = () => {
    if (isSecure) return 'password';
    if (type === 'numeric') return 'tel';
    return 'text';
  };

  useEffect(() => {
    if (autoFocus && !disabled) {
      inputRefs.current[0]?.focus();
    }
  }, [autoFocus, disabled]);

  useEffect(() => {
    if (showTimer && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && onTimerComplete) {
      onTimerComplete();
      setCanResend(true);
    }
  }, [timeLeft, showTimer, onTimerComplete]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const validateOtp = (value: string) => {
    if (customValidation) {
      const result = customValidation(value);
      if (typeof result === 'string') {
        setValidationError(result);
        return false;
      } else if (!result) {
        setValidationError('Invalid verification code');
        return false;
      }
    }
    setValidationError('');
    return true;
  };

  const handleInputChange = (index: number, value: string) => {
    if (disabled || loading) return;

    const newOtp = [...otp];
    const sanitizedValue = caseSensitive ? value : value.toUpperCase();
    
    if (value.length <= 1) {
      newOtp[index] = sanitizedValue;
      setOtp(newOtp);

      const otpString = newOtp.join('');
      onChange?.(otpString);

      // Auto-focus next input
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Check if completed
      if (newOtp.every(char => char !== '')) {
        setIsCompleted(true);
        if (autoSubmit && validateOtp(otpString)) {
          setShowSuccess(true);
          setTimeout(() => {
            onComplete(otpString);
          }, 500);
        }
      }
    }
  };

  const handleInputKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === 'Backspace') {
      e.preventDefault();
      const newOtp = [...otp];
      
      if (otp[index]) {
        newOtp[index] = '';
      } else if (index > 0) {
        newOtp[index - 1] = '';
        inputRefs.current[index - 1]?.focus();
      }
      
      setOtp(newOtp);
      setIsCompleted(false);
      setShowSuccess(false);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    if (!pasteEnabled || disabled) return;

    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    const sanitizedData = caseSensitive ? pastedData : pastedData.toUpperCase();
    
    if (sanitizedData.length === length) {
      const newOtp = sanitizedData.split('');
      setOtp(newOtp);
      setIsPasted(true);
      setIsCompleted(true);
      
      const otpString = newOtp.join('');
      onChange?.(otpString);
      
      if (validateOtp(otpString)) {
        setShowSuccess(true);
        setTimeout(() => {
          onComplete(otpString);
        }, 500);
      }
    }
  };

  const handleCopy = async () => {
    if (!copyEnabled || disabled) return;
    
    try {
      const otpString = otp.join('');
      await navigator.clipboard.writeText(otpString);
    } catch (error) {
      console.error('Failed to copy OTP:', error);
    }
  };

  const handleClear = () => {
    if (!clearEnabled || disabled) return;
    
    setOtp(Array(length).fill(''));
    setIsCompleted(false);
    setIsPasted(false);
    setShowSuccess(false);
    setValidationError('');
    inputRefs.current[0]?.focus();
  };

  const handleResend = async () => {
    if (!canResend || !onResend) return;
    
    setIsResending(true);
    try {
      await onResend();
      setTimeLeft(resendTimeout);
      setCanResend(false);
      setOtp(Array(length).fill(''));
      setIsCompleted(false);
      setShowSuccess(false);
      setValidationError('');
    } catch (error) {
      console.error('Failed to resend code:', error);
    } finally {
      setIsResending(false);
    }
  };

  const getVerificationIcon = () => {
    switch (verificationMethod) {
      case 'email':
        return <Mail size={20} />;
      case 'sms':
        return <Smartphone size={20} />;
      case 'authenticator':
        return <Key size={20} />;
      case 'biometric':
        return <Fingerprint size={20} />;
      default:
        return <Shield size={20} />;
    }
  };

  const getVerificationLabel = () => {
    switch (verificationMethod) {
      case 'email':
        return 'Enter the code sent to your email';
      case 'sms':
        return 'Enter the code sent to your phone';
      case 'authenticator':
        return 'Enter the code from your authenticator app';
      case 'biometric':
        return 'Verify your biometric authentication';
      default:
        return 'Enter the verification code';
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: '1px solid',
        borderColor: error || validationError ? '#f44336' : 'divider',
        background: 'white',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
        }
      }}
    >
      <CardContent sx={{ p: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
              }}
            >
              <Lock size={24} color="white" />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {getVerificationLabel()}
              </Typography>
            </Box>
          </Stack>

          {verificationMethod !== 'biometric' && (
            <Chip
              icon={getVerificationIcon()}
              label={`${length}-digit ${type} code`}
              size="small"
              sx={{
                background: alpha('#667eea', 0.1),
                color: '#667eea',
                fontWeight: 600
              }}
            />
          )}
        </Box>

        {/* OTP Input Fields */}
        {verificationMethod !== 'biometric' && (
          <FormControl
            fullWidth
            error={!!error || !!validationError}
            required={required}
            disabled={disabled}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                flexWrap: 'wrap',
                mb: 2
              }}
            >
              {otp.map((value, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  <TextField
                    inputRef={(el) => (inputRefs.current[index] = el)}
                    value={isSecure && value && !isPasted ? '•' : (formatDisplay ? formatDisplay(value, index) : value)}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleInputKeyDown(index, e)}
                    onPaste={(e) => index === 0 && handlePaste(e)}
                    onFocus={(e) => e.target.select()}
                    disabled={disabled || loading}
                    inputProps={{
                      maxLength: 1,
                      pattern: getInputPattern(),
                      inputMode,
                      'aria-label': `${ariaLabel} digit ${index + 1}`,
                      style: { textAlign: 'center' }
                    }}
                    type={getInputType()}
                    placeholder={placeholder}
                    className={inputClassName}
                    sx={{
                      width: 60,
                      height: 60,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: '#667eea'
                        },
                        '&.Mui-focused': {
                          borderColor: '#667eea',
                          boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.2)'
                        }
                      }
                    }}
                  />
                  {index < length - 1 && separator && (
                    <Box sx={{ position: 'absolute', right: -12, top: '50%', transform: 'translateY(-50%)' }}>
                      {separator}
                    </Box>
                  )}
                </Box>
              ))}
            </Box>

            {/* Action Buttons */}
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              {copyEnabled && isCompleted && (
                <IconButton
                  size="small"
                  onClick={handleCopy}
                  disabled={disabled}
                  sx={{ color: '#667eea' }}
                >
                  <Copy size={16} />
                </IconButton>
              )}
              {clearEnabled && (
                <IconButton
                  size="small"
                  onClick={handleClear}
                  disabled={disabled}
                  sx={{ color: '#f44336' }}
                >
                  <RefreshCw size={16} />
                </IconButton>
              )}
              {isSecure && (
                <IconButton
                  size="small"
                  onClick={() => setIsSecure(!isSecure)}
                  sx={{ color: '#667eea' }}
                >
                  {isSecure ? <Eye size={16} /> : <EyeOff size={16} />}
                </IconButton>
              )}
            </Stack>

            <FormHelperText>
              {error || validationError || hint}
            </FormHelperText>
          </FormControl>
        )}

        {/* Success Message */}
        {showSuccess && successMessage && (
          <Alert
            severity="success"
            icon={<CheckCircle size={20} />}
            sx={{ mb: 2, borderRadius: 2 }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {successMessage}
            </Typography>
          </Alert>
        )}

        {/* Timer and Resend */}
        {showTimer && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            p: 2,
            background: alpha('#667eea', 0.05),
            borderRadius: 2,
            mb: 2
          }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Clock size={16} color="#667eea" />
              <Typography variant="body2" sx={{ color: '#667eea', fontWeight: 600 }}>
                Code expires in: {formatTime(timeLeft)}
              </Typography>
            </Stack>
            {resendEnabled && (
              <Button
                size="small"
                onClick={handleResend}
                disabled={!canResend || isResending}
                startIcon={isResending ? <CircularProgress size={16} /> : <RefreshCw size={16} />}
                sx={{
                  fontWeight: 600,
                  color: '#667eea',
                  '&:hover': {
                    background: alpha('#667eea', 0.1)
                  }
                }}
              >
                {isResending ? 'Sending...' : resendLabel}
              </Button>
            )}
          </Box>
        )}

        {/* Loading State */}
        {loading && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            py: 3
          }}>
            <CircularProgress size={24} sx={{ color: '#667eea' }} />
            <Typography variant="body2" sx={{ ml: 2, color: '#667eea', fontWeight: 600 }}>
              Verifying...
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

// Additional utility components for different verification methods
export function EmailOTPInput(props: Omit<InputOTPProps, 'verificationMethod'>) {
  return <InputOTP {...props} verificationMethod="email" />;
}

export function SMSOTPInput(props: Omit<InputOTPProps, 'verificationMethod'>) {
  return <InputOTP {...props} verificationMethod="sms" />;
}

export function AuthenticatorOTPInput(props: Omit<InputOTPProps, 'verificationMethod'>) {
  return <InputOTP {...props} verificationMethod="authenticator" />;
}

export function BiometricVerification(props: Omit<InputOTPProps, 'verificationMethod'>) {
  return (
    <Card elevation={0} sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider' }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
              animation: 'pulse 2s infinite'
            }}
          >
            <Fingerprint size={40} color="white" />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Biometric Verification
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Please use your biometric authentication to continue
          </Typography>
          <Button
            variant="contained"
            startIcon={<Zap size={18} />}
            sx={{
              borderRadius: 3,
              fontWeight: 600,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
            }}
          >
            Authenticate Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default InputOTP;
