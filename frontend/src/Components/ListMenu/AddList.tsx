import React from 'react';
import ListInput from './ListInput';


interface addListProps {
    onClose: () => void;
    onSave: (listName: string) => void;
};

const AddList = ({onClose, onSave}: addListProps) => {
        return (
            <>
                <ListInput onClose={onClose} onSave={onSave} saveText='Add List'/>
            </>
        );
};

export default AddList;