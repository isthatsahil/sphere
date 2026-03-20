import { useEffect } from "react";

/**
 * Runs an effect exactly once on mount. Use this instead of bare useEffect
 * for external-system sync (DOM setup, subscriptions, third-party widgets).
 * The empty dependency array is intentional — that is the entire point.
 */
export function useMountEffect(effect: () => void | (() => void)) {
  useEffect(effect, []); // eslint-disable-line react-hooks/exhaustive-deps
}
