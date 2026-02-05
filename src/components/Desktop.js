import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';

import Taskbar from './Taskbar'

import Jimage from './JImage';
import JWindow from './JWindow';
import Loader from './Loader';


const Desktop = ({style}) => {

    const [iconData, setIconData] = useState([]);
    const [desktopLoading, setDesktopLoading] = useState(true);
    const nodeRef = useRef(null);

    useEffect(() => {
        const apiUrl = 'https://millerweb.dev/api.php';
        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify({ action: 'getWindows', payload: {
                window_location: 'desktop'
            } })
        }).then(res => {
            return res.json();
        }).then(data => {
            if(data.response.length > 0){
                // Task data
                const formatted = data.response.map(row => {return {...row, active: false, activeWindow: false}});
                setIconData(formatted);
            } else {
                setIconData([]);
            }
            setDesktopLoading(false);
        });
    }, []);

    const handleIconClick = (e,data) => {
        const foundIcon = iconData.find(e => e.name === data.name);
        if(foundIcon) {
            const newData = iconData.map(e => {
                if(e.name === data.name){
                    e.active = !e.active;
                    e.activeWindow = !e.activeWindow;
                }
                return e;
            })
            setIconData(newData);
        }

    }

    const getActiveWindow = e => {
        const found = iconData.find(icon => icon.id === e.id);
        if(found){
            const newData = iconData.map(icon => {
                if(icon.id === e.id){
                    icon.activeWindow = e.activeWindow;
                }
                return icon;
            });
            setIconData(newData);
        }
    }

  return (
    desktopLoading ? (
        <Loader isGlobal={true} />
    ) : (
    <div className="icon-wrapper">
        <nav className="global">
            <ul>
                {iconData.map((icon,i) => {
                    return (
                        <Draggable
                            nodeRef={nodeRef}
                            key={i}
                        >
                            <li
                                ref={nodeRef}
                                className="draggable ui-draggable ui-draggable-handle"
                                style={{position: 'relative'}}
                                onDoubleClick={e => {handleIconClick(e,icon)}}
                            >
                                <Jimage src={icon.icon} />
                                <span>{icon.label}</span>
                            </li>
                        </Draggable>
                    )
                })}
            </ul>
        </nav>

        {iconData.map((icon,i) => {
            {/* Resulting window objects */}
            if(icon.active){
                return (<JWindow key={i} showWindow={handleIconClick} iconObject={icon} passActiveWindow={getActiveWindow} />)
                // switch(icon.name){
                //     case 'my_computer':
                //         return (<MyComputer key={i} showWindow={handleIconClick} iconObject={icon} passActiveWindow={getActiveWindow} />)
                //         break;
                //     default:
                //     return (<JWindow></JWindow>)
                // }
            }
        })}

        <Taskbar taskData={iconData} passActiveWindow={getActiveWindow} />
    </div>
    )
  );
};

export default Desktop;