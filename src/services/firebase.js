import { initializeApp } from "firebase/app";
import {
	getAuth,
	signOut,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import {
	getFirestore,
	collection,
	addDoc,
	Timestamp,
	query,
	where,
	getDocs,
	orderBy,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAT-zmgZ1stHnivXSXT_LjzMLrAHVbmVAU",
	authDomain: "codelab-autenticacao-firebase.firebaseapp.com",
	projectId: "codelab-autenticacao-firebase",
	storageBucket: "codelab-autenticacao-firebase.firebasestorage.app",
	messagingSenderId: "749843737101",
	appId: "1:749843737101:web:636393955ca9e8e9120344",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const registrar = async (email, senha) => {
	try {
		await createUserWithEmailAndPassword(auth, email, senha);
		alert("Usuário registrado com sucesso!");
	} catch (error) {
		alert("Erro: " + error.message);
	}
};

export const login = async (email, senha) => {
	try {
		await signInWithEmailAndPassword(auth, email, senha);
		alert("Login realizado!");
	} catch (error) {
		alert("Erro: " + error.message);
	}
};

export const logout = async () => {
	await signOut(auth);
};

export const saveScore = async (userId, scoreData) => {
	if (!userId) {
		throw new Error("User ID is required to save a score.");
	}

	const payload = {
		...scoreData,
		userId,
		createdAt: Timestamp.fromDate(new Date()),
	};

	try {
		await addDoc(collection(db, "jogo3ds_scores"), payload);
	} catch (error) {
		console.error("Erro ao salvar pontuação:", error);
		throw error;
	}
};

// função para buscar pontuações por jogo
export const getScoresByGame = async gameName => {
	try {
		const scoresRef = collection(db, "jogo3ds_scores");
		const q = query(scoresRef, where("game", "==", gameName), orderBy("points", "desc"));
		const querySnapshot = await getDocs(q);
		const scores = [];
		querySnapshot.forEach(doc => {
			scores.push({
				id: doc.id,
				...doc.data(),
			});
		});
		return scores;
	} catch (error) {
		console.error("Erro ao buscar pontuações:", error);
		throw error;
	}
};
