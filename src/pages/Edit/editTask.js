import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Header from '../../components/Header/Header';
import axios from 'axios';

// Redirecionamento para a lista de tarefas
const ReloadToList = () => {
    window.location.href = '/';
};

// Esquema de validação - Yup
const validationNewTask = yup.object().shape({
    name: yup.string().required("O nome da tarefa é obrigatório.").max(40, "O nome precisa ter menos de 40 caracteres"),
    description: yup.string().required("A descrição da tarefa é obrigatória.").max(40, "A descrição precisa ter menos de 60 caracteres"),
    priority: yup.string().required("A prioridade da tarefa é obrigatória."),
    status: yup.string().required("O status da tarefa é obrigatório.")
});

function EditTask() {
    const { id } = useParams()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationNewTask)
    })
    const [task, setTask] = useState({});

    useEffect(() => {
        axios.get(`https://listify-api-bg9i.onrender.com/tasks/${id}`)
            .then((response) => {
                // Atualiza o estado com os detalhes da API
                setTask(response.data);
                // Preenche o formulário
                reset(response.data);
            })
    }, [id, reset]);

    const EditTask = (data) => {
        axios.put(`https://listify-api-bg9i.onrender.com/tasks/${id}`, data)
            .then(() => {
                ReloadToList();
            })
            .catch(() => {
                console.log("Ocorreu um erro. A tarefa não foi editada.");
            });
    };

    return (
        <div>
            <Header />
            <main>
                <div className='card-newTask'>
                    <h1>Editar tarefa</h1>
                    <div className='card-task-items'>
                        <form onSubmit={handleSubmit(EditTask)}>
                            <div className='card-task-title'>
                                <label>Nome</label><br />
                                <input type="text" name='name' {...register("name")} />
                                <p className='error-message'>{errors.name?.message}</p>
                            </div>

                            <div className='card-task-description'>
                                <label>Descrição</label><br />
                                <input type="text" name='description' {...register("description")} />
                                <p className='error-message'>{errors.description?.message}</p>
                            </div>

                            <div className='card-task-priority'>
                                <label>Prioridade</label><br />
                                <select
                                    name='priority'
                                    {...register("priority")}
                                    defaultValue={task.priority || "Baixa"}
                                >
                                    <option value="Baixa">Baixa</option>
                                    <option value="Média">Média</option>
                                    <option value="Alta">Alta</option>
                                </select>
                                <p className='error-message'>{errors.priority?.message}</p>
                            </div>

                            <div className='card-task-dateLimit'>
                                <label>Data limite</label><br />
                                <input
                                    type="date"
                                    name='dateLimit'
                                    {...register("dateLimit")}
                                    defaultValue={task.dateLimit || ""}
                                />
                            </div>

                            <div className='card-task-status'>
                                <label>Status</label><br />
                                <select
                                    name='status'
                                    {...register("status")}
                                    defaultValue={task.status || "Pendente"}
                                >
                                    <option value="Pendente">Pendente</option>
                                    <option value="Em andamento">Em andamento</option>
                                    <option value="Concluído">Concluído</option>
                                </select>
                                <p className='error-message'>{errors.status?.message}</p>
                            </div>

                            <div className='btn-newTask'>
                                <button type="submit">Editar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
export default EditTask;