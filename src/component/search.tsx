import './search.css'
export default function Search({onSearch}:{onSearch:(quey:string)=>void}) {
  return (
    <div className="search-bar">
      <input onChange={(e)=>{
        onSearch(e.target.value)
      }} placeholder="Type to search..." />
    </div>
  );
}
