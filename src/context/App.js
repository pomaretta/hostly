import React from 'react';

const AppContext = React.createContext({

    config: null,
    routes: [],
    currentRoute: 0,
    setCurrentRoute: () => {},

    progressBar: false,
    progressBarWidth: 0,
    updateProgressBar: () => {},

});

export default AppContext;