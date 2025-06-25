import React from "react";
import {
  AiOutlinePause,
  AiOutlineStepBackward,
  AiOutlineStepForward,
  AiOutlineSound,
} from "react-icons/ai";
import { IoPlayOutline } from "react-icons/io5";
import { IoMusicalNotesOutline, IoShuffleOutline, IoRepeatOutline } from "react-icons/io5";
import { useWindow } from "../context/windowContext";
import styles from "./music-player.module.css";
import Image from "next/image";

function MusicPlayer() {
  const {
    // State
    isPlaying,
    currentTrack,
    playlist,
    isShuffled,
    repeatMode,
    isLoading,
    
    // Computed values
    currentProgress,
    volumeProgress,
    currentTime,
    duration,
    
    // Functions
    togglePlayPause,
    playPrevious,
    playNext,
    selectTrack,
    handleProgressClick,
    handleVolumeChange,
    toggleShuffle,
    toggleRepeat,
    formatTime,
  } = useWindow();

  return (
    <div className={styles.musicPlayer}>
      {/* Now Playing Section */}
      <div className={styles.nowPlaying}>
        <div className={styles.albumArt}>
          {currentTrack?.image ? (
            <Image
              src={currentTrack.image}
              alt={`${currentTrack.title} album art`}
              width={160}
              height={160}
              className={styles.albumImage}
              unoptimized
            />
          ) : (
            <IoMusicalNotesOutline className={styles.albumIcon} />
          )}
        </div>
        
        {currentTrack && (
          <div className={styles.trackInfo}>
            <h2 className={styles.trackTitle}>{currentTrack.title}</h2>
            <p className={styles.artistName}>{currentTrack.artist}</p>
          </div>
        )}

        {/* Progress Bar */}
        <div className={styles.progressSection}>
          <div className={styles.progressBar} onClick={handleProgressClick}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${currentProgress}%` }}
            />
          </div>
          <div className={styles.timeDisplay}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <button className={styles.controlButton} onClick={playPrevious}>
            <AiOutlineStepBackward className={styles.controlIcon} />
          </button>
          
          <button 
            className={styles.playButton} 
            onClick={togglePlayPause}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className={styles.spinner}>⟳</div>
            ) : isPlaying ? (
              <AiOutlinePause className={styles.playIcon} />
            ) : (
              <IoPlayOutline className={styles.playIcon} />
            )}
          </button>
          
          <button className={styles.controlButton} onClick={playNext}>
            <AiOutlineStepForward className={styles.controlIcon} />
          </button>
        </div>

        {/* Volume Control */}
        <div className={styles.volumeSection}>
          <AiOutlineSound className={styles.volumeIcon} />
          <div className={styles.volumeSlider} onClick={handleVolumeChange}>
            <div 
              className={styles.volumeFill} 
              style={{ width: `${volumeProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Playlist Section */}
      <div className={styles.playlist}>
        <div className={styles.playlistHeader}>
          <h3 className={styles.playlistTitle}>Playlist</h3>
          <div className={styles.playlistActions}>
            <button 
              className={`${styles.actionButton} ${isShuffled ? styles.active : ''}`}
              onClick={toggleShuffle}
            >
              <IoShuffleOutline />
            </button>
            <button 
              className={`${styles.actionButton} ${repeatMode !== 'none' ? styles.active : ''}`}
              onClick={toggleRepeat}
            >
              <IoRepeatOutline />
            </button>
          </div>
        </div>

        <div className={styles.trackList}>
          {playlist.map((track, index) => (
            <div
              key={track.id}
              className={`${styles.trackItem} ${currentTrack?.id === track.id ? styles.active : ''}`}
              onClick={() => selectTrack(track)}
            >
              <span className={styles.trackNumber}>
                {currentTrack?.id === track.id && isPlaying ? (
                  <AiOutlineSound />
                ) : (
                  index + 1
                )}
              </span>
              <div className={styles.trackDetails}>
                <h4 className={styles.trackName}>{track.title}</h4>
                <p className={styles.trackArtist}>{track.artist}</p>
              </div>
              <span className={styles.trackDuration}>{track.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
