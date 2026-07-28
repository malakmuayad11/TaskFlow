import { useEffect } from "react";

export function useToast(
  showToast: boolean,
  setShowToast: (value: boolean) => void,
) {
  useEffect(() => {
    if (!showToast) return;

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, [showToast]);
}
