import { Router } from 'express';
import fs from 'fs';
import { Item, List } from './types/types';

const listFile = './data/lists.json';

const listRouter = Router();

function print(msg: string): void {
    console.log('\x1b[31m%s\x1b[0m', msg);
}

function createRandomId () {
    const timestamp = Date.now();
    return `${timestamp}_${Math.random().toString(36).substring(7)}`;
}


listRouter.get('/getAllLists', (req, res) => {
    let lists = fs.readFileSync(listFile).toString(); // Convert Buffer to string
    lists = JSON.parse(lists);
    
    res.send(lists);
});

listRouter.post('/addList', (req, res) => {
    const newListName: string = req.body.listName;
    const newList: List = { id: Date.now().toString(), name: newListName, items: [] };

    let lists: string = fs.readFileSync(listFile).toString(); // Convert Buffer to string
    let parsedLists: List[] = JSON.parse(lists);

    parsedLists.push(newList);
    fs.writeFileSync(listFile, JSON.stringify(parsedLists, null, 2));
    
    res.send(parsedLists);
});

listRouter.post('/removeList', (req, res) => {
    const listId = req.body.listId;

    let lists: string = fs.readFileSync(listFile).toString(); // Convert Buffer to string
    let parsedLists: List[] = JSON.parse(lists);

    parsedLists = parsedLists.filter((list) => list.id !== listId);
    fs.writeFileSync(listFile, JSON.stringify(parsedLists, null, 2));
    
    res.send(parsedLists);
});

listRouter.post('/renameList', (req, res) => {
    const listId = req.body.listId;
    const newName = req.body.newName;

    let lists: string = fs.readFileSync(listFile).toString(); // Convert Buffer to string
    let parsedLists: List[] = JSON.parse(lists);

    let activeList = parsedLists.find((list) => list.id === listId);

    if (!activeList) {
        res.status(404).send("List not found");
        return;
    }

    activeList.name = newName;

    fs.writeFileSync(listFile, JSON.stringify(parsedLists, null, 2));
    
    res.send(parsedLists);
});


listRouter.post('/addItem', (req, res) => {
    const itemName: string = req.body.itemName;
    const listId: string = req.body.listId;

    const newItem: Item = { 
        name: itemName,
        id: createRandomId(),
        completed: false
    };

    let lists: string = fs.readFileSync(listFile).toString(); // Convert Buffer to string
    let parsedLists: List[] = JSON.parse(lists);

    let listIndex = parsedLists.findIndex((list) => list.id === listId);
    parsedLists[listIndex].items.push(newItem);

    fs.writeFileSync(listFile, JSON.stringify(parsedLists, null, 2));
    
    res.send(newItem);
});

listRouter.post('/removeItem', (req, res) => {
    const item: Item = req.body.item;
    const listId: string = req.body.listId;

    let lists: string = fs.readFileSync(listFile).toString(); // Convert Buffer to string
    let parsedLists: List[] = JSON.parse(lists);

    const activeList = parsedLists.find((list) => list.id === listId);
    if (!activeList) {
        res.status(404).send("Item not found");
        return;
    }

    if (!activeList.items.find((listItem: Item) => listItem.id === item.id)) {
        res.status(404).send("Item not found");
        return;
    }

    activeList.items = activeList.items.filter((listItem: Item) => listItem.id !== item.id);
    
    fs.writeFileSync(listFile, JSON.stringify(parsedLists, null, 2));
    
    res.status(200).send(`Item ${item.name}, removed from list ${activeList.name}`);
});

listRouter.post('/toggleCompleted', (req, res) => {
    const item: Item = req.body.item;
    const listId: string = req.body.listId;

    let lists: string = fs.readFileSync(listFile).toString(); // Convert Buffer to string
    let parsedLists: List[] = JSON.parse(lists);

    const activeList = parsedLists.find((list) => list.id === listId);
    if (!activeList) {
        res.status(404).send("Item not found");
        return;
    }

    const activeItem = activeList.items.find((listItem: Item) => listItem.id === item.id);
    if (!activeItem) {
        res.status(404).send("Item not found");
        return;
    }

    activeItem.completed = !activeItem.completed;
    
    fs.writeFileSync(listFile, JSON.stringify(parsedLists, null, 2));
    
    res.status(200).send(activeItem);
});





export default listRouter;
