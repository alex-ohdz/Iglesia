import { useEffect, useMemo, useRef, useState } from "react";

const useIntersectionObserver = <T extends Element = Element>(
  options?: IntersectionObserverInit,
) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T | null>(null);

  const root = options?.root ?? null;
  const rootMargin = options?.rootMargin;
  const rawThreshold = options?.threshold;

  const thresholdKey = useMemo(() => {
    if (rawThreshold === undefined) {
      return "";
    }

    if (Array.isArray(rawThreshold)) {
      return rawThreshold.join("|");
    }

    return rawThreshold.toString();
  }, [rawThreshold]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const thresholdValue =
      thresholdKey === ""
        ? undefined
        : thresholdKey.includes("|")
          ? thresholdKey.split("|").map((value) => Number(value))
          : Number(thresholdKey);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { root, rootMargin, threshold: thresholdValue },
    );

    const currentElement = ref.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      observer.disconnect();
    };
  }, [root, rootMargin, thresholdKey]);

  return [ref, isVisible] as const;
};

export default useIntersectionObserver;
