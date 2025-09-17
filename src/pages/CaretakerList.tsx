import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Shield, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Mock data for caretakers
const caretakers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    skills: ["Home Maintenance", "Garden Care", "Security"],
    rating: 4.8,
    experience: 5,
    location: "Andheri West, Mumbai",
    verified: true,
    price: "₹15,000/month"
  },
  {
    id: 2,
    name: "Suresh Patel",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    skills: ["Land Maintenance", "Agricultural Care", "Irrigation"],
    rating: 4.6,
    experience: 8,
    location: "Borivali East, Mumbai",
    verified: true,
    price: "₹18,000/month"
  },
  {
    id: 3,
    name: "Amit Singh",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    skills: ["Property Security", "Maintenance", "Cleaning"],
    rating: 4.9,
    experience: 3,
    location: "Bandra West, Mumbai",
    verified: true,
    price: "₹12,000/month"
  },
  {
    id: 4,
    name: "Mohan Sharma",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    skills: ["Building Maintenance", "Electrical Work", "Plumbing"],
    rating: 4.7,
    experience: 12,
    location: "Powai, Mumbai",
    verified: true,
    price: "₹22,000/month"
  }
];

const CaretakerList = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link to="/post-requirement">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <div className="ml-4">
              <h1 className="text-2xl font-bold">Available Caretakers</h1>
              <p className="text-muted-foreground">Mumbai • {caretakers.length} caretakers found</p>
            </div>
          </div>
          <Button variant="outline">
            Filter & Sort
          </Button>
        </div>

        {/* Caretaker Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caretakers.map((caretaker) => (
            <Card 
              key={caretaker.id} 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => navigate(`/caretaker/${caretaker.id}`)}
            >
              <CardContent className="p-6">
                {/* Photo and Basic Info */}
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={caretaker.photo}
                    alt={caretaker.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-lg">{caretaker.name}</h3>
                      {caretaker.verified && (
                        <Shield className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{caretaker.rating}</span>
                      <span className="text-sm text-muted-foreground">(25 reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {caretaker.skills.slice(0, 2).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {caretaker.skills.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{caretaker.skills.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Experience and Location */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{caretaker.experience} years experience</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{caretaker.location}</span>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-primary">
                    {caretaker.price}
                  </div>
                  <Button variant="professional" size="sm">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Caretakers
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaretakerList;