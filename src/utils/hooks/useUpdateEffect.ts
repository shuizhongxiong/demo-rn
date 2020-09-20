/**
 * like setState callback
 * example:
 * useUpdateEffect(() => { console.log(state) }, [state])
 */

import {useEffect, useRef} from 'react';

function useUpdateEffect(effect: () => void, deps: any[]) {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default useUpdateEffect;
