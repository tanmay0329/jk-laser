import fs from 'fs';
import path from 'path';

export interface GalleryItem {
  id: string;
  category: string;
  designNumber: string;
  image: string;
}

export function getGalleryImages(): GalleryItem[] {
  const imagesDir = path.join(process.cwd(), 'public', 'images', 'services');
  const items: GalleryItem[] = [];

  if (!fs.existsSync(imagesDir)) {
    return items;
  }

  // Map the 6 physical folders to properly cased category names for the UI
  const categoryMap: Record<string, string> = {
    'gates': 'Gates',
    'door': 'Door',
    'ELEVATION DESIGN': 'Elevation Design',
    'BUILDING ELEVATION DESIGn': 'Building Elevation Design',
    'grill': 'Grill',
    'wall art': 'Wall Art',
  };

  const prefixes: Record<string, string> = {
    'Gates': 'G',
    'Door': 'D',
    'Elevation Design': 'E',
    'Building Elevation Design': 'BE',
    'Grill': 'R',
    'Wall Art': 'W',
  };

  const counters: Record<string, number> = {
    'Gates': 1,
    'Door': 1,
    'Elevation Design': 1,
    'Building Elevation Design': 1,
    'Grill': 1,
    'Wall Art': 1,
  };

  const folders = fs.readdirSync(imagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory());

  for (const folder of folders) {
    const folderName = folder.name;
    const category = categoryMap[folderName] || 'Other';
    
    if (category === 'Other') continue;

    const folderPath = path.join(imagesDir, folderName);
    const files = fs.readdirSync(folderPath).filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.jfif'].includes(ext);
    });

    for (const file of files) {
      const prefix = prefixes[category];
      const count = counters[category]++;
      const designNumber = `${prefix}${count.toString().padStart(3, '0')}`;
      const id = `${folderName}-${file}`;
      
      // Use encodeURIComponent to handle spaces and special chars in filenames and folders
      const imagePath = `/images/services/${encodeURIComponent(folderName)}/${encodeURIComponent(file)}`;

      items.push({
        id,
        category,
        designNumber,
        image: imagePath,
      });
    }
  }

  // Shuffle items or sort them if needed. We'll leave them sorted by folder/name by default.
  return items;
}
