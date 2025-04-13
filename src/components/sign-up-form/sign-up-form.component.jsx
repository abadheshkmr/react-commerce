import { confirmPasswordReset,getAuth } from "firebase/auth";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.styles.scss';


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUpForm = () => {

    console.log('hit');
    const [formFields, setFormFields] = useState(defaultFormFields);
    console.log(formFields);
    const {displayName,email, password, confirmPassword } = formFields;
    
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
    event.preventDefault();
    if(password !== confirmPassword) {
        alert('password donot match');
        return;
    }
    try {
        const userDocRef = await createAuthUserWithEmailAndPassword(email,password);
       
        await createUserDocumentFromAuth(userDocRef.auth, {displayName})
        console.log(userDocRef);
        resetFormFields();
    }catch(err){
        if(err.code ===  'auth/email-already-in-use') {
            alert('email already in use');
        } else{
            console.error('User creation encountered error', err);
        }
        
    } 

   }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }
    return (
        <div className="sign-up-container">
            <h2> dont't have an account?</h2>
            <span> Sign up with your email and password </span>
            <form onSubmit={handleSubmit}>
                
                <FormInput 
                label='Display Name'
                type="text" 
                required 
                onChange={handleChange} 
                name="displayName" 
                value={displayName}/>
                
                <FormInput 
                label='Email'
                type="text" 
                required 
                onChange={handleChange} 
                name='email' 
                value={email}/>

                <FormInput 
                label='Password'
                type="password" 
                required 
                onChange={handleChange} 
                name="password" 
                value={password}/>

                <FormInput 
                label='Confirm Password'
                type="password" 
                required 
                onChange={handleChange} 
                name="confirmPassword" 
                value={confirmPassword}/>
                
                <Button type="submit">Sign up </Button>
            </form>
        </div>

    );
}

export default SignUpForm;