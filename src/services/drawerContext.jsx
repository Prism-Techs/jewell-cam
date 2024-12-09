
import { createContext, useContext, useState } from 'react';

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {

    const [drawer, setDrawer] = useState(false)

    return (
        <DrawerContext.Provider value={{ drawer, setDrawer }}>
            {children}
        </DrawerContext.Provider>
    );
};

export const useDrawer = () => {
    return useContext(DrawerContext);
};