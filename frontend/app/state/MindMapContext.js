import { createContext, useState, useContext } from 'react';

const MindMapContext = createContext();

export const useMindMap = () => useContext(MindMapContext);

export const MindMapProvider = ({ children }) => {
  const [mindmaps, setMindmaps] = useState([]);

  return (
    <MindMapContext.Provider value={{ mindmaps, setMindmaps }}>
      {children}
    </MindMapContext.Provider>
  );
};
