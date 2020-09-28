//Add the header of the table and the name of the student on button click
document.getElementById("add").addEventListener("click", () => {
  if (document.getElementById("name").value !== "") {
    var name = document.getElementById("name").value;
    addCatalog(name)
    createStudentObject();
  } else {
    alert("please add a name")
  }
});

document.getElementById("addMark").addEventListener("click", () => {
  if (document.getElementById("add_mark").value !== "" && document.getElementById("add_mark").value > 0) {
    AddMarksToObjects();
    refreshCaratlog();
  } else {
    alert("please add a valid mark")
  }
});

function addNameToObject() {
  if (document.getElementById("name").value !== "") {
    var name = document.getElementById("name").value;
    document.getElementById("hidden1").style.display = "table-row  ";
    clearFormName();
    return name;
  } else {
    alert("please add a name");
    return null;
  }
}

function AddMarksToObjects() {

  if (document.getElementById("add_mark").value !== "") {
    var mark = parseInt(document.getElementById("add_mark").value);
    var noteAvg = [];
    for (i = 0; i < studentInfoArray.length; i++) {
      if (studentInfoArray[i].name == document.getElementById("student_name").value) {
        console.log(document.getElementById("student_name"));
        studentInfoArray[i].marks.push(mark);
        console.log(studentInfoArray);
        document.getElementById("add_mark").innerHTML = "";
        noteAvg.push(studentInfoArray[i].marks);
        console.log(noteAvg);
        var note_final = noteAvg[0].slice(1, noteAvg[0].length)
        console.log(note_final);
        var sum = 0;
        for (j = 0; j < note_final.length; j++) {
          sum += note_final[j];

          console.log(sum);
          var avg = sum / note_final.length;
          console.log(avg);
          studentInfoArray[i].average = avg;

          console.log(studentInfoArray);
        }
      } else {

        console.log(studentInfoArray);

      }
    }
    console.log(studentInfoArray);
    addMarks();
    clearFormMarks()
  }
}

function CalculateAverage() {
  for (i = 0; i < studentInfoArray.length; i++) {

    var noteAvg = [];
    noteAvg.push(studentInfoArray[i].marks);
    console.log(noteAvg);
    var note_final = noteAvg[0].slice(1, noteAvg[0].length)
    console.log(note_final);
    var sum = 0;
    for (i = 0; i < note_final.length; i++) {
      sum += note_final[i];
    }
    console.log(sum);
    var avg = sum / note_final.length;
    console.log(avg);
    studentInfoArray[i].average = avg;
    console.log(studentInfoArray);
  }
  //return average
}

document.getElementById("sortDesc").addEventListener("click", () => {
  sortDataDescName();
});
document.getElementById("sortAsc").addEventListener("click", () => {
  sortDataAscName();
});

document.getElementById("sortDescMarks").addEventListener("click", () => {
  sortDataDescMarks();
});
document.getElementById("sortAscMarks").addEventListener("click", () => {
  sortDataAscMarks();
});


//Add the header of the table and the name of the student on pressing enter key
var input = document.getElementById("name");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("add").click();
  }
});

//Clear the form after adding the student's name
function clearFormName() {
  document.getElementById("name").value = "";
}


//Dynammicaly create the table containing the name, average and see marks button
function addCatalog(name, average, marks) {
  console.log(studentInfoArray);
  console.log(name);
  console.log(average);
  if (name !== "") {
    var table = document.getElementById("nume");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = name;
    cell2.innerHTML = "Nu exista note";
    cell3.innerHTML = "<input type=\"button\" value=\"Vezi notele\" id=\"vezi\" onclick=\"seeGrades('" + name + "','" + marks + "')\">";
  }

}

function refreshCaratlog(name) {
  document.getElementById("nume").innerHTML = "";

  var table = document.getElementById("nume");
  if (name !== "") {
    studentInfoArray.forEach(el => {
      var row = table.insertRow(-1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);

      cell1.innerHTML = el.name;
      if (el.average !== 0) {
        cell2.innerHTML = el.average.toFixed(2);
      } else {
        cell2.innerHTML = "Nu exista note";
      }
      cell3.innerHTML = "<input type=\"button\" value=\"Vezi notele\" id=\"vezi\" onclick=\"seeGrades('" + el.name + "','" + el.marks + "')\">";
    })
  }
}

