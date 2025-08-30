'use client';
import * as React from 'react';
type DialogProps = React.HTMLAttributes<HTMLDivElement> & { open?: boolean; onOpenChange?: (v: boolean) => void };
export const Dialog: React.FC<DialogProps> = ({ open=false, children }) => { if (!open) return null; return <>{children}</>; };
export const DialogContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className='', ...p }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className={['bg-white rounded-xl shadow-xl max-w-lg w-full m-4', className].join(' ')} {...p} />
  </div>
);
export const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className='', ...p }) => <div className={['p-4 border-b border-gray-100', className].join(' ')} {...p} />;
export const DialogTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className='', ...p }) => <h3 className={['text-lg font-semibold', className].join(' ')} {...p} />;
export default Dialog;