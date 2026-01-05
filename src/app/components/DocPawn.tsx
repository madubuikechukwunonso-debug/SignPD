import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  alpha,
  Avatar,
  AvatarGroup,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  InputLabel,
  Select,
  LinearProgress,
  Tooltip,
  Fab,
  Divider
} from '@mui/material';
import {
  Search,
  ShoppingCart,
  Star,
  Download,
  TrendingUp,
  Users,
  Award,
  Filter,
  SortAsc,
  Heart,
  Share2,
  Bookmark,
  Eye,
  Calendar,
  DollarSign,
  Tag,
  TrendingUp as TrendingIcon,
  Zap,
  Shield,
  CheckCircle,
  Clock,
  BarChart3,
  FileText,
  Image as ImageIcon,
  Upload,
  Plus,
  Pin,
  PushPin,
  MoreVertical,
  Play,
  Pause
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
  color: string;
}

interface SortOption {
  value: string;
  label: string;
  icon: React.ReactNode;
}

export function DocPawn() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<DocumentTemplate | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const categories: Category[] = [
    { id: 'All', name: 'All Templates', count: 2450, icon: <FileText size={20} />, color: '#4facfe' },
    { id: 'Resume', name: 'Resume', count: 420, icon: <Users size={20} />, color: '#00f2fe' },
    { id: 'Legal', name: 'Legal', count: 380, icon: <Shield size={20} />, color: '#43e97b' },
    { id: 'Finance', name: 'Finance', count: 290, icon: <DollarSign size={20} />, color: '#f093fb' },
    { id: 'Business', name: 'Business', count: 560, icon: <TrendingUp size={20} />, color: '#f5576c' },
    { id: 'Productivity', name: 'Productivity', count: 480, icon: <Zap size={20} />, color: '#764ba2' },
    { id: 'Marketing', name: 'Marketing', count: 320, icon: <Award size={20} />, color: '#667eea' }
  ];

  const sortOptions: SortOption[] = [
    { value: 'popular', label: 'Most Popular', icon: <TrendingIcon size={16} /> },
    { value: 'rating', label: 'Highest Rated', icon: <Star size={16} /> },
    { value: 'newest', label: 'Newest First', icon: <Calendar size={16} /> },
    { value: 'price-low', label: 'Price: Low to High', icon: <SortAsc size={16} /> },
    { value: 'price-high', label: 'Price: High to Low', icon: <SortAsc size={16} /> }
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
      image: 'https://images.unsplash.com/photo-1677693972403-db681288b5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0cGxhY2V8ZW58MXx8fHwxNzY3NTE1NDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080 ',
      author: 'Sarah Johnson',
      sales: 3247,
      featured: true,
      tags: ['ATS-friendly', 'Executive', 'Modern'],
      createdAt: '2024-01-15',
      fileSize: '2.4 MB',
      format: ['DOCX', 'PDF'],
      preview: true,
      reviews: 127
    },
    {
      id: 2,
      title: 'Corporate Contract Bundle',
      description: 'Comprehensive legal contract templates for business partnerships, NDAs, and service agreements',
      price: 29.99,
      rating: 4.8,
      downloads: 1892,
      category: 'Legal',
      image: 'https://images.unsplash.com/photo-1677693972403-db681288b5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0cGxhY2V8ZW58MXx8fHwxNzY3NTE1NDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080 ',
      author: 'Mike Chen',
      sales: 1892,
      featured: true,
      tags: ['Legal', 'Business', 'Professional'],
      createdAt: '2024-01-10',
      fileSize: '5.8 MB',
      format: ['DOCX', 'PDF'],
      preview: true,
      reviews: 89
    },
    {
      id: 3,
      title: 'Financial Dashboard Template',
      description: 'Professional Excel and Google Sheets templates for financial analysis and reporting',
      price: 24.99,
      rating: 4.7,
      downloads: 4134,
      category: 'Finance',
      image: 'https://images.unsplash.com/photo-1677693972403-db681288b5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0cGxhY2V8ZW58MXx8fHwxNzY3NTE1NDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080 ',
      author: 'Emily Davis',
      sales: 4134,
      featured: false,
      tags: ['Finance', 'Excel', 'Dashboard'],
      createdAt: '2024-01-08',
      fileSize: '1.2 MB',
      format: ['XLSX', 'Google Sheets'],
      preview: true,
      reviews: 203
    },
    {
      id: 4,
      title: 'Startup Pitch Deck',
      description: 'Investor-ready pitch deck template with comprehensive slides for startup presentations',
      price: 34.99,
      rating: 4.9,
      downloads: 2678,
      category: 'Business',
      image: 'https://images.unsplash.com/photo-1677693972403-db681288b5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0cGxhY2V8ZW58MXx8fHwxNzY3NTE1NDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080 ',
      author: 'James Wilson',
      sales: 2678,
      featured: true,
      tags: ['Startup', 'Pitch', 'Investment'],
      createdAt: '2024-01-12',
      fileSize: '8.5 MB',
      format: ['PPTX', 'PDF'],
      preview: true,
      reviews: 156
    },
    {
      id: 5,
      title: 'Meeting Minutes Template',
      description: 'Organized meeting minutes template with action items, follow-up sections, and decision tracking',
      price: 12.99,
      rating: 4.5,
      downloads: 2543,
      category: 'Productivity',
      image: 'https://images.unsplash.com/photo-1677693972403-db681288b5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0cGxhY2V8ZW58MXx8fHwxNzY3NTE1NDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080 ',
      author: 'Lisa Anderson',
      sales: 2543,
      featured: false,
      tags: ['Meeting', 'Productivity', 'Organization'],
      createdAt: '2024-01-05',
      fileSize: '856 KB',
      format: ['DOCX', 'PDF'],
      preview: true,
      reviews: 98
    },
    {
      id: 6,
      title: 'Marketing Campaign Planner',
      description: 'Comprehensive marketing campaign planning template with budget tracking and ROI analysis',
      price: 22.99,
      rating: 4.6,
      downloads: 1987,
      category: 'Marketing',
      image: 'https://images.unsplash.com/photo-1677693972403-db681288b5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0cGxhY2V8ZW58MXx8fHwxNzY3NTE1NDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080 ',
      author: 'Robert Taylor',
      sales: 1987,
      featured: false,
      tags: ['Marketing', 'Campaign', 'ROI'],
      createdAt: '2024-01-03',
      fileSize: '3.2 MB',
      format: ['XLSX', 'PDF'],
      preview: true,
      reviews: 76
    }
  ];

  const filteredTemplates = templates.filter(
    (template) =>
      (selectedCategory === 'All' || template.category === selectedCategory) &&
      (template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       template.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
       template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
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
    setWishlist(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const toggleCart = (templateId: number) => {
    setCart(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const handleSortMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };

  const getStatusChip = (template: DocumentTemplate) => {
    if (template.featured) {
      return (
        <Chip
          icon={<Award size={14} />}
          label="Featured"
          size="small"
          sx={{
            background: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
            color: 'white',
            fontWeight: 600
          }}
        />
      );
    }
    return null;
  };

  return (
    <Box>
      {/* Enhanced Header */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            fontSize: '2.5rem'
          }}
        >
          Enterprise Template Marketplace
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.2rem', maxWidth: 600 }}>
          Discover premium templates crafted by industry professionals and certified designers
        </Typography>
      </Box>

      {/* Enhanced Marketplace Stats */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {[
          { icon: <ShoppingCart size={24} />, label: 'Total Products', value: '2,450+', color: '#4facfe', change: '+245 this month' },
          { icon: <Users size={24} />, label: 'Active Creators', value: '850+', color: '#00f2fe', change: '+89 this month' },
          { icon: <TrendingUp size={24} />, label: 'Monthly Sales', value: '$125K', color: '#43e97b', change: '+23% growth' },
          { icon: <Star size={24} />, label: 'Avg. Rating', value: '4.8', color: '#f093fb', change: 'from 15k reviews' }
        ].map((stat, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Card
              elevation={0}
              sx={{
                background: `linear-gradient(135deg, ${stat.color} 0%, ${alpha(stat.color, 0.8)} 100%)`,
                color: 'white',
                borderRadius: 4,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Chip
                    label={stat.change}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.7rem'
                    }}
                  />
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.8rem' }}>
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Enhanced Search and Filters */}
      <Card
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          background: 'white'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Search and Controls */}
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Search templates by name, category, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowFilters(!showFilters)}>
                      <Filter size={18} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  background: '#f8fafc'
                }
              }}
            />
            
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(e, value) => value && setViewMode(value)}
              sx={{
                '& .MuiToggleButton-root': {
                  borderRadius: 2,
                  border: 'none',
                  background: '#f8fafc',
                  '&.Mui-selected': {
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    color: 'white'
                  }
                }
              }}
            >
              <ToggleButton value="grid">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0.5 }}>
                    <Box sx={{ width: 3, height: 3, background: 'currentColor', borderRadius: 0.5 }} />
                    <Box sx={{ width: 3, height: 3, background: 'currentColor', borderRadius: 0.5 }} />
                    <Box sx={{ width: 3, height: 3, background: 'currentColor', borderRadius: 0.5 }} />
                    <Box sx={{ width: 3, height: 3, background: 'currentColor', borderRadius: 0.5 }} />
                  </Box>
                  Grid
                </Box>
              </ToggleButton>
              <ToggleButton value="list">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Box sx={{ width: 12, height: 1, background: 'currentColor' }} />
                    <Box sx={{ width: 12, height: 1, background: 'currentColor' }} />
                    <Box sx={{ width: 12, height: 1, background: 'currentColor' }} />
                  </Box>
                  List
                </Box>
              </ToggleButton>
            </ToggleButtonGroup>

            <Button
              variant="outlined"
              onClick={handleSortMenuOpen}
              startIcon={<SortAsc size={18} />}
              sx={{ borderRadius: 2, fontWeight: 600 }}
            >
              Sort
            </Button>
          </Stack>

          {/* Category Pills */}
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: showFilters ? 3 : 0 }}>
            {categories.map((category) => (
              <Chip
                key={category.id}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {category.icon}
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {category.name}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        {category.count}
                      </Typography>
                    </Box>
                  </Box>
                }
                onClick={() => setSelectedCategory(category.id)}
                sx={{
                  fontWeight: 600,
                  background: selectedCategory === category.id
                    ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
                    : alpha('#4facfe', 0.1),
                  color: selectedCategory === category.id ? 'white' : '#4facfe',
                  borderRadius: 3,
                  px: 1.5,
                  py: 1,
                  '&:hover': {
                    background: selectedCategory === category.id
                      ? 'linear-gradient(135deg, #3e9bee 0%, #00d9ee 100%)'
                      : alpha('#4facfe', 0.2)
                  }
                }}
              />
            ))}
          </Stack>

          {/* Advanced Filters */}
          {showFilters && (
            <Box sx={{ 
              borderTop: '1px solid',
              borderColor: 'divider',
              pt: 3,
              mt: 3
            }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Price Range</InputLabel>
                    <Select
                      value={`${priceRange[0]}-${priceRange[1]}`}
                      label="Price Range"
                      onChange={(e) => {
                        const [min, max] = e.target.value.split('-').map(Number);
                        setPriceRange([min, max]);
                      }}
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="0-50">$0 - $50</MenuItem>
                      <MenuItem value="0-25">$0 - $25</MenuItem>
                      <MenuItem value="25-50">$25 - $50</MenuItem>
                      <MenuItem value="50-100">$50+</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Minimum Rating</InputLabel>
                    <Select
                      defaultValue="4"
                      label="Minimum Rating"
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="0">Any Rating</MenuItem>
                      <MenuItem value="3">3+ Stars</MenuItem>
                      <MenuItem value="4">4+ Stars</MenuItem>
                      <MenuItem value="4.5">4.5+ Stars</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>File Format</InputLabel>
                    <Select
                      defaultValue=""
                      label="File Format"
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="">All Formats</MenuItem>
                      <MenuItem value="pdf">PDF</MenuItem>
                      <MenuItem value="docx">DOCX</MenuItem>
                      <MenuItem value="xlsx">XLSX</MenuItem>
                      <MenuItem value="pptx">PPTX</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Sort Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleSortMenuClose}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
          }
        }}
      >
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => {
              setSortBy(option.value);
              handleSortMenuClose();
            }}
            sx={{ 
              borderRadius: 1,
              mb: 0.5,
              background: sortBy === option.value ? alpha('#4facfe', 0.1) : 'transparent'
            }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              {option.icon}
            </ListItemIcon>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {option.label}
            </Typography>
            {sortBy === option.value && (
              <CheckCircle size={16} color="#4facfe" style={{ marginLeft: 'auto' }} />
            )}
          </MenuItem>
        ))}
      </Menu>

      {/* Enhanced Templates Grid/List */}
      {viewMode === 'grid' ? (
        <Grid container spacing={4}>
          {filteredTemplates.map((template) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={template.id}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 4,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(79, 172, 254, 0.15)',
                    borderColor: '#4facfe'
                  }
                }}
              >
                <CardMedia
                  component="div"
                  sx={{ height: 220, position: 'relative', overflow: 'hidden' }}
                >
                  <ImageWithFallback
                    src={template.image}
                    alt={template.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      p: 2
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Chip
                        label={template.category}
                        size="small"
                        sx={{
                          background: 'rgba(255,255,255,0.9)',
                          backdropFilter: 'blur(10px)',
                          fontWeight: 600
                        }}
                      />
                      <Stack direction="row" spacing={0.5}>
                        {getStatusChip(template)}
                        <IconButton
                          size="small"
                          onClick={() => toggleWishlist(template.id)}
                          sx={{
                            background: 'rgba(255,255,255,0.9)',
                            '&:hover': { background: 'white' },
                            color: wishlist.includes(template.id) ? '#f44336' : '#666'
                          }}
                        >
                          <Heart size={14} fill={wishlist.includes(template.id) ? '#f44336' : 'none'} />
                        </IconButton>
                      </Stack>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 32, height: 32, border: '2px solid white' }}>
                        {template.author[0]}
                      </Avatar>
                      <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                        {template.author}
                      </Typography>
                    </Box>
                  </Box>
                </CardMedia>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                    {template.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                    {template.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Rating value={template.rating} precision={0.1} readOnly size="small" />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {template.rating}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ({template.reviews} reviews)
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    {template.tags.slice(0, 2).map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          fontSize: '0.7rem',
                          background: alpha('#4facfe', 0.1),
                          color: '#4facfe'
                        }}
                      />
                    ))}
                  </Stack>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      ${template.price}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={() => toggleCart(template.id)}
                        sx={{
                          background: cart.includes(template.id) ? '#4facfe' : alpha('#4facfe', 0.1),
                          color: cart.includes(template.id) ? 'white' : '#4facfe',
                          '&:hover': {
                            background: cart.includes(template.id) ? '#3e9bee' : alpha('#4facfe', 0.2)
                          }
                        }}
                      >
                        <ShoppingCart size={16} />
                      </IconButton>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleViewDetails(template)}
                        startIcon={<Eye size={16} />}
                        sx={{
                          borderRadius: 2,
                          fontWeight: 600,
                          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                          boxShadow: '0 4px 12px rgba(79, 172, 254, 0.4)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #3e9bee 0%, #00d9ee 100%)'
                          }
                        }}
                      >
                        Preview
                      </Button>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Stack spacing={3}>
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              elevation={0}
              sx={{
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  borderColor: '#4facfe'
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={3} alignItems="center">
                  <CardMedia
                    component="div"
                    sx={{ 
                      width: 120, 
                      height: 90, 
                      borderRadius: 2,
                      overflow: 'hidden'
                    }}
                  >
                    <ImageWithFallback
                      src={template.image}
                      alt={template.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </CardMedia>
                  
                  <Box sx={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {template.title}
                      </Typography>
                      {getStatusChip(template)}
                    </Stack>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {template.description}
                    </Typography>
                    
                    <Stack direction="row" spacing={3} alignItems="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Rating value={template.rating} precision={0.1} readOnly size="small" />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {template.rating}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ({template.reviews} reviews)
                        </Typography>
                      </Box>
                      
                      <Typography variant="caption" color="text.secondary">
                        • {template.downloads.toLocaleString()} downloads
                      </Typography>
                      
                      <Typography variant="caption" color="text.secondary">
                        • {template.fileSize}
                      </Typography>
                    </Stack>
                  </Box>
                  
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      ${template.price}
                    </Typography>
                    
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        onClick={() => toggleWishlist(template.id)}
                        sx={{
                          color: wishlist.includes(template.id) ? '#f44336' : '#666'
                        }}
                      >
                        <Heart size={18} fill={wishlist.includes(template.id) ? '#f44336' : 'none'} />
                      </IconButton>
                      
                      <Button
                        variant="contained"
                        onClick={() => handleViewDetails(template)}
                        startIcon={<Eye size={16} />}
                        sx={{
                          borderRadius: 2,
                          fontWeight: 600,
                          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                          boxShadow: '0 4px 12px rgba(79, 172, 254, 0.4)'
                        }}
                      >
                        Preview
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      {/* Enhanced Detail Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }
        }}
      >
        {selectedDoc && (
          <>
            <DialogTitle sx={{ p: 4, pb: 2 }}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {selectedDoc.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    by {selectedDoc.author} • {selectedDoc.createdAt}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                  <IconButton
                    onClick={() => toggleWishlist(selectedDoc.id)}
                    sx={{
                      color: wishlist.includes(selectedDoc.id) ? '#f44336' : '#666'
                    }}
                  >
                    <Heart size={20} fill={wishlist.includes(selectedDoc.id) ? '#f44336' : 'none'} />
                  </IconButton>
                  <IconButton>
                    <Share2 size={20} />
                  </IconButton>
                </Stack>
              </Stack>
            </DialogTitle>
            <DialogContent sx={{ p: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={7}>
                  <Box sx={{ mb: 3 }}>
                    <ImageWithFallback
                      src={selectedDoc.image}
                      alt={selectedDoc.title}
                      style={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 16 }}
                    />
                  </Box>
                  
                  <Typography variant="body1" paragraph sx={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
                    {selectedDoc.description}
                  </Typography>
                  
                  <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                    <Chip label={selectedDoc.category} sx={{ fontWeight: 600 }} />
                    <Chip label={`By ${selectedDoc.author}`} variant="outlined" sx={{ fontWeight: 600 }} />
                  </Stack>
                  
                  <Stack direction="row" spacing={3} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Rating value={selectedDoc.rating} precision={0.1} readOnly />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {selectedDoc.rating} out of 5
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Download size={18} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {selectedDoc.sales.toLocaleString()} sales
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Calendar size={18} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {selectedDoc.createdAt}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
                
                <Grid item xs={12} md={5}>
                  <Card elevation={0} sx={{ borderRadius: 3, background: '#f8fafc' }}>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                        Template Details
                      </Typography>
                      
                      <Stack spacing={3}>
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            File Information
                          </Typography>
                          <Stack spacing={1}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2">File Size:</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedDoc.fileSize}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2">Formats:</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {selectedDoc.format.join(', ')}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2">Reviews:</Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedDoc.reviews}</Typography>
                            </Box>
                          </Stack>
                        </Box>
                        
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Tags
                          </Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {selectedDoc.tags.map((tag) => (
                              <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                sx={{
                                  background: alpha('#4facfe', 0.1),
                                  color: '#4facfe'
                                }}
                              />
                            ))}
                          </Stack>
                        </Box>
                        
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Price
                          </Typography>
                          <Typography
                            variant="h4"
                            sx={{
                              fontWeight: 800,
                              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent'
                            }}
                          >
                            ${selectedDoc.price}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 4, pt: 0 }}>
              <Button 
                onClick={() => setDialogOpen(false)} 
                size="large"
                sx={{ borderRadius: 2 }}
              >
                Close
              </Button>
              <Button
                variant="contained"
                onClick={handlePurchase}
                startIcon={<ShoppingCart size={18} />}
                size="large"
                sx={{
                  borderRadius: 2,
                  px: 4,
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  boxShadow: '0 4px 12px rgba(79, 172, 254, 0.4)'
                }}
              >
                Purchase for ${selectedDoc.price}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
