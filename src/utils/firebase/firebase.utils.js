import {initializeApp} from 'firebase/app';
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth' ;
import {
    getFirestore, 
    doc, 
    getDoc, 
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
    
} 
    from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLANz-3qrMGXUD0XWTfmnN92WNtkc7LMM",
    authDomain: "crown-clothing-db-7ff9d.firebaseapp.com",
    projectId: "crown-clothing-db-7ff9d",
    storageBucket: "crown-clothing-db-7ff9d.firebasestorage.app",
    messagingSenderId: "257163036907",
    appId: "1:257163036907:web:03f6691d1f6516f56b16ae"
  };
  
  // Initialize Firebase
  const firebaseapp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

  export const db = getFirestore();

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    await batch.commit();
    console.log('done');
  }

  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'category');
    const q = query(collectionRef);
  
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  console.log(categoryMap);
    return categoryMap;
  };


  export const createUserDocumentFromAuth = async (usetAuth, additionalInformation = {}) => {
    if(!usetAuth) return;

    const userDocRef = doc(db, 'users', usetAuth.uid);
    console.log(userDocRef);

    const snapshot = await getDoc(userDocRef);
    console.log(snapshot);
    console.log(snapshot.exists());
    if (!snapshot.exists()) {
        const {displayName, email} = usetAuth;
        const createAt = new Date();
        try  {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
                ...additionalInformation
            })

        }catch (err) {
            console.error('Encountered error during registration', err);
        }
    }
    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
     if(!email || !password) {
        return;
     }
     return await createUserWithEmailAndPassword(auth,email, password);
     
  }

  export const signInAuthUserWithEmailAndPasswordCustom = async (email, password) => {
    if(!email || !password) {
       return;
    }
    return await signInWithEmailAndPassword (auth, email, password);
   }
  
  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListiener = (callbak) => onAuthStateChanged(auth,callbak);


