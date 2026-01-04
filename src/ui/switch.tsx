import React, { useState, useEffect } from 'react';
import {
  Box,
  Switch as MuiSwitch,
  Typography,
  Stack,
  Chip,
  Tooltip,
  alpha,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material';
import {
  ToggleLeft,
  ToggleRight,
  Settings,
  Zap,
  Shield,
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart3,
  CheckCircle,
  XCircle,
  Clock,
  Power,
  PowerOff,
  Sun,
  Moon,
  Lock,
  Unlock,
  Bell,
  BellOff,
  Eye,
  EyeOff,
  Wifi,
  WifiOff,
  Bluetooth,
  BluetoothOff,
  Volume2,
  VolumeX
} from 'lucide-react';

interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  variant?: 'default' | 'toggle' | 'card' | 'button' | 'ios' | 'android';
  showIcon?: boolean;
  iconOn?: React.ReactNode;
  iconOff?: React.ReactNode;
  showStatus?: boolean;
  showAnalytics?: boolean;
  analytics?: {
    enabledCount: number;
    disabledCount: number;
    totalSwitches: number;
    averageResponseTime: number;
  };
  loading?: boolean;
  loadingText?: string;
  sound?: boolean;
  soundOn?: string;
  soundOff?: string;
  showTimer?: boolean;
  timerDuration?: number;
  onTimerEnd?: () => void;
  showLock?: boolean;
  locked?: boolean;
  lockReason?: string;
  showConfirmation?: boolean;
  confirmationMessage?: string;
  showProgress?: boolean;
  progressValue?: number;
  showBadge?: boolean;
  badgeContent?: string | number;
  badgeColor?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  showPulse?: boolean;
  pulseColor?: string;
  customStyles?: {
    backgroundColor?: string;
    activeColor?: string;
    inactiveColor?: string;
    borderRadius?: number;
  };
  presetStates?: Array<{
    label: string;
    checked: boolean;
    description?: string;
    icon?: React.ReactNode;
  }>;
  showPresets?: boolean;
  onPresetChange?: (preset: any) => void;
  groupLabel?: string;
  switches?: Array<{
    id: string;
    label: string;
    checked: boolean;
    description?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
  }>;
  showGroup?: boolean;
  onGroupChange?: (switches: any[]) => void;
}

