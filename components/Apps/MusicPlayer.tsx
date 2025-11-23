import React, { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Repeat, Shuffle, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const MusicPlayer = () => {
  const isMobile = useIsMobile();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(45);
  const [volume, setVolume] = useState([70]);
  const [liked, setLiked] = useState(false);

  const playlist = [
    { id: 1, title: "Midnight Dreams", artist: "Luna Wave", duration: "3:45", active: true },
    { id: 2, title: "Electric Sunrise", artist: "Neon Lights", duration: "4:12", active: false },
    { id: 3, title: "Ocean Breeze", artist: "Calm Sounds", duration: "3:28", active: false },
    { id: 4, title: "City Nights", artist: "Urban Jazz", duration: "5:03", active: false },
    { id: 5, title: "Forest Path", artist: "Nature Symphony", duration: "4:35", active: false },
  ];

  const currentSong = playlist.find(s => s.active) || playlist[0];

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Album Art */}
      <div className={`flex-1 flex items-center justify-center ${isMobile ? 'p-4' : 'p-8'}`}>
        <div className={`${isMobile ? 'w-48 h-48' : 'w-64 h-64'} rounded-2xl bg-gradient-to-br from-primary to-primary/60 shadow-2xl flex items-center justify-center animate-zoom-in`}>
          <Music2 className="h-24 w-24 text-primary-foreground" />
        </div>
      </div>

      {/* Song Info */}
      <div className="px-8 pb-4 text-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <h2 className="text-2xl font-bold mb-1">{currentSong.title}</h2>
        <p className="text-muted-foreground">{currentSong.artist}</p>
      </div>

      {/* Progress Bar */}
      <div className="px-8 pb-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
        <Slider 
          value={[currentTime]} 
          max={100} 
          step={1}
          onValueChange={(val) => setCurrentTime(val[0])}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>1:24</span>
          <span>3:45</span>
        </div>
      </div>

      {/* Controls */}
      <div className="px-8 pb-6 flex items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
        <Button variant="ghost" size="icon" className="h-12 w-12">
          <Shuffle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-12 w-12">
          <SkipBack className="h-6 w-6" />
        </Button>
        <Button 
          size="icon" 
          className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
        </Button>
        <Button variant="ghost" size="icon" className="h-12 w-12">
          <SkipForward className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon" className="h-12 w-12">
          <Repeat className="h-5 w-5" />
        </Button>
      </div>

      {/* Bottom Bar */}
      <div className="px-8 pb-6 flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setLiked(!liked)}
        >
          <Heart className={`h-5 w-5 ${liked ? 'fill-primary text-primary' : ''}`} />
        </Button>
        <div className="flex items-center gap-2 flex-1 max-w-xs ml-auto">
          <Volume2 className="h-5 w-5 text-muted-foreground" />
          <Slider 
            value={volume} 
            max={100} 
            step={1}
            onValueChange={setVolume}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;