import React from 'react'

function MemoSort({sorting}) {

    
  return (
    <div>
        <select name="sort" id="" onChange={(e) => {
            sorting(e.target.value);
        }}>
            <option value="1">
                최신순
            </option>
            <option value="2">
                오래된순
            </option>
            <option value="3">
                알파벳순
            </option>
        </select>
    </div>
  )
}

export default MemoSort