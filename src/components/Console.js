import React, { useState, useEffect, useRef } from 'react';

const Console = ({temp}) => {

    const base = 'C:\\MillerWeb';
    const [consoleData, setConsoleData] = useState([]);
    const [apiData, setApiData] = useState([]);
    const [dirStructure, setDirStructure] = useState({
        resume: {icon: (<i className="far fa-file"></i>), type: 'external', link: 'https://millerweb.dev/mwd_resume_2026.pdf'}
    });
    const [currentDir, setCurrentDir] = useState(base);

    let consoleEnd = useRef(null);

    // MOVE THIS TO ANOTHER FILE
    const commandList = {
        '!help': 'handleHelp',
        'cls': 'handleCls',
        'dir': 'handleDir',
        'cd': 'handleCd'
    }

    useEffect(() => {
        const apiUrl = 'https://millerweb.dev/api.php'
        fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify({ action: 'getProjects', payload: {} })
            }).then(res => {
                return res.json();
            }).then(data => {
                if(data.response.length > 0){
                    // Project data
                    setApiData(data.response);
                    const newDirData = {
                        ...dirStructure,
                        projects: {
                            icon: (<i className="far fa-folder"></i>),
                            data: data.response
                        }
                    };
                    setDirStructure(newDirData);

                } else {
                    setApiData([])
                }
        });
    },[]);

    useEffect(() => {
        consoleEnd.scrollIntoView({ behavior: "smooth" });
    },[consoleData])

    const handleHelp = () => {
        const newRow = renderRow((<>
            <p>This Terminal can be used to navigate through my Website and Projects. Below is a list of valid commands:</p>
            <ul>
                <li><span>'dir'</span> &rarr; List files in current directory</li>
                <li><span>'cd %PATH%'</span> &rarr; Change Directories -- Use 'cd /' to go back to the Top Level Directory</li>
                <li><span>'exec %FILE%'</span> &rarr; Open selected File / Page</li>
                <li><span>'info %FILE%'</span> &rarr; See the Description of the selected File / Project</li>
                <li><span>'cls'</span> &rarr; Clear the Console of all text</li>
                <li><span>'quit'</span> &rarr; Exit Application</li>
            </ul>
        </>));
        const newData = [...consoleData, newRow];
        setConsoleData(newData);
    }

    const handleDir = () => {
        const dirs = renderRow((
            <ul>
                {Object.entries(dirStructure).map(([key, value],i) => {
                    return (
                        <li key={i}>{value.icon} {key}</li>
                    )
                })}
            </ul>
        ))
        const newData = [...consoleData, dirs];
        setConsoleData(newData);
    }

    const configureConsoleData = (data) => {
        const newData = [...consoleData, renderRow(data)];
        setConsoleData(newData);
    }

    const handleCd = (e) => {
        // Set failure message
        const failure = (e.includes('cd ')) ? (<p>No Directory "{e.replaceAll('cd ', '')}" found!</p>) : (<p>CD command not found</p>);
        // Get valid dirs
        const validDirs = [];
        Object.entries(dirStructure).forEach(([key,value]) => {
            if(Array.isArray(value.data)) {
                validDirs.push(key);
            }
        })
        // Check passed dir
        if(e.includes('cd ')) {
            // strip 'cd' off
            const dir = e.replaceAll('cd ', '');
            if(dir === '\\') {
                // if found root:
                setCurrentDir(base);
                configureConsoleData((<p>{e}</p>))
            } else if(validDirs.includes(dir)){
                // if found valid
                setCurrentDir(`${base}\\${dir}`);
                configureConsoleData((<p>{e}</p>))
            } else {
                // not found, throw failure
                configureConsoleData(failure);    
            }
        } else {
            // not found, throw failure
            configureConsoleData(failure);
        }
        //  3b. set relative path? idk yet
    }

    const handleCls = () => {
        setConsoleData([]);
    }

    const handleReturn = e => {
        if (e.key === 'Enter') {
            for (const [key, value] of Object.entries(commandList)) {
                const toCheck = (e.target.value.includes('cd ')) ? 'cd' : e.target.value;
                if(key === toCheck) {
                    try {
                        const functionName = eval(value);
                        const toPass = e.target.value
                        e.target.value = '';
                        return functionName(toPass);
                        } catch (e) {
                        if (e instanceof ReferenceError) {
                            e.target.value = '';
                            return undefined;
                        } else {
                            e.target.value = '';
                            throw e;
                        }
                    }
                } else {
                    const newRow = renderRow((<p>{`"${e.target.value}" not recognized!`}</p>));
                    const newData = [...consoleData, newRow];
                    setConsoleData(newData);
                }
            }
            e.target.value = '';
        }
    }

    const renderRow = (text) => {
        const dirBar = (<div className="dir-bar"><p>{currentDir}</p></div>);
        const textArea = (<div className="text-area">{text}</div>);
        return {
            dir: dirBar,
            text: textArea
        };
    }

    return (
        <div className="console">
            <header>
                <h2>Terminal v2</h2>
                <p>Type !help for a list of commands.</p>
            </header>
                {consoleData.map((row,i) => {
                    return (
                        <div key={i} className="console-content">
                            {row.dir}
                            {row.text}
                        </div>
                    )
                })}
                <div className="console-content">
                    <div className="dir-bar"><p>{currentDir}</p></div>
                    <div className="text-area">
                        <input type="text" autoFocus={true} onKeyDown={e => handleReturn(e)} />
                    </div>
                </div>
                <div ref={el => consoleEnd = el}></div>
        </div>
    );
};

export default Console;