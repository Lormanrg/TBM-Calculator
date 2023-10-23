const fomularioCalculadora = document.getElementById("formulario-calculadora");
const resultado = document.getElementById("resultado");
const activity = document.querySelector("#actividad");
const age = document.querySelector("#edad");
const person = document.querySelector("#name");
const weight = document.querySelector("#peso");
const height = document.querySelector("#altura");
const documentNumber = document.querySelector("#document-number");

fomularioCalculadora.addEventListener("submit", (evento) => {
  evento.preventDefault();

  calorieCalculation();
});

let calorieCalculation = () => {
  aparecerResultado();

  showingResults();
  fillForms();
  removingForm();
};

function showingResults() {
  const populationType = populationGroup();
  const gender = document.querySelector('input[name="genero"]:checked');
  const typeDocument = document.querySelector(
    'input[name="document-type"]:checked'
  );

  const multiplierTBM = {
    weight: 10,
    height: 6.25,
    age: 5,
    const1: 5,
    const2: -161,
  };

  let calorieCalculation;
  console.log(calorieCalculation);
  gender.id === "masculino"
    ? (calorieCalculation =
        activity.value *
          (multiplierTBM.weight * weight.value +
            multiplierTBM.height * height.value +
            multiplierTBM.age * age.value) +
        multiplierTBM.const1)
    : (calorieCalculation =
        activity.value *
          (multiplierTBM.weight * weight.value +
            multiplierTBM.height * height.value +
            multiplierTBM.age * age.value) +
        multiplierTBM.const2);

  resultado.innerHTML = `
  <div class = "card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
  <h2 class= "card-title "> Required Calories </h2>
  <div class = "mb-3 w-100">
  <h5>The pacient ${person.value} identified by the following document type ${
    typeDocument.value
  } NO. ${documentNumber.value}, requires a total of ${Math.floor(
    calorieCalculation
  )} kcal for the support of its TBM  </h5>
  <h5>${populationType}</h5>
  </div>
  </div>
  `;
}

function fillForms() {
  !(
    person.value &&
    age.value &&
    weight.value &&
    height.value &&
    documentNumber.value
  )
    ? mostrarMensajeDeError("All files are required")
    : null;
  if (age.value < 15 || age.value > 80) {
    mostrarMensajeDeError("Age should be between 18-80");
  }

  if (activity) {
    activity.selectedIndex = 0;
  }
}

function populationGroup() {
  return age.value > 15 && age.value < 29
    ? "Population Group: Young"
    : age.value > 30 && age.value < 59
    ? "Population Group: Adult"
    : "Population Group: Senior Citizen";
}

let removingForm = () => {
  person.value = null;
  documentNumber.value = null;
  age.value = null;
  weight.value = null;
  height.value = null;
};

let mostrarMensajeDeError = (msg) => {
  const calculo = document.querySelector("#calculo");
  if (calculo) {
    calculo.remove();
  }

  const divError = document.createElement("div");
  divError.className = "d-flex justify-content-center align-items-center h-100";
  divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

  resultado.appendChild(divError);

  setTimeout(() => {
    divError.remove();
    desvanecerResultado();
  }, 5000);
};

// Animaciones
function aparecerResultado() {
  resultado.style.top = "100vh";
  resultado.style.display = "block";

  let distancia = 100;
  let resta = 0.3;
  let id = setInterval(() => {
    resta *= 1.1;
    resultado.style.top = `${distancia - resta}vh`;
    if (resta > 100) {
      clearInterval(id);
    }
  }, 10);
}

function desvanecerResultado() {
  let distancia = 1;

  let id = setInterval(() => {
    distancia *= 2;
    resultado.style.top = `${distancia}vh`;
    if (distancia > 100) {
      clearInterval(id);
      resultado.style.display = "none";
      resultado.style.top = 0;
    }
  }, 10);
}
