import { Grid, GridProps } from '@aws-amplify/ui-react';
import classNames from 'classnames';

interface ColumnsProps extends Omit<GridProps, 'as'> {
  children?: React.ReactNode;
  columns?: 2 | 3 | 4;
  size?: 'small' | 'medium';
  as?: 'div' | 'ul';
}

export const Columns = ({
  as = 'div',
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
      as={as}
      {...rest}
    >
      {children}
    </Grid>
  );
};
