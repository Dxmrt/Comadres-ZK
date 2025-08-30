import * as React from 'react';
const cx = (...a: Array<string|false|undefined|null>) => a.filter(Boolean).join(' ');
export const Badge = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cx('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-comadres-accent/15 text-comadres-dark', className)} {...props} />
);
export default Badge;