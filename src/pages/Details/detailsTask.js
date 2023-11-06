import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './detailsTask.css';

function DetailsTask() {
    const [details, setDetails] = useState({});
    const { id } = useParams();

    // GET - com base no ID
    useEffect(() => {
        axios.get(`https://listify-api-bg9i.onrender.com/tasks/${id}`)
            .then((response) => {
                setDetails(response.data);
            });
    }, [id]);

    return (
        <div>
            <Header />
            <main>
                <div className='cards-tasks-details'>
                    <div className='card-task-item-details'>
                        <header>
                            <h2 className='name-details'>{details.name}</h2>
                        </header>

                        <div className='description-task-details'>
                            <p className='p-details'>Descrição:</p> {details.description}
                        </div>

                        <div className='priority-task-details'>
                            <p className='p-details'>Prioridade:</p> {details.priority}
                        </div>

                        <div className='datelimit-task-details'>
                            <p className='p-details'>Data limite:</p> {details.dateLimit}
                        </div>

                        <div className='status-task-details'>
                            <p className='p-details'>Status:</p> {details.status}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default DetailsTask;