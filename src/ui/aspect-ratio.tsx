import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  Badge,
  alpha,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Crop,
  Maximize2,
  Minimize2,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Settings,
  Lock,
  Unlock,
  Grid3x3,
  Eye,
  EyeOff,
  Download,
  Upload,
  Reset,
  Check,
  X
} from 'lucide-react';

// Types
type AspectRatio = '1:1' | '4:3' | '16:9' | '21:9' | '3:2' | '2:1' | '9:16' | 'custom';
type ResizeMode = 'contain' | 'cover' | 'fill' | 'scale-down';
type CropPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface AspectRatioPreset {
  label: string;
  value: AspectRatio;
  ratio: number;
  category: 'standard' | 'widescreen' | 'mobile' | 'square' | 'custom';
  icon?: React.ReactNode;
}

interface AspectRatioConfig {
  width: number;
  height: number;
  ratio: number;
  locked: boolean;
  snapToGrid: boolean;
  gridSize: number;
  showGrid: boolean;
  showGuides: boolean;
  showSafeZone: boolean;
  safeZonePercentage: number;
}

interface AspectRatioProps {
  initialWidth?: number;
  initialHeight?: number;
  initialRatio?: AspectRatio;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  showPresets?: boolean;
  showControls?: boolean;
  showGrid?: boolean;
  showSafeZone?: boolean;
  showPreview?: boolean;
  allowCustomRatio?: boolean;
  allowRotation?: boolean;
  allowFlip?: boolean;
  locked?: boolean;
  snapToGrid?: boolean;
  gridSize?: number;
  resizeMode?: ResizeMode;
  onChange?: (config: AspectRatioConfig) => void;
  onRatioChange?: (ratio: number, preset: AspectRatio) => void;
  onCropComplete?: (config: AspectRatioConfig) => void;
  className?: string;
  style?: React.CSSProperties;
  darkMode?: boolean;
  compact?: boolean;
  presetCategories?: string[];
  customPresets?: AspectRatioPreset[];
  showSizeInputs?: boolean;
  showAspectRatioInput?: boolean;
  decimalPlaces?: number;
}

// Default presets
const defaultPresets: AspectRatioPreset[] = [
  // Square
  { label: 'Square', value: '1:1', ratio: 1, category: 'square' },
  
  // Standard
  { label: 'Standard (4:3)', value: '4:3', ratio: 4/3, category: 'standard' },
  { label: 'Standard (3:2)', value: '3:2', ratio: 3/2, category: 'standard' },
  
  // Widescreen
  { label: 'HD (16:9)', value: '16:9', ratio: 16/9, category: 'widescreen' },
  { label: 'UltraWide (21:9)', value: '21:9', ratio: 21/9, category: 'widescreen' },
  { label: 'Cinema (2:1)', value: '2:1', ratio: 2, category: 'widescreen' },
  
  // Mobile
  { label: 'Mobile (9:16)', value: '9:16', ratio: 9/16, category: 'mobile' },
  
  // Custom
  { label: 'Custom', value: 'custom', ratio: 1, category: 'custom' }
];

// Utility functions
const roundToDecimal = (value: number, decimals: number): number => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

const findClosestPreset = (ratio: number, presets: AspectRatioPreset[]): AspectRatioPreset => {
  let closest = presets[0];
  let smallestDiff = Math.abs(ratio - closest.ratio);
  
  for (const preset of presets) {
    const diff = Math.abs(ratio - preset.ratio);
    if (diff < smallestDiff) {
      smallestDiff = diff;
      closest = preset;
    }
  }
  
  return closest;
};

const snapToGrid = (value: number, gridSize: number): number => {
  return Math.round(value / gridSize) * gridSize;
};

const isValidDimension = (value: number, min: number, max: number): boolean => {
  return !isNaN(value) && value >= min && value <= max;
};

