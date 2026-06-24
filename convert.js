const sharp = require('sharp');

async function convert() {
  try {
    await sharp('public/jk-laser-firee.png').webp().toFile('public/jk-laser-firee.webp');
    console.log('Converted jk-laser-firee.png to webp');
    await sharp('public/images/futuristic_laser_architecture.png').webp().toFile('public/images/futuristic_laser_architecture.webp');
    console.log('Converted futuristic_laser_architecture.png to webp');
  } catch (err) {
    console.error(err);
  }
}
convert();
