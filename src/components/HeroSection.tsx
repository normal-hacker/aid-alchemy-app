import { Button } from "@/components/ui/button";
import { Shield, Users, Star } from "lucide-react";
import heroImage from "@/assets/hero-building.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-8 mb-8 opacity-90">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Verified Caretakers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">1000+ Properties</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span className="text-sm">4.9 Rating</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-hero font-bold leading-tight mb-6">
            Find Trusted
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400"> Caretakers</span>
            <br />
            for Your Property
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Connect with verified, professional caretakers to maintain and protect your valuable properties. 
            Secure, reliable, and trusted by thousands of property owners.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button variant="hero" size="lg" className="text-lg px-8 py-6 min-w-[200px]">
              Hire a Caretaker
            </Button>
            <Button variant="action" size="lg" className="text-lg px-8 py-6 min-w-[200px]">
              Become a Caretaker
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-glow">500+</div>
              <div className="text-sm text-gray-300">Active Caretakers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-glow">1,200+</div>
              <div className="text-sm text-gray-300">Properties Protected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-glow">24/7</div>
              <div className="text-sm text-gray-300">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-glow">99%</div>
              <div className="text-sm text-gray-300">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;