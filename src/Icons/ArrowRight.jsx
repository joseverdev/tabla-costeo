import * as React from "react";
const ArrowRight = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      style={{
        transform: `rotate(${props.left ? "0" : "180"}deg)`,
        msfilter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)",
      }}
      {...props}
    >
      <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z" />
    </svg>
  );
};
export default ArrowRight;
