import React, { useState, useEffect, useRef } from 'react';
import Jimage from './JImage';
import Loader from './Loader';
import LanguageList from './LanguageList';
import Project from './Project';
import Console from './Console';

const WindowContent = ({windowName, passedContent, passActiveWindow, projects, isLoading}) => {

    const [showWindow, setShowWindow] = useState(false)
    const [activeProject, setActiveProject] = useState(null);

    const my_computer_content = () => {
        return (
            <div className="window-content">
                <div style={{display: 'flex', marginBottom: "2rem"}}>
                    <Jimage src="crt_01.png" type="image" alt="Welcome Image" width={175} className="crt_animation" />
                    <div>
                        <h2>Hi, I'm Jeff</h2>
                        <p style={{marginBottom: "2rem"}}>I make websites! Here you'll find my personal & professional projects done through Agency and Freelance work. Feel free to have a look around!</p>
                    </div>
                </div>
                <h6 style={{textAlign: "center"}}>Here are some quick links to get going:</h6>
                <ul className="window-content gallery" style={{justifyContent: "center"}}>
                    <li><a href="https://github.com/millerj0116" target="_blank"><Jimage src="floppy_drive_1.png" alt="Drive icon for Github Link" /><span>View on GitHub</span></a></li>
                    <li><a href="https://millerweb.dev/mwd_resume_2026.pdf" target="_blank"><Jimage src="a_note.png" alt="Notepad icon for Resume Link" /><span>Resume</span></a></li>
                </ul>
            </div>
        );
    }

    const my_documents_content = () => {
        return (!isLoading) ? (
            <div className="window-content">
                <h3 style={{textAlign: 'center'}}>Portfolio</h3>
                <div className="gallery list">
                    {projects.length > 0 ? (
                        projects.map((project,i) => {
                            return (
                            <div key={i} className="gal-item" onClick={e => {setActiveProject(project)}}>
                                <Jimage src={project.icon} type="image" alt={`${project.name} Logo Image`} />
                                <div className="gal-item-content project">
                                    <div>
                                        <h4>{project.name}</h4>
                                        <p>{project.blurb}</p>
                                    </div>
                                    <div>
                                        <h5>Tech:</h5>
                                        <LanguageList languages={project.languages} />
                                    </div>
                                </div>
                            </div>
                            )
                        })
                    ) : undefined}
                </div>
            </div>
        ) : <div className="window-content" style={{position: 'relative'}}>
                <Loader isGlobal={true} />
            </div>;
    }

    const contact_content = () => {
        return (
            <div class="window-form-content">
                <h3>Contact Me!</h3>
                <p>Fill out the form below, and I'll be sure to reply as soon as I can!</p>
                <form action="#" class="contact">
                    <div className="contact-flex">
                        <div>
                            <label for="fname">Name</label>
                            <input id="fname" type="text" />
                            <label for="lname">Email</label>
                            <input id="lname" type="text" />
                            <button>Submit!</button>
                        </div>
                        <div>
                            <label for="body">Message</label>
                            <textarea id="body" rows="4"></textarea>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

        const dom_content = () => {
        return (
            <div class="window-game-content">
                <iframe src="https://jeffmillerdesigns.com/doom/" />
            </div>
        )
    }

    const console_content = () => {
        return (<Console />)
    }

    const checkActiveProject = () => {
        setActiveProject(null);
    }

    const renderInnerWindow = () => {
        return (<Project project={activeProject} checkActiveProject={checkActiveProject} />)
    }

    const renderWindowContent = () => {
        if(windowName){
            try {
                const functionName = eval(`${windowName}_content`);
                return functionName();
                } catch (e) {
                if (e instanceof ReferenceError) {
                    return undefined;
                } else {
                    throw e;
                }
            }
        } else {
            return undefined;
        }
    }

    return (
        activeProject ? renderInnerWindow() : renderWindowContent()
    );
};

export default WindowContent;