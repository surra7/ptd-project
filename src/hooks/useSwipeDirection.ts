import { useEffect, useState } from 'react';

export default function useSwipeDirection() {
  let calender: HTMLDivElement | null = null;
  const [direction, setDirection] = useState('');
  let initialX: number | null = null;

  if (typeof document !== 'undefined') {
    calender = document.querySelector('#calender');
  }

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

      if (diffX < -20) {
        setDirection('right');
      } else if (diffX > 20) {
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

      if (diffX < -20) {
        setDirection('right');
      } else if (diffX > 20) {
        setDirection('left');
      } else {
        setDirection('');
      }
    }
  }

  useEffect(() => {
    calender?.addEventListener('touchstart', initTouch);
    calender?.addEventListener('touchend', swipeTouchDirection);
    calender?.addEventListener('mousedown', initClick);
    calender?.addEventListener('mouseup', swipeMouseDirection);
    return () => {
      calender?.removeEventListener('touchstart', initTouch);
      calender?.removeEventListener('touchend', swipeTouchDirection);
      calender?.removeEventListener('mousedown', initClick);
      calender?.removeEventListener('mouseup', swipeMouseDirection);
    };
  }, [initTouch, swipeTouchDirection, initClick, swipeMouseDirection]);

  return { direction, setDirection };
}
