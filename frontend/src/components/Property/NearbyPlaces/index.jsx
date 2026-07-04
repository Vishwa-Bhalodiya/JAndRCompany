import "./NearbyPlaces.css";

import {
    FaSchool,
    FaHospital,
    FaRoad,
    FaTrain,
    FaPlane,
    FaShoppingCart
} from "react-icons/fa";

function NearbyPlaces() {

    const places = [

        {
            icon: <FaRoad />,
            title: "National Highway",
            distance: "1.2 km"
        },

        {
            icon: <FaSchool />,
            title: "International School",
            distance: "2.5 km"
        },

        {
            icon: <FaHospital />,
            title: "Multi Speciality Hospital",
            distance: "3.8 km"
        },

        {
            icon: <FaShoppingCart />,
            title: "Shopping Mall",
            distance: "5 km"
        },

        {
            icon: <FaTrain />,
            title: "Railway Station",
            distance: "8 km"
        },

        {
            icon: <FaPlane />,
            title: "Airport",
            distance: "18 km"
        }

    ];

    return (

        <section className="nearby-section">

            <h2>

                Nearby Landmarks

            </h2>

            <div className="row">

                {

                    places.map((place,index)=>(

                        <div
                            className="col-lg-4 col-md-6 mb-4"
                            key={index}
                        >

                            <div className="nearby-card">

                                <div className="nearby-icon">

                                    {place.icon}

                                </div>

                                <h5>

                                    {place.title}

                                </h5>

                                <p>

                                    {place.distance}

                                </p>

                            </div>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default NearbyPlaces;