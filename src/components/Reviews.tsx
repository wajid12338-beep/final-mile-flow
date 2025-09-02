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

// Real customer reviews from actual clients
const reviews: Review[] = [
  {
    id: 1,
    name: "David S",
    company: "D&L Couriers",
    rating: 5,
    text: "Brilliant job from start to finish, great pics of goods at each end and pod provided. Thank you 🤩",
    platform: "Customer Feedback",
    date: "2025-08-29"
  },
  {
    id: 2,
    name: "Danial Cahn",
    company: "DANIAL CAHN",
    rating: 5,
    text: "Good Driver. Very Helpful",
    platform: "Customer Feedback",
    date: "2025-08-21"
  },
  {
    id: 3,
    name: "Stephen C",
    company: "S Y D S",
    rating: 5,
    text: "Excellent service. Great communication. Highly recommended. Many thanks",
    platform: "Customer Feedback",
    date: "2025-08-22"
  },
  {
    id: 4,
    name: "Michael J",
    company: "A2Z",
    rating: 5,
    text: "top class service many thanks great job",
    platform: "Customer Feedback",
    date: "2025-08-11"
  },
  {
    id: 5,
    name: "Sharon H",
    company: "TRANSGAT",
    rating: 5,
    text: "Top class service, highly recommended, will definitely use again !",
    platform: "Customer Feedback",
    date: "2025-08-13"
  },
  {
    id: 6,
    name: "Fahad D",
    company: "MENTEC",
    rating: 5,
    text: "AMAZING SERVICE WOULD RECOMMEND TO EVERYONE A 1000%",
    platform: "Customer Feedback",
    date: "2025-08-05"
  },
  {
    id: 7,
    name: "Spencer N",
    company: "BSG",
    rating: 5,
    text: "Would Definitely use again. Prompt Delivery, Courteous",
    platform: "Customer Feedback",
    date: "2025-08-04"
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

  // Duplicate reviews for seamless infinite scroll
  const duplicatedReviews = [...reviews, ...reviews];

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

        {/* Scrolling container */}
        <div className="overflow-hidden">
          <div 
            className="flex gap-6 animate-scroll-reviews"
            style={{
              width: `${duplicatedReviews.length * 384}px`, // 384px = w-96 (24rem)
            }}
          >
            {duplicatedReviews.map((review, index) => (
              <Card key={`${review.id}-${index}`} className="relative bg-card border shadow-lg hover:shadow-xl transition-shadow duration-300 w-96 flex-shrink-0">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-1">
                      {renderStars(review.rating)}
                    </div>
                    <Quote className="h-6 w-6 text-logistics-orange opacity-60" />
                  </div>
                  
                  <p className="text-card-foreground mb-6 leading-relaxed flex-grow">
                    "{review.text}"
                  </p>
                  
                  <div className="border-t border-border pt-4 mt-auto">
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
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Experience the difference with Fleetory
          </p>
          <div className="flex items-center justify-center space-x-1">
            {renderStars(5)}
            <span className="ml-2 text-sm font-medium text-foreground">
              5.0/5 Average Rating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;