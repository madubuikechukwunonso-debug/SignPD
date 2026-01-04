import React, { ReactNode } from 'react';
import {
  Typography,
  Box,
  Chip,
  Tooltip,
  Stack,
  alpha,
  Badge,
  IconButton,
  SvgIconProps
} from '@mui/material';
import {
  Info,
  AlertTriangle,
  CheckCircle,
  Star,
  Shield,
  Lock,
  Unlock,
  Clock,
  Zap,
  TrendingUp,
  Users,
  Award,
  Certificate,
  Verified,
  Warning,
  Error as ErrorIcon,
  HelpCircle,
  Question,
  Lightbulb,
  Target,
  Flag,
  Bookmark,
  Heart,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Bell,
  Notification
} from 'lucide-react';

export type LabelVariant = 
  | 'default' 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info'
  | 'gradient'
  | 'enterprise'
  | 'security'
  | 'status'
  | 'priority'
  | 'category';

export type LabelSize = 'small' | 'medium' | 'large' | 'xlarge';
export type LabelWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';

export interface LabelProps {
  // Core props
  children: ReactNode;
  variant?: LabelVariant;
  size?: LabelSize;
  weight?: LabelWeight;
  color?: string;
  backgroundColor?: string;
  
  // Text styling
  fontSize?: number | string;
  lineHeight?: number | string;
  letterSpacing?: number | string;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase' | 'full-width';
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  fontFamily?: string;
  
  // Icon and adornments
  icon?: ReactNode;
  iconPosition?: 'left' | 'right' | 'top' | 'bottom';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  showIcon?: boolean;
  iconSize?: number;
  iconColor?: string;
  
  // Interactive features
  tooltip?: string;
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
  clickable?: boolean;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  
  // Status indicators
  required?: boolean;
  optional?: boolean;
  new?: boolean;
  updated?: boolean;
  deprecated?: boolean;
  beta?: boolean;
  experimental?: boolean;
  premium?: boolean;
  verified?: boolean;
  secured?: boolean;
  
  // Numeric indicators
  count?: number;
  badge?: number | string;
  progress?: number;
  rating?: number;
  level?: number;
  
  // Styling overrides
  className?: string;
  sx?: any;
  style?: React.CSSProperties;
  
  // Layout and positioning
  display?: 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex';
  width?: string | number;
  maxWidth?: string | number;
  truncate?: boolean;
  multiline?: boolean;
  maxLines?: number;
  
  // Accessibility
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  role?: string;
  tabIndex?: number;
  
  // Advanced features
  animated?: boolean;
  pulse?: boolean;
  glow?: boolean;
  gradient?: boolean;
  glass?: boolean;
  shadow?: boolean;
  border?: boolean;
  rounded?: boolean;
  
  // Enterprise features
  enterprise?: boolean;
  securityLevel?: 'low' | 'medium' | 'high' | 'critical';
  compliance?: string[];
  certification?: string[];
  
  // Custom rendering
  renderIcon?: (props: { size: number; color: string }) => ReactNode;
  renderContent?: (children: ReactNode) => ReactNode;
  renderWrapper?: (content: ReactNode) => ReactNode;
}

// Icon mapping for different variants
const variantIcons = {
  default: null,
  primary: <Zap size={16} />,
  secondary: <Info size={16} />,
  success: <CheckCircle size={16} />,
  warning: <AlertTriangle size={16} />,
  error: <ErrorIcon size={16} />,
  info: <Info size={16} />,
  gradient: <Star size={16} />,
  enterprise: <Shield size={16} />,
  security: <Lock size={16} />,
  status: <Verified size={16} />,
  priority: <Flag size={16} />,
  category: <Bookmark size={16} />
};

