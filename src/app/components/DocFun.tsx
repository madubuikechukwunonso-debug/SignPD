"use client";

import { useState } from "react";
import {
  Card,
  Button,
  TextInput,
  Select,
  Progress,
  Alert,
  Tabs,
  ScrollArea,
  Text,
  Group,
  Stack,
  SimpleGrid,
  Box,
  Grid,
} from "@mantine/core";
import {
  IconRefresh,
  IconFileText,
  IconBolt,
  IconTrendingUp,
  IconClock,
  IconSettings,
  IconHistory,
  IconCheck,
  IconDatabase,
} from "@tabler/icons-react";

interface ConversionJob {
  id: string;
  fileName: string;
  fromFormat: string;
  toFormat: string;
  status: "processing" | "completed";
  progress: number;
  startTime: Date;
  fileSize: string;
  quality: string;
}

export function DocFun() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fromFormat, setFromFormat] = useState("pdf");
  const [toFormat, setToFormat] = useState("docx");
  const [converting, setConverting] = useState(false);
  const [conversionComplete, setConversionComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeJobs, setActiveJobs] = useState<ConversionJob[]>([]);
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
        const next = Math.min(p + Math.random() * 20, 100);
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

  const statusIcon = (status: string) =>
    status === "completed" ? (
      <IconCheck size={18} color="green" />
    ) : (
      <IconRefresh size={18} />
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
          { label: "Conversions Today", value: "3,247", icon: <IconBolt /> },
          { label: "Success Rate", value: "99.97%", icon: <IconTrendingUp /> },
          { label: "Avg Time", value: "1.2s", icon: <IconClock /> },
          { label: "Storage Saved", value: "2.4TB", icon: <IconDatabase /> },
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
              <Tabs.Tab value="single" leftSection={<IconFileText size={14} />}>
                Single
              </Tabs.Tab>
              <Tabs.Tab value="batch" leftSection={<IconDatabase size={14} />}>
                Batch
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>

          <Group>
            <Button variant="subtle" onClick={() => setShowHistory(!showHistory)}>
              <IconHistory size={16} />
            </Button>
            <Button variant="subtle" onClick={() => setShowAdvanced(!showAdvanced)}>
              <IconSettings size={16} />
            </Button>
          </Group>
        </Group>
      </Card>

      <Grid>
        {/* Main */}
        <Grid.Col span={8}>
          <Card withBorder p="lg">
            <Stack gap="md">
              <TextInput
                type="file"
                onChange={(e) =>
                  setSelectedFile(e.currentTarget.files?.[0] || null)
                }
              />

              <SimpleGrid cols={3}>
                <Select
                  label="From"
                  data={formats}
                  value={fromFormat}
                  onChange={(v) => setFromFormat(v || "pdf")}
                />
                <Box />
                <Select
                  label="To"
                  data={formats}
                  value={toFormat}
                  onChange={(v) => setToFormat(v || "docx")}
                />
              </SimpleGrid>

              <Button
                size="lg"
                onClick={handleConvert}
                disabled={!selectedFile || converting}
                leftSection={<IconRefresh size={18} />}
              >
                {converting ? "Converting..." : "Start Conversion"}
              </Button>

              {converting && <Progress value={progress} />}

              {conversionComplete && (
                <Alert icon={<IconCheck />} color="green">
                  Conversion completed successfully
                </Alert>
              )}
            </Stack>
          </Card>
        </Grid.Col>

        {/* Sidebar */}
        <Grid.Col span={4}>
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
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
