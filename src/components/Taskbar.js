import React, { useState, useEffect } from 'react';
import Jimage from './JImage';
import StartMenu from './StartMenu';
import TaskBubble from './TaskBubble';

const Taskbar = ({taskData, passActiveWindow}) => {

const [showStartMenu, setShowStartMenu] = useState(false);
const [startMenuItems, setShowStartMenuItems] = useState(false);
const [time, setTime] = useState(new Date())

useEffect( () => {
    // Tray clock
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
  }, [startMenuItems])


  const onStartClick = (e) => {
    setShowStartMenu(!showStartMenu);
  }

  const getActiveWindow = (e) => {
    passActiveWindow(e);
  }

  return (
    <footer id="taskbar">
        <div id="tasks" style={{alignSelf: 'flex-start'}}>
          <button id="start-menu-btn" className="task-btn" onClick={onStartClick}>
            <Jimage src="start_icon.png" alt="Start Menu Icon" />
            <span>Start</span>
          </button>
          {/* <span className="separator"></span> */}
          {taskData.map((bubble,i) => {
            return (bubble.active) ? (<TaskBubble
              key={i}
              iconId={bubble.id}
              icon={bubble.icon}
              label={bubble.label}
              activeWindow={bubble.activeWindow}
              getActiveWindow={getActiveWindow}
              />) : undefined;
          })}
        </div>

        {showStartMenu ? (
          <section id="start-menu-wrapper">
            <StartMenu />
          </section>
        ) : undefined}

        <div id="taskbar-tray">
          <span id="taskbar-clock">{time.toLocaleTimeString(undefined,
            {
                hour: '2-digit',
                minute: '2-digit'
            }
          )}</span>
        </div>
    </footer>
  );
};

export default Taskbar;