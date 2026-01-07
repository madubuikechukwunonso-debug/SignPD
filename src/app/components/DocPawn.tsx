"use client";

import React, { useState } from "react";
import {
  Card,
  TextInput,
  Badge,
  Avatar,
  Tabs,
  Button,
  Group,
  Stack,
  Text,
  Divider,
  Modal,
  Select,
  Menu,
  SimpleGrid,
  Box,
  Image,
} from "@mantine/core";
import {
  Search,
  ShoppingCart,
  Star,
  Download,
  TrendingUp,
  Users,
  Award,
  Filter,
  Heart,
  Share2,
  Eye,
  Calendar,
  DollarSign,
  Zap,
  Shield,
  SortAsc,
} from "lucide-react";

interface DocumentTemplate {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  downloads: number;
  category: string;
  image: string;
  author: string;
  sales: number;
  featured: boolean;
  tags: string[];
  createdAt: string;
  fileSize: string;
  format: string[];
  reviews: number;
}

export function DocPawn() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<DocumentTemplate | null>(null);
  const [opened, setOpened] = useState(false);
  const [category, setCategory] = useState("All");
  const [viewMode, setViewMode] = useState<string>("grid");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  const templates: DocumentTemplate[] = [
    {
      id: 1,
      title: "Executive Resume Template",
      description: "ATS-optimized resume template for executives",
      price: 19.99,
      rating: 4.9,
      downloads: 3247,
      category: "Resume",
      image:
        "https://images.unsplash.com/photo-1677693972403-db681288b5da",
      author: "Sarah Johnson",
      sales: 3247,
      featured: true,
      tags: ["ATS", "Modern"],
      createdAt: "2024-01-15",
      fileSize: "2.4 MB",
      format: ["DOCX", "PDF"],
      reviews: 127,
    },
  ];

  const filtered = templates.filter(
    (t) =>
      (category === "All" || t.category === category) &&
      t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleWishlist = (id: number) =>
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));

  const toggleCart = (id: number) =>
    setCart((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  return (
    <Stack gap="xl">
      {/* Header */}
      <Stack gap={4}>
        <Text size="xl" fw={800}>
          Enterprise Template Marketplace
        </Text>
        <Text c="dimmed">
          Discover premium templates from verified professionals
        </Text>
      </Stack>

      {/* Stats */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
        {[
          { label: "Products", value: "2,450+", icon: <ShoppingCart /> },
          { label: "Creators", value: "850+", icon: <Users /> },
          { label: "Monthly Sales", value: "$125K", icon: <TrendingUp /> },
          { label: "Avg Rating", value: "4.8", icon: <Star /> },
        ].map((s) => (
          <Card key={s.label} withBorder>
            <Group justify="space-between">
              <Box>{s.icon}</Box>
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

      {/* Controls */}
      <Card withBorder>
        <Group wrap="wrap" justify="space-between">
          <TextInput
            leftSection={<Search size={16} />}
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            style={{ flex: 1 }}
          />

          <Tabs value={viewMode} onChange={setViewMode}>
            <Tabs.List>
              <Tabs.Tab value="grid">Grid</Tabs.Tab>
              <Tabs.Tab value="list">List</Tabs.Tab>
            </Tabs.List>
          </Tabs>

          <Menu>
            <Menu.Target>
              <Button variant="outline">
                <SortAsc size={16} />
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>Most Popular</Menu.Item>
              <Menu.Item>Highest Rated</Menu.Item>
              <Menu.Item>Newest</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card>

      {/* Grid */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
        {filtered.map((t) => (
          <Card key={t.id} withBorder>
            <Card.Section>
              <Image src={t.image} height={160} />
            </Card.Section>

            <Stack mt="sm">
              <Group justify="space-between">
                <Text fw={600}>{t.title}</Text>
                {t.featured && (
                  <Badge leftSection={<Award size={12} />}>Featured</Badge>
                )}
              </Group>

              <Text size="sm" c="dimmed" lineClamp={2}>
                {t.description}
              </Text>

              <Group gap="xs">
                <Star size={14} />
                <Text size="sm">{t.rating}</Text>
                <Text size="xs" c="dimmed">
                  ({t.reviews})
                </Text>
              </Group>

              <Group justify="space-between">
                <Text fw={700}>${t.price}</Text>
                <Group gap="xs">
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => toggleWishlist(t.id)}
                  >
                    <Heart
                      size={14}
                      fill={wishlist.includes(t.id) ? "red" : "none"}
                    />
                  </Button>
                  <Button
                    size="xs"
                    onClick={() => {
                      setSelectedDoc(t);
                      setOpened(true);
                    }}
                  >
                    <Eye size={14} /> Preview
                  </Button>
                </Group>
              </Group>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>

      {/* Modal */}
      <Modal opened={opened} onClose={() => setOpened(false)} size="lg" title={selectedDoc?.title}>
        {selectedDoc && (
          <Stack>
            <Image src={selectedDoc.image} />
            <Text>{selectedDoc.description}</Text>
            <Divider />
            <Text fw={700}>${selectedDoc.price}</Text>
            <Button leftSection={<ShoppingCart size={16} />}>
              Purchase
            </Button>
          </Stack>
        )}
      </Modal>
    </Stack>
  );
}