// Color mapping for variants
const variantColors = {
  default: { color: '#1a1a1a', bg: 'transparent', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  primary: { color: '#667eea', bg: 'rgba(102, 126, 234, 0.1)', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  secondary: { color: '#6c757d', bg: 'rgba(108, 117, 125, 0.1)', gradient: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)' },
  success: { color: '#43e97b', bg: 'rgba(67, 233, 123, 0.1)', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  warning: { color: '#ffa726', bg: 'rgba(255, 167, 38, 0.1)', gradient: 'linear-gradient(135deg, #ffa726 0%, #ff9800 100%)' },
  error: { color: '#f44336', bg: 'rgba(244, 67, 54, 0.1)', gradient: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)' },
  info: { color: '#4facfe', bg: 'rgba(79, 172, 254, 0.1)', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  gradient: { color: '#f093fb', bg: 'rgba(240, 147, 251, 0.1)', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  enterprise: { color: '#764ba2', bg: 'rgba(118, 75, 162, 0.1)', gradient: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)' },
  security: { color: '#9c27b0', bg: 'rgba(156, 39, 176, 0.1)', gradient: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)' },
  status: { color: '#00bcd4', bg: 'rgba(0, 188, 212, 0.1)', gradient: 'linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)' },
  priority: { color: '#ff5722', bg: 'rgba(255, 87, 34, 0.1)', gradient: 'linear-gradient(135deg, #ff5722 0%, #e64a19 100%)' },
  category: { color: '#795548', bg: 'rgba(121, 85, 72, 0.1)', gradient: 'linear-gradient(135deg, #795548 0%, #5d4037 100%)' }
};

// Size mapping
const sizeStyles = {
  small: { fontSize: '12px', lineHeight: '16px', iconSize: 14, padding: '4px 8px' },
  medium: { fontSize: '14px', lineHeight: '20px', iconSize: 16, padding: '6px 12px' },
  large: { fontSize: '16px', lineHeight: '24px', iconSize: 20, padding: '8px 16px' },
  xlarge: { fontSize: '20px', lineHeight: '28px', iconSize: 24, padding: '12px 20px' }
};

// Weight mapping
const weightStyles = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800
};

// Security level colors
const securityColors = {
  low: { color: '#4caf50', bg: 'rgba(76, 175, 80, 0.1)' },
  medium: { color: '#ffa726', bg: 'rgba(255, 167, 38, 0.1)' },
  high: { color: '#f44336', bg: 'rgba(244, 67, 54, 0.1)' },
  critical: { color: '#9c27b0', bg: 'rgba(156, 39, 176, 0.1)' }
};

export const Label = ({
  children,
  variant = 'default',
  size = 'medium',
  weight = 'normal',
  color,
  backgroundColor,
  fontSize,
  lineHeight,
  letterSpacing,
  textTransform = 'none',
  textAlign = 'left',
  fontFamily,
  icon,
  iconPosition = 'left',
  startIcon,
  endIcon,
  showIcon = true,
  iconSize,
  iconColor,
  tooltip,
  tooltipPlacement = 'top',
  clickable = false,
  onClick,
  href,
  target,
  rel,
  required = false,
  optional = false,
  new: isNew = false,
  updated = false,
  deprecated = false,
  beta = false,
  experimental = false,
  premium = false,
  verified = false,
  secured = false,
  count,
  badge,
  progress,
  rating,
  level,
  className = '',
  sx,
  style,
  display = 'inline-flex',
  width,
  maxWidth,
  truncate = false,
  multiline = false,
  maxLines = 2,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  role = 'label',
  tabIndex = clickable ? 0 : -1,
  animated = false,
  pulse = false,
  glow = false,
  gradient: hasGradient = false,
  glass = false,
  shadow = false,
  border = false,
  rounded = false,
  enterprise = false,
  securityLevel,
  compliance = [],
  certification = [],
  renderIcon,
  renderContent,
  renderWrapper
}: LabelProps) => {
  // Get variant colors
  const variantColor = variantColors[variant] || variantColors.default;
  const finalColor = color || variantColor.color;
  const finalBg = backgroundColor || (glass ? 'rgba(255, 255, 255, 0.1)' : variantColor.bg);
  
  // Get size styles
  const sizeStyle = sizeStyles[size] || sizeStyles.medium;
  const finalIconSize = iconSize || sizeStyle.iconSize;
  
  // Get weight
  const fontWeight = weightStyles[weight] || weightStyles.normal;
  
  // Security level colors
  const secColor = securityLevel ? securityColors[securityLevel] : null;

  // Status indicators
  const statusIndicators = [
    { condition: required, icon: <Star size={12} />, label: 'Required', color: '#f44336' },
    { condition: optional, icon: <Info size={12} />, label: 'Optional', color: '#6c757d' },
    { condition: isNew, icon: <Zap size={12} />, label: 'New', color: '#4caf50' },
    { condition: updated, icon: <Clock size={12} />, label: 'Updated', color: '#2196f3' },
    { condition: deprecated, icon: <Warning size={12} />, label: 'Deprecated', color: '#ff9800' },
    { condition: beta, icon: <Lightbulb size={12} />, label: 'Beta', color: '#9c27b0' },
    { condition: experimental, icon: <Target size={12} />, label: 'Experimental', color: '#e91e63' },
    { condition: premium, icon: <Award size={12} />, label: 'Premium', color: '#ffd700' },
    { condition: verified, icon: <Verified size={12} />, label: 'Verified', color: '#4caf50' },
    { condition: secured, icon: <Shield size={12} />, label: 'Secured', color: '#9c27b0' }
  ].filter(item => item.condition);

  // Icon rendering
  const renderLabelIcon = () => {
    if (!showIcon) return null;
    
    const iconElement = startIcon || endIcon || icon || (showIcon && variantIcons[variant]);
    if (!iconElement && !renderIcon) return null;
    
    if (renderIcon) {
      return renderIcon({ size: finalIconSize, color: iconColor || finalColor });
    }
    
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: finalIconSize,
          color: iconColor || finalColor,
          transition: 'all 0.2s ease',
          ...(clickable && {
            cursor: 'pointer',
            '&:hover': { transform: 'scale(1.1)' }
          })
        }}
      >
        {iconElement}
      </Box>
    );
  };

  // Content rendering
  const renderContent = () => {
    const content = renderContent ? renderContent(children) : children;
    
    return (
      <Typography
        component="span"
        sx={{
          fontSize: fontSize || sizeStyle.fontSize,
          lineHeight: lineHeight || sizeStyle.lineHeight,
          letterSpacing,
          textTransform,
          textAlign,
          fontFamily,
          fontWeight,
          color: secColor?.color || finalColor,
          maxWidth: maxWidth || '100%',
          overflow: truncate ? 'hidden' : 'visible',
          textOverflow: truncate ? 'ellipsis' : 'clip',
          whiteSpace: truncate ? 'nowrap' : multiline ? 'normal' : 'nowrap',
          display: '-webkit-box',
          WebkitLineClamp: multiline ? maxLines : 'none',
          WebkitBoxOrient: multiline ? 'vertical' : 'unset',
          ...(hasGradient && {
            background: variantColor.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          })
        }}
      >
        {content}
      </Typography>
    );
  };

  // Badge rendering
  const renderBadge = () => {
    if (badge === undefined && count === undefined && progress === undefined && rating === undefined && level === undefined) return null;
    
    return (
      <Stack direction="row" spacing={0.5} alignItems="center">
        {badge !== undefined && (
          <Chip
            label={badge}
            size="small"
            sx={{
              background: finalColor,
              color: 'white',
              fontSize: '10px',
              height: '18px',
              fontWeight: 700
            }}
          />
        )}
        {count !== undefined && (
          <Chip
            label={count}
            size="small"
            sx={{
              background: alpha(finalColor, 0.2),
              color: finalColor,
              fontSize: '10px',
              height: '18px',
              fontWeight: 600
            }}
          />
        )}
        {progress !== undefined && (
          <Box
            sx={{
              width: 40,
              height: 4,
              background: alpha(finalColor, 0.2),
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                width: `${progress}%`,
                height: '100%',
                background: finalColor,
                transition: 'width 0.3s ease'
              }}
            />
          </Box>
        )}
        {rating !== undefined && (
          <Stack direction="row" spacing={0.25} alignItems="center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                color={i < Math.floor(rating) ? '#ffd700' : '#e0e0e0'}
                fill={i < Math.floor(rating) ? '#ffd700' : 'none'}
              />
            ))}
            <Typography variant="caption" sx={{ ml: 0.5, color: finalColor }}>
              {rating.toFixed(1)}
            </Typography>
          </Stack>
        )}
        {level !== undefined && (
          <Chip
            label={`L${level}`}
            size="small"
            sx={{
              background: finalColor,
              color: 'white',
              fontSize: '10px',
              height: '18px',
              fontWeight: 700
            }}
          />
        )}
      </Stack>
    );
  };

  // Compliance indicators
  const renderCompliance = () => {
    if (compliance.length === 0 && certification.length === 0) return null;
    
    return (
      <Stack direction="row" spacing={0.5} alignItems="center">
        {compliance.map((item, index) => (
          <Tooltip key={index} title={`Compliant with ${item}`} placement="top">
            <Chip
              label={item}
              size="small"
              sx={{
                background: alpha('#4caf50', 0.2),
                color: '#4caf50',
                fontSize: '9px',
                height: '16px',
                fontWeight: 600
              }}
            />
          </Tooltip>
        ))}
        {certification.map((item, index) => (
          <Tooltip key={index} title={`Certified: ${item}`} placement="top">
            <Chip
              label={item}
              size="small"
              sx={{
                background: alpha('#2196f3', 0.2),
                color: '#2196f3',
                fontSize: '9px',
                height: '16px',
                fontWeight: 600
              }}
            />
          </Tooltip>
        ))}
      </Stack>
    );
  };

  // Main label content
  const labelContent = (
    <Stack
      direction={iconPosition === 'left' || iconPosition === 'right' ? 'row' : 'column'}
      spacing={1}
      alignItems="center"
      justifyContent={textAlign === 'center' ? 'center' : 'flex-start'}
      sx={{
        display,
        width,
        position: 'relative',
        padding: rounded ? sizeStyle.padding : 0,
        backgroundColor: glass ? 'rgba(255, 255, 255, 0.1)' : finalBg,
        borderRadius: rounded ? (typeof rounded === 'number' ? rounded : 3) : 0,
        border: border ? `1px solid ${alpha(finalColor, 0.3)}` : 'none',
        boxShadow: shadow ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
        cursor: clickable ? 'pointer' : 'default',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: glass ? 'blur(10px)' : 'none',
        WebkitBackdropFilter: glass ? 'blur(10px)' : 'none',
        ...(animated && {
          animation: 'fadeInUp 0.6s ease-out'
        }),
        ...(pulse && {
          animation: 'pulse 2s infinite'
        }),
        ...(glow && {
          boxShadow: `0 0 20px ${alpha(finalColor, 0.3)}`
        }),
        ...(clickable && {
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: shadow ? '0 4px 16px rgba(0, 0, 0, 0.15)' : 'none',
            backgroundColor: glass ? 'rgba(255, 255, 255, 0.2)' : alpha(finalColor, 0.1)
          },
          '&:active': {
            transform: 'translateY(0)'
          }
        }),
        ...(enterprise && {
          borderLeft: `4px solid ${finalColor}`,
          paddingLeft: 3
        }),
        ...(secColor && {
          backgroundColor: secColor.bg,
          borderLeft: securityLevel ? `4px solid ${secColor.color}` : 'none'
        }),
        ...style,
        ...sx
      }}
      onClick={onClick}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
    >
      {(iconPosition === 'left' || iconPosition === 'top') && renderLabelIcon()}
      
      <Stack spacing={0.5} alignItems={textAlign === 'center' ? 'center' : 'flex-start'}>
        {renderContent()}
        
        {/* Status indicators */}
        {statusIndicators.length > 0 && (
          <Stack direction="row" spacing={0.5} flexWrap="wrap">
            {statusIndicators.map((indicator, index) => (
              <Tooltip key={index} title={indicator.label} placement={tooltipPlacement}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '10px',
                    color: indicator.color,
                    background: alpha(indicator.color, 0.1),
                    borderRadius: 1,
                    px: 0.5,
                    py: 0.25
                  }}
                >
                  {indicator.icon}
                </Box>
              </Tooltip>
            ))}
          </Stack>
        )}
        
        {/* Badges and indicators */}
        {renderBadge()}
        
        {/* Compliance indicators */}
        {renderCompliance()}
      </Stack>
      
      {(iconPosition === 'right' || iconPosition === 'bottom') && renderLabelIcon()}
    </Stack>
  );

  // Apply tooltip if provided
  const finalContent = tooltip ? (
    <Tooltip title={tooltip} placement={tooltipPlacement} arrow>
      {labelContent}
    </Tooltip>
  ) : labelContent;

  // Apply wrapper if provided
  return renderWrapper ? renderWrapper(finalContent) : finalContent;
};

