import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Auth } from "../Firebase/config";
import { toast } from "react-toastify";

export const registerAuth = async (user) => {
   
    const { email, password } = user;
    try {
        const data = await createUserWithEmailAndPassword(Auth, email, password);
        await sendEmailVerification(data.user);
        toast.success('Successfully Registered')
        toast.success(`Please check your email and click the link to verify your account.`)
        return data.user;
    } catch (err) {
        const errorCode = err.code;
        
        switch (errorCode) {
            case 'auth/weak-password':
                toast('The password is too weak');
            case 'auth/email-already-in-use':
                toast('The email exists, please login or reset your password');
            case 'auth/invalid-email':
                toast('This email address is invalid');
            case 'auth/operation-not-allowed':
                toast('Email/password accounts are not enabled. Please contact support.');
            default:
                toast.error('An unexpected error occurred: ' + err.message );
        }
        return false
    }
};
