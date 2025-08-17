import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Review {
  id: number;
  name: string;
  company?: string;
  rating: number;
  text: string;
  platform: string;
  date: string;
}

// Sample reviews - replace with your actual reviews
const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "Construction Solutions Ltd",
    rating: 5,
    text: "Outstanding service! Fleetory delivered our urgent construction materials on time despite the tight deadline. Their drivers are professional and the tracking system kept us informed throughout.",
    platform: "Google Reviews",
    date: "2024-01-15"
  },
  {
    id: 2,
    name: "Mark Thompson",
    company: "Thompson Legal Services",
    rating: 5,
    text: "We've been using Fleetory for all our document deliveries for over a year. Reliable, secure, and excellent customer service. Highly recommended for professional services.",
    platform: "Trustpilot",
    date: "2024-01-08"
  },
  {
    id: 3,
    name: "Emma Davis",
    company: "Retail Express",
    rating: 5,
    text: "Same-day delivery that actually works! Fleetory has become an essential part of our retail operations. Their flexible scheduling and real-time updates are game-changers.",
    platform: "Yelp",
    date: "2024-01-22"
  }
];

const Reviews = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating 
            ? "fill-logistics-orange text-logistics-orange" 
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. See what businesses across the UK 
            are saying about our delivery services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <Card key={review.id} className="relative bg-card border shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-1">
                    {renderStars(review.rating)}
                  </div>
                  <Quote className="h-6 w-6 text-logistics-orange opacity-60" />
                </div>
                
                <p className="text-card-foreground mb-6 leading-relaxed">
                  "{review.text}"
                </p>
                
                <div className="border-t border-border pt-4">
                  <div className="mb-2">
                    <h4 className="font-semibold text-card-foreground">
                      {review.name}
                    </h4>
                    {review.company && (
                      <p className="text-sm text-muted-foreground">
                        {review.company}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{review.platform}</span>
                    <span>{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Experience the difference with Fleetory
          </p>
          <div className="flex items-center justify-center space-x-1">
            {renderStars(5)}
            <span className="ml-2 text-sm font-medium text-foreground">
              4.9/5 Average Rating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;