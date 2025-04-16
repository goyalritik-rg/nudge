// import { useRef } from "react"

//  const useRealTime = (
//     chatRoom,
//     setChats=()=>{}
//   ) => {

//     const counterRef = useRef(1)

//     useEffect(() => {
//       pusherClient.subscribe(chatRoom);

//       pusherClient.bind('realtime-mode', (data: any) => {
//         console.log('✅', data)
//         if (counterRef.current !== 1) {
//           setChats((prev: any) => [
//             ...prev,
//             {
//               role: data.chat.role,
//               content: data.chat.message,
//             },
//           ])
//         }
//         counterRef.current += 1
//       });

//       return () => {
//         pusherClient.unbind('realtime-mode')
//         pusherClient.unsubscribe(chatRoom)
//       }
//     }, [])
//   }

//   export default useRealTime
