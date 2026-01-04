/**
 * PostCSS Configuration
 * SignPro Enterprise - Document Management Platform
 * 
 * This configuration handles CSS processing, optimization, and compatibility
 * for the enterprise document management system.
 */

import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import cssnano from 'cssnano';
import postcssPresetEnv from 'postcss-preset-env';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import postcssCustomMedia from 'postcss-custom-media';
import postcssCustomProperties from 'postcss-custom-properties';
import postcssColorFunction from 'postcss-color-function';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import postcssNormalize from 'postcss-normalize';
import postcssDiscardComments from 'postcss-discard-comments';
import postcssMergeRules from 'postcss-merge-rules';
import postcssSortMediaQueries from 'postcss-sort-media-queries';
import postcssAssets from 'postcss-assets';
import postcssSprites from 'postcss-sprites';
import postcssCriticalCSS from 'postcss-critical-css';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * PostCSS Configuration Object
 */
export default {
  plugins: [
    // Import CSS files and resolve @import statements
    postcssImport({
      path: [
        join(__dirname, 'src'),
        join(__dirname, 'src/styles'),
        join(__dirname, 'node_modules')
      ],
      filter: (url) => !url.includes('node_modules') || url.includes('normalize'),
      plugins: [
        postcssDiscardComments({
          removeAll: true
        })
      ]
    }),

    // Enable nested CSS syntax
    postcssNested({
      bubble: ['screen', 'layer'],
      unwrap: ['layer'],
      preserveEmpty: true
    }),

    // Tailwind CSS integration
    tailwindcss({
      config: join(__dirname, 'tailwind.config.js'),
      content: [
        'index.html',
        'src/**/*.{js,ts,jsx,tsx}',
        'src/components/**/*.{js,ts,jsx,tsx}',
        'src/pages/**/*.{js,ts,jsx,tsx}'
      ]
    }),

    // Modern CSS features and browser compatibility
    postcssPresetEnv({
      stage: 3,
      features: {
        'nesting-rules': false, // Handled by postcss-nested
        'custom-properties': true,
        'custom-media-queries': true,
        'media-query-ranges': true,
        'color-function': true,
        'lab-function': true,
        'logical-properties': true,
        'case-insensitive-attributes': true,
        'matches-pseudo-class': true,
        'not-pseudo-class': true,
        'any-link-pseudo-class': true,
        'rebeccapurple-color': true,
        'hexadecimal-alpha-notation': true,
        'color-mod-function': true,
        'gap-properties': true,
        'overflow-property': true
      },
      browsers: [
        '> 1%',
        'last 2 versions',
        'Firefox ESR',
        'not dead',
        'not ie 11'
      ],
      insertBefore: {},
      insertAfter: {},
      autoprefixer: false // We'll use autoprefixer separately
    }),

    // Custom media queries
    postcssCustomMedia({
      importFrom: [
        {
          customMedia: {
            '--mobile': '(max-width: 640px)',
            '--tablet': '(min-width: 641px) and (max-width: 1024px)',
            '--desktop': '(min-width: 1025px)',
            '--large-desktop': '(min-width: 1440px)',
            '--ultra-wide': '(min-width: 1920px)',
            '--retina': '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
            '--dark-mode': '(prefers-color-scheme: dark)',
            '--light-mode': '(prefers-color-scheme: light)',
            '--high-contrast': '(prefers-contrast: high)',
            '--reduced-motion': '(prefers-reduced-motion: reduce)'
          }
        }
      ]
    }),

    // Custom properties (CSS variables) with fallbacks
    postcssCustomProperties({
      preserve: true,
      importFrom: [
        join(__dirname, 'src/styles/variables.css'),
        join(__dirname, 'src/styles/colors.css'),
        join(__dirname, 'src/styles/theme.css')
      ],
      exportTo: join(__dirname, 'dist/variables.json')
    }),

    // Color functions
    postcssColorFunction(),

    // Flexbox bug fixes for older browsers
    postcssFlexbugsFixes(),

    // CSS normalization
    postcssNormalize({
      browsers: [
        '> 1%',
        'last 2 versions',
        'Firefox ESR',
        'not dead'
      ],
      forceImport: true,
      allowDuplicates: false
    }),

    // Asset handling
    postcssAssets({
      basePath: join(__dirname, 'src'),
      baseUrl: '/assets/',
      loadPaths: [
        join(__dirname, 'src/assets'),
        join(__dirname, 'src/assets/images'),
        join(__dirname, 'src/assets/fonts'),
        join(__dirname, 'src/assets/icons')
      ],
      relative: true,
      cachebuster: true
    }),

    // Sprite generation (for icons)
    postcssSprites({
      stylesheetPath: join(__dirname, 'src/styles'),
      spritePath: join(__dirname, 'src/assets/sprites'),
      retina: true,
      spritesmith: {
        padding: 4,
        algorithm: 'binary-tree'
      },
      filterBy: (image) => {
        // Only process icons in specific folders
        if (image.url.includes('/icons/') || image.url.includes('/svg/')) {
          return Promise.resolve();
        }
        return Promise.reject();
      },
      groupBy: (image) => {
        // Group sprites by folder
        const match = image.url.match(/\/([^/]+)\/[^/]+\.svg$/);
        return match ? Promise.resolve(match[1]) : Promise.resolve('default');
      }
    }),

    // Autoprefixer (after all other transformations)
    autoprefixer({
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'Firefox ESR',
        'not dead',
        'not ie 11'
      ],
      grid: true,
      flexbox: 'no-2009',
      remove: true,
      add: true,
      supports: true
    }),

    // Media query optimization (development only)
    ...(process.env.NODE_ENV === 'production' ? [
      // Sort media queries for better gzip compression
      postcssSortMediaQueries({
        sort: 'mobile-first'
      }),

      // Merge duplicate rules
      postcssMergeRules({
        vendors: true,
        removeAll: true,
        removeDuplicatedProperties: true,
        removeDuplicatedValues: true
      }),

      // Critical CSS extraction
      postcssCriticalCSS({
        criticalSelector: '.critical',
        preserve: false,
        outputPath: join(__dirname, 'dist/css/critical'),
        outputDest: (file) => {
          return file.replace('.css', '-critical.css');
        },
        minify: true
      }),

      // CSS optimization and minification
      cssnano({
        preset: ['default', {
          // Safe optimizations only
          autoprefixer: false, // Already handled by autoprefixer
          convertValues: {
            length: false // Don't convert rem to px
          },
          discardComments: {
            removeAll: true,
            removeAllButFirst: false
          },
          discardDuplicates: true,
          discardEmpty: true,
          discardUnused: true,
          mergeIdents: false, // Safe for keyframes
          mergeLonghand: true,
          mergeRules: true,
          minifyFontValues: true,
          minifyGradients: true,
          minifySelectors: true,
          normalizeCharset: true,
          normalizeDisplayValues: true,
          normalizePositions: true,
          normalizeRepeatStyle: true,
          normalizeString: true,
          normalizeTimingFunctions: true,
          normalizeUnicode: true,
          normalizeUrl: true,
          normalizeWhitespace: true,
          reduceIdents: false, // Safe for keyframes
          svgo: true,
          uniqueSelectors: true,
          zindex: false // Don't optimize z-index for safety
        }]
      })
    ] : []),

    // Remove comments in production
    ...(process.env.NODE_ENV === 'production' ? [
      postcssDiscardComments({
        removeAll: true,
        removeAllButFirst: false,
        remove: function(comment) {
          // Keep important comments
          return !comment.includes('!important') && 
                 !comment.includes('critical') &&
                 !comment.includes('license');
        }
      })
    ] : [])
  ],

  // Source map configuration
  map: process.env.NODE_ENV === 'development' ? {
    inline: false,
    annotation: true,
    sourcesContent: true
  } : false,

  // Parser configuration
  parser: false, // Use default parser
  stringifier: false, // Use default stringifier
  syntax: false // Use default syntax

};

/**
 * PostCSS Configuration for Different Environments
 */
export const development = {
  ...postcssConfig,
  plugins: postcssConfig.plugins.filter(plugin => 
    ![cssnano, postcssDiscardComments, postcssCriticalCSS, postcssSortMediaQueries, postcssMergeRules]
      .some(p => plugin === p || (typeof plugin === 'object' && plugin.postcssPlugin === p.postcssPlugin))
  )
};

export const production = {
  ...postcssConfig,
  plugins: postcssConfig.plugins
};

export const testing = {
  ...postcssConfig,
  plugins: postcssConfig.plugins.filter(plugin =>
    ![cssnano, postcssDiscardComments, postcssCriticalCSS, postcssSprites]
      .some(p => plugin === p || (typeof plugin === 'object' && plugin.postcssPlugin === p.postcssPlugin))
  )
};

/**
 * Helper function to get PostCSS config for current environment
 */
export function getPostCssConfig() {
  const nodeEnv = process.env.NODE_ENV || 'development';
  
  switch (nodeEnv) {
    case 'production':
      return production;
    case 'testing':
    case 'test':
      return testing;
    case 'development':
    default:
      return development;
  }
}

// Export default config for Vite
export default getPostCssConfig();
