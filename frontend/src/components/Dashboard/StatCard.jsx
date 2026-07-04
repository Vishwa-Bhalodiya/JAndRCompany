function StatCard({ title, value }) {
    return (
        <div style={{
            background: "#181818",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid rgba(212,175,55,.15)",
            color: "#fff"
        }}>
            <h4 style={{ color: "#aaa" }}>{title}</h4>
            <h2 style={{ color: "#D4AF37" }}>{value}</h2>
        </div>
    );
}

export default StatCard;