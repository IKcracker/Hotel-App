import { collection,addDoc, getDocs , deleteDoc,updateDoc, doc, getDoc} from "firebase/firestore";
import { db } from "../Firebase/config";
import { toast } from "react-toastify";



export const addBookings = async(data)=>{

    const ref = collection(db ,'/booking')
 
    try{
        const res = await addDoc(ref,{...data})
       return res
    }
    catch(error)
    {
        return error.message
    }
    
}


export const getBookings =async (type)=>{
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
export const deleteBookings = async (id , category)=>{
    try{
        
        deleteDoc(doc(db,`/${category}` , id))
    }
    catch(error)
    {
        toast(error.message)
    }
     
}
export const updateBookings = async (id , category ,data)=>{
   try {
       await updateDoc(doc(db ,`${category}` , id),data)
   } catch (error) {
    toast(error.message)
   }
}
export const get = async (category , id)=>{
    try{
        const res = await getDoc(doc(db,`/booking` , id))
        return res.data()
    }
    catch(error)
    {
        toast(error.message)
    }
    
}