import React from 'react';

const AppContext = React.createContext({

    config: null,
    routes: [],
    currentRoute: 0,
    setCurrentRoute: () => {},

    // Modal
    show: false,
    pressed: null,
    data: null,
    changeState: () => {},
    createModal: () => {},
    closeModal: () => {},

    // FilePaths
    getLocalPath: () => {},

    // Error
    error: null,
    sendError: () => {},
    resetError: () => {},

    // ProgressBar
    progressBarWidth: 0,
    updateProgressBar: () => {},

    // Registry
    registryServers: null,
    getRegistryServers: () => {},
    registryServer: null,
    getRegistryServer: () => {},
    updateRegistryServer: () => {},

    // Server
    serverRun: () => {},
    serverStop: () => {},
    serverOutput: () => {},
    serverCommand: () => {},
    serverExport: () => {},
    serverImport: () => {},
    serverRemove: () => {},
    serverUpdate: () => {},
    serverCreate: () => {},

    // Versions
    availableVersions: null,
    getAvailableVersions: () => {},

    // Credentials
    credentials: null,
    credentialsExists: false,
    getCredentials: () => {},
    setCredentials: () => {},
    testCredentials: () => {},

    // Setup
    setup: false,
    appLoading: true,
    hasJre: false,
    setAppLoading: () => {},
    initializeSetup: () => {},
    needsSetup: () => {},
    getHasJre: () => {},
});

export default AppContext;