"use strict";


//http://localhost:8081/api/courses

const apiBaseUrl = "http://localhost:8081/api/courses"


window.onload = () => {
    fetchCourseData();
}

const resultsOutput = document.getElementById("resultsOutput");


function fetchCourseData(){
    fetch(apiBaseUrl)
    .then(response => response.json())
    .then(data => displayData(data))
}



function displayData(data) {
    const resultsOutput = document.getElementById('resultsOutput');
    resultsOutput.innerHTML = "";
    const table = createTable();
    data.forEach(course => {
        const row = document.createElement("tr");
        row.appendChild(createCell(course.dept));
        row.appendChild(createCell(course.courseNum));
        row.appendChild(createCell(course.courseName));
        row.appendChild(createVisitLink(course.id))
        table.querySelector("tbody").appendChild(row);
    });

    resultsOutput.appendChild(table);
}


function createTable() {
    const table = document.createElement("table");
    table.id = "CourseListings";
    table.className = "table table-hover border mt-5";

    const thead = document.createElement("thead");
    thead.className = "table-dark";

    const headerRow = document.createElement("tr");
    ["Department", "Course ID", "Title", "Details"].forEach(text => {
        const header = document.createElement("th");
        header.textContent = text;
        headerRow.appendChild(header);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    tbody.className = "table-group-divider";
    table.appendChild(tbody);

    return table;
}

function createCell(text) {
    const cell = document.createElement("td");
    cell.textContent = text;
    cell.className = "w-25";
    return cell;
}

function createVisitLink(text){
    const visitLinkTd = document.createElement('td');
    visitLinkTd.className = "w-25";
    const visitLink = document.createElement('a');
    visitLink.textContent = "Show Details";
    visitLink.href = "details.html?courseId=" + text; 
    visitLink.className = "text-decoration-none"
    console.log(visitLink.href)

    visitLinkTd.appendChild(visitLink);
    return visitLinkTd;
}