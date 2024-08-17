import { PauseButtonSvg } from "@assets/icons/PauseButtonSvg";
import { PlayButtonSvg } from "@assets/icons/PlayButtonSvg";
import { SpeakerSvg } from "@assets/icons/SpeakerSvg";
import { useStore } from "@nanostores/react";
import { $currentSongFile, $currentSong } from "@stores/current-song";
import { formatTimer } from "@utils/parse-date";
import { useEffect, useRef, useState, type ChangeEvent } from "react";

const Player = () => {
  const currentSongFile = useStore($currentSongFile);
  const currentSong = useStore($currentSong);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // const [isLiked, setIsLiked] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  // const token = localStorage.getItem("token") || "";

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentSongFile) {
      audio.src = URL.createObjectURL(currentSongFile);

      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      };

      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      };
    }
  }, [currentSongFile]);

  // async function toggleLike() {
  //   try {
  //     const apiUrl = isLiked
  //       ? `https://localhost:7066/api/user/unlike-song/${currentSong?.artistName}/${currentSong?.albumName}/${currentSong?.name}`
  //       : `https://localhost:7066/api/user/like-song/${currentSong?.artistName}/${currentSong?.albumName}/${currentSong?.name}`;

  //     const response = await fetch(apiUrl, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "text/plain",
  //         Authorization: "bearer " + token,
  //       },
  //       credentials: "include",
  //     });

  //     if (response.ok) {
  //       setIsLiked((is) => !is);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = Number(e.target.value);
      setCurrentTime(newTime);
      audio.currentTime = newTime;
    }
  };

  function handlePlayPause() {
    audioRef.current?.paused
      ? audioRef.current?.play()
      : audioRef.current?.pause();
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newVolume = Number(e.target.value);
      setVolume(newVolume);
      audio.volume = newVolume;
    }
  };

  if (!currentSongFile) {
    return <></>;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-neutral-600">
      <audio
        ref={audioRef}
        className="pointer-events-none opacity-0"
        controls={false}
        autoPlay
        loop
      />
      <div className="container mx-auto flex max-w-screen-lg items-center gap-4 px-4 py-2">
        <button
          className="rounded-full bg-primary-100 text-primary-600"
          onClick={handlePlayPause}
        >
          {audioRef.current?.paused ? (
            <>
              <PlayButtonSvg className="size-16" />
              <span className="sr-only">Pause</span>
            </>
          ) : (
            <>
              <PauseButtonSvg className="size-16" />
              <span className="sr-only">Play</span>
            </>
          )}
        </button>

        <div className="flex-1">
          <p className="text-lg font-medium">
            <span>{currentSong?.name}</span>
            {/* <div>
              <input
                type="checkbox"
                checked={isLiked}
                onChange={() => toggleLike()}
              />
            </div> */}
          </p>
          <div className="flex gap-4">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleProgressChange}
              className="flex-1 accent-primary-500"
            />
            <span>{formatTimer(currentTime, duration)}</span>
          </div>
        </div>

        <div className="mb-2 mt-auto flex gap-2">
          <div className="flex items-center">
            <SpeakerSvg className="text-lg" />
            <span> {Math.floor(volume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="max-w-16 accent-primary-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
