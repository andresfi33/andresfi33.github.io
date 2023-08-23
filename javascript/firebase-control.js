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

class LogroMod {
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

function completarLogro(idMod) {
  const docRef = updateDoc(doc(db, "achievements", idMod), {
    completed: true,
  });

  // Esperar 3 segundos y luego recargar la página
  setTimeout(() => {
    location.reload();
  }, 500);

  return 0;
}

function logroNano() {
  // Obtener la hora actual
  const horaActual = new Date();

  // Obtener los minutos de la hora actual
  const minutos = horaActual.getMinutes();

  if (minutos == 26) {
    completarLogro("exb1cbwB5fwWuFxYarrb");
  }
}

function logrosCompletados(achievementsData) {
  //Comprobar que estén todos los logros completados
  const countAchievements = achievementsData.length;
  const countAchievementCompleted = achievementsData.filter(
    (achievement) => achievement.completed
  ).length;

  if (countAchievementCompleted == countAchievements) {
  }
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

function mostrarProgressBar(achievementsData) {
  const countAchievementCompleted = achievementsData.filter(
    (achievement) => achievement.completed
  ).length;
  const countAchievements = achievementsData.length;

  const numAchievementText = document.querySelector("#num-achievements");
  numAchievementText.textContent =
    countAchievementCompleted + " de " + countAchievements;

  const progressBar = document.querySelector(
    "#progress-container .progress-bar"
  );

  const percentage = (countAchievementCompleted / countAchievements) * 100;

  progressBar.style = "width: " + percentage + "%;";

  if (percentage == 100) {
    const textoLogros = document.querySelector(
      "#progress-container div #textoLogros"
    );

    const progressContainer = document.querySelector("#progress-container");
    const icon = document.querySelector(".achievement-icon");

    const detalleLogros = document.querySelector("#detalleLogros");
    detalleLogros.classList.add("achievement-details");

   // progressContainer.appendChild(icon);

    textoLogros.innerHTML = "¡HAS DESBLOQUEADO TODOS LOS LOGROS! ";
    textoLogros.classList.add("achievement-description");

    //Quitamos el flex-direction para que la imagen salga a la izquierda
    progressContainer.style.flexDirection = "row";
    icon.style.display = "block";
  }
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
    if (achievement.id == "exb1cbwB5fwWuFxYarrb") {
      div.addEventListener("click", () => {
        logroNano();
      });
    }

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

    details.appendChild(title);
    details.appendChild(description);

    div.appendChild(icon);
    div.appendChild(details);

    achievementContainer.appendChild(div);
  });

  return true;
}

const db = firebaseStart();
let logros = await getLogros();

//Barra de progreso
mostrarProgressBar(logros);

//Logros
mostrarLogros(logros);

//Mostrar emblema si logros completados
logrosCompletados(logros);

/*setInterval(async () => {
  logros = await getLogros();

  //Barra de progreso
  mostrarProgressBar(logros);

  //Logros
  mostrarLogros(logros);

  console.log("Datos actualizados 🐱‍👤 " + new Date());
}, 3000);
*/

//newLogro("nombre","desc");
