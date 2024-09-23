import { Button } from 'flowbite-react'
import {AiFillGoogleCircle} from "react-icons/ai"
import React from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { app } from '../firebase'
import { signInSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Oauth() {

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const handleGoogleClick=async()=>{
        const auth=getAuth(app)
       const provider=new GoogleAuthProvider() 
    //    provider.setCustomParameters({prompt:"Select_account"})

       try {
            const resultsFromGoogle=await signInWithPopup(auth,provider)
                console.log(resultsFromGoogle);

                const res=await fetch("/api/auth/google",{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({
                        name:resultsFromGoogle.user.displayName,
                        email:resultsFromGoogle.user.email,
                        googlePhotoUrl:resultsFromGoogle.user.photoURL
                    })

                })
                const data=await res.json()
                if (res.ok) {
                    dispatch(signInSuccess(data))
                    navigate("/")
                }

            
            
       } catch (error) {
        console.log(error);
        
       }
    }

  return (
    
        <Button type='button' gradientDuoTone="pinkToOrange" outline onClick={handleGoogleClick} >  
        <AiFillGoogleCircle className="w-6 h-6 mr-2 " />
       <span className="self-center">Continue With Google</span>
       </Button>
    
  )
}

export default Oauth