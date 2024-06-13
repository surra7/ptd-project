import { MutableRefObject, useEffect, useState } from 'react';

export default function useSwipeDirection(calendar: MutableRefObject<HTMLDivElement | null>) {
  const [direction, setDirection] = useState('');
  let initialX: number | null = null;

  function initTouch(e: TouchEvent) {
    initialX = e.changedTouches[0].pageX;
  }

  function initClick(e: MouseEvent) {
    initialX = e.pageX;
  }

  function swipeTouchDirection(e: TouchEvent) {
    if (initialX !== null) {
      const currentX = e.changedTouches[0].pageX;

      const diffX = initialX - currentX;
      initialX = null;

      if (diffX < -10) {
        setDirection('right');
      } else if (diffX > 10) {
        setDirection('left');
      } else {
        setDirection('');
      }
    }
  }

  function swipeMouseDirection(e: MouseEvent) {
    if (initialX !== null) {
      const currentX = e.pageX;

      let diffX = initialX - currentX;
      initialX = null;

      if (diffX < -10) {
        setDirection('right');
      } else if (diffX > 10) {
        setDirection('left');
      } else {
        setDirection('');
      }
    }
  }

  useEffect(() => {
    calendar.current?.addEventListener('touchstart', initTouch);
    calendar.current?.addEventListener('touchend', swipeTouchDirection);
    calendar.current?.addEventListener('mousedown', initClick);
    calendar.current?.addEventListener('mouseup', swipeMouseDirection);
    return () => {
      calendar.current?.removeEventListener('touchstart', initTouch);
      calendar.current?.removeEventListener('touchend', swipeTouchDirection);
      calendar.current?.removeEventListener('mousedown', initClick);
      calendar.current?.removeEventListener('mouseup', swipeMouseDirection);
    };
  }, [initTouch, swipeTouchDirection, initClick, swipeMouseDirection]);

  return { direction, setDirection };
}
