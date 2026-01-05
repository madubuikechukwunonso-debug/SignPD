import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  LinearProgress,
  Alert,
  Chip,
  Stack,
  alpha,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  Badge,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Upload,
  Download,
  RefreshCw,
  FileText,
  Image,
  File,
  Zap,
  TrendingUp,
  Clock,
  Settings,
  History,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Info,
  Eye,
  EyeOff,
  QrCode,
  Certificate,
  Users,
  AlertTriangle as AlertIcon,
  RotateCcw
} from 'lucide-react';
import { ImageWithFallback } from "../../figma/ImageWithFallback";

interface ConversionJob {
  id: string;
  fileName: string;
  fromFormat: string;
  toFormat: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  startTime: Date;
  endTime?: Date;
  fileSize: string;
  quality: string;
}

interface BatchConfig {
  enabled: boolean;
  files: File[];
  outputFormat: string;
  quality: string;
  preserveMetadata: boolean;
}

export function DocFun() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fromFormat, setFromFormat] = useState('pdf');
  const [toFormat, setToFormat] = useState('docx');
  const [converting, setConverting] = useState(false);
  const [conversionComplete, setConversionComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeJobs, setActiveJobs] = useState<ConversionJob[]>([]);
  const [batchConfig, setBatchConfig] = useState<BatchConfig>({
    enabled: false,
    files: [],
    outputFormat: 'pdf',
    quality: 'high',
    preserveMetadata: true
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [previewMode, setPreviewMode] = useState<'single' | 'batch'>('single');
  const [showHistory, setShowHistory] = useState(false);

  const formats = [
    { value: 'pdf', label: 'PDF', icon: <FileText size={18} />, description: 'Portable Document Format' },
    { value: 'docx', label: 'DOCX', icon: <FileText size={18} />, description: 'Microsoft Word Document' },
    { value: 'txt', label: 'TXT', icon: <FileText size={18} />, description: 'Plain Text File' },
    { value: 'jpg', label: 'JPG', icon: <Image size={18} />, description: 'JPEG Image' },
    { value: 'png', label: 'PNG', icon: <Image size={18} />, description: 'Portable Network Graphics' },
    { value: 'html', label: 'HTML', icon: <File size={18} />, description: 'Web Page Format' },
    { value: 'xlsx', label: 'XLSX', icon: <FileText size={18} />, description: 'Excel Spreadsheet' },
    { value: 'pptx', label: 'PPTX', icon: <FileText size={18} />, description: 'PowerPoint Presentation' }
  ];

  const conversionHistory = [
    { id: '1', fileName: 'contract.pdf', from: 'PDF', to: 'DOCX', time: '2 min ago', size: '2.4 MB', status: 'completed' },
    { id: '2', fileName: 'report.docx', from: 'DOCX', to: 'PDF', time: '15 min ago', size: '1.8 MB', status: 'completed' },
    { id: '3', fileName: 'image.jpg', from: 'JPG', to: 'PNG', time: '1 hour ago', size: '3.2 MB', status: 'completed' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (batchConfig.enabled) {
        setBatchConfig(prev => ({
          ...prev,
          files: Array.from(files)
        }));
      } else {
        setSelectedFile(files[0]);
      }
      setConversionComplete(false);
    }
  };

  const handleConvert = async () => {
    setConverting(true);
    setConversionComplete(false);
    setProgress(0);

    // Create new job
    const newJob: ConversionJob = {
      id: Date.now().toString(),
      fileName: selectedFile?.name || 'Unknown',
      fromFormat: fromFormat.toUpperCase(),
      toFormat: toFormat.toUpperCase(),
      status: 'processing',
      progress: 0,
      startTime: new Date(),
      fileSize: selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB` : 'Unknown',
      quality: 'high'
    };

    setActiveJobs(prev => [...prev, newJob]);

    // Simulate conversion process
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        
        // Update job progress
        setActiveJobs(jobs => 
          jobs.map(job => 
            job.id === newJob.id 
              ? { ...job, progress: Math.min(newProgress, 100) }
              : job
          )
        );

        if (newProgress >= 100) {
          clearInterval(interval);
          setConverting(false);
          setConversionComplete(true);
          
          // Update job status
          setActiveJobs(jobs => 
            jobs.map(job => 
              job.id === newJob.id 
                ? { 
                    ...job, 
                    status: 'completed',
                    progress: 100,
                    endTime: new Date()
                  }
                : job
            )
          );
          
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const handleDownload = () => {
    alert('Converted file would be downloaded in a real implementation');
  };

  const handleBatchConvert = () => {
    // Simulate batch conversion
    alert(`Converting ${batchConfig.files.length} files to ${batchConfig.outputFormat}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#4caf50';
      case 'processing': return '#2196f3';
      case 'failed': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} />;
      case 'processing': return <RefreshCw size={16} />;
      case 'failed': return <AlertTriangle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <Box>
      {/* Enhanced Header */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            fontSize: '2.5rem'
          }}
        >
          Enterprise Document Converter
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.2rem', maxWidth: 600 }}>
          Advanced multi-format document conversion with batch processing, quality optimization, and enterprise-grade performance
        </Typography>
      </Box>

      {/* Enhanced Performance Metrics */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {[
          { icon: <Zap size={24} />, label: 'Conversions Today', value: '3,247', color: '#f093fb', change: '+18%' },
          { icon: <TrendingUp size={24} />, label: 'Success Rate', value: '99.97%', color: '#f5576c', change: '+0.3%' },
          { icon: <Clock size={24} />, label: 'Avg. Processing Time', value: '1.2s', color: '#4facfe', change: '-0.8s' },
          { icon: <Database size={24} />, label: 'Storage Saved', value: '2.4TB', color: '#43e97b', change: '+15%' }
        ].map((stat, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Card
              elevation={0}
              sx={{
                background: `linear-gradient(135deg, ${stat.color} 0%, ${alpha(stat.color, 0.8)} 100%)`,
                color: 'white',
                borderRadius: 4,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Chip
                    label={stat.change}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.7rem'
                    }}
                  />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.8rem' }}>
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Mode Toggle */}
      <Card elevation={0} sx={{ borderRadius: 4, mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
            <ToggleButtonGroup
              value={previewMode}
              exclusive
              onChange={(e, value) => value && setPreviewMode(value)}
              sx={{
                '& .MuiToggleButton-root': {
                  borderRadius: 2,
                  border: 'none',
                  background: '#f8fafc',
                  '&.Mui-selected': {
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(240, 147, 251, 0.4)'
                  },
                  '&:hover': {
                    background: 'linear-gradient(135deg, #e082ea 0%, #e4465b 100%)'
                  }
                }
              }}
            >
              <ToggleButton value="single">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FileText size={18} />
                  Single File
                </Box>
              </ToggleButton>
              <ToggleButton value="batch">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Database size={18} />
                  Batch Processing
                </Box>
              </ToggleButton>
            </ToggleButtonGroup>
            
            <Stack direction="row" spacing={1}>
              <IconButton
                onClick={() => setShowHistory(!showHistory)}
                sx={{ color: '#666' }}
              >
                <History size={20} />
              </IconButton>
              <IconButton
                onClick={() => setShowAdvanced(!showAdvanced)}
                sx={{ color: '#666' }}
              >
                <Settings size={20} />
              </IconButton>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        {/* Enhanced Main Converter */}
        <Grid item xs={12} lg={8}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider',
              background: 'white',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
              }
            }}
          >
            <CardContent sx={{ p: 4 }}>
              {/* Upload Section */}
              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: selectedFile ? 'success.main' : 'divider',
                  borderRadius: 3,
                  p: 5,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: selectedFile
                    ? alpha('#4caf50', 0.05)
                    : 'linear-gradient(135deg, rgba(240, 147, 251, 0.05) 0%, rgba(245, 87, 108, 0.05) 100%)',
                  '&:hover': {
                    borderColor: 'primary.main',
                    background: alpha('#f093fb', 0.08),
                    transform: 'translateY(-2px)'
                  },
                  mb: 4
                }}
              >
                <input
                  type="file"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="file-upload"
                  multiple={batchConfig.enabled}
                  accept=".pdf,.docx,.txt,.jpg,.png,.html,.xlsx,.pptx"
                />
                <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'block' }}>
                  <Upload size={56} color={selectedFile ? '#4caf50' : '#f093fb'} style={{ marginBottom: 16 }} />
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {selectedFile ? `Selected: ${selectedFile.name}` : 
                     batchConfig.enabled ? 'Drop multiple files here or click to browse' : 
                     'Drop your file here or click to browse'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {batchConfig.enabled ? 
                      'Supports all formats • Batch processing enabled' : 
                      'Supports: PDF, DOCX, TXT, JPG, PNG, HTML, XLSX, PPTX • Maximum 100MB'
                    }
                  </Typography>
                </label>
              </Box>

              {/* Format Selection */}
              {!batchConfig.enabled && (
                <Grid container spacing={3} sx={{ mb: 4 }} alignItems="center">
                  <Grid item xs={12} sm={5}>
                    <FormControl fullWidth>
                      <InputLabel>Convert From</InputLabel>
                      <Select
                        value={fromFormat}
                        label="Convert From"
                        onChange={(e) => setFromFormat(e.target.value)}
                        sx={{
                          borderRadius: 2,
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderWidth: 2
                          }
                        }}
                      >
                        {formats.map((format) => (
                          <MenuItem key={format.value} value={format.value}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {format.icon}
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {format.label}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {format.description}
                                </Typography>
                              </Box>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        boxShadow: '0 4px 12px rgba(240, 147, 251, 0.4)'
                      }}
                    >
                      <RefreshCw size={28} color="white" />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={5}>
                    <FormControl fullWidth>
                      <InputLabel>Convert To</InputLabel>
                      <Select
                        value={toFormat}
                        label="Convert To"
                        onChange={(e) => setToFormat(e.target.value)}
                        sx={{
                          borderRadius: 2,
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderWidth: 2
                          }
                        }}
                      >
                        {formats.map((format) => (
                          <MenuItem key={format.value} value={format.value}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {format.icon}
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {format.label}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {format.description}
                                </Typography>
                              </Box>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              )}

              {/* Batch Configuration */}
              {batchConfig.enabled && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                    Batch Processing Configuration
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Output Format</InputLabel>
                        <Select
                          value={batchConfig.outputFormat}
                          label="Output Format"
                          onChange={(e) => setBatchConfig(prev => ({ ...prev, outputFormat: e.target.value }))}
                          sx={{ borderRadius: 2 }}
                        >
                          {formats.map((format) => (
                            <MenuItem key={format.value} value={format.value}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {format.icon}
                                {format.label}
                              </Box>
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Quality</InputLabel>
                        <Select
                          value={batchConfig.quality}
                          label="Quality"
                          onChange={(e) => setBatchConfig(prev => ({ ...prev, quality: e.target.value }))}
                          sx={{ borderRadius: 2 }}
                        >
                          <MenuItem value="low">Low (Fast)</MenuItem>
                          <MenuItem value="medium">Medium (Balanced)</MenuItem>
                          <MenuItem value="high">High (Best Quality)</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Convert Button */}
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={batchConfig.enabled ? handleBatchConvert : handleConvert}
                disabled={(!selectedFile && !batchConfig.files.length) || converting}
                startIcon={<RefreshCw size={20} />}
                sx={{
                  borderRadius: 2,
                  py: 2,
                  fontWeight: 600,
                  fontSize: '1rem',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  boxShadow: '0 4px 12px rgba(240, 147, 251, 0.4)',
                  mb: 3,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #e082ea 0%, #e4465b 100%)',
                    boxShadow: '0 6px 16px rgba(240, 147, 251, 0.5)'
                  }
                }}
              >
                {converting ? 'Converting...' : batchConfig.enabled ? 'Start Batch Conversion' : 'Start Conversion'}
              </Button>

              {converting && (
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Processing your document...
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                      {Math.round(progress)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: alpha('#f093fb', 0.1),
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)',
                        borderRadius: 4
                      }
                    }}
                  />
                </Box>
              )}

              {conversionComplete && (
                <>
                  <Alert
                    severity="success"
                    sx={{ mb: 3, borderRadius: 2 }}
                    icon={<Download size={20} />}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Conversion completed successfully!
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Your document is ready for download
                    </Typography>
                  </Alert>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<Download size={18} />}
                    onClick={handleDownload}
                    disabled={!conversionComplete}
                    fullWidth
                    size="large"
                    sx={{
                      borderRadius: 2,
                      py: 2,
                      fontWeight: 600,
                      boxShadow: '0 4px 12px rgba(76, 175, 80, 0.4)'
                    }}
                  >
                    Download Converted File
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Enhanced Sidebar */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            {/* Active Jobs */}
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Active Conversions
                </Typography>
                <List sx={{ p: 0 }}>
                  {activeJobs.map((job) => (
                    <ListItem key={job.id} sx={{ px: 0, py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: 1,
                            background: getStatusColor(job.status),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {getStatusIcon(job.status)}
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {job.fileName}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              {job.fromFormat} → {job.toFormat}
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={job.progress}
                              sx={{
                                height: 4,
                                borderRadius: 2,
                                mt: 0.5,
                                '& .MuiLinearProgress-bar': {
                                  background: getStatusColor(job.status)
                                }
                              }}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                  {activeJobs.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                      No active conversions
                    </Typography>
                  )}
                </List>
              </CardContent>
            </Card>

            {/* Conversion History */}
            {showHistory && (
              <Card
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Recent Conversions
                  </Typography>
                  <List sx={{ p: 0 }}>
                    {conversionHistory.map((item, index) => (
                      <ListItem
                        key={item.id}
                        sx={{
                          px: 0,
                          borderBottom: index < conversionHistory.length - 1 ? '1px solid' : 'none',
                          borderColor: 'divider'
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: 1,
                              background: '#4caf50',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <CheckCircle size={16} color="white" />
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {item.from} → {item.to}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="caption" color="text.secondary">
                              {item.time} • {item.size}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            )}

            {/* Popular Formats */}
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Popular Conversions
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {['PDF → DOCX', 'DOCX → PDF', 'JPG → PDF', 'PDF → JPG', 'HTML → PDF', 'PNG → PDF', 'XLSX → PDF', 'PPTX → PDF'].map((format) => (
                    <Chip
                      key={format}
                      label={format}
                      sx={{
                        fontWeight: 600,
                        background: alpha('#f093fb', 0.1),
                        color: '#f5576c',
                        '&:hover': {
                          background: alpha('#f093fb', 0.2)
                        }
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
