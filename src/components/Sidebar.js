import React, { useState, useEffect } from 'react';
import Jimage from './JImage';

const Sidebar = ({windowName, windowLabel, windowIcon, projects}) => {


    const my_computer_sidebar = () => {
        return (
        <div className="sidebar">
            <header className="window-title">
                <h2>
                    <Jimage src="computer.png" alt="small computer icon for Title Bar" />
                    My Computer
                </h2>
            </header>
            <div className="skill-chart">
                <h6>(C:)<span>Local Disk</span></h6>
                <ul className="skills">
                    <li className="js">Javascript</li>
                    <li className="wp">WordPress</li>
                    <li className="html">HTML</li>
                    <li className="css">CSS</li>
                    <li className="php">PHP</li>
                    <li className="jv">Java</li>
                </ul>
                <Jimage src="pie-chart.png" alt="Pie Chart breaking down language skills" />
            </div>
        </div>
        )
    }

    const my_documents_sidebar = () => {
        return (
        <div className="sidebar">
            <header className="window-title">
                <h2>
                    <Jimage src={windowIcon} alt="small computer icon for Title Bar" />
                    {windowLabel}
                </h2>
            </header>
            <div className="sidebar-list">
                {projects.length > 0 ? (
                    <ul>
                        {projects.map((project,i) => {
                            return (
                            <li key={i}>
                                <Jimage
                                    src="html-small.png"
                                    alt="small html icon for list item" />
                                <a href={project.link} target="_blank">{project.name}</a>
                            </li>
                            )
                        })}
                    </ul>
                ) : undefined}
            </div>
        </div>
        )
    }

    const default_sidebar = () => {
        return (
        <div className="sidebar">
            <header className="window-title">
                <h2>
                    <Jimage src={windowIcon} alt="small icon for Title Bar" />
                    {windowLabel}
                </h2>
            </header>
        </div>
        )
    }

    const renderSidebarContent = () => {
        if(windowName){
            try {
                const functionName = eval(`${windowName}_sidebar`);
                return functionName();
                } catch (e) {
                if (e instanceof ReferenceError) {
                    return default_sidebar();
                } else {
                    throw e;
                }
            }
        } else {
            return default_sidebar();
        }
    }

    return (
        renderSidebarContent()
    );

};

export default Sidebar;