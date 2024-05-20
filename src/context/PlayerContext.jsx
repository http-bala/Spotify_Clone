import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";


export const PlayerContext = createContext();


const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekbg = useRef();
    const seekbar = useRef();

    const [Track, setTrack] = useState(songsData[0]);
    const [playStatus, setIsPlayStatus] = useState(false);
    const [Time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    });

    const play = () =>{
        audioRef.current.play();
        setIsPlayStatus(true);
    }
    const pause = () =>{
        audioRef.current.pause();
        setIsPlayStatus(false);
    }

    const playwithid = async (id) =>{
        await setTrack(songsData[id])
        await audioRef.current.play();
        setIsPlayStatus(true);
    }

    const previous = async () =>{
        if (Track.id>0) {
            await setTrack(songsData[Track.id-1])
            await audioRef.current.play();
            setIsPlayStatus(true);
        }
    }
    const next = async () =>{
        if (Track.id< songsData.length-1) {
            await setTrack(songsData[Track.id+1])
            await audioRef.current.play();
            setIsPlayStatus(true);
        }
    }

    useEffect(()=>{
        setTimeout(() => {
            audioRef.current.ontimeupdate = () =>{
                seekbar.current.style.width = (audioRef.current.currentTime/audioRef.current.duration)*100 + "%";
                setTime({
                    currentTime:{
                        second:Math.floor(audioRef.current.currentTime % 60),
                        minute:Math.floor(audioRef.current.currentTime/60)
                    },
                    totalTime:{
                        second:Math.floor(audioRef.current.duration % 60),
                        minute:Math.floor(audioRef.current.duration/60)
                    }
                })
            }
        }, 1000);
    })

    const ContextValue = {
        audioRef,
        seekbg,
        seekbar,
        Track,
        setTrack,
        playStatus,
        setIsPlayStatus,
        Time,setTime,
        play,
        pause,
        playwithid,
        previous,
        next,
    }
    return (
        <PlayerContext.Provider value={ContextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}
export default PlayerContextProvider