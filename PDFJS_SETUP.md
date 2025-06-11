# PDF.js Setup for Vite

## Issue
The original error was:
```
Uncaught SyntaxError: The requested module '/node_modules/.vite/deps/pdfjs-dist_build_pdf__worker__entry.js?v=566bf766' does not provide an export named 'default'
```

## Root Cause
This error occurs because Vite handles ES modules differently than traditional bundlers, and the PDF.js worker import was not compatible with Vite's module resolution.

## Solution
We resolved this by using a CDN-based worker setup instead of trying to import the worker file directly:

```typescript
// Getting pdfjs to work with Vite
import * as pdfjs from "pdfjs-dist";

// Set up the worker using CDN (most reliable approach)
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
```

## Alternative Solutions Tried

1. **Direct Worker Import**: `import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";` - Failed due to Vite module resolution
2. **URL Import**: `import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.js?url";` - Failed due to export issues
3. **Local File**: Copying worker to public directory and referencing `/pdf.worker.min.js` - Works but requires manual file management
4. **CDN Approach**: Using CDN URL - **Most reliable and recommended**

## Benefits of CDN Approach

- ✅ No build configuration needed
- ✅ No manual file copying required
- ✅ Automatic version matching with `pdfjs.version`
- ✅ Works in both development and production
- ✅ Reliable external hosting

## Vite Configuration
Added optimizations to `vite.config.ts`:

```typescript
optimizeDeps: {
  include: ['pdfjs-dist'],
},
```

This ensures PDF.js is properly pre-bundled by Vite for better performance.

## Testing
The setup has been tested and confirmed working with:
- Development server (`npm run dev`)
- Production build (`npm run build`)
- PDF parsing functionality

## Usage
The PDF parsing functionality is now ready to use in the resume import feature without any additional setup required. 