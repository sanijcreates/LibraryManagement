import { NavLink } from "react-router-dom"
import { ImLibrary } from "react-icons/im"
import {useState,useEffect} from "react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import {BiRightArrow,BiDownArrow} from "react-icons/bi"

const AdminNavBar = () => {
    const navigate=useNavigate();
    const authenticatedCookie=Cookies.get("_aj1");
    const [isScrolled,setScrolled]=useState(false);
    const [isClicked,setIsClicked]=useState(false);

    const changeNavBarColor=()=>{
        if(window.scrollY>=10){
            setScrolled(true);
        }else{
            setScrolled(false);
        }
    }

    const logoutHandler=async()=>{
                Cookies.remove("_aj1");
                Cookies.remove("preferences")
                navigate("/admin");
        
    }

    useEffect(()=>{

    },[authenticatedCookie])

    window.addEventListener("scroll",changeNavBarColor);

    return (
        <div className={'font-sans h-[100vh] w-[20%] bg-[#14213D] flex-col justify-between sticky top-0 z-50 transition-all select-none'}>
            <NavLink to={"/"} className='h-[20%] w-[100%] flex flex-col  items-center cursor-pointer'>
                <div className='h-[100%] w-[100%] text-left justify-center flex flex-col items-center border-b-2 border-white'>
                    <ImLibrary className='text-[white] text-2xl' />
                    <p className='text-sm text-[white] font-bold font-sans'>My Library</p>
                </div>
            </NavLink>
            <div className='h-[80%] w-[100%] flex flex-col justify-around items-center'>
                <NavLink to={"/admin"} className='text-[white] w-[80%]'>
                    {/* <IoBookSharp/> */}
                    <p className=' ml-1 hover:text-[#4A6581] font-bold cursor-pointer'>Dashboard</p>
                </NavLink>
                <NavLink to={"/admin/users"} className='text-[white] w-[80%] '>
                    {/* <IoBookSharp/> */}
                    <p className=' ml-1 hover:text-[#4A6581] font-bold cursor-pointer'>Users</p>
                </NavLink>
                <div 
                 className='text-[white] w-[80%]'>
                    {/* <IoBookSharp/> */}
                    <p onClick={
                    ()=>{
                        setIsClicked(prevData=>!prevData)
                    }} className='group ml-1 hover:text-[#4A6581] font-bold cursor-pointer flex flex-row items-center'>
                        Books
                        <BiRightArrow className={isClicked?" transition-transform delay-150 rotate-90 ml-2":" ml-2 transition-all delay-150"}/>
                        </p>
                    <div className={isClicked?" flex flex-col transition-all delay-150   w-[100%]":" hidden transition-all delay-150"}>
                        <NavLink to={"/admin/books"} className=" h-[20%] w-[100%] flex justify-center items-center rounded-sm bg-red-500 font-bold">All Books</NavLink>
                        <NavLink to={"/admin/books/create"} className=" h-[20%] w-[100%] flex justify-center items-center rounded-sm bg-red-500 mt-2 font-bold">Add Book</NavLink>
                    </div>
                </div>
                <div onClick={logoutHandler} className='text-[white] flex justify-center items-center text-lg font-semibold bg-[#3a10e5] rounded-sm cursor-pointer h-[10%] w-[80%] hover:bg-[#4b3b8ece] hover:text-white'>
                    {/* <BiLogIn/> */}
                    <p className=' ml-1'>LogOut</p>
                </div>
            </div>
        </div>
    )
}

export default AdminNavBar