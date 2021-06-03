import React from 'react';

const AppStateContext = React.createContext();

export default AppStateContext;

// order라는 상태를 가지고 있어야하기 때문에
// 전역 상태를 만들기 위해서 context를 만들고
// context를 주입하기 위해서 provider도 만듦.