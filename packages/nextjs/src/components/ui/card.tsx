import * as React from 'react';
const cx = (...a: Array<string|false|undefined|null>) => a.filter(Boolean).join(' ');
export const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cx('rounded-xl border border-comadres-light-alt bg-white/90 text-comadres-dark shadow-center', className)} {...props} />
);
export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cx('p-4', className)} {...props} />
);
export const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cx('text-lg font-semibold', className)} {...props} />
);
export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cx('p-4 pt-0', className)} {...props} />
);
export default Card;