import React, { useState } from 'react';
import Input from './input';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import FormIcon from './form-icon';

export default function ShowHideInput(props) {
    const [showPass, setShowPass] = useState(false);
    
    return (
        <Input 
            type={showPass ? "text":"password"}
            leftIcon={<FormIcon isLeft icon={faLock}/>} 
            rightIcon={
                <FormIcon className="show-hide"
                isRight 
                onClick={() => setShowPass(!showPass)} 
                icon={showPass ? faEyeSlash : faEye}/>
            }
            {...props}
        />
    );
}