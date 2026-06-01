import { useState, useEffect } from 'react';
import Link from 'next/link';

const DISMISSED_KEY = 'gen2-maintenance-banner-dismissed';

export const Gen2MaintenanceBanner = () => {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    // Only show the banner if the user has NOT previously dismissed it
    const wasDismissed = localStorage.getItem(DISMISSED_KEY);
    if (!wasDismissed) {
      setDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem(DISMISSED_KEY, '1');
  };

  if (dismissed) return null;

  return (
    <div className="gen2-maintenance-banner">
      <span className="gen2-maintenance-banner__badge">Notice</span>
      <span className="gen2-maintenance-banner__text">
        Amplify Gen 1 has entered maintenance mode and will reach end of life
        on May 1, 2027. If you are using Gen 1, a{' '}
        <Link
          href="https://docs.amplify.aws/react/start/migrate-to-gen2/"
          className="gen2-maintenance-banner__link"
        >
          migration guide and tooling
        </Link>{' '}
        are available to help you upgrade to Gen 2.
      </span>
      <button
        className="gen2-maintenance-banner__close"
        onClick={handleDismiss}
        aria-label="Dismiss maintenance banner"
        type="button"
      >
        ✕
      </button>
    </div>
  );
};
