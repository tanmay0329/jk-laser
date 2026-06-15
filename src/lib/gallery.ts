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
    'gates': 'JK Gates',
    'door': 'JK Door',
    'ELEVATION DESIGN': 'JK Elevation Design',
    'BUILDING ELEVATION DESIGn': 'JK Building Elevation Design',
    'grill': 'JK Grill',
    'wall art': 'JK Wall Art',
  };

  const prefixes: Record<string, string> = {
    'JK Gates': 'G',
    'JK Door': 'D',
    'JK Elevation Design': 'E',
    'JK Building Elevation Design': 'BE',
    'JK Grill': 'R',
    'JK Wall Art': 'W',
  };

  const counters: Record<string, number> = {
    'JK Gates': 1,
    'JK Door': 1,
    'JK Elevation Design': 1,
    'JK Building Elevation Design': 1,
    'JK Grill': 1,
    'JK Wall Art': 1,
  };

  const folders = fs.readdirSync(imagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory());

  const itemsByCategory: Record<string, GalleryItem[]> = {};

  for (const folder of folders) {
    const folderName = folder.name;
    const category = categoryMap[folderName] || 'Other';
    
    if (category === 'Other') continue;

    const folderPath = path.join(imagesDir, folderName);
    const files = fs.readdirSync(folderPath).filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.jfif'].includes(ext);
    });

    const currentCategoryItems: GalleryItem[] = [];

    for (const file of files) {
      const prefix = prefixes[category];
      const count = counters[category]++;
      const designNumber = `${prefix}${count.toString().padStart(3, '0')}`;
      const id = `${folderName}-${file}`;
      
      // Use encodeURIComponent to handle spaces and special chars in filenames and folders
      const imagePath = `/images/services/${encodeURIComponent(folderName)}/${encodeURIComponent(file)}`;

      currentCategoryItems.push({
        id,
        category,
        designNumber,
        image: imagePath,
      });
    }

    itemsByCategory[category] = currentCategoryItems;
  }

  const orderedCategories = [
    'JK Building Elevation Design',
    'JK Elevation Design',
    'JK Door',
    'JK Gates',
    'JK Grill',
    'JK Wall Art'
  ];

  const categoryArrays: GalleryItem[][] = [];
  for (const cat of orderedCategories) {
    if (itemsByCategory[cat]) {
      categoryArrays.push(itemsByCategory[cat]);
    }
  }

  // Interleave items: 1 from first category, 1 from second category, etc.
  let hasMore = true;
  let index = 0;
  while (hasMore) {
    hasMore = false;
    for (const arr of categoryArrays) {
      if (index < arr.length) {
        items.push(arr[index]);
        hasMore = true;
      }
    }
    index++;
  }

  return items;
}
