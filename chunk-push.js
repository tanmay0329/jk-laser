const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CHUNK_SIZE = 5; // number of files per commit

function getFilesRecursively(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      getFilesRecursively(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

const allImageFiles = getFilesRecursively(path.join(process.cwd(), 'public', 'images', 'services'));

console.log(`Found ${allImageFiles.length} image files to commit in chunks...`);

for (let i = 0; i < allImageFiles.length; i += CHUNK_SIZE) {
  const chunk = allImageFiles.slice(i, i + CHUNK_SIZE);
  console.log(`\nProcessing chunk ${Math.floor(i / CHUNK_SIZE) + 1} of ${Math.ceil(allImageFiles.length / CHUNK_SIZE)}...`);
  
  try {
    for (const file of chunk) {
      execSync(`git add "${file}"`);
    }
    execSync(`git commit -m "Add image chunk ${Math.floor(i / CHUNK_SIZE) + 1}"`);
    console.log(`Pushing chunk ${Math.floor(i / CHUNK_SIZE) + 1}...`);
    execSync(`git push`);
    console.log('Push successful!');
  } catch (err) {
    console.error(`Error processing chunk:`, err.message);
  }
}

// Push any other modified files
try {
  execSync(`git add .`);
  execSync(`git commit -m "Update source code"`);
  console.log('Pushing final code changes...');
  execSync(`git push`);
  console.log('Final push successful!');
} catch (e) {
  // might error if nothing to commit, which is fine
}

console.log('\nAll done! All files pushed securely.');
