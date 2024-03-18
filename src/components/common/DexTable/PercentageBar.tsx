const PercentageBar = ({ percentage }: { percentage: string }) => {
  const numericValue = parseFloat(percentage);

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div style={{ marginBottom: "4px", textAlign: "right" }}>
        {percentage}
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "#3E3C3C",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            width: `${numericValue}%`,
            backgroundColor: "#FFC403",
            height: "8px",
            borderRadius: "4px",
          }}
        />
      </div>
    </div>
  );
};

export default PercentageBar;
