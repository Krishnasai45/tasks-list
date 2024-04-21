import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "../components/RegisterForm.js";
import LoginForm from "../components/LoginForm.js";
import TasksTable from "../tasksContent/TasksTable.js";
const MainRoutes = () => {
  return (
    <>
      <div>
        <Routes>
          <Route exact path="/"  element={<RegisterForm />} />
          <Route path="/login" exact element={ <LoginForm />} />
          <Route path="/dashboard" exact element={ <TasksTable />} />
        </Routes>
      </div>
    </>
  );
};
export default MainRoutes;