import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-building.jpg";

const SignIn = () => {
  const [userType, setUserType] = useState<"owner" | "caretaker">("owner");

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-black/70" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/">
          <Button variant="ghost" className="text-white mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
          <Card className="w-full max-w-md bg-white/95 backdrop-blur-md shadow-hero">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">Welcome to CareTaker Pro</CardTitle>
              <CardDescription>Sign in to your account or create a new one</CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" />
                  </div>
                  <Button className="w-full" variant="hero">
                    Sign In
                  </Button>
                  <Button variant="ghost" className="w-full">
                    Forgot Password?
                  </Button>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-4 mt-4">
                  {/* User Type Selection */}
                  <div className="space-y-3">
                    <Label>I am a:</Label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="userType" 
                          value="owner"
                          checked={userType === "owner"}
                          onChange={(e) => setUserType(e.target.value as "owner" | "caretaker")}
                          className="text-primary"
                        />
                        <span>Property Owner</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="userType" 
                          value="caretaker"
                          checked={userType === "caretaker"}
                          onChange={(e) => setUserType(e.target.value as "owner" | "caretaker")}
                          className="text-primary"
                        />
                        <span>Caretaker</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupEmail">Email</Label>
                    <Input id="signupEmail" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signupPassword">Password</Label>
                    <Input id="signupPassword" type="password" placeholder="Create a password" />
                  </div>

                  {/* Aadhaar Upload for Caretakers */}
                  {userType === "caretaker" && (
                    <div className="space-y-2">
                      <Label htmlFor="aadhaar">Aadhaar Card Upload</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">Click to upload Aadhaar card</p>
                        <input type="file" id="aadhaar" className="hidden" accept="image/*,.pdf" />
                      </div>
                    </div>
                  )}

                  <Button className="w-full" variant="hero">
                    Create Account
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignIn;