import React from 'react';
import { NavLink } from 'react-router-dom';

function CreateNewTaskButton() {
  const handleReload = () => {
    window.location.href = '/newTask';
  };

  return (
    <div className='btn-newTask'>
      <NavLink to="/newTask">
        <button onClick={handleReload}>
          <img src="/icons/new.png" alt="Ícone" />
        </button>
      </NavLink>
    </div>
  );
}

export default CreateNewTaskButton;