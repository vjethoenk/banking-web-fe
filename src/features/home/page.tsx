import HeroSection from "./components/HeroSection";
import RegisterSection from "./components/RegisterSection";
import ServicesSection from "./components/ServicesSection";
import StatisticsSection from "./components/StatisticsSection";

export const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <StatisticsSection />
            <ServicesSection />
            <RegisterSection />
        </div>
    );
};

