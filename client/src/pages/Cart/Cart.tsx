import Cookies from 'js-cookie'
import React, { useCallback, useEffect, useState } from 'react'
import loginImg from "../../Assets/login-cart.svg";
import emptyBookImage from "../../Assets/empty-book.svg";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import classes from "./Cart.module.css";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartPage = () => {

  //Toast to notify the User
  const notify=({error}:{error:boolean})=>{
    if(error){
      toast.error('Could not return the Item from the Cart')
    }else{
      toast.success("Sucessfully Returned the Book!")
    }
  }


  const authToken = Cookies.get('_uj1')
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRemove, setIsLoadingRemove] = useState(false)

  const removeItem = async (id: string) => {

    if (authToken) {
      try {
        setIsLoadingRemove(true);
        const response = await axios.get(`/remove/${id}`,{
          headers:{
            Authorization:`Bearer ${authToken}`
          }
        });
        if (response) {
          notify({error:false})
          setIsLoadingRemove(false);
        } else {
          notify({error:true})
        }
      } catch (err) {
        notify({error:true})
      }
    }
  }

  const fetchCartItem = useCallback(async () => {
    if (authToken) {
      try {
        const response = await axios.get("/cart-items",{
          headers:{
            Authorization:`Bearer ${authToken}`
          }
        });
        if (response) {
          setIsLoading(false);
          setData(response.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [])

  useEffect(() => {
    fetchCartItem()
  }, [removeItem])

  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} closeButton={true} closeOnClick={true} draggable={false} pauseOnHover={false} autoClose={3000} limit={5} />
      {authToken ? <div className=' min-h-[90vh] bg-[#fff0e5] pb-5 w-[100%] flex justify-center flex-col items-center'>
        {
          isLoading ? <div className=' h-[100px] w-[100px] rounded-full border-t-[4px] border-r-[4px] border-l-[4px]  border-[#3a10e5] animate-spin'></div> : data.length == 0 ? <div className=' h-[90vh] w-[100%] flex flex-col justify-center items-center'>
            <img src={emptyBookImage} className=' h-[30%] w-[40%] object-contain' alt="empty cart" />
            <div className='text-md mt-5 text-[#10162f] font-bold font-sans'>Oops! You have not borrowed any books.</div>

          </div> : data.map((item: any) => {
            return <div key={item.id} className={classes.box}>
              <img src={item.book.coverImage} alt={item.book.bookName} className=' h-[90%] w-[30%] object-contain' />
              <div className=' h-[90%] w-[60%] flex flex-col'>
                <h1 className=' text-xl font-bold'>{item.book.bookName}</h1>
                <p className=' text-sm text-gray-800 mt-2'><span className='font-bold'>ISBN:</span> {item.book.isbn}</p>
                <p className='text-sm text-gray-800 mt-2  w-[100%] line-clamp-2 overflow-hidden text-clip'><span className='font-bold'>Summary:</span> {item.book.summary}</p>
                {
                  isLoadingRemove ? <div className='mt-5 text-[white] flex justify-center items-center text-mdfont-semibold bg-[teal] rounded-sm cursor-not-allowed h-[6vh] w-[40%]'>
                    <div className=' animate-spin h-[15px] w-[15px] rounded-full border-white border-t-[1px] border-r-[1px]'>

                    </div>
                  </div> : <button onClick={() => {
                    removeItem(item.id)
                  }} className=' mt-5 border-none h-[20%] w-[40%] bg-[#3a10e5] text-[white] hover:bg-[#3b10e5ce] flex justify-center items-center font-bold'>Return </button>
                }
              </div>
            </div>
          })
        }

      </div> : <div className=' h-[90vh] w-[100%] flex justify-center flex-col items-center'>
        <div className='h-[40%] w-[30%]'>
          <img className=' h-[100%] w-[100%] object-contain' src={loginImg} alt="Login Image" />
        </div>
        <NavLink to={"/signin"} className='h-[10%] w-[20%] bg-[#3a10e5] mt-5 text-white flex justify-center items-center text-lg font-semibold hover:bg-[#3b10e5ce] hover:text-white cursor-pointer'>SignIn</NavLink>
      </div>}
    </>
  )
}

export default CartPage