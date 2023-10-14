const Divider = ({
  color = "black",
  style = "solid",
  weight = "0.1rem",
  width = "100%",
}) => {
  return (
    <div
      style={{
        width: `${width}`,
        borderTop: `${weight} ${style} ${color}`,
        marginBottom: "1rem",
      }}
    />
  );
};
export default Divider;
