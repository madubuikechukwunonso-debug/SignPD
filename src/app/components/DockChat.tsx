"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Button,
  TextInput,
  Avatar,
  Badge,
  Tabs,
  ScrollArea,
  Tooltip,
  Divider,
  Group,
  Stack,
  Text,
  Box,
} from "@mantine/core";
import {
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Search,
  Users,
  MessageCircle,
  Activity,
  Settings,
  PhoneOff,
  ScreenShare,
  StopScreenShare,
  PushPin,
  Info,
  FileText,
} from "lucide-react";

interface User {
  id: number;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away" | "busy";
  lastMessage: string;
  timestamp: string;
  unread: number;
  role: string;
  department: string;
  isPinned?: boolean;
}

interface Message {
  id: number;
  sender: "me" | "other" | "system";
  text: string;
  timestamp: string;
  type: "text" | "file" | "system";
  fileName?: string;
  fileSize?: string;
  reactions?: { emoji: string; users: string[] }[];
}

export function DockChat() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<string>("chats");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "me",
        text: messageText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "text",
      },
    ]);

    setMessageText("");
  };

  return (
    <Stack p="lg" gap="lg">
      {/* Header */}
      <Stack gap={4}>
        <Text size="xl" fw={800}>
          Enterprise Team Collaboration
        </Text>
        <Text c="dimmed">
          Secure real-time communication for enterprise teams
        </Text>
      </Stack>

      {/* Tabs + Search */}
      <Card withBorder>
        <Group justify="space-between" wrap="wrap">
          <Tabs value={viewMode} onChange={setViewMode}>
            <Tabs.List>
              <Tabs.Tab value="chats" leftSection={<MessageCircle size={16} />}>
                Chats
              </Tabs.Tab>
              <Tabs.Tab value="teams" leftSection={<Users size={16} />}>
                Teams
              </Tabs.Tab>
              <Tabs.Tab value="activity" leftSection={<Activity size={16} />}>
                Activity
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>

          <Group>
            <TextInput
              leftSection={<Search size={16} />}
              placeholder="Search…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
            />
            <Button variant="subtle">
              <Settings size={18} />
            </Button>
          </Group>
        </Group>
      </Card>

      {/* Main Layout */}
      <Group align="stretch" grow>
        {/* Sidebar */}
        <Card withBorder w={320}>
          <ScrollArea h={500}>
            <Stack gap="xs">
              {[1, 2, 3].map((i) => (
                <Button
                  key={i}
                  variant="subtle"
                  justify="space-between"
                  onClick={() =>
                    setSelectedUser({
                      id: i,
                      name: `User ${i}`,
                      avatar: "",
                      status: "online",
                      lastMessage: "Last message…",
                      timestamp: "Now",
                      unread: i === 2 ? 3 : 0,
                      role: "Member",
                      department: "Team",
                    })
                  }
                >
                  <Group>
                    <Avatar radius="xl" />
                    <Stack gap={0} align="flex-start">
                      <Text size="sm" fw={500}>
                        User {i}
                      </Text>
                      <Text size="xs" c="dimmed">
                        Last message…
                      </Text>
                    </Stack>
                  </Group>
                  {i === 2 && <Badge color="green">3</Badge>}
                </Button>
              ))}
            </Stack>
          </ScrollArea>
        </Card>

        {/* Chat Area */}
        <Card withBorder>
          {selectedUser ? (
            <Stack h="100%" justify="space-between">
              <Group justify="space-between">
                <Group>
                  <Avatar radius="xl" />
                  <Stack gap={0}>
                    <Text fw={600}>{selectedUser.name}</Text>
                    <Text size="xs" c="dimmed">
                      {selectedUser.role}
                    </Text>
                  </Stack>
                </Group>
                <Group>
                  <Button size="xs" variant="subtle">
                    <Phone size={16} />
                  </Button>
                  <Button size="xs" variant="subtle">
                    <Video size={16} />
                  </Button>
                  <Button size="xs" variant="subtle">
                    <MoreVertical size={16} />
                  </Button>
                </Group>
              </Group>

              <Divider />

              <ScrollArea h={350}>
                <Stack>
                  {messages.map((m) => (
                    <Box
                      key={m.id}
                      p="sm"
                      bg={m.sender === "me" ? "green.1" : "gray.1"}
                      ml={m.sender === "me" ? "auto" : 0}
                      maw="70%"
                      style={{ borderRadius: 12 }}
                    >
                      <Text size="sm">{m.text}</Text>
                      <Text size="xs" c="dimmed" ta="right">
                        {m.timestamp}
                      </Text>
                    </Box>
                  ))}
                  <div ref={messagesEndRef} />
                </Stack>
              </ScrollArea>

              <Group>
                <Button variant="subtle">
                  <Paperclip size={18} />
                </Button>
                <Button variant="subtle">
                  <Smile size={18} />
                </Button>
                <TextInput
                  placeholder="Type a message…"
                  value={messageText}
                  onChange={(e) =>
                    setMessageText(e.currentTarget.value)
                  }
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSendMessage()
                  }
                  style={{ flex: 1 }}
                />
                <Button onClick={handleSendMessage} leftSection={<Send size={16} />}>
                  Send
                </Button>
              </Group>
            </Stack>
          ) : (
            <Stack align="center" justify="center" h="100%">
              <MessageCircle size={48} />
              <Text>Select a conversation</Text>
            </Stack>
          )}
        </Card>
      </Group>
    </Stack>
  );
}
