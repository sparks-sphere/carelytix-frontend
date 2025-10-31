 
 
interface DialogProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

interface DialogHeaderProps {
  children: React.ReactNode;
}

interface DialogTitleProps {
  children: React.ReactNode;
}

 
 
export const Dialog: React.FC<DialogProps> = ({ children, open, onOpenChange }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-[1000px] max-h-[632px] top-[165px] left-[364px] overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export const DialogContent: React.FC<DialogContentProps> = ({ children, className = "" }) => (
  <div className={`relative ${className}`}>
    {children}
  </div>
);


export const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => (
  <div className="flex items-center justify-between p-6 pb-4 border-b-2 bg-[#F5D4FF]">
    {children}
  </div>
);


export const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => (
  <h2 className="text-lg font-semibold text-gray-900">
    {children}
  </h2>
);
