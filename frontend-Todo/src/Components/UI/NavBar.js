import React from 'react'
// import logo from '../assest/download.png'
import { Link } from 'react-router-dom';

const NavBar = ()=>{

    return  <nav className="navbar sticky navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid ">
        <a className="navbar-brand " href="/">
        {/* <img src={logo} width="30" height="30" class="d-inline-block align-top pr-4" alt=""></img> */}
          Todo App</a>
        <button className="navbar-toggler pl-2 " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className=" d-flex flex-row-reverse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item ">
           
              <Link className="nav-link active" aria-current="page" to="/signup">Signup</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
            </li>
        
           
          </ul>
         
        </div>
      </div>
    </nav>
}

export default NavBar;