const Divider = ({ color = "black", style = "solid" }) => {
  return (
    <div
      style={{
        width: "100%",
        borderTop: `0.1rem ${style} ${color}`,
        marginBottom: "1rem",
      }}
    />
  );
};
export default Divider;
