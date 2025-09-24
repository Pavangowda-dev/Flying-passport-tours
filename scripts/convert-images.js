const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const inputDir = './public/images/tours';
const outputDir = './public/images/tours';

async function convertToWebp(dir) {
  try {
    await fs.mkdir(outputDir, { recursive: true });
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const inputPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        // Recursively process subdirectories
        await convertToWebp(inputPath);
      } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
        const relativePath = path.relative(inputDir, dir);
        const outputSubDir = path.join(outputDir, relativePath);
        await fs.mkdir(outputSubDir, { recursive: true });

        const outputFile = path.basename(entry.name, path.extname(entry.name)) + '.webp';
        const outputPath = path.join(outputSubDir, outputFile);

        await sharp(inputPath)
          .webp({ quality: 75 })
          .toFile(outputPath);
        console.log(`Converted ${inputPath} to ${outputPath}`);
      }
    }
    console.log('Image conversion complete!');
  } catch (err) {
    console.error('Error converting images:', err);
  }
}

convertToWebp(inputDir);