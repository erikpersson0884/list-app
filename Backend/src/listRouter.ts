import { Router } from 'express';
import fs from 'fs';

const listFile = './data/lists.json';

const listRouter = Router();

listRouter.get('/getAllLists', (req, res) => {
  let lists = fs.readFileSync(listFile).toString(); // Convert Buffer to string
  lists = JSON.parse(lists);
  
  res.send(lists);
});

export default listRouter;
