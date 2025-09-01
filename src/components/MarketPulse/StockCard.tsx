import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StockCardProps {
  symbol: string;
  company: string;
  price: number;
  change: number;
  changePercent: number;
}

export const StockCard = ({ symbol, company, price, change, changePercent }: StockCardProps) => {
  const isPositive = change >= 0;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/stock/${symbol}`);
  };
  
  return (
    <Card 
      className="gradient-card border-border/50 hover:border-border transition-all duration-300 hover:scale-105 cursor-pointer"
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg text-foreground">{symbol}</h3>
            <p className="text-sm text-muted-foreground">{company}</p>
          </div>
          {isPositive ? (
            <TrendingUp className="h-5 w-5 text-success" />
          ) : (
            <TrendingDown className="h-5 w-5 text-danger" />
          )}
        </div>
        
        <div className="space-y-2">
          <p className="text-2xl font-bold text-foreground">
            ${price.toFixed(2)}
          </p>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-semibold ${isPositive ? 'text-success' : 'text-danger'}`}>
              {isPositive ? '+' : ''}${change.toFixed(2)}
            </span>
            <span className={`text-sm ${isPositive ? 'text-success' : 'text-danger'}`}>
              ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};