import React, { useState } from 'react'

function MemoForm({ addMemo }) {
    const [input, setInput] = useState("");

    function handleSubmitMemo(e) {
        e.preventDefault();
        addMemo(input);
        setInput("");
    }
    
  return (
    <div>
        <form onSubmit={handleSubmitMemo} className='memo-form'>
            <input type="text" 
            value={input}
            onChange={(e) => {
                setInput(e.target.value);
            }}
            placeholder='메모를 입력하세요.'/>
            <button type='submit'>추가</button>
        </form>
    </div>
  )
}

export default MemoForm