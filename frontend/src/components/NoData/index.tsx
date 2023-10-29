interface NoDataProps {
  paddingLeft?: string;
  marginBottom?: string;
  paddingTop?: string;
}

const NoData = ({ paddingLeft, marginBottom, paddingTop }: NoDataProps) => {
  return (
    <div
      style={{
        paddingLeft: `${paddingLeft}`,
        marginTop: `${marginBottom}`,
        paddingTop: `${paddingTop}`,
      }}
    >
      게시물이 존재하지 않습니다.
    </div>
  );
};
export default NoData;
