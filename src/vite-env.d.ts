/// <reference types="vite/client" />

/**
 * Vite Environment Variables Type Definitions
 * SignPro Enterprise - Document Management Platform
 * 
 * This file provides TypeScript type definitions for Vite's environment variables
 * and module declarations for various file types used in the application.
 */

// ============================================
// ENVIRONMENT VARIABLES
// ============================================

interface ImportMetaEnv {
  /**
   * Application Environment
   * @example "development" | "staging" | "production"
   */
  readonly VITE_APP_ENV: string;

  /**
   * Application Version
   * @example "1.0.0"
   */
  readonly VITE_APP_VERSION: string;

  /**
   * API Base URL for backend services
   * @example "https://api.signpro.com" | "http://localhost:3001"
   */
  readonly VITE_API_URL: string;

  /**
   * WebSocket URL for real-time features
   * @example "wss://ws.signpro.com" | "ws://localhost:3002"
   */
  readonly VITE_WS_URL: string;

  /**
   * Encryption key for client-side encryption
   * @example "your-encryption-key-here"
   */
  readonly VITE_ENCRYPTION_KEY: string;

  /**
   * JWT Secret for token validation
   * @example "your-jwt-secret-here"
   */
  readonly VITE_JWT_SECRET: string;

  /**
   * Storage bucket name for file uploads
   * @example "signpro-documents"
   */
  readonly VITE_STORAGE_BUCKET: string;

  /**
   * CDN URL for static assets
   * @example "https://cdn.signpro.com"
   */
  readonly VITE_CDN_URL: string;

  /**
   * Analytics tracking ID
   * @example "UA-XXXXXXXXX-X"
   */
  readonly VITE_ANALYTICS_ID: string;

  /**
   * Sentry DSN for error tracking
   * @example "https://xxxxx@sentry.io/xxxxx"
   */
  readonly VITE_SENTRY_DSN: string;

  /**
   * Feature flags for enabling/disabling features
   * @example "true" | "false"
   */
  readonly VITE_FEATURE_DOCUMENT_SIGNING: string;
  readonly VITE_FEATURE_FILE_CONVERSION: string;
  readonly VITE_FEATURE_TEMPLATE_MARKETPLACE: string;
  readonly VITE_FEATURE_TEAM_COLLABORATION: string;
  readonly VITE_FEATURE_VIDEO_CALLS: string;
  readonly VITE_FEATURE_BATCH_PROCESSING: string;

  /**
   * Security settings
   */
  readonly VITE_SESSION_TIMEOUT: string; // in minutes
  readonly VITE_MAX_FILE_SIZE: string; // in MB
  readonly VITE_MAX_BATCH_FILES: string;
  readonly VITE_ALLOWED_FILE_TYPES: string; // comma-separated list

  /**
   * Performance settings
   */
  readonly VITE_ENABLE_CACHE: string;
  readonly VITE_CACHE_DURATION: string; // in minutes
  readonly VITE_ENABLE_LAZY_LOADING: string;
  readonly VITE_OPTIMIZE_IMAGES: string;

  /**
   * Third-party integrations
   */
  readonly VITE_STRIPE_PUBLIC_KEY: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_MICROSOFT_CLIENT_ID: string;
  readonly VITE_ADOBE_CLIENT_ID: string;

  /**
   * Blockchain configuration
   */
  readonly VITE_BLOCKCHAIN_NETWORK: string;
  readonly VITE_BLOCKCHAIN_RPC_URL: string;
  readonly VITE_SMART_CONTRACT_ADDRESS: string;

