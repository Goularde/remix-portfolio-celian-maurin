import { useEffect, useState } from "react";

let hasHydrated = false;
export function useIsHydrated() {
  const [isHydrated, setIsHydrated] = useState(hasHydrated);

  useEffect(() => {
    hasHydrated = true;
    setIsHydrated(true);
  }, []);
  return { isHydrated };
}
