import React, { useContext} from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';


const SearchBar = () => {
    
    const {search, setSearch, showSearch, setShowSearch}=useContext(ShopContext);

  if (!showSearch) return null;

  return (
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full sm:w-1/2 ' >
    <input   value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search' />
    <img src={assets.search_icon}  alt="" />
      </div>
      <img  onClick={()=>setShowSearch(false)}  className='inline w-3 cursor-pointer' src={assets.cross_icon} alt="" />
    </div>
  )
}

export default SearchBar;