  /**
   * AI/ML services
   */
  readonly VITE_AI_API_URL: string;
  readonly VITE_AI_API_KEY: string;
  readonly VITE_OCR_API_URL: string;
  readonly VITE_OCR_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// ============================================
// MODULE DECLARATIONS
// ============================================

// CSS Modules
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Image Assets
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.svg?component' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.svg?url' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

// Fonts
declare module '*.woff' {
  const content: string;
  export default content;
}

declare module '*.woff2' {
  const content: string;
  export default content;
}

declare module '*.ttf' {
  const content: string;
  export default content;
}

declare module '*.eot' {
  const content: string;
  export default content;
}

// Documents
declare module '*.pdf' {
  const content: string;
  export default content;
}

declare module '*.doc' {
  const content: string;
  export default content;
}

declare module '*.docx' {
  const content: string;
  export default content;
}

declare module '*.xls' {
  const content: string;
  export default content;
}

declare module '*.xlsx' {
  const content: string;
  export default content;
}

declare module '*.ppt' {
  const content: string;
  export default content;
}

declare module '*.pptx' {
  const content: string;
  export default content;
}

// Video/Audio
declare module '*.mp4' {
  const content: string;
  export default content;
}

declare module '*.webm' {
  const content: string;
  export default content;
}

declare module '*.ogg' {
  const content: string;
  export default content;
}

declare module '*.mp3' {
  const content: string;
  export default content;
}

declare module '*.wav' {
  const content: string;
  export default content;
}

// Data Files
declare module '*.json' {
  const content: any;
  export default content;
}

declare module '*.csv' {
  const content: string;
  export default content;
}

declare module '*.xml' {
  const content: string;
  export default content;
}

// ============================================
// THIRD-PARTY MODULES
// ============================================

// React Signature Canvas
declare module 'react-signature-canvas' {
  import { Component } from 'react';
  
  export interface SignatureCanvasProps {
    canvasProps?: React.CanvasHTMLAttributes<HTMLCanvasElement>;
    clearOnResize?: boolean;
    velocityFilterWeight?: number;
    minWidth?: number;
    maxWidth?: number;
    dotSize?: number | (() => number);
    penColor?: string;
    backgroundColor?: string;
    throttle?: number;
    onBeginEvent?: (event: MouseEvent | TouchEvent) => void;
    onEndEvent?: (event: MouseEvent | TouchEvent) => void;
  }

  export default class SignatureCanvas extends Component<SignatureCanvasProps> {
    clear(): void;
    isEmpty(): boolean;
    fromDataURL(dataUrl: string, options?: { width?: number; height?: number }): void;
    toDataURL(format?: string, encoderOptions?: number): string;
    fromData(pointGroups: Array<Array<{ x: number; y: number; time: number }>>): void;
    toData(): Array<Array<{ x: number; y: number; time: number }>>;
    getCanvas(): HTMLCanvasElement;
    getTrimmedCanvas(): HTMLCanvasElement;
  }
}

// Lucide React Icons
declare module 'lucide-react' {
  import { SVGProps } from 'react';
  
  export type Icon = React.FC<SVGProps<SVGSVGElement>>;
  
  // Export all icons as individual components
  export const FilePen: Icon;
  export const RefreshCw: Icon;
  export const Store: Icon;
  export const MessageSquare: Icon;
  export const Bell: Icon;
  export const Settings: Icon;
  export const User: Icon;
  export const ChevronDown: Icon;
  export const Search: Icon;
  export const Plus: Icon;
  export const Upload: Icon;
  export const Download: Icon;
  export const Trash2: Icon;
  export const CheckCircle: Icon;
  export const FileText: Icon;
  export const Lock: Icon;
  export const Clock: Icon;
  export const Shield: Icon;
  export const Eye: Icon;
  export const EyeOff: Icon;
  export const History: Icon;
  export const Zap: Icon;
  export const TrendingUp: Icon;
  export const Users: Icon;
  export const Award: Icon;
  export const Filter: Icon;
  export const SortAsc: Icon;
  export const Heart: Icon;
  export const Share2: Icon;
  export const Bookmark: Icon;
  export const Phone: Icon;
  export const Video: Icon;
  export const MoreVertical: Icon;
  export const Smile: Icon;
  export const Paperclip: Icon;
  export const Send: Icon;
  export const Image: Icon;
  export const Activity: Icon;
  export const BarChart3: Icon;
  export const AlertTriangle: Icon;
  export const Info: Icon;
  export const RotateCcw: Icon;
  export const Certificate: Icon;
  export const QrCode: Icon;
  export const Mic: Icon;
  export const MicOff: Icon;
  export const Camera: Icon;
  export const CameraOff: Icon;
  export const ScreenShare: Icon;
  export const StopScreenShare: Icon;
  export const Record: Icon;
  export const PhoneOff: Icon;
  export const VideoOff: Icon;
  export const DollarSign: Icon;
  export const Tag: Icon;
  export const Calendar: Icon;
  export const Star: Icon;
  export const PushPin: Icon;
  export const Database: Icon;
}

// ============================================
// GLOBAL TYPE EXTENSIONS
// ============================================

// Extend Window interface
interface Window {
  // Analytics
  gtag?: (...args: any[]) => void;
  dataLayer?: any[];
  
