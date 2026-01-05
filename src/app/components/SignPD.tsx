import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Alert,
  Chip,
  LinearProgress,
  Stack,
  alpha,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import {
  Upload,
  Download,
  Trash2,
  CheckCircle,
  FileText,
  Lock,
  Clock,
  Shield,
  Eye,
  EyeOff,
  History,
  Settings,
  QrCode,
  Certificate,
  Users,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { ImageWithFallback } from "../../figma/ImageWithFallback";

interface DocumentWorkflow {
  id: string;
  name: string;
  description: string;
  steps: string[];
  participants: number;
}

interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
}

export function SignPD() {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [uploadedDoc, setUploadedDoc] = useState<string | null>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedWorkflow, setSelectedWorkflow] = useState('standard');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [auditLog, setAuditLog] = useState<AuditLog[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [showPreview, setShowPreview] = useState(true);
  const [securityLevel, setSecurityLevel] = useState('high');

  const workflows: DocumentWorkflow[] = [
    {
      id: 'standard',
      name: 'Standard Signing',
      description: 'Basic document signing with single signature',
      steps: ['Upload Document', 'Add Signature', 'Download'],
      participants: 1
    },
    {
      id: 'multi',
      name: 'Multi-Party Signing',
      description: 'Multiple signatures required from different parties',
      steps: ['Upload Document', 'Send to Parties', 'Collect Signatures', 'Finalize'],
      participants: 3
    },
    {
      id: 'witness',
      name: 'Witnessed Signing',
      description: 'Document signing with witness verification',
      steps: ['Upload Document', 'Add Witness', 'Sign with Witness', 'Complete'],
      participants: 2
    }
  ];

  const auditLogs: AuditLog[] = [
    { id: '1', action: 'Document uploaded', user: 'John Doe', timestamp: '2 min ago', status: 'success' },
    { id: '2', action: 'Signature applied', user: 'Jane Smith', timestamp: '5 min ago', status: 'success' },
    { id: '3', action: 'Document encrypted', user: 'System', timestamp: '1 hour ago', status: 'success' }
  ];

  const clearSignature = () => {
    sigCanvas.current?.clear();
    setIsSigned(false);
    addAuditLog('Signature cleared', 'warning');
  };

  const saveSignature = () => {
    if (sigCanvas.current) {
      const signatureData = sigCanvas.current.toDataURL();
      console.log('Signature saved:', signatureData);
      setIsSigned(true);
      addAuditLog('Signature applied successfully', 'success');
    }
  };

  const addAuditLog = (action: string, status: 'success' | 'warning' | 'error') => {
    const newLog: AuditLog = {
      id: Date.now().toString(),
      action,
      user: 'Current User',
      timestamp: 'Just now',
      status
    };
    setAuditLog([newLog, ...auditLogs.slice(0, 4)]);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadProgress(0);
      const reader = new FileReader();
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          setUploadProgress((e.loaded / e.total) * 100);
        }
      };
      reader.onload = (e) => {
        setUploadedDoc(e.target?.result as string);
        setIsSigned(false);
        setUploadProgress(100);
        addAuditLog('Document uploaded successfully', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadDocument = () => {
    addAuditLog('Document downloaded with signature', 'success');
    alert('Document with signature would be downloaded in a real implementation');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle size={16} color="#4caf50" />;
      case 'warning': return <AlertTriangle size={16} color="#ff9800" />;
      case 'error': return <AlertTriangle size={16} color="#f44336" />;
      default: return <CheckCircle size={16} color="#4caf50" />;
    }
  };

  const steps = ['Document Upload', 'Signature Configuration', 'Review & Sign', 'Download & Archive'];

  return (
    <Box>
      {/* Enhanced Header Section */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            fontSize: '2.5rem'
          }}
        >
          Enterprise Document Signing
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.2rem', maxWidth: 600 }}>
          Secure, compliant, and efficient document signing with advanced audit trails and enterprise-grade security
        </Typography>
      </Box>

      {/* Enhanced Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {[
          { icon: <FileText size={24} />, label: 'Documents Processed', value: '15,247', color: '#667eea', change: '+12%' },
          { icon: <Clock size={24} />, label: 'Avg. Processing Time', value: '1.8s', color: '#764ba2', change: '-0.5s' },
          { icon: <Shield size={24} />, label: 'Security Compliance', value: 'SOC 2', color: '#f093fb', change: 'Active' },
          { icon: <CheckCircle size={24} />, label: 'Success Rate', value: '99.97%', color: '#4facfe', change: '+0.2%' }
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
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

      {/* Workflow Configuration */}
      <Card elevation={0} sx={{ borderRadius: 4, mb: 4, border: '1px solid', borderColor: 'divider' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
            Document Workflow Configuration
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Signing Workflow</InputLabel>
                <Select
                  value={selectedWorkflow}
                  label="Signing Workflow"
                  onChange={(e) => setSelectedWorkflow(e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  {workflows.map((workflow) => (
                    <MenuItem key={workflow.id} value={workflow.id}>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {workflow.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {workflow.description}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Security Level</InputLabel>
                <Select
                  value={securityLevel}
                  label="Security Level"
                  onChange={(e) => setSecurityLevel(e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="basic">Basic Encryption</MenuItem>
                  <MenuItem value="high">High Security (AES-256)</MenuItem>
                  <MenuItem value="enterprise">Enterprise (Multi-factor)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Stepper */}
      <Card elevation={0} sx={{ borderRadius: 4, mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Stepper activeStep={activeStep} orientation="horizontal" sx={{ mb: 4 }}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    '& .MuiStepLabel-label': {
                      fontWeight: 600,
                      fontSize: '0.9rem'
                    }
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        {/* Enhanced Document Upload Section */}
        <Grid item xs={12} lg={uploadedDoc ? 8 : 12}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider',
              height: '100%',
              background: 'white',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
              }
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Document Upload & Preview
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {uploadedDoc && (
                    <Chip
                      icon={<CheckCircle size={16} />}
                      label="Ready to Sign"
                      color="success"
                      sx={{ fontWeight: 600 }}
                    />
                  )}
                  <IconButton
                    onClick={() => setShowPreview(!showPreview)}
                    sx={{ color: '#666' }}
                  >
                    {showPreview ? <EyeOff size={18} /> : <Eye size={18} />}
                  </IconButton>
                </Box>
              </Stack>

              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: uploadedDoc ? 'success.main' : 'divider',
                  borderRadius: 3,
                  p: 5,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: uploadedDoc
                    ? alpha('#4caf50', 0.05)
                    : 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                  '&:hover': {
                    borderColor: 'primary.main',
                    background: alpha('#667eea', 0.08),
                    transform: 'translateY(-2px)'
                  },
                  mb: 3
                }}
              >
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="doc-upload"
                />
                <label htmlFor="doc-upload" style={{ cursor: 'pointer', display: 'block' }}>
                  <Upload size={56} color={uploadedDoc ? '#4caf50' : '#667eea'} style={{ marginBottom: 16 }} />
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {uploadedDoc ? 'Document Uploaded Successfully' : 'Drop your file here or click to browse'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Supports PDF, DOC, DOCX, TXT • Maximum file size: 25MB • Enterprise encryption enabled
                  </Typography>
                </label>
              </Box>

              {uploadProgress > 0 && uploadProgress < 100 && (
                <Box sx={{ mb: 3 }}>
                  <LinearProgress
                    variant="determinate"
                    value={uploadProgress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: alpha('#667eea', 0.1),
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: 4
                      }
                    }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Uploading... {Math.round(uploadProgress)}%
                  </Typography>
                </Box>
              )}

              {/* Enhanced Document Preview */}
              {showPreview && (
                <Box
                  sx={{
                    height: 400,
                    bgcolor: '#f8fafc',
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                    position: 'relative'
                  }}
                >
                  {uploadedDoc ? (
                    <>
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1603796846097-bee99e4a601f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N1bWVudCUyMHNpZ25pbmd8ZW58MXx8fHwxNzY3NTU0OTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Document preview"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          display: 'flex',
                          gap: 1
                        }}
                      >
                        <Chip
                          label="Page 1 of 3"
                          size="small"
                          sx={{
                            bgcolor: 'white',
                            fontWeight: 600,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                          }}
                        />
                        <Chip
                          icon={<Certificate size={14} />}
                          label="Verified"
                          size="small"
                          color="success"
                          sx={{
                            fontWeight: 600,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                          }}
                        />
                      </Box>
                    </>
                  ) : (
                    <Box sx={{ textAlign: 'center' }}>
                      <FileText size={64} color="#cbd5e1" style={{ marginBottom: 16 }} />
                      <Typography color="text.secondary" variant="h6">
                        Document preview will appear here
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Drag and drop or click to upload your document
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Enhanced Signature & Controls Section */}
        <Grid item xs={12} lg={uploadedDoc ? 4 : 12}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider',
              background: 'white',
              height: '100%',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
              }
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                Digital Signature Studio
              </Typography>

              {/* Signature Canvas */}
              <Box
                sx={{
                  border: '2px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  bgcolor: '#fafafa',
                  mb: 3,
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <SignatureCanvas
                  ref={sigCanvas}
                  canvasProps={{
                    width: 500,
                    height: 250,
                    className: 'signature-canvas',
                    style: { width: '100%', height: '250px' }
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    display: 'flex',
                    gap: 1
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={clearSignature}
                    sx={{ background: 'rgba(255,255,255,0.9)', '&:hover': { background: 'white' } }}
                  >
                    <RotateCcw size={16} />
                  </IconButton>
                </Box>
              </Box>

              {/* Advanced Controls */}
              <Stack spacing={2} sx={{ mb: 3 }}>
                <Button
                  variant="outlined"
                  startIcon={<Trash2 size={18} />}
                  onClick={clearSignature}
                  fullWidth
                  size="large"
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 600,
                    borderWidth: 2,
                    '&:hover': { borderWidth: 2 }
                  }}
                >
                  Clear Signature
                </Button>
                <Button
                  variant="contained"
                  startIcon={<CheckCircle size={18} />}
                  onClick={saveSignature}
                  disabled={!uploadedDoc}
                  fullWidth
                  size="large"
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5568d3 0%, #6b4190 100%)',
                      boxShadow: '0 6px 16px rgba(102, 126, 234, 0.5)'
                    }
                  }}
                >
                  Apply Digital Signature
                </Button>
              </Stack>

              {isSigned && (
                <Alert
                  severity="success"
                  icon={<CheckCircle size={20} />}
                  sx={{ mb: 3, borderRadius: 2 }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Digital signature applied successfully!
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Your document is now legally binding and encrypted
                  </Typography>
                </Alert>
              )}

              <Button
                variant="contained"
                color="success"
                startIcon={<Download size={18} />}
                onClick={downloadDocument}
                disabled={!isSigned}
                fullWidth
                size="large"
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  fontWeight: 600,
                  mb: 3,
                  boxShadow: isSigned ? '0 4px 12px rgba(76, 175, 80, 0.4)' : 'none'
                }}
              >
                Download Signed Document
              </Button>

              <Divider sx={{ my: 3 }} />

              {/* Enhanced Security Info */}
              <Alert
                severity="info"
                icon={<Lock size={20} />}
                sx={{
                  borderRadius: 2,
                  bgcolor: alpha('#667eea', 0.08),
                  border: '1px solid',
                  borderColor: alpha('#667eea', 0.2),
                  '& .MuiAlert-icon': {
                    color: '#667eea'
                  }
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
                  Enterprise Security Features
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  AES-256 encryption, blockchain verification, audit trails, and compliance with eIDAS, UETA, and ESIGN Act.
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Audit Trail Section */}
      <Card elevation={0} sx={{ borderRadius: 4, mt: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
            Real-time Audit Trail
          </Typography>
          <List sx={{ p: 0 }}>
            {auditLog.map((log, index) => (
              <ListItem key={log.id} sx={{ px: 0, py: 1 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {getStatusIcon(log.status)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {log.action}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        {log.user}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        • {log.timestamp}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}
export const SignPD = () => (
  <Box sx={{ p: 8, textAlign: 'center' }}>
    <Typography variant="h4">PDF Signing Module</Typography>
    <Typography>Secure digital signature tools coming soon.</Typography>
  </Box>
);
