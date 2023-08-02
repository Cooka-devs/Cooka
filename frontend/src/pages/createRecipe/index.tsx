const CreateRecipe = ({ ondelete }: any) => {
  return (
    <div className="makeboard">
      <input type="file" />
      <div>
        제목:
        <input />
      </div>
      <div>
        내용:
        <input />
      </div>
      <div onClick={ondelete}>돌아가기</div>
    </div>
  );
};
export default CreateRecipe;
