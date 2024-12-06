import React from 'react'
import MemoComponent from './MemoComponent'

function MemoList({memos, deleteMemo, editMemo, toggleDetail}) {

  return (
    <div>
            <ul className='memo-list'>
                {memos.map((memo) => (
                        <MemoComponent id={memo.id} text={memo.text} deleteMemo={deleteMemo} 
                        editMemo={editMemo} toggleDetail={toggleDetail} key={memo.id} 
                        />
                ))}
            </ul>
    </div>
  )
}

export default MemoList