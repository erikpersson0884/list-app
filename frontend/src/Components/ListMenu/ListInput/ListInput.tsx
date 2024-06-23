import React from 'react';
import './ListInput.css';

interface addListProps {
    onClose: () => void;
    onSave: (listName: string) => void;
    saveText: string;
};

const ListInput = ({onClose, onSave, saveText}: addListProps) => {

    const handleSave = () => {
        const input = document.querySelector('input') as HTMLInputElement;
        onSave(input.value);
        onClose();
        input.value = '';
    };

    return (
        <div className='listInputDiv'>
            <form onSubmit={handleSave}>
                <input type='text' placeholder='List Name' />
            </form>
            <div>
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleSave}>{saveText}</button>
            </div>

        </div>
    );
};

export default ListInput;