import React from "react";
import { Copy, Edit, Trash2, Info, FolderOpen } from "lucide-react";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  items: {
    label: string;
    icon?: any;
    onClick: () => void;
  }[];
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, items }) => {
  React.useEffect(() => {
    const handleClick = () => onClose();
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [onClose]);

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="fixed z-50 glass-effect rounded-lg shadow-window border border-border/50 py-2 min-w-[200px]"
        style={{ left: x, top: y }}
      >
        {items.map((item, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              item.onClick();
              onClose();
            }}
            className="w-full px-4 py-2 text-left hover:bg-muted transition-colors flex items-center gap-3 text-sm"
          >
            {item.icon && <item.icon className="h-4 w-4" />}
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default ContextMenu;
