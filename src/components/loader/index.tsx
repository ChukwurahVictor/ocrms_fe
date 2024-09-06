// import React from 'react'

// const Loader = () => {
//   return <p>Loading...</p>
// }

// export default Loader

import React from "react";
import ReactLoading from "react-loading";

const type = "spin";
const color = "#333";

const Loader = () => (
  <ReactLoading type={type} color={color} height={"5%"} width={"5%"} />
);

export default Loader;