// Specialized label components
export const RequiredLabel = (props: Omit<LabelProps, 'required' | 'icon'>) => (
  <Label {...props} required={true} icon={<Star size={14} />} color="#f44336" />
);

export const OptionalLabel = (props: Omit<LabelProps, 'optional' | 'icon'>) => (
  <Label {...props} optional={true} icon={<Info size={14} />} color="#6c757d" />
);

export const PremiumLabel = (props: Omit<LabelProps, 'premium' | 'icon' | 'variant'>) => (
  <Label {...props} premium={true} variant="gradient" icon={<Award size={14} />} />
);

export const SecurityLabel = (props: Omit<LabelProps, 'variant' | 'secured' | 'icon'>) => (
  <Label {...props} variant="security" secured={true} icon={<Shield size={14} />} />
);

export const StatusLabel = (props: Omit<LabelProps, 'variant' | 'icon'>) => (
  <Label {...props} variant="status" icon={<Verified size={14} />} />
);

export const NewLabel = (props: Omit<LabelProps, 'new' | 'icon' | 'variant'>) => (
  <Label {...props} new={true} variant="success" icon={<Zap size={14} />} animated={true} />
);

export const BetaLabel = (props: Omit<LabelProps, 'beta' | 'icon' | 'variant'>) => (
  <Label {...props} beta={true} variant="warning" icon={<Lightbulb size={14} />} />
);

export const VerifiedLabel = (props: Omit<LabelProps, 'verified' | 'icon' | 'variant'>) => (
  <Label {...props} verified={true} variant="success" icon={<Verified size={14} />} />
);

export const EnterpriseLabel = (props: Omit<LabelProps, 'enterprise' | 'variant'>) => (
  <Label {...props} enterprise={true} variant="enterprise" icon={<Shield size={14} />} glow={true} />
);

export const ComplianceLabel = (props: { compliance: string[]; certification?: string[] }) => (
  <Label
    variant="info"
    icon={<Certificate size={14} />}
    compliance={props.compliance}
    certification={props.certification}
    tooltip="Compliance & Certifications"
  />
);

export default Label;
