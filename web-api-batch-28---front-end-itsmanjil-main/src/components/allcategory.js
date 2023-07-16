// import React, { useEffect, useState } from "react";
// import Addproducts from "./Addproducts";
// import { AxiosInstance } from "../../Shared/AxiosInstance/AxiosInstance";

// const AllCategory = () => {
//   const [category, setcategory] = useState([]);
//   //   const token = localStorage.getItem("token");
//   useEffect(() => {
//     AxiosInstance.get("category", {})
//       .then((res) => {
//         setcategory(res.data);
//         console.log("category data" + JSON.stringify(res.data));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   console.log('cat',category);

//   return (
//     <div>
//       {category.map((category, index) => {

//         return (
//           <Addproducts key={index} name={category.name} id={category.id} />
//         );
//       })}
//     </div>
//   );
// };

// export default AllCategory;
