import Footer from "./components/Footer";
import Header from "./components/header";
import HeroSection from "./components/HeroSection";
import RegisterSection from "./components/RegisterSection";
import ServicesSection from "./components/ServicesSection";
import StatisticsSection from "./components/StatisticsSection";

export const HomePage = () => {
    return (
        <div className="min-h-screen bg-[#f5f7fa]">
            <Header />

            <main>
                <HeroSection />

                <StatisticsSection />

                <ServicesSection />

                <RegisterSection />
            </main>

            <Footer />
        </div>
    );
};

