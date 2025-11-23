import React, { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCw, Home, Globe, Star, Menu, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface Tab {
  id: string;
  url: string;
  title: string;
}

const UnifiedBrowser = () => {
  const isMobile = useIsMobile();
  const [tabs, setTabs] = useState<Tab[]>([
    { id: "1", url: "https://www.youtube.com", title: "YouTube" }
  ]);
  const [activeTabId, setActiveTabId] = useState("1");
  const [url, setUrl] = useState("https://www.youtube.com");
  const [inputUrl, setInputUrl] = useState("https://www.youtube.com");
  const [bookmarkedUrls, setBookmarkedUrls] = useState<Set<string>>(new Set());
  const [history, setHistory] = useState<string[]>(["https://www.youtube.com"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [loadError, setLoadError] = useState(false);
  
  const activeTab = tabs.find(t => t.id === activeTabId);

  const quickAccess = [
    { id: 1, name: "YouTube", url: "https://www.youtube.com", icon: "▶️" },
    { id: 2, name: "GitHub", url: "https://github.com", icon: "🐙" },
    { id: 3, name: "Twitter", url: "https://twitter.com", icon: "🐦" },
    { id: 4, name: "Reddit", url: "https://reddit.com", icon: "🔥" },
  ];

  const popularSites = [
    { id: 1, name: "Gmail", url: "https://mail.google.com", color: "bg-red-500" },
    { id: 2, name: "Twitter", url: "https://twitter.com", color: "bg-blue-500" },
    { id: 3, name: "LinkedIn", url: "https://linkedin.com", color: "bg-blue-700" },
    { id: 4, name: "Reddit", url: "https://reddit.com", color: "bg-orange-500" },
    { id: 5, name: "Amazon", url: "https://amazon.com", color: "bg-yellow-600" },
    { id: 6, name: "Wikipedia", url: "https://wikipedia.org", color: "bg-gray-700" },
  ];

  const handleNavigate = (newUrl: string) => {
    if (!newUrl) return;
    
    if (!newUrl.startsWith("http://") && !newUrl.startsWith("https://")) {
      if (newUrl.includes(".")) {
        newUrl = "https://" + newUrl;
      } else {
        newUrl = "https://www.google.com/search?q=" + encodeURIComponent(newUrl);
      }
    }
    
    setUrl(newUrl);
    setInputUrl(newUrl);
    setLoadError(false);
    
    const newHistory = [...history.slice(0, historyIndex + 1), newUrl];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    setTabs(tabs.map(t => 
      t.id === activeTabId 
        ? { ...t, url: newUrl, title: new URL(newUrl).hostname }
        : t
    ));
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const newUrl = history[newIndex];
      setUrl(newUrl);
      setInputUrl(newUrl);
      setTabs(tabs.map(t => t.id === activeTabId ? { ...t, url: newUrl } : t));
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const newUrl = history[newIndex];
      setUrl(newUrl);
      setInputUrl(newUrl);
      setTabs(tabs.map(t => t.id === activeTabId ? { ...t, url: newUrl } : t));
    }
  };

  const addTab = () => {
    const newTab: Tab = {
      id: Date.now().toString(),
      url: "https://www.youtube.com",
      title: "YouTube"
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
    setUrl(newTab.url);
    setInputUrl(newTab.url);
  };

  const closeTab = (tabId: string) => {
    if (tabs.length === 1) return;
    const filteredTabs = tabs.filter(t => t.id !== tabId);
    setTabs(filteredTabs);
    if (activeTabId === tabId) {
      setActiveTabId(filteredTabs[0].id);
      setUrl(filteredTabs[0].url);
      setInputUrl(filteredTabs[0].url);
    }
  };

  const toggleBookmark = () => {
    const newBookmarks = new Set(bookmarkedUrls);
    if (bookmarkedUrls.has(url)) {
      newBookmarks.delete(url);
    } else {
      newBookmarks.add(url);
    }
    setBookmarkedUrls(newBookmarks);
  };

  const isBookmarked = bookmarkedUrls.has(url);

  return (
    <div className="h-full flex flex-col bg-background">
      {!isMobile && (
        <div className="border-b border-border bg-muted/30 flex items-center gap-1 px-2 py-1">
          {tabs.map(tab => (
            <div
              key={tab.id}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-t-md cursor-pointer transition-colors ${
                activeTabId === tab.id ? 'bg-background' : 'hover:bg-background/50'
              }`}
              onClick={() => {
                setActiveTabId(tab.id);
                setUrl(tab.url);
                setInputUrl(tab.url);
              }}
            >
              <Globe className="h-3 w-3" />
              <span className="text-xs max-w-[100px] truncate">{tab.title}</span>
              {tabs.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={addTab}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="border-b border-border p-2 space-y-2">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={handleBack}
            disabled={historyIndex <= 0}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={handleForward}
            disabled={historyIndex >= history.length - 1}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => handleNavigate(url)}
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => handleNavigate("https://www.youtube.com")}
          >
            <Home className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleNavigate(inputUrl);
                }
              }}
              className="pl-10 pr-10 h-9"
              placeholder="Search or enter URL"
            />
            <Star 
              className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 cursor-pointer transition-colors ${
                isBookmarked ? 'text-primary fill-primary' : 'text-muted-foreground hover:text-primary'
              }`}
              onClick={toggleBookmark}
            />
          </div>
          
          {!isMobile && <Button variant="ghost" size="icon" className="h-8 w-8">
            <Menu className="h-4 w-4" />
          </Button>}
        </div>

        {!isMobile && <div className="flex items-center gap-2 px-2">
          {quickAccess.map(item => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className="h-7 text-xs gap-1"
              onClick={() => handleNavigate(item.url)}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Button>
          ))}
        </div>}
      </div>

      <div className="flex-1 overflow-hidden">
        {url && url !== "about:blank" ? (
          loadError ? (
            <div className="h-full flex items-center justify-center bg-background p-8">
              <div className="text-center max-w-md">
                <Globe className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-2xl font-semibold mb-2">Не удалось загрузить страницу</h2>
                <p className="text-muted-foreground mb-6">
                  Сайт {new URL(url).hostname} блокирует загрузку в браузере. 
                  Многие сайты запрещают отображение внутри других страниц из соображений безопасности.
                </p>
                <Button 
                  onClick={() => window.open(url, '_blank')}
                  className="gap-2"
                >
                  <Globe className="h-4 w-4" />
                  Открыть в новой вкладке
                </Button>
              </div>
            </div>
          ) : (
            <iframe
              key={url}
              src={url}
              className="w-full h-full border-0"
              title="Browser Content"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
              onError={() => setLoadError(true)}
              onLoad={(e) => {
                // Проверяем доступность контента
                try {
                  const iframe = e.target as HTMLIFrameElement;
                  iframe.contentWindow?.document;
                } catch (err) {
                  setLoadError(true);
                }
              }}
            />
          )
        ) : (
          <div className="h-full p-8 overflow-auto bg-gradient-to-br from-background via-primary/5 to-background">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4">Browser</h1>
                <p className="text-muted-foreground">Start browsing the web</p>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Popular Sites</h2>
                <div className="grid grid-cols-3 gap-4">
                  {popularSites.map(site => (
                    <Card
                      key={site.id}
                      className="p-6 cursor-pointer hover:bg-muted/50 transition-all"
                      onClick={() => handleNavigate(site.url)}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className={`h-16 w-16 rounded-2xl ${site.color} flex items-center justify-center text-white text-2xl font-bold`}>
                          {site.name[0]}
                        </div>
                        <div className="text-center">
                          <p className="font-medium">{site.name}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedBrowser;
