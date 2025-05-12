import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./styles/swipeList.module.css";

export default function SwipeList({
  data = [],
  renderItem,
  renderEmpty,
  autoplay = false,
  autoplayInterval = 5000,
  pauseOnHover = true,
  transitionSpeed = 300,
  showArrows = true,
  showDots = true,
  showProgress = true,
  dotColor = "rgba(142, 70, 186, 0.5)",
  dotActiveColor = "rgba(142, 70, 186, 1)",
  dotSize,
  loop = true,
  swipeThreshold = 20,
  ...props
}) {
  // Core state
  const [activeIndex, setActiveIndex] = useState(0);
  const [stage, setStage] = useState("idle"); 
  const [dragInfo, setDragInfo] = useState({ startX: 0, currentX: 0, percentage: 0 });
  const [direction, setDirection] = useState(0); 
  
  // Refs
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const widthRef = useRef(0);
  const autoplayTimerRef = useRef(null);
  const touchStartTimeRef = useRef(0);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const prevIndexRef = useRef(activeIndex);
  
  // Derived state
  const currentItem = data.length > 0 ? data[activeIndex] : null;
  const slidesCount = data.length;
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === slidesCount - 1;
  const canGoNext = loop || !isLast;
  const canGoPrev = loop || !isFirst;

  // Update container width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        widthRef.current = containerRef.current.offsetWidth;
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Track previous index for animation direction
  useEffect(() => {
    prevIndexRef.current = activeIndex;
  }, [activeIndex]);
  
  // Handle autoplay
  useEffect(() => {
    const startAutoplay = () => {
      if (autoplay && stage === "idle" && slidesCount > 1 && canGoNext) {
        clearTimeout(autoplayTimerRef.current);
        autoplayTimerRef.current = setTimeout(() => {
          goToNext();
        }, autoplayInterval);
      }
    };
    
    startAutoplay();
    
    return () => {
      clearTimeout(autoplayTimerRef.current);
    };
  }, [autoplay, stage, activeIndex, autoplayInterval, slidesCount]);

  // Transition to a specific slide
  const goToSlide = useCallback((index, direct = false) => {
    if (stage === "animating" || index === activeIndex || slidesCount <= 1) return;
    
    // Handle looping
    let targetIndex = index;
    if (targetIndex < 0) targetIndex = slidesCount - 1;
    if (targetIndex >= slidesCount) targetIndex = 0;
    
    // Determine direction for animation
    const newDirection = targetIndex > activeIndex ? -1 : 1;
    setDirection(newDirection);
    
    if (direct) {
      // Skip animation
      setActiveIndex(targetIndex);
    } else {
      // Start animation
      setStage("animating");
      
      // After animation completes, update active index
      setTimeout(() => {
        setActiveIndex(targetIndex);
        setDirection(0);
        setStage("idle");
      }, transitionSpeed);
    }
  }, [activeIndex, slidesCount, stage, transitionSpeed]);

  // Navigation helpers
  const goToNext = useCallback(() => {
    if (canGoNext) {
      goToSlide(activeIndex + 1);
    }
  }, [activeIndex, canGoNext, goToSlide]);

  const goToPrev = useCallback(() => {
    if (canGoPrev) {
      goToSlide(activeIndex - 1);
    }
  }, [activeIndex, canGoPrev, goToSlide]);

  // Mouse event handlers
  const handleMouseDown = useCallback((e) => {
    if (slidesCount <= 1) return;
    
    // Prevent default drag behavior
    e.preventDefault();
    
    setStage("dragging");
    const startX = e.clientX;
    setDragInfo({ startX, currentX: startX, percentage: 0 });
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [slidesCount]);

  const handleMouseMove = useCallback((e) => {
    if (stage !== "dragging") return;
    
    const { startX } = dragInfo;
    const currentX = e.clientX;
    const difference = currentX - startX;
    const width = widthRef.current || 1;
    const percentage = (difference / width) * 100;
    
    // Limit drag distance and apply resistance at edges
    let limitedPercentage = percentage;
    if ((isFirst && percentage > 0 && !loop) || (isLast && percentage < 0 && !loop)) {
      limitedPercentage = percentage * 0.4; // Add resistance
    }
    
    setDragInfo(prev => ({ ...prev, currentX, percentage: limitedPercentage }));
  }, [stage, dragInfo, isFirst, isLast, loop]);

  const handleMouseUp = useCallback(() => {
    if (stage !== "dragging") return;
    
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    
    const { percentage } = dragInfo;
    
    // Determine if we should change slide
    if (percentage < -swipeThreshold && canGoNext) {
      goToNext();
    } else if (percentage > swipeThreshold && canGoPrev) {
      goToPrev();
    } else {
      // Reset to current slide
      setDirection(0);
      setStage("idle");
    }
    
    setDragInfo({ startX: 0, currentX: 0, percentage: 0 });
  }, [stage, dragInfo, swipeThreshold, canGoNext, canGoPrev, goToNext, goToPrev]);

  // Touch event handlers
  const handleTouchStart = useCallback((e) => {
    if (slidesCount <= 1) return;
    
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    touchStartTimeRef.current = Date.now();
    
    setStage("dragging");
    setDragInfo({ startX: touch.clientX, currentX: touch.clientX, percentage: 0 });
  }, [slidesCount]);

  const handleTouchMove = useCallback((e) => {
    if (stage !== "dragging") return;
    
    const touch = e.touches[0];
    const { startX } = dragInfo;
    const currentX = touch.clientX;
    const difference = currentX - startX;
    const width = widthRef.current || 1;
    const percentage = (difference / width) * 100;
    
    // Detect vertical scrolling vs horizontal swiping
    const touchStart = touchStartRef.current;
    const xDiff = Math.abs(touch.clientX - touchStart.x);
    const yDiff = Math.abs(touch.clientY - touchStart.y);
    
    // If vertical movement is dominant, exit swipe mode
    if (yDiff > xDiff * 1.5) {
      handleTouchEnd();
      return;
    }
    
    // Limit drag and apply resistance at edges
    let limitedPercentage = percentage;
    if ((isFirst && percentage > 0 && !loop) || (isLast && percentage < 0 && !loop)) {
      limitedPercentage = percentage * 0.4; // Add resistance
    }
    
    setDragInfo(prev => ({ ...prev, currentX, percentage: limitedPercentage }));
    
    // Prevent page scrolling when swiping horizontally
    if (xDiff > 10) {
      e.preventDefault();
    }
  }, [stage, dragInfo, isFirst, isLast, loop]);

  const handleTouchEnd = useCallback(() => {
    if (stage !== "dragging") return;
    
    const { percentage } = dragInfo;
    const touchDuration = Date.now() - touchStartTimeRef.current;
    
    // Detect quick flick gesture (fast swipe)
    const isQuickSwipe = touchDuration < 300 && Math.abs(percentage) > 10;
    
    // Determine if we should change slide
    if ((percentage < -swipeThreshold || (isQuickSwipe && percentage < -10)) && canGoNext) {
      goToNext();
    } else if ((percentage > swipeThreshold || (isQuickSwipe && percentage > 10)) && canGoPrev) {
      goToPrev();
    } else {
      // Reset to current slide
      setDirection(0);
      setStage("idle");
    }
    
    setDragInfo({ startX: 0, currentX: 0, percentage: 0 });
  }, [stage, dragInfo, swipeThreshold, canGoNext, canGoPrev, goToNext, goToPrev]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (slidesCount <= 1) return;
    
    if (e.key === 'ArrowLeft' && canGoPrev) {
      goToPrev();
    } else if (e.key === 'ArrowRight' && canGoNext) {
      goToNext();
    }
  }, [slidesCount, canGoPrev, canGoNext, goToPrev, goToNext]);

  // Calculate transform based on direction and drag
  const getTransform = () => {
    if (stage === "dragging") {
      return `translateX(${dragInfo.percentage}%)`;
    }
    
    if (stage === "animating") {
      return `translateX(${direction * 100}%)`;
    }
    
    return "translateX(0%)";
  };

  // Calculate transition style
  const getTransition = () => {
    if (stage === "dragging") {
      return "none";
    }
    
    if (stage === "animating") {
      return `transform ${transitionSpeed}ms cubic-bezier(0.2, 0, 0.2, 1)`;
    }
    
    return `transform ${transitionSpeed}ms ease`;
  };

  // Pause autoplay on hover
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover && autoplay) {
      clearTimeout(autoplayTimerRef.current);
    }
  }, [pauseOnHover, autoplay]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover && autoplay && stage === "idle" && slidesCount > 1) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = setTimeout(() => {
        goToNext();
      }, autoplayInterval);
    }
  }, [pauseOnHover, autoplay, stage, slidesCount, goToNext, autoplayInterval]);

  return (
    <div 
      className={styles.container}
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      aria-roledescription="carousel"
      aria-label={props.ariaLabel || "Image carousel"}
    >
      <div
        className={styles.swipeContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={sliderRef}
          className={styles.swipeList}
          style={{
            transform: getTransform(),
            transition: getTransition(),
          }}
          aria-live="polite"
        >
          {currentItem ? (
            <div 
              className={styles.slide}
              aria-roledescription="slide"
              aria-label={`${activeIndex + 1} of ${slidesCount}`}
            >
              {renderItem(currentItem, activeIndex)}
            </div>
          ) : (
            <div className={styles.empty} aria-label="No content available">
              {renderEmpty ? renderEmpty() : "No data available"}
            </div>
          )}
        </div>
      </div>
      
      {showDots && slidesCount > 1 && (
        <div className={styles.dots} role="tablist">
          {Array.from({ length: slidesCount }).map((_, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`Slide ${index + 1}`}
              className={`${styles.dot} ${activeIndex === index ? styles.active : ""}`}
              style={{
                backgroundColor: activeIndex === index ? " rgb(var(--q-primary))" : " rgb(var(--q-primary))",
              }}
              onClick={() => goToSlide(index)}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
}
