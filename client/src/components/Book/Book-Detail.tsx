import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from "axios";
import classes from "./Book-Detail.module.css";
import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom';

interface Book {
  id: string,
  bookName: string,
  isbn: string,
  summary: string,
  userId: string,
  auhtorId: string,
  coverImage: string,
  isAvailable: boolean
}

const BookDetail = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const authToken = Cookies.get("_uj1");
  const params = useParams()
  const id = params.id
  const [book, setBook] = useState<Book>();
  const getSingleBook = async () => {
    try {
      const response = await axios.get(`/books/${id}`, {
        withCredentials: true
      })
      if (response) {
        setBook(response.data['data']);
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onAddToCart = async () => {
    if (authToken) {
      //To do add to cart item
      try {
        setIsLoading(true);
        const response = await axios.post("/add-to-cart", { "id": book?.id }, {
          headers: {
            Authorization: `Bearer ${authToken}`
          },
          withCredentials: true
        })
        if (response) {
          setIsLoading(false)
        }
      } catch (err) {
        console.log(err);
      }

    } else {
      navigate("/signin");
    }
  }

  useEffect(() => {
    getSingleBook();
  }, [onAddToCart,authToken])
  return (
    <div className='h-[90vh] w-[100%]'>
      {
        book ? <div className='h-[100%] w-[100%]  flex font-serif items-center justify-center'>
          <div className={classes["desc-container"]}>
            <img src={book.coverImage} alt={book.bookName} className=' h-[40%] w-[20%] mt-5 object-contain' />
            <div className=' h-[60%] w-[90%] flex flex-col pl-5'>
              <p className=' text-2xl font-bold mt-5'>{book.bookName}</p>
              <p className=' text-md font-semibold mt-2'>ISBN: {book.isbn}</p>
              <p className=' mt-2'>Author: Prabesh Bista</p>
              <p className=' mt-5'>{book.summary}</p>
              {
                isLoading ? <div className='mt-5 text-[white] flex justify-center items-center text-mdfont-semibold bg-[teal] rounded-sm cursor-not-allowed h-[6vh] w-[40%]'>
                  <div className=' animate-spin h-[15px] w-[15px] rounded-full border-white border-t-[1px] border-r-[1px]'></div>
                </div> : authToken ? book.isAvailable ? <button onClick={onAddToCart} className='mt-5 text-[white] flex justify-center items-center text-mdfont-semibold bg-[#3a10e5] rounded-sm cursor-pointer h-[6vh] hover:shadow-lg hover:shadow-black w-[40%] hover:bg-[#3b10e5ce] hover:text-white'>Borrow Book</button> :
                  <button className='mt-5 text-[white] flex justify-center items-center text-mdfont-semibold bg-[#a43434] rounded-sm cursor-not-allowed h-[6vh] w-[40%] disabled:opacity-20  hover:text-white'>Not Available</button> :
                  <NavLink to="/user/signin" className='mt-5 text-[white] flex justify-center items-center bg-[#3a10e5] text-mdfont-semibold hover:bg-[#3b10e5ce] rounded-sm cursor-pointer h-[6vh] w-[40%] disabled:opacity-20  hover:text-white'>Add To Cart</NavLink>
              }
            </div>
          </div>
        </div> : <div>Loading.....</div>
      }
    </div>
  )
}

export default BookDetail