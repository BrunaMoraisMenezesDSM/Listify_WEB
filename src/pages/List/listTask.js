import React, { useState, useEffect } from 'react';
import HeaderMain from '../../components/HeaderMain/HeaderMain';
import './listTask.css';
import axios from 'axios';
import CreateNewTaskButton from '../../pages/New/createNewTask';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

        toast.success('Tarefa excluída com sucesso!', {
            position: 'bottom-left',
            autoClose: 3000
        });
    }

    // Atualizando o filtro e destacar o botão
    const updateFilter = (newFilter) => {
        setFilter(newFilter);

        // Removendo a classe 'active' de todos os botões
        const buttons = document.querySelectorAll('.custom-btn');
        buttons.forEach(button => {
            button.classList.remove('active');
        });

        // Adicionando a classe 'active' apenas ao botão clicado
        const clickedButton = document.querySelector(`.custom-btn[data-filter='${newFilter}']`);
        clickedButton.classList.add('active');
    };

    return (
        <div>
            <HeaderMain />
            <main>
                <div className='filter'>
                    <label>Filtrar por:</label>
                    <button
                        className={`custom-btn ${filter === 'all' ? 'active' : ''}`}
                        data-filter="all"
                        onClick={() => updateFilter('all')}
                    >
                        Todas
                    </button>
                    <button
                        className={`custom-btn ${filter === 'completed' ? 'active' : ''}`}
                        data-filter="completed"
                        onClick={() => updateFilter('completed')}
                    >
                        Concluído
                    </button>
                    <button
                        className={`custom-btn ${filter === 'pending' ? 'active' : ''}`}
                        data-filter="pending"
                        onClick={() => updateFilter('pending')}
                    >
                        Pendente
                    </button>
                    <button
                        className={`custom-btn ${filter === 'in-progress' ? 'active' : ''}`}
                        data-filter="in-progress"
                        name='in-progress'
                        onClick={() => updateFilter('in-progress')}
                    >
                        Em andamento
                    </button>
                </div>
                {loading ? (
                    <div class="spinner">
                        <div class="spinner-circle"></div>
                    </div>
                ) : (
                    <div className='cards-tasks'>
                        {filteredTasks.map((task, key) => {
                            return (
                                <div className='task-frame' key={key}>
                                    <div className='card-task-item'>
                                        <header>
                                            <h2>{task.name}</h2>
                                        </header>

                                        <div className='description-task'>
                                            <p>{task.description}</p>
                                        </div>

                                        <div className='btns'>
                                            <div className='btn-editTask'>
                                                <button onClick={() => (window.location.href = `/editTask/${task._id}`)}>
                                                    <img src="/icons/edit.png" alt="Editar" className="icon" title="Editar" />
                                                </button>
                                            </div>

                                            <div className='btn-detailsTask'>
                                                <button onClick={() => (window.location.href = `/detailsTask/${task._id}`)}>
                                                    <img src="/icons/details.png" alt="Detalhes" className="icon" title="Detalhes" />
                                                </button>
                                            </div>

                                            <div className='btn-deleteTask'>
                                                <button onClick={() => deleteTask(task._id)}>
                                                    <img src="/icons/delete.png" alt="Excluir" className="icon" title="Excluir" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
            <div>
                <main>
                    <CreateNewTaskButton />
                </main>
            </div>
        </div>
    );
}

export default ListTask;