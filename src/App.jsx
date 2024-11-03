import React, { useEffect, useState } from 'react';



export default function App() {

  const [products, setProducts]=useState([]);//商品用・・初期：空白
  const [loading, setLoading]=useState(true);//ローディング状態用・・初期:true
  const [category, setCategory]=useState("All"); //カテゴリ用・・初期:All
  const [searchTerm, setSearchTerm]=useState("");//キーワード選択用・・初期:空白
  const [filterCategory, setFilterCategory] = useState("All"); // フィルタ用のカテゴリ
  const [filterSearchTerm, setFilterSearchTerm] = useState("");

  useEffect(() => {
    fetch('/products.json')//フェッチAPIを呼ぶ
      .then(response => {
        if (!response.ok) {//エラー
          throw new Error('ネットワークの応答がありません.');
        }
        return response.json();
      })
      .then(data => {//メイン処理
        setProducts(data); // データセット
        setLoading(false); // ローディング完了
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setLoading(false); // エラー発生時：ローディング停止
      });
  }, []);


  //ボタン押したとき
  const handleFilter=()=>{
    setFilterCategory(category);
    setFilterSearchTerm(searchTerm);
  };


  //カテゴリとキーワードのフィルター処理
  const searchFunction=products.filter(products=>{
    const matchCategory=filterCategory==="All" || products.type===filterCategory.toLowerCase();
    const matchSearchTerm=products.name.toLowerCase().includes(filterSearchTerm.toLowerCase());
    return matchCategory&&matchSearchTerm;
  });


    return (
      <>
        <header>
          <h1>The Can Store</h1>
        </header>
        <div>
          <aside>
            <form>
              <div>
                <label htmlFor="category">Choose a category:</label>
                <select id="category"
                        value={category}//
                        onChange={(e)=>setCategory(e.target.value)}//カテゴリ用のイベント処理
                        >
                  <option>All</option>
                  <option>Vegetables</option>
                  <option>Meat</option>
                  <option>Soup</option>
                </select>
              </div>
              <div>
                <label htmlFor="searchTerm">Enter search term:</label>
                <input type="text" 
                       id="searchTerm"
                       placeholder="e.g. beans"
                       value={searchTerm}//
                       onChange={(e)=>setSearchTerm(e.target.value)}//検索の処理
                />
              </div>
              <div>
                <button type="button" 
                        onClickCapture={handleFilter}//ボタン押しイベントの実行
                >
                          Filter results
                </button>
              </div>
            </form>
          </aside>
          <main>
            {loading ? (
              <p>Loading...</p> // ローディングメッセージ
              ) : (
                searchFunction.map((product,index) => (
                <section className={product.type} key={index}>
                  <h2>{product.name}</h2>
                  <p>${product.price.toFixed(2)}</p>
                  <img src={`public/images/${product.image}`} alt={product.name}//画像パス出来た
                  />
                </section>
                ))
              )}
          </main>
        </div>
        <footer>
          <p>All icons found at the Noun Project:</p>
          <ul>
            <li>
              Bean can icon by{" "}
              <a href="https://thenounproject.com/yalanis/">Yazmin Alanis</a>
            </li>
            <li>
              Vegetable icon by{" "}
              <a href="https://thenounproject.com/skatakila/">Ricardo Moreira</a>
            </li>
            <li>
              Soup icon by{" "}
              <a href="https://thenounproject.com/ArtZ91/">Arthur Shlain</a>
            </li>
            <li>
              Meat Chunk icon by{" "}
              <a href="https://thenounproject.com/smashicons/">Oliviu Stoian</a>.
            </li>
          </ul>
        </footer>
      </>
    );
  }