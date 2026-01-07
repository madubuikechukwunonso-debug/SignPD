"use client";

import React, { useState } from "react";
import {
  Card,
  Button,
  TextInput,
  Select,
  Progress,
  Alert,
  Badge,
  Divider,
  Tabs,
  ScrollArea,
  Text,
  Group,
  Stack,
  SimpleGrid,
  Box,
} from "@mantine/core";
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
} from "lucide-react";

interface ConversionJob {
  id: string;
  fileName: string;
  fromFormat: string;
  toFormat: string;
  status: "pending" | "processing" | "completed" | "failed";
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
  const [fromFormat, setFromFormat] = useState("pdf");
  const [toFormat, setToFormat] = useState("docx");
  const [converting, setConverting] = useState(false);
  const [conversionComplete, setConversionComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeJobs, setActiveJobs] = useState<ConversionJob[]>([]);
  const [batchConfig, setBatchConfig] = useState<BatchConfig>({
    enabled: false,
    files: [],
    outputFormat: "pdf",
    quality: "high",
    preserveMetadata: true,
  });
  const [previewMode, setPreviewMode] = useState<"single" | "batch">("single");
  const [showHistory, setShowHistory] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const formats = [
    { value: "pdf", label: "PDF" },
    { value: "docx", label: "DOCX" },
    { value: "txt", label: "TXT" },
    { value: "jpg", label: "JPG" },
    { value: "png", label: "PNG" },
    { value: "html", label: "HTML" },
    { value: "xlsx", label: "XLSX" },
    { value: "pptx", label: "PPTX" },
  ];

  const handleFileUpload = (file: File | null) => {
    if (!file) return;
    setSelectedFile(file);
    setConversionComplete(false);
  };

  const handleConvert = () => {
    if (!selectedFile) return;
    setConverting(true);
    setProgress(0);

    const job: ConversionJob = {
      id: Date.now().toString(),
      fileName: selectedFile.name,
      fromFormat: fromFormat.toUpperCase(),
      toFormat: toFormat.toUpperCase(),
      status: "processing",
      progress: 0,
      startTime: new Date(),
      fileSize: `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB`,
      quality: "high",
    };

    setActiveJobs((j) => [...j, job]);

    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 15, 100);
        setActiveJobs((jobs) =>
          jobs.map((j) =>
            j.id === job.id ? { ...j, progress: next } : j
          )
        );
        if (next === 100) {
          clearInterval(interval);
          setConverting(false);
          setConversionComplete(true);
          setActiveJobs((jobs) =>
            jobs.map((j) =>
              j.id === job.id
                ? { ...j, status: "completed", progress: 100 }
                : j
            )
          );
        }
        return next;
      });
    }, 300);
  };

  const statusIcon = (s: string) =>
    s === "completed" ? (
      <CheckCircle size={18} />
    ) : s === "processing" ? (
      <RefreshCw size={18} />
    ) : (
      <AlertTriangle size={18} />
    );

  return (
    <Stack p="md" gap="xl">
      {/* Header */}
      <Stack gap={4}>
        <Text size="xl" fw={900}>
          Enterprise Document Converter
        </Text>
        <Text c="dimmed">
          Advanced multi-format document conversion with batch processing
        </Text>
      </Stack>

      {/* Stats */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
        {[
          { label: "Conversions Today", value: "3,247", icon: <Zap /> },
          { label: "Success Rate", value: "99.97%", icon: <TrendingUp /> },
          { label: "Avg Time", value: "1.2s", icon: <Clock /> },
          { label: "Storage Saved", value: "2.4TB", icon: <Database /> },
        ].map((s) => (
          <Card key={s.label} withBorder>
            <Group justify="space-between">
              {s.icon}
              <Stack gap={0}>
                <Text fw={700}>{s.value}</Text>
                <Text size="xs" c="dimmed">
                  {s.label}
                </Text>
              </Stack>
            </Group>
          </Card>
        ))}
      </SimpleGrid>

      {/* Mode */}
      <Card withBorder>
        <Group justify="space-between">
          <Tabs value={previewMode} onChange={(v) => setPreviewMode(v as any)}>
            <Tabs.List>
              <Tabs.Tab value="single" leftSection={<FileText size={14} />}>
                Single
              </Tabs.Tab>
              <Tabs.Tab value="batch" leftSection={<Database size={14} />}>
                Batch
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <Group>
            <Button variant="subtle" onClick={() => setShowHistory(!showHistory)}>
              <History size={16} />
            </Button>
            <Button variant="subtle" onClick={() => setShowAdvanced(!showAdvanced)}>
              <Settings size={16} />
            </Button>
          </Group>
        </Group>
      </Card>

      <SimpleGrid cols={{ base: 1, lg: 12 }}>
        {/* Main */}
        <Box span={8}>
          <Card withBorder p="lg">
            <Stack gap="md">
              <TextInput
                type="file"
                onChange={(e) =>
                  handleFileUpload(e.currentTarget.files?.[0] || null)
                }
              />

              <SimpleGrid cols={3}>
                <Select
                  label="From"
                  data={formats}
                  value={fromFormat}
                  onChange={setFromFormat}
                />
                <Box />
                <Select
                  label="To"
                  data={formats}
                  value={toFormat}
                  onChange={setToFormat}
                />
              </SimpleGrid>

              <Button
                size="lg"
                onClick={handleConvert}
                disabled={!selectedFile || converting}
                leftSection={<RefreshCw size={18} />}
              >
                {converting ? "Converting..." : "Start Conversion"}
              </Button>

              {converting && <Progress value={progress} />}

              {conversionComplete && (
                <Alert icon={<CheckCircle />} color="green">
                  Conversion completed successfully
                </Alert>
              )}
            </Stack>
          </Card>
        </Box>

        {/* Sidebar */}
        <Box span={4}>
          <Card withBorder>
            <Text fw={600} mb="sm">
              Active Jobs
            </Text>
            <ScrollArea h={260}>
              <Stack>
                {activeJobs.length === 0 && (
                  <Text c="dimmed" size="sm">
                    No active conversions
                  </Text>
                )}
                {activeJobs.map((job) => (
                  <Group key={job.id}>
                    {statusIcon(job.status)}
                    <Box>
                      <Text size="sm">{job.fileName}</Text>
                      <Progress value={job.progress} size="xs" />
                    </Box>
                  </Group>
                ))}
              </Stack>
            </ScrollArea>
          </Card>
        </Box>
      </SimpleGrid>
    </Stack>
  );
}
