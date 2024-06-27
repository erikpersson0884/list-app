"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const listFile = './data/lists.json';
const listRouter = (0, express_1.Router)();
function createRandomId() {
    const timestamp = Date.now();
    return `${timestamp}_${Math.random().toString(36).substring(7)}`;
}
listRouter.get('/getAllLists', (req, res) => {
    let lists = fs_1.default.readFileSync(listFile).toString(); // Convert Buffer to string
    lists = JSON.parse(lists);
    res.send(lists);
});
listRouter.post('/addList', (req, res) => {
    const newListName = req.body.listName;
    const newList = { id: Date.now().toString(), name: newListName, items: [] };
    let lists = fs_1.default.readFileSync(listFile).toString(); // Convert Buffer to string
    let parsedLists = JSON.parse(lists);
    parsedLists.push(newList);
    fs_1.default.writeFileSync(listFile, JSON.stringify(parsedLists, null, 2));
    res.send(parsedLists);
});
listRouter.post('/removeList', (req, res) => {
    const listId = req.body.listId;
    let lists = fs_1.default.readFileSync(listFile).toString(); // Convert Buffer to string
    let parsedLists = JSON.parse(lists);
    parsedLists = parsedLists.filter((list) => list.id !== listId);
    fs_1.default.writeFileSync(listFile, JSON.stringify(parsedLists, null, 2));
    res.send(parsedLists);
});
listRouter.post('/renameList', (req, res) => {
    const listId = req.body.listId;
    const newName = req.body.newName;
    let lists = fs_1.default.readFileSync(listFile).toString(); // Convert Buffer to string
    let parsedLists = JSON.parse(lists);
    let listIndex = parsedLists.findIndex((list) => list.id === listId);
    parsedLists[listIndex].name = newName;
    fs_1.default.writeFileSync(listFile, JSON.stringify(parsedLists, null, 2));
    res.send(parsedLists);
});
listRouter.post('/addItem', (req, res) => {
    const itemName = req.body.itemName;
    const listId = req.body.listId;
    const newItem = {
        name: itemName,
        id: createRandomId(),
        completed: false
    };
    let lists = fs_1.default.readFileSync(listFile).toString(); // Convert Buffer to string
    let parsedLists = JSON.parse(lists);
    let listIndex = parsedLists.findIndex((list) => list.id === listId);
    parsedLists[listIndex].items.push(newItem);
    fs_1.default.writeFileSync(listFile, JSON.stringify(parsedLists, null, 2));
    res.send(newItem);
});
listRouter.post('/removeItem', (req, res) => {
    const item = req.body.item;
    const listId = req.body.listId;
    let lists = fs_1.default.readFileSync(listFile).toString(); // Convert Buffer to string
    let parsedLists = JSON.parse(lists);
    const activeList = parsedLists.find((list) => list.id === listId);
    if (!activeList) {
        res.status(404).send("Item not found");
        return;
    }
    if (!activeList.items.find((listItem) => listItem.id === item.id)) {
        res.status(404).send("Item not found");
        return;
    }
    activeList.items = activeList.items.filter((listItem) => listItem.id !== item.id);
    fs_1.default.writeFileSync(listFile, JSON.stringify(parsedLists, null, 2));
    res.status(200).send(`Item ${item.name}, removed from list ${activeList.name}`);
});
listRouter.post('/toggleCompleted', (req, res) => {
    const item = req.body.item;
    const listId = req.body.listId;
    let lists = fs_1.default.readFileSync(listFile).toString(); // Convert Buffer to string
    let parsedLists = JSON.parse(lists);
    const activeList = parsedLists.find((list) => list.id === listId);
    if (!activeList) {
        res.status(404).send("Item not found");
        return;
    }
    const activeItem = activeList.items.find((listItem) => listItem.id === item.id);
    if (!activeItem) {
        res.status(404).send("Item not found");
        return;
    }
    activeItem.completed = !activeItem.completed;
    fs_1.default.writeFileSync(listFile, JSON.stringify(parsedLists, null, 2));
    res.status(200).send(activeItem);
});
exports.default = listRouter;
