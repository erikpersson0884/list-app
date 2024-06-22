export interface ListsProps {
    lists: Lists;
}

export interface ListProps {
    list: List;
}

export interface Lists {
    name: string;
    id: string;
    items: List[];
}

export interface List {
    name: string;
    id: string;
    items: Item[];
}

export interface Item {
    name: string;
    id: string;
}

export interface ShoppingListItem extends Item {
    amount: number;
    completed: boolean;
}

export interface ShoppingList extends List {
    completed: boolean;
}