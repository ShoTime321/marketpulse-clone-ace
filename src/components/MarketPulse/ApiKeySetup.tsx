import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { StockApiService } from '@/services/stockApi';
import { Eye, EyeOff, ExternalLink } from 'lucide-react';

interface ApiKeySetupProps {
  onApiKeySet: () => void;
}

export const ApiKeySetup = ({ onApiKeySet }: ApiKeySetupProps) => {
  const [apiKey, setApiKey] = useState(StockApiService.getApiKey() || '');
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setIsValidating(true);
    
    // Test the API key by making a simple request
    try {
      StockApiService.saveApiKey(apiKey);
      const testQuote = await StockApiService.getStockQuote('AAPL');
      
      if (testQuote) {
        onApiKeySet();
      } else {
        alert('Invalid API key. Please check and try again.');
        localStorage.removeItem('alpha_vantage_api_key');
      }
    } catch (error) {
      alert('Error validating API key. Please try again.');
      localStorage.removeItem('alpha_vantage_api_key');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="text-center text-foreground">Setup Live Market Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              To get real stock prices and news, you need a free API key from Alpha Vantage.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.open('https://www.alphavantage.co/support/#api-key', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Get Free API Key
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">API Key</label>
              <div className="relative">
                <Input
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your Alpha Vantage API key"
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-8 w-8 p-0"
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={!apiKey.trim() || isValidating}
            >
              {isValidating ? 'Validating...' : 'Save API Key'}
            </Button>
          </form>

          <Alert>
            <AlertDescription className="text-xs text-muted-foreground">
              Your API key is stored locally in your browser and never sent to our servers.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};