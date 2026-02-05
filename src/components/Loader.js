    import React, { useState, useEffect } from 'react';
import Jimage from './JImage';

const Loader = ({isGlobal}) => {
  return (
    <div className={`window loader ${isGlobal ? 'global' : ''}`} style={{width: '300px'}}>
        <div className="title-bar">
            <div className="title-bar-text">Millerweb.dev</div>
        </div>
        <div className="window-body">
            <div className="progress-indicator segmented">
                <span className="progress-indicator-bar" style={{width: '30%'}} />
            </div>
        </div>
    </div>
  );
};

export default Loader;
