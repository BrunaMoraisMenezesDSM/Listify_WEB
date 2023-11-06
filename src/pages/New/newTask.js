import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import Header from '../../components/Header/Header';
import '../../styles/global.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Redirecionamento para a lista de tarefas
const ReloadToList = () => {
    window.location.href = '/';
};

// Esquema de validação - Yup
const validationNewTask = yup.object().shape({
    name: yup.string().required("O nome da tarefa é obrigatório").max(40, "O nome precisa ter menos de 60 caracteres"),
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

    const createNewTask = (data) => {
        data.status = selectedStatus;
        data.priority = selectedPriority;
        // POST - Requisição para a API
        axios.post("https://listify-api-bg9i.onrender.com/tasks", data)
            .then((response) => {
                toast.success(<>
                    <div>Tarefa criada com sucesso!</div>
                    <div style={{ fontSize: '12px' }}>Redirecionando para a lista de tarefas</div>
                </>, {
                    position: 'bottom-left',
                    autoClose: 3000
                });
                setTimeout(() => {
                    ReloadToList();
                }, 2000);
            })
            .catch((error) => {
                console.error("Erro ao criar a tarefa:", error);
                toast.error('Ocorreu um erro ao criar a tarefa. Tente novamente mais tarde.');
            });
    };

    return (
        <div>
            <Header />
            <main>
                <div className='card-newTask'>
                    <h1 name='newTask'>Criar tarefa</h1>
                    <div className='card-task-items'>
                        <form onSubmit={handleSubmit(createNewTask)}>
                            <div className='card-task-title'>
                                <div className="label-input">
                                    <label>Nome</label><br />
                                    <input type="text" name='name' {...register("name")} />
                                </div>
                                <p className='error-message'>{errors.name?.message}</p>
                            </div>

                            <div className='card-task-description'>
                                <div className="label-input">
                                    <label>Descrição</label><br />
                                    <textarea name='description' {...register("description")} maxLength={400} />
                                </div>
                                <p className='error-message'>{errors.description?.message}</p>
                            </div>

                            <div className='card-task-details'>
                                <div className="label-input">
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

                                <div className="label-input">
                                    <label>Data limite</label><br />
                                    <input
                                        type="date"
                                        name='dateLimit'
                                        ref={register}
                                        {...register("dateLimit")}
                                    />
                                    <p className='error-message'>{errors.dateLimit && errors.dateLimit.message}</p>
                                </div>

                                <div className="label-input">
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
export default NewTask;