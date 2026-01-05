import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
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
  CheckCircle,
  AlertTriangle,
  Database,
  RotateCcw,
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
    preserveMetadata: true,
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [previewMode, setPreviewMode] = useState<'single' | 'batch'>('single');
  const [showHistory, setShowHistory] = useState(false);

  const formats = [
    { value: 'pdf', label: 'PDF', icon: <FileText className="h-4 w-4" />, description: 'Portable Document Format' },
    { value: 'docx', label: 'DOCX', icon: <FileText className="h-4 w-4" />, description: 'Microsoft Word Document' },
    { value: 'txt', label: 'TXT', icon: <FileText className="h-4 w-4" />, description: 'Plain Text File' },
    { value: 'jpg', label: 'JPG', icon: <Image className="h-4 w-4" />, description: 'JPEG Image' },
    { value: 'png', label: 'PNG', icon: <Image className="h-4 w-4" />, description: 'Portable Network Graphics' },
    { value: 'html', label: 'HTML', icon: <File className="h-4 w-4" />, description: 'Web Page Format' },
    { value: 'xlsx', label: 'XLSX', icon: <FileText className="h-4 w-4" />, description: 'Excel Spreadsheet' },
    { value: 'pptx', label: 'PPTX', icon: <FileText className="h-4 w-4" />, description: 'PowerPoint Presentation' },
  ];

  const conversionHistory = [
    { id: '1', fileName: 'contract.pdf', from: 'PDF', to: 'DOCX', time: '2 min ago', size: '2.4 MB', status: 'completed' },
    { id: '2', fileName: 'report.docx', from: 'DOCX', to: 'PDF', time: '15 min ago', size: '1.8 MB', status: 'completed' },
    { id: '3', fileName: 'image.jpg', from: 'JPG', to: 'PNG', time: '1 hour ago', size: '3.2 MB', status: 'completed' },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (batchConfig.enabled) {
        setBatchConfig((prev) => ({
          ...prev,
          files: Array.from(files),
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

    const newJob: ConversionJob = {
      id: Date.now().toString(),
      fileName: selectedFile?.name || 'Unknown',
      fromFormat: fromFormat.toUpperCase(),
      toFormat: toFormat.toUpperCase(),
      status: 'processing',
      progress: 0,
      startTime: new Date(),
      fileSize: selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB` : 'Unknown',
      quality: 'high',
    };

    setActiveJobs((prev) => [...prev, newJob]);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;

        setActiveJobs((jobs) =>
          jobs.map((job) =>
            job.id === newJob.id
              ? { ...job, progress: Math.min(newProgress, 100) }
              : job
          )
        );

        if (newProgress >= 100) {
          clearInterval(interval);
          setConverting(false);
          setConversionComplete(true);

          setActiveJobs((jobs) =>
            jobs.map((job) =>
              job.id === newJob.id
                ? { ...job, status: 'completed', progress: 100, endTime: new Date() }
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
    alert(`Converting ${batchConfig.files.length} files to ${batchConfig.outputFormat}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'processing': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-white" />;
      case 'processing': return <RefreshCw className="h-4 w-4 text-white animate-spin" />;
      case 'failed': return <AlertTriangle className="h-4 w-4 text-white" />;
      default: return <Clock className="h-4 w-4 text-white" />;
    }
  };

  return (
    <div className="space-y-10 p-4 md:p-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
          Enterprise Document Converter
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Advanced multi-format document conversion with batch processing, quality optimization, and enterprise-grade performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: <Zap className="h-6 w-6" />, label: 'Conversions Today', value: '3,247', change: '+18%', gradient: 'from-pink-500 to-pink-400' },
          { icon: <TrendingUp className="h-6 w-6" />, label: 'Success Rate', value: '99.97%', change: '+0.3%', gradient: 'from-red-500 to-red-400' },
          { icon: <Clock className="h-6 w-6" />, label: 'Avg. Processing Time', value: '1.2s', change: '-0.8s', gradient: 'from-blue-500 to-blue-400' },
          { icon: <Database className="h-6 w-6" />, label: 'Storage Saved', value: '2.4TB', change: '+15%', gradient: 'from-green-500 to-green-400' },
        ].map((stat, i) => (
          <Card key={i} className={`bg-gradient-to-br ${stat.gradient} text-white border-0 hover:-translate-y-1 transition-all shadow-lg`}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-lg bg-white/20 backdrop-blur">{stat.icon}</div>
                <Badge variant="secondary" className="bg-white/20 border-0">{stat.change}</Badge>
              </div>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-sm opacity-90">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mode Toggle */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Tabs value={previewMode} onValueChange={(v) => setPreviewMode(v as 'single' | 'batch')}>
              <TabsList>
                <TabsTrigger value="single" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Single File
                </TabsTrigger>
                <TabsTrigger value="batch" className="flex items-center gap-2">
                  <Database className="h-4 w-4" /> Batch Processing
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => setShowHistory(!showHistory)}>
                <History className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setShowAdvanced(!showAdvanced)}>
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Converter */}
        <div className="lg:col-span-8">
          <Card className="h-full">
            <CardContent className="p-8">
              {/* Upload Area */}
              <div
                className={`
                  border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all
                  ${selectedFile || batchConfig.files.length > 0 ? 'border-green-500 bg-green-50' : 'border-muted hover:border-primary hover:bg-accent/50'}
                `}
              >
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  multiple={batchConfig.enabled}
                  accept=".pdf,.docx,.txt,.jpg,.png,.html,.xlsx,.pptx"
                />
                <label htmlFor="file-upload" className="block">
                  <Upload
                    className={`h-14 w-14 mx-auto mb-4 ${selectedFile || batchConfig.files.length > 0 ? 'text-green-600' : 'text-pink-500'}`}
                  />
                  <h3 className="text-xl font-semibold mb-2">
                    {selectedFile
                      ? `Selected: ${selectedFile.name}`
                      : batchConfig.enabled
                      ? 'Drop multiple files here or click to browse'
                      : 'Drop your file here or click to browse'}
                  </h3>
                  <p className="text-muted-foreground">
                    {batchConfig.enabled
                      ? 'Supports all formats • Batch processing enabled'
                      : 'Supports: PDF, DOCX, TXT, JPG, PNG, HTML, XLSX, PPTX • Maximum 100MB'}
                  </p>
                </label>
              </div>

              {/* Format Selection (Single Mode) */}
              {!batchConfig.enabled && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center my-8">
                  <div>
                    <Label>Convert From</Label>
                    <Select value={fromFormat} onValueChange={setFromFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {formats.map((f) => (
                          <SelectItem key={f.value} value={f.value}>
                            <div className="flex items-center gap-2">
                              {f.icon}
                              <div>
                                <p className="font-medium">{f.label}</p>
                                <p className="text-xs text-muted-foreground">{f.description}</p>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center shadow-lg">
                      <RefreshCw className="h-7 w-7 text-white" />
                    </div>
                  </div>

                  <div>
                    <Label>Convert To</Label>
                    <Select value={toFormat} onValueChange={setToFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {formats.map((f) => (
                          <SelectItem key={f.value} value={f.value}>
                            <div className="flex items-center gap-2">
                              {f.icon}
                              <div>
                                <p className="font-medium">{f.label}</p>
                                <p className="text-xs text-muted-foreground">{f.description}</p>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Batch Configuration */}
              {batchConfig.enabled && (
                <div className="my-8 space-y-6">
                  <h3 className="text-lg font-semibold">Batch Processing Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Output Format</Label>
                      <Select
                        value={batchConfig.outputFormat}
                        onValueChange={(v: string) => setBatchConfig((p) => ({ ...p, outputFormat: v }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {formats.map((f) => (
                            <SelectItem key={f.value} value={f.value}>
                              <div className="flex items-center gap-2">
                                {f.icon} {f.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Quality</Label>
                      <Select
                        value={batchConfig.quality}
                        onValueChange={(v: string) => setBatchConfig((p) => ({ ...p, quality: v }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low (Fast)</SelectItem>
                          <SelectItem value="medium">Medium (Balanced)</SelectItem>
                          <SelectItem value="high">High (Best Quality)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Convert Button */}
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
                onClick={batchConfig.enabled ? handleBatchConvert : handleConvert}
                disabled={(!selectedFile && batchConfig.files.length === 0) || converting}
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                {converting ? 'Converting...' : batchConfig.enabled ? 'Start Batch Conversion' : 'Start Conversion'}
              </Button>

              {/* Progress */}
              {converting && (
                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Processing your document...</span>
                    <span className="text-sm font-medium">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}

              {/* Success */}
              {conversionComplete && (
                <>
                  <Alert className="mt-6 border-green-500 bg-green-50">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <AlertTitle>Conversion completed successfully!</AlertTitle>
                    <AlertDescription>
                      Your document is ready for download.
                    </AlertDescription>
                  </Alert>
                  <Button
                    size="lg"
                    className="w-full mt-4 bg-green-600 hover:bg-green-700"
                    onClick={handleDownload}
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Converted File
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Active Jobs */}
          <Card>
            <CardHeader>
              <CardTitle>Active Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                {activeJobs.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No active conversions</p>
                ) : (
                  <div className="space-y-4">
                    {activeJobs.map((job) => (
                      <div key={job.id} className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg ${getStatusColor(job.status)} flex items-center justify-center`}>
                          {getStatusIcon(job.status)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm truncate">{job.fileName}</p>
                          <p className="text-xs text-muted-foreground">
                            {job.fromFormat} → {job.toFormat}
                          </p>
                          <Progress value={job.progress} className="h-1 mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* History */}
          {showHistory && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Conversions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversionHistory.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.from} → {item.to}</p>
                        <p className="text-xs text-muted-foreground">{item.time} • {item.size}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Popular Conversions */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {['PDF → DOCX', 'DOCX → PDF', 'JPG → PDF', 'PDF → JPG', 'HTML → PDF', 'PNG → PDF', 'XLSX → PDF', 'PPTX → PDF'].map((fmt) => (
                  <Badge key={fmt} variant="secondary" className="bg-pink-500/10 text-pink-600">
                    {fmt}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
