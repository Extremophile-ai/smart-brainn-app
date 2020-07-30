import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) =>{
    return( 
        <div>
            <p className='f3'>
                {'This magic brain will detect where faces are in your picture!'}
            </p>
            <div className='center'>
                <div className='form pa4 br3 shadow-5 center'>
                    <input className='f4 pa2 center w-70' type='text' onChange={onInputChange} />
                    <button className='w-30 grow f4 ph3 pv2 dib white bg-light-purple' onClick={onPictureSubmit}>Detect</button>
                </div>
                
            </div>
        </div>
    );

}


export default ImageLinkForm;