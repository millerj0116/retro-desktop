import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';

import Sidebar from './Sidebar';
import WindowContent from './WindowContent';
import Jimage from './JImage';

const JWindow = ({showWindow, iconObject, passActiveWindow}) => {

    const [activeWindow, setActiveWindow] = useState(true);
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const nodeRef = useRef(null);

    const handleShowWindow = () => {
        showWindow('',{name: iconObject.name});
    }
    
    const handleWindowClick = () => {
        setActiveWindow(true)
        passActiveWindow({id: iconObject.id, activeWindow: true});
    }

    useEffect(() => {
        if(iconObject.name === 'my_documents'){
            const apiUrl = 'https://millerweb.dev/api.php'
            fetch(apiUrl, {
                    method: 'POST',
                    body: JSON.stringify({ action: 'getProjects', payload: {} })
                }).then(res => {
                    return res.json();
                }).then(data => {
                    if(data.response.length > 0){
                        // Project data
                        setProjects(data.response);
                    } else {
                        setProjects([])
                    }
                });
                setIsLoading(false);
        }
    }, []);

    useEffect(() => {
    function handleClickOutside(event) {
        if (nodeRef.current && !nodeRef.current.contains(event.target)) {
            setActiveWindow(false); // Set state here
            if(!event.target.classList.contains('task-btn')){
                passActiveWindow({id: iconObject.id, activeWindow: false});
            } else {
                passActiveWindow({id: iconObject.id, activeWindow: true});
            }
      }
    }
    // Bind the listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
    // Unbind the listener on clean up
    document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [nodeRef]);

  return (
    <Draggable nodeRef={nodeRef}>
    <section className={`window draggable ui-draggable ui-draggable-handle ${iconObject.window_type}-window ${(activeWindow ? 'active' : '')}`} ref={nodeRef} onMouseDownCapture={e => {handleWindowClick()}}>
            <div className={`title-bar ${!activeWindow ? 'inactive' : ''}`}>
                <div className="title-bar-text"><Jimage src={iconObject.icon} alt="small icon for Title Bar" />{iconObject.label}</div>
                <div className="title-bar-controls">
                    <button className="minimize" aria-label="Minimize"></button>
                    <button className="maximize" aria-label="Maximize"></button>
                    <button className="close" aria-label="Close" onClick={e => {handleShowWindow(e)}}></button>
                </div>
            </div>
            {iconObject.window_type === 'default' ? (
                <div className="address-bar">
                    <span>Address:</span>
                    <span className="address"><Jimage src="tiny_folder_open.png" alt="Tiny Folder Icon for Searchbar" /><span className="address-text">C:\MillerWeb\{iconObject.label}</span></span>
                </div>
            ) : undefined}

            <div className="content">
                {iconObject.window_type === 'default' ? (<Sidebar windowName={iconObject.name} windowLabel={iconObject.label} windowIcon={iconObject.icon} projects={projects} />) : undefined}
                <WindowContent windowName={iconObject.name} projects={projects} isLoading={isLoading} />
            </div>

    </section>
    </Draggable>
  );
};

export default JWindow;