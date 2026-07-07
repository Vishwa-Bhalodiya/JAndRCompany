import { useEffect, useState } from "react";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  Legend,
  ResponsiveContainer
} from "recharts";

import {
  FaHome,
  FaPlus,
  FaChartLine,
  FaMoneyBill,
  FaBars
} from "react-icons/fa";

function DashboardHome() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/properties/`);
        setProperties(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={styles.loadingPage}>
        Loading SaaS Dashboard...
      </div>
    );
  }

  // ================= DATA =================
  const total = properties.length;
  const forSale = properties.filter(p => p.status === "For Sale").length;
  const forRent = properties.filter(p => p.status === "For Rent").length;
  const sold = properties.filter(p => p.status === "Sold").length;

  const totalValue = properties.reduce(
    (acc, p) => acc + (Number(p.price) || 0),
    0
  );

  const pieData = [
    { name: "For Sale", value: forSale },
    { name: "For Rent", value: forRent },
    { name: "Sold", value: sold }
  ];

  const COLORS = ["#37b5d4", "#ffffff", "#333"];

  const barData = properties.slice(0, 6).map(p => ({
    name: p.title,
    price: Number(p.price) || 0
  }));

  const lineData = [
    { month: "Jan", value: forSale + 1 },
    { month: "Feb", value: forSale + 3 },
    { month: "Mar", value: forSale + 2 },
    { month: "Apr", value: forSale + 5 },
    { month: "May", value: forSale + 4 },
    { month: "Jun", value: forSale + 6 }
  ];

  return (
    <div style={styles.app}>

      

      {/* MAIN AREA */}
      <div style={styles.main}>

      

        {/* KPI CARDS */}
        <div style={styles.grid4}>
          <Kpi title="Properties" value={total} />
          <Kpi title="For Sale" value={forSale} />
          <Kpi title="For Rent" value={forRent} />
          <Kpi title="Sold" value={sold} />
        </div>

        {/* VALUE CARD */}
        <div style={styles.valueCard}>
          <h3>Total Portfolio Value</h3>
          <h1>₹ {totalValue.toLocaleString()}</h1>
        </div>

        {/* CHART SECTION */}
        <div style={styles.grid2}>

          {/* PIE */}
          <div style={styles.card}>
  <h3 style={styles.cardTitle}>Property Status Breakdown</h3>

  <p style={styles.chartInfo}>
    This chart shows how your properties are distributed across sales, rent, and sold categories.
  </p>

  <ResponsiveContainer width="100%" height={320}>
    <PieChart>

      <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        outerRadius={110}
        innerRadius={60}
        paddingAngle={6}
        label={({ name, value }) => `${name}: ${value}`}
      >
        {pieData.map((entry, index) => {
          const colorMap = {
            "For Sale": "#37b5d4",   // gold
            "For Rent": "#FFFFFF",   // white
            "Sold": "#444444"        // dark gray
          };

          return (
            <Cell key={index} fill={colorMap[entry.name]} />
          );
        })}
      </Pie>

      <Tooltip
        contentStyle={{
          backgroundColor: "#0B0B0B",
          border: "1px solid #37b5d4",
          color: "#fff"
        }}
        formatter={(value, name) => [
          `${value} properties`,
          `${name} status`
        ]}
      />

      <Legend
        verticalAlign="bottom"
        formatter={(value) => {
          const labelMap = {
            "For Sale": " Available for Sale",
            "For Rent": " Available for Rent",
            "Sold": " Sold Properties"
          };
          return <span style={{ color: "#fff" }}>{labelMap[value]}</span>;
        }}
      />

    </PieChart>
  </ResponsiveContainer>
</div>

          {/* BAR */}
          <div style={styles.card}>
            <h3 style={styles.title}>Top Properties</h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="name" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="price" fill="#37b5d4" />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* LINE */}
        <div style={styles.card}>
          <h3 style={styles.title}>Growth Trend</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="month" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#37b5d4"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */



function Kpi({ title, value }) {
  return (
    <div style={styles.kpi}>
      <h4 style={{ color: "#aaa" }}>{title}</h4>
      <h2 style={{ color: "#fff" }}>{value}</h2>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  app: {
    display: "flex",
    background: "#0a0a0a",
    minHeight: "100vh",
    color: "#fff"
  },

  sidebar: {
    background: "#111",
    borderRight: "1px solid rgba(201,162,39,0.2)",
    padding: "15px",
    transition: "0.3s"
  },

  logo: {
    color: "#37b5d4",
    marginBottom: "20px",
    fontWeight: "bold"
  },

  sidebarItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    cursor: "pointer",
    color: "#aaa",
    transition: "0.3s"
  },

  main: {
    flex: 1,
    padding: "20px"
  },

  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  grid4: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px"
  },

  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    marginTop: "20px"
  },

  kpi: {
    background: "#111",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #222"
  },

  card: {
    background: "#111",
    padding: "20px",
    borderRadius: "14px",
    marginTop: "20px",
    border: "1px solid #222"
  },

  title: {
    color: "#37b5d4"
  },

  valueCard: {
    marginTop: "20px",
    padding: "20px",
    borderRadius: "14px",
    background: "linear-gradient(135deg,#000,#1a1a1a)",
    border: "1px solid #37b5d4",
    color: "#37b5d4"
  },

  loadingPage: {
    color: "#37b5d4",
    padding: "20px"
  }
};

export default DashboardHome;