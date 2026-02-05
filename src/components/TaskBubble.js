import React, { useState, useEffect } from 'react';
import Jimage from './JImage';

const TaskBubble = ({iconId, icon, label, activeWindow, getActiveWindow}) => {

const [showStartMenu, setShowStartMenu] = useState(false);

useEffect( () => {
  }, [activeWindow]);

  const passActiveWindow = (id, flipped) => {
    getActiveWindow({id: id, activeWindow: flipped});
  }

  return (
    <button className={`task-btn ${activeWindow ? 'pressed' : ''}`} onClick={e => {passActiveWindow(iconId, !activeWindow)}}>
        <Jimage src={icon} alt={`${label} Task Bar Icon`}/>
        <span>{label}</span>
    </button>
  );
};

export default TaskBubble;