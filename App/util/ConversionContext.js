import React, { createContext } from "react";

export const ConversionContext = createContext();

export const ConversionContextProvider = ({ children }) => {

  const contextValue = {

  };

  return (
    <ConversionContext.Provider value={contextValue}>
      {children}
    </ConversionContext.Provider>
  );
};
