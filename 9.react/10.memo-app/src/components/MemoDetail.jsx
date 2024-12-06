import React, { useState } from 'react'

function MemoDetail({saveDetail, selectedMemo, setIsdetailOpen}) {
    const [title, setTitle] = useState(selectedMemo.text);
    const [content,setContent] = useState(selectedMemo.content)
    const [fileName, setFileName] = useState(selectedMemo.fileName);
    // 1. 내부에서 메모 제목과 상세내용을 관리한다.
    // 2. 메모를 저장하는 함수를 받아온다. 
    // 3. 내부에 저장된 내용을 2번의 함수를 통해서 다시 바깥으로 저장해준다.
  return (
    <div className='memo-detail-overlay' >
        <div className='memo-detail'>
            <h2>메모 상세보기</h2>
            <input type="text" placeholder='제목을 입력하세요.' value={title} onChange={(e) => {
                setTitle(e.target.value);
            }}/>
            <textarea placeholder='상세 내용을 입력하세요.' onChange={(e) => {
                setContent(e.target.value);
            }} value={content}></textarea>
                        {fileName ? (
            <img
            src={`/images/${fileName}`}
            alt="이미지"
            style={{ width: '100px' }}
                />
            ) : (
                "없음"
            )}
            <input
                type="file"
                onChange={(e) => {
                    const file = e.target.files[0]; 
                    setFileName(file.name);
                }}
            />
            <div>
                <button onClick={() => {
                    saveDetail(selectedMemo.id, title, content, fileName);
                }}>저장</button>
                <button onClick={() => {
                        setIsdetailOpen(false);
                    }
                }>닫기</button>
                <button onClick={() => {
                    saveDetail(selectedMemo.id, title, content, "");
                }}>첨부파일 삭제</button>
            </div>
        </div>
    </div>
  )
}

export default MemoDetail