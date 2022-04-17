import React, { useEffect, useState } from 'react';
import { HashtagIcon, SearchIcon } from "@heroicons/react/outline";
import {
    BellIcon,
    ChatIcon,
    UsersIcon,
    InboxIcon,
    QuestionMarkCircleIcon,
    PlusCircleIcon,
    GiftIcon,
    EmojiHappyIcon,
} from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "../features/channelSlice";
import { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase-util";
import firebase from "firebase/compat/app";
import { Message } from "./index";
import EmojiPicker from 'emoji-picker-react';

const Chat = () => {
    const [pick, setPick] = useState(false);
    const [filtered, setFiltered] = useState([]);
    const channelId = useSelector(selectChannelId);
    const channel = useSelector(selectChannelName);
    const [user] = useAuthState(auth);
    const inputRef = useRef("");
    const chatRef = useRef(null);

    useEffect(()=>{
        setFiltered([]);
    }, [channelId])

    const scrollToBottom = () => {
        chatRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const [messages] = useCollection(
        channelId &&
        db.collection("channels").doc(channelId)
            .collection("messages")
            .orderBy("timestamp", "asc")
    );

    const sendMessage = (e) => {
        setPick(false);
        e.preventDefault();
        if (inputRef.current.value !== "") {
            db.collection("channels").doc(channelId).collection("messages").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: inputRef.current.value,
                name: user?.displayName,
                photoURL: user?.photoURL,
                email: user?.email,
            });
        }
        inputRef.current.value = "";
        scrollToBottom();
    };

    function handleEmojiSelect(e, o){
        inputRef.current.value += o.emoji
    }

    function handleFilter(e){
        setFiltered(
            messages?.docs.filter((doc,idx) => doc.data().message.includes(e.target.value)).map((data, idx) => data.data())
        );
    }

    return (
        <div className='flex flex-col h-screen'>
            <header className='flex items-center justify-between space-x-5 border-b border-gray-800 p-4 -mt-1'>
                <div className='flex items-center space-x-1'>
                    <HashtagIcon className='h-6 text-[#72767d]' />
                    <h4 className="text-white font-semibold">{channel}</h4>
                </div>

                <div className="flex space-x-3">
                    <BellIcon className="icon" />
                    <ChatIcon className="icon" />
                    <UsersIcon className="icon" />
                    <div className="flex bg-[#202225] text-xs p-1 rounded-md">
                        <input
                            type="text"
                            onChange={handleFilter}
                            placeholder="Search"
                            className="bg-[#202225] focus:outline-none text-white pl-1 placeholder-[#72767d]"
                        />
                        <SearchIcon className="h-4 text-[#72767d] mr-1" />
                    </div>
                    <InboxIcon className="icon" />
                    <QuestionMarkCircleIcon className="icon" />
                </div>
            </header>

            <main className='flex-grow overflow-y-scroll scrollbar-hide'>
                {filtered && filtered.map((doc, idx) => {
                    const { message, timestamp, name, photoURL, email } = doc;
                    return (
                        <Message id={doc.id} message={message} timestamp={timestamp} 
                        name={name} photoURL={photoURL} email={email} />
                    );
                })}
                {filtered.length === 0 && messages && messages?.docs.map((doc, idx) => {
                    const { message, timestamp, name, photoURL, email } = doc.data();
                    return (
                        <Message id={doc.id} message={message} timestamp={timestamp} 
                        name={name} photoURL={photoURL} email={email} />
                    );
                })}
                {filtered.length === 0 && messages?.docs.length === 0 && (
                    <span className='text-sm text-[#dcddde] flex mt-4 items-center justify-center'>
                        no messages
                    </span>
                )}
            </main>

            {pick && <span className='absolute right-5 bottom-[72px]'>
                <EmojiPicker onEmojiClick={handleEmojiSelect}
                disableSearchBar={true}
                pickerStyle={{boxShadow: 'none', height: '260px', border: 'none'}} />
            </span>}
            <div className="flex items-center p-2.5 bg-[#40444b] mx-5 mb-5 rounded-lg">
                <PlusCircleIcon className="icon mr-4" />
                <form className="flex-grow">
                    <input
                        type="text"
                        disabled={!channelId}
                        placeholder={
                            channelId ? `Message #${channel}` : "Select a channel"
                        }
                        className="bg-transparent focus:outline-none text-[#dcddde] w-full placeholder-[#72767d] text-sm"
                        ref={inputRef}
                    />
                    <button hidden type="submit" onClick={sendMessage}>
                        Send
                    </button>
                </form>
                <GiftIcon className="icon mr-2" />
                <EmojiHappyIcon className={`icon ${pick && 'text-white hover:text-white'}`} onClick={() => setPick(!pick)} />
            </div>

        </div>
    )
}

export default Chat;