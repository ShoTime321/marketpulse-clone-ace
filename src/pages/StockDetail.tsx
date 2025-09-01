import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/MarketPulse/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import { TradingChart } from "@/components/MarketPulse/TradingChart";

const StockDetail = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();

  // Mock data - in a real app, this would come from an API
  const stockData = {
    symbol: symbol?.toUpperCase() || "AAPL",
    company: "Apple Inc.",
    currentPrice: 182.52,
    ytdChange: 15.42,
    ytdPercent: 9.23,
    monthChange: -2.34,
    monthPercent: -1.27,
    yearChange: 28.76,
    yearPercent: 18.75
  };

  const PriceCard = ({ title, change, percent, timeframe }: { title: string, change: number, percent: number, timeframe: string }) => {
    const isPositive = change >= 0;
    
    return (
      <Card className="gradient-card border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold ${isPositive ? 'text-success' : 'text-danger'}`}>
                  {isPositive ? '+' : ''}${Math.abs(change).toFixed(2)}
                </span>
                {isPositive ? (
                  <TrendingUp className="h-5 w-5 text-success" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-danger" />
                )}
              </div>
              <div className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-danger'}`}>
                {isPositive ? '+' : ''}{percent.toFixed(2)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Header with back button */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-muted/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{stockData.symbol}</h1>
            <p className="text-lg text-muted-foreground">{stockData.company}</p>
          </div>
        </div>

        {/* Current Price */}
        <Card className="gradient-card border-border/50">
          <CardContent className="p-6">
            <div className="text-4xl font-bold text-foreground">
              ${stockData.currentPrice.toFixed(2)}
            </div>
            <p className="text-muted-foreground mt-1">Current Price</p>
          </CardContent>
        </Card>

        {/* Price Performance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PriceCard 
            title="Year to Date"
            change={stockData.ytdChange}
            percent={stockData.ytdPercent}
            timeframe="YTD"
          />
          <PriceCard 
            title="1 Month"
            change={stockData.monthChange}
            percent={stockData.monthPercent}
            timeframe="1M"
          />
          <PriceCard 
            title="1 Year"
            change={stockData.yearChange}
            percent={stockData.yearPercent}
            timeframe="1Y"
          />
        </div>

        {/* Chart */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Price Chart</h2>
          <TradingChart />
        </div>
      </main>
    </div>
  );
};

export default StockDetail;