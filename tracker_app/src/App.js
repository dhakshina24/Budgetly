import './App.css';
import React, { useState, useEffect } from 'react';


function App() {
  const [name, setName] = useState('');
  const [dateTime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transaction, setTransactions] = useState([]);

  useEffect(()=>{
    getTransactions().then(data=>setTransactions(data));
  }, []);

  async function getTransactions(){
    const url = process.env.REACT_APP_API_URL + "/transaction";
    const response = await fetch(url);
    return await response.json();

  }

  function addNewTransaction(ev){
    ev.preventDefault();
    const url=process.env.REACT_APP_API_URL + '/transaction';

    const price = name.split(' ')[0];

    fetch(url, {
      method: 'POST',
      headers: {'Content-type':'application/json'}, 
      body:JSON.stringify({
        price,
        name:name.substring(price.length+1), 
        description, 
        dateTime
      })
    }).then(response => {
      response.json().then(json=> {
        setName('');
        setDatetime('');
        setDescription('');
        console.log('result', json);
      });
    });
  }

  let balance = 0;
  for (const t of transaction){
    balance = balance + parseInt(t.price);
  }

  balance = balance.toFixed(2);
  const fraction = balance.split('.')[1];
  balance = balance.split('.')[0];

  return (
    <main>
      <h1>${balance}.<span>{fraction}</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input type = "text" 
          value={name}
          onChange={ev => setName(ev.target.value)}
          placeholder={'+200 new samsung tv'}/> 
          <input type = "datetime-local"
          value={dateTime}
          onChange={ev => setDatetime(ev.target.value)}/>
        </div>
        <div className="description">
          <input type = "text" 
          value={description}
          onChange={ev => setDescription(ev.target.value)}
          placeholder={'description'}/>
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      <div className="transactions">
        {transaction.length>0 && transaction.map((transaction =>
          <div key={transaction._id}>
          <div className="transaction">
          <div className = "left">
            <div className="name">{transaction.name}</div>
            <div className="description">{transaction.description}</div>
          </div>
          <div className="right">
            <div className={"price" + (transaction.price < 0 ?" red" :" green")}>
              {transaction.price < 0 ?(transaction.price.toString()[0] + "$" + transaction.price.toString().substring(1,transaction.price.length)):("+" + "$" + transaction.price.toString())}
            </div>
            <div className="datetime">{new Date(transaction.dateTime).toDateString()}</div>
          </div>
        </div>
        </div>
        ))}
      </div>
    </main>
  );
}

export default App;
