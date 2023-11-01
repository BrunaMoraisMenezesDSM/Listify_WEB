import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import Header from '../../components/Header/Header';

// Redirecionamento para a lista de tarefas
const ReloadToList = () => {
    window.location.href = '/';
};

// Esquema de validação - Yup
const validationNewTask = yup.object().shape({
    name: yup.string().required("O nome da tarefa é obrigatório").max(40, "O nome precisa ter menos de 60caracteres"),
    description: yup.string().required("A descrição é obrigatória").max(40, "A descrição precisa ter menos de 40 caracteres"),
    priority: yup.string().required("A prioridade é obrigatória"),
    status: yup.string().required("O status da tarefa é obrigatório"),
    dateLimit: yup.string().required("A data limite é obrigatória")
});

function NewTask() {
    // Inicializa o Form e chama a validação
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationNewTask),
    });
    const [selectedStatus, setSelectedStatus] = useState('Pendente');
    const [selectedPriority, setSelectedPriority] = useState('Baixa');

    const NewTask = (data) => {
        data.status = selectedStatus;
        data.priority = selectedPriority;
        // POST - Requisição para a API
        axios.post("https://listify-api-bg9i.onrender.com/tasks", data)
            .then((response) => {
                ReloadToList();
            })
            .catch((error) => {
                console.error("Erro ao criar a tarefa:", error);
            });
    };

    return (
        <div>
            <Header />
            <main>
                <div className='card-newTask'>
                    <h1>Criar tarefa</h1>
                    <div className='card-task-items'>
                        <form onSubmit={handleSubmit(NewTask)}>
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
                                    value={selectedPriority}
                                    onChange={(e) => setSelectedPriority(e.target.value)}
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
                                    ref={register}
                                    {...register("dateLimit")}
                                />
                                 <p className='error-message'>{errors.dateLimit && errors.dateLimit.message}</p>
                            </div>

                            <div className='card-task-status'>
                                <label>Status</label><br />
                                <select
                                    name='status'
                                    {...register("status")}
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                >
                                    <option value="Pendente">Pendente</option>
                                    <option value="Em andamento">Em andamento</option>
                                    <option value="Concluído">Concluído</option>
                                </select>
                                <p className='error-message'>{errors.status?.message}</p>
                            </div>

                            <div className='btn-newTask'>
                                <button type="submit">Criar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
export default NewTask;