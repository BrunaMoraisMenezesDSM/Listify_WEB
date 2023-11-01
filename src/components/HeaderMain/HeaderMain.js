import React from 'react';
import { NavLink } from 'react-router-dom'
import './HeaderMain.css'

function HeaderMain(){
    const handleReload = () => {
        window.location.href = '/newTask';
    };
    return(
        <header>
            <div className='container'>
                <div>
                    <h1>Listify</h1>
                    <h4>Simplify, organize, achieve.</h4>
                </div>
                <div className='btn-newTask'>
                    <NavLink to="/newTask">
                        <button onClick={handleReload}> + Criar nova tarefa</button>
                    </NavLink>
                </div>
            </div>
        </header>
    )
}
export default HeaderMain