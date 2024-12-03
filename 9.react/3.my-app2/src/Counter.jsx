
// import Message from './Message';
function Counter({count, setCount}) {
    
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);


  return (
    <div><h2>Counter : {count} </h2>
    <button onClick={increment}>증가</button>
    <button onClick={decrement}>감소</button>

    {/* <Message count={count}/> */}
    </div>


  )
}

export default Counter