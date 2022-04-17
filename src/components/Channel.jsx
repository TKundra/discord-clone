import React from 'react';
import { HashtagIcon } from "@heroicons/react/outline";
import { useHistory } from "react-router-dom";
import { setChannelInfo } from "../features/channelSlice";
import { useDispatch } from 'react-redux';

const Channel = ({ id, channel }) => {

    const history = useHistory();
    const dispatch = useDispatch();

    function handleSetChannel() {
        dispatch(
            setChannelInfo({
                channelId: id,
                channelName: channel,
            })
        ); // saving in redux
        history.push(`/channels/${id}`);
    }

    return (
        <div className="font-medium flex items-center cursor-pointer hover:bg-[#3A3C43] p-1 
        rounded-md  hover:text-white" onClick={handleSetChannel}>
            <HashtagIcon className="h-5 mr-2" /> {channel}
        </div>
    )
}

export default Channel;