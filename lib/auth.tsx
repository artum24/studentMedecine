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
  const handleUser = (rawUser, status?: string) => {
    if (rawUser) {
      const user = formatUser(rawUser, status);
      const { token, ...userWithoutToken } = user;
      createUser(user.uid, userWithoutToken);
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

  const signinWithGoogle = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => handleUser(response.user, "student"));
  };

  const signinDoctor = (email, password) => {
    Router.push(`/doctor/${email}`);
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => handleUser(response.user, "doctor"));
  };

  const signout = () => {
    Router.push("/");
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };
  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);
    return () => unsubscribe();
  }, []);
  return {
    user,
    signinWithGoogle,
    signinDoctor,
    signout,
  };
}

const formatUser = (user, status) => {
  return {
    uid: user.uid,
    email: user.email,
    token: user.za ? user.za : "",
    status,
    name: user.displayName ? user.displayName : "",
    provider: user.providerData[0].providerId,
  };
};
