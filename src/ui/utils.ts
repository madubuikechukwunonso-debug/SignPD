// Enterprise-grade utility functions for the SignPro document management system

import { format, formatDistance, formatRelative, isValid, parseISO } from 'date-fns';
import { debounce, throttle, cloneDeep, merge, pick, omit, isEqual, isEmpty } from 'lodash-es';

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: Date;
  extension: string;
  isImage: boolean;
  isDocument: boolean;
  isVideo: boolean;
  isAudio: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

export interface SearchParams {
  query: string;
  fields?: string[];
  fuzzy?: boolean;
  highlight?: boolean;
}

// ==========================================
// DATE & TIME UTILITIES
// ==========================================

/**
 * Format date for display with enterprise standards
 */
export const formatDate = (date: string | Date, pattern = 'MMM dd, yyyy • HH:mm'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) return 'Invalid date';
  return format(dateObj, pattern);
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) return 'Invalid date';
  return formatRelative(dateObj, new Date());
};

/**
 * Format time distance (e.g., "in 2 hours")
 */
export const formatTimeDistance = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) return 'Invalid date';
  return formatDistance(dateObj, new Date(), { addSuffix: true });
};

/**
 * Get business days between dates
 */
export const getBusinessDays = (start: Date, end: Date): number => {
  let count = 0;
  const current = new Date(start);
  
  while (current <= end) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) count++;
    current.setDate(current.getDate() + 1);
  }
  
  return count;
};

// ==========================================
// FILE & DOCUMENT UTILITIES
// ==========================================

/**
 * Get comprehensive file information
 */
export const getFileInfo = (file: File): FileInfo => {
  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  const type = file.type.toLowerCase();
  
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: new Date(file.lastModified),
    extension,
    isImage: /^image\/(jpeg|jpg|png|gif|webp|svg)/.test(type) || ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension),
    isDocument: /application\/(pdf|msword|vnd\.openxmlformats-officedocument)/.test(type) || ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(extension),
    isVideo: /^video\/(mp4|webm|ogg)/.test(type) || ['mp4', 'webm', 'ogg'].includes(extension),
    isAudio: /^audio\/(mpeg|wav|ogg)/.test(type) || ['mp3', 'wav', 'ogg'].includes(extension)
  };
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Validate file upload
 */
export const validateFile = (
  file: File,
  options: {
    maxSize?: number;
    allowedTypes?: string[];
    allowedExtensions?: string[];
    minDimensions?: { width: number; height: number };
    maxDimensions?: { width: number; height: number };
  }
): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const fileInfo = getFileInfo(file);

  // Size validation
  if (options.maxSize && file.size > options.maxSize) {
    errors.push(`File size exceeds maximum allowed size of ${formatFileSize(options.maxSize)}`);
  }

  // Type validation
  if (options.allowedTypes && !options.allowedTypes.some(type => file.type.includes(type))) {
    errors.push(`File type ${file.type} is not allowed`);
  }

  // Extension validation
  if (options.allowedExtensions && !options.allowedExtensions.includes(fileInfo.extension)) {
    errors.push(`File extension .${fileInfo.extension} is not allowed`);
  }

  return { isValid: errors.length === 0, errors, warnings };
};

/**
 * Generate document preview URL
 */
export const generatePreviewUrl = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// ==========================================
// VALIDATION UTILITIES
// ==========================================

/**
 * Validate email address
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number
 */
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Validate URL
 */
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  // Common password warnings
  const commonPasswords = ['password', '123456', 'qwerty', 'admin', 'letmein'];
  if (commonPasswords.some(common => password.toLowerCase().includes(common))) {
    warnings.push('Password contains common words');
  }

  return { isValid: errors.length === 0, errors, warnings };
};

/**
 * Sanitize HTML content
 */
export const sanitizeHtml = (html: string): string => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

// ==========================================
// STRING & TEXT UTILITIES
// ==========================================

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number, suffix = '...'): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
};

/**
 * Generate random string
 */
export const generateRandomString = (length: number, charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
};

/**
 * Slugify text for URLs
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Extract hashtags from text
 */
export const extractHashtags = (text: string): string[] => {
  const hashtagRegex = /#[a-zA-Z0-9_]+/g;
  return text.match(hashtagRegex) || [];
};

/**
 * Format currency
 */
export const formatCurrency = (amount: number, currency = 'USD', locale = 'en-US'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// ==========================================
// ARRAY & OBJECT UTILITIES
// ==========================================

/**
 * Deep clone an object
 */
export const deepClone = <T>(obj: T): T => {
  return cloneDeep(obj);
};

/**
 * Merge objects deeply
 */
export const deepMerge = <T extends Record<string, any>>(target: T, source: Partial<T>): T => {
  return merge(cloneDeep(target), source);
};

/**
 * Pick specific properties from object
 */
export const pickProperties = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  return pick(obj, keys);
};

/**
 * Omit specific properties from object
 */
export const omitProperties = <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  return omit(obj, keys);
};

/**
 * Check if objects are deeply equal
 */
export const deepEqual = (a: any, b: any): boolean => {
  return isEqual(a, b);
};

/**
 * Check if value is empty
 */
export const isEmptyValue = (value: any): boolean => {
  return isEmpty(value);
};

/**
 * Group array by key
 */
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

/**
 * Remove duplicates from array
 */
export const unique = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

// ==========================================
// API & NETWORK UTILITIES
// ==========================================

/**
 * Create API response wrapper
 */
export const createApiResponse = <T>(
  success: boolean,
  data?: T,
  error?: string,
  message?: string,
  statusCode?: number
): ApiResponse<T> => {
  return {
    success,
    data,
    error,
    message,
    statusCode
  };
};

