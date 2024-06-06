"use strict";

const apiBaseUrl = "http://localhost:8081/api/courses";
let course;

window.onload = () => {
  getCourseIdFromUrl();
  loadCourseData();
};

const resultsOutput = document.getElementById("resultsOutput");

function getCourseIdFromUrl() {
  let urlParams = new URLSearchParams(location.search);
  if (urlParams.has("courseId")) {
    course = urlParams.get("courseId");
  }
}

function loadCourseData() {
  resultsOutput.innerHTML = "";
  fetchCourseData(apiBaseUrl)
    .then((data) => {
      displaySelectedCourse(data);
    //   console.log(data)
    });
}

function fetchCourseData(apiUrl) {
  return fetch(apiUrl)
    .then((response) => response.json())
    .catch((error) => console.error('Error fetching course data:', error));
}

function displaySelectedCourse(courses) {
  for (let selectedCourse of courses) { 
    if (selectedCourse.id == course) {
      displayCourseDetails(selectedCourse);
    //   console.log(selectedCourse)
    }
  }
}

function displayCourseDetails(course) {
  let instructor = createCourseDetailElement("Instructor", course.instructor);
  let startDate = createCourseDetailElement("Start Date", course.startDate);
  let numDays = createCourseDetailElement("Number of Days", course.numDays);

  resultsOutput.appendChild(instructor);
  resultsOutput.appendChild(startDate);
  resultsOutput.appendChild(numDays);
}

function createCourseDetailElement(label, value) {
  let element = document.createElement("h3");
  element.innerHTML = `${label}: ${value}`;
  return element;
}
