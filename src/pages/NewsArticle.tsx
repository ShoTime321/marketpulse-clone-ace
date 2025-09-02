import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Header } from "@/components/MarketPulse/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, ExternalLink } from "lucide-react";

interface LiveArticle {
  title: string;
  summary: string;
  time_published: string;
  source: string;
  url: string;
  overall_sentiment_score?: number;
}

interface DemoArticle {
  title: string;
  content: string;
  time: string;
  source: string;
  category: string;
  impact: string;
  author: string;
  readTime: string;
}

interface ArticleState {
  article: LiveArticle;
}

const NewsArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ArticleState;

  // Mock data - in a real app, this would come from an API
  const articles = {
    "1": {
      title: "Apple Reports Strong Q4 Earnings, Beats Expectations",
      content: `Apple Inc. reported quarterly earnings that exceeded analyst expectations for the fourth quarter, driven by strong iPhone sales and robust performance across its services division.

The tech giant posted revenue of $89.5 billion, up 1% year-over-year, beating consensus estimates of $89.3 billion. iPhone revenue came in at $43.8 billion, slightly below the $43.9 billion expected but showing resilience in a challenging smartphone market.

Services revenue, which includes the App Store, Apple Music, and iCloud, reached a record $22.3 billion, up 16% year-over-year. This segment continues to be Apple's fastest-growing and most profitable division.

"We are pleased with our performance this quarter, which reflects the strength of our ecosystem and the loyalty of our customers," said CEO Tim Cook during the earnings call.

The company's gross margin improved to 45.2% from 43.3% in the same quarter last year, demonstrating effective cost management and favorable product mix.

Mac revenue declined 34% to $7.6 billion, primarily due to tough comparisons with the prior year when new M2 chips drove strong sales. However, the recently launched M3 MacBook Pro models are showing promising early adoption.

Looking ahead, Apple provided optimistic guidance for the holiday quarter, expecting revenue growth to accelerate driven by new product launches and seasonal demand.

The stock rose 3% in after-hours trading following the earnings release.`,
      time: "2 hours ago",
      source: "MarketWatch",
      category: "Earnings",
      impact: "positive",
      author: "Sarah Johnson",
      readTime: "3 min read"
    },
    "2": {
      title: "Federal Reserve Signals Potential Rate Cuts",
      content: `Federal Reserve officials signaled potential interest rate adjustments in response to evolving economic indicators, marking a significant shift in monetary policy stance.

During the latest Federal Open Market Committee meeting, policymakers expressed increased confidence that inflation is moving sustainably toward the 2% target, opening the door for potential rate cuts in the coming months.

Fed Chair Jerome Powell emphasized the dual mandate approach, noting that while inflation has shown significant progress, employment conditions remain a key consideration for future policy decisions.

"We are prepared to adjust our policy stance as appropriate to support maximum employment and price stability," Powell stated during the post-meeting press conference.

Market participants have interpreted these comments as a clear signal that the central bank is preparing to pivot from its current restrictive monetary policy stance.

The federal funds rate currently stands at 5.25-5.5%, the highest level in over two decades. Economic data suggests that the aggressive tightening cycle may have achieved its intended effect of cooling inflation without triggering a severe recession.

Bond markets rallied on the news, with the 10-year Treasury yield falling to 4.2% from 4.4% earlier in the session. Equity markets also responded positively, with major indices posting gains across the board.

Economists now forecast a 70% probability of at least one rate cut by the end of the current quarter, with some predicting as many as three cuts over the next year.`,
      time: "4 hours ago",
      source: "Reuters",
      category: "Policy",
      impact: "neutral",
      author: "Michael Chen",
      readTime: "4 min read"
    }
  };

  // Use passed article data or fallback to demo data
  const passedArticle = state?.article;
  const article: LiveArticle | DemoArticle | undefined = passedArticle || articles[id as keyof typeof articles];

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
            <Button onClick={() => navigate(-1)} variant="outline">
              Go Back
            </Button>
          </div>
        </main>
      </div>
    );
  }

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
      return new Date(timeString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return timeString;
  };

  // Generate content for passed articles
  const getArticleContent = (article: LiveArticle | DemoArticle) => {
    if ('content' in article) return article.content; // Demo article
    
    // Generate content for live articles
    return `${article.summary}

This is a developing story in the financial markets. The article provides insights into current market conditions and their potential impact on investors and the broader economy.

Key takeaways from this report:
• Market participants are closely monitoring these developments
• Economic indicators suggest ongoing volatility in this sector
• Analysts recommend keeping a close watch on related market movements
• Investor sentiment appears to be influenced by these recent developments

For the most up-to-date information and detailed analysis, please refer to the original source. Market conditions can change rapidly, and investors should consult with financial advisors before making investment decisions.

This article represents current market reporting and analysis as of the publication time. Always verify information with primary sources and consider multiple perspectives when making financial decisions.`;
  };

  const getSentimentScore = (article: LiveArticle | DemoArticle): number | undefined => {
    return 'overall_sentiment_score' in article ? article.overall_sentiment_score : undefined;
  };

  const getImpact = (article: LiveArticle | DemoArticle): string | undefined => {
    return 'impact' in article ? article.impact : undefined;
  };

  const getTimeString = (article: LiveArticle | DemoArticle): string => {
    return 'time_published' in article ? article.time_published : article.time;
  };

  const getAuthor = (article: LiveArticle | DemoArticle): string | undefined => {
    return 'author' in article ? article.author : undefined;
  };

  const getReadTime = (article: LiveArticle | DemoArticle): string | undefined => {
    return 'readTime' in article ? article.readTime : undefined;
  };

  const getUrl = (article: LiveArticle | DemoArticle): string | undefined => {
    return 'url' in article ? article.url : undefined;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-muted/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground leading-tight">{article.title}</h1>
          </div>
        </div>

        {/* Article metadata */}
        <Card className="gradient-card border-border/50 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {article.source}
                </Badge>
                {(getSentimentScore(article) !== undefined || getImpact(article)) && (
                  <Badge variant="outline" className={`text-xs ${getImpactColor(getSentimentScore(article))}`}>
                    {getImpact(article) || getImpactLabel(getSentimentScore(article))}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(getTimeString(article))}</span>
                </div>
                {getAuthor(article) && (
                  <>
                    <span>•</span>
                    <span>By {getAuthor(article)}</span>
                  </>
                )}
                {getReadTime(article) && (
                  <>
                    <span>•</span>
                    <span>{getReadTime(article)}</span>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Article content */}
        <Card className="gradient-card border-border/50">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              {getArticleContent(article).split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-foreground leading-relaxed mb-6 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/30">
              <div className="text-sm text-muted-foreground">
                Source: {article.source}
              </div>
              {getUrl(article) && getUrl(article) !== '#' && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => window.open(getUrl(article)!, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                  View Original
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NewsArticle;