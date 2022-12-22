import { useState, useEffect } from "react";
import firebase from './firebaseConfig';
import { getUserFromCookie, getOnBoardFromCookie, setUserCookie, setOnBoardCookie, removeUserCookie, removeOnBoardCookie, removeOnBoardUserCookie, setOnBoardUserCookie } from "./userCookies";
export default function useFirebaseAuth(){
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setMyToken] = useState(null);
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    const appleProvider = new firebase.auth.OAuthProvider('apple.com');
    const auth = firebase.auth();
    const currentUser = auth.currentUser;
    const formatAuthUser = (user) => ({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        token: user.multiFactor.user.accessToken,
        phone: user.phoneNumber,
        photo: user.photoURL,
        verified: user.emailVerified
    });
    const authStateChanged = async (authState) => {
        if(!authState){ 
            setLoading(false);
            setAuthUser(null);
            setMyToken(null);
            removeUserCookie();
            removeOnBoardCookie();
            return;
        }
        var formattedUser = formatAuthUser(authState);
        if(formattedUser.verified){
            setCookiesLog(formattedUser);
            setAuthUser(formattedUser);
        }
    }
    const clear = () => { 
        setAuthUser(null);
        setLoading(true);
        setMyToken(null);
        removeUserCookie();
        removeOnBoardCookie();
        let user={
            email: null,
            name: null,
            country:null,
            countryCode:null,
            phone: null,
            photo: null,
            emailVerifies: null,
            isCommitteeMember: null,
            referralCode: null,
            currency:"USD"
        }
        setOnBoardUserCookie(user);
    }
    const setCookiesLog = async (data) => { 
        var cookie = getUserFromCookie();
        if(typeof cookie === 'undefined'){
            setUserCookie(JSON.stringify(data));
            if(getOnBoardFromCookie() == null){
                removeOnBoardCookie();
                removeOnBoardUserCookie();
                fetchToken(data);
            }
        }
        else if(cookie.token == null){
            setUserCookie(JSON.stringify(data));
            if(getOnBoardFromCookie() == null){
                removeOnBoardCookie();
                removeOnBoardUserCookie();
                fetchToken(data);
            }
        }
        else{
            if(getOnBoardFromCookie() == null){
                removeOnBoardCookie();
                removeOnBoardUserCookie();
                fetchToken(data);
            }
        }
    }
    const fetchToken = async (data) => {
        if(data.verified){
            var body = {
                "displayName": data.name? data.name:" ",
                "email": data.email,
                "photoUrl": data.photoURL,
                "phone": data.phoneNumber,
                "type":"web"
            }
            
            var raw = JSON.stringify(body);
            var myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Authorization", "Bearer " + data.token);
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch(process.env.URL+"/user/onboarding", requestOptions)
            .then((response) => response.json())
            .then(response =>{
                if(response.status){
                    setMyToken(response.token);
                    setOnBoardCookie(response.token);
                    setOnBoardUserCookie(response.user);
                }
                else{
                    signOut().then(()=>{})
                }
            })
            .catch(error =>{
                console.log('Error while onboading in firebase auth'+ error.message);
            })
        }
    }

    const signInWithEmailAndPassword = (email, password) =>
        firebase.auth().signInWithEmailAndPassword(email, password);
    
    const createUserWithEmailAndPassword = (email, password) =>
        firebase.auth().createUserWithEmailAndPassword(email, password);

    const signInWithGoogle = () => 
        auth.signInWithPopup(googleProvider)

    const signInWithFacebook = () =>
        auth.signInWithPopup(facebookProvider)

    const signInWithApple = () =>
        auth.signInWithPopup(appleProvider)

    const resetPasswordWithEmail = (email) =>
        firebase.auth().sendPasswordResetEmail(email)

    const signOut = () => 
        firebase.auth().signOut().then(clear);
        
    const changePasswordHandler = (newPassword) =>
        firebase.auth().upda(currentUser, newPassword).then(() => console.log("successful"))

    const deleteAccount = () =>
        firebase.auth().deleteUser(currentUser)
    
    useEffect(() =>{
        const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
        return () => unsubscribe();
    },[]);


    return {
        authUser,
        loading,
        token,
        formatAuthUser,
        setCookiesLog,
        signInWithEmailAndPassword,
        signInWithGoogle,
        signInWithFacebook,
        signInWithApple,
        createUserWithEmailAndPassword,
        changePasswordHandler,
        deleteAccount,
        resetPasswordWithEmail,
        signOut
    };
}