import React, { useState, useEffect } from 'react';
import Jimage from './JImage';
import Loader from './Loader';
import LanguageList from './LanguageList';

const Project = ({project, checkActiveProject}) => {

    const [projectData, setProjectData] = useState([]);
    const [mediaData, setMediaData] = useState([]);
    const [projectLoading, setProjectLoading] = useState(true);

    useEffect(() => {
    let apiUrl = 'https://millerweb.dev/wp-json/wp/v2/media?per_page=100'
        fetch(apiUrl, {
                method: 'GET'
            }).then(res => {
                return res.json();
            }).then(data => {
                // Second callout for project(s)
                if(data && data.length > 0) {
                    const images = data.map(image => {
                        return {id: image.id, src: image.source_url}
                    });
                    setMediaData(images);
                    apiUrl = `https://millerweb.dev/wp-json/wp/v2/project/${project.id}`
                            fetch(apiUrl, {
                                method: 'GET'
                            }).then(res => {
                                return res.json();
                            }).then(data => {
                                // Second callout for project
                                if(data) {
                                    const formattedProject = {
                                        name: project.name,
                                        blurb: project.blurb,
                                        icon: project.icon,
                                        languages: project.languages,
                                        link: project.link,
                                        // API DATA -- comes from the ACF key
                                        previewText: (data.acf.preview_text) ? data.acf.preview_text : '',
                                        overview: (data.acf.overview) ? data.acf.overview : '',
                                        type: (data.acf.type) ? data.acf.type : '',
                                        section_one: (data.acf.content_section_one) ? {...data.acf.content_section_one, name: 'section_one'} : {},
                                        section_two: (data.acf.content_section_two) ? {...data.acf.content_section_two, name: 'section_two'} : {},
                                        section_three: (data.acf.content_section_three) ? {...data.acf.content_section_three, name: 'section_three'} : {}
                                    }
                                    // Map mediaData IDs to corresponding Project Media IDs
                                    Object.keys(formattedProject).forEach(key => {
                                        if(key.includes('section_')){
                                            const mediaId = formattedProject[key].section_image;
                                            const fullImg = images.find(e => e.id === mediaId);
                                            if(fullImg) {
                                                formattedProject[key].section_image = fullImg.src
                                            }
                                        }
                                    });
                                    setProjectData(formattedProject);
                                    setProjectLoading(false);
                                }
                        })
                }
        })
    },[])

    const removeActiveProject = () => {
        checkActiveProject(false);
    }

    const getMediaObject = (id) => {
        if(mediaData.length > 0) {
            const found = mediaData.find(obj => obj.id === id);
            if(found){
                return found;
            } else {
                return {};
            }
        }
        return {};
    }

    const renderContentSection = (content) => {
        if(content) {
            const sectionNumber = content.name;
            return (
                <div className={`project-section ${content.name}`}>
                    <div dangerouslySetInnerHTML={{__html: content.section_content}}></div>
                    <div><Jimage src={content.section_image} type="absolute" /></div>
                </div>
            )
        }
        return undefined;
    }

    return (
        <section className="inner-project">
            {!projectLoading ? (
                <>
                <header>
                    <button className="back" onClick={e => {removeActiveProject()}}>&larr;</button>
                    <div className="inner">
                        <Jimage src={projectData.icon} type="image" alt={`${projectData.name} Logo Image`} />
                        <div>
                            <h2>{projectData.name}</h2>
                            <p>{projectData.overview}</p>
                        </div>
                    </div>
                </header>
                <div className="inner-content">
                    <h6>Tech:</h6>
                    <LanguageList languages={projectData.languages} />

                    {projectData.section_one ? (
                        renderContentSection(projectData.section_one)
                    ) : undefined}

                    {projectData.section_two ? (
                        renderContentSection(projectData.section_two)
                    ) : undefined}

                    {projectData.section_three ? (
                        renderContentSection(projectData.section_three)
                    ) : undefined}
                </div>
                </>
            ) : (<Loader isGlobal={true} />)}
        </section>
    );
};

export default Project;