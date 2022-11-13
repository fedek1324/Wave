import React from "react";
import Navigation from "./App/config/navigation";
import { ConversionContextProvider } from "./App/util/ConversionContext";


export default () => (
  // its JSX
  <ConversionContextProvider>
    <Navigation />
  </ConversionContextProvider>
);
