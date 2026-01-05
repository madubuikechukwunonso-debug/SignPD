import React, { useState, useEffect } from 'react';
import { 
  Avatar as MuiAvatar, 
  AvatarGroup as MuiAvatarGroup,
  Box,
  Typography,
  Badge,
  Stack,
  alpha,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material';
import { 
  User, 
  CheckCircle, 
  Clock, 
  XCircle,
  Shield,
  Star,
  Award,
  Camera,
  Edit3,
  Settings
} from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'circular' | 'rounded' | 'square';
  status?: 'online' | 'offline' | 'away' | 'busy' | 'new';
  showStatus?: boolean;
  showBadge?: boolean;
  badgeContent?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  editable?: boolean;
  onEdit?: () => void;
  borderColor?: string;
  borderWidth?: number;
  fallbackIcon?: React.ReactNode;
  fallbackText?: string;
  background?: string;
  textColor?: string;
  fontSize?: string | number;
  sx?: any;
}

interface AvatarGroupProps {
  avatars: Array<{
    src?: string;
    name?: string;
    alt?: string;
    status?: 'online' | 'offline' | 'away' | 'busy';
  }>;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'circular' | 'rounded' | 'square';
  spacing?: 'small' | 'medium' | 'large';
  showStatus?: boolean;
  className?: string;
  onAvatarClick?: (index: number) => void;
  total?: number;
}

interface AvatarCardProps {
  avatar: AvatarProps;
  title?: string;
  subtitle?: string;
  description?: string;
  actions?: React.ReactNode;
  status?: string;
  role?: string;
  department?: string;
  verified?: boolean;
  rating?: number;
  showRole?: boolean;
  showDepartment?: boolean;
  showVerified?: boolean;
  showRating?: boolean;
  className?: string;
}

interface AvatarStackProps {
  avatars: AvatarProps[];
  direction?: 'horizontal' | 'vertical';
  spacing?: number;
  showNames?: boolean;
  showStatuses?: boolean;
  className?: string;
}

const getStatusColor = (status: string | undefined) => {
  switch (status) {
    case 'online': return '#44b700';
    case 'offline': return '#9e9e9e';
    case 'away': return '#ffa726';
    case 'busy': return '#f44336';
    case 'new': return '#2196f3';
    default: return 'transparent';
  }
};

const getStatusIcon = (status: string | undefined) => {
  switch (status) {
    case 'online': return <CheckCircle size={12} color="#44b700" />;
    case 'away': return <Clock size={12} color="#ffa726" />;
    case 'busy': return <XCircle size={12} color="#f44336" />;
    case 'new': return <Star size={12} color="#2196f3" />;
    default: return null;
  }
};

const getSize = (size: string | undefined) => {
  switch (size) {
    case 'xs': return 24;
    case 'sm': return 32;
    case 'md': return 40;
    case 'lg': return 48;
    case 'xl': return 56;
    case '2xl': return 64;
    default: return 40;
  }
};

