import {useRef, useCallback} from 'react'

export const useDebounce = (callback: any, delay: number) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const debouncedCallback = useCallback((...args) => {
    if(timer.current) {
      clearTimeout(timer.current)
    } 

    timer.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }, [delay, callback])

  return debouncedCallback
}
