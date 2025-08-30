import * as React from 'react';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = '', ...props }, ref) => (
  <input ref={ref} className={['w-full rounded-md border border-comadres-light-alt bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400', className].join(' ')} {...props} />
));
Input.displayName = 'Input';
export default Input;