const multer = require('multer');
const path = require('path');


//Multipurpose Internet Mail Extensions = Pictire validation
const MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    // where to import the images
    callback(null, 'images');
  },
  filename: function(req, file, callback) {
    //return user's id and extension 
    const extractOriginalName = path.extname(file.originalname);
    callback(null, `profil${req.params.id}${extractOriginalName}`);
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