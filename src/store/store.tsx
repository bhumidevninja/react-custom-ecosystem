import React, { createContext, useContext, useState, useCallback } from 'react';
import { ITemplate } from '../components/Templates/templates.types';

type State = {
    selectedTemplate?: ITemplate
};

type Store = {
    state: State;
    setSelectedTemplate: (template: ITemplate) => void;
    reset: () => void
};

const initialState: State = {};

const StateContext = createContext<Store | undefined>(undefined);

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<State>(initialState);

    const setSelectedTemplate = (template: ITemplate) => {
        setState({ ...state, selectedTemplate: template })
    }

    const reset = useCallback(() => {
        setState(initialState);
    }, []);

    return (
        <StateContext.Provider value={{ state, setSelectedTemplate, reset }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStore = (): Store => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('useStore must be used within a StateProvider');
    }
    return context;
};
