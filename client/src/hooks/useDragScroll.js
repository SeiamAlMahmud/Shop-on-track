import { useState, useEffect } from 'react';

const useDragScroll = (ref) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    if (!ref?.current) return; // Ensure ref is valid

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

    const current = ref.current;

    // Attach events for desktop
    current.addEventListener('mousedown', onMouseDown);
    current.addEventListener('mousemove', onMouseMove);
    current.addEventListener('mouseup', onMouseUp);
    current.addEventListener('mouseleave', onMouseLeave);

    // Clean up events
    return () => {
      current.removeEventListener('mousedown', onMouseDown);
      current.removeEventListener('mousemove', onMouseMove);
      current.removeEventListener('mouseup', onMouseUp);
      current.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isMouseDown, startX, scrollLeft, ref]);

  // For touch devices
  useEffect(() => {
    if (!ref?.current) return; // Ensure ref is valid

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

    const current = ref.current;

    // Attach touch events for mobile devices
    current.addEventListener('touchstart', onTouchStart);
    current.addEventListener('touchmove', onTouchMove);
    current.addEventListener('touchend', onTouchEnd);

    // Clean up touch events
    return () => {
      current.removeEventListener('touchstart', onTouchStart);
      current.removeEventListener('touchmove', onTouchMove);
      current.removeEventListener('touchend', onTouchEnd);
    };
  }, [isMouseDown, startX, scrollLeft, ref]);
};

export default useDragScroll;
