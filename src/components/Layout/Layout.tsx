import React from 'react';
import './Layout.css';
const Layout:React.FC=({children})=> {
    return (
        <div className='container_layout'>
            {children}
        </div>
    );
}

export default Layout;
