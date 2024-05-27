import express from 'express';
import dotenv from 'dotenv';

import listRouter from './listRouter';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;


app.use(express.json());

app.use('/lists', listRouter);




app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
