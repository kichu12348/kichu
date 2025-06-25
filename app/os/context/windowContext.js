import { createContext, useContext, useState, useRef, useEffect } from "react";
const WindowContext = createContext();

export const WindowProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlist, setPlaylist] = useState([
    {
      id: 1,
      title: "Resonance",
      artist: "Home",
      duration: "3:45",
      url: "/music/reso/reso.weba",
      image: "/music/reso/reso.jpg",
    },
  ]);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState("none"); // 'none', 'one', 'all'
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef(null);

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;

      // Audio event listeners
      const audio = audioRef.current;

      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
        setIsLoading(false);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };

      const handleEnded = () => {
        handleTrackEnd();
      };

      const handleCanPlay = () => {
        setIsLoading(false);
      };

      const handleLoadStart = () => {
        setIsLoading(true);
      };

      const handleError = () => {
        setIsLoading(false);
        console.error("Audio loading error");
      };

      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("canplay", handleCanPlay);
      audio.addEventListener("loadstart", handleLoadStart);
      audio.addEventListener("error", handleError);

      return () => {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("canplay", handleCanPlay);
        audio.removeEventListener("loadstart", handleLoadStart);
        audio.removeEventListener("error", handleError);
        audio.pause();
      };
    }
  }, []);

  // Handle track change
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.url;
      setCurrentTime(0);
      setDuration(0);

      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [currentTrack]);

  // Handle play/pause state
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Format time helper
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Play/Pause handler
  const togglePlayPause = () => {
    if (!currentTrack && playlist.length > 0) {
      setCurrentTrack(playlist[0]);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Previous track
  const playPrevious = () => {
    if (!currentTrack) return;
    const currentIndex = playlist.findIndex(
      (track) => track.id === currentTrack.id
    );
    let previousIndex;

    if (isShuffled) {
      previousIndex = Math.floor(Math.random() * playlist.length);
    } else {
      previousIndex = currentIndex > 0 ? currentIndex - 1 : playlist.length - 1;
    }

    setCurrentTrack(playlist[previousIndex]);
    setIsPlaying(true);
  };

  // Next track
  const playNext = () => {
    if (!currentTrack) return;
    const currentIndex = playlist.findIndex(
      (track) => track.id === currentTrack.id
    );
    let nextIndex;

    if (isShuffled) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      nextIndex = currentIndex < playlist.length - 1 ? currentIndex + 1 : 0;
    }

    setCurrentTrack(playlist[nextIndex]);
    setIsPlaying(true);
  };

  // Handle track end
  const handleTrackEnd = () => {
    if (repeatMode === "one") {
      // Repeat current track
      setCurrentTime(0);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(console.error);
      }
    } else if (repeatMode === "all" || playlist.length > 1) {
      // Play next track
      playNext();
    } else {
      // Stop playing
      setIsPlaying(false);
    }
  };

  // Handle track selection
  const selectTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  // Handle progress bar click
  const seekTo = (percentage) => {
    if (audioRef.current && duration > 0) {
      const newTime = (percentage / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Handle progress bar click with event
  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickX = e.nativeEvent.offsetX;
    const width = progressBar.offsetWidth;
    const percentage = (clickX / width) * 100;
    seekTo(percentage);
  };

  // Handle volume change with event
  const handleVolumeChange = (e) => {
    const volumeSlider = e.currentTarget;
    const clickX = e.nativeEvent.offsetX;
    const width = volumeSlider.offsetWidth;
    const newVolume = clickX / width;
    setVolume(Math.max(0, Math.min(1, newVolume)));
  };

  // Set volume directly
  const setVolumeLevel = (level) => {
    setVolume(Math.max(0, Math.min(1, level)));
  };

  // Toggle shuffle
  const toggleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  // Toggle repeat mode
  const toggleRepeat = () => {
    const modes = ["none", "one", "all"];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
  };

  // Initialize first track if none selected
  useEffect(() => {
    if (!currentTrack && playlist.length > 0) {
      setCurrentTrack(playlist[0]);
    }
  }, [currentTrack, playlist]);

  const currentProgress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const volumeProgress = volume * 100;

  return (
    <WindowContext.Provider
      value={{
        // State
        isPlaying,
        setIsPlaying,
        currentTrack,
        setCurrentTrack,
        volume,
        setVolume,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
        playlist,
        setPlaylist,
        isShuffled,
        setIsShuffled,
        repeatMode,
        setRepeatMode,
        isLoading,
        setIsLoading,

        // Computed values
        currentProgress,
        volumeProgress,

        // Audio control functions
        togglePlayPause,
        playPrevious,
        playNext,
        selectTrack,
        seekTo,
        handleProgressClick,
        handleVolumeChange,
        setVolumeLevel,
        toggleShuffle,
        toggleRepeat,
        formatTime,

        // Audio ref
        audioRef,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export const useWindow = () => useContext(WindowContext);
