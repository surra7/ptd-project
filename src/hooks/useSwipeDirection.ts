import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

export default function useSwipeDirection(calendar: MutableRefObject<HTMLDivElement | null>) {
  const [direction, setDirection] = useState('');
  const initialX = useRef<number | null>(null);

  const initTouch = useCallback((e: TouchEvent) => {
    initialX.current = e.changedTouches[0].pageX;
  }, []);

  const initClick = useCallback((e: MouseEvent) => {
    initialX.current = e.pageX;
  }, []);

  const swipeTouchDirection = useCallback((e: TouchEvent) => {
    if (initialX.current !== null) {
      const currentX = e.changedTouches[0].pageX;

      const diffX = initialX.current - currentX;
      initialX.current = null;

      if (diffX < -10) {
        setDirection('right');
      } else if (diffX > 10) {
        setDirection('left');
      } else {
        setDirection('');
      }
    }
  }, []);

  const swipeMouseDirection = useCallback((e: MouseEvent) => {
    if (initialX.current !== null) {
      const currentX = e.pageX;

      let diffX = initialX.current - currentX;
      initialX.current = null;

      if (diffX < -10) {
        setDirection('right');
      } else if (diffX > 10) {
        setDirection('left');
      } else {
        setDirection('');
      }
    }
  }, []);

  useEffect(() => {
    let calendarRefCurrent = calendar.current;
    calendar.current?.addEventListener('touchstart', initTouch);
    calendar.current?.addEventListener('touchend', swipeTouchDirection);
    calendar.current?.addEventListener('mousedown', initClick);
    calendar.current?.addEventListener('mouseup', swipeMouseDirection);
    return () => {
      calendarRefCurrent?.removeEventListener('touchstart', initTouch);
      calendarRefCurrent?.removeEventListener('touchend', swipeTouchDirection);
      calendarRefCurrent?.removeEventListener('mousedown', initClick);
      calendarRefCurrent?.removeEventListener('mouseup', swipeMouseDirection);
      calendarRefCurrent = null;
    };
  }, [calendar, initTouch, swipeTouchDirection, initClick, swipeMouseDirection]);

  return { direction, setDirection };
}
