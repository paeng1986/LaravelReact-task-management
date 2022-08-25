import { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Task from "./Index";
import TaskProvider from "../context/TaskContext";

import './css/styles.css';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={ <TaskProvider><Task/> </TaskProvider>} />
                </Routes>
            </Router>
        );
    }
}

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
