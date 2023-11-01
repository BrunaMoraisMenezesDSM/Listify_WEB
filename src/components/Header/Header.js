import React from 'react';
import { Link } from 'react-router-dom'

function Header(){
    const handleReload = () => {
        window.location.href = '/';
    };
    return(
        <header>
            <div className='container'>
                <div className='btn-back'>
                    <Link to="/">
                        <button onClick={handleReload}>Voltar</button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
export default Header