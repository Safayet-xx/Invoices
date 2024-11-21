import { v2 as cloudinary } from 'cloudinary';
import axios from 'axios';


cloudinary.config({
  cloud_name: 'dpqs8cobk', // Your Cloudinary Cloud Name
  api_key: '629228989347418', // Your Cloudinary API Key
  api_secret: 'IhZqZdGjcFNPHE-FPGXoeLvPZeg', // Your API Secret
});

// Export the cloudinary instance for use in your app
export default cloudinary;
