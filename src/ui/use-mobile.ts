import { useState, useEffect } from 'react';

interface MobileDevice {
  type: 'phone' | 'tablet' | 'desktop';
  width: number;
  height: number;
  isTouch: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isWindows: boolean;
  orientation: 'portrait' | 'landscape';
  pixelRatio: number;
}

interface UseMobileReturn {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  device: MobileDevice;
  viewport: {
    width: number;
    height: number;
    isLandscape: boolean;
  };
  breakpoints: {
    xs: boolean;
    sm: boolean;
    md: boolean;
    lg: boolean;
    xl: boolean;
  };
  orientation: 'portrait' | 'landscape';
  pixelRatio: number;
  safeArea: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  features: {
    supportsTouch: boolean;
    supportsVibration: boolean;
    supportsOrientation: boolean;
    supportsFullscreen: boolean;
    supportsPWA: boolean;
  };
  performance: {
    connection: 'slow-2g' | '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
    saveData: boolean;
    effectiveType: string;
  };
}

const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536
};

const SAFE_AREA_DEFAULTS = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
};

export function useMobile(): UseMobileReturn {
  const [device, setDevice] = useState<MobileDevice>({
    type: 'desktop',
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    isTouch: false,
    isIOS: false,
    isAndroid: false,
    isWindows: false,
    orientation: 'portrait',
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1
  });

  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    isLandscape: false
  });

  const [breakpoints, setBreakpoints] = useState({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false
  });

  const [safeArea, setSafeArea] = useState(SAFE_AREA_DEFAULTS);
  const [features, setFeatures] = useState({
    supportsTouch: false,
    supportsVibration: false,
    supportsOrientation: false,
    supportsFullscreen: false,
    supportsPWA: false
  });

  const [performance, setPerformance] = useState({
    connection: 'unknown' as const,
    saveData: false,
    effectiveType: 'unknown'
  });

  // Detect device type and capabilities
  const detectDevice = (): MobileDevice => {
    if (typeof window === 'undefined') return device;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.platform.toLowerCase();
    
    // Device type detection
    let type: 'phone' | 'tablet' | 'desktop' = 'desktop';
    if (width <= BREAKPOINTS.sm) {
      type = 'phone';
    } else if (width <= BREAKPOINTS.md) {
      type = 'tablet';
    }

    // OS detection
    const isIOS = /iphone|ipad|ipod/.test(userAgent) || /mac/.test(platform);
    const isAndroid = /android/.test(userAgent);
    const isWindows = /windows/.test(userAgent);

    // Touch capability detection
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Orientation detection
    const orientation = width > height ? 'landscape' : 'portrait';

    return {
      type,
      width,
      height,
      isTouch,
      isIOS,
      isAndroid,
      isWindows,
      orientation,
      pixelRatio: window.devicePixelRatio || 1
    };
  };

  // Update viewport dimensions
  const updateViewport = () => {
    if (typeof window === 'undefined') return;

    setViewport({
      width: window.innerWidth,
      height: window.innerHeight,
      isLandscape: window.innerWidth > window.innerHeight
    });
  };

  // Update breakpoints based on viewport
  const updateBreakpoints = () => {
    const width = viewport.width;
    
    setBreakpoints({
      xs: width >= BREAKPOINTS.xs && width < BREAKPOINTS.sm,
      sm: width >= BREAKPOINTS.sm && width < BREAKPOINTS.md,
      md: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
      lg: width >= BREAKPOINTS.lg && width < BREAKPOINTS.xl,
      xl: width >= BREAKPOINTS.xl
    });
  };

  // Detect safe area insets (for iOS devices with notches)
  const detectSafeArea = () => {
    if (typeof window === 'undefined') return SAFE_AREA_DEFAULTS;

    // Check for CSS environment variables (iOS safe areas)
    const computedStyle = window.getComputedStyle(document.documentElement);
    
    const safeArea = {
      top: parseInt(computedStyle.getPropertyValue('--sat') || '0'),
      bottom: parseInt(computedStyle.getPropertyValue('--sab') || '0'),
      left: parseInt(computedStyle.getPropertyValue('--sal') || '0'),
      right: parseInt(computedStyle.getPropertyValue('--sar') || '0')
    };

    // Fallback detection for iOS devices
    if (device.isIOS && device.type !== 'desktop') {
      // iPhone X and later have safe areas
      const isNewerIphone = window.screen.height >= 812 && window.devicePixelRatio >= 2;
      
      if (isNewerIphone) {
        safeArea.top = Math.max(safeArea.top, 44); // iPhone notch
        safeArea.bottom = Math.max(safeArea.bottom, 34); // iPhone home indicator
      }
    }

    return safeArea;
  };

  // Detect device features
  const detectFeatures = () => {
    if (typeof window === 'undefined') return features;

    return {
      supportsTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      supportsVibration: 'vibrate' in navigator,
      supportsOrientation: 'orientation' in window || 'onorientationchange' in window,
      supportsFullscreen: document.fullscreenEnabled || 
                         (document as any).webkitFullscreenEnabled ||
                         (document as any).mozFullScreenEnabled ||
                         (document as any).msFullscreenEnabled,
      supportsPWA: 'serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window
    };
  };

  // Detect network performance
  const detectPerformance = () => {
    if (typeof window === 'undefined' || !('connection' in navigator)) {
      return { connection: 'unknown', saveData: false, effectiveType: 'unknown' };
    }

    const connection = (navigator as any).connection;
    
    return {
      connection: connection.effectiveType || 'unknown',
      saveData: connection.saveData || false,
      effectiveType: connection.effectiveType || 'unknown'
    };
  };

  // Handle window resize
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      updateViewport();
      setDevice(detectDevice());
    };

    const handleOrientationChange = () => {
      setTimeout(() => {
        handleResize();
      }, 100);
    };

    // Initial detection
    handleResize();
    updateBreakpoints();
    setSafeArea(detectSafeArea());
    setFeatures(detectFeatures());
    setPerformance(detectPerformance());

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Monitor connection changes
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection.addEventListener('change', () => {
        setPerformance(detectPerformance());
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        connection.removeEventListener('change', () => {
          setPerformance(detectPerformance());
        });
      }
    };
  }, []);

  // Update breakpoints when viewport changes
  useEffect(() => {
    updateBreakpoints();
  }, [viewport]);

  // Update safe area when device changes
  useEffect(() => {
    setSafeArea(detectSafeArea());
  }, [device]);

  // Derived values
  const isMobile = device.type === 'phone';
  const isTablet = device.type === 'tablet';
  const isDesktop = device.type === 'desktop';
  const isTouch = device.isTouch;
  const orientation = device.orientation;

  return {
    isMobile,
    isTablet,
    isDesktop,
    isTouch,
    device,
    viewport,
    breakpoints,
    orientation,
    pixelRatio: device.pixelRatio,
    safeArea,
    features,
    performance
  };
}

