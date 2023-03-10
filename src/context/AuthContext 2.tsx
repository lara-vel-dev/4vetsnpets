import { createContext, useContext, useEffect, useState } from "react";
import { auth, fireStore } from "../services/config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const UserContext = createContext<any>({});

export function AuthContextProvider(props: any) {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Register, Login and Logout functions
  async function createUser(email: string, password: string, rol: string) {
    setIsAuthenticated(true);
    const infoUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((firebaseUser) => firebaseUser);
    const docRef = doc(fireStore, `users/${infoUser.user.uid}`);
    setDoc(docRef, { email: email, rol: rol });
  }

  function login(email: string, password: string, rol: string) {
    setIsAuthenticated(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setIsAuthenticated(false);
    return signOut(auth);
  }

  // Get rol
  async function getRol(uid: any) {
    const docRef = doc(fireStore, `users/${uid}`);
    const encrypted = await getDoc(docRef);
    const finalInfo = encrypted?.data()?.rol;
    return finalInfo;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: any) => {
      if (currentUser) {
        getRol(currentUser.uid).then((rol) => {
          const userData = {
            uid: currentUser.uid,
            email: currentUser.email,
            rol: rol,
          };
          setIsAuthenticated(true);
          setUser(userData);
          console.log("Final Data", userData);
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <UserContext.Provider value={{ createUser, login, logout, user, isAuthenticated }}>
        {props.children}
      </UserContext.Provider>
    </>
  );
}

export function UserAuth() {
  return useContext(UserContext);
}
