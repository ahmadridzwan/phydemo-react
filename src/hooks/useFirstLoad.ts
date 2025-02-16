import { useState, useEffect } from 'react';

const isFirstLoadMap = new Map<string, boolean>();

export const useFirstLoad = (key: string) => {
  const [isFirstLoad] = useState(() => {
    return !isFirstLoadMap.has(key);
  });

  useEffect(() => {
    if (isFirstLoad) {
      isFirstLoadMap.set(key, true);
    }
  }, [isFirstLoad, key]);

  return isFirstLoad;
};
