import { Header } from "@/components/MarketPulse/Header";
import { MarketOverview } from "@/components/MarketPulse/MarketOverview";
import { StockCard } from "@/components/MarketPulse/StockCard";
import { TradingChart } from "@/components/MarketPulse/TradingChart";
import { Portfolio } from "@/components/MarketPulse/Portfolio";
import { MarketNews } from "@/components/MarketPulse/MarketNews";
import { ApiKeySetup } from "@/components/MarketPulse/ApiKeySetup";
import { StockApiService } from "@/services/stockApi";
import { useEffect, useState } from "react";

const Index = () => {
  const [hasApiKey, setHasApiKey] = useState(false);
  const [stocks, setStocks] = useState([
    { symbol: "AAPL", company: "Apple Inc.", price: 182.52, change: 2.34, changePercent: 1.30 },
    { symbol: "GOOGL", company: "Alphabet Inc.", price: 125.89, change: -1.23, changePercent: -0.97 },
    { symbol: "TSLA", company: "Tesla Inc.", price: 248.42, change: 5.67, changePercent: 2.34 },
    { symbol: "MSFT", company: "Microsoft Corp.", price: 378.85, change: 1.23, changePercent: 0.33 },
    { symbol: "AMZN", company: "Amazon.com Inc.", price: 127.74, change: -2.45, changePercent: -1.88 },
    { symbol: "NVDA", company: "NVIDIA Corp.", price: 891.25, change: 12.45, changePercent: 1.42 },
  ]);

  useEffect(() => {
    const apiKey = StockApiService.getApiKey();
    setHasApiKey(!!apiKey);

    if (apiKey) {
      // Fetch real stock data
      const symbols = ["AAPL", "GOOGL", "TSLA", "MSFT", "AMZN", "NVDA"];
      StockApiService.getMultipleStocks(symbols).then(liveStocks => {
        if (liveStocks.length > 0) {
          const stocksWithCompanyNames = liveStocks.map(stock => ({
            ...stock,
            company: getCompanyName(stock.symbol)
          }));
          setStocks(stocksWithCompanyNames);
        }
      }).catch(error => {
        console.error('Error fetching live stock data:', error);
      });
    }
  }, [hasApiKey]);

  const getCompanyName = (symbol: string) => {
    const companyNames: { [key: string]: string } = {
      "AAPL": "Apple Inc.",
      "GOOGL": "Alphabet Inc.",
      "TSLA": "Tesla Inc.",
      "MSFT": "Microsoft Corp.",
      "AMZN": "Amazon.com Inc.",
      "NVDA": "NVIDIA Corp."
    };
    return companyNames[symbol] || symbol;
  };

  if (!hasApiKey) {
    return <ApiKeySetup onApiKeySet={() => setHasApiKey(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Market Overview */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Market Overview</h2>
          <MarketOverview />
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Chart and Watchlist */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trading Chart */}
            <TradingChart />
            
            {/* Watchlist */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Watchlist</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stocks.map((stock) => (
                  <StockCard 
                    key={stock.symbol}
                    symbol={stock.symbol}
                    company={stock.company}
                    price={stock.price}
                    change={stock.change}
                    changePercent={stock.changePercent}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Portfolio and News */}
          <div className="space-y-8">
            <Portfolio />
            <MarketNews />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;