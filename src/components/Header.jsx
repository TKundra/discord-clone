import React from 'react';
import logo from '../assets/logo.png';
import { MenuIcon } from '@heroicons/react/outline';
import { useHistory } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, provider } from '../firebase-util';

const Header = () => {

  const [user] = useAuthState(auth);
  const history = useHistory();

  function signIn(e){
    e.preventDefault();
    auth.signInWithPopup(provider)
    .then(() => history.push("/channels"))
    .catch((error) => alert("something went wrong"))
  }
  
  return (
    <header className='flex bg-discord-blue items-center justify-between py-4 px-6'>
        <a href='/'>
            <img className='w-30 h-12 object-contain' src={logo} alt='logo' />
        </a>

        <div className='hidden lg:flex space-x-6'>
            <a className="link">Download</a>
            <a className="link">Why Discord?</a>
            <a className="link">Nitro</a>
            <a className="link">Safety</a>
            <a className="link">Support</a>
        </div>

        <div className='flex space-x-4 items-center'>
          <button className='rounded-full p-2 bg-white text-xs md:text-sm 
          px-4 focus:outline-none hover:shadow-2xl transition duration-200
          ease-in-out whitespace-nowrap hover:text-discord-blue'
          onClick={!user ? signIn : () => history.push("/channels")}>
            {!user ? "Login" : "Open Discord"}
          </button>

          <MenuIcon className='text-white h-9 cursor-pointer lg:hidden'/> 
        </div>
        
    </header>
  )
}

export default Header;