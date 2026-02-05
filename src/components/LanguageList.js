import React, { useState, useEffect } from 'react';
import LanguageMap from './languageMap.js'
const LanguageList = ({languages}) => {

    const [formattedList, setFormattedList] = useState([]);

    useEffect(() => {
        if(languages) {
            const split = languages.split(',');
            const formatted = (split.length > 0) ? split.map(e => {
                const found = (LanguageMap[e]) ? LanguageMap[e] : null;
                
                return (found) ? {
                    name: e,
                    icon: found
                } : null
            }).filter(e => e) : []
            setFormattedList(formatted);
        }

    }, []);

  return (
    <ul className="language-list">
        {formattedList.map((e,i) => {
            return e ? (<li key={i}><i className={e.icon} aria-hidden="true"></i></li>) : undefined;
        })}
    </ul>
  );
};

export default LanguageList;