/**
 * Handle API errors
 */
export const handleApiError = (error: any): ApiResponse => {
  if (error.response) {
    // Server error
    return createApiResponse(
      false,
      undefined,
      error.response.data?.message || 'Server error occurred',
      error.response.data?.message,
      error.response.status
    );
  } else if (error.request) {
    // Network error
    return createApiResponse(
      false,
      undefined,
      'Network error - please check your connection',
      'Network error',
      0
    );
  } else {
    // Other error
    return createApiResponse(
      false,
      undefined,
      error.message || 'An unexpected error occurred',
      error.message,
      500
    );
  }
};

/**
 * Build query string
 */
export const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(key, String(v)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });
  
  return searchParams.toString();
};

/**
 * Parse query string
 */
export const parseQueryString = (queryString: string): Record<string, string | string[]> => {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string | string[]> = {};
  
  params.forEach((value, key) => {
    if (result[key]) {
      // Convert to array if multiple values
      result[key] = Array.isArray(result[key]) 
        ? [...(result[key] as string[]), value]
        : [result[key] as string, value];
    } else {
      result[key] = value;
    }
  });
  
  return result;
};

// ==========================================
// PERFORMANCE UTILITIES
// ==========================================

/**
 * Debounce function calls
 */
export const debounceFn = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options?: any
): T => {
  return debounce(func, wait, options) as T;
};

/**
 * Throttle function calls
 */
export const throttleFn = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options?: any
): T => {
  return throttle(func, wait, options) as T;
};

/**
 * Measure performance
 */
export const measurePerformance = async <T>(
  name: string,
  fn: () => Promise<T>
): Promise<{ result: T; duration: number }> => {
  const start = performance.now();
  const result = await fn();
  const duration = performance.now() - start;
  
  console.log(`${name} took ${duration.toFixed(2)}ms`);
  return { result, duration };
};

/**
 * Lazy load images
 */
export const lazyLoadImage = (src: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = reject;
    img.src = src;
  });
};

// ==========================================
// LOCAL STORAGE UTILITIES
// ==========================================

/**
 * Safely get item from localStorage
 */
export const getLocalStorageItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Safely set item in localStorage
 */
export const setLocalStorageItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

/**
 * Safely remove item from localStorage
 */
export const removeLocalStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

/**
 * Clear all items from localStorage
 */
export const clearLocalStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

// ==========================================
// ENCRYPTION & SECURITY UTILITIES
// ==========================================

/**
 * Simple text encryption (for non-sensitive data)
 */
export const simpleEncrypt = (text: string, key = 'default-key'): string => {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return btoa(result);
};

/**
 * Simple text decryption
 */
export const simpleDecrypt = (encryptedText: string, key = 'default-key'): string => {
  try {
    const decoded = atob(encryptedText);
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      result += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
  } catch {
    return '';
  }
};

/**
 * Generate secure random ID
 */
export const generateSecureId = (length = 16): string => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Hash string using Web Crypto API
 */
export const hashString = async (text: string, algorithm: 'SHA-256' | 'SHA-512' = 'SHA-256'): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// ==========================================
// COLOR & THEME UTILITIES
// ==========================================

/**
 * Generate gradient from colors
 */
export const generateGradient = (colors: string[], angle = 135): string => {
  return `linear-gradient(${angle}deg, ${colors.join(', ')})`;
};

/**
 * Lighten or darken color
 */
export const adjustColor = (color: string, amount: number): string => {
  const hex = color.replace('#', '');
  const num = parseInt(hex, 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
};

/**
 * Convert hex to RGBA
 */
export const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Get contrast color (black or white)
 */
export const getContrastColor = (hexColor: string): string => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#ffffff';
};

// ==========================================
// MATH & CALCULATION UTILITIES
// ==========================================

/**
 * Calculate percentage
 */
export const calculatePercentage = (value: number, total: number, decimals = 2): number => {
  if (total === 0) return 0;
  return Number(((value / total) * 100).toFixed(decimals));
};

/**
 * Round to nearest decimal
 */
export const roundToDecimal = (value: number, decimals = 2): number => {
  return Number(value.toFixed(decimals));
};

/**
 * Generate random number in range
 */
export const randomInRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Format number with commas
 */
export const formatNumber = (num: number, decimals = 0): string => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};

// ==========================================
// EXPORT DEFAULT
// ==========================================

export default {
  // Date & Time
  formatDate,
  formatRelativeTime,
  formatTimeDistance,
  getBusinessDays,
  
  // File & Document
  getFileInfo,
  formatFileSize,
  validateFile,
  generatePreviewUrl,
  
  // Validation
  validateEmail,
  validatePhone,
  validateUrl,
  validatePassword,
  sanitizeHtml,
  
  // String & Text
  truncateText,
  generateRandomString,
  slugify,
  extractHashtags,
  formatCurrency,
  
  // Array & Object
  deepClone,
  deepMerge,
  pickProperties,
  omitProperties,
  deepEqual,
  isEmptyValue,
  groupBy,
  unique,
  
  // API & Network
  createApiResponse,
  handleApiError,
  buildQueryString,
  parseQueryString,
  
  // Performance
  debounce: debounceFn,
  throttle: throttleFn,
  measurePerformance,
  lazyLoadImage,
  
  // Local Storage
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
  clearLocalStorage,
  
  // Security
  simpleEncrypt,
  simpleDecrypt,
  generateSecureId,
  hashString,
  
  // Color & Theme
  generateGradient,
  adjustColor,
  hexToRgba,
  getContrastColor,
  
  // Math & Calculation
  calculatePercentage,
  roundToDecimal,
  randomInRange,
  formatNumber
};
