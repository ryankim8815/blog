import styled from "styled-components";

const CategoryButton = styled.button`
  height: 26px;
  color: black;
  font-size: 12px;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 15px;
  border-radius: 13px;
  display: inline-flex;
  cursor: pointer;
  // background: pink; // 확인용
  border: 1px solid lightgray;
  background: none;
  boxshadow: null;

  &:hover {
    background: #e5e5e5;
    color: black;
    border: 1px solid gray;
    box-shadow: 0 0 2px 0px lightgray;
  }
`;
function Catbtn({ name, catActive, handleSetCat }) {
  return (
    <CategoryButton
      onClick={() => handleSetCat(name)}
      style={
        catActive
          ? {
              border: "1px solid gray",
              background: "#e5e5e5",
              boxShadow: "0 0 2px 0px lightgray",
            }
          : {}
      }
    >
      {name}
    </CategoryButton>
  );
}
export default Catbtn;
