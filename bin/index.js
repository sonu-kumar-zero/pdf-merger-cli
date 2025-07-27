#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const pdf_lib_1 = require("pdf-lib");
// const srcDir = path.join(__dirname, "pdf-src");
// const distDir = path.join(__dirname, "pdf-dist");
// const outputPath = path.join(distDir, "merged.pdf");
function mergePDFs(srcDir, outputPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const files = yield fs_extra_1.default.readdir(srcDir);
            const pdfFiles = files
                .filter((file) => file.toLowerCase().endsWith(".pdf"))
                .sort();
            if (pdfFiles.length === 0) {
                console.log("No PDF files found in pdf-src folder.");
                return;
            }
            const mergedPdf = yield pdf_lib_1.PDFDocument.create();
            for (const file of pdfFiles) {
                const filePath = path_1.default.join(srcDir, file);
                const pdfBytes = yield fs_extra_1.default.readFile(filePath);
                const pdf = yield pdf_lib_1.PDFDocument.load(pdfBytes);
                const copiedPages = yield mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
                console.log(`Added ${file}`);
            }
            const mergedBytes = yield mergedPdf.save();
            yield fs_extra_1.default.ensureDir(path_1.default.dirname(outputPath));
            yield fs_extra_1.default.writeFile(outputPath, mergedBytes);
            console.log(`✅ Merged PDF saved to ${outputPath}`);
        }
        catch (error) {
            console.error("❌ Error merging PDFs:", error);
        }
    });
}
// mergePDFs();
// Get arguments from CLI
const [, , src, out] = process.argv;
if (!src || !out) {
    console.error("Usage: pdf-merge-cli <source_folder> <output_file>");
    process.exit(1);
}
mergePDFs(path_1.default.resolve(src), path_1.default.resolve(out));
