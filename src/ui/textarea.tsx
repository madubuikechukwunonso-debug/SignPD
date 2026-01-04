import React, { useState, useRef, useEffect, forwardRef } from 'react';
import {
  Box,
  TextField,
  Typography,
  Stack,
  Chip,
  IconButton,
  InputAdornment,
  LinearProgress,
  alpha,
  Card,
  CardContent,
  Grid,
  Tooltip,
  Badge,
  FormHelperText,
  FormLabel,
  FormControl
} from '@mui/material';
import {
  Type,
  Hash,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  Smile,
  Paperclip,
  Clock,
  BarChart3,
  Settings,
  Maximize2,
  Minimize2,
  Download,
  Upload,
  Save,
  RotateCcw,
  Eye,
  EyeOff,
  Zap,
  Activity,
  TrendingUp,
  CheckCircle,
  XCircle,
  Copy,
  Scissors,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
  Strikethrough,
  Superscript,
  Subscript,
  Pilcrow,
  TextQuote,
  Code2,
  Terminal,
  Palette,
  TypeOutline,
  Grid3x3,
  Columns,
  WrapText,
  RemoveFormatting
} from 'lucide-react';

interface TextAreaProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  minRows?: number;
  maxRows?: number;
  maxLength?: number;
  showCharCount?: boolean;
  showWordCount?: boolean;
  showLineCount?: boolean;
  showReadingTime?: boolean;
  autoFocus?: boolean;
  autoResize?: boolean;
  autoSave?: boolean;
  autoSaveDelay?: number;
  richText?: boolean;
  markdown?: boolean;
  code?: boolean;
  showToolbar?: boolean;
  toolbarPosition?: 'top' | 'bottom' | 'floating';
  showFormatting?: boolean;
  showEmojiPicker?: boolean;
  showFileUpload?: boolean;
  fileTypes?: string[];
  maxFileSize?: number;
  showPreview?: boolean;
  previewPosition?: 'side' | 'bottom' | 'modal';
  showStats?: boolean;
  showAnalytics?: boolean;
  analytics?: {
    characters: number;
    words: number;
    sentences: number;
    paragraphs: number;
    readingTime: number;
    writingLevel: string;
  };
  customStyles?: {
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: number;
    fontFamily?: string;
    fontSize?: number;
    lineHeight?: number;
  };
  placeholderStyles?: {
    color?: string;
    fontStyle?: string;
  };
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => boolean | string;
  };
  shortcuts?: Array<{
    key: string;
    label: string;
    action: () => void;
  }>;
  showShortcuts?: boolean;
  onFileUpload?: (files: File[]) => void;
  onSave?: (value: string) => void;
  onLoad?: (content: string) => void;
  loading?: boolean;
  loadingText?: string;
  fullscreen?: boolean;
  onFullscreenChange?: (fullscreen: boolean) => void;
  showLineNumbers?: boolean;
  syntaxHighlighting?: boolean;
  language?: string;
  theme?: 'light' | 'dark' | 'auto';
  showFindReplace?: boolean;
  findText?: string;
  replaceText?: string;
  onFind?: (text: string) => void;
  onReplace?: (findText: string, replaceText: string) => void;
  showTemplates?: boolean;
  templates?: Array<{
    name: string;
    content: string;
    category: string;
    description?: string;
  }>;
  showHistory?: boolean;
  history?: string[];
  maxHistory?: number;
  onHistoryChange?: (history: string[]) => void;
}

interface ToolbarButton {
  icon: React.ReactNode;
  label: string;
  action: () => void;
  active?: boolean;
  disabled?: boolean;
  shortcut?: string;
}

