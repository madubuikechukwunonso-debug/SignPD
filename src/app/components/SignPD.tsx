"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
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
/* Native Signature Pad (NO third-party library)                       */
/* ------------------------------------------------------------------ */

export interface SignaturePadHandle {
  clear: () => void;
  toDataURL: () => string;
}

const SignaturePad = forwardRef<SignaturePadHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);

  useImperativeHandle(ref, () => ({
    clear() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    toDataURL() {
      return canvasRef.current?.toDataURL() ?? "";
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";
  }, []);

  const getPosition = (e: PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    drawing.current = true;
    const { x, y } = getPosition(e.nativeEvent);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPosition(e.nativeEvent);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => {
    drawing.current = false;
  };

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={220}
      className="w-full h-56 border rounded bg-white"
      onPointerDown={startDraw}
      onPointerMove={draw}
      onPointerUp={stopDraw}
      onPointerLeave={stopDraw}
    />
  );
});

SignaturePad.displayName = "SignaturePad";

/* ------------------------------------------------------------------ */
/* Types                                                              */
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
/* Component                                                          */
/* ------------------------------------------------------------------ */

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
    { id: "standard", name: "Standard Signing", description: "Single signer" },
    { id: "multi", name: "Multi-Party Signing", description: "Multiple signers" },
    { id: "witness", name: "Witnessed Signing", description: "Witness required" },
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
    const data = sigCanvasRef.current?.toDataURL();
    if (!data) return;
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
        <Text c="dimmed">Secure, compliant document signing</Text>
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

      <SimpleGrid cols={{ base: 1, lg: 2 }}>
        <Card>
          <Title order={4}>Upload & Preview</Title>

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
            <SignaturePad ref={sigCanvasRef} />
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
