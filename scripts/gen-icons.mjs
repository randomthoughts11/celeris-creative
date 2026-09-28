// Regenerates raster icons from src/app/icon.svg: node scripts/gen-icons.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import sharp from "sharp";

const svg = readFileSync("src/app/icon.svg");
const png = (size) => sharp(svg, { density: 384 }).resize(size, size).png().toBuffer();

writeFileSync("src/app/apple-icon.png", await png(180));
mkdirSync("public", { recursive: true });
writeFileSync("public/logo.png", await png(512));

// ICO container with embedded PNGs (supported by all modern browsers and Google).
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((size, i) => {
  const e = 6 + 16 * i;
  header.writeUInt8(size, e);
  header.writeUInt8(size, e + 1);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(images[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += images[i].length;
});
writeFileSync("src/app/favicon.ico", Buffer.concat([header, ...images]));
console.log("icons written");
