import React, { useState } from 'react';
import ListInput from './ListInput';
import axios from 'axios';
import { List } from '../../../types/types';


interface renameListProps {
    activeList: List | null;
    onClose: () => void;
};

const renameList = ({activeList, onClose}: renameListProps) => {

    const handleRenameList = (newName: String) => {
        if (!activeList) throw new Error('List is null');
        
        axios.post(`/api/lists/renameList`, { newName: newName, listId: activeList.id})
            .then((response) => {
                onClose();
            });
    }

    return (
        <>
            <ListInput onClose={onClose} onSave={handleRenameList} saveText='Rename List'/>
        </>
    );
};

export default renameList;