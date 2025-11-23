import React, { memo } from "react";
import AppIcon from "./AppIcon";

interface App {
  id: string;
  name: string;
  icon: any;
  color: string;
}

interface VirtualAppGridProps {
  apps: App[];
  onAppOpen: (appName: string) => void;
  containerWidth: number;
  containerHeight: number;
}

const VirtualAppGrid = memo(({ apps, onAppOpen, containerWidth, containerHeight }: VirtualAppGridProps) => {
  const columnCount = 4;
  const rowHeight = 120;
  const [visibleRange, setVisibleRange] = React.useState({ start: 0, end: 12 });
  
  const handleScroll = React.useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const visibleRows = Math.ceil(containerHeight / rowHeight);
    const startRow = Math.floor(scrollTop / rowHeight);
    const startIndex = Math.max(0, (startRow - 1) * columnCount);
    const endIndex = Math.min(apps.length, (startRow + visibleRows + 1) * columnCount);
    
    setVisibleRange({ start: startIndex, end: endIndex });
  }, [containerHeight, apps.length, columnCount, rowHeight]);
  
  const totalHeight = Math.ceil(apps.length / columnCount) * rowHeight;
  
  return (
    <div 
      className="h-full overflow-auto" 
      onScroll={handleScroll}
      style={{ 
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain'
      }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div className="grid grid-cols-4 gap-4 pb-8">
          {apps.map((app, index) => {
            const isVisible = index >= visibleRange.start && index < visibleRange.end;
            if (!isVisible) {
              return <div key={app.id} style={{ height: rowHeight }} />;
            }
            
            return (
              <AppIcon
                key={app.id}
                name={app.name}
                icon={app.icon}
                color={app.color}
                onClick={() => onAppOpen(app.name)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
});

VirtualAppGrid.displayName = "VirtualAppGrid";

export default VirtualAppGrid;
