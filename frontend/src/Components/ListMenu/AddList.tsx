import React from 'react';


interface addListProps {
    onClose: () => void;
    handleAddList: (listName: string) => void;
};

const AddList = ({onClose, handleAddList}: addListProps) => {

    const addList = () => {
        const input = document.querySelector('input') as HTMLInputElement;
        handleAddList(input.value);
        onClose();
        input.value = '';
    };

    return (
        <div className='addListDiv'>
            <form onSubmit={addList}>
                <input type='text' placeholder='List Name' />
            </form>
            <div>
                <button onClick={onClose}>Cancel</button>
                <button onClick={addList}>Add List</button>
            </div>

        </div>
    );
};

export default AddList;