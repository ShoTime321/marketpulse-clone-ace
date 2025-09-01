import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search, Settings, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/stock/${searchQuery.trim().toUpperCase()}`);
      setSearchQuery("");
    }
  };
  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">MarketPulse</h1>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stocks (e.g., AAPL, TSLA)..." 
                className="pl-10 bg-background/50 border-border/50 focus:border-primary"
              />
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hover:bg-muted/20">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-muted/20">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-muted/20">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};