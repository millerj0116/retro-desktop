import React, { useState, useEffect } from 'react';
import Jimage from './JImage';

const Taskbar = ({style}) => {
  return (
    <nav id="start-menu">
        <div className="title-bar"><h6>Windows <span>98</span></h6></div>
        <div className="nav-wrap">
            <ul>
                <a href="#" className="home"><Jimage src="windows_world.png" alt="World Icon for Home link" /><span>Home</span></a>
                <li><a href="#"><Jimage src="folder_open.png" alt="Open Folder Icon for My Documents link" /><span>My Documents</span></a></li>
                <li><a href="#"><Jimage src="folder_closed.png" alt="Closed Folder Icon for Portfolio link" /><span>Portfolio</span></a></li>
                <li><a href="#"><Jimage src="email.png" alt="Email Icon for Contact link" /><span>Contact</span></a></li>
                <li><a href="#"><Jimage src="folder_search.png" alt="Search Folder Icon for Search link" />Find</a></li>
                <li><a href="#"><Jimage src="run.png" alt="Run Icon for Run link" />Run...</a></li>
            </ul>
            <ul>
                <li><a href="#"><Jimage src="login.png" alt="Login Icon for Login link" />Log In</a></li>
                <li><a href="#"><Jimage src="shutdown.png" alt="Shutdown Icon to exit site" />Shut Down...</a></li>
            </ul>
        </div>
    </nav>
  );
};

export default Taskbar;