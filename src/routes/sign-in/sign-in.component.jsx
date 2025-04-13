import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";


import { 
    signInWithGooglePopup, 
    signInWithGoogleRedirect,
    createUsetDocumentFromAuth, 
    auth
} from "../../utils/firebase/firebase.utils"; 

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
const SignIn = () => {
    
    const logGoogleUser = async () => {
        const {user } = await signInWithGooglePopup();
        console.log( user);
        const userDocRef = await createUsetDocumentFromAuth(user);
        console.log( userDocRef);
    }
    

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with google popup
            </button>
            <SignUpForm />
            
        </div>
    );
}

export default SignIn;