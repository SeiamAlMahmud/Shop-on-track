import { useState, useEffect } from 'react';

const useDragScroll = (ref) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const onMouseDown = (e) => {
      setIsMouseDown(true);
      setStartX(e.clientX);
      setScrollLeft(ref.current.scrollLeft);
    };

    const onMouseMove = (e) => {
      if (!isMouseDown) return;
      const x = e.clientX - startX;
      ref.current.scrollLeft = scrollLeft - x;
    };

    const onMouseUp = () => {
      setIsMouseDown(false);
    };

    const onMouseLeave = () => {
      setIsMouseDown(false);
    };

    // Attach events for desktop
    ref.current.addEventListener('mousedown', onMouseDown);
    ref.current.addEventListener('mousemove', onMouseMove);
    ref.current.addEventListener('mouseup', onMouseUp);
    ref.current.addEventListener('mouseleave', onMouseLeave);

    // Clean up events
    return () => {
      ref.current.removeEventListener('mousedown', onMouseDown);
      ref.current.removeEventListener('mousemove', onMouseMove);
      ref.current.removeEventListener('mouseup', onMouseUp);
      ref.current.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isMouseDown, startX, scrollLeft, ref]);

  // For touch devices
  useEffect(() => {
    const onTouchStart = (e) => {
      setIsMouseDown(true);
      setStartX(e.touches[0].clientX);
      setScrollLeft(ref.current.scrollLeft);
    };

    const onTouchMove = (e) => {
      if (!isMouseDown) return;
      const x = e.touches[0].clientX - startX;
      ref.current.scrollLeft = scrollLeft - x;
    };

    const onTouchEnd = () => {
      setIsMouseDown(false);
    };

    // Attach touch events for mobile devices
    ref.current.addEventListener('touchstart', onTouchStart);
    ref.current.addEventListener('touchmove', onTouchMove);
    ref.current.addEventListener('touchend', onTouchEnd);

    // Clean up touch events
    return () => {
      ref.current.removeEventListener('touchstart', onTouchStart);
      ref.current.removeEventListener('touchmove', onTouchMove);
      ref.current.removeEventListener('touchend', onTouchEnd);
    };
  }, [isMouseDown, startX, scrollLeft, ref]);
};

export default useDragScroll;
