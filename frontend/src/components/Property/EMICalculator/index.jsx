import "./EMICalculator.css";

import { useState } from "react";

function EMICalculator() {

    const [price, setPrice] = useState(5000000);
    const [downPayment, setDownPayment] = useState(1000000);
    const [interest, setInterest] = useState(8.5);
    const [years, setYears] = useState(15);

    const loanAmount = price - downPayment;

    const monthlyRate = interest / 12 / 100;

    const months = years * 12;

    const emi =
        monthlyRate === 0
            ? loanAmount / months
            : (loanAmount *
                  monthlyRate *
                  Math.pow(1 + monthlyRate, months)) /
              (Math.pow(1 + monthlyRate, months) - 1);

    return (

        <section className="emi-section">

            <h2>EMI Calculator</h2>

            <p>
                Estimate your monthly payment for this Property.
            </p>

            <div className="emi-grid">

                <div>

                    <label>Property Price (₹)</label>

                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />

                </div>

                <div>

                    <label>Down Payment (₹)</label>

                    <input
                        type="number"
                        value={downPayment}
                        onChange={(e) =>
                            setDownPayment(Number(e.target.value))
                        }
                    />

                </div>

                <div>

                    <label>Interest Rate (%)</label>

                    <input
                        type="number"
                        step="0.1"
                        value={interest}
                        onChange={(e) =>
                            setInterest(Number(e.target.value))
                        }
                    />

                </div>

                <div>

                    <label>Loan Tenure (Years)</label>

                    <input
                        type="number"
                        value={years}
                        onChange={(e) => setYears(Number(e.target.value))}
                    />

                </div>

            </div>

            <div className="emi-result">

                <h3>Estimated Monthly EMI</h3>

                <h1>

                    ₹ {isFinite(emi) ? emi.toLocaleString("en-IN", {
                        maximumFractionDigits: 0
                    }) : 0}

                </h1>

            </div>

        </section>

    );

}

export default EMICalculator;