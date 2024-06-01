import { Router } from 'express';
import fs from 'fs';
import { List } from './types/types';

const listFile = './data/lists.json';

const listRouter = Router();

listRouter.get('/getAllLists', (req, res) => {
  let lists = fs.readFileSync(listFile).toString(); // Convert Buffer to string
  lists = JSON.parse(lists);
  
  res.send(lists);
});

listRouter.post('/addList', (req, res) => {
  const newList = req.body.newList;

  let lists: string = fs.readFileSync(listFile).toString(); // Convert Buffer to string
  let parsedLists: List[] = JSON.parse(lists);

  parsedLists.push(newList);
  fs.writeFileSync(listFile, JSON.stringify(parsedLists));
  
  res.send(lists);
});

export default listRouter;
