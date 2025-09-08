// const Page = ({ params }) => {
//     const {id} = params;
//   return <div>Student ID: {id}</div>;
// }
"use client"

import { useParams } from "next/navigation";

// const Page = () => {
//   const { id } = useParams();
//   return <div>Student ID: {id}</div>;
// };



const Page = () => {
  const { id } = useParams();
  return <div>Student ID: {id}</div>;
}
export default Page;
