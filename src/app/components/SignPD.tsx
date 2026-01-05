import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"; // ← Critical: for className merging
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
  Certificate,
  RotateCcw,
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
  const sigCanvas = useRef<any>(null); // ← Safe fix for SignatureCanvas typing issue
  const [uploadedDoc, setUploadedDoc] = useState<string | null>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedWorkflow, setSelectedWorkflow] = useState('standard');
  const [showPreview, setShowPreview] = useState(true);
  const [securityLevel, setSecurityLevel] = useState('high');
  const [auditLog, setAuditLog] = useState<AuditLog[]>([]);

  const workflows: DocumentWorkflow[] = [
    {
      id: 'standard',
      name: 'Standard Signing',
      description: 'Basic document signing with single signature',
      steps: ['Upload Document', 'Add Signature', 'Download'],
      participants: 1,
    },
    {
      id: 'multi',
      name: 'Multi-Party Signing',
      description: 'Multiple signatures required from different parties',
      steps: ['Upload Document', 'Send to Parties', 'Collect Signatures', 'Finalize'],
      participants: 3,
    },
    {
      id: 'witness',
      name: 'Witnessed Signing',
      description: 'Document signing with witness verification',
      steps: ['Upload Document', 'Add Witness', 'Sign with Witness', 'Complete'],
      participants: 2,
    },
  ];

  const auditLogs: AuditLog[] = [
    { id: '1', action: 'Document uploaded', user: 'John Doe', timestamp: '2 min ago', status: 'success' },
    { id: '2', action: 'Signature applied', user: 'Jane Smith', timestamp: '5 min ago', status: 'success' },
    { id: '3', action: 'Document encrypted', user: 'System', timestamp: '1 hour ago', status: 'success' },
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
      status,
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
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <CheckCircle className="h-4 w-4 text-orange-600" />; // fallback icon
      case 'error':
        return <CheckCircle className="h-4 w-4 text-red-600" />; // fallback icon
      default:
        return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
  };

  const steps = ['Document Upload', 'Signature Configuration', 'Review & Sign', 'Download & Archive'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Enterprise Document Signing
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Secure, compliant, and efficient document signing with advanced audit trails and enterprise-grade security
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: <FileText className="h-6 w-6" />, label: 'Documents Processed', value: '15,247', change: '+12%', gradient: 'from-indigo-600 to-indigo-500' },
          { icon: <Clock className="h-6 w-6" />, label: 'Avg. Processing Time', value: '1.8s', change: '-0.5s', gradient: 'from-purple-600 to-purple-500' },
          { icon: <Shield className="h-6 w-6" />, label: 'Security Compliance', value: 'SOC 2', change: 'Active', gradient: 'from-pink-600 to-pink-500' },
          { icon: <CheckCircle className="h-6 w-6" />, label: 'Success Rate', value: '99.97%', change: '+0.2%', gradient: 'from-blue-600 to-blue-500' },
        ].map((stat, index) => (
          <Card key={index} className={`bg-gradient-to-br ${stat.gradient} text-white border-0 hover:-translate-y-1 transition-transform shadow-lg`}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-lg bg-white/20 backdrop-blur">{stat.icon}</div>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {stat.change}
                </Badge>
              </div>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-sm opacity-90">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workflow Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Document Workflow Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="workflow">Signing Workflow</Label>
              <Select value={selectedWorkflow} onValueChange={setSelectedWorkflow}>
                <SelectTrigger id="workflow">
                  <SelectValue placeholder="Select workflow" />
                </SelectTrigger>
                <SelectContent>
                  {workflows.map((workflow) => (
                    <SelectItem key={workflow.id} value={workflow.id}>
                      <div>
                        <p className="font-medium">{workflow.name}</p>
                        <p className="text-sm text-muted-foreground">{workflow.description}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="security">Security Level</Label>
              <Select value={securityLevel} onValueChange={setSecurityLevel}>
                <SelectTrigger id="security">
                  <SelectValue placeholder="Select security level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic Encryption</SelectItem>
                  <SelectItem value="high">High Security (AES-256)</SelectItem>
                  <SelectItem value="enterprise">Enterprise (Multi-factor)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simple Horizontal Stepper */}
      <Card>
        <CardHeader>
          <CardTitle>Process Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold",
                  index === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {index + 1}
                </div>
                <p className="text-sm font-medium hidden sm:block">{step}</p>
                {index < steps.length - 1 && <div className="h-1 w-12 bg-muted hidden sm:block" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Document Upload & Preview */}
        <div className={uploadedDoc ? "lg:col-span-8" : "lg:col-span-12"}>
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Document Upload & Preview</CardTitle>
                <div className="flex items-center gap-2">
                  {uploadedDoc && <Badge variant="secondary">Ready to Sign</Badge>}
                  <Button variant="ghost" size="icon" onClick={() => setShowPreview(!showPreview)}>
                    {showPreview ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all",
                uploadedDoc ? "border-green-600 bg-green-50" : "border-muted hover:border-primary hover:bg-accent/50"
              )}>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="doc-upload"
                />
                <label htmlFor="doc-upload" className="block">
                  <Upload className={cn("h-14 w-14 mx-auto mb-4", uploadedDoc ? "text-green-600" : "text-primary")} />
                  <h3 className="text-xl font-semibold mb-2">
                    {uploadedDoc ? 'Document Uploaded Successfully' : 'Drop your file here or click to browse'}
                  </h3>
                  <p className="text-muted-foreground">
                    Supports PDF, DOC, DOCX, TXT • Maximum file size: 25MB • Enterprise encryption enabled
                  </p>
                </label>
              </div>

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-6">
                  <Progress value={uploadProgress} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-2">Uploading... {Math.round(uploadProgress)}%</p>
                </div>
              )}

              {showPreview && (
                <div className="mt-8 h-96 bg-muted/30 rounded-xl overflow-hidden relative flex items-center justify-center border">
                  {uploadedDoc ? (
                    <>
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1603796846097-bee99e4a601f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N1bWVudCUyMHNpZ25pbmd8ZW58MXx8fHwxNzY3NTU0OTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Document preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Badge>Page 1 of 3</Badge>
                        <Badge variant="secondary" className="bg-green-600 text-white">
                          <Certificate className="h-3 w-3 mr-1" /> Verified
                        </Badge>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-muted-foreground">Document preview will appear here</h4>
                      <p className="text-sm text-muted-foreground mt-2">Drag and drop or click to upload your document</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Signature Studio */}
        <div className={uploadedDoc ? "lg:col-span-4" : "lg:col-span-12"}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Digital Signature Studio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-muted rounded-xl bg-muted/30 overflow-hidden relative">
                <SignatureCanvas
                  ref={sigCanvas}
                  canvasProps={{ className: 'w-full h-64' }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={clearSignature}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <Button variant="outline" className="w-full" onClick={clearSignature}>
                  <Trash2 className="h-4 w-4 mr-2" /> Clear Signature
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  onClick={saveSignature}
                  disabled={!uploadedDoc}
                >
                  <CheckCircle className="h-4 w-4 mr-2" /> Apply Digital Signature
                </Button>
              </div>

              {isSigned && (
                <Alert className="border-green-600 bg-green-50">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <AlertTitle>Signature Applied!</AlertTitle>
                  <AlertDescription>
                    Your document is now legally binding and encrypted.
                  </AlertDescription>
                </Alert>
              )}

              <Button
                variant="default"
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={downloadDocument}
                disabled={!isSigned}
              >
                <Download className="h-4 w-4 mr-2" /> Download Signed Document
              </Button>

              <Separator />

              <Alert className="bg-blue-50 border-blue-200">
                <Lock className="h-5 w-5 text-blue-600" />
                <AlertTitle>Enterprise Security Features</AlertTitle>
                <AlertDescription>
                  AES-256 encryption, blockchain verification, audit trails, and compliance with eIDAS, UETA, and ESIGN Act.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Audit Trail */}
      <Card>
        <CardHeader>
          <CardTitle>Real-time Audit Trail</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {auditLog.map((log) => (
              <div key={log.id} className="flex items-start gap-4">
                {getStatusIcon(log.status)}
                <div className="flex-1">
                  <p className="font-medium">{log.action}</p>
                  <p className="text-sm text-muted-foreground">
                    {log.user} • {log.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
