import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import Header from '../../components/Header/Header';
import '../../styles/global.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Redirecionamento para a lista de tarefas
const ReloadToList = () => {
    window.location.href = '/';
};

// Esquema de validação - Yup
const validationEditTask = yup.object().shape({
    name: yup.string().required("O nome da tarefa é obrigatório").max(40, "O nome precisa ter menos de 40 caracteres"),
    description: yup.string().required("A descrição da tarefa é obrigatória").max(400, "A descrição precisa ter menos de 400 caracteres"),
    priority: yup.string().required("A prioridade da tarefa é obrigatória"),
    status: yup.string().required("O status da tarefa é obrigatório")
});

function EditTask() {
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationEditTask)
    });
    const [task, setTask] = useState({});

    useEffect(() => {
        axios.get(`https://listify-api-bg9i.onrender.com/tasks/${id}`)
            .then((response) => {
                // Atualiza o estado com os detalhes da API
                setTask(response.data);
                // Preenche o formulário
                reset(response.data);
            });
    }, [id, reset]);

    const editTask = (data) => {
        axios.put(`https://listify-api-bg9i.onrender.com/tasks/${id}`, data)
            .then(() => {
                toast.success(<>
                    <div>Tarefa atualizada com sucesso!</div>
                    <div style={{ fontSize: '12px' }}>Redirecionando para a lista de tarefas</div>
                </>, {
                    position: 'bottom-left',
                    autoClose: 3000
                });
                setTimeout(() => {
                    ReloadToList();
                }, 2000);
            })
            .catch(() => {
                toast.error('Ocorreu um erro. A tarefa não foi editada.');
            });
    };

    return (
        <div>
            <Header />
            <main>
                <div className='card-newTask'>
                    <h1 name='editTask'>Editar tarefa</h1>
                    <div className='card-task-items'>
                        <form onSubmit={handleSubmit(editTask)}>
                            <div className='card-task-title'>
                                <div className="label-input">
                                    <label>Nome</label>
                                    <input type="text" name='name' {...register("name")} />
                                </div>
                                <p className='error-message'>{errors.name?.message}</p>
                            </div>

                            <div className='card-task-description'>
                                <div className="label-input">
                                    <label>Descrição</label>
                                    <textarea name='description' {...register("description")} maxLength={400} />
                                </div>
                                <p className='error-message'>{errors.description?.message}</p>
                            </div>

                            <div className='card-task-details'>
                                <div className="label-input">
                                    <label>Prioridade</label>
                                    <select
                                        name='priority'
                                        {...register("priority")}
                                        defaultValue={task.priority || "Baixa"}
                                    >
                                        <option value="Baixa">Baixa</option>
                                        <option value="Média">Média</option>
                                        <option value="Alta">Alta</option>
                                    </select>
                                </div>

                                <div className="label-input">
                                    <label>Data limite</label>
                                    <input
                                        type="date"
                                        name='dateLimit'
                                        {...register("dateLimit")}
                                        defaultValue={task.dateLimit || ""}
                                    />
                                </div>

                                <div className="label-input">
                                    <label>Status</label>
                                    <select
                                        name='status'
                                        {...register("status")}
                                        defaultValue={task.status || "Pendente"}
                                    >
                                        <option value="Pendente">Pendente</option>
                                        <option value="Em andamento">Em andamento</option>
                                        <option value="Concluído">Concluído</option>
                                    </select>
                                </div>
                            </div>
                            <div className='btn-newTask'>
                                <button type="submit">
                                    <img src="/icons/check.png" alt="Ícone" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <ToastContainer />
        </div>
    );
}

export default EditTask;