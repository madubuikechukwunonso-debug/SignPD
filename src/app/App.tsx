import { useState } from "react";
import {
  AppShell,
  Tabs,
  Group,
  Title,
  Text,
  Button,
  Avatar,
  Menu,
  Indicator,
  Box,
  Container,
} from "@mantine/core";
import {
  IconFilePencil,
  IconRefresh,
  IconBuildingStore,
  IconMessage,
  IconBell,
  IconSettings,
  IconUser,
  IconPlus,
} from "@tabler/icons-react";

import { SignPD } from "./components/SignPD";
import { DocFun } from "./components/DocFun";
import { DocPawn } from "./components/DocPawn";
import { DockChat } from "./components/DockChat";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("sign");

  return (
    <AppShell padding="md" header={{ height: 96 }}>
      {/* Header */}
      <AppShell.Header>
        <Container size="xl" h="100%">
          <Group h="100%" justify="space-between">
            {/* Logo */}
            <Group gap="md">
              <Box
                w={44}
                h={44}
                style={{
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconFilePencil color="white" size={22} />
              </Box>

              <Box>
                <Title order={4}>SignPro Enterprise</Title>
                <Text size="xs" c="dimmed">
                  Document Management Platform
                </Text>
              </Box>
            </Group>

            {/* Actions */}
            <Group>
              <Button leftSection={<IconPlus size={16} />} variant="outline">
                New Document
              </Button>

              <Indicator inline label="5" size={16}>
                <IconBell size={22} />
              </Indicator>

              <IconSettings size={22} />

              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Avatar
                    radius="xl"
                    style={{
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                      cursor: "pointer",
                    }}
                  >
                    <IconUser size={18} />
                  </Avatar>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item leftSection={<IconUser size={14} />}>
                    Profile
                  </Menu.Item>
                  <Menu.Item leftSection={<IconSettings size={14} />}>
                    Settings
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item color="red">Logout</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      {/* Main */}
      <AppShell.Main>
        <Container size="xl">
          <Tabs
            value={currentTab}
            onChange={(value) => {
              if (value) setCurrentTab(value);
            }}
          >
            <Tabs.List>
              <Tabs.Tab
                value="sign"
                leftSection={<IconFilePencil size={16} />}
              >
                Document Signing
              </Tabs.Tab>

              <Tabs.Tab
                value="convert"
                leftSection={<IconRefresh size={16} />}
              >
                File Converter
              </Tabs.Tab>

              <Tabs.Tab
                value="templates"
                leftSection={<IconBuildingStore size={16} />}
              >
                Template Store
              </Tabs.Tab>

              <Tabs.Tab
                value="chat"
                leftSection={<IconMessage size={16} />}
              >
                Team Collaboration
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="sign" pt="lg">
              <SignPD />
            </Tabs.Panel>

            <Tabs.Panel value="convert" pt="lg">
              <DocFun />
            </Tabs.Panel>

            <Tabs.Panel value="templates" pt="lg">
              <DocPawn />
            </Tabs.Panel>

            <Tabs.Panel value="chat" pt="lg">
              <DockChat />
            </Tabs.Panel>
          </Tabs>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
