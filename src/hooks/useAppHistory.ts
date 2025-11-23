import { useState, useEffect, useCallback } from "react";

interface HistoryEntry {
  timestamp: Date;
  action: string;
  data?: any;
}

export const useAppHistory = (appName: string, maxEntries: number = 50) => {
  const storageKey = `app-history-${appName}`;

  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((entry: any) => ({
          ...entry,
          timestamp: new Date(entry.timestamp),
        }));
      }
    } catch (error) {
      console.error("Failed to load history:", error);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(history));
    } catch (error) {
      console.error("Failed to save history:", error);
    }
  }, [history, storageKey]);

  const addEntry = useCallback((action: string, data?: any) => {
    setHistory((prev) => {
      const newEntry: HistoryEntry = {
        timestamp: new Date(),
        action,
        data,
      };
      const updated = [newEntry, ...prev].slice(0, maxEntries);
      return updated;
    });
  }, [maxEntries]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  const undo = useCallback(() => {
    if (history.length > 0) {
      const [last, ...rest] = history;
      setHistory(rest);
      return last;
    }
    return null;
  }, [history]);

  return { history, addEntry, clearHistory, undo };
};
