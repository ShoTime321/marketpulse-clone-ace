// Stock API service with realistic mock data that simulates live market movements

interface StockQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  company: string;
}

interface NewsArticle {
  title: string;
  url: string;
  time_published: string;
  summary: string;
  source: string;
  overall_sentiment_score?: number;
}

// Base stock data with recent real prices (as of market close)
const baseStockData: { [key: string]: { price: number; company: string } } = {
  "AAPL": { price: 189.84, company: "Apple Inc." },
  "GOOGL": { price: 166.21, company: "Alphabet Inc." },
  "TSLA": { price: 248.42, company: "Tesla Inc." },
  "MSFT": { price: 417.01, company: "Microsoft Corp." },
  "AMZN": { price: 143.31, company: "Amazon.com Inc." },
  "NVDA": { price: 118.11, company: "NVIDIA Corp." },
  "META": { price: 511.11, company: "Meta Platforms Inc." },
  "NFLX": { price: 701.35, company: "Netflix Inc." },
  "AMD": { price: 144.71, company: "Advanced Micro Devices" },
  "INTC": { price: 20.19, company: "Intel Corporation" }
};

export class StockApiService {
  static getRealisticStockData(symbol: string): StockQuote {
    const base = baseStockData[symbol];
    if (!base) {
      return {
        symbol,
        price: 100,
        change: 0,
        changePercent: 0,
        company: symbol
      };
    }

    // Generate realistic market movement (between -5% and +5%)
    const volatility = Math.random() * 0.1 - 0.05; // -5% to +5%
    const change = base.price * volatility;
    const newPrice = base.price + change;
    const changePercent = (change / base.price) * 100;

    return {
      symbol,
      price: Math.max(0.01, newPrice), // Ensure price is positive
      change: change,
      changePercent: changePercent,
      company: base.company
    };
  }

  static async getStockQuote(symbol: string): Promise<StockQuote | null> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));
      return this.getRealisticStockData(symbol);
    } catch (error) {
      console.error('Error generating stock quote:', error);
      return null;
    }
  }

  static async getMarketNews(): Promise<NewsArticle[]> {
    // Current realistic market news
    const currentNews: NewsArticle[] = [
      {
        title: "S&P 500 Reaches New All-Time High as Tech Stocks Rally",
        url: "/news/sp500-new-high",
        time_published: new Date().toISOString(),
        summary: "The S&P 500 index closed at a record high today, driven by strong performances from technology companies as investors show confidence in AI and semiconductor sectors.",
        source: "MarketWatch",
        overall_sentiment_score: 0.4
      },
      {
        title: "Federal Reserve Keeps Interest Rates Steady, Signals Future Cuts",
        url: "/news/fed-rates-steady",
        time_published: new Date(Date.now() - 1800000).toISOString(),
        summary: "The Federal Reserve maintained the federal funds rate at 5.25%-5.50% but indicated potential rate cuts in upcoming meetings based on inflation data.",
        source: "CNBC",
        overall_sentiment_score: 0.2
      },
      {
        title: "NVIDIA Reports Record Q3 Earnings, Stock Surges 8%",
        url: "/news/nvidia-earnings",
        time_published: new Date(Date.now() - 3600000).toISOString(),
        summary: "NVIDIA exceeded analyst expectations with record quarterly revenue of $60.9 billion, driven by continued strong demand for AI chips and data center solutions.",
        source: "Reuters",
        overall_sentiment_score: 0.5
      },
      {
        title: "Oil Prices Drop 3% on Global Economic Concerns",
        url: "/news/oil-prices-drop",
        time_published: new Date(Date.now() - 5400000).toISOString(),
        summary: "Crude oil futures fell sharply as investors worry about slowing global economic growth and reduced energy demand from major economies.",
        source: "Bloomberg",
        overall_sentiment_score: -0.3
      },
      {
        title: "Tesla Delivers Record Q4 Vehicles Despite Market Challenges",
        url: "/news/tesla-deliveries",
        time_published: new Date(Date.now() - 7200000).toISOString(),
        summary: "Tesla reported delivering 484,507 vehicles in Q4, beating analyst estimates despite ongoing supply chain challenges and increased competition.",
        source: "Financial Times",
        overall_sentiment_score: 0.3
      }
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 100));
    return currentNews;
  }

  static async getMultipleStocks(symbols: string[]): Promise<StockQuote[]> {
    const promises = symbols.map(symbol => this.getStockQuote(symbol));
    const results = await Promise.all(promises);
    return results.filter(quote => quote !== null) as StockQuote[];
  }

  static getCompanyName(symbol: string): string {
    return baseStockData[symbol]?.company || symbol;
  }
}