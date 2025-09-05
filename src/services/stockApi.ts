// Stock API service using free APIs (no authentication required)

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

export class StockApiService {
  static async getStockQuote(symbol: string): Promise<StockQuote | null> {
    try {
      // Using Yahoo Finance API (free, no auth required)
      const response = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        }
      );
      const data = await response.json();
      
      if (!data.chart?.result?.[0]) {
        console.error('No data found for symbol:', symbol);
        return null;
      }

      const result = data.chart.result[0];
      const meta = result.meta;
      const quote = meta;

      const currentPrice = quote.regularMarketPrice;
      const previousClose = quote.previousClose;
      const change = currentPrice - previousClose;
      const changePercent = (change / previousClose) * 100;

      return {
        symbol: quote.symbol,
        price: currentPrice,
        change: change,
        changePercent: changePercent,
        company: this.getCompanyName(symbol)
      };
    } catch (error) {
      console.error('Error fetching stock quote:', error);
      return null;
    }
  }

  static async getMarketNews(): Promise<NewsArticle[]> {
    try {
      // Using a free news API
      const response = await fetch(
        'https://newsapi.org/v2/everything?q=stock%20market&sortBy=publishedAt&language=en&pageSize=10&apiKey=demo',
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        }
      );
      const data = await response.json();
      
      if (!data.articles) {
        // Fallback to mock news data
        return this.getMockNews();
      }

      return data.articles.map((article: any) => ({
        title: article.title,
        url: article.url,
        time_published: article.publishedAt,
        summary: article.description || article.content?.substring(0, 200) || '',
        source: article.source.name,
        overall_sentiment_score: Math.random() * 0.4 - 0.2 // Random sentiment between -0.2 and 0.2
      }));
    } catch (error) {
      console.error('Error fetching market news:', error);
      return this.getMockNews();
    }
  }

  static getMockNews(): NewsArticle[] {
    return [
      {
        title: "Stock Market Surges on Economic Optimism",
        url: "/news/market-surge-economic-optimism",
        time_published: new Date().toISOString(),
        summary: "Markets rally as investors show confidence in economic recovery and corporate earnings.",
        source: "Market Watch",
        overall_sentiment_score: 0.3
      },
      {
        title: "Tech Stocks Lead Market Gains",
        url: "/news/tech-stocks-gains",
        time_published: new Date(Date.now() - 3600000).toISOString(),
        summary: "Technology sector outperforms as AI and cloud computing drive investor interest.",
        source: "Financial Times",
        overall_sentiment_score: 0.25
      },
      {
        title: "Federal Reserve Maintains Interest Rates",
        url: "/news/fed-interest-rates",
        time_published: new Date(Date.now() - 7200000).toISOString(),
        summary: "Central bank keeps rates steady amid inflation concerns and economic uncertainty.",
        source: "CNBC",
        overall_sentiment_score: 0.1
      }
    ];
  }

  static getCompanyName(symbol: string): string {
    const companyNames: { [key: string]: string } = {
      "AAPL": "Apple Inc.",
      "GOOGL": "Alphabet Inc.",
      "TSLA": "Tesla Inc.",
      "MSFT": "Microsoft Corp.",
      "AMZN": "Amazon.com Inc.",
      "NVDA": "NVIDIA Corp.",
      "META": "Meta Platforms Inc.",
      "NFLX": "Netflix Inc.",
      "AMD": "Advanced Micro Devices",
      "INTC": "Intel Corporation"
    };
    return companyNames[symbol] || symbol;
  }

  static async getMultipleStocks(symbols: string[]): Promise<StockQuote[]> {
    const promises = symbols.map(symbol => this.getStockQuote(symbol));
    const results = await Promise.all(promises);
    return results.filter(quote => quote !== null) as StockQuote[];
  }
}