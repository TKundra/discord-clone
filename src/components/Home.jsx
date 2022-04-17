import React, { useState } from 'react';
import { ChevronDownIcon, PlusIcon, LogoutIcon } from "@heroicons/react/outline";
import { MicrophoneIcon, PhoneIcon, CogIcon } from "@heroicons/react/solid";
import discord from '../assets/discord.png';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, database } from "../firebase-util";
import { Redirect } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
// import { useList } from "react-firebase-hooks/database";
import { ServerIcon, Channel, Chat } from "./index";
// import firebase from 'firebase/compat/app'
// import { ref, get, child } from "firebase/database"

const Home = () => {

    const [user] = useAuthState(auth); // getting user logged-in or not
    const [channels] = useCollection(db.collection("channels")); // accessing channels
    // const dbRef = ref(database);
    // get(child(dbRef, "channels/")).then((snapshot) => {
    //     if(snapshot.exists()){
    //         console.log(snapshot.val())
    //     } else{
    //         console.log("no data")
    //     }
    // })
    // const [snapshots, loading, error] = useList();

    // console.log(loading, snapshots, error)
    function handleAddChannel() {
        const channelName = prompt("Enter a new channel name");
        if (channelName) {
            db.collection("channels").add({
                channel: channelName,
            }); // creating channel
        }
    }

    return (
        <>
            {!user && <Redirect excat to="/" />}
            <div className='flex h-screen'>
                <div className='flex flex-col space-y-3 bg-[#202225] p-3 min-w-max'>
                    <div className='server-default hover:bg-discord-blurple'>
                        <img className='h-6' src={discord} alt='discord' />
                    </div>
                    <hr className='border-gray-700 border w-8 mx-auto' />

                    <ServerIcon image={discord} />
                    <ServerIcon image={discord} />
                    <ServerIcon image={discord} />
                    <ServerIcon image={discord} />

                    <div className="server-default hover:bg-discord-green group">
                        <PlusIcon className="text-discord-green h-7 group-hover:text-white" />
                    </div>
                    {/* group in parent and group-hover, otherwise parent will overflow over icon color */}
                </div>

                <div className='bg-[#2f3136] flex flex-col min-w-max'>
                    <h2 className="flex text-white font-bold text-sm items-center justify-between 
                    border-b border-gray-800 p-4 hover:bg-[#34373C] cursor-pointer">
                        Official Firebase Server <ChevronDownIcon className="h-5 ml-2" />
                    </h2>

                    <div className='flex-grow overflow-y-scroll text-[#8e9297] scrollbar-hide'>
                        <div className='flex items-center p-2 mb-2'>
                            <ChevronDownIcon className='h-3 mr-2' />
                            <h4 className='font-semibold'>Channels</h4>
                            <PlusIcon onClick={handleAddChannel} className='h-5 ml-auto cursor-pointer hover:text-white' />
                        </div>

                        <div className='flex flex-col space-y-2 px-2 mb-2'>
                            {channels?.docs.map((doc, idx) => (
                                <Channel className="mb-14" key={idx} id={doc.id} channel={doc.data().channel} />
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#292b2f] p-2 flex justify-between items-center space-x-8">
                        <div className="flex items-center space-x-1">
                            <img
                                src={user?.photoURL}
                                alt=""
                                className="h-10 rounded-full"
                                onClick={() => auth.signOut()}
                            />
                            <h4 className="text-white text-xs font-medium">
                                {user?.displayName}
                                <span className="text-[#b9bbbe] block">
                                    #{user?.uid.substring(0, 4)}...
                                </span>
                            </h4>
                        </div>
                        <div className="text-gray-400 flex items-center">
                            <div className="hover:bg-[#3A3C43] p-2 rounded-md">
                                <MicrophoneIcon className="h-5 icon " />
                            </div>
                            <div className="hover:bg-[#3A3C43] p-2 rounded-md">
                                <PhoneIcon className="h-5 icon" />
                            </div>
                            <div className="hover:bg-[#3A3C43] p-2 rounded-md">
                                <CogIcon className="h-5 icon" />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="bg-[#36393f] flex-grow">
                    <Chat />
                </div>

            </div>
        </>
    )
}

export default Home;