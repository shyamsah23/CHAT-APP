import React, { useEffect,useState } from 'react';
import Link from 'next/link';
import {IoLogoGoogle,IoLogoFacebook} from "react-icons/io";
import { icons } from 'react-icons';
import { auth} from "@/firebase/firebase";
import {signInWithEmailAndPassword ,GoogleAuthProvider,signInWithPopup,sendPasswordResetEmail} from "firebase/auth"
import { UseAuth } from '@/context/authContext';
import {useRouter} from "next/router";
import ToastMessage from '@/components/ToastMessage';
import {toast} from "react-toastify"
import Loader from '@/components/Loader';



const gprovider = new GoogleAuthProvider();


const Login = () => {

    const router=useRouter();
    const {currentUser,isLoading}=UseAuth();
    const [email,setEmail]=useState("");
    // console.log("printing email")
    // console.log(email);


    useEffect(() => {
        if(!isLoading && currentUser)
        {
            router.push("/");
        }
    },[currentUser,isLoading])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email=e.target[0].value;
        const password=e.target[1].value;

        try {
            
            await signInWithEmailAndPassword(auth,email,password);

        } catch (error) {
            
        }
    }

    const signInWithGoogle= async () => {
        try {
            await signInWithPopup(auth,gprovider)
        } catch (error) {
            console.log(error)
        }
    }
    
    const resetPassword = async () => {
        try {
            
            toast.promise(
                async () => {
                await sendPasswordResetEmail(auth,email);
            },{
                pending:"Generating reset Link",
                success:"Reset Email send to your register email id",
                error:"You may have Entered wrong email id"
            },
            {
                autoClose:5000
            });

        } catch (error) {
            console.log(error)
        }
    }


  return isLoading || (!isLoading && currentUser) ? <Loader/> : (
    <div className="h-[100vh] flex justify-center items-center bg-c1">
        <ToastMessage/>
      <div className="flex items-center justify-center flex-col" >
        <div className="text-center">
            <div className="text-5xl my-6 font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%" >
                CHATIFYR
            </div>
            <div className="text-3xl font-bold " >
                Login to Your Account
            </div>
            {/* <div className="text-3xl font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" >
                Login to Your Account
            </div> */}
            <div className="mt-3 text-c3" >
                Connect and chat With Anyone , Anywhere
            </div>
        </div>

        <div className="flex items-center gap-2 w-full mt-10 mb-5">
              <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% w-1/2 h-14 
                  rounded-md cursor-pointer p-[1px]" onClick={signInWithGoogle}>
                    <div className="flex items-center justify-center gap-3  text-white font-semibold bg-c1 w-full 
                    h-full rounded-md" >
                        <IoLogoGoogle size={24}/>
                      <span>Login with Google</span>
                   </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% w-1/2 h-14 
                  rounded-md cursor-pointer p-[1px]">
                    <div className="flex items-center justify-center gap-3  text-white font-semibold bg-c1 w-full 
                    h-full rounded-md" >
                        <IoLogoFacebook size={24}/>
                      <span>Login with FaceBook</span>
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
                       type="email"
                       placeholder="Email"
                       className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
                       autoComplete="off"
                       onChange={(e)=> setEmail(e.target.value)}
                 />

                  <input 
                       type="password"
                       placeholder="Password"
                       className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
                       autoComplete="off"
                 />
                  <div className="text-right w-full text-c3">
                    <span className="cursor-pointer" onClick={resetPassword}>
                        Forgot Password?
                    </span>
                  </div>
                  <button className="mt-4 w-full h-14 rounded-xl outline-none text-base 
                  font-semibold bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
                    Login to Your Account
                  </button>
           </form>
        
           <div className="flex justify-center gap-1 text-c3 mt-5">
               <span>Not a member yet?</span>
               <Link href="/register"
                     className="font-semibold text-white underline underline-offset-2 cursor-pointer"
                >
                    Register Now
               </Link>
           </div>

      </div>
    </div>
  )
}

export default Login;
