const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000',
    filename: 'ecommerce.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000',
    filename: 'food-delivery.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000',
    filename: 'fitness.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000',
    filename: 'hospital.jpg'
  }
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(__dirname, '../public/images', filename));
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filename, () => {});
      reject(err);
    });
  });
};

const downloadAllImages = async () => {
  try {
    if (!fs.existsSync(path.join(__dirname, '../public/images'))) {
      fs.mkdirSync(path.join(__dirname, '../public/images'), { recursive: true });
    }
    
    for (const image of images) {
      console.log(`Downloading ${image.filename}...`);
      await downloadImage(image.url, image.filename);
      console.log(`Downloaded ${image.filename}`);
    }
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
};

downloadAllImages(); 