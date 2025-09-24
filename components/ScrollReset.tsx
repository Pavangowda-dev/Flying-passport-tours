'use client';

import { useEffect } from 'react';

export default function ScrollReset() {
  useEffect(() => {
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return null;
}