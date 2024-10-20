export const ScrollBar: React.FC = () => {
  const style: React.CSSProperties = {
    position: "absolute",
    top: "96px",
    left: "0",
    width: "96px",
    height: "8px",
    backgroundColor: "#978a8a",
    borderRadius: "8px",
  };

  return <div {...{ style }}></div>;
};
