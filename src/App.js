import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './styles/global.css'
import newTask from "./pages/New/newTask";
import editTask from "./pages/Edit/editTask";
import listTask from "./pages/List/listTask";
import detailsTask from "./pages/Details/detailsTask";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={listTask} /> {/* Rota para a página inicial (listagem de tarefas). */}
          <Route path="/newTask" component={newTask} />  {/* Rota para criar nova tarefa */}
          <Route path="/editTask/:id" component={editTask} /> {/* Rota para editar tarefa */}
          <Route path="/detailsTask/:id" component={detailsTask} />  {/* Rota para detalhes de uma tarefa, pop-up com informações */}
        </Switch>
      </div>
    </Router>
  )
}

export default App;