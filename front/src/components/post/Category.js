import React, { useState, useEffect } from "react";
import Catbtn from "./Catbtn";

const CategoryUnitDiv = styled.div`
  margin: 10px 10px;
`;
// tag 리스트를 for문으로 돌려서 만들어 지도록 개선해야함
function Category() {
  //   const [tag, setTag] = useState([]);
  //   //   let tag = ""; // 임시, 추후 tag 상태를 가져와야함

  //   const updateTag = async (tag) => {
  //     console.log("tag:", tag);
  //   };
  //   useEffect(() => {
  //     updateTag(tag);
  //   }, [tag]);
  //   console.log("버튼 이름: ", Catbtn.handleSetCat);
  //////////
  const [activeCat, setActiveCat] = useState("All");
  //   const [data, setData] = useState(items);
  const [data, setData] = useState("");

  useEffect(() => {
    activeCat === "All" ? setData("") : setData("");
    //   ? setData(items)
    //   : setData(items.filter((tag) => item.tag === activeCat));
  }, [activeCat]);
  //////////
  return (
    <div className="box-category">
      <CategoryUnitDiv>
        <Catbtn
          name="All"
          catActive={activeCat === "All" ? true : false}
          handleSetCat={setActiveCat}
        />
      </CategoryUnitDiv>
      <CategoryUnitDiv>
        <Catbtn
          name="SERVER"
          catActive={activeCat === "SERVER" ? true : false}
          handleSetCat={setActiveCat}
        />
      </CategoryUnitDiv>
      <Catbtn
        name="BACKEND"
        catActive={activeCat === "BACKEND" ? true : false}
        handleSetCat={setActiveCat}
      />
      <Catbtn
        name="FRONTEND"
        catActive={activeCat === "FRONTEND" ? true : false}
        handleSetCat={setActiveCat}
      />
      <Catbtn
        name="DEVOPS"
        catActive={activeCat === "DEVOPS" ? true : false}
        handleSetCat={setActiveCat}
      />
      <Catbtn
        name="QA/TESTING"
        catActive={activeCat === "QA/TESTING" ? true : false}
        handleSetCat={setActiveCat}
      />
      <Catbtn
        name="SECURITY"
        catActive={activeCat === "SECURITY" ? true : false}
        handleSetCat={setActiveCat}
      />
      <Catbtn
        name="DATA"
        catActive={activeCat === "DATA" ? true : false}
        handleSetCat={setActiveCat}
      />
      <Catbtn
        name="etc"
        catActive={activeCat === "etc" ? true : false}
        handleSetCat={setActiveCat}
      />
    </div>
  );
}

export default Category;

// return (
//     <div className="box-category">
//       <button
//         type="button"
//         className="btn-post-category"
//         onClick={updateTag}
//         href="/posts"
//       >
//         SERVER
//       </button>
//       <button type="button" className="btn-post-category" href="/posts">
//         BACKEND
//       </button>
//       <button type="button" className="btn-post-category" href="/posts">
//         FRONTEND
//       </button>
//       <button type="button" className="btn-post-category" href="/posts">
//         PM
//       </button>
//       <button type="button" className="btn-post-category" href="/posts">
//         DEVOPS
//       </button>
//       <button type="button" className="btn-post-category" href="/posts">
//         QA/TESTING
//       </button>
//       <button type="button" className="btn-post-category" href="/posts">
//         SECURITY
//       </button>
//       <button type="button" className="btn-post-category" href="/posts">
//         APP
//       </button>
//       <button type="button" className="btn-post-category" href="/posts">
//         DATA
//       </button>
//       <button type="button" className="btn-post-category" href="/posts">
//         ETC
//       </button>
//     </div>
//   );
