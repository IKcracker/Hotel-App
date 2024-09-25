import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { Auth } from "../Firebase/config";

export const logIn = async (inputs) => {
  try {
    await signInWithEmailAndPassword(Auth, inputs.email, inputs.password)
    toast.success("Successfully logged in");

    return true;
    
  } catch (error) {
    const errorCode = error.code;
    switch (errorCode) {
      case "auth/invalid-email":
        toast.error("This email address is invalid.");
        break;
      case "auth/user-disabled":
        toast.error("This email address is disabled by the administrator.");
        break;
      case "auth/user-not-found":
        toast.error("This email address is not registered.");
        break;
      case "auth/wrong-password":
        toast.error("The password is invalid or the user does not have a password.");
        break;
      case "auth/invalid-credential":
        toast('The email or password address is invalid.')
        break;
      case "auth/too-many-requests":
        toast('this account has been temporarily disabled due to many failed login attempts')
        break;
      default:
        toast.error("An unexpected error occurred.");
        break;
    }
    return false;
  }
};
