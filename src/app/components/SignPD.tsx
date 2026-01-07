"use client";

import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import type { SignatureCanvasProps } from "react-signature-canvas";

import {
  Card,
  Text,
  Title,
  Button,
  Select,
  Progress,
  Alert,
  Divider,
  Group,
  Stack,
  SimpleGrid,
  Box,
  ThemeIcon,
  Paper,
} from "@mantine/core";

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
  RotateCcw,
  AlertTriangle,
} from "lucide-react";

import { ImageWithFallback } from "../../figma/ImageWithFallback";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

interface DocumentWorkflow {
  id: string;
  name: string;
  description: string;
}

interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  status: "success" | "warning" | "error";
}

/* ------------------------------------------------------------------ */
/* Fix: react-signature-canvas JSX typing */
/* ------------------------------------------------------------------ */

const SignaturePad =
  SignatureCanvas as unknown as React.FC<SignatureCanvasProps>;

/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export function SignPD() {
  const sigCanvas = useRef<SignatureCanvas | null>(null);

  const [uploadedDoc, setUploadedDoc] = useState<string | null>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(
    "standard"
  );
  const [showPreview, setShowPreview] = useState(true);
  const [securityLevel, setSecurityLevel] = useState<string | null>("high");
  const [auditLog, setAuditLog] = useState<AuditLog[]>([]);

  const workflows: DocumentWorkflow[] = [
    {
      id: "standard",
      name: "Standard Signing",
      description: "Single signer workflow",
    },
    {
      id: "multi",
      name: "Multi-Party Signing",
      description: "Multiple signers",
    },
    {
      id: "witness",
      name: "Witnessed Signing",
      description: "Witness verification required",
    },
  ];

  const addAuditLog = (action: string, status: AuditLog["status"]) => {
    setAuditLog((prev) => [
      {
        id: Date.now().toString(),
        action,
        user: "Current User",
        timestamp: "Just now",
        status,
      },
      ...prev.slice(0, 4),
    ]);
  };

  const clearSignature = () => {
    sigCanvas.current?.clear();
    setIsSigned(false);
    addAuditLog("Signature cleared", "warning");
  };

  const saveSignature = () => {
    if (!sigCanvas.current) return;
    console.log(sigCanvas.current.toDataURL());
    setIsSigned(true);
    addAuditLog("Signature applied successfully", "success");
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        setUploadProgress((e.loaded / e.total) * 100);
      }
    };

    reader.onload = (e) => {
      setUploadedDoc(e.target?.result as string);
      setUploadProgress(100);
      addAuditLog("Document uploaded successfully", "success");
    };

    reader.readAsDataURL(file);
  };

  const statusIcon = (status: AuditLog["status"]) => {
    if (status === "success") return <CheckCircle size={18} color="green" />;
    if (status === "warning")
      return <AlertTriangle size={18} color="orange" />;
    return <AlertTriangle size={18} color="red" />;
  };

  return (
    <Stack gap="xl">
      {/* Header */}
      <Stack gap="xs">
        <Title order={1}>Enterprise Document Signing</Title>
        <Text c="dimmed" maw={600}>
          Secure, compliant, and efficient document signing with
          enterprise-grade audit trails.
        </Text>
      </Stack>

      {/* Stats */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
        {[
          { icon: FileText, label: "Documents", value: "15,247" },
          { icon: Clock, label: "Avg Time", value: "1.8s" },
          { icon: Shield, label: "Compliance", value: "SOC 2" },
          { icon: CheckCircle, label: "Success Rate", value: "99.97%" },
        ].map((s) => (
          <Card key={s.label} shadow="md">
            <Group>
              <ThemeIcon size="lg">
                <s.icon />
              </ThemeIcon>
              <Box>
                <Text fw={700}>{s.value}</Text>
                <Text size="sm" c="dimmed">
                  {s.label}
                </Text>
              </Box>
            </Group>
          </Card>
        ))}
      </SimpleGrid>

      {/* Workflow */}
      <Card>
        <Title order={4} mb="md">
          Workflow Configuration
        </Title>

        <SimpleGrid cols={{ base: 1, md: 2 }}>
          <Select
            label="Signing Workflow"
            value={selectedWorkflow}
            onChange={(value) => setSelectedWorkflow(value)}
            data={workflows.map((w) => ({
              value: w.id,
              label: `${w.name} – ${w.description}`,
            }))}
          />

          <Select
            label="Security Level"
            value={securityLevel}
            onChange={(value) => setSecurityLevel(value)}
            data={[
              { value: "basic", label: "Basic Encryption" },
              { value: "high", label: "AES-256 Encryption" },
              { value: "enterprise", label: "Enterprise MFA" },
            ]}
          />
        </SimpleGrid>
      </Card>

      <SimpleGrid cols={{ base: 1, lg: 2 }}>
        {/* Upload */}
        <Card>
          <Group justify="space-between">
            <Title order={4}>Upload & Preview</Title>
            <Button
              variant="subtle"
              onClick={() => setShowPreview((p) => !p)}
            >
              {showPreview ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
          </Group>

          <Paper
            withBorder
            mt="md"
            p="xl"
            ta="center"
            style={{ cursor: "pointer" }}
            component="label"
          >
            <input type="file" hidden onChange={handleFileUpload} />
            <Upload size={40} />
            <Text mt="sm" fw={500}>
              Click to upload document
            </Text>
          </Paper>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <Progress value={uploadProgress} mt="md" />
          )}

          {showPreview && uploadedDoc && (
            <Box mt="md" h={300}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1603796846097-bee99e4a601f"
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </Box>
          )}
        </Card>

        {/* Signature */}
        <Card>
          <Title order={4}>Signature Studio</Title>

          <Box mt="md" pos="relative">
            <SignaturePad
              ref={sigCanvas}
              canvasProps={{
                className: "w-full h-56 border rounded",
              }}
            />

            <Button
              variant="light"
              size="xs"
              pos="absolute"
              top={8}
              right={8}
              onClick={clearSignature}
            >
              <RotateCcw size={14} />
            </Button>
          </Box>

          <Stack mt="md">
            <Button variant="outline" onClick={clearSignature}>
              <Trash2 size={16} /> Clear
            </Button>

            <Button onClick={saveSignature} disabled={!uploadedDoc}>
              <CheckCircle size={16} /> Apply Signature
            </Button>

            {isSigned && (
              <Alert color="green" icon={<CheckCircle size={16} />}>
                Signature applied successfully
              </Alert>
            )}

            <Button
              color="green"
              leftSection={<Download size={16} />}
              disabled={!isSigned}
            >
              Download Signed Document
            </Button>

            <Divider />

            <Alert color="blue" icon={<Lock size={16} />}>
              AES-256 encryption, audit logs, legal compliance
            </Alert>
          </Stack>
        </Card>
      </SimpleGrid>

      {/* Audit */}
      <Card>
        <Title order={4}>Audit Trail</Title>
        <Stack mt="md">
          {auditLog.map((log) => (
            <Group key={log.id}>
              {statusIcon(log.status)}
              <Box>
                <Text fw={500}>{log.action}</Text>
                <Text size="sm" c="dimmed">
                  {log.user} • {log.timestamp}
                </Text>
              </Box>
            </Group>
          ))}
        </Stack>
      </Card>
    </Stack>
  );
}
