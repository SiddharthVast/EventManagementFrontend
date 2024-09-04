// "use client";
// import React, { useEffect, useState } from "react";
// import usePointToJudgeStore, {
//   PointsToJudgeStoreState,
// } from "@/store/pointsToJudgeStore";
// import Link from "next/link";

// const PointsToJudge = () => {
//   const pointsToJudge = usePointToJudgeStore((state) => state.pointsToJudge);
//   const getAllPTJudge = usePointToJudgeStore(
//     (state) => state.getAllPointsToJudge
//   );
//   const deletePTJudge = usePointToJudgeStore(
//     (state) => state.deletePointToJudge
//   );

//   useEffect(() => {
//     getAllPTJudge();
//   }, []);
//   return (
//     <>
//       <h1>Points To Judge</h1>
//       <Link href="/pointsToJudge/new" className="btn btn-primary">
//         Add Points to Judge
//       </Link>
//       <table className="table table-auto">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {genres.map((g: any) => (
//             <tr key={g.id}>
//               <td>
//                 <Link href={`/genres/${g.id}`}>{g.name}</Link>
//               </td>
//               <td>
//                 <button
//                   className="btn btn-error btn-outline btn-sm mr-10"
//                   onClick={() => deleteGenre(g.id)}
//                 >
//                   Delete
//                 </button>
//                 <Link href={`/genres/${g.id}`}>
//                   <button className="btn btn-outline btn-success btn-sm ">
//                     Update
//                   </button>
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default PointsToJudge;
