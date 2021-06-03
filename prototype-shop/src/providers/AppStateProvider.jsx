import { useCallback } from 'react';
import { useState } from 'react';
import AppStateContext from '../contexts/AppStateContext'

// function component 
// props로 기본 props인 children이 들어옴
const AppStateProvider = ({children}) => {
    const [orders, setOrders] = useState([]);   // useState를 통해서 상태를 가지고 있는다 초기값으로 빈배열
    const [prototypes] = useState([     // 물건들의 상태도 state로 가지고 있어야 함 
        {
          id: "pp-01",
          title: "Kids-story",
          artist: "Thomas Buisson",
          desc: "This prototype was made with ProtoPie, the interactive prototyping tool for all digital products.",
          thumbnail:
            "https://prototype-shop.s3.ap-northeast-2.amazonaws.com/thumbnails/Kids-story_1.mp4",
          price: 10,
          pieUrl: "https://cloud.protopie.io/p/8a6461ad85",
        },
        {
          id: "pp-02",
          title: "mockyapp",
          artist: "Ahmed Amr",
          desc: "This prototype was made with ProtoPie, the interactive prototyping tool for all digital products.",
          thumbnail:
            "https://prototype-shop.s3.ap-northeast-2.amazonaws.com/thumbnails/mockyapp.mp4",
          price: 20,
          pieUrl: "https://cloud.protopie.io/p/27631ac9d5",
        },
        {
          id: "pp-03",
          title: "macOS Folder Concept",
          artist: "Dominik Kandravý",
          desc: "Folder concept prototype by Dominik Kandravý.",
          thumbnail:
            "https://prototype-shop.s3.ap-northeast-2.amazonaws.com/thumbnails/macOS_Folder_Concept_-_Folder_concept.mp4",
          price: 30,
          pieUrl: "https://cloud.protopie.io/p/acde5ccdf9",
        },
        {
          id: "pp-04",
          title: "Translator",
          artist: "Tony Kim",
          desc: "This prototype was made with ProtoPie, the interactive prototyping tool for all digital products.",
          thumbnail:
            "https://prototype-shop.s3.ap-northeast-2.amazonaws.com/thumbnails/Translator.mp4",
          price: 40,
          pieUrl: "https://cloud.protopie.io/p/b91edba11d",
        },
        {
          id: "pp-05",
          title: "In-car voice control",
          artist: "Tony Kim",
          desc: "This prototype was made with ProtoPie, the interactive prototyping tool for all digital products.",
          thumbnail:
            "https://prototype-shop.s3.ap-northeast-2.amazonaws.com/thumbnails/In-car_voice_control.mp4",
          price: 50,
          pieUrl: "https://cloud.protopie.io/p/6ec7e70d1a",
        },
        {
          id: "pp-06",
          title: "The Adventures of Proto",
          artist: "Richard Oldfield",
          desc: `Made exclusively for Protopie Playoff 2021
                  Shout up if you get stuck!
                  For the full experience. View in the Protopie App.
                  #PieDay #PlayOff #ProtoPie`,
          thumbnail:
            "https://prototype-shop.s3.ap-northeast-2.amazonaws.com/thumbnails/The_Adventures_of_Proto.mp4",
          price: 60,
          pieUrl: "https://cloud.protopie.io/p/95ee13709f",
        },
        {
          id: "pp-07",
          title: "Sunglasses shop app",
          artist: "Mustafa Alabdullah",
          desc: "This prototype was made with ProtoPie, the interactive prototyping tool for all digital products.",
          thumbnail:
            "https://prototype-shop.s3.ap-northeast-2.amazonaws.com/thumbnails/sunglasses_shop_app.mp4",
          price: 70,
          pieUrl: "https://cloud.protopie.io/p/6f336cac8c",
        },
        {
          id: "pp-08",
          title: "Alwritey—Minimalist Text Editor",
          artist: "Fredo Tan",
          desc: `This minimalist text editor prototype was made with ProtoPie by Fredo Tan.
                  ---
                  Inspired by Writty, a simple writing app by Carlos Yllobre. Try out Writty at https://writtyapp.com.
                  ---
                  ProtoPie is an interactive prototyping tool for all digital products.
                  ---
                  Learn more about ProtoPie at https://protopie.io.`,
          thumbnail:
            "https://prototype-shop.s3.ap-northeast-2.amazonaws.com/thumbnails/minimalist-text-editor.mp4",
          price: 80,
          pieUrl: "https://cloud.protopie.io/p/946f88f8d3",
        },
        {
          id: "pp-09",
          title: "Voice search for TV",
          artist: "Tony Kim",
          desc: "This prototype was made with ProtoPie, the interactive prototyping tool for all digital products.",
          thumbnail:
            "https://prototype-shop.s3.ap-northeast-2.amazonaws.com/thumbnails/TV.mp4",
          price: 90,
          pieUrl: "https://cloud.protopie.io/p/60ee64cda0",
        },
        {
          id: "pp-10",
          title: "Finance App Visual Interaction 2.0",
          artist: "Arpit Agrawal",
          desc: "This prototype was made with ProtoPie, the interactive prototyping tool for all digital products.",
          thumbnail:
            "https://prototype-shop.s3.ap-northeast-2.amazonaws.com/thumbnails/Credit_Card_App.mp4",
          price: 90,
          pieUrl:
            "https://cloud.protopie.io/p/09ce2fdf84/21?ui=true&mockup=true&touchHint=true&scaleToFit=true&cursorType=touch",
        },
        {
          id: "pp-11",
          title: "Whack-a-mole",
          artist: "Changmo Kang",
          desc: "This prototype was made with ProtoPie, the interactive prototyping tool for all digital products.",
          thumbnail:
            "https://prototype-shop.s3.ap-northeast-2.amazonaws.com/thumbnails/Whack_a_mole.mp4",
          price: 90,
          pieUrl: "https://cloud.protopie.io/p/ab796f897e",
        },
        {
          id: "pp-12",
          title: "Voice Note",
          artist: "Haerin Song",
          desc: `Made by Haerin Song
                  (Soda Design)`,
          thumbnail:
            "https://prototype-shop.s3.ap-northeast-2.amazonaws.com/thumbnails/Voice_note_with_sound_wave.mp4",
          price: 90,
          pieUrl: "https://cloud.protopie.io/p/7a0d6567d2",
        },
      ]);

    // [{id, quantity:1}]
    // useCallback : 특정 함수를 새로 만들지 않고 재사용하고 싶을 때 
    const addToOrder = useCallback((id) => {
        console.log(id);
        setOrders(orders => { // orders를 받아서 새로운 orders 리턴 
             const finded = orders.find(order => order.id === id);

             if(finded === undefined){
                 return [...orders, {id, quantity:1}];  // ...orders : 분해해서 넣음
             } else {
                 return orders.map(order => {    
                     if(order.id === id){
                         return {
                             id : id,
                             quantity : order.quantity + 1
                         }
                     } else {
                         return order;
                     }
                 });
             }
        });
    },[]);  // 최초에는 빈 배열 가지고 있는 함수를 value에 셋팅

    const remove = useCallback((id) => {
        setOrders(orders => {
            return orders.filter((order) => order.id !== id); 
        })
    },[]); 

    const removeAll = useCallback(() => {
        setOrders([]);  // orders를 빈배열로 set 
    },[]);  

    // 앱 전역에서 value를 공유할 context setting
    return (<AppStateContext.Provider value={{  // 객체형태로 value를 넣음 
        prototypes,
        orders,
        addToOrder,     // order에 물건을 넣는 함수 
        remove,         // order에 물건을 삭제하는 함수 
        removeAll       // order에 물건 모두 삭제하는 함수 
    }}>{children}</AppStateContext.Provider>)
};

export default AppStateProvider;
// AppStateProvider 컴포넌트를 App상위에 감싸야 함 
