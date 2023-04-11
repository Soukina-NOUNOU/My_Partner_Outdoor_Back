const multer = require('multer');

//Multipurpose Internet Mail Extensions = Pictire validation
const MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    // where to import the images
    callback(null, 'images');
  },
  filename: function(req, file, callback) {
    //return user's id and user's filename 
    callback(null, req.params.id + "_" + file.originalname);
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
      callback(new Error('Only image files are allowed!'));
    }
  }
});

module.exports = upload;