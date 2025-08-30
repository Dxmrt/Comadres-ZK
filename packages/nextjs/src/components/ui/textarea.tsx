import * as React from 'react';
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className = '', ...props }, ref) => (
  <textarea ref={ref} className={['w-full rounded-md border border-comadres-light-alt bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400', className].join(' ')} {...props} />
));
Textarea.displayName = 'Textarea';
export default Textarea;