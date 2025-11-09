import { SpacingConfig } from "@/types";

export type PageSize = "letter" | "a4";

interface PageDimensions {
  width: string;
  height: string;
  widthMm: number;
  heightMm: number;
}

// Page size definitions
export const PAGE_SIZES: Record<PageSize, PageDimensions> = {
  letter: {
    width: "8.5in",
    height: "11in",
    widthMm: 216,
    heightMm: 279,
  },
  a4: {
    width: "210mm",
    height: "297mm",
    widthMm: 210,
    heightMm: 297,
  },
};

/**
 * Generates base CSS styles for resume templates
 * Includes page sizing, spacing configuration, and reset styles
 */
export function generateBaseStyles(
  spacingConfig: SpacingConfig,
  pageSize: PageSize = "letter"
): string {
  const dimensions = PAGE_SIZES[pageSize];

  return `
    /* CSS Reset */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    /* Base Page Container */
    .resume-container {
      width: ${dimensions.width};
      height: ${dimensions.height};
      background: white;
      color: #1a1a1a;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 11pt;
      line-height: ${spacingConfig.lineHeight};
      padding: ${spacingConfig.pageMargin}in;
      height: 100%;
      overflow: auto;
      position: relative;
    }

    /* Spacing Variables (as CSS custom properties) */
    :root {
      --line-height: ${spacingConfig.lineHeight};
      --section-spacing: ${spacingConfig.sectionSpacing}rem;
      --item-spacing: ${spacingConfig.itemSpacing}rem;
      --page-margin: ${spacingConfig.pageMargin}in;
    }

    /* Typography Base */
    h1, h2, h3, h4, h5, h6 {
      font-weight: 600;
      line-height: 1.2;
    }

    p {
      line-height: var(--line-height);
    }

    /* List Styles */
    ul, ol {
      margin: 0;
      padding-left: 1.2rem;
    }

    li {
      line-height: var(--line-height);
      margin-bottom: 0.2rem;
    }

    /* Link Styles */
    a {
      color: inherit;
      text-decoration: none;
    }

    /* Print Optimization */
    @media print {
      .resume-container {
        width: ${dimensions.width};
        height: ${dimensions.height};
        padding: ${spacingConfig.pageMargin}in;
        margin: 0;
        page-break-after: always;
      }

      * {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }
    }

    /* Page Break Control */
    .page-break-avoid {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .page-break-before {
      page-break-before: always;
      break-before: page;
    }

    .page-break-after {
      page-break-after: always;
      break-after: page;
    }
  `;
}

/**
 * Generates spacing utility classes
 */
export function generateSpacingUtilities(spacingConfig: SpacingConfig): string {
  return `
    /* Spacing Utilities */
    .section-spacing {
      margin-bottom: ${spacingConfig.sectionSpacing}rem;
    }

    .item-spacing {
      margin-bottom: ${spacingConfig.itemSpacing}rem;
    }

    .section-spacing-top {
      margin-top: ${spacingConfig.sectionSpacing}rem;
    }

    .item-spacing-top {
      margin-top: ${spacingConfig.itemSpacing}rem;
    }

    .section-spacing-double {
      margin-bottom: ${spacingConfig.sectionSpacing * 2}rem;
    }

    .section-spacing-half {
      margin-bottom: ${spacingConfig.sectionSpacing * 0.5}rem;
    }
  `;
}

/**
 * Generates page size specific styles
 */
export function generatePageStyles(pageSize: PageSize): string {
  const dimensions = PAGE_SIZES[pageSize];
  
  return `
    /* Page Size: ${pageSize.toUpperCase()} (${dimensions.width} × ${dimensions.height}) */
    .page-container {
      width: ${dimensions.width};
      min-height: ${dimensions.height};
      max-height: ${dimensions.height};
    }

    /* Responsive font sizing for different page sizes */
    ${pageSize === "a4" ? `
      .resume-container {
        font-size: 10.5pt;
      }
    ` : ""}
  `;
}

/**
 * Complete base styles combining all utilities
 */
export function getCompleteBaseStyles(
  spacingConfig: SpacingConfig,
  pageSize: PageSize = "letter"
): string {
  return `
    ${generateBaseStyles(spacingConfig, pageSize)}
    ${generateSpacingUtilities(spacingConfig)}
    ${generatePageStyles(pageSize)}
  `;
}

/**
 * Helper to get page dimensions for React inline styles
 */
export function getPageDimensions(pageSize: PageSize) {
  return PAGE_SIZES[pageSize];
}

