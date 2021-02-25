import { useState, useEffect, useContext, createContext } from "react";
import { createUser } from "./db";
import firebase from "./firebase";
import cookie from "js-cookie";

const authContext = createContext<any>({});
import Router from "next/router";
export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = (rawUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
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
    Router.push("/dashboard");
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => handleUser(response.user));
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
    signout,
  };
}

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    token: user.za,
    name: user.displayName ? user.displayName : "",
    provider: user.providerData[0].providerId,
    photoURL: user.photoURL,
  };
};
