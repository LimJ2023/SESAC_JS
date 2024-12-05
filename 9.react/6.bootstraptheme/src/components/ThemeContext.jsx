import { createContext, useContext, useState } from "react";


const ThemeContext = createContext(); // 글로벌하게 사용할 데이터

  const ThemeSelector = ({children}) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleTheme = () => {
      setIsDarkMode((preMode) => !preMode);
      //이전 테마 상태를 가져다 반전
    }

    return (
      //provider가 정보 제공자. Consumer들에게 제공한 내용을 쓸 수 있게 해줌
      <ThemeContext.Provider value={{isDarkMode,toggleTheme}}>
        {children}
      </ThemeContext.Provider>
    )
}

//커스텀 훅
const useTheme = () => useContext(ThemeContext);

export {ThemeSelector, useTheme, useContext};