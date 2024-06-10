import { useCallback, useEffect, useRef } from 'react';

export default function useOutsideClick(onClickOutside: () => void) {
  const ref = useRef<HTMLUListElement | null>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const inside = ref.current?.contains?.(event.target as HTMLUListElement);
      if (ref.current && !inside) {
        onClickOutside();
      }
    },
    [onClickOutside, ref],
  );

  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [handleClickOutside]);

  return ref;
}
