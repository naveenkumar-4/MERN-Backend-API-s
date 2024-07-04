import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import likeRoutes from './routes/likeRoutes.js';
import friendRoutes from './routes/friendRoutes.js';
import otpRoutes from './routes/otpRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import loggerMiddleware from './middlewares/loggerMiddleware.js';

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/social_media', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(loggerMiddleware);

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/otp', otpRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
