import styled from "styled-components";

export default function Catbtn({ name, catActive, handleSetCat }) {
  const CategoryButton = styled.button`
    // width: 200px;
    height: 24px;
    color: black;
    font-size: 12px;
    font-family: $font-elice-content;
    align-items: center;
    justify-content: flex-end;
    // border: 1px solid lightgray;
    border: ${catActive ? "1px solid gray" : "1px solid lightgray"};
    // background: white;
    background: ${catActive ? "lightgray" : "white"};
    border-radius: 12px;
    margin: 10px 20px;
    display: inline-flex;
    cursor: pointer;
    box-shadow: ${catActive ? "0 0 2px 0px lightgray" : null};
    &:hover {
      background: lightgray;
      color: black;
      border: 1px solid gray;
      box-shadow: 0 0 2px 0px lightgray;
    }
  `;
  // const ActiveButton = styled.button`
  //   background: lightgray;
  //   // color: black;
  //   border: 1px solid gray;
  //   box-shadow: 0 0 2px 0px lightgray;
  // `;

  return (
    <CategoryButton onClick={() => handleSetCat(name)}>{name}</CategoryButton>
  );
  // return (
  //   <button
  //     className={`btn-post-category  ${catActive ? "active_btn" : null}`}
  //     onClick={() => handleSetCat(name)}
  //   >
  //     {name}
  //   </button>
  // );
}
