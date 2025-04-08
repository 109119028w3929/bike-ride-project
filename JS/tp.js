// document.addEventListener("DOMContentLoaded", () => {
//     const menuToggle = document.getElementById("menu-toggle");
//     const nav = document.querySelector("nav");
  
//     menuToggle.addEventListener("click", () => {
//       nav.classList.toggle("active");
//     });
//   });

const svgMap = document.getElementById("map");
let waypoints = [];

svgMap.addEventListener("click", function (e) {
  const point = svgMap.createSVGPoint();
  point.x = e.clientX;
  point.y = e.clientY;
  const loc = point.matrixTransform(svgMap.getScreenCTM().inverse());

  const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circle.setAttribute("cx", loc.x);
  circle.setAttribute("cy", loc.y);
  circle.setAttribute("r", 5);
  circle.setAttribute("fill", "red");
  svgMap.appendChild(circle);

  waypoints.push({ x: loc.x, y: loc.y });
});

function saveRoute() {
  localStorage.setItem("bikeRoute", JSON.stringify(waypoints));
  alert("Route saved!");
}
