const express = require('express');
const ImageKit = require('imagekit');

const app = express();

const imagekit = new ImageKit({
  publicKey: 'your_public_key',
  privateKey: 'your_private_api_key',
  urlEndpoint: 'https://ik.imagekit.io/your_imagekit_id',
});

app.get('/auth', (req, res) => {
  const authParams = imagekit.getAuthenticationParameters();
  res.json(authParams);
});

app.listen(3000, () => console.log('Server running on port 3000'));
