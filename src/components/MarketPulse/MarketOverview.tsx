import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

export const MarketOverview = () => {
  const marketData = [
    {
      name: "S&P 500",
      symbol: "SPX",
      value: 4756.50,
      change: 23.45,
      changePercent: 0.49,
      icon: <Activity className="h-5 w-5" />
    },
    {
      name: "Dow Jones",
      symbol: "DJI", 
      value: 37689.54,
      change: -45.23,
      changePercent: -0.12,
      icon: <Activity className="h-5 w-5" />
    },
    {
      name: "NASDAQ",
      symbol: "IXIC",
      value: 14842.23,
      change: 67.89,
      changePercent: 0.46,
      icon: <Activity className="h-5 w-5" />
    },
    {
      name: "VIX",
      symbol: "VIX",
      value: 18.45,
      change: -1.23,
      changePercent: -6.25,
      icon: <Activity className="h-5 w-5" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {marketData.map((market) => {
        const isPositive = market.change >= 0;
        
        return (
          <Card key={market.symbol} className="gradient-card border-border/50 hover:border-border transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {market.icon}
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">{market.name}</h3>
                    <p className="text-xs text-muted-foreground">{market.symbol}</p>
                  </div>
                </div>
                {isPositive ? (
                  <TrendingUp className="h-4 w-4 text-success" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-danger" />
                )}
              </div>
              
              <div className="space-y-1">
                <p className="text-lg font-bold text-foreground">
                  {market.value.toLocaleString()}
                </p>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold ${isPositive ? 'text-success' : 'text-danger'}`}>
                    {isPositive ? '+' : ''}{market.change.toFixed(2)}
                  </span>
                  <span className={`text-xs ${isPositive ? 'text-success' : 'text-danger'}`}>
                    ({isPositive ? '+' : ''}{market.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};