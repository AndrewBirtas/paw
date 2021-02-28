import React, { useContext, useEffect, useState } from 'react';
import {auth, store} from '../firebase';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  
  function setUser(newUser) {
    store.collection('users').doc(newUser.uid).set({
      displayName: newUser.displayName,
      email: newUser.email,
      photoURL: newUser.photoURL || null,
      posts: [''],
      followers: [],
      following: []
    })
    .catch((err) => {
        console.log(err)
    })
  }

  async function signup(cred) {
    try{
      const result = await auth.createUserWithEmailAndPassword(cred.email, cred.pass)
      await result.user.updateProfile({
        displayName: cred.username,
      })

      return await setUser(result.user)
    } catch(err) {
      console.log(err)
    }
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])
    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
      }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}