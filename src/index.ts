#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";
import { PDFDocument } from "pdf-lib";

// const srcDir = path.join(__dirname, "pdf-src");
// const distDir = path.join(__dirname, "pdf-dist");
// const outputPath = path.join(distDir, "merged.pdf");

async function mergePDFs(srcDir: string, outputPath: string): Promise<void> {
  try {
    const files = await fs.readdir(srcDir);
    const pdfFiles = files
      .filter((file) => file.toLowerCase().endsWith(".pdf"))
      .sort();

    if (pdfFiles.length === 0) {
      console.log("No PDF files found in pdf-src folder.");
      return;
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of pdfFiles) {
      const filePath = path.join(srcDir, file);
      const pdfBytes = await fs.readFile(filePath);
      const pdf = await PDFDocument.load(pdfBytes);

      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));

      console.log(`Added ${file}`);
    }

    const mergedBytes = await mergedPdf.save();
    await fs.ensureDir(path.dirname(outputPath));
    await fs.writeFile(outputPath, mergedBytes);

    console.log(`✅ Merged PDF saved to ${outputPath}`);
  } catch (error) {
    console.error("❌ Error merging PDFs:", error);
  }
}

// mergePDFs();

// Get arguments from CLI
const [, , src, out] = process.argv;

if (!src || !out) {
  console.error("Usage: pdf-merge-cli <source_folder> <output_file>");
  process.exit(1);
}

mergePDFs(path.resolve(src), path.resolve(out));
