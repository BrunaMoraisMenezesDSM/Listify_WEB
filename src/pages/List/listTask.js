import React, { useState, useEffect } from 'react';
import HeaderMain from '../../components/HeaderMain/HeaderMain';
import './listTask.css';
import axios from 'axios';

function ListTask() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('pending'); // Inicia com um filtro padrão 
    const [loading, setLoading] = useState(true); // Estado de carregamento

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') {
            return true; // Mostra todas as tarefas
        } else if (filter === 'completed') {
            return task.status === 'Concluído'; 
        } else if (filter === 'pending') {
            return task.status === 'Pendente'; 
        } else if (filter === 'in-progress') {
            return task.status === 'Em andamento';
        }
        return false;
    });

    // GET - Listagem de tasks
    useEffect(() => {
        axios.get("https://listify-api-bg9i.onrender.com/tasks")
            .then((response) => {
                setTasks(response.data);
                setLoading(false); // Define o estado de carregamento como false quando os dados forem carregados
            })
            .catch(() => {
                console.log("Deu errado.");
            });
    }, []);

    // DELETE - API
    function deleteTask(id) {
        axios.delete(`https://listify-api-bg9i.onrender.com/tasks/${id}`);
        setTasks(tasks.filter(post => post._id !== id));
    }
    
    return (
        <div>
            <HeaderMain />
            <main>
                <div className='filter'>
                    <label htmlFor="filterSelect">Filtrar por:</label>
                    <select
                        id="filterSelect"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">Todas</option>
                        <option value="completed">Concluído</option>
                        <option value="pending">Pendente</option>
                        <option value="in-progress">Em andamento</option>
                    </select>
                </div>
                {loading ? (
                    <div className="loading-indicator">Carregando...</div>
                ) : (
                    <div className='cards-tasks'>
                        {filteredTasks.map((task, key) => {
                            return (
                                <div className='card-task-item' key={key}>
                                    <header>
                                        <h2>{task.name}</h2>
                                    </header>
    
                                    <div className='description-task'>
                                        <p>{task.description}</p>
                                    </div>
    
                                    <div className='btns'>
                                        <div className='btn-editTask'>
                                            <button onClick={() => window.location.href = `/editTask/${task._id}`}>Editar</button>
                                        </div>
    
                                        <div className='btn-detailsTask'>
                                            <button onClick={() => window.location.href = `/detailsTask/${task._id}`}>Detalhes</button>
                                        </div>
                                        
                                        <div className='btn-deleteTask'>
                                            <button onClick={() => deleteTask(task._id)}>Excluir</button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}    
export default ListTask;