import Dashboard from '../pages/Dashboard';
import Servers from '../pages/Servers';
import Server from '../pages/Server';

const routes = [
    {
        key: 'home',
        path: '/',
        hide: true,
        element: <Servers />,
        icon: (
            <svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z" />
            </svg>
        )
    },
    {
        key: 'servers',
        path: '/servers',
        element: <Servers />,
        icon: (
            <svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M4,1H20A1,1 0 0,1 21,2V6A1,1 0 0,1 20,7H4A1,1 0 0,1 3,6V2A1,1 0 0,1 4,1M4,9H20A1,1 0 0,1 21,10V14A1,1 0 0,1 20,15H4A1,1 0 0,1 3,14V10A1,1 0 0,1 4,9M4,17H20A1,1 0 0,1 21,18V22A1,1 0 0,1 20,23H4A1,1 0 0,1 3,22V18A1,1 0 0,1 4,17M9,5H10V3H9V5M9,13H10V11H9V13M9,21H10V19H9V21M5,3V5H7V3H5M5,11V13H7V11H5M5,19V21H7V19H5Z" />
            </svg>
        )
    },
    {
        key: 'server',
        path: '/servers/:id',
        hide: true,
        element: <Server />,
        icon: (
            <svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z" />
            </svg>
        )
    },
];


export default routes;