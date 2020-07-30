import React from 'react';


const Navigation = ({ onRouteChange, isSignedIn }) =>{
        if(isSignedIn) {
            return(
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                     <p onClick ={() => onRouteChange ('signout') } className='f3 link dim black underline pointer pa3'>Sign Out</p>
                </nav>
            )
        } else {
           return(
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick ={() => onRouteChange ('Signin') } className='f3 link dim black underline pointer pa3'>Sign In</p>
                    <p onClick ={() => onRouteChange ('Register') } className='f3 link dim black underline pointer pa3'>Registert</p>
                </nav>
           )
        }
        
}



export default Navigation;