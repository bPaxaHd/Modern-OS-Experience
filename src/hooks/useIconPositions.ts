import { useState, useCallback } from "react";
import { IconPosition, Position, Size } from "@/types";
import { useLocalStorage } from "./useLocalStorage";

export const useIconPositions = (windowSize: Size) => {
  const [iconPositions, setIconPositions] = useLocalStorage<IconPosition[]>("icon-positions", []);
  const [draggedIcon, setDraggedIcon] = useState<string | null>(null);

  const getIconPosition = useCallback((iconId: string, index: number): Position => {
    const savedPosition = iconPositions.find(p => p.id === iconId)?.position;
    if (savedPosition) return savedPosition;
    
    const iconWidth = 100;
    const iconHeight = 100;
    const padding = 20;

    const safeWidth = Math.max(windowSize.width, iconWidth + padding * 2);
    const availableWidth = safeWidth - padding * 2;
    const iconsPerRow = Math.max(1, Math.floor(availableWidth / iconWidth));

    const row = Math.floor(index / iconsPerRow);
    const col = index % iconsPerRow;
    
    return {
      x: padding + (col * iconWidth),
      y: padding + (row * iconHeight)
    };
  }, [iconPositions, windowSize]);

  const handleDragStart = useCallback((iconId: string) => {
    setDraggedIcon(iconId);
  }, []);

  const handleDrop = useCallback((x: number, y: number) => {
    if (!draggedIcon) return;

    const filtered = iconPositions.filter(p => p.id !== draggedIcon);
    const newPositions = [...filtered, { id: draggedIcon, position: { x, y } }];
    setIconPositions(newPositions);
    setDraggedIcon(null);
  }, [draggedIcon, iconPositions, setIconPositions]);

  return {
    iconPositions,
    draggedIcon,
    getIconPosition,
    handleDragStart,
    handleDrop,
  };
};
