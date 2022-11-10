export default function Catbtn({ name, catActive, handleSetCat }) {
  return (
    <button
      className={`btn-post-category  ${catActive ? "active_btn" : null}`}
      onClick={() => handleSetCat(name)}
    >
      {name}
    </button>
  );
}
