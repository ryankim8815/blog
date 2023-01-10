import React, { useState, useEffect } from "react";
import Catbtn from "./Catbtn";
import tags from "../editor/Tags";

const CategoryUnitDiv = styled.div`
  margin: 10px 10px;
`;
function Category() {
  const [activeCat, setActiveCat] = useState("All");
  const [data, setData] = useState("");

  useEffect(() => {
    activeCat === "All" ? setData("") : setData("");
  }, [activeCat]);

  return (
    <div className="box-category">
      <CategoryUnitDiv>
        <Catbtn
          name="All"
          catActive={activeCat === "All" ? true : false}
          handleSetCat={setActiveCat}
        />
      </CategoryUnitDiv>
      {tags.map((tag) => (
        <Catbtn
          key={tag}
          name={tag.toUpperCase()}
          catActive={activeCat === tag.toUpperCase() ? true : false}
          handleSetCat={setActiveCat}
        />
      ))}
    </div>
  );
}

export default Category;
