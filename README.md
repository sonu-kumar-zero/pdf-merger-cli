# 📎 PDF Merge CLI

A simple command-line tool to merge all PDF files from a folder into a single PDF file using [\`pdf-lib\`](https://github.com/Hopding/pdf-lib).

---

## ✨ Features

- Merges all \`.pdf\` files from a specified folder.
- Sorts files alphabetically before merging.
- Outputs a single merged PDF to the location you choose.
- Built with TypeScript and \`pdf-lib\`.

---

## 🚀 Installation

1. Clone or download this repo:

```bash
git clone https://github.com/your-username/pdf-merge-cli.git
cd pdf-merge-cli
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

4. Link globally (optional, to use as CLI anywhere):

```bash
npm link
```

---

## 🧾 Usage

```bash
pdf-merge-cli <source_folder> <output_file>
```

### 📁 Example

```bash
pdf-merge-cli ./pdf-src ./pdf-dist/merged.pdf
```

- Merges all \`.pdf\` files in \`./pdf-src\` (alphabetically).
- Outputs a single PDF file at \`./pdf-dist/merged.pdf\`.

---

## 🛠 Development

To run without building, use:

```bash
npm run dev ./pdf-src ./pdf-dist/merged.pdf
```

> This uses \`ts-node\` to run the script directly.

---

## 📦 Output

- The tool will create the output directory (if it doesn't exist).
- The merged file will be saved at the specified output path.

---

## ❗ Error Handling

- Shows a message if no PDFs are found.
- Displays a clear error message if merging fails.

---

## 📝 License

MIT

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
