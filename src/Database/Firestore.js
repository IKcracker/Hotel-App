import { db } from "../Firebase/config";
import { addDoc , collection, getDocs } from "firebase/firestore";

export const storingUser = async(user)=>{
    try{
        const docRef= await  addDoc(collection(db ,'users'),user);
        return docRef
    }
    catch(error){
        return error.message
    }
   
   
}

export const getData = async ()=>{
    

const docRef = collection(db,'users')
try{
    const querySnapshot = await getDocs(docRef);
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data
}
catch(error){
return error
}

}
