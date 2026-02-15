const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const marksInput = document.getElementById("marks");
  const addBtn = document.getElementById("addBtn");
  const output = document.getElementById("output");

  let data = JSON.parse(localStorage.getItem("studentData")) ?? [];

  addBtn.addEventListener("click", handleAdd);

  function handleAdd() {
    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value);
    const marks = parseFloat(marksInput.value);

    if (!name || isNaN(age) || isNaN(marks)) {
      alert("Please fill all fields correctly.");
      return;
    }

    const grade = calculateGrade(marks);

    const newStudent = {
      id: Date.now(),
      name,
      age,
      marks,
      grade
    };

    data.push(newStudent);
    saveData();
    render();
    resetForm();
  }

  function calculateGrade(score) {
    if (score >= 85) return "A+";
    if (score >= 75) return "A";
    if (score >= 65) return "B";
    if (score >= 50) return "C";
    return "F";
  }

  function render() {
    output.innerHTML = "";

    if (data.length === 0) {
      output.innerHTML = "<p>No students found.</p>";
      return;
    }

    const table = document.createElement("table");

    const headerRow = document.createElement("tr");
    ["Name", "Age", "Marks", "Grade", "Action"].forEach(text => {
      const th = document.createElement("th");
      th.textContent = text;
      headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    data.forEach(student => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.marks}</td>
        <td class="${student.grade === "F" ? "fail" : "pass"}">
          ${student.grade}
        </td>
        <td>
          <button data-id="${student.id}">Remove</button>
        </td>
      `;

      table.appendChild(row);
    });

    output.appendChild(table);

    output.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", deleteStudent);
    });
  }

  function deleteStudent(e) {
    const id = Number(e.target.dataset.id);
    data = data.filter(student => student.id !== id);
    saveData();
    render();
  }

  function saveData() {
    localStorage.setItem("studentData", JSON.stringify(data));
  }

  function resetForm() {
    nameInput.value = "";
    ageInput.value = "";
    marksInput.value = "";
  }

  render();