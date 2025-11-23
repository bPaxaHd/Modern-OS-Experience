import { useState, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

export const useDragAndDrop = () => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragPosition, setDragPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = useCallback((itemId: string, e: React.MouseEvent | React.TouchEvent) => {
    setDraggedItem(itemId);
    setIsDragging(true);
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setDragPosition({ x: clientX, y: clientY });
  }, []);

  const handleDragMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    setDragPosition({ x: clientX, y: clientY });
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setIsDragging(false);
  }, []);

  return {
    draggedItem,
    dragPosition,
    isDragging,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  };
};
