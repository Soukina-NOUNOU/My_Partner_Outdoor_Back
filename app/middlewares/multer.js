const multer = require('multer');
const path = require('path');
const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;

//Multipurpose Internet Mail Extensions = Pictire validation
const MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    let destination = '';
    
    if(req.baseUrl.slice(1) === 'user') {
      destination = 'images/users';
      // If we update event
    } else if (req.baseUrl.slice(1) === 'event') {
      destination = 'images/events';
    }
    
    // where to import the images
    callback(null, destination);
  },
  filename: function(req, file, callback) {
    let fileName = '';
    // Extract Original name
    const extractOriginalName = path.extname(file.originalname);

    // Update picture field for BDD
    // If we update user
    if(req.baseUrl.slice(1) === 'user') {
      req.body.picture = `${BASE_URL}:${PORT}/images/users/user${req.params.id}${extractOriginalName}`;
      fileName = `user${req.params.id}${extractOriginalName}`;
      // If we update event
    } else if (req.baseUrl.slice(1) === 'event') {
      req.body.picture = `${BASE_URL}:${PORT}/images/events/event${req.params.id}${extractOriginalName}`;
      fileName = `event${req.params.id}${extractOriginalName}`;
    }

    callback(null, fileName);
  }
});
// Configure Multer with storage defined above
const upload = multer({
  storage: storage,
  fileFilter: function(req, file, callback) {
    // check if the file type is an allowed image type
    if (MIME_TYPES.includes(file.mimetype)) {
      callback(null, true);
    } else {
      const error = new Error('The image format is not valid. Please choose a JPEG, PNG or GIF format.');
      error.status = 400;
      callback(error);
    }
  }
});

module.exports = upload;