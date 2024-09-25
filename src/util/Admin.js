import { collection } from "firebase/firestore"
import { getDocs } from "firebase/firestore"
import { db } from "../Firebase/config"


export const getCode = async ()=>{
    
    const colRef = collection(db , 'admin')

    try{
        const res = await getDocs(colRef)
        const code = res.docs[0].data()
        return code
    }
    catch(error){
        return error.message
    }
}