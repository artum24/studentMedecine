import { useState, useEffect, useContext, createContext } from "react";
import { createUser } from "./db";
import firebase from "./firebase";
import cookie from "js-cookie";
import Router from "next/router";

const authContext = createContext<any>({});

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [userError, setUserError] = useState(null);
  const [showAlert, setShowAlert] = useState(null);
  const handleShowAlert = () => setShowAlert(true);
  const closeAlert = () => setShowAlert(false);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      createUser(user.uid, user);
      setUser(user);
      cookie.set("fast-feedback-auth", true, {
        expires: 1,
      });
      return user;
    } else {
      setUser(false);
      cookie.remove("fast-feedback-auth");
      return false;
    }
  };

  const signinWithGoogle = async () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => handleUser(response.user))
      .then(() => setUserError(false))
      .catch(() => setUserError(true));
  };

  const signinDoctor = async (email: string, password: string) => {
    Router.push(`/doctor/${email}`);
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => handleUser(response.user))
      .then(() => setUserError(false))
      .catch(() => setUserError(true));
  };

  const signout = async () => {
    Router.push("/");
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);
    return () => unsubscribe();
  }, []);
  return {
    user,
    signinWithGoogle,
    signinDoctor,
    signout,
    userError,
    showAlert,
    handleShowAlert,
    closeAlert,
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    status:
      user.providerData[0].providerId === "password" ? "doctor" : "student",
    name: user.displayName ? user.displayName : "",
    provider: user.providerData[0].providerId,
  };
};