const getInitials = (name: string | undefined) => {
  if (!name) return 'U';
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  variant = 'circular',
  status,
  showStatus = false,
  showBadge = false,
  badgeContent,
  className,
  onClick,
  editable = false,
  onEdit,
  borderColor,
  borderWidth = 2,
  fallbackIcon,
  fallbackText,
  background,
  textColor,
  fontSize,
  sx = {}
}) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const avatarSize = getSize(size);
  const statusColor = getStatusColor(status);
  const statusIcon = getStatusIcon(status);

  useEffect(() => {
    setImageError(false);
  }, [src]);

  const handleImageError = () => {
    setImageError(true);
  };

  const getBackgroundColor = () => {
    if (background) return background;
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'];
    const nameIndex = (name || 'User').charCodeAt(0) % colors.length;
    return colors[nameIndex];
  };

  const avatarContent = () => {
    if (src && !imageError) {
      return null; // MUI Avatar will handle the image
    }

    if (fallbackText) {
      return (
        <Typography 
          sx={{ 
            fontSize: fontSize || avatarSize * 0.4,
            fontWeight: 600,
            color: textColor || 'white'
          }}
        >
          {fallbackText}
        </Typography>
      );
    }

    if (fallbackIcon) {
      return fallbackIcon;
    }

    if (name) {
      return (
        <Typography 
          sx={{ 
            fontSize: fontSize || avatarSize * 0.4,
            fontWeight: 600,
            color: textColor || 'white'
          }}
        >
          {getInitials(name)}
        </Typography>
      );
    }

    return <User size={avatarSize * 0.5} color={textColor || 'white'} />;
  };

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <MuiAvatar
        src={src}
        alt={alt || name}
        variant={variant}
        onClick={onClick}
        onError={handleImageError}
        sx={{
          width: avatarSize,
          height: avatarSize,
          background: getBackgroundColor(),
          cursor: onClick ? 'pointer' : 'default',
          border: borderColor ? `${borderWidth}px solid ${borderColor}` : 'none',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: onClick || editable ? 'scale(1.05)' : 'none',
            boxShadow: onClick || editable ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
          },
          ...sx
        }}
        className={className}
      >
        {avatarContent()}
      </MuiAvatar>

      {showStatus && status && (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: statusColor,
                border: '2px solid white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {statusIcon}
            </Box>
          }
        />
      )}

      {showBadge && badgeContent && (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          badgeContent={badgeContent}
        />
      )}

      {editable && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            '&:hover': {
              transform: 'scale(1.1)',
            }
          }}
          onClick={onEdit}
        >
          <Edit3 size={12} color="white" />
        </Box>
      )}

      {editable && isHovered && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            borderRadius: variant === 'circular' ? '50%' : variant === 'rounded' ? '8px' : '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onEdit}
        >
          <Camera size={avatarSize * 0.3} color="white" />
        </Box>
      )}
    </Box>
  );
};

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 4,
  size = 'md',
  variant = 'circular',
  spacing = 'medium',
  showStatus = false,
  className,
  onAvatarClick,
  total
}) => {
  const spacingMap = {
    small: -8,
    medium: -16,
    large: -24
  };

  const displayAvatars = avatars.slice(0, max);
  const remainingCount = total || Math.max(0, avatars.length - max);

  return (
    <MuiAvatarGroup
      max={max}
      spacing={spacingMap[spacing]}
      className={className}
      sx={{
        '& .MuiAvatar-root': {
          border: '2px solid white',
          cursor: onAvatarClick ? 'pointer' : 'default',
        }
      }}
    >
      {displayAvatars.map((avatar, index) => (
        <MuiAvatar
          key={index}
          src={avatar.src}
          alt={avatar.alt || avatar.name}
          variant={variant}
          onClick={() => onAvatarClick?.(index)}
          sx={{
            width: getSize(size),
            height: getSize(size),
            position: 'relative'
          }}
        >
          {avatar.src ? null : getInitials(avatar.name)}
          {showStatus && avatar.status && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: getStatusColor(avatar.status),
                border: '2px solid white',
                zIndex: 1
              }}
            />
          )}
        </MuiAvatar>
      ))}
      {remainingCount > 0 && (
        <MuiAvatar
          sx={{
            width: getSize(size),
            height: getSize(size),
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontSize: '0.875rem',
            fontWeight: 600
          }}
        >
          +{remainingCount}
        </MuiAvatar>
      )}
    </MuiAvatarGroup>
  );
};

export const AvatarCard: React.FC<AvatarCardProps> = ({
  avatar,
  title,
  subtitle,
  description,
  actions,
  status,
  role,
  department,
  verified = false,
  rating,
  showRole = true,
  showDepartment = true,
  showVerified = true,
  showRating = true,
  className
}) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          transform: 'translateY(-2px)'
        }
      }}
      className={className}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={3} alignItems="flex-start">
          <Avatar {...avatar} size="lg" />
          
          <Box sx={{ flexGrow: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {title}
              </Typography>
              {verified && showVerified && (
                <Tooltip title="Verified">
                  <CheckCircle size={16} color="#4caf50" />
                </Tooltip>
              )}
              {status && (
                <Chip
                  label={status}
                  size="small"
                  sx={{
                    background: alpha(getStatusColor(status), 0.1),
                    color: getStatusColor(status),
                    fontWeight: 600
                  }}
                />
              )}
            </Stack>

            {subtitle && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {subtitle}
              </Typography>
            )}

            <Stack direction="row" spacing={2} sx={{ mb: description ? 2 : 0 }}>
              {role && showRole && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Shield size={14} color="#666" />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {role}
                  </Typography>
                </Box>
              )}
              {department && showDepartment && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Award size={14} color="#666" />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {department}
                  </Typography>
                </Box>
              )}
            </Stack>

            {description && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {description}
              </Typography>
            )}

            {rating && showRating && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    color={i < Math.floor(rating) ? '#ffc107' : '#e0e0e0'}
                    fill={i < Math.floor(rating) ? '#ffc107' : '#e0e0e0'}
                  />
                ))}
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {rating}
                </Typography>
              </Box>
            )}

            {actions && (
              <Box sx={{ mt: 2 }}>
                {actions}
              </Box>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export const AvatarStack: React.FC<AvatarStackProps> = ({
  avatars,
  direction = 'horizontal',
  spacing = 2,
  showNames = false,
  showStatuses = false,
  className
}) => {
  return (
    <Stack
      direction={direction}
      spacing={spacing}
      className={className}
      sx={{
        alignItems: 'center'
      }}
    >
      {avatars.map((avatar, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar {...avatar} showStatus={showStatuses} />
          {showNames && avatar.name && (
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {avatar.name}
            </Typography>
          )}
        </Box>
      ))}
    </Stack>
  );
};

// Export default components
export default {
  Avatar,
  AvatarGroup,
  AvatarCard,
  AvatarStack
};
