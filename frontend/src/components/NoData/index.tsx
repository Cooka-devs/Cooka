interface NoDataProps {
  paddingLeft?: string;
  marginBottom?: string;
  paddingTop?: string;
  fontSize?: string;
}

const NoData = ({
  paddingLeft,
  marginBottom,
  paddingTop,
  fontSize,
}: NoDataProps) => {
  return (
    <div
      style={{
        paddingLeft: `${paddingLeft}`,
        marginTop: `${marginBottom}`,
        paddingTop: `${paddingTop}`,
        fontSize: `${fontSize}`,
      }}
    >
      게시물이 존재하지 않습니다.
    </div>
  );
};
export default NoData;
