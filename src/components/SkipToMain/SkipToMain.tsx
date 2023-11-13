import { Button } from '@aws-amplify/ui-react';

interface SkipToMainProps {
  mainId: string;
}

export const SkipToMain = ({ mainId }: SkipToMainProps) => {
  return (
    <Button size="small" as="a" href={`#${mainId}`} className="skip-to-main">
      Skip to main content
    </Button>
  );
};
