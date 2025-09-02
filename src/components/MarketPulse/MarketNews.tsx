import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ExternalLink, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { StockApiService } from "@/services/stockApi";

interface NewsArticle {
  title: string;
  url: string;
  time_published: string;
  summary: string;
  source: string;
  overall_sentiment_score?: number;
}

export const MarketNews = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = StockApiService.getApiKey();
        if (apiKey) {
          const liveNews = await StockApiService.getMarketNews();
          if (liveNews.length > 0) {
            setNews(liveNews);
          } else {
            setNews(fallbackNews);
          }
        } else {
          setNews(fallbackNews);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setNews(fallbackNews);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const fallbackNews: NewsArticle[] = [
    {
      title: "Apple Reports Strong Q4 Earnings, Beats Expectations",
      summary: "Apple Inc. reported quarterly earnings that exceeded analyst expectations, driven by strong iPhone sales...",
      time_published: "20240902T120000",
      source: "MarketWatch",
      url: "#",
      overall_sentiment_score: 0.2
    },
    {
      title: "Federal Reserve Signals Potential Rate Cuts",
      summary: "Fed officials hint at possible interest rate adjustments in response to economic indicators...",
      time_published: "20240902T100000",
      source: "Reuters",
      url: "#",
      overall_sentiment_score: 0.0
    },
    {
      title: "Tesla Stock Surges on Autonomous Vehicle News",
      summary: "Tesla shares climb after announcing breakthrough in self-driving technology development...",
      time_published: "20240902T080000",
      source: "Bloomberg",
      url: "#",
      overall_sentiment_score: 0.3
    },
    {
      title: "Oil Prices Drop Amid Global Supply Concerns",
      summary: "Crude oil futures decline as geopolitical tensions ease and supply chain issues resolve...",
      time_published: "20240902T060000",
      source: "Financial Times",
      url: "#",
      overall_sentiment_score: -0.2
    }
  ];

  const getImpactColor = (score?: number) => {
    if (!score) return 'bg-muted/20 text-muted-foreground';
    if (score > 0.1) return 'bg-success/20 text-success';
    if (score < -0.1) return 'bg-danger/20 text-danger';
    return 'bg-muted/20 text-muted-foreground';
  };

  const getImpactLabel = (score?: number) => {
    if (!score) return 'neutral';
    if (score > 0.1) return 'positive';
    if (score < -0.1) return 'negative';
    return 'neutral';
  };

  const formatTime = (timeString: string) => {
    if (timeString.includes('T')) {
      const date = new Date(timeString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      return diffHours < 24 ? `${diffHours} hours ago` : date.toLocaleDateString();
    }
    return timeString;
  };

  const handleNewsClick = (article: NewsArticle) => {
    if (article.url && article.url !== '#') {
      window.open(article.url, '_blank');
    } else {
      const articleId = encodeURIComponent(article.title.replace(/\s+/g, '-').toLowerCase());
      navigate(`/news/${articleId}`, { state: { article } });
    }
  };

  if (loading) {
    return (
      <Card className="gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            📈 Market News
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Loading latest news...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="gradient-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          📈 Market News
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {news.map((item, index) => (
          <div key={index} className="space-y-3 pb-4 border-b border-border/30 last:border-b-0 last:pb-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h4 
                  className="font-semibold text-foreground leading-tight hover:text-primary cursor-pointer transition-colors"
                  onClick={() => handleNewsClick(item)}
                >
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
                  {item.source}
                </Badge>
                <Badge variant="outline" className={`text-xs ${getImpactColor(item.overall_sentiment_score)}`}>
                  {getImpactLabel(item.overall_sentiment_score)}
                </Badge>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{formatTime(item.time_published)}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};