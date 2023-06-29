import { useState, useEffect } from 'react';
import { InnerContainer, OuterContainer } from './styles';

export { Container, InnerContainer, OuterContainer };

// export default Container;

export default function Container({
  children,
  backgroundColor
}: {
  children: any;
  backgroundColor?: string;
}) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <OuterContainer backgroundColor={backgroundColor || null}>
      <InnerContainer backgroundColor={backgroundColor || null}>
        {children}
      </InnerContainer>
    </OuterContainer>
  );
}
