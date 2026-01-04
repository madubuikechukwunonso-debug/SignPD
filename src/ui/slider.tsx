import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Slider as MuiSlider,
  Typography,
  Stack,
  Chip,
  Tooltip,
  alpha,
  LinearProgress,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material';
import {
  Sliders,
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  RotateCcw,
  Settings,
  BarChart3,
  Target,
  Zap,
  Activity
} from 'lucide-react';

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  label?: string;
  description?: string;
  unit?: string;
  showValue?: boolean;
  showTooltip?: boolean;
  disabled?: boolean;
  marks?: boolean | Array<{ value: number; label: string }>;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  orientation?: 'horizontal' | 'vertical';
  track?: 'normal' | false | 'inverted';
  valueLabelDisplay?: 'on' | 'auto' | 'off';
  valueLabelFormat?: (value: number) => string;
  showInput?: boolean;
  showProgress?: boolean;
  showTrend?: boolean;
  trendData?: number[];
  onReset?: () => void;
  presetValues?: Array<{ label: string; value: number; color?: string }>;
  showPresets?: boolean;
  showAnalytics?: boolean;
  analytics?: {
    min: number;
    max: number;
    avg: number;
    median: number;
  };
}

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  value: controlledValue,
  onChange,
  label = 'Slider',
  description,
  unit = '',
  showValue = true,
  showTooltip = true,
  disabled = false,
  marks = false,
  color = 'primary',
  size = 'medium',
  orientation = 'horizontal',
  track = 'normal',
  valueLabelDisplay = 'auto',
  valueLabelFormat,
  showInput = false,
  showProgress = false,
  showTrend = false,
  trendData = [],
  onReset,
  presetValues = [],
  showPresets = false,
  showAnalytics = false,
  analytics
}: SliderProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const [isInteracting, setIsInteracting] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const getColorGradient = (color: string) => {
    switch (color) {
      case 'primary':
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      case 'secondary':
        return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
      case 'success':
        return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
      case 'error':
        return 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)';
      case 'warning':
        return 'linear-gradient(135deg, #ffa726 0%, #ff9800 100%)';
      case 'info':
        return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
      default:
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  };

  const getTrendIcon = () => {
    if (trendData.length < 2) return null;
    const trend = trendData[trendData.length - 1] - trendData[trendData.length - 2];
    if (trend > 0) return <TrendingUp size={16} color="#43e97b" />;
    if (trend < 0) return <TrendingDown size={16} color="#f44336" />;
    return <Minus size={16} color="#666" />;
  };

  const calculateTrendPercentage = () => {
    if (trendData.length < 2) return 0;
    const current = trendData[trendData.length - 1];
    const previous = trendData[trendData.length - 2];
    return previous !== 0 ? ((current - previous) / previous) * 100 : 0;
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const newSliderValue = Array.isArray(newValue) ? newValue[0] : newValue;
    
    if (controlledValue === undefined) {
      setInternalValue(newSliderValue);
    }
    
    if (onChange) {
      onChange(newSliderValue);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  const handlePresetClick = (presetValue: number) => {
    if (controlledValue === undefined) {
      setInternalValue(presetValue);
    }
    if (onChange) {
      onChange(presetValue);
    }
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    } else {
      if (controlledValue === undefined) {
        setInternalValue(defaultValue);
      }
      if (onChange) {
        onChange(defaultValue);
      }
    }
  };

  const handleSliderInteraction = (isInteracting: boolean) => {
    setIsInteracting(isInteracting);
  };

  const formatValue = (val: number) => {
    if (valueLabelFormat) {
      return valueLabelFormat(val);
    }
    return `${val}${unit}`;
  };

  const getSliderSize = () => {
    switch (size) {
      case 'small':
        return { height: 4, thumbSize: 16 };
      case 'large':
        return { height: 8, thumbSize: 24 };
      default:
        return { height: 6, thumbSize: 20 };
    }
  };

  const sliderSize = getSliderSize();

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      {/* Header with Label and Analytics */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              {label}
            </Typography>
            {description && (
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            )}
          </Box>
          
          <Stack direction="row" spacing={1}>
            {showTrend && trendData.length > 0 && (
              <Tooltip title={`Trend: ${calculateTrendPercentage().toFixed(1)}%`}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {getTrendIcon()}
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {calculateTrendPercentage().toFixed(1)}%
                  </Typography>
                </Box>
              </Tooltip>
            )}
            
            {onReset && (
              <IconButton
                size="small"
                onClick={handleReset}
                sx={{
                  background: alpha('#666', 0.1),
                  '&:hover': { background: alpha('#666', 0.2) }
                }}
              >
                <RotateCcw size={16} />
              </IconButton>
            )}
            
            <IconButton
              size="small"
              onClick={() => setShowSettings(!showSettings)}
              sx={{
                background: alpha('#666', 0.1),
                '&:hover': { background: alpha('#666', 0.2) }
              }}
            >
              <Settings size={16} />
            </IconButton>
          </Stack>
        </Stack>

        {/* Value Display */}
        {showValue && (
          <Box sx={{ mt: 2 }}>
            <Chip
              label={formatValue(value)}
              sx={{
                fontWeight: 700,
                fontSize: '1.1rem',
                background: getColorGradient(color),
                color: 'white',
                px: 2,
                py: 1
              }}
            />
          </Box>
        )}
      </Box>

      {/* Analytics Section */}
      {showAnalytics && analytics && (
        <Card
          elevation={0}
          sx={{
            mb: 3,
            p: 2,
            background: alpha('#43e97b', 0.05),
            borderRadius: 3
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Analytics
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">Min</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>{analytics.min}</Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">Max</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>{analytics.max}</Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">Avg</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>{analytics.avg.toFixed(1)}</Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">Median</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>{analytics.median}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      )}

      {/* Progress Bar */}
      {showProgress && (
        <Box sx={{ mb: 3 }}>
          <LinearProgress
            variant="determinate"
            value={((value - min) / (max - min)) * 100}
            sx={{
              height: sliderSize.height,
              borderRadius: sliderSize.height / 2,
              background: alpha('#666', 0.1),
              '& .MuiLinearProgress-bar': {
                background: getColorGradient(color),
                borderRadius: sliderSize.height / 2
              }
            }}
          />
        </Box>
      )}

      {/* Main Slider */}
      <Box
        ref={sliderRef}
        sx={{
          position: 'relative',
          mb: 3,
          '&:hover': {
            '& .MuiSlider-thumb': {
              transform: 'scale(1.2)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }
          }
        }}
      >
        <MuiSlider
          value={value}
          onChange={handleSliderChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          marks={marks}
          orientation={orientation}
          track={track}
          valueLabelDisplay={valueLabelDisplay}
          valueLabelFormat={formatValue}
          onMouseDown={() => handleSliderInteraction(true)}
          onMouseUp={() => handleSliderInteraction(false)}
          onTouchStart={() => handleSliderInteraction(true)}
          onTouchEnd={() => handleSliderInteraction(false)}
          sx={{
            height: orientation === 'horizontal' ? sliderSize.height : 'auto',
            width: orientation === 'vertical' ? sliderSize.height : 'auto',
            color: 'transparent',
            '& .MuiSlider-track': {
              background: getColorGradient(color),
              border: 'none',
              borderRadius: sliderSize.height / 2
            },
            '& .MuiSlider-rail': {
              background: alpha('#666', 0.1),
              borderRadius: sliderSize.height / 2,
              opacity: 1
            },
            '& .MuiSlider-thumb': {
              width: sliderSize.thumbSize,
              height: sliderSize.thumbSize,
              background: 'white',
              border: `3px solid ${color}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
              },
              '&.Mui-active': {
                transform: 'scale(1.3)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.25)'
              }
            },
            '& .MuiSlider-mark': {
              background: alpha('#666', 0.3),
              width: 2,
              height: 8,
              borderRadius: 1
            },
            '& .MuiSlider-markLabel': {
              fontSize: '0.75rem',
              color: '#666',
              fontWeight: 500
            }
          }}
        />
      </Box>

      {/* Preset Values */}
      {showPresets && presetValues.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Quick Presets
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {presetValues.map((preset) => (
              <Chip
                key={preset.label}
                label={preset.label}
                onClick={() => handlePresetClick(preset.value)}
                sx={{
                  background: preset.color || alpha('#43e97b', 0.1),
                  color: preset.color ? 'white' : '#43e97b',
                  fontWeight: 600,
                  '&:hover': {
                    background: preset.color || alpha('#43e97b', 0.2)
                  }
                }}
              />
            ))}
          </Stack>
        </Box>
      )}

      {/* Input Field */}
      {showInput && (
        <Box sx={{ mb: 3 }}>
          <TextField
            type="number"
            value={value}
            onChange={handleInputChange}
            inputProps={{ min, max, step }}
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Target size={16} />
                </InputAdornment>
              ),
              endAdornment: unit && (
                <InputAdornment position="end">
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {unit}
                  </Typography>
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                background: alpha('#43e97b', 0.05)
              }
            }}
          />
        </Box>
      )}

      {/* Range Information */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2,
          p: 2,
          background: alpha('#f8fafc', 0.8),
          borderRadius: 3
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            Minimum
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {formatValue(min)}
          </Typography>
        </Box>
        
        <Zap size={20} color="#43e97b" />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            Current
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700, color: '#43e97b' }}>
            {formatValue(value)}
          </Typography>
        </Box>
        
        <Activity size={20} color="#43e97b" />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            Maximum
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {formatValue(max)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Slider;
