const fs = require('fs-extra');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');
const archiver = require('archiver');

const DIST_DIR = path.join(__dirname, 'dist');

async function build() {
  console.log('Starting obfuscation build process...');
  
  // 1. Clean dist directory
  await fs.emptyDir(DIST_DIR);
  console.log('Cleaned dist directory.');

  // 2. Files to copy without obfuscation
  const staticFiles = [
    'manifest.json',
    'popup.html',
    'popup.css',
    'success.mp3'
  ];

  for (const file of staticFiles) {
    if (await fs.pathExists(file)) {
      await fs.copy(file, path.join(DIST_DIR, file));
      console.log(`Copied ${file}`);
    }
  }

  // 3. Files to obfuscate
  const jsFiles = ['background.js', 'content.js', 'popup.js'];
  
  for (const file of jsFiles) {
    if (await fs.pathExists(file)) {
      const code = await fs.readFile(file, 'utf8');
      
      const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.4,
        debugProtection: false,
        disableConsoleOutput: false,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        numbersToExpressions: true,
        renameGlobals: false,
        selfDefending: true,
        simplify: true,
        splitStrings: true,
        splitStringsChunkLength: 10,
        stringArray: true,
        stringArrayCallsTransform: true,
        stringArrayCallsTransformThreshold: 0.5,
        stringArrayEncoding: ['base64'],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 1,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersParametersMaxCount: 2,
        stringArrayWrappersType: 'variable',
        stringArrayThreshold: 0.75,
        unicodeEscapeSequence: false
      });

      await fs.writeFile(path.join(DIST_DIR, file), obfuscationResult.getObfuscatedCode());
      console.log(`Obfuscated ${file}`);
    }
  }

  // 4. Create ZIP archive
  console.log('Creating ZIP archive...');
  const output = fs.createWriteStream(path.join(__dirname, 'cimea-helper-secure.zip'));
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', function() {
    console.log(`Successfully created cimea-helper-secure.zip (${archive.pointer()} total bytes)`);
  });

  archive.on('error', function(err) {
    throw err;
  });

  archive.pipe(output);
  archive.directory(DIST_DIR, false);
  await archive.finalize();
}

build().catch(console.error);
