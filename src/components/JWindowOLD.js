import React, { useState, useEffect } from 'react';
import Jimage from './JImage';

const JWindowOLD = ({style}) => {
  return (
    <section className="window documents draggable ui-draggable ui-draggable-handle">
        <div className="title-bar">
            <div className="title-bar-text">My Documents</div>
            <div className="title-bar-controls">
                <button className="minimize" aria-label="Minimize"></button>
                <button className="maximize" aria-label="Maximize"></button>
                <button className="close" aria-label="Close"></button>
            </div>
            </div>
            <div className="address-bar">
                <span>Address:</span>
                <span className="address"><Jimage src="tiny_folder_open.png" alt="Tiny Folder Icon for Searchbar" /> C:\MillerWeb\My Documents</span>
            </div>



              <div className="content">
                <div className="window-content">
                    <ul className="window-content gallery">
                        <li><Jimage src="notepad.png" alt="Notepad icon for About Me" /><span>About Me</span></li>
                        <li><Jimage src="a_note.png" alt="Notepad icon for Resume" /><span>Resume</span></li>
                        <li><Jimage src="t_note.png" alt="Notepad icon for Contact Info" /><span>Contact</span></li>
                    </ul>
                </div>
            </div>

    </section>
  );
};

export default JWindowOLD;