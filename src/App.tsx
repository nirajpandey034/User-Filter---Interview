import * as React from 'react';
import './style.css';

export default function App() {
  const users1 = [
    { id: 1, name: 'Rahul', age: 30 },
    { id: 7, name: 'John', age: 30 },
    { id: 3, name: 'David', age: 50, city: 'kolkata' },
    { id: 4, name: 'Abhi', age: 40 },
    { id: 5, name: 'Smith', age: 40, gender: 'M' },
  ];
  const [keys, setKeys] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [selectedKey, setSelectedKey] = React.useState('id');
  React.useEffect(() => {
    let k = users1.map((item) => {
      return Object.keys(item);
    });
    let arr = []; // here I hold duplicates

    for (let i = 0; i < k.length; i++) {
      arr = [...arr, ...k[i]];
    }
    let ke = [...new Set(arr)];

    setKeys(ke);
  }, []);

  const inputChangeHandler = (e: any) => {
    setInput(e.target.value);
  };

  const keyChangeHandler = (e: any) => {
    setSelectedKey(e.target.value);
  };

  const groupBy = (users: any, key: any) => {
    let ages = {};
    for (let i = 0; i < users.length; i++) {
      if (Object.keys(users[i]).includes(key)) {
        let age = ages[users[i][key]];
        if (!ages[users[i][key]]) ages[users[i][key]] = [users[i]];
        else {
          ages[users[i][key]] = [...ages[users[i][key]], users[i]];
        }
      }
    }
    return ages;
  };
  const onSearch = () => {
    const groupedData = groupBy(users1, selectedKey);

    console.log(groupedData[input] || 'Wrong Combination');
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <select onChange={keyChangeHandler} value={selectedKey}>
        {keys.map((k, index) => {
          return <option key={index}>{k}</option>;
        })}
      </select>
      <input type="text" value={input} onChange={inputChangeHandler} />
      <button type="button" onClick={onSearch}>
        Search
      </button>
    </div>
  );
}
