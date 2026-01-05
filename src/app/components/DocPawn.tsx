import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
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
  Tag,
  Zap,
  Shield,
  CheckCircle,
  SortAsc,
} from 'lucide-react';
import { ImageWithFallback } from "../../figma/ImageWithFallback";

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
  preview: boolean;
  reviews: number;
}

interface Category {
  id: string;
  name: string;
  count: number;
  icon: React.ReactNode;
}

export function DocPawn() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<DocumentTemplate | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  const categories: Category[] = [
    { id: 'All', name: 'All Templates', count: 2450, icon: <FileText className="h-5 w-5" /> },
    { id: 'Resume', name: 'Resume', count: 420, icon: <Users className="h-5 w-5" /> },
    { id: 'Legal', name: 'Legal', count: 380, icon: <Shield className="h-5 w-5" /> },
    { id: 'Finance', name: 'Finance', count: 290, icon: <DollarSign className="h-5 w-5" /> },
    { id: 'Business', name: 'Business', count: 560, icon: <TrendingUp className="h-5 w-5" /> },
    { id: 'Productivity', name: 'Productivity', count: 480, icon: <Zap className="h-5 w-5" /> },
    { id: 'Marketing', name: 'Marketing', count: 320, icon: <Award className="h-5 w-5" /> },
  ];

  const templates: DocumentTemplate[] = [
    {
      id: 1,
      title: 'Executive Resume Template',
      description: 'Premium ATS-optimized resume template with modern design and customizable sections for executives',
      price: 19.99,
      rating: 4.9,
      downloads: 3247,
      category: 'Resume',
      image: 'https://images.unsplash.com/photo-1677693972403-db681288b5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0cGxhY2V8ZW58MXx8fHwxNzY3NTE1NDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      author: 'Sarah Johnson',
      sales: 3247,
      featured: true,
      tags: ['ATS-friendly', 'Executive', 'Modern'],
      createdAt: '2024-01-15',
      fileSize: '2.4 MB',
      format: ['DOCX', 'PDF'],
      preview: true,
      reviews: 127,
    },
    {
      id: 2,
      title: 'Corporate Contract Bundle',
      description: 'Comprehensive legal contract templates for business partnerships, NDAs, and service agreements',
      price: 29.99,
      rating: 4.8,
      downloads: 1892,
      category: 'Legal',
      image: 'https://images.unsplash.com/photo-1677693972403-db681288b5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0cGxhY2V8ZW58MXx8fHwxNzY3NTE1NDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      author: 'Mike Chen',
      sales: 1892,
      featured: true,
      tags: ['Legal', 'Business', 'Professional'],
      createdAt: '2024-01-10',
      fileSize: '5.8 MB',
      format: ['DOCX', 'PDF'],
      preview: true,
      reviews: 89,
    },
    {
      id: 3,
      title: 'Financial Dashboard Template',
      description: 'Professional Excel and Google Sheets templates for financial analysis and reporting',
      price: 24.99,
      rating: 4.7,
      downloads: 4134,
      category: 'Finance',
      image: 'https://images.unsplash.com/photo-1677693972403-db681288b5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0cGxhY2V8ZW58MXx8fHwxNzY3NTE1NDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      author: 'Emily Davis',
      sales: 4134,
      featured: false,
      tags: ['Finance', 'Excel', 'Dashboard'],
      createdAt: '2024-01-08',
      fileSize: '1.2 MB',
      format: ['XLSX', 'Google Sheets'],
      preview: true,
      reviews: 203,
    },
    {
      id: 4,
      title: 'Startup Pitch Deck',
      description: 'Investor-ready pitch deck template with comprehensive slides for startup presentations',
      price: 34.99,
      rating: 4.9,
      downloads: 2678,
      category: 'Business',
      image: 'https://images.unsplash.com/photo-1677693972403-db681288b5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0cGxhY2V8ZW58MXx8fHwxNzY3NTE1NDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      author: 'James Wilson',
      sales: 2678,
      featured: true,
      tags: ['Startup', 'Pitch', 'Investment'],
      createdAt: '2024-01-12',
      fileSize: '8.5 MB',
      format: ['PPTX', 'PDF'],
      preview: true,
      reviews: 156,
    },
    {
      id: 5,
      title: 'Meeting Minutes Template',
      description: 'Organized meeting minutes template with action items, follow-up sections, and decision tracking',
      price: 12.99,
      rating: 4.5,
      downloads: 2543,
      category: 'Productivity',
      image: 'https://images.unsplash.com/photo-1677693972403-db681288b5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0cGxhY2V8ZW58MXx8fHwxNzY3NTE1NDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      author: 'Lisa Anderson',
      sales: 2543,
      featured: false,
      tags: ['Meeting', 'Productivity', 'Organization'],
      createdAt: '2024-01-05',
      fileSize: '856 KB',
      format: ['DOCX', 'PDF'],
      preview: true,
      reviews: 98,
    },
    {
      id: 6,
      title: 'Marketing Campaign Planner',
      description: 'Comprehensive marketing campaign planning template with budget tracking and ROI analysis',
      price: 22.99,
      rating: 4.6,
      downloads: 1987,
      category: 'Marketing',
      image: 'https://images.unsplash.com/photo-1677693972403-db681288b5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0cGxhY2V8ZW58MXx8fHwxNzY3NTE1NDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      author: 'Robert Taylor',
      sales: 1987,
      featured: false,
      tags: ['Marketing', 'Campaign', 'ROI'],
      createdAt: '2024-01-03',
      fileSize: '3.2 MB',
      format: ['XLSX', 'PDF'],
      preview: true,
      reviews: 76,
    },
  ];

  const filteredTemplates = templates.filter(
    (template) =>
      (selectedCategory === 'All' || template.category === selectedCategory) &&
      (template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const handleViewDetails = (template: DocumentTemplate) => {
    setSelectedDoc(template);
    setDialogOpen(true);
  };

  const handlePurchase = () => {
    if (selectedDoc) {
      alert(`Purchasing: ${selectedDoc.title} for $${selectedDoc.price}`);
      setDialogOpen(false);
    }
  };

  const toggleWishlist = (templateId: number) => {
    setWishlist((prev) =>
      prev.includes(templateId) ? prev.filter((id) => id !== templateId) : [...prev, templateId]
    );
  };

  const toggleCart = (templateId: number) => {
    setCart((prev) =>
      prev.includes(templateId) ? prev.filter((id) => id !== templateId) : [...prev, templateId]
    );
  };

  const getStatusBadge = (template: DocumentTemplate) => {
    if (template.featured) {
      return (
        <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white">
          <Award className="h-3 w-3 mr-1" /> Featured
        </Badge>
      );
    }
    return null;
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Enterprise Template Marketplace
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Discover premium templates crafted by industry professionals and certified designers
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: <ShoppingCart className="h-6 w-6" />, label: 'Total Products', value: '2,450+', change: '+245 this month', gradient: 'from-blue-500 to-cyan-400' },
          { icon: <Users className="h-6 w-6" />, label: 'Active Creators', value: '850+', change: '+89 this month', gradient: 'from-cyan-500 to-cyan-400' },
          { icon: <TrendingUp className="h-6 w-6" />, label: 'Monthly Sales', value: '$125K', change: '+23% growth', gradient: 'from-green-500 to-green-400' },
          { icon: <Star className="h-6 w-6" />, label: 'Avg. Rating', value: '4.8', change: 'from 15k reviews', gradient: 'from-purple-500 to-purple-400' },
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

      {/* Search & Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates by name, category, or tags..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'grid' | 'list')} className="w-full lg:w-auto">
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </Tabs>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SortAsc className="h-4 w-4" /> Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuItem>Most Popular</DropdownMenuItem>
                <DropdownMenuItem>Highest Rated</DropdownMenuItem>
                <DropdownMenuItem>Newest First</DropdownMenuItem>
                <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2" /> Filters
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((cat) => (
              <Badge
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "secondary"}
                className="cursor-pointer text-sm py-2 px-3 flex items-center gap-2"
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.icon}
                {cat.name}
                <span className="text-xs opacity-70">({cat.count})</span>
              </Badge>
            ))}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-6 border-t">
              <div className="space-y-2">
                <Label>Price Range</Label>
                <Select
                  value={`${priceRange[0]}-${priceRange[1]}`}
                  onValueChange={(v: string) => {
                    const [min, max] = v.split('-').map(Number);
                    setPriceRange([min, max]);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-50">$0 - $50</SelectItem>
                    <SelectItem value="0-25">$0 - $25</SelectItem>
                    <SelectItem value="25-50">$25 - $50</SelectItem>
                    <SelectItem value="50-100">$50+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Minimum Rating</Label>
                <Select defaultValue="4">
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any Rating</SelectItem>
                    <SelectItem value="3">3+ Stars</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>File Format</Label>
                <Select defaultValue="">
                  <SelectTrigger>
                    <SelectValue placeholder="All Formats" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Formats</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="docx">DOCX</SelectItem>
                    <SelectItem value="xlsx">XLSX</SelectItem>
                    <SelectItem value="pptx">PPTX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Templates Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="relative h-52">
                <ImageWithFallback
                  src={template.image}
                  alt={template.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                  <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                    {template.category}
                  </Badge>
                  <div className="flex gap-1">
                    {getStatusBadge(template)}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 bg-white/90 backdrop-blur-sm hover:bg-white"
                      onClick={() => toggleWishlist(template.id)}
                    >
                      <Heart
                        className="h-4 w-4"
                        fill={wishlist.includes(template.id) ? "#ef4444" : "none"}
                        stroke={wishlist.includes(template.id) ? "#ef4444" : "currentColor"}
                      />
                    </Button>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${template.author}`} />
                    <AvatarFallback>{template.author[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-white text-sm font-medium">{template.author}</span>
                </div>
              </div>

              <CardContent className="p-5">
                <h3 className="font-bold text-lg line-clamp-1 mb-2">{template.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{template.description}</p>

                <div className="flex items-center gap-1 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4"
                        fill={i < Math.floor(template.rating) ? "#fbbf24" : "none"}
                        stroke={i < Math.floor(template.rating) ? "#fbbf24" : "#d1d5db"}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{template.rating}</span>
                  <span className="text-xs text-muted-foreground">({template.reviews})</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    ${template.price}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleCart(template.id)}
                      className={cart.includes(template.id) ? "bg-primary text-primary-foreground" : ""}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      {cart.includes(template.id) ? "Added" : "Cart"}
                    </Button>
                    <Button size="sm" onClick={() => handleViewDetails(template)}>
                      <Eye className="h-4 w-4 mr-1" /> Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* List view – same as before */
        <div className="space-y-4">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-full sm:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={template.image}
                      alt={template.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg truncate">{template.title}</h3>
                      {getStatusBadge(template)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{template.description}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4"
                              fill={i < Math.floor(template.rating) ? "#fbbf24" : "none"}
                              stroke={i < Math.floor(template.rating) ? "#fbbf24" : "#d1d5db"}
                            />
                          ))}
                        </div>
                        <span className="font-medium">{template.rating}</span>
                        <span className="text-muted-foreground">({template.reviews})</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <span className="font-medium">{template.downloads.toLocaleString()} downloads</span>
                      <span className="text-muted-foreground">•</span>
                      <span>{template.fileSize}</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                    <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                      ${template.price}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleWishlist(template.id)}
                      >
                        <Heart
                          className="h-4 w-4 mr-1"
                          fill={wishlist.includes(template.id) ? "#ef4444" : "none"}
                        />
                        Wishlist
                      </Button>
                      <Button size="sm" onClick={() => handleViewDetails(template)}>
                        <Eye className="h-4 w-4 mr-1" /> Preview
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {selectedDoc && (
          <>
            <DialogHeader className="p-6 pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <DialogTitle className="text-2xl font-bold">{selectedDoc.title}</DialogTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    by {selectedDoc.author} • {selectedDoc.createdAt}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleWishlist(selectedDoc.id)}
                  >
                    <Heart
                      className="h-5 w-5"
                      fill={wishlist.includes(selectedDoc.id) ? "#ef4444" : "none"}
                    />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </DialogHeader>
            <DialogContent className="p-6 max-w-5xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="rounded-xl overflow-hidden mb-6">
                    <ImageWithFallback
                      src={selectedDoc.image}
                      alt={selectedDoc.title}
                      className="w-full aspect-video object-cover"
                    />
                  </div>
                  <p className="text-base leading-relaxed mb-6">{selectedDoc.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge>{selectedDoc.category}</Badge>
                    <Badge variant="outline">By {selectedDoc.author}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5"
                            fill={i < Math.floor(selectedDoc.rating) ? "#fbbf24" : "none"}
                            stroke={i < Math.floor(selectedDoc.rating) ? "#fbbf24" : "#d1d5db"}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{selectedDoc.rating} / 5</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="h-5 w-5" />
                      <span className="font-medium">{selectedDoc.sales.toLocaleString()} sales</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span>{selectedDoc.createdAt}</span>
                    </div>
                  </div>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Template Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">File Information</h4>
                      <dl className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">File Size</dt>
                          <dd className="font-medium">{selectedDoc.fileSize}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Formats</dt>
                          <dd className="font-medium">{selectedDoc.format.join(', ')}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Reviews</dt>
                          <dd className="font-medium">{selectedDoc.reviews}</dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedDoc.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Price</h4>
                      <p className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                        ${selectedDoc.price}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </DialogContent>
            <DialogFooter className="p-6 pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Close
              </Button>
              <Button
                onClick={handlePurchase}
                className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Purchase for ${selectedDoc.price}
              </Button>
            </DialogFooter>
          </>
        )}
      </Dialog>
    </div>
  );
}