function refreshTable() {
  document.getElementById("nume").innerHTML = "";
}

function seeGrades(name, marks) {
  seeMarks(marks);  //displays the grades table header "nota"-ok
  addName(name);//adds the name of the student -ok
  clearFormGrades();
  addMarks();
  fillMarksTable();
}


class StudentDetails {
  constructor(name, marks, average) {
    this.name = name;
    this.marks = marks;
    this.average = average;
  }

}

var studentInfoArray = [];
function createStudentObject() {
  var name = 0;
  var marks = ["Note"];
  var average = 0;
  name = addNameToObject();
  console.log(name);
  console.log(document.getElementById("student_name").value);

  var studentInformation = new StudentDetails(name, marks, average);
  studentInfoArray.push(studentInformation);
  console.log(marks);
  console.log(studentInfoArray);
}

//Show the area containing the marks
function seeMarks() {
  document.getElementById("note_elev_wrapper").style.display = "block";
}

//Hide the area containing the marks-ok
document.getElementById("hide_marks").addEventListener("click", () =>
  document.getElementById("note_elev_wrapper").style.display = "none")

//ok-Add the student's name in the marks area
function addName(name) {
  document.getElementById("student_name").value = name;
}

function clearMarks() {
  document.getElementById("note").innerHTML = "";
  console.log(document.getElementById("note").innerHTML);
}

function addMarks() {
  if (document.getElementById("add_mark").value !== "") {
    for (i = 0; i < studentInfoArray.length; i++) {
      if (studentInfoArray[i].name == document.getElementById("student_name").value) {
        var table = document.getElementById("nota");
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var marksArray = studentInfoArray[i].marks;
        console.log(marksArray);
        for (j = 1; j < marksArray.length; j++) {
          cell1.innerHTML = marksArray[j];
        }
      }
    }
  }
}

function fillMarksTable() {
  var table = document.getElementById("nota");
  for (i = 0; i < studentInfoArray.length; i++) {
    if (studentInfoArray[i].name == document.getElementById("student_name").value) {
      var marksArray = studentInfoArray[i].marks;
  marksArray.forEach(el=>{
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = el;
  })
}}}

// Execute a function when the user releases a key on the keyboard
var input = document.getElementById("add_mark");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("addMark").click();
  }
});


function clearFormMarks() {
  document.getElementById("add_mark").value = "";
}

function clearFormGrades() {
  document.getElementById("note").innerText = "";
}

function sortDataDescName() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("catalog");
  switching = true;

  //Make a loop that will continue until no switching has been done:
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;

    //Loop through all table rows (except the first, which contains table headers):
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      //Get the two elements you want to compare, one from current row and one from the next:
      x = rows[i].getElementsByTagName("td")[0];
      y = rows[i + 1].getElementsByTagName("td")[0];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      //If a switch has been marked, make the switch and mark that a switch has been done:
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortDataAscName() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("catalog");
  switching = true;

  //Make a loop that will continue until no switching has been done:
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;

    //Loop through all table rows (except the first, which contains table headers):
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      //Get the two elements you want to compare, one from current row and one from the next:
      x = rows[i].getElementsByTagName("td")[0];
      y = rows[i + 1].getElementsByTagName("td")[0];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      //If a switch has been marked, make the switch and mark that a switch has been done:
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortDataDescMarks() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("nota");
  switching = true;

  //Make a loop that will continue until no switching has been done:
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;

    //Loop through all table rows (except the first, which contains table headers):
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      //Get the two elements you want to compare, one from current row and one from the next:
      x = rows[i].getElementsByTagName("td")[0];
      y = rows[i + 1].getElementsByTagName("td")[0];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      //If a switch has been marked, make the switch and mark that a switch has been done:
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
function sortDataAscMarks() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("nota");
  switching = true;

  //Make a loop that will continue until no switching has been done:
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;

    //Loop through all table rows (except the first, which contains table headers):
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      //Get the two elements you want to compare, one from current row and one from the next:
      x = rows[i].getElementsByTagName("td")[0];
      y = rows[i + 1].getElementsByTagName("td")[0];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      //If a switch has been marked, make the switch and mark that a switch has been done:
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}