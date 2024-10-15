import React, { useState } from 'react';
import Header from './component/header';
import ProductList from './component/product-list';

function App() {
  const [searchItem,setSearchItem] = useState("");
  const [orderBy,setOrderBy] = useState("");

  const searchHandler = (value:string)=>{
    setSearchItem(value)
  }

  const sortHandler = (sort:string)=>{
    setOrderBy(sort)
  }


  return (
    <div className="App">
      <header>
          <Header onSort={sortHandler} onSearch={searchHandler}/>
      </header>

      <main>
        <ProductList orderBy={orderBy} searchItem={searchItem}/>
      </main>
    </div>
  );
}

export default App;
