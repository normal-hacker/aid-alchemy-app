import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import heroImage from "@/assets/hero-building.jpg";

// Validation schemas
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const signUpSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  userType: z.enum(["owner", "caretaker"])
});

const SignIn = () => {
  const [userType, setUserType] = useState<"owner" | "caretaker">("owner");
  const [isLoading, setIsLoading] = useState(false);
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    userType: "owner" as "owner" | "caretaker"
  });
  
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validatedData = signInSchema.parse(signInData);
      const { error } = await signIn(validatedData.email, validatedData.password);
      
      if (error) {
        if (error.message === 'Invalid login credentials') {
          toast({
            title: "Sign In Failed",
            description: "Invalid email or password. Please try again.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Sign In Failed",
            description: error.message || "An error occurred during sign in.",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Welcome back!",
          description: "You have been signed in successfully."
        });
        navigate('/');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validatedData = signUpSchema.parse(signUpData);
      const { error } = await signUp({
        email: validatedData.email,
        password: validatedData.password,
        fullName: validatedData.fullName,
        phoneNumber: validatedData.phoneNumber,
        userType: validatedData.userType
      });
      
      if (error) {
        if (error.message === 'User already registered') {
          toast({
            title: "Account Exists",
            description: "An account with this email already exists. Please sign in instead.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Sign Up Failed",
            description: error.message || "An error occurred during sign up.",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Account Created!",
          description: "Please check your email to confirm your account."
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

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
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Enter your email"
                        value={signInData.email}
                        onChange={(e) => setSignInData({...signInData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="Enter your password"
                        value={signInData.password}
                        onChange={(e) => setSignInData({...signInData, password: e.target.value})}
                        required
                      />
                    </div>
                    <Button className="w-full" variant="hero" type="submit" disabled={isLoading}>
                      {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-4 mt-4">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    {/* User Type Selection */}
                    <div className="space-y-3">
                      <Label>I am a:</Label>
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input 
                            type="radio" 
                            name="userType" 
                            value="owner"
                            checked={signUpData.userType === "owner"}
                            onChange={(e) => setSignUpData({...signUpData, userType: e.target.value as "owner" | "caretaker"})}
                            className="text-primary"
                          />
                          <span>Property Owner</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input 
                            type="radio" 
                            name="userType" 
                            value="caretaker"
                            checked={signUpData.userType === "caretaker"}
                            onChange={(e) => setSignUpData({...signUpData, userType: e.target.value as "owner" | "caretaker"})}
                            className="text-primary"
                          />
                          <span>Caretaker</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName" 
                        placeholder="Enter your full name"
                        value={signUpData.fullName}
                        onChange={(e) => setSignUpData({...signUpData, fullName: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupEmail">Email</Label>
                      <Input 
                        id="signupEmail" 
                        type="email" 
                        placeholder="Enter your email"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="Enter your phone number"
                        value={signUpData.phoneNumber}
                        onChange={(e) => setSignUpData({...signUpData, phoneNumber: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupPassword">Password</Label>
                      <Input 
                        id="signupPassword" 
                        type="password" 
                        placeholder="Create a password"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
                        required
                      />
                    </div>

                    {/* Aadhaar Upload for Caretakers */}
                    {signUpData.userType === "caretaker" && (
                      <div className="space-y-2">
                        <Label htmlFor="aadhaar">Aadhaar Card Upload (Optional)</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">Click to upload Aadhaar card</p>
                          <input type="file" id="aadhaar" className="hidden" accept="image/*,.pdf" />
                        </div>
                      </div>
                    )}

                    <Button className="w-full" variant="hero" type="submit" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
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