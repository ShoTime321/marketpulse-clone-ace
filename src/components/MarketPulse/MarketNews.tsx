import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink } from "lucide-react";

export const MarketNews = () => {
  const news = [
    {
      id: 1,
      title: "Apple Reports Strong Q4 Earnings, Beats Expectations",
      summary: "Apple Inc. reported quarterly earnings that exceeded analyst expectations, driven by strong iPhone sales...",
      time: "2 hours ago",
      source: "MarketWatch",
      category: "Earnings",
      impact: "positive"
    },
    {
      id: 2,
      title: "Federal Reserve Signals Potential Rate Cuts",
      summary: "Fed officials hint at possible interest rate adjustments in response to economic indicators...",
      time: "4 hours ago",
      source: "Reuters",
      category: "Policy",
      impact: "neutral"
    },
    {
      id: 3,
      title: "Tesla Stock Surges on Autonomous Vehicle News",
      summary: "Tesla shares climb after announcing breakthrough in self-driving technology development...",
      time: "6 hours ago",
      source: "Bloomberg",
      category: "Technology",
      impact: "positive"
    },
    {
      id: 4,
      title: "Oil Prices Drop Amid Global Supply Concerns",
      summary: "Crude oil futures decline as geopolitical tensions ease and supply chain issues resolve...",
      time: "8 hours ago",
      source: "Financial Times",
      category: "Commodities",
      impact: "negative"
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'bg-success/20 text-success';
      case 'negative': return 'bg-danger/20 text-danger';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  return (
    <Card className="gradient-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          📈 Market News
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {news.map((item) => (
          <div key={item.id} className="space-y-3 pb-4 border-b border-border/30 last:border-b-0 last:pb-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground leading-tight hover:text-primary cursor-pointer transition-colors">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {item.summary}
                </p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer flex-shrink-0" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {item.category}
                </Badge>
                <Badge variant="outline" className={`text-xs ${getImpactColor(item.impact)}`}>
                  {item.impact}
                </Badge>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{item.time}</span>
                <span>•</span>
                <span>{item.source}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};