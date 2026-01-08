"use client";

import React, { useRef, useState, forwardRef } from "react";
import SignaturePad from "./SignaturePad";
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
  AlertTriangle,
} from "lucide-react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";

/* ------------------------------------------------------------------ */
/* FIX: react-signature-canvas has broken ref typings                  */
/* ------------------------------------------------------------------ */

type SignaturePadHandle = SignatureCanvas;
type SignaturePadProps = React.ComponentProps<typeof SignatureCanvas>;

const SignaturePad = forwardRef<SignaturePadHandle, SignaturePadProps>(
  (props, ref) => {
    return <SignatureCanvas {...props} ref={ref as any} />;
  }
);

SignaturePad.displayName = "SignaturePad";

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

export function SignPD() {
  const sigCanvasRef = useRef<SignaturePadHandle | null>(null);

  const [uploadedDoc, setUploadedDoc] = useState<string | null>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedWorkflow, setSelectedWorkflow] = useState("standard");
  const [showPreview, setShowPreview] = useState(true);
  const [securityLevel, setSecurityLevel] = useState("high");
  const [auditLog, setAuditLog] = useState<AuditLog[]>([]);

  const workflows: DocumentWorkflow[] = [
    { id: "standard", name: "Standard Signing", description: "Single signer workflow" },
    { id: "multi", name: "Multi-Party Signing", description: "Multiple signers" },
    { id: "witness", name: "Witnessed Signing", description: "Witness verification required" },
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
    sigCanvasRef.current?.clear();
    setIsSigned(false);
    addAuditLog("Signature cleared", "warning");
  };

  const saveSignature = () => {
    if (!sigCanvasRef.current) return;
    sigCanvasRef.current.toDataURL();
    setIsSigned(true);
    addAuditLog("Signature applied successfully", "success");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    if (status === "warning") return <AlertTriangle size={18} color="orange" />;
    return <AlertTriangle size={18} color="red" />;
  };

  return (
    <Stack gap="xl">
      <Stack gap="xs">
        <Title order={1}>Enterprise Document Signing</Title>
        <Text c="dimmed">
          Secure, compliant, and efficient document signing with audit trails.
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
        {[
          { icon: FileText, label: "Documents", value: "15,247" },
          { icon: Clock, label: "Avg Time", value: "1.8s" },
          { icon: Shield, label: "Compliance", value: "SOC 2" },
          { icon: CheckCircle, label: "Success Rate", value: "99.97%" },
        ].map((s) => (
          <Card key={s.label}>
            <Group>
              <ThemeIcon>
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

      <Card>
        <Title order={4}>Workflow Configuration</Title>

        <SimpleGrid cols={{ base: 1, md: 2 }} mt="md">
          <Select
            label="Signing Workflow"
            value={selectedWorkflow}
            onChange={(v) => v && setSelectedWorkflow(v)}
            data={workflows.map((w) => ({
              value: w.id,
              label: `${w.name} – ${w.description}`,
            }))}
          />

          <Select
            label="Security Level"
            value={securityLevel}
            onChange={(v) => v && setSecurityLevel(v)}
            data={[
              { value: "basic", label: "Basic Encryption" },
              { value: "high", label: "AES-256 Encryption" },
              { value: "enterprise", label: "Enterprise MFA" },
            ]}
          />
        </SimpleGrid>
      </Card>

      <SimpleGrid cols={{ base: 1, lg: 2 }}>
        <Card>
          <Group justify="space-between">
            <Title order={4}>Upload & Preview</Title>
            <Button variant="subtle" onClick={() => setShowPreview((p) => !p)}>
              {showPreview ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
          </Group>

          <Paper component="label" withBorder p="xl" mt="md" ta="center">
            <input hidden type="file" onChange={handleFileUpload} />
            <Upload size={40} />
            <Text mt="sm">Click to upload document</Text>
          </Paper>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <Progress value={uploadProgress} mt="md" />
          )}

          {showPreview && uploadedDoc && (
            <Box mt="md" h={300}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1603796846097-bee99e4a601f"
                alt="Preview"
              />
            </Box>
          )}
        </Card>

        <Card>
          <Title order={4}>Signature Studio</Title>

          <Box mt="md">
            <SignaturePad
              ref={sigCanvasRef}
              canvasProps={{ className: "w-full h-56 border rounded" }}
            />
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

            <Button leftSection={<Download size={16} />} disabled={!isSigned}>
              Download Signed Document
            </Button>

            <Divider />

            <Alert icon={<Lock size={16} />}>
              AES-256 encryption, audit logs, legal compliance
            </Alert>
          </Stack>
        </Card>
      </SimpleGrid>

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
