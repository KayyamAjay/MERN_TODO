import "./App.css";
import Login from "./Components/Pages/Login";
import SignUp from "./Components/Pages/Signup";
import Todo from "./Components/Pages/Todo";
import Welcome from "./Components/to-do/Welcome";
import { Route, Routes } from "react-router";
import NavBar from "./Components/UI/NavBar";

function App() {
  return (
    <>
    <NavBar />
      <Routes>
      <Route path="/:uid/task" element={<Todo />}/>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
       
      </Routes>
    </>
  );
}

export default App;
