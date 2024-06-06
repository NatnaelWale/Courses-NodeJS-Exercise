"use strict";

//

const apiBaseUrl = "http://localhost:8081/api/courses";

let course;

window.onload = () => {
  let urlParams = new URLSearchParams(location.search);

  if (urlParams.has("course") == true) {
    course = urlParams.get("course");
  }
  console.log(course);
  loadCourseData();
};

const resultsOutput = document.getElementById("resultsOutput");

function loadCourseData() {
  resultsOutput.innerHTML = "";

  let actualUrl = apiBaseUrl;

  console.log(actualUrl);

  fetch(actualUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (let selectedCourse of data) {
        if (selectedCourse.courseName === course) {
          console.log(selectedCourse);
          let instructor = document.createElement("h3");
          instructor.innerHTML = `Instructor: ${selectedCourse.instructor}`;

          let startDate = document.createElement("h3");
          startDate.innerHTML = `Start Date: ${selectedCourse.startDate}`;

          let numDays = document.createElement("h3");
          numDays.innerHTML = `Number of Days: ${selectedCourse.numDays}`;

          resultsOutput.appendChild(instructor);
          resultsOutput.appendChild(startDate);
          resultsOutput.appendChild(numDays);
        }
      }
    });
}
