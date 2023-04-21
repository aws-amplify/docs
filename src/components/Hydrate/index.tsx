import React, { useEffect, useState } from 'react';

export default function Hydrate({ children }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  });

  return hydrated ? children : null;
}
