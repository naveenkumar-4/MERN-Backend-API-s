// import multer from 'multer';


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "./uploads");
//     },
//     filename: (req, file, cb) => {
//       // cb(null, `${Date.now()}-${file.originalname}`);
//       cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  
//     },
//   });

// const upload = multer({
//   limits: {
//     fileSize: 1000000
//   },
//   storage:storage,
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//       return cb(new Error('Please upload an image'));
//     }
//     cb(null, true);
//   }
// });

// export default upload;
import multer from 'multer';

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'));
    }
    cb(null, true);
  }
});

export default upload;
