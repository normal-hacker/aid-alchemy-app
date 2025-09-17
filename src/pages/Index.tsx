import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServiceHighlights from "@/components/ServiceHighlights";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ServiceHighlights />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
