const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const pngToIco = require("png-to-ico");

const inputFile = path.join(__dirname, "../public/ritusunrise-logo.png");
const outputDir = path.join(__dirname, "../public/feviicon");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Sizes we need
const sizes = [16, 32, 48, 180, 192, 512];

// Generate PNG icons
async function generateIcons() {
  for (const size of sizes) {
    const fileName =
      size === 180
        ? "apple-touch-icon.png"
        : `favicon-${size}x${size}.png`;

    await sharp(inputFile)
      .resize(size, size)
      .toFile(path.join(outputDir, fileName));

    console.log(`Generated ${fileName}`);
  }
}

// Generate favicon.ico from multiple PNGs
async function generateFaviconIco() {
  const icoSizes = [16, 32, 48];
  const icoPaths = icoSizes.map((s) =>
    path.join(outputDir, `favicon-${s}x${s}.png`)
  );

  const buffer = await pngToIco(icoPaths);
  fs.writeFileSync(path.join(outputDir, "favicon.ico"), buffer);
  console.log("Generated favicon.ico");
}

// Generate site.webmanifest
function generateManifest() {
  const manifest = {
    name: "Ritusunrise Real Estate",
    short_name: "Ritusunrise",
    icons: [
      { src: "/feviicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { src: "/feviicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { src: "/feviicon/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { src: "/feviicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/feviicon/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/feviicon/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
  };

  fs.writeFileSync(
    path.join(outputDir, "site.webmanifest"),
    JSON.stringify(manifest, null, 2)
  );
  console.log("Generated site.webmanifest");
}

// Run everything
(async () => {
  try {
    await generateIcons();
    await generateFaviconIco();
    generateManifest();
    console.log("✅ All icons and manifest generated successfully in /public/feviicon/");
  } catch (err) {
    console.error("Error generating icons:", err);
  }
})();
