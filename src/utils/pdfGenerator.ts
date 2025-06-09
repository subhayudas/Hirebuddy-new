import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface ContactInfo {
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

interface PDFOptions {
  filename?: string;
  quality?: number;
  scale?: number;
  addLinks?: boolean;
  contactInfo?: ContactInfo;
}

export class EnhancedPDFGenerator {
  private static readonly DEFAULT_OPTIONS: PDFOptions = {
    quality: 0.95,
    scale: 2, // Reduced scale for better performance while maintaining quality
    addLinks: true,
    filename: 'Resume.pdf'
  };

  /**
   * Generate high-quality PDF with clickable links
   */
  static async generatePDF(element: HTMLElement, options: PDFOptions = {}): Promise<void> {
    const opts = { ...this.DEFAULT_OPTIONS, ...options };
    
    try {
      // Step 1: Prepare element for PDF generation
      const preparedElement = await this.prepareElementForPDF(element);
      
      // Step 2: Generate high-quality canvas
      const canvas = await this.generateHighQualityCanvas(preparedElement, opts.scale!);
      
      // Step 3: Create PDF with proper dimensions (no extra spacing)
      const pdf = await this.createOptimizedPDFFromCanvas(canvas, opts.quality!);
      
      // Step 4: Add clickable links if enabled
      if (opts.addLinks && opts.contactInfo) {
        await this.addClickableLinks(pdf, preparedElement, opts.contactInfo, canvas);
      }
      
      // Step 5: Save the PDF
      pdf.save(opts.filename!);
      
      // Cleanup
      this.cleanupElement(preparedElement, element);
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      throw new Error('Failed to generate PDF. Please try again.');
    }
  }

  /**
   * Prepare element for PDF generation by optimizing styles
   */
  private static async prepareElementForPDF(element: HTMLElement): Promise<HTMLElement> {
    // Clone the element to avoid modifying the original
    const clonedElement = element.cloneNode(true) as HTMLElement;
    
    // Apply PDF-specific styles for optimal A4 layout
    clonedElement.style.width = '210mm'; // A4 width
    clonedElement.style.minHeight = '297mm'; // A4 height
    clonedElement.style.padding = '15mm'; // Reduced padding for more content space
    clonedElement.style.margin = '0'; // Remove any margins
    clonedElement.style.boxSizing = 'border-box';
    clonedElement.style.backgroundColor = '#ffffff';
    clonedElement.style.color = '#000000';
    clonedElement.style.fontSize = '11px'; // Slightly smaller for better fit
    clonedElement.style.lineHeight = '1.4';
    clonedElement.style.fontFamily = 'Arial, sans-serif';
    clonedElement.style.position = 'relative';
    
    // Optimize all child elements for PDF
    const allElements = clonedElement.querySelectorAll('*');
    allElements.forEach((el: Element) => {
      const htmlEl = el as HTMLElement;
      if (htmlEl.style) {
        // Fix icon alignment issues
        if (htmlEl.classList.contains('lucide') || htmlEl.tagName.toLowerCase() === 'svg') {
          htmlEl.style.verticalAlign = 'middle';
          htmlEl.style.display = 'inline-block';
          htmlEl.style.marginRight = '4px';
        }
        
        // Ensure proper text alignment with icons
        if (htmlEl.classList.contains('flex') && htmlEl.classList.contains('items-center')) {
          htmlEl.style.display = 'flex';
          htmlEl.style.alignItems = 'center';
          htmlEl.style.gap = '4px';
        }
        
        // Handle text colors for better PDF readability
        const computedStyle = window.getComputedStyle(htmlEl);
        if (computedStyle.color && computedStyle.color !== 'rgb(0, 0, 0)') {
          const isLightColor = this.isLightColor(computedStyle.color);
          htmlEl.style.color = isLightColor ? '#666666' : '#000000';
        }
        
        // Remove background colors for cleaner PDF
        if (computedStyle.backgroundColor && computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)') {
          htmlEl.style.backgroundColor = 'transparent';
        }
        
        // Ensure borders are visible
        if (computedStyle.borderColor) {
          htmlEl.style.borderColor = '#cccccc';
        }
        
        // Optimize font rendering
        (htmlEl.style as any).webkitFontSmoothing = 'antialiased';
        (htmlEl.style as any).mozOsxFontSmoothing = 'grayscale';
        
        // Remove shadows and other effects that don't translate well to PDF
        htmlEl.style.boxShadow = 'none';
        htmlEl.style.textShadow = 'none';
      }
    });
    
    // Temporarily add to DOM for accurate rendering
    clonedElement.style.position = 'absolute';
    clonedElement.style.left = '-9999px';
    clonedElement.style.top = '0';
    clonedElement.style.zIndex = '-1';
    document.body.appendChild(clonedElement);
    
    // Wait for fonts and images to load
    await this.waitForContent(clonedElement);
    
    return clonedElement;
  }

  /**
   * Generate high-quality canvas from element
   */
  private static async generateHighQualityCanvas(element: HTMLElement, scale: number): Promise<HTMLCanvasElement> {
    return await html2canvas(element, {
      scale: scale,
      useCORS: true,
      allowTaint: false,
      logging: false,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      imageTimeout: 15000,
      removeContainer: false,
      // Ensure proper handling of fonts
      onclone: (clonedDoc) => {
        // Ensure all fonts are loaded in the cloned document
        const clonedElement = clonedDoc.querySelector('#resume-content');
        if (clonedElement) {
          (clonedElement as HTMLElement).style.fontFamily = 'Arial, sans-serif';
        }
      }
    });
  }

  /**
   * Create optimized PDF from canvas with no extra spacing
   */
  private static async createOptimizedPDFFromCanvas(canvas: HTMLCanvasElement, quality: number): Promise<jsPDF> {
    const imgData = canvas.toDataURL('image/jpeg', quality);
    
    // A4 dimensions in mm
    const pdfWidth = 210;
    const pdfHeight = 297;
    
    // Calculate optimal dimensions to fill the page without extra spacing
    const canvasAspectRatio = canvas.height / canvas.width;
    
    let imgWidth = pdfWidth;
    let imgHeight = pdfWidth * canvasAspectRatio;
    
    // If the image is taller than A4, scale it to fit height
    if (imgHeight > pdfHeight) {
      imgHeight = pdfHeight;
      imgWidth = pdfHeight / canvasAspectRatio;
    }
    
    // No centering - start from top-left with minimal margins
    const xOffset = 0;
    const yOffset = 0;
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
      precision: 2
    });
    
    // Add image to fill the entire page
    pdf.addImage(imgData, 'JPEG', xOffset, yOffset, imgWidth, imgHeight, undefined, 'FAST');
    
    return pdf;
  }

  /**
   * Add clickable links to PDF with improved accuracy
   */
  private static async addClickableLinks(
    pdf: jsPDF, 
    element: HTMLElement, 
    contactInfo: ContactInfo,
    canvas: HTMLCanvasElement
  ): Promise<void> {
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    
    // Calculate scale factors from canvas to PDF
    const scaleX = pdfWidth / canvas.width;
    const scaleY = pdfHeight / canvas.height;
    
    // Find all clickable elements
    const linkElements = element.querySelectorAll('a, [data-link], [data-link-type]');
    
    linkElements.forEach((linkEl: Element) => {
      const htmlEl = linkEl as HTMLElement;
      const rect = htmlEl.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      
      // Calculate position relative to the element
      const relativeX = (rect.left - elementRect.left) * scaleX;
      const relativeY = (rect.top - elementRect.top) * scaleY;
      const width = rect.width * scaleX;
      const height = rect.height * scaleY;
      
      // Determine the URL
      let url = '';
      const href = htmlEl.getAttribute('href') || htmlEl.getAttribute('data-link') || '';
      const linkType = htmlEl.getAttribute('data-link-type') || '';
      const text = htmlEl.textContent?.toLowerCase() || '';
      
      if (href) {
        url = href;
      } else {
        // Determine URL based on link type or content
        switch (linkType) {
          case 'email':
            url = contactInfo.email ? `mailto:${contactInfo.email}` : '';
            break;
          case 'phone':
            url = contactInfo.phone ? `tel:${contactInfo.phone}` : '';
            break;
          case 'website':
            if (contactInfo.website) {
              url = contactInfo.website.startsWith('http') ? contactInfo.website : `https://${contactInfo.website}`;
            }
            break;
          case 'linkedin':
            if (contactInfo.linkedin) {
              url = contactInfo.linkedin.startsWith('http') ? contactInfo.linkedin : `https://linkedin.com/in/${contactInfo.linkedin}`;
            }
            break;
          case 'github':
            if (contactInfo.github) {
              url = contactInfo.github.startsWith('http') ? contactInfo.github : `https://github.com/${contactInfo.github}`;
            }
            break;
          default:
            // Auto-detect based on text content
            if (text.includes('@') && contactInfo.email) {
              url = `mailto:${contactInfo.email}`;
            } else if (text.includes('linkedin') && contactInfo.linkedin) {
              url = contactInfo.linkedin.startsWith('http') ? contactInfo.linkedin : `https://linkedin.com/in/${contactInfo.linkedin}`;
            } else if (text.includes('github') && contactInfo.github) {
              url = contactInfo.github.startsWith('http') ? contactInfo.github : `https://github.com/${contactInfo.github}`;
            } else if (contactInfo.website && (text.includes('website') || text.includes('portfolio'))) {
              url = contactInfo.website.startsWith('http') ? contactInfo.website : `https://${contactInfo.website}`;
            }
        }
      }
      
      // Add clickable link to PDF
      if (url && relativeX >= 0 && relativeY >= 0 && width > 0 && height > 0) {
        pdf.link(relativeX, relativeY, width, height, { url });
      }
    });
  }

  /**
   * Add automatic links for email addresses, phone numbers, etc.
   */
  private static addAutomaticLinks(
    pdf: jsPDF,
    element: HTMLElement,
    contactInfo: ContactInfo,
    scaleX: number,
    scaleY: number
  ): void {
    const textNodes = this.getTextNodes(element);
    
    textNodes.forEach(node => {
      const text = node.textContent || '';
      const parent = node.parentElement;
      
      if (!parent) return;
      
      // Email detection
      if (contactInfo.email && text.includes(contactInfo.email)) {
        const rect = parent.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        
        pdf.link(
          (rect.left - elementRect.left) * scaleX,
          (rect.top - elementRect.top) * scaleY,
          rect.width * scaleX,
          rect.height * scaleY,
          { url: `mailto:${contactInfo.email}` }
        );
      }
      
      // Phone detection
      if (contactInfo.phone && text.includes(contactInfo.phone)) {
        const rect = parent.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        
        pdf.link(
          (rect.left - elementRect.left) * scaleX,
          (rect.top - elementRect.top) * scaleY,
          rect.width * scaleX,
          rect.height * scaleY,
          { url: `tel:${contactInfo.phone}` }
        );
      }
    });
  }

  /**
   * Get all text nodes from an element
   */
  private static getTextNodes(element: HTMLElement): Text[] {
    const textNodes: Text[] = [];
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null
    );
    
    let node;
    while (node = walker.nextNode()) {
      if (node.textContent && node.textContent.trim()) {
        textNodes.push(node as Text);
      }
    }
    
    return textNodes;
  }

  /**
   * Wait for content to load (fonts, images, etc.)
   */
  private static async waitForContent(element: HTMLElement): Promise<void> {
    // Wait for fonts to load
    if (document.fonts) {
      await document.fonts.ready;
    }
    
    // Wait for images to load
    const images = element.querySelectorAll('img');
    const imagePromises = Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = () => resolve(undefined);
        img.onerror = () => resolve(undefined);
      });
    });
    
    await Promise.all(imagePromises);
    
    // Small delay to ensure everything is rendered
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  /**
   * Check if a color is light
   */
  private static isLightColor(color: string): boolean {
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length < 3) return false;
    
    const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
    return brightness > 128;
  }

  /**
   * Clean up the cloned element
   */
  private static cleanupElement(clonedElement: HTMLElement, originalElement: HTMLElement): void {
    if (clonedElement.parentNode) {
      clonedElement.parentNode.removeChild(clonedElement);
    }
  }
}

// Convenience function for simple PDF generation
export const generateResumePDF = async (
  element: HTMLElement,
  contactInfo: ContactInfo,
  filename?: string
): Promise<void> => {
  return EnhancedPDFGenerator.generatePDF(element, {
    filename: filename || 'Resume.pdf',
    contactInfo,
    quality: 0.95,
    scale: 2,
    addLinks: true
  });
}; 