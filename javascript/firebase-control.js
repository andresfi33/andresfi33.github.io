import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  addDoc,
  query,
  collection,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

class Logro {
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
  const logroTmp = Logro(name, description, img, completed);

  const docRef = await addDoc(collection(db, "achievements"), {
    ...logroTmp,
  });
}

async function getLogros() {
  const q = query(collection(db, "achievements"));

  const querySnapshot = await getDocs(q);

  let arrAchievements = [];
  querySnapshot.forEach((doc) => {
    const dataTmp = doc.data();

    const logroTmp = new Logro(dataTmp.name, dataTmp.description, dataTmp.img, dataTmp.completed);
    arrAchievements.push(logroTmp);
  });

  return arrAchievements;
}

function mostrarLogros(achievementsData) {
  const achievementContainer = document.querySelector("#achievement-list");

  let achievementCompleted = [];
  let achievementUnCompleted = [];

  achievementsData.forEach((achievement) => {
    console.log(achievement);
    if(achievement.completed)
    {
        achievementCompleted.push(achievement);
    } else{
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
const logros = await getLogros();
mostrarLogros(logros);
