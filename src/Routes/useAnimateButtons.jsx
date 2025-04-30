// import { useNavigate } from "react-router-dom";

// function useAnimateButtons() {
//   const navigate = useNavigate();

//   function navigateToView(e, route) {
//     e.preventDefault();

//     const $btn = e.currentTarget;
//     $btn.classList.add("button-animation");

//     $btn.addEventListener(
//       "transitionend",
//       () => {
//         $btn.classList.remove("button-animation");
//         navigate(route);
//       },
//       { once: true }
//     );
//   }
//   function animateSaveButton() {
//     const $btn = document.getElementById("save-btn");

//     $btn.classList.add("button-save-animation");

//     $btn.addEventListener(
//       "transitionend",
//       () => {
//         $btn.classList.remove("button-save-animation");
//       },
//       { once: false }
//     );
//   }

//   return { navigateToView, animateSaveButton };
// }

// export { useAnimateButtons };
