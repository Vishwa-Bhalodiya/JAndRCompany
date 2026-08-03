import { API_BASE_URL } from "../../config";
import { useEffect, useState } from "react";

import Hero from "../../components/Hero";
import PropertySearch from "../../components/PropertySearch";
import FeaturedProperties from "../../components/FeaturedProperties";
import WhyChoose from "../../components/WhyChoose";
import Stats from "../../components/Stats";
import Services from "../../components/Services";

function Home() {
    const [home, setHome] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/home/`
                );

                const data = await response.json();

                setHome(data);
            } catch (error) {
                console.error("Failed to load home data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHomeData();
    }, []);

    if (loading) {
        return <h2 style={{ textAlign: "center", marginTop: "100px" }}>Loading...</h2>;
    }

    if (!home) {
        return <h2 style={{ textAlign: "center", marginTop: "100px" }}>Failed to load data.</h2>;
    }

    return (
        <>
            <Hero hero={home.hero} />

           

            <FeaturedProperties
                properties={home.featured_properties}
            />

            <WhyChoose />

            <Stats stats={home.stats} />

            <Services />
        </>
    );
}

export default Home;