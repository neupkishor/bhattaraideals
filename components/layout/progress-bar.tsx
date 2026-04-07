'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

export function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    // The routeChangeStart event is not available in the App Router,
    // so we'll simulate it by checking for path changes.
    // NProgress.start() will be called on path change.
    handleStart();
    handleStop();

    return () => {
      handleStop();
    };
  }, [pathname, searchParams]);

  // NProgress is managed via side-effects, so this component renders nothing.
  return null;
}
