import { Grid, GridProps } from '@aws-amplify/ui-react';

interface ColumnsProps extends GridProps {
  children: React.ReactNode;
  columns: 2 | 3 | 4;
}

export const Columns = ({ children, columns = 2, ...rest }: ColumnsProps) => {
  return (
    <Grid className={`columns columns--${columns}`} {...rest}>
      {children}
    </Grid>
  );
};
