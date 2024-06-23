import React from 'react';
import ListInput from './ListInput';
import axios from 'axios';
import { List } from '../../../types/types';


interface addListProps {
    onClose: () => void;
    activeList: List | null;
};

const AddList = ({onClose, activeList}: addListProps) => {

    const renameList = (newName: string) => {
        if (activeList) {
            axios.post(`/api/lists/renameList`, { listId: activeList.id, newName: newName })
                .then(() => {
                    onClose();
                });
        }
    }


    return (
        <ListInput onClose={onClose} onSave={renameList} saveText='RenameList'/>
    );
};

export default AddList;