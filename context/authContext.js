import {createContext ,useContext,useState,useEffect} from "react";
import {onAuthStateChanged , signOut as authSignOut} from "firebase/auth";
// import { auth } from "@/firebase/firebase";
import { auth, db } from "@/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";


const Usercontext = createContext();

export const UserProvider = ({children}) => {
    
    const [currentUser, setCurrentUser]=useState(null);

    const[isLoading,setisLoading]=useState(true);

    const clear = async () => {
        try {
        if(currentUser)
        {
            await updateDoc(doc(db,"users",currentUser.uid),{
                isOnline:false,
            });
//             console.log("Printng the currentUser");
//   console.log(currentUser);
        }
        setCurrentUser(null);
        setisLoading(false);
            
        } catch (error) {
            console.log(error)
        }
    };

    const authStateChanged = async (user) => {
        setisLoading(true);
        if(!user)
        {
            clear();
            return;
        }

        const userDocexist = await getDoc(doc(db,"users",user.uid));

        if(userDocexist.exists())
        {
            await updateDoc(doc(db,"users",user.uid),{
                isOnline:true
            });
        }


        const userDoc=await getDoc(doc(db,"users",user.uid));
        setCurrentUser(userDoc.data());
        setisLoading(false);

    };

    const signOut= () =>{
        authSignOut(auth).then(()=> clear())
    }

    useEffect(() => {
        const unsubscribe=onAuthStateChanged(auth,authStateChanged)

        return () => unsubscribe();
    },[])

    

    return(
        <Usercontext.Provider value={{
            currentUser,setCurrentUser,isLoading,
            setisLoading,
            signOut
        }} >
            {children}
        </Usercontext.Provider>
    )

}

export const UseAuth= () => useContext(Usercontext);