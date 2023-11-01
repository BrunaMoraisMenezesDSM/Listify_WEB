import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';

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
                <div className='cards-tasks'>
                    <div className='card-task-item'>
                        <header>
                            <h2>{details.name}</h2>
                        </header>

                        <div className='description-task'>
                            <p>Descrição: {details.description}</p>
                        </div>

                        <div className='priority-task'>
                            <p>Prioridade: {details.priority}</p>
                        </div>

                        <div className='datelimit-task'>
                            <p>Data limite: {details.dateLimit}</p>
                        </div>

                        <div className='status-task'>
                            <p>Status: {details.status}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
export default DetailsTask;
