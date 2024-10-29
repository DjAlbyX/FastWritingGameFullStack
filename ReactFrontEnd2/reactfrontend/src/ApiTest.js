// import React, { useState, useEffect } from "react";
// const apiUrl = 'http://localhost:5246/albert';
// function ApiTest() {
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         fetch(apiUrl)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 setMessage(JSON.stringify(data));
//             })
//             .catch(error => {
//                 console.error('Error fetching data: ', error);
//                 setMessage('Error fetrching data!!');
//             });
//     },[]);

//     return (
//         <div>
//         <h3>API Response:</h3>
//         <p>{message}</p>
//         </div>
//     );
// }

// export default ApiTest;