interface TextStats {
  characters: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
  writingLevel: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  value: controlledValue,
  defaultValue = '',
  onChange,
  onBlur,
  onFocus,
  placeholder = 'Enter your text here...',
  label,
  description,
  disabled = false,
  required = false,
  error = false,
  helperText,
  minRows = 4,
  maxRows = 10,
  maxLength,
  showCharCount = true,
  showWordCount = true,
  showLineCount = false,
  showReadingTime = true,
  autoFocus = false,
  autoResize = true,
  autoSave = false,
  autoSaveDelay = 2000,
  richText = false,
  markdown = false,
  code = false,
  showToolbar = true,
  toolbarPosition = 'top',
  showFormatting = true,
  showEmojiPicker = false,
  showFileUpload = false,
  fileTypes = ['.txt', '.md', '.json', '.xml'],
  maxFileSize = 5 * 1024 * 1024, // 5MB
  showPreview = false,
  previewPosition = 'side',
  showStats = true,
  showAnalytics = false,
  analytics,
  customStyles,
  placeholderStyles,
  validation,
  shortcuts = [],
  showShortcuts = false,
  onFileUpload,
  onSave,
  onLoad,
  loading = false,
  loadingText = 'Loading...',
  fullscreen = false,
  onFullscreenChange,
  showLineNumbers = false,
  syntaxHighlighting = false,
  language = 'plaintext',
  theme = 'light',
  showFindReplace = false,
  findText = '',
  replaceText = '',
  onFind,
  onReplace,
  showTemplates = false,
  templates = [],
  showHistory = false,
  history = [],
  maxHistory = 10,
  onHistoryChange
}, ref) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [value, setValue] = useState(controlledValue !== undefined ? controlledValue : internalValue);
  const [isFocused, setIsFocused] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(fullscreen);
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [currentFindText, setCurrentFindText] = useState(findText);
  const [currentReplaceText, setCurrentReplaceText] = useState(replaceText);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [localHistory, setLocalHistory] = useState(history);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  useEffect(() => {
    updateStats(value);
  }, [value]);

  useEffect(() => {
    if (autoSave && value) {
      const timer = setTimeout(() => {
        handleAutoSave();
      }, autoSaveDelay);

      return () => clearTimeout(timer);
    }
  }, [value, autoSave, autoSaveDelay]);

  useEffect(() => {
    if (onHistoryChange) {
      onHistoryChange(localHistory);
    }
  }, [localHistory, onHistoryChange]);

  const updateStats = (text: string) => {
    const chars = text.length;
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    const readingTime = Math.ceil(words / 200); // Average reading speed

    setCharCount(chars);
    setWordCount(words);
    setLineCount(text.split('\n').length);
    setReadingTime(readingTime);
  };

  const handleAutoSave = async () => {
    if (!onSave) return;
    
    setIsAutoSaving(true);
    try {
      await onSave(value);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setIsAutoSaving(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    
    if (maxLength && newValue.length > maxLength) {
      return;
    }

    if (validation) {
      if (validation.minLength && newValue.length < validation.minLength) {
        return;
      }
      if (validation.maxLength && newValue.length > validation.maxLength) {
        return;
      }
      if (validation.pattern && !validation.pattern.test(newValue)) {
        return;
      }
      if (validation.custom) {
        const result = validation.custom(newValue);
        if (result !== true) {
          return;
        }
      }
    }

    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    setValue(newValue);
    onChange?.(newValue);

    // Add to history
    if (showHistory && newValue !== localHistory[0]) {
      const newHistory = [newValue, ...localHistory.slice(0, maxHistory - 1)];
      setLocalHistory(newHistory);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.size > maxFileSize) {
        alert(`File ${file.name} is too large. Maximum size is ${maxFileSize / 1024 / 1024}MB`);
        return;
      }

      if (!fileTypes.some(type => file.name.toLowerCase().endsWith(type))) {
        alert(`File type ${file.type} is not supported`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const newValue = value + (value ? '\n\n' : '') + content;
        
        if (controlledValue === undefined) {
          setInternalValue(newValue);
        }
        setValue(newValue);
        onChange?.(newValue);
        
        if (onFileUpload) {
          onFileUpload([file]);
        }
      };
      reader.readAsText(file);
    });
  };

  const handleSave = () => {
    if (onSave) {
      onSave(value);
      setLastSaved(new Date());
    }
  };

  const handleLoad = (content: string) => {
    if (onLoad) {
      onLoad(content);
    }
    
    if (controlledValue === undefined) {
      setInternalValue(content);
    }
    setValue(content);
    onChange?.(content);
  };

  const handleTemplateSelect = (templateName: string) => {
    const template = templates.find(t => t.name === templateName);
    if (template) {
      handleLoad(template.content);
      setSelectedTemplate(templateName);
    }
  };

  const handleHistorySelect = (historyItem: string) => {
    handleLoad(historyItem);
    setShowHistory(false);
  };

  const handleFind = () => {
    if (onFind && currentFindText) {
      onFind(currentFindText);
    }
  };

  const handleReplace = () => {
    if (onReplace && currentFindText && currentReplaceText) {
      onReplace(currentFindText, currentReplaceText);
    }
  };

  const insertText = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = value.substring(0, start) + text + value.substring(end);

    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    setValue(newValue);
    onChange?.(newValue);

    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  };

  const toolbarButtons: ToolbarButton[] = [
    {
      icon: <Bold size={16} />,
      label: 'Bold',
      action: () => insertText('**bold text**'),
      shortcut: 'Ctrl+B'
    },
    {
      icon: <Italic size={16} />,
      label: 'Italic',
      action: () => insertText('*italic text*'),
      shortcut: 'Ctrl+I'
    },
    {
      icon: <Code size={16} />,
      label: 'Code',
      action: () => insertText('`code`'),
      shortcut: 'Ctrl+Shift+C'
    },
    {
      icon: <List size={16} />,
      label: 'List',
      action: () => insertText('- Item 1\n- Item 2\n- Item 3'),
      shortcut: 'Ctrl+L'
    },
    {
      icon: <Quote size={16} />,
      label: 'Quote',
      action: () => insertText('> quote text'),
      shortcut: 'Ctrl+Shift+Q'
    },
    {
      icon: <Link size={16} />,
      label: 'Link',
      action: () => insertText('[link text](url)'),
      shortcut: 'Ctrl+K'
    }
  ];

  const getThemeStyles = () => {
    const isDark = theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    return {
      backgroundColor: isDark ? '#1a1a1a' : (customStyles?.backgroundColor || 'white'),
      color: isDark ? 'white' : '#1a1a1a',
      borderColor: isDark ? 'rgba(255,255,255,0.1)' : (customStyles?.borderColor || 'rgba(0,0,0,0.1)')
    };
  };

  const themeStyles = getThemeStyles();

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header with Label and Stats */}
      {(label || showStats) && (
        <Box sx={{ mb: 3 }}>
          {label && (
            <FormControl fullWidth>
              <FormLabel
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: error ? '#f44336' : themeStyles.color,
                  fontSize: '1.1rem'
                }}
              >
                {label}
                {required && <span style={{ color: '#f44336' }}>*</span>}
              </FormLabel>
              {description && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {description}
                </Typography>
              )}
            </FormControl>
          )}

          {/* Stats */}
          {showStats && (
            <Card elevation={0} sx={{ background: alpha('#43e97b', 0.05), borderRadius: 3, mb: 2 }}>
              <CardContent sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  {showCharCount && (
                    <Grid item>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="caption" color="text.secondary">Characters</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {charCount}{maxLength ? `/${maxLength}` : ''}
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                  {showWordCount && (
                    <Grid item>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="caption" color="text.secondary">Words</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{wordCount}</Typography>
                      </Box>
                    </Grid>
                  )}
                  {showLineCount && (
                    <Grid item>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="caption" color="text.secondary">Lines</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{lineCount}</Typography>
                      </Box>
                    </Grid>
                  )}
                  {showReadingTime && (
                    <Grid item>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="caption" color="text.secondary">Read Time</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{readingTime} min</Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          )}
        </Box>
      )}

      {/* Toolbar */}
      {showToolbar && (
        <Card
          elevation={0}
          sx={{
            mb: 2,
            background: alpha('#f8fafc', 0.8),
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {/* Formatting Buttons */}
              {showFormatting && toolbarButtons.map((button, index) => (
                <Tooltip key={index} title={`${button.label} (${button.shortcut})`}>
                  <IconButton
                    size="small"
                    onClick={button.action}
                    disabled={disabled || loading}
                    sx={{
                      background: button.active ? alpha('#667eea', 0.1) : 'transparent',
                      color: button.active ? '#667eea' : '#666',
                      '&:hover': {
                        background: alpha('#667eea', 0.1)
                      }
                    }}
                  >
                    {button.icon}
                  </IconButton>
                </Tooltip>
              ))}

              {/* File Upload */}
              {showFileUpload && (
                <IconButton
                  component="label"
                  size="small"
                  disabled={disabled || loading}
                  sx={{
                    background: alpha('#43e97b', 0.1),
                    color: '#43e97b',
                    '&:hover': { background: alpha('#43e97b', 0.2) }
                  }}
                >
                  <Upload size={16} />
                  <input
                    type="file"
                    hidden
                    multiple
                    accept={fileTypes.join(',')}
                    onChange={handleFileUpload}
                  />
                </IconButton>
              )}

              {/* Preview Toggle */}
              {showPreview && (
                <IconButton
                  size="small"
                  onClick={() => setShowPreview(!showPreview)}
                  sx={{
                    background: showPreview ? alpha('#4facfe', 0.1) : 'transparent',
                    color: showPreview ? '#4facfe' : '#666'
                  }}
                >
                  {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                </IconButton>
              )}

              {/* Fullscreen Toggle */}
              <IconButton
                size="small"
                onClick={() => {
                  setIsFullscreen(!isFullscreen);
                  onFullscreenChange?.(!isFullscreen);
                }}
                sx={{
                  background: isFullscreen ? alpha('#f093fb', 0.1) : 'transparent',
                  color: isFullscreen ? '#f093fb' : '#666'
                }}
              >
                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </IconButton>

              {/* Save Button */}
              {onSave && (
                <IconButton
                  size="small"
                  onClick={handleSave}
                  disabled={isAutoSaving}
                  sx={{
                    background: alpha('#4facfe', 0.1),
                    color: '#4facfe',
                    '&:hover': { background: alpha('#4facfe', 0.2) }
                  }}
                >
                  {isAutoSaving ? <Clock size={16} /> : <Save size={16} />}
                </IconButton>
              )}

              {/* Templates */}
              {showTemplates && templates.length > 0 && (
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={selectedTemplate}
                    onChange={(e) => handleTemplateSelect(e.target.value)}
                    displayEmpty
                    sx={{
                      fontSize: '0.8rem',
                      '& .MuiSelect-select': {
                        py: 0.5
                      }
                    }}
                  >
                    <MenuItem value="">
                      <em>Select Template</em>
                    </MenuItem>
                    {templates.map((template, index) => (
                      <MenuItem key={index} value={template.name}>
                        {template.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {/* History */}
              {showHistory && (
                <IconButton
                  size="small"
                  onClick={() => setShowHistory(!showHistory)}
                  sx={{
                    background: showHistory ? alpha('#667eea', 0.1) : 'transparent',
                    color: showHistory ? '#667eea' : '#666'
                  }}
                >
                  <Clock size={16} />
                </IconButton>
              )}
            </Stack>

            {/* Auto-save Status */}
            {autoSave && lastSaved && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Last saved: {lastSaved.toLocaleTimeString()}
              </Typography>
            )}
          </CardContent>
        </Card>
      )}

      {/* Main Content Area */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          minHeight: isFullscreen ? '80vh' : 'auto',
          flexDirection: previewPosition === 'bottom' ? 'column' : 'row'
        }}
      >
        {/* Textarea Container */}
        <Box sx={{ flexGrow: 1, position: 'relative' }}>
          <TextField
            inputRef={ref || textareaRef}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholder={placeholder}
            disabled={disabled || loading}
            multiline
            minRows={minRows}
            maxRows={maxRows}
            autoFocus={autoFocus}
            inputProps={{
              maxLength,
              style: {
                fontFamily: customStyles?.fontFamily || 'inherit',
                fontSize: customStyles?.fontSize || '1rem',
                lineHeight: customStyles?.lineHeight || 1.5,
                padding: showLineNumbers ? '12px 12px 12px 48px' : '12px',
                background: themeStyles.backgroundColor,
                color: themeStyles.color,
                borderRadius: customStyles?.borderRadius || 8
              }
            }}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                background: themeStyles.backgroundColor,
                borderRadius: customStyles?.borderRadius || 4,
                border: `2px solid ${error ? '#f44336' : (isFocused ? '#667eea' : themeStyles.borderColor)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: error ? '#f44336' : '#667eea'
                },
                '&.Mui-focused': {
                  borderColor: error ? '#f44336' : '#667eea',
                  boxShadow: `0 0 0 3px ${alpha(error ? '#f44336' : '#667eea', 0.1)}`
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                },
                '& input::placeholder': {
                  color: placeholderStyles?.color || alpha(themeStyles.color, 0.5),
                  fontStyle: placeholderStyles?.fontStyle || 'italic'
                }
              }
            }}
          />

          {/* Line Numbers */}
          {showLineNumbers && (
            <Box
              sx={{
                position: 'absolute',
                left: 8,
                top: 12,
                bottom: 12,
                width: 32,
                background: alpha(themeStyles.color, 0.05),
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                padding: '4px 8px',
                fontSize: '0.8rem',
                color: alpha(themeStyles.color, 0.5),
                pointerEvents: 'none',
                overflow: 'hidden'
              }}
            >
              {Array.from({ length: Math.max(minRows, value.split('\n').length) }, (_, i) => (
                <Box key={i} sx={{ height: `${customStyles?.lineHeight || 1.5}em` }}>
                  {i + 1}
                </Box>
              ))}
            </Box>
          )}

          {/* Loading Overlay */}
          {loading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: alpha(themeStyles.backgroundColor, 0.8),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: customStyles?.borderRadius || 4
              }}
            >
              <Stack alignItems="center" spacing={1}>
                <CircularProgress size={24} sx={{ color: '#667eea' }} />
                <Typography variant="body2" color="text.secondary">
                  {loadingText}
                </Typography>
              </Stack>
            </Box>
          )}
        </Box>

        {/* Preview Panel */}
        {showPreview && (
          <Card
            elevation={0}
            sx={{
              width: previewPosition === 'side' ? '400px' : '100%',
              background: alpha('#f8fafc', 0.8),
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                Preview
              </Typography>
              <Box
                sx={{
                  p: 2,
                  background: 'white',
                  borderRadius: 2,
                  minHeight: 200,
                  maxHeight: 400,
                  overflow: 'auto',
                  fontFamily: 'inherit',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}
              >
                {value || <Typography color="text.secondary">Preview will appear here...</Typography>}
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Helper Text */}
      {helperText && (
        <FormHelperText
          error={error}
          sx={{
            mt: 1,
            fontWeight: error ? 600 : 400,
            color: error ? '#f44336' : alpha(themeStyles.color, 0.7)
          }}
        >
          {helperText}
        </FormHelperText>
      )}

      {/* History Panel */}
      {showHistory && (
        <Card elevation={0} sx={{ mt: 2, background: alpha('#f8fafc', 0.8), borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
              History ({localHistory.length})
            </Typography>
            <Stack spacing={1} maxHeight={200} overflow="auto">
              {localHistory.map((item, index) => (
                <Card
                  key={index}
                  elevation={0}
                  sx={{
                    p: 2,
                    background: 'white',
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background: alpha('#667eea', 0.05)
                    }
                  }}
                  onClick={() => handleHistorySelect(item)}
                >
                  <Typography variant="body2" noWrap>
                    {item.substring(0, 100)}{item.length > 100 ? '...' : ''}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {index === 0 ? 'Current' : `${index} versions ago`}
                  </Typography>
                </Card>
              ))}
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* Analytics Panel */}
      {showAnalytics && (
        <Card elevation={0} sx={{ mt: 2, background: alpha('#43e97b', 0.05), borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
              Writing Analytics
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#43e97b' }}>
                    {charCount}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">Characters</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#4facfe' }}>
                    {wordCount}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">Words</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#f093fb' }}>
                    {lineCount}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">Lines</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#667eea' }}>
                    {readingTime}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">Min Read</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Box>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;
