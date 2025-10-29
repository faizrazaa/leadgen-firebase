// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔥 Your Firebase config (copy this from your Firebase console)

const firebaseConfig = {
  apiKey: "AIzaSyBc9ddC_t4GdPPAq8_iYyYRqi7R4o89ruQ",
  authDomain: "webonic-3cdca.firebaseapp.com",
  projectId: "webonic-3cdca",
  storageBucket: "webonic-3cdca.firebasestorage.app",
  messagingSenderId: "408731162339",
  appId: "1:408731162339:web:c0c4141da5223b451757d6",
  measurementId: "G-D80LNMB8E8"
};








// Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// --- Signup ---
async function signup(email, password) {
  await createUserWithEmailAndPassword(auth, email, password);
  alert("Account created successfully!");
}

// --- Login ---
async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
  alert("Logged in successfully!");
  window.location.href = "dashboard.html";
}

// --- Add Lead ---
async function submitLead(data) {
  await addDoc(collection(db, "leads"), data);
  alert("Lead submitted!");
}

// --- View Leads (Admin) ---
async function getLeads() {
  const querySnapshot = await getDocs(collection(db, "leads"));
  let html = "";
  querySnapshot.forEach((docSnap) => {
    const d = docSnap.data();
    html += `
      <div>
        <b>${d.name}</b> (${d.email}) - ${d.message}
        <button onclick="deleteLead('${docSnap.id}')">Delete</button>
      </div>`;
  });
  document.getElementById("leads").innerHTML = html;
}

// --- Delete Lead ---
async function deleteLead(id) {
  await deleteDoc(doc(db, "leads", id));
  alert("Lead deleted!");
  getLeads();
}

window.signup = signup;
window.login = login;
window.submitLead = submitLead;
window.getLeads = getLeads;
window.deleteLead = deleteLead;

