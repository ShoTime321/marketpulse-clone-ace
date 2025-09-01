import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Target, PieChart } from "lucide-react";

export const Portfolio = () => {
  const portfolioData = {
    totalValue: 125420.50,
    dayChange: 2840.25,
    dayChangePercent: 2.31,
    holdings: [
      { symbol: 'AAPL', shares: 50, value: 9100, allocation: 7.3 },
      { symbol: 'GOOGL', shares: 25, value: 8750, allocation: 7.0 },
      { symbol: 'TSLA', shares: 40, value: 11200, allocation: 8.9 },
      { symbol: 'MSFT', shares: 30, value: 10500, allocation: 8.4 },
    ]
  };

  return (
    <Card className="gradient-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <PieChart className="h-5 w-5" />
          Portfolio Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Portfolio Value */}
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
          <p className="text-3xl font-bold text-foreground">
            ${portfolioData.totalValue.toLocaleString()}
          </p>
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-success font-semibold">
              +${portfolioData.dayChange.toFixed(2)} ({portfolioData.dayChangePercent}%)
            </span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-1">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Cash</p>
            </div>
            <p className="font-semibold text-foreground">$12,450</p>
          </div>
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Target className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">P&L Today</p>
            </div>
            <p className="font-semibold text-success">+$2,840</p>
          </div>
        </div>

        {/* Top Holdings */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-muted-foreground">Top Holdings</h4>
          {portfolioData.holdings.map((holding) => (
            <div key={holding.symbol} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{holding.symbol.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{holding.symbol}</p>
                  <p className="text-xs text-muted-foreground">{holding.shares} shares</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">${holding.value.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{holding.allocation}%</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};