import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
            <h1 className="text-2xl font-bold text-primary">CareTaker Pro</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
            <a href="#services" className="text-foreground hover:text-primary transition-colors">Services</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Hiring</a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate("/signin")}>Sign In</Button>
            <Button variant="professional" onClick={() => navigate("/post-requirement")}>Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              <a href="#home" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">Home</a>
              <a href="#about" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">About</a>
              <a href="#services" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">Services</a>
              <a href="#contact" className="block px-3 py-2 text-foreground hover:text-primary transition-colors">Contact</a>
              <div className="pt-4 pb-3 border-t border-border">
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" className="w-full justify-center" onClick={() => navigate("/signin")}>Sign In</Button>
                  <Button variant="professional" className="w-full justify-center" onClick={() => navigate("/post-requirement")}>Get Started</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;