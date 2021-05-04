import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useFirebase, useFirestore } from 'react-redux-firebase';
const useAuth = () => {

  const firebase = useFirebase();
  const firestore = useFirestore();
  const isAuthenticated = useSelector(
    state => state.firebase.auth && !state.firebase.auth.isEmpty,
  );
  const profile = useSelector(state => state.firebase.profile);
  const profilePicture = profile?.picture || profile?.photoUrl 
//    || defaultAvatar;
  const userId = useSelector((state) => state.firebase.auth.uid);
  const loaded = useSelector((state) => state.firebase.auth.isLoaded);
  const emailVerified = useSelector((state) => state.firebase.auth.emailVerified);
  const logout = useCallback(() => firebase.logout(), [firebase]);
  const updateProfile = useCallback(
    (entry) => {
      if (!userId) {
        return null;
      }
      return firestore.collection('/users').doc(userId).update(entry);
    },
    [userId, firestore],
  );
  const sendVerificationEmail = useCallback(
    () => {
      if (!userId) {
        return null;
      }
      firebase.auth().currentUser.sendEmailVerification().then(()=>console.log("mail sent"))
    },
    [userId, firebase],
  );

  return {
    profile,
    loaded,
    userId,
    logout,
    updateProfile,
    sendVerificationEmail,
    profilePicture,
    isAuthenticated,
    emailVerified,
  };
};

export default useAuth