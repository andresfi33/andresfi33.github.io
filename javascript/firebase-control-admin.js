import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  addDoc,
  query,
  collection,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

class Logro {
  constructor(name, description, img, completed, id) {
    this.name = name;
    this.description = description;
    this.img = img;
    this.completed = completed;
    this.id = id;
  }
}

class LogroAlta {
  constructor(name, description, img, completed) {
    this.name = name;
    this.description = description;
    this.img = img;
    this.completed = completed;
  }
}

function firebaseStart() {
  const firebaseConfig = {
    apiKey: "AIzaSyCtahUdoWj_7iAvgicbbC6m41Dpgux9A7E",
    authDomain: "logrosonline-68cb3.firebaseapp.com",
    projectId: "logrosonline-68cb3",
    storageBucket: "logrosonline-68cb3.appspot.com",
    messagingSenderId: "871263902572",
    appId: "1:871263902572:web:e6b20a69125ffb7f79b149",
    measurementId: "G-5VG8HETX7N",
  };
  const app = initializeApp(firebaseConfig);

  // Obtiene una referencia a la base de datos
  return getFirestore(app);
}

async function newLogro(
  name,
  description,
  img = "https://qph.cf2.quoracdn.net/main-qimg-8b9d64dd7a997f9c55116b167429a478",
  completed = false
) {
  const logroTmp = new LogroAlta(name, description, img, completed);

  const docRef = await addDoc(collection(db, "achievements"), {
    ...logroTmp,
  });

  // Esperar 3 segundos y luego recargar la página
  setTimeout(() => {
    location.reload();
  }, 500);

  return 0;
}

async function getLogros() {
  const q = query(collection(db, "achievements"));

  const querySnapshot = await getDocs(q);

  let arrAchievements = [];
  querySnapshot.forEach((doc) => {
    const dataTmp = doc.data();

    const logroTmp = new Logro(
      dataTmp.name,
      dataTmp.description,
      dataTmp.img,
      dataTmp.completed,
      doc.id
    );
    arrAchievements.push(logroTmp);
  });

  return arrAchievements;
}

function informarDatosMod(id, name, description, completed) {
  document.getElementById("id-logro").innerHTML = id;
  document.getElementById("nombre-logro").value = name;
  document.getElementById("descripcion-logro").value = description;
  const opciones = document.getElementsByName("opciones");
  if (completed) {
    document.getElementById("completed").checked = true;
  } else {
    document.getElementById("uncompleted").checked = true;
  }
}

function updateLogro() {
  let idMod = document.getElementById("id-logro").innerHTML;
  let nameMod = document.getElementById("nombre-logro").value;
  let descriptionMod = document.getElementById("descripcion-logro").value;

  const opciones = document.getElementsByName("opciones");
  let completed = null;

  for (const opcion of opciones) {
    if (opcion.checked) {
      if (opcion.value == "completed") {
        completed = true;
      } else {
        completed = false;
      }
      break;
    }
  }

  const logroTmp = new LogroAlta(nameMod, descriptionMod, "", completed);

  const docRef = updateDoc(doc(db, "achievements", idMod), {
    name: logroTmp.name,
    description: logroTmp.description,
    completed: completed,
  });

  // Esperar 3 segundos y luego recargar la página
  setTimeout(() => {
    location.reload();
  }, 500);

  return 0;
}

function mostrarLogros(achievementsData) {
  const achievementContainer = document.querySelector("#achievement-list");
  achievementContainer.innerHTML = "";

  let achievementCompleted = [];
  let achievementUnCompleted = [];

  achievementsData.forEach((achievement) => {
    if (achievement.completed) {
      achievementCompleted.push(achievement);
    } else {
      achievementUnCompleted.push(achievement);
    }
  });

  achievementCompleted.forEach((achievement) => {
    const div = document.createElement("div");
    div.classList.add("achievement");
    div.addEventListener("click", () => {
      informarDatosMod(
        achievement.id,
        achievement.name,
        achievement.description,
        achievement.completed
      );
    });

    const icon = document.createElement("img");
    icon.classList.add("achievement-icon");
    icon.src =
      achievement.img ??
      "https://qph.cf2.quoracdn.net/main-qimg-8b9d64dd7a997f9c55116b167429a478";

    const details = document.createElement("div");
    details.classList.add("achievement-details");

    const title = document.createElement("h3");
    title.classList.add("achievement-title");
    title.textContent = achievement.name;

    const description = document.createElement("p");
    description.classList.add("achievement-description");
    description.textContent = achievement.description;

    //Se añade oculto el id de Firebase para poder actualizar los logros
    const idFirebase = document.createElement("p");
    idFirebase.classList.add("firebase-id");
    idFirebase.textContent = achievement.id;

    details.appendChild(title);
    details.appendChild(description);

    div.appendChild(icon);
    div.appendChild(details);

    achievementContainer.appendChild(div);
  });

  const achievementBlocked = document.createElement("span");
  achievementBlocked.classList.add("achievement-blocked");
  achievementBlocked.textContent = "LOGROS BLOQUEADOS";

  const divBlocked = document.createElement("div");
  divBlocked.appendChild(achievementBlocked);
  achievementContainer.appendChild(divBlocked);

  achievementUnCompleted.forEach((achievement) => {
    const div = document.createElement("div");
    div.classList.add("achievement");
    div.addEventListener("click", () => {
      informarDatosMod(
        achievement.id,
        achievement.name,
        achievement.description,
        achievement.completed
      );
    });

    const icon = document.createElement("img");
    icon.classList.add("achievement-icon");
    icon.classList.add("blocked");
    icon.src =
      achievement.img ??
      "https://qph.cf2.quoracdn.net/main-qimg-8b9d64dd7a997f9c55116b167429a478";

    const details = document.createElement("div");
    details.classList.add("achievement-details");

    const title = document.createElement("h3");
    title.classList.add("achievement-title");
    title.textContent = achievement.name;

    const description = document.createElement("p");
    description.classList.add("achievement-description");
    description.textContent = achievement.description;

    //Se añade oculto el id de Firebase para poder actualizar los logros
    const idFirebase = document.createElement("p");
    idFirebase.classList.add("achievement-id");
    idFirebase.textContent = achievement.id;

    details.appendChild(title);
    details.appendChild(description);
    details.appendChild(idFirebase);

    div.appendChild(icon);
    div.appendChild(details);

    achievementContainer.appendChild(div);
  });

  return true;
}

const db = firebaseStart();
let logros = await getLogros();

//Logros
mostrarLogros(logros);

//Añadir evento onclick al botón de Alta
const agregarLogro = document.getElementById("btn-agregar-logro");

// Agregar eventListener al botón
agregarLogro.addEventListener("click", () => {
  const nombreLogro = document.getElementById("nombre-logro").value;
  const descLogro = document.getElementById("descripcion-logro").value;

  newLogro(nombreLogro, descLogro);
});

//Añadir evento onclick al botón de Modificar
const modificarLogro = document.getElementById("btn-modificar-logro");

// Agregar eventListener al botón
modificarLogro.addEventListener("click", () => {
  updateLogro();
});
