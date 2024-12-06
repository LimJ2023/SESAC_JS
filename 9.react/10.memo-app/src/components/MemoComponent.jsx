import React, { useState } from 'react'

function MemoComponent({text, id, deleteMemo, editMemo, toggleDetail}) {
    const [memoText,setMemoText] = useState(text);
    const [isChecked, setIsChecked] = useState(false);

    function toggleMemo() {
        setIsChecked(!isChecked);
    }
  return (
    <li className='memo-item'>
        {/* 완료 체크박스 */}
            <input type="checkbox" className="memo-checkbox" onChange={(e)=> {
                toggleMemo(e);
            }}/>
        {/* 메모 텍스트 */}
        <input type="text" value={memoText} disabled={isChecked} onChange={
            (e) => {
                setMemoText(e.target.value);
            }
        }/>
        {/* 상세보기 */}
        <button onClick={() => {
            toggleDetail(id);
        }}>상세보기</button>
        <button onClick={() => {
            deleteMemo(id);
        }}>X</button>
        <button onClick={() => {
            editMemo(id, memoText);
        }}>edit</button>
    </li>
  )
}

export default MemoComponent