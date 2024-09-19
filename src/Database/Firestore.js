import { db } from "../Firebase/config";
import { addDoc , collection, getDocs } from "firebase/firestore";

export const storingUser = async(user)=>{
    try{
        const docRef= await  addDoc(collection(db ,'users'),user);
        console.log(docRef)
    }
    catch(error){
        console.log(error) 
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
