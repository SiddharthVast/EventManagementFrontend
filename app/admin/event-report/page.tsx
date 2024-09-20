// import { useEffect } from "react";
// import { Pie } from "react-chartjs-2";
// import useUserEventRegistartionStore from "../../../store/user_event_registrationStore";
// import useFestivalStore from "../../../store/festivalStore";
// import { Card } from "@mui/material"; // Use any card component you prefer

// const ParticipationCharts = () => {
//   const { registrations, getAllRegistarations } = useUserEventRegistartionStore();
//   const { ongoingFestivals, pastFestivals, getOngoingFestivals, getPastFestivals } = useFestivalStore();

//   useEffect(() => {
//     getAllRegistarations(); // Fetch registration data
//     getOngoingFestivals();  // Fetch ongoing festivals
//     getPastFestivals();     // Fetch past festivals
//   }, []);

//   const generateChartData = (eventId) => {
//     const registeredUsers = registrations.filter(reg => reg.event.id === eventId);
//     return {
//       labels: ["Participated", "Not Participated"],
//       datasets: [{
//         data: [registeredUsers.length, 100 - registeredUsers.length], // Assuming 100 is the max
//         backgroundColor: ["#36A2EB", "#FF6384"],
//       }],
//     };
//   };

//   return (
//     <div className="flex flex-col space-y-8">
//       {/* Ongoing Festivals */}
//       <section>
//         <h2>Ongoing College Festival</h2>
//         <div className="grid grid-cols-2 gap-4">
//           {ongoingFestivals.map((festival) => (
//             <div key={festival.id}>
//               <h3>{festival.name}</h3>
//               {festival.events.map((event) => (
//                 <div key={event.id}>
//                   <Pie data={generateChartData(event.id)} />
//                   <p>{event.eventName}</p>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Past Festivals */}
//       <section>
//         <h2>Past College Festivals</h2>
//         <div className="grid grid-cols-1 gap-4">
//           {pastFestivals.map((festival) => (
//             <Card key={festival.id} className="p-4">
//               <h3>{festival.name}</h3>
//               {festival.events.map((event) => (
//                 <div key={event.id}>
//                   <Pie data={generateChartData(event.id)} />
//                   <p>{event.eventName}</p>
//                 </div>
//               ))}
//             </Card>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ParticipationCharts;