export function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  label = 'Switch',
  description,
  disabled = false,
  size = 'medium',
  color = 'primary',
  variant = 'default',
  showIcon = true,
  iconOn,
  iconOff,
  showStatus = false,
  showAnalytics = false,
  analytics,
  loading = false,
  loadingText = 'Processing...',
  sound = false,
  soundOn = 'Switch activated',
  soundOff = 'Switch deactivated',
  showTimer = false,
  timerDuration = 5000,
  onTimerEnd,
  showLock = false,
  locked = false,
  lockReason = 'This switch is locked',
  showConfirmation = false,
  confirmationMessage = 'Are you sure you want to change this setting?',
  showProgress = false,
  progressValue = 0,
  showBadge = false,
  badgeContent,
  badgeColor = 'primary',
  showPulse = false,
  pulseColor = '#43e97b',
  customStyles,
  presetStates = [],
  showPresets = false,
  onPresetChange,
  groupLabel,
  switches = [],
  showGroup = false,
  onGroupChange
}: SwitchProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const [checked, setChecked] = useState(controlledChecked !== undefined ? controlledChecked : internalChecked);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingChange, setPendingChange] = useState<boolean | null>(null);
  const [timerProgress, setTimerProgress] = useState(100);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (controlledChecked !== undefined) {
      setChecked(controlledChecked);
    }
  }, [controlledChecked]);

  useEffect(() => {
    if (showTimer && checked && timerDuration > 0) {
      const interval = setInterval(() => {
        setTimerProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            if (onTimerEnd) {
              onTimerEnd();
            }
            return 0;
          }
          return prev - (100 / (timerDuration / 100));
        });
      }, 100);

      return () => clearInterval(interval);
    } else {
      setTimerProgress(100);
    }
  }, [checked, showTimer, timerDuration, onTimerEnd]);

  const playSound = (isChecked: boolean) => {
    if (sound && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        isChecked ? soundOn : soundOff
      );
      utterance.volume = 0.5;
      utterance.rate = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const getColorGradient = (color: string, checked: boolean) => {
    const baseColors = {
      primary: checked ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)',
      secondary: checked ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' : 'linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)',
      success: checked ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' : 'linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)',
      error: checked ? 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)' : 'linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)',
      warning: checked ? 'linear-gradient(135deg, #ffa726 0%, #ff9800 100%)' : 'linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)',
      info: checked ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' : 'linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)'
    };
    return baseColors[color] || baseColors.primary;
  };

  const getVariantStyles = (variant: string, checked: boolean) => {
    switch (variant) {
      case 'toggle':
        return {
          width: 60,
          height: 30,
          borderRadius: 15,
          background: checked ? getColorGradient(color, checked) : alpha('#666', 0.3),
          position: 'relative' as const,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        };
      case 'card':
        return {
          width: '100%',
          minHeight: 80,
          borderRadius: 3,
          background: checked ? alpha('#43e97b', 0.05) : 'white',
          border: `2px solid ${checked ? '#43e97b' : alpha('#666', 0.2)}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: loading || locked ? 'not-allowed' : 'pointer'
        };
      case 'button':
        return {
          borderRadius: 3,
          background: checked ? getColorGradient(color, checked) : alpha('#666', 0.1),
          color: checked ? 'white' : '#666',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: loading || locked ? 'not-allowed' : 'pointer'
        };
      case 'ios':
        return {
          width: 50,
          height: 30,
          borderRadius: 15,
          background: checked ? '#43e97b' : alpha('#666', 0.3),
          position: 'relative' as const,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        };
      case 'android':
        return {
          width: 36,
          height: 20,
          borderRadius: 10,
          background: checked ? '#667eea' : alpha('#666', 0.3),
          position: 'relative' as const,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        };
      default:
        return {};
    }
  };

  const getSwitchSize = () => {
    switch (size) {
      case 'small':
        return { width: 36, height: 20, thumbSize: 14 };
      case 'large':
        return { width: 60, height: 34, thumbSize: 26 };
      default:
        return { width: 50, height: 30, thumbSize: 20 };
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;

    if (showConfirmation && newChecked !== checked) {
      setPendingChange(newChecked);
      setShowConfirmDialog(true);
      return;
    }

    if (locked) {
      return;
    }

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (controlledChecked === undefined) {
      setInternalChecked(newChecked);
    }
    setChecked(newChecked);
    playSound(newChecked);

    if (onChange) {
      onChange(newChecked);
    }
  };

  const handleConfirm = () => {
    if (pendingChange !== null) {
      if (controlledChecked === undefined) {
        setInternalChecked(pendingChange);
      }
      setChecked(pendingChange);
      playSound(pendingChange);

      if (onChange) {
        onChange(pendingChange);
      }
    }
    setShowConfirmDialog(false);
    setPendingChange(null);
  };

  const handleCancel = () => {
    setShowConfirmDialog(false);
    setPendingChange(null);
  };

  const switchSize = getSwitchSize();

  const renderSwitch = () => {
    if (variant === 'card') {
      return (
        <Box
          sx={{
            ...getVariantStyles(variant, checked),
            p: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          onClick={() => !loading && !locked && handleChange({ target: { checked: !checked } } as any)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {showIcon && (
              <Box sx={{ color: checked ? '#43e97b' : '#666' }}>
                {checked ? (iconOn || <ToggleRight size={24} />) : (iconOff || <ToggleLeft size={24} />)}
              </Box>
            )}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {label}
              </Typography>
              {description && (
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              )}
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {showBadge && badgeContent && (
              <Chip
                label={badgeContent}
                size="small"
                color={badgeColor}
                sx={{ fontWeight: 600 }}
              />
            )}
            
            {loading && (
              <CircularProgress size={16} sx={{ color: '#43e97b' }} />
            )}
            
            {locked && (
              <Box sx={{ color: '#f44336' }}>
                <Lock size={16} />
              </Box>
            )}
            
            <MuiSwitch
              checked={checked}
              onChange={handleChange}
              disabled={loading || locked}
              color={color}
              size={size}
              sx={{
                '& .MuiSwitch-switchBase': {
                  '&.Mui-checked': {
                    transform: `translateX(${switchSize.width - switchSize.thumbSize - 4}px)`
                  }
                },
                '& .MuiSwitch-thumb': {
                  width: switchSize.thumbSize,
                  height: switchSize.thumbSize,
                  background: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                },
                '& .MuiSwitch-track': {
                  background: getColorGradient(color, checked),
                  borderRadius: switchSize.height / 2,
                  opacity: 1,
                  '&:before, &:after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 16,
                    height: 16
                  }
                }
              }}
            />
          </Box>
        </Box>
      );
    }

    if (variant === 'button') {
      return (
        <Button
          variant="contained"
          onClick={() => !loading && !locked && handleChange({ target: { checked: !checked } } as any)}
          disabled={loading || locked}
          startIcon={
            showIcon && (
              <Box sx={{ color: checked ? 'white' : '#666', transition: 'color 0.3s ease' }}>
                {checked ? (iconOn || <Power size={20} />) : (iconOff || <PowerOff size={20} />)}
              </Box>
            )
          }
          sx={{
            ...getVariantStyles(variant, checked),
            px: 3,
            py: 1.5,
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: 3,
            minWidth: 120,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            ...(isAnimating && {
              animation: 'pulse 0.3s ease-in-out'
            })
          }}
        >
          {label}
          {loading && (
            <CircularProgress size={16} sx={{ ml: 1, color: 'white' }} />
          )}
        </Button>
      );
    }

    return (
      <FormControlLabel
        control={
          <MuiSwitch
            checked={checked}
            onChange={handleChange}
            disabled={loading || locked}
            color={color}
            size={size}
            sx={{
              '& .MuiSwitch-switchBase': {
                '&.Mui-checked': {
                  transform: `translateX(${switchSize.width - switchSize.thumbSize - 4}px)`,
                  '& .MuiSwitch-thumb': {
                    background: variant === 'ios' || variant === 'android' ? 'white' : undefined
                  }
                }
              },
              '& .MuiSwitch-thumb': {
                width: switchSize.thumbSize,
                height: switchSize.thumbSize,
                background: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                ...(variant === 'toggle' && {
                  position: 'absolute',
                  top: (30 - switchSize.thumbSize) / 2,
                  left: checked ? 30 - (30 - switchSize.thumbSize) / 2 - switchSize.thumbSize : (30 - switchSize.thumbSize) / 2,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }),
                ...(variant === 'ios' && {
                  position: 'absolute',
                  top: (30 - switchSize.thumbSize) / 2,
                  left: checked ? 30 - (30 - switchSize.thumbSize) / 2 - switchSize.thumbSize : (30 - switchSize.thumbSize) / 2,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }),
                ...(variant === 'android' && {
                  position: 'absolute',
                  top: (20 - switchSize.thumbSize) / 2,
                  left: checked ? 36 - (20 - switchSize.thumbSize) / 2 - switchSize.thumbSize : (20 - switchSize.thumbSize) / 2,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                })
              },
              '& .MuiSwitch-track': {
                background: variant === 'toggle' || variant === 'ios' || variant === 'android' 
                  ? getColorGradient(color, checked)
                  : undefined,
                borderRadius: switchSize.height / 2,
                opacity: 1,
                width: variant === 'toggle' ? 60 : variant === 'ios' ? 50 : variant === 'android' ? 36 : undefined,
                height: variant === 'toggle' ? 30 : variant === 'ios' ? 30 : variant === 'android' ? 20 : undefined,
                '&:before, &:after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 16,
                  height: 16
                }
              }
            }}
          />
        }
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {showIcon && (
              <Box sx={{ color: checked ? '#43e97b' : '#666', transition: 'color 0.3s ease' }}>
                {checked ? (iconOn || <ToggleRight size={20} />) : (iconOff || <ToggleLeft size={20} />)}
              </Box>
            )}
            
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {label}
              </Typography>
              {description && (
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              )}
            </Box>

            {loading && (
              <CircularProgress size={16} sx={{ ml: 1, color: '#43e97b' }} />
            )}

            {locked && (
              <Tooltip title={lockReason}>
                <Box sx={{ color: '#f44336' }}>
                  <Lock size={16} />
                </Box>
              </Tooltip>
            )}

            {showBadge && badgeContent && (
              <Chip
                label={badgeContent}
                size="small"
                color={badgeColor}
                sx={{ ml: 1, fontWeight: 600 }}
              />
            )}
          </Box>
        }
        disabled={loading || locked}
        sx={{ opacity: loading || locked ? 0.6 : 1 }}
      />
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
        >
          <Box
            sx={{
              background: 'white',
              p: 4,
              borderRadius: 4,
              maxWidth: 400,
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Confirm Action
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {confirmationMessage}
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{ borderRadius: 2 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleConfirm}
                sx={{ borderRadius: 2 }}
              >
                Confirm
              </Button>
            </Stack>
          </Box>
        </Box>
      )}

      {/* Timer Progress */}
      {showTimer && checked && (
        <Box sx={{ mb: 3 }}>
          <LinearProgress
            variant="determinate"
            value={timerProgress}
            sx={{
              height: 4,
              borderRadius: 2,
              background: alpha('#666', 0.1),
              '& .MuiLinearProgress-bar': {
                background: getColorGradient(color, checked),
                borderRadius: 2
              }
            }}
          />
        </Box>
      )}

      {/* Main Switch */}
      {renderSwitch()}

      {/* Status Display */}
      {showStatus && (
        <Box sx={{ mt: 3 }}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              background: alpha(checked ? '#43e97b' : '#666', 0.05),
              borderRadius: 3,
              border: `1px solid ${alpha(checked ? '#43e97b' : '#666', 0.2)}`
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ color: checked ? '#43e97b' : '#666' }}>
                {checked ? <CheckCircle size={20} /> : <XCircle size={20} />}
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Status: {checked ? 'Active' : 'Inactive'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {checked ? 'Feature is currently enabled' : 'Feature is currently disabled'}
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Box>
      )}

      {/* Analytics */}
      {showAnalytics && analytics && (
        <Box sx={{ mt: 3 }}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              background: alpha('#43e97b', 0.05),
              borderRadius: 3
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
              Usage Analytics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#43e97b' }}>
                    {analytics.enabledCount}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Enabled
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#666' }}>
                    {analytics.disabledCount}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Disabled
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Box>
      )}

      {/* Preset States */}
      {showPresets && presetStates.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
            Preset States
          </Typography>
          <Stack spacing={2}>
            {presetStates.map((preset, index) => (
              <Card
                key={index}
                elevation={0}
                sx={{
                  p: 2,
                  background: preset.checked ? alpha('#43e97b', 0.05) : 'white',
                  border: `1px solid ${preset.checked ? '#43e97b' : alpha('#666', 0.2)}`,
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: alpha('#43e97b', 0.05)
                  }
                }}
                onClick={() => {
                  if (onPresetChange) {
                    onPresetChange(preset);
                  }
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  {preset.icon && (
                    <Box sx={{ color: preset.checked ? '#43e97b' : '#666' }}>
                      {preset.icon}
                    </Box>
                  )}
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {preset.label}
                    </Typography>
                    {preset.description && (
                      <Typography variant="caption" color="text.secondary">
                        {preset.description}
                      </Typography>
                    )}
                  </Box>
                  {preset.checked && (
                    <CheckCircle size={16} color="#43e97b" style={{ marginLeft: 'auto' }} />
                  )}
                </Stack>
              </Card>
            ))}
          </Stack>
        </Box>
      )}

      {/* Group Switches */}
      {showGroup && switches.length > 0 && (
        <Box sx={{ mt: 3 }}>
          {groupLabel && (
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
              {groupLabel}
            </Typography>
          )}
          <FormGroup>
            {switches.map((switchItem) => (
              <FormControlLabel
                key={switchItem.id}
                control={
                  <MuiSwitch
                    checked={switchItem.checked}
                    onChange={(e) => {
                      const updatedSwitches = switches.map(s => 
                        s.id === switchItem.id ? { ...s, checked: e.target.checked } : s
                      );
                      if (onGroupChange) {
                        onGroupChange(updatedSwitches);
                      }
                    }}
                    disabled={switchItem.disabled || loading}
                    color={color}
                    size={size}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {switchItem.icon && (
                      <Box sx={{ color: switchItem.checked ? '#43e97b' : '#666' }}>
                        {switchItem.icon}
                      </Box>
                    )}
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {switchItem.label}
                      </Typography>
                      {switchItem.description && (
                        <Typography variant="caption" color="text.secondary">
                          {switchItem.description}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                }
              />
            ))}
          </FormGroup>
        </Box>
      )}
    </Box>
  );
}

export default Switch;
