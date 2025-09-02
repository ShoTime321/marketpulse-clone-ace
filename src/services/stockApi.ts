// Stock API service using Alpha Vantage (free tier available)
// You'll need to get a free API key from https://www.alphavantage.co/support/#api-key

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
  private static API_KEY_STORAGE_KEY = 'alpha_vantage_api_key';
  
  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static async getStockQuote(symbol: string): Promise<StockQuote | null> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      console.error('API key not found');
      return null;
    }

    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
      );
      const data = await response.json();
      
      if (data['Error Message'] || data['Note']) {
        console.error('API Error:', data);
        return null;
      }

      const quote = data['Global Quote'];
      if (!quote) return null;

      return {
        symbol: quote['01. symbol'],
        price: parseFloat(quote['05. price']),
        change: parseFloat(quote['09. change']),
        changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
        company: symbol // We'll need another API call for company name
      };
    } catch (error) {
      console.error('Error fetching stock quote:', error);
      return null;
    }
  }

  static async getMarketNews(): Promise<NewsArticle[]> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      console.error('API key not found');
      return [];
    }

    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=financial_markets&apikey=${apiKey}&limit=10`
      );
      const data = await response.json();
      
      if (data['Error Message'] || data['Note']) {
        console.error('API Error:', data);
        return [];
      }

      return data.feed || [];
    } catch (error) {
      console.error('Error fetching market news:', error);
      return [];
    }
  }

  static async getMultipleStocks(symbols: string[]): Promise<StockQuote[]> {
    const promises = symbols.map(symbol => this.getStockQuote(symbol));
    const results = await Promise.all(promises);
    return results.filter(quote => quote !== null) as StockQuote[];
  }
}