  // Error tracking
  Sentry?: any;
  
  // Payment processing
  Stripe?: any;
  
  // Document processing
  AdobeDC?: any;
  
  // Blockchain
  ethereum?: any;
  web3?: any;
  
  // File System Access API
  showOpenFilePicker?: (options?: any) => Promise<any[]>;
  showSaveFilePicker?: (options?: any) => Promise<any>;
  showDirectoryPicker?: (options?: any) => Promise<any>;
}

// Extend Navigator interface
interface Navigator {
  // Clipboard API
  clipboard: Clipboard;
  
  // Web Share API
  share?: (data?: ShareData) => Promise<void>;
  canShare?: (data?: ShareData) => boolean;
  
  // Connection information
  connection?: {
    effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
    saveData: boolean;
  };
}

// Extend File interface
interface File {
  // Additional file properties
  webkitRelativePath?: string;
}

// Extend FileList interface
interface FileList {
  // Make FileList iterable
  [Symbol.iterator](): IterableIterator<File>;
}

// ============================================
// CUSTOM UTILITY TYPES
// ============================================

/**
 * Generic API response type
 */
type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  timestamp: string;
};

/**
 * Paginated response type
 */
type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
};

/**
 * File upload progress type
 */
type UploadProgress = {
  loaded: number;
  total: number;
  percentage: number;
};

/**
 * Validation error type
 */
type ValidationError = {
  field: string;
  message: string;
  code: string;
};

/**
 * User permissions type
 */
type UserPermissions = {
  canSign: boolean;
  canConvert: boolean;
  canUpload: boolean;
  canDownload: boolean;
  canShare: boolean;
  canDelete: boolean;
  canManageTeam: boolean;
  canAccessAnalytics: boolean;
};

/**
 * Document metadata type
 */
type DocumentMetadata = {
  title: string;
  description?: string;
  tags: string[];
  category: string;
  size: number;
  format: string;
  pages?: number;
  createdAt: string;
  updatedAt: string;
  author: string;
  version: number;
};

/**
 * Conversion options type
 */
type ConversionOptions = {
  format: string;
  quality: 'low' | 'medium' | 'high';
  preserveMetadata: boolean;
  compress: boolean;
  password?: string;
  pageRange?: {
    start: number;
    end: number;
  };
};

/**
 * Signature data type
 */
type SignatureData = {
  dataUrl: string;
  timestamp: string;
  signerInfo: {
    name: string;
    email: string;
    ipAddress: string;
  };
  location?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

// ============================================
// ENVIRONMENT VALIDATION
// ============================================

/**
 * Validate that required environment variables are set
 */
function validateEnvironment(): void {
  const requiredEnvVars = [
    'VITE_API_URL',
    'VITE_ENCRYPTION_KEY',
    'VITE_JWT_SECRET'
  ];

  const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);
  
  if (missingVars.length > 0) {
    console.warn('Missing required environment variables:', missingVars);
  }
}

// Validate environment on load
validateEnvironment();

// ============================================
// EXPORT GLOBALS
// ============================================

export {
  ApiResponse,
  PaginatedResponse,
  UploadProgress,
  ValidationError,
  UserPermissions,
  DocumentMetadata,
  ConversionOptions,
  SignatureData
};
