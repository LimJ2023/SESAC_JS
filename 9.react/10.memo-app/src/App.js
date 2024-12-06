import "./App.css";
import { useEffect, useState } from "react";
import MemoForm from "./components/MemoForm";
import MemoList from "./components/MemoList";
import SearchComponent from "./components/SearchComponent";
import MemoSort from "./components/MemoSort";
import MemoDetail from "./components/MemoDetail";

export default function App() {
  const savedMemos = JSON.parse(localStorage.getItem("memos"));
  const [memos, setMemos] = useState(savedMemos || []);
  const [filteredMemos, setFilteredMemos] = useState(memos);
  const [isDetailOpen, setIsdetailOpen] = useState(false);
  const [selectedMemo, setSelectedMemo] = useState(null);

  // 추가
  function addMemo(text) {
    const newMemo = { id: Date.now(), text, content: "", fileName: "" };
    setMemos([...memos, newMemo]);
  }
  // 삭제
  function deleteMemo(id) {
    setMemos(memos.filter((memo) => memo.id !== id));
  }
  // 수정
  function editMemo(id, text) {
    const newmemos = memos.map((m) => {
      if (m.id === id) {
        return { ...m, text: text };
      } else {
        return m;
      }
    });
    setMemos(newmemos);
  }

  // 검색
  function searching(input) {
    const searchMemos = memos.filter((m) =>
      m.text.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredMemos(searchMemos);
  }

  // 메모상태 변경마다 추가작업
  // 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("memos", JSON.stringify(memos));
    setFilteredMemos(memos);
  }, [memos]);

  // 정렬
  function sorting(value) {
    let sortedMemos;
    if (value === 1) {
      sortedMemos = [...filteredMemos].sort((a, b) => a.id - b.id);
    } else if (value === 2) {
      sortedMemos = [...filteredMemos].sort((a, b) => b.id - a.id);
    } else if (value === 3) {
      sortedMemos = [...filteredMemos].sort((a, b) => {
        if (a.text < b.text) {
          return -1;
        }
        if (a.text > b.text) {
          return 1;
        }
        // 이름이 같을 경우
        return 0;
      });
    }
    setFilteredMemos(sortedMemos); // 상태 업데이트
  }
  // 상세보기
  function toggleDetail(id) {
    setIsdetailOpen(!isDetailOpen);
    const memo = memos.find((m) => m.id === id);
    setSelectedMemo(memo);
  }
  // 제목 내용 저장
  function saveDetail(id, title, content, fileName) {
    const newMemos = memos.map((m) => {
      if (m.id === id) {
        return { ...m, text: title, content: content, fileName: fileName };
      } else return m;
    });
    setMemos(newMemos);
    toggleDetail(id);
  }
  return (
    <div className="App">
      <main>
        <h1>메모 앱(투두리스트)</h1>
        <SearchComponent searching={searching} />
        <MemoForm addMemo={addMemo} memos={memos} />
        <MemoSort sorting={sorting} />
        <MemoList
          memos={filteredMemos}
          deleteMemo={deleteMemo}
          editMemo={editMemo}
          toggleDetail={toggleDetail}
        />
        {isDetailOpen && (
          <MemoDetail
            saveDetail={saveDetail}
            selectedMemo={selectedMemo}
            setIsdetailOpen={setIsdetailOpen}
          />
        )}
      </main>
    </div>
  );
}
