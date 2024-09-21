import { collection,addDoc, getDocs , deleteDoc,updateDoc, doc, getDoc} from "firebase/firestore";
import { db } from "../Firebase/config";
import { toast } from "react-toastify";



export const addRooms = async(data)=>{

    const ref = collection(db ,data.category)

    try{
        const res = await addDoc(ref,{...data , rating:[]})
        return res
    }
    catch(error)
    {
       return error.message
    }
    
    
    return res
}


export const getRooms =async (type)=>{
    const ref = collection(db ,type)

    try{
        const res = await getDocs(ref);
        let data= res.docs.map(doc => { 
         const info = doc.data();
          return  {...info ,"id":doc.id}
        })
       return data
    }
    catch(error)
    {
        toast(error.message)
    }
}
export const deleteRoom = async (id , category)=>{
    try{
        
        deleteDoc(doc(db,`/${category}` , id))
    }
    catch(error)
    {
        toast(error.message)
    }
     
}
export const update = async (id , category ,data)=>{
   try {
       await updateDoc(doc(db ,`${category}` , id),data)
   } catch (error) {
      toast(error.message)
   }
}
export const getRoom = async (category , id)=>{
    try{
        const res = await getDoc(doc(db,`/${category}` , id))
        return res.data()
    }
    catch(error)
    {
        toast(error.message)
    }
    
}