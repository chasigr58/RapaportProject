
import React from 'react';

export const Header = () => {

    const headerStyle = {

        
        padding: '1%',
        backgroundColor: "red",
        color: 'white',
        textSize:'10px',
        textAlign: 'center',
        // border:'true'
    }

    return(
        <div  style={headerStyle}>
             Quick Diamond Search
            {/* <h1>React With .NET</h1> */}
        </div>
    )
}
export default Header;