export function AspectRatio({
  initialWidth = 800,
  initialHeight = 600,
  initialRatio = '4:3',
  minWidth = 100,
  maxWidth = 4000,
  minHeight = 100,
  maxHeight = 4000,
  showPresets = true,
  showControls = true,
  showGrid = true,
  showSafeZone = true,
  showPreview = true,
  allowCustomRatio = true,
  allowRotation = true,
  allowFlip = true,
  locked: initialLocked = false,
  snapToGrid: initialSnapToGrid = false,
  gridSize = 10,
  resizeMode = 'contain',
  onChange,
  onRatioChange,
  onCropComplete,
  className,
  style,
  darkMode = false,
  compact = false,
  presetCategories = ['standard', 'widescreen', 'mobile', 'square'],
  customPresets = [],
  showSizeInputs = true,
  showAspectRatioInput = true,
  decimalPlaces = 2
}: AspectRatioProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State
  const [config, setConfig] = useState<AspectRatioConfig>({
    width: initialWidth,
    height: initialHeight,
    ratio: initialRatio === 'custom' ? 1 : defaultPresets.find(p => p.value === initialRatio)?.ratio || 1,
    locked: initialLocked,
    snapToGrid: initialSnapToGrid,
    gridSize,
    showGrid,
    showGuides: true,
    showSafeZone,
    safeZonePercentage: 0.9
  });

  const [selectedPreset, setSelectedPreset] = useState<AspectRatioPreset>(
    defaultPresets.find(p => p.value === initialRatio) || defaultPresets[0]
  );

  const [rotation, setRotation] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);
  const [customRatioWidth, setCustomRatioWidth] = useState(16);
  const [customRatioHeight, setCustomRatioHeight] = useState(9);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Combine presets
  const allPresets = [...defaultPresets, ...customPresets];
  const filteredPresets = allPresets.filter(p => presetCategories.includes(p.category));

  // Calculate aspect ratio
  const currentRatio = roundToDecimal(config.width / config.height, decimalPlaces);

  // Handle dimension changes
  const handleDimensionChange = useCallback((dimension: 'width' | 'height', value: number) => {
    if (!isValidDimension(value, dimension === 'width' ? minWidth : minHeight, dimension === 'width' ? maxWidth : maxHeight)) {
      return;
    }

    let newWidth = config.width;
    let newHeight = config.height;

    if (dimension === 'width') {
      newWidth = config.snapToGrid ? snapToGrid(value, config.gridSize) : value;
      if (config.locked) {
        newHeight = Math.round(newWidth / config.ratio);
      }
    } else {
      newHeight = config.snapToGrid ? snapToGrid(value, config.gridSize) : value;
      if (config.locked) {
        newWidth = Math.round(newHeight * config.ratio);
      }
    }

    const newConfig: AspectRatioConfig = {
      ...config,
      width: Math.max(minWidth, Math.min(maxWidth, newWidth)),
      height: Math.max(minHeight, Math.min(maxHeight, newHeight))
    };

    setConfig(newConfig);
    onChange?.(newConfig);
  }, [config, minWidth, maxWidth, minHeight, maxHeight, onChange]);

  // Handle preset selection
  const handlePresetSelect = useCallback((preset: AspectRatioPreset) => {
    setSelectedPreset(preset);
    
    let newWidth = config.width;
    let newHeight = config.height;

    if (preset.value !== 'custom') {
      if (config.width / config.height > preset.ratio) {
        newWidth = Math.round(config.height * preset.ratio);
      } else {
        newHeight = Math.round(config.width / preset.ratio);
      }
    }

    const newConfig: AspectRatioConfig = {
      ...config,
      width: newWidth,
      height: newHeight,
      ratio: preset.ratio
    };

    setConfig(newConfig);
    onRatioChange?.(preset.ratio, preset.value);
    onChange?.(newConfig);
  }, [config, onRatioChange, onChange]);

  // Handle custom ratio changes
  const handleCustomRatioChange = useCallback(() => {
    if (customRatioWidth <= 0 || customRatioHeight <= 0) return;

    const newRatio = customRatioWidth / customRatioHeight;
    const newPreset: AspectRatioPreset = {
      label: `${customRatioWidth}:${customRatioHeight}`,
      value: 'custom',
      ratio: newRatio,
      category: 'custom'
    };

    handlePresetSelect(newPreset);
  }, [customRatioWidth, customRatioHeight, handlePresetSelect]);

  // Handle crop completion
  const handleCropComplete = useCallback(() => {
    onCropComplete?.(config);
  }, [config, onCropComplete]);

  // Handle rotation
  const handleRotation = useCallback((degrees: number) => {
    setRotation((prev) => (prev + degrees) % 360);
  }, []);

  // Handle flip
  const handleFlip = useCallback((direction: 'horizontal' | 'vertical') => {
    if (direction === 'horizontal') {
      setFlipHorizontal(prev => !prev);
    } else {
      setFlipVertical(prev => !prev);
    }
  }, []);

  // Toggle grid
  const toggleGrid = useCallback(() => {
    setConfig(prev => ({ ...prev, showGrid: !prev.showGrid }));
  }, []);

  // Toggle safe zone
  const toggleSafeZone = useCallback(() => {
    setConfig(prev => ({ ...prev, showSafeZone: !prev.showSafeZone }));
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;

      switch (event.key) {
        case 'r':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            handleRotation(90);
          }
          break;
        case 'g':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            toggleGrid();
          }
          break;
        case 's':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            handleCropComplete();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleRotation, toggleGrid, handleCropComplete]);

  // Preview rendering
  const renderPreview = () => {
    if (!showPreview) return null;

    const previewStyle: React.CSSProperties = {
      width: Math.min(300, config.width * 0.3),
      height: Math.min(200, config.height * 0.3),
      transform: `rotate(${rotation}deg) scaleX(${flipHorizontal ? -1 : 1}) scaleY(${flipVertical ? -1 : 1})`,
      transformOrigin: 'center',
      transition: 'transform 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    };

    return (
      <Box
        ref={previewRef}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
          backgroundColor: darkMode ? alpha(theme.palette.grey[800], 0.5) : alpha(theme.palette.grey[100], 0.5),
          borderRadius: 2,
          position: 'relative',
          minHeight: 250
        }}
      >
        {/* Grid overlay */}
        {config.showGrid && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent ${config.gridSize - 1}px,
                ${alpha(theme.palette.divider, 0.3)} ${config.gridSize - 1}px,
                ${alpha(theme.palette.divider, 0.3)} ${config.gridSize}px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent ${config.gridSize - 1}px,
                ${alpha(theme.palette.divider, 0.3)} ${config.gridSize - 1}px,
                ${alpha(theme.palette.divider, 0.3)} ${config.gridSize}px
              )`,
              pointerEvents: 'none',
              opacity: 0.5
            }}
          />
        )}

        {/* Safe zone */}
        {config.showSafeZone && (
          <Box
            sx={{
              position: 'absolute',
              top: `${(1 - config.safeZonePercentage) * 50}%`,
              left: `${(1 - config.safeZonePercentage) * 50}%`,
              width: `${config.safeZonePercentage * 100}%`,
              height: `${config.safeZonePercentage * 100}%`,
              border: `2px dashed ${alpha(theme.palette.warning.main, 0.5)}`,
              borderRadius: 1,
              pointerEvents: 'none'
            }}
          />
        )}

        {/* Main preview */}
        <Box
          style={previewStyle}
          sx={{
            backgroundColor: darkMode ? theme.palette.grey[700] : theme.palette.background.paper,
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 1
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {config.width} × {config.height}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {currentRatio}:1
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {selectedPreset.label}
          </Typography>
        </Box>

        {/* Guides */}
        {config.showGuides && (
          <>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: 1,
                backgroundColor: alpha(theme.palette.primary.main, 0.3),
                pointerEvents: 'none'
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: 1,
                backgroundColor: alpha(theme.palette.primary.main, 0.3),
                pointerEvents: 'none'
              }}
            />
          </>
        )}
      </Box>
    );
  };

  // Preset categories
  const renderPresetCategories = () => {
    if (!showPresets) return null;

    const categories = [...new Set(filteredPresets.map(p => p.category))];
    
    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
          Presets
        </Typography>
        
        {categories.map(category => (
          <Box key={category} sx={{ mb: 2 }}>
            <Typography
              variant="caption"
              sx={{
                textTransform: 'uppercase',
                fontWeight: 600,
                color: 'text.secondary',
                mb: 1,
                display: 'block'
              }}
            >
              {category}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {filteredPresets
                .filter(p => p.category === category)
                .map(preset => (
                  <Chip
                    key={preset.value}
                    label={preset.label}
                    onClick={() => handlePresetSelect(preset)}
                    color={selectedPreset.value === preset.value ? 'primary' : 'default'}
                    variant={selectedPreset.value === preset.value ? 'filled' : 'outlined'}
                    size={compact ? 'small' : 'medium'}
                    sx={{ fontWeight: 600 }}
                  />
                ))}
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  // Controls
  const renderControls = () => {
    if (!showControls) return null;

    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
          Controls
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
          {/* Lock/Unlock */}
          <Tooltip title={config.locked ? "Unlock aspect ratio" : "Lock aspect ratio"}>
            <ToggleButton
              size={compact ? 'small' : 'medium'}
              value="locked"
              selected={config.locked}
              onChange={() => setConfig(prev => ({ ...prev, locked: !prev.locked }))}
            >
              {config.locked ? <Lock size={16} /> : <Unlock size={16} />}
            </ToggleButton>
          </Tooltip>

          {/* Grid */}
          <Tooltip title="Toggle grid">
            <ToggleButton
              size={compact ? 'small' : 'medium'}
              value="grid"
              selected={config.showGrid}
              onChange={toggleGrid}
            >
              <Grid3x3 size={16} />
            </ToggleButton>
          </Tooltip>

          {/* Safe Zone */}
          <Tooltip title="Toggle safe zone">
            <ToggleButton
              size={compact ? 'small' : 'medium'}
              value="safeZone"
              selected={config.showSafeZone}
              onChange={toggleSafeZone}
            >
              <Shield size={16} />
            </ToggleButton>
          </Tooltip>

          {/* Snap to Grid */}
          <Tooltip title="Snap to grid">
            <ToggleButton
              size={compact ? 'small' : 'medium'}
              value="snap"
              selected={config.snapToGrid}
              onChange={() => setConfig(prev => ({ ...prev, snapToGrid: !prev.snapToGrid }))}
            >
              <Box sx={{ fontSize: '12px', fontWeight: 600 }}>SNAP</Box>
            </ToggleButton>
          </Tooltip>

          {/* Rotation */}
          {allowRotation && (
            <Tooltip title="Rotate 90°">
              <IconButton
                size={compact ? 'small' : 'medium'}
                onClick={() => handleRotation(90)}
              >
                <RotateCw size={16} />
              </IconButton>
            </Tooltip>
          )}

          {/* Flip Horizontal */}
          {allowFlip && (
            <Tooltip title="Flip horizontal">
              <IconButton
                size={compact ? 'small' : 'medium'}
                onClick={() => handleFlip('horizontal')}
                color={flipHorizontal ? 'primary' : 'default'}
              >
                <FlipHorizontal size={16} />
              </IconButton>
            </Tooltip>
          )}

          {/* Flip Vertical */}
          {allowFlip && (
            <Tooltip title="Flip vertical">
              <IconButton
                size={compact ? 'small' : 'medium'}
                onClick={() => handleFlip('vertical')}
                color={flipVertical ? 'primary' : 'default'}
              >
                <FlipVertical size={16} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {/* Grid size */}
        {config.showGrid && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block', fontWeight: 600 }}>
              Grid Size
            </Typography>
            <Slider
              value={config.gridSize}
              onChange={(_, value) => setConfig(prev => ({ ...prev, gridSize: value as number }))}
              min={5}
              max={50}
              step={5}
              marks
              valueLabelDisplay="auto"
              size={compact ? 'small' : 'medium'}
            />
          </Box>
        )}

        {/* Safe zone percentage */}
        {config.showSafeZone && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block', fontWeight: 600 }}>
              Safe Zone
            </Typography>
            <Slider
              value={config.safeZonePercentage * 100}
              onChange={(_, value) => setConfig(prev => ({ ...prev, safeZonePercentage: (value as number) / 100 }))}
              min={50}
              max={95}
              step={5}
              marks
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}%`}
              size={compact ? 'small' : 'medium'}
            />
          </Box>
        )}
      </Box>
    );
  };

  // Size inputs
  const renderSizeInputs = () => {
    if (!showSizeInputs) return null;

    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
          Dimensions
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ mb: 0.5, display: 'block', fontWeight: 600 }}>
              Width
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <input
                type="number"
                value={config.width}
                onChange={(e) => handleDimensionChange('width', parseInt(e.target.value) || 0)}
                min={minWidth}
                max={maxWidth}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: theme.shape.borderRadius,
                  backgroundColor: theme.palette.background.paper,
                  fontSize: '0.875rem'
                }}
              />
              <Typography variant="caption" color="text.secondary">
                px
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
            ×
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ mb: 0.5, display: 'block', fontWeight: 600 }}>
              Height
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <input
                type="number"
                value={config.height}
                onChange={(e) => handleDimensionChange('height', parseInt(e.target.value) || 0)}
                min={minHeight}
                max={maxHeight}
                disabled={config.locked}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: theme.shape.borderRadius,
                  backgroundColor: config.locked ? alpha(theme.palette.action.disabled, 0.1) : theme.palette.background.paper,
                  fontSize: '0.875rem'
                }}
              />
              <Typography variant="caption" color="text.secondary">
                px
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Aspect ratio display */}
        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Aspect Ratio: {currentRatio}:1 ({selectedPreset.label})
          </Typography>
        </Box>
      </Box>
    );
  };

  // Custom ratio input
  const renderCustomRatioInput = () => {
    if (!showAspectRatioInput || !allowCustomRatio) return null;

    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
          Custom Ratio
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ mb: 0.5, display: 'block', fontWeight: 600 }}>
              Width
            </Typography>
            <input
              type="number"
              value={customRatioWidth}
              onChange={(e) => setCustomRatioWidth(parseInt(e.target.value) || 1)}
              min={1}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: theme.shape.borderRadius,
                backgroundColor: theme.palette.background.paper,
                fontSize: '0.875rem'
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
            :
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ mb: 0.5, display: 'block', fontWeight: 600 }}>
              Height
            </Typography>
            <input
              type="number"
              value={customRatioHeight}
              onChange={(e) => setCustomRatioHeight(parseInt(e.target.value) || 1)}
              min={1}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: theme.shape.borderRadius,
                backgroundColor: theme.palette.background.paper,
                fontSize: '0.875rem'
              }}
            />
          </Box>

          <Button
            size="small"
            variant="outlined"
            onClick={handleCustomRatioChange}
            startIcon={<Check size={16} />}
            sx={{ mt: 2 }}
          >
            Apply
          </Button>
        </Box>
      </Box>
    );
  };

  // Action buttons
  const renderActionButtons = () => {
    return (
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button
          size={compact ? 'small' : 'medium'}
          variant="outlined"
          onClick={() => {
            setConfig(prev => ({
              ...prev,
              width: initialWidth,
              height: initialHeight,
              ratio: defaultPresets.find(p => p.value === initialRatio)?.ratio || 1
            }));
            setSelectedPreset(defaultPresets.find(p => p.value === initialRatio) || defaultPresets[0]);
          }}
          startIcon={<Reset size={16} />}
        >
          Reset
        </Button>

        <Button
          size={compact ? 'small' : 'medium'}
          variant="contained"
          onClick={handleCropComplete}
          startIcon={<Crop size={16} />}
        >
          Apply
        </Button>
      </Box>
    );
  };

  return (
    <Box
      ref={containerRef}
      className={className}
      style={style}
      sx={{
        display: 'flex',
        flexDirection: compact || isMobile ? 'column' : 'row',
        gap: 3,
        p: 2,
        backgroundColor: darkMode ? theme.palette.grey[900] : theme.palette.background.paper,
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`
      }}
    >
      {/* Controls Panel */}
      <Box sx={{ 
        flex: compact || isMobile ? 'none' : '0 0 300px',
        maxWidth: compact || isMobile ? 'none' : 300
      }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Aspect Ratio Controls
        </Typography>

        {renderPresetCategories()}
        {renderControls()}
        {renderSizeInputs()}
        {renderCustomRatioInput()}
        {renderActionButtons()}

        {/* Keyboard shortcuts */}
        <Box sx={{ mt: 3, p: 2, backgroundColor: alpha(theme.palette.grey[100], 0.5), borderRadius: 1 }}>
          <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>
            Keyboard Shortcuts
          </Typography>
          <Typography variant="caption" color="text.secondary" component="div">
            <Box component="div" sx={{ mb: 0.5 }}>• Ctrl+R: Rotate 90°</Box>
            <Box component="div" sx={{ mb: 0.5 }}>• Ctrl+G: Toggle grid</Box>
            <Box component="div" sx={{ mb: 0.5 }}>• Ctrl+S: Apply changes</Box>
            <Box component="div">• Arrow keys: Fine adjustment</Box>
          </Typography>
        </Box>
      </Box>

      {/* Preview Panel */}
      {showPreview && (
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Preview
          </Typography>
          {renderPreview()}
        </Box>
      )}
    </Box>
  );
}

/* ============================
 * Specialized Components
 * ============================
 */

interface ImageCropperProps extends Omit<AspectRatioProps, 'onCropComplete'> {
  imageUrl: string;
  onCropComplete: (croppedImage: string, config: AspectRatioConfig) => void;
  quality?: number;
  format?: 'png' | 'jpeg' | 'webp';
}

export function ImageCropper({
  imageUrl,
  onCropComplete,
  quality = 0.9,
  format = 'png',
  ...aspectRatioProps
}: ImageCropperProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleCropComplete = useCallback((config: AspectRatioConfig) => {
    if (!canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = imageRef.current;
    
    // Set canvas dimensions
    canvas.width = config.width;
    canvas.height = config.height;

    // Calculate source rectangle
    const sourceX = 0;
    const sourceY = 0;
    const sourceWidth = image.naturalWidth;
    const sourceHeight = image.naturalHeight;

    // Calculate destination rectangle based on resize mode
    let destWidth = config.width;
    let destHeight = config.height;
    let destX = 0;
    let destY = 0;

    if (aspectRatioProps.resizeMode === 'contain') {
      const imageRatio = sourceWidth / sourceHeight;
      const canvasRatio = config.width / config.height;
      
      if (imageRatio > canvasRatio) {
        destWidth = config.width;
        destHeight = config.width / imageRatio;
        destY = (config.height - destHeight) / 2;
      } else {
        destHeight = config.height;
        destWidth = config.height * imageRatio;
        destX = (config.width - destWidth) / 2;
      }
    } else if (aspectRatioProps.resizeMode === 'cover') {
      const imageRatio = sourceWidth / sourceHeight;
      const canvasRatio = config.width / config.height;
      
      if (imageRatio > canvasRatio) {
        sourceWidth = sourceHeight * canvasRatio;
      } else {
        sourceHeight = sourceWidth / canvasRatio;
      }
    }

    // Apply transformations
    ctx.save();
    
    // Rotation
    if (config.rotation !== 0) {
      ctx.translate(config.width / 2, config.height / 2);
      ctx.rotate((config.rotation * Math.PI) / 180);
      ctx.translate(-config.width / 2, -config.height / 2);
    }

    // Flip
    if (config.flipHorizontal) {
      ctx.scale(-1, 1);
      ctx.translate(-config.width, 0);
    }
    if (config.flipVertical) {
      ctx.scale(1, -1);
      ctx.translate(0, -config.height);
    }

    // Draw image
    ctx.drawImage(
      image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      destX,
      destY,
      destWidth,
      destHeight
    );

    ctx.restore();

    // Export cropped image
    const croppedImage = canvas.toDataURL(`image/${format}`, quality);
    onCropComplete(croppedImage, config);
  }, [imageUrl, format, quality, aspectRatioProps.resizeMode, onCropComplete]);

  return (
    <Box>
      <AspectRatio
        {...aspectRatioProps}
        onCropComplete={handleCropComplete}
        showPreview={true}
      />
      
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Crop preview"
        style={{ display: 'none' }}
        onLoad={() => setImageLoaded(true)}
      />
      
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />
    </Box>
  );
}

interface VideoAspectRatioProps extends AspectRatioProps {
  videoUrl: string;
  currentTime?: number;
  onFrameCapture?: (frameData: string, config: AspectRatioConfig) => void;
}

export function VideoAspectRatio({
  videoUrl,
  currentTime = 0,
  onFrameCapture,
  ...aspectRatioProps
}: VideoAspectRatioProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCropComplete = useCallback((config: AspectRatioConfig) => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Seek to specified time
    video.currentTime = currentTime;

    video.addEventListener('seeked', () => {
      canvas.width = config.width;
      canvas.height = config.height;

      // Draw video frame
      ctx.drawImage(video, 0, 0, config.width, config.height);

      // Export frame
      const frameData = canvas.toDataURL('image/png');
      onFrameCapture?.(frameData, config);
    }, { once: true });
  }, [videoUrl, currentTime, onFrameCapture]);

  return (
    <Box>
      <AspectRatio
        {...aspectRatioProps}
        onCropComplete={handleCropComplete}
      />
      
      <video
        ref={videoRef}
        src={videoUrl}
        style={{ display: 'none' }}
      />
      
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />
    </Box>
  );
}

/* ============================
 * Export Default
 * ============================
 */

export default AspectRatio;
