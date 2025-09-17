import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MapPin, Home, Building, Landmark } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const PostRequirement = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    city: "",
    assetType: "",
    address: "",
  });
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      // Navigate to caretaker list
      navigate("/caretakers");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", 
    "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur"
  ];

  const assetTypes = [
    { value: "house", label: "House/Apartment", icon: Home },
    { value: "land", label: "Land/Plot", icon: Landmark },
    { value: "commercial", label: "Commercial Property", icon: Building },
  ];

  return (
    <div className="min-h-screen bg-gradient-service">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum 
                    ? "bg-primary text-white" 
                    : "bg-gray-200 text-gray-600"
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-16 h-1 ml-4 ${
                    step > stepNum ? "bg-primary" : "bg-gray-200"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {step === 1 && "Select Your City"}
                {step === 2 && "Choose Asset Type"}
                {step === 3 && "Property Address"}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Step 1: City Selection */}
              {step === 1 && (
                <div className="space-y-4">
                  <Label htmlFor="city">Select City</Label>
                  <Select value={formData.city} onValueChange={(value) => setFormData({...formData, city: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Step 2: Asset Type */}
              {step === 2 && (
                <div className="space-y-4">
                  <Label>Select Asset Type</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {assetTypes.map((type) => (
                      <div
                        key={type.value}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.assetType === type.value
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 hover:border-primary/50"
                        }`}
                        onClick={() => setFormData({...formData, assetType: type.value})}
                      >
                        <div className="text-center">
                          <type.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <p className="font-medium">{type.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Address */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Complete Address</Label>
                    <Input
                      id="address"
                      placeholder="Enter exact property address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                  
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Location on Map</span>
                    </div>
                    <div className="bg-white h-48 rounded border flex items-center justify-center">
                      <p className="text-gray-500">Google Maps Integration</p>
                      <p className="text-sm text-gray-400 ml-2">(Requires Google Maps API)</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  disabled={step === 1}
                >
                  Back
                </Button>
                <Button 
                  variant="hero" 
                  onClick={handleNext}
                  disabled={
                    (step === 1 && !formData.city) ||
                    (step === 2 && !formData.assetType) ||
                    (step === 3 && !formData.address)
                  }
                >
                  {step === 3 ? "Find Caretakers" : "Next"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostRequirement;