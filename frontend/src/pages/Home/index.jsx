import Hero from "../../components/Hero";
import PropertySearch from "../../components/PropertySearch";
import FeaturedProperties from "../../components/FeaturedProperties";
import WhyChoose from "../../components/WhyChoose";
import Stats from "../../components/Stats"
import Services from "../../components/Services";

function Home() {
    return (
        <>
            <Hero />

            <PropertySearch />

            <FeaturedProperties />

            <WhyChoose />

            <Stats />

            <Services />
        </>
    );
}

export default Home;