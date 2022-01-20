import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type UserType = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: UserType | undefined;
  signInGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  
  const [user, setUser] = useState<UserType>();

  useEffect( () => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        const { displayName, photoURL, uid } = user;
      
        if (!displayName || !photoURL) {
          throw new Error("Not allowed!");
        }
        
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])  
  
  async function signInGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    
    const result = await auth.signInWithPopup(provider);
    
    if(result.user) 
    {
      const { displayName, photoURL, uid } = result.user;
      
      if (!displayName || !photoURL) {
        throw new Error("Not allowed!");
      }
      
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
      
    }
    
  }
  
  return (
    <AuthContext.Provider value={{ user, signInGoogle }}>
      {props.children}
    </AuthContext.Provider>
  )
}