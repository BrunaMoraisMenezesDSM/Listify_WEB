import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './styles/global.css'
import newTask from "./pages/New/newTask";
import editTask from "./pages/Edit/editTask";
import listTask from "./pages/List/listTask";
import detailsTask from "./pages/Details/detailsTask";

function App() {
  return(
    <Router>
      <Switch>
        <Route exact={true} path="/" component={listTask}/> {/* Rota para a página inicial (listagem de tarefas). */}
        <Route path="/newTask" component={newTask}/>  {/* Rota para criar nova tarefa */}
        <Route path="/editTask/:id" component={editTask}/> {/* Rota para editar tarefa */}
        <Route path="/detailsTask/:id" component={detailsTask}/>  {/* Rota para detalhes de uma tarefa, pop-up com informações */}
      </Switch>
    </Router>
  )
}
export default App;