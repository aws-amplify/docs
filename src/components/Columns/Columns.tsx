import { Grid, GridProps } from '@aws-amplify/ui-react';
import classNames from 'classnames';

interface ColumnsProps extends GridProps {
  children?: React.ReactNode;
  columns?: 2 | 3 | 4;
  size?: 'small' | 'medium';
}

export const Columns = ({
  children,
  className,
  columns = 2,
  size = 'medium',
  ...rest
}: ColumnsProps) => {
  return (
    <Grid
      className={classNames(
        'columns',
        `columns--${size}--${columns}`,
        className
      )}
      {...rest}
    >
      {children}
    </Grid>
  );
};