// Utility hooks for specific mobile features
export function useTouch() {
  const { isTouch } = useMobile();
  return isTouch;
}

export function useOrientation() {
  const { orientation } = useMobile();
  return orientation;
}

export function useViewport() {
  const { viewport } = useMobile();
  return viewport;
}

export function useBreakpoints() {
  const { breakpoints } = useMobile();
  return breakpoints;
}

export function useSafeArea() {
  const { safeArea } = useMobile();
  return safeArea;
}

export function useNetwork() {
  const { performance } = useMobile();
  return performance;
}

export function useVibration() {
  const vibrate = (pattern: number | number[]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const vibrateLight = () => vibrate(50);
  const vibrateMedium = () => vibrate(100);
  const vibrateHeavy = () => vibrate([100, 50, 100]);

  return {
    vibrate,
    vibrateLight,
    vibrateMedium,
    vibrateHeavy
  };
}

export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { features } = useMobile();

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const enterFullscreen = async (element: HTMLElement = document.documentElement) => {
    if (!features.supportsFullscreen) return;

    try {
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        await (element as any).webkitRequestFullscreen();
      } else if ((element as any).mozRequestFullScreen) {
        await (element as any).mozRequestFullScreen();
      } else if ((element as any).msRequestFullscreen) {
        await (element as any).msRequestFullscreen();
      }
    } catch (error) {
      console.error('Failed to enter fullscreen:', error);
    }
  };

  const exitFullscreen = async () => {
    if (!features.supportsFullscreen) return;

    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        await (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen();
      }
    } catch (error) {
      console.error('Failed to exit fullscreen:', error);
    }
  };

  const toggleFullscreen = async (element?: HTMLElement) => {
    if (isFullscreen) {
      await exitFullscreen();
    } else {
      await enterFullscreen(element);
    }
  };

  return {
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen
  };
}

export function usePWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const { features } = useMobile();

  useEffect(() => {
    if (!features.supportsPWA) return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if already installed
    if ('getInstalledRelatedApps' in navigator) {
      (navigator as any).getInstalledRelatedApps().then((apps: any[]) => {
        setIsInstalled(apps.length > 0);
      });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [features.supportsPWA]);

  const installPWA = async () => {
    if (!deferredPrompt) return false;

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      return outcome === 'accepted';
    } catch (error) {
      console.error('PWA installation failed:', error);
      return false;
    }
  };

  return {
    isInstallable: !!deferredPrompt,
    isInstalled,
    installPWA
  };
}

export default useMobile;
