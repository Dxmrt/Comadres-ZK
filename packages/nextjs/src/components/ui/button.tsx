import * as React from 'react';
type Variant = 'default' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'default' | 'lg' | 'icon';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: Variant; size?: Size; }
const cx = (...a: Array<string|false|undefined|null>) => a.filter(Boolean).join(' ');
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant='default', size='default', ...props }, ref) => {
  const base = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variants: Record<Variant,string> = {
    default: 'bg-comadres-accent text-white hover:opacity-90',
    secondary: 'bg-white text-comadres-dark border border-comadres-light-alt hover:bg-gray-50',
    ghost: 'bg-transparent hover:bg-white/10',
    outline: 'border border-comadres-light-alt bg-transparent hover:bg-white/60',
  };
  const sizes: Record<Size,string> = { sm:'h-9 px-3', default:'h-10 px-4', lg:'h-11 px-6', icon:'h-10 w-10 p-0'};
  return <button ref={ref} className={cx(base, variants[variant], sizes[size], className)} {...props} />;
});
Button.displayName = 'Button';
export default Button;