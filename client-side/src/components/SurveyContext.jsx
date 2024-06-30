import React, { createContext, useState, useContext } from 'react';

const SurveyContext = createContext();

export const useSurvey = () => {
    return useContext(SurveyContext);
};

export const SurveyProvider = ({ children }) => {
    const [survey, setSurvey] = useState(null);
    console.log(survey)

    return (
        <SurveyContext.Provider value={{ survey, setSurvey }}>
            {children}
        </SurveyContext.Provider>
    );
};
