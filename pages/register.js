import React, {useEffect,useState} from 'react';
import Link from 'next/link';
import {IoLogoGoogle,IoLogoFacebook} from "react-icons/io";
import { icons } from 'react-icons';
import { auth, db} from "@/firebase/firebase";
import {GoogleAuthProvider,signInWithPopup,createUserWithEmailAndPassword,updateProfile} from "firebase/auth"
import { UseAuth } from '@/context/authContext';
import {useRouter} from "next/router";
import ToastMessage from '@/components/ToastMessage';
import {toast} from "react-toastify"
import { doc, setDoc } from 'firebase/firestore';
import { profileColors } from '@/utils/constants';
import Loader from '@/components/Loader';



const gprovider = new GoogleAuthProvider();


const Register = () => {

    const router=useRouter();
    const {currentUser,isLoading}=UseAuth();
    const [email,setEmail]=useState("");
    console.log("printing email")
    console.log(email);


    useEffect(() => {
        if(!isLoading && currentUser)
        {
            router.push("/");
        }
    },[currentUser,isLoading])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName=e.target[0].value;
        const email=e.target[1].value;
        const password=e.target[2].value;
        const colorIndex=Math.floor(Math.random()* profileColors.length)
        try {
            
         const {user} =  await createUserWithEmailAndPassword(auth,email,password);
         console.log("Printing user Details")
         console.log(user);

         // add a lower Display Name

         await setDoc(doc(db,"users",user.uid),{
            uid:user.uid,
            displayName,
            email,
            color:profileColors[colorIndex]
         })

         await setDoc(doc(db,"userChats",user.uid),{})

        await updateProfile(user,{
            displayName
        });

        console.log(user)

        router.push("/");

        } catch (error) {
            console.log(error)
        }
    }

    const signInWithGoogle= async () => {
        try {
            await signInWithPopup(auth,gprovider)
        } catch (error) {
            console.log(error)
        }
    }


  return  isLoading || (!isLoading && currentUser) ? <Loader/> : (
    <div className="h-[100vh] flex justify-center items-center bg-c1">
        
      <div className="flex items-center flex-col" >
        <div className="text-center">
                <div className="text-5xl my-6 font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%" >
                CHATIFYR
                    </div>
            <div className="text-3xl font-bold" >
                Create New Account
            </div>
            <div className="mt-3 text-c3" >
                Connect and chat With Anyone , Anywhere
            </div>
        </div>

        <div className="flex items-center gap-2 w-full mt-10 mb-5"
         onClick={signInWithGoogle}
         >
              <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% w-1/2 h-14 
                  rounded-md cursor-pointer p-[1px]">
                    <div className="flex items-center justify-center gap-3  text-white font-semibold bg-c1 w-full 
                    h-full rounded-md" >
                        <IoLogoGoogle size={24}/>
                      <span>Register with Google</span>
                   </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% w-1/2 h-14 
                  rounded-md cursor-pointer p-[1px]">
                    <div className="flex items-center justify-center gap-3  text-white font-semibold bg-c1 w-full 
                    h-full rounded-md" >
                        <IoLogoFacebook size={24}/>
                      <span>Register with FaceBook</span>
                   </div>
              </div>

        </div>
        
        <div className="flex items-center gap-1">
            <span className="w-5 h-[1px] bg-c3"></span>
            <span className="text-c3 font-semibold">OR</span>
            <span className="w-5 h-[1px] bg-c3"></span>
        </div>

        <form className="flex flex-col items-center gap-3 w-[500px] mt-5"  
        onSubmit={handleSubmit}
        > 
                <input 
                       type="text"
                       placeholder="Display Name"
                       className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
                       autoComplete="off"
                 />
                  <input 
                       type="email"
                       placeholder="Email"
                       className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
                       autoComplete="off"
                 />

                  <input 
                       type="password"
                       placeholder="Password"
                       className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
                       autoComplete="off"
                 />
                  
                  <button className="mt-4 w-full h-14 rounded-xl outline-none text-base 
                  font-semibold bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
                    SignUp
                  </button>
           </form>
        
           <div className="flex justify-center gap-1 text-c3 mt-5">
               <span>Already Have an Account?</span>
               <Link href="/login"
                     className="font-semibold text-white underline underline-offset-2 cursor-pointer"
                >
                    Login
               </Link>
           </div>

      </div>
    </div>
  )
}

export default Register;
