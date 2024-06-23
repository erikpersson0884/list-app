import React, { useState } from 'react';
import ListInput from './ListInput';
import axios from 'axios';


interface addListProps {
    onClose: () => void;
};

const AddList = ({onClose}: addListProps) => {
    const handleAddList = (listName: String) => {
        axios.post(`/api/lists/addList`, { listName: listName })
            .then((response) => {
                onClose();
            });
    }

    return (
        <>
            <ListInput onClose={onClose} onSave={handleAddList} saveText='Add List'/>
        </>
    );
};

export default AddList;