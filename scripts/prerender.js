import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");
const indexPath = path.resolve(distDir, "index.html");
const serverEntryPath = path.resolve(distDir, "server/entry-server.js");

async function prerender() {
  if (!fs.existsSync(indexPath)) {
    throw new Error(
      `dist/index.html not found at: ${indexPath}. Make sure client build completed first.`,
    );
  }
  if (!fs.existsSync(serverEntryPath)) {
    throw new Error(
      `Server entry not found at: ${serverEntryPath}. Make sure server build completed.`,
    );
  }

  const template = fs.readFileSync(indexPath, "utf-8");

  // Convert Windows path to file:// URL for dynamic import
  const serverEntryUrl = pathToFileURL(serverEntryPath).href;
  const { render } = await import(serverEntryUrl);

  const appHtml = render();

  let finalHtml = template;
  if (finalHtml.includes("<!--app-html-->")) {
    finalHtml = finalHtml.replace("<!--app-html-->", appHtml);
  } else if (finalHtml.includes('<div id="root"></div>')) {
    finalHtml = finalHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`,
    );
  } else {
    finalHtml = finalHtml.replace(
      /<div id="root">[\s\S]*?<\/div>/,
      `<div id="root">${appHtml}</div>`,
    );
  }

  fs.writeFileSync(indexPath, finalHtml, "utf-8");
  console.log(
    "✓ Successfully prerendered static SSG markup into dist/index.html",
  );

  // print the colored output of files and their sizes..
  const files = fs.readdirSync(distDir);

  const colors = {
    js: "\x1b[33m", // yellow
    css: "\x1b[34m", // blue
    html: "\x1b[31m", // red
  };

  function printFiles(files, dir = distDir) {
    files.forEach((file) => {
      const ext = file.split(".")[1];

      const filePath = path.join(dir, file);

      if (!fs.existsSync(filePath)) {
        return;
      }

      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        const files = fs.readdirSync(filePath);
        printFiles(files, filePath);
      }

      if (["js", "css", "html"].includes(ext)) {
        const kbSize = (stats.size / 1024).toFixed(2);

        const reset = "\x1b[0m";
        const color = colors[ext] ?? "\x1b[37m";

        console.log(`${color}${file}${reset} ${kbSize} kb`);
      }
    });
  }

  // Clean up dist/server
  try {
    fs.rmSync(path.resolve(distDir, "server"), {
      recursive: true,
      force: true,
    });
  } catch {
    // Ignore cleanup errors
  }

  printFiles(files);
}

prerender().catch((err) => {
  console.error("SSG Prerendering error:", err);
  process.exit(1);
});
