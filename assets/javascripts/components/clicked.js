var defineComponent = require("jquery");

module.exports = defineComponent(clicked);

function clicked(e) {
  buttonGrades.toggleClass("is-clicked");
  //var gradesChange = Math.round(grades * 9/5 + 32);
  //grades.html(gradesChange + "<span> ºF </span>");
};

buttonGrades.on("click", clicked);
