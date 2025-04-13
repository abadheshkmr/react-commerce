import { confirmPasswordReset, getAuth} from "firebase/auth";
import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth, 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPasswordCustom
 } 
    from "../../utils/firebase/firebase.utils";
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''
}
const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    console.log(formFields);
    const {email, password } = formFields;
    
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const userDocRef  = await signInWithGooglePopup();
        console.log(userDocRef);
        await createUserDocumentFromAuth(userDocRef.auth);
    }

    const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const {user} = await signInAuthUserWithEmailAndPasswordCustom(email,password);
        //console.log(user);
        resetFormFields();
    }catch(err){
        switch (err.code) {
            case 'auth/invalid-credential':
            alert('Invalid Credential');
            break;
        }
        console.error(err);
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
                <div className="button-container">
                <Button type="submit">Sign In </Button>
                <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In </Button>
                </div>
            </form>
        </div>

    );
}

export default SignInForm;