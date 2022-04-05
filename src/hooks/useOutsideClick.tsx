import React from 'react';

export const useOutsideClick = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  callback?: () => void
) => {
  React.useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as HTMLDivElement))
        return;
      callback && callback();
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  });
};
