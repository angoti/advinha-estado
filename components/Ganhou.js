import {
	Text,
	StyleSheet,
	View,
	Image,
	Pressable,
	Alert,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { useEffect } from "react";
import { useFonts } from "@expo-google-fonts/poppins/useFonts";
import { Poppins_700Bold } from "@expo-google-fonts/poppins/700Bold";
import { Poppins_400Regular } from "@expo-google-fonts/poppins/400Regular";
import { auth, saveScore } from "../src/services/firebase";

export default function Ganhou({ nav, pontuacao = 0 }) {
	const [fontsLoaded] = useFonts({
		Poppins_700Bold,
		Poppins_400Regular,
	});

	const salvarPontuacao = async (userId, scoreData) => {
		try {
			await saveScore(userId, scoreData);
		} catch (error) {
			Alert.alert("Erro", `Não foi possível salvar a pontuação. \n${error.message}`);
		}
	};

	useEffect(() => {
		const userId = auth.currentUser?.uid ?? "nulo ou não definido";
		const email = auth.currentUser?.email ?? "nulo ou não definido";
		const scoreData = {
			points: pontuacao,
			game: "Quiz Estados",
			date: new Date(),
			playerName: email,
		};
		//chamar a função para salvar a pontuação no banco de dados
		salvarPontuacao(userId, scoreData);
	}, []);

	function jogar() {
		nav("jogo");
	}

	function sair() {
		nav("inicio");
	}

	if (!fontsLoaded) {
		return null;
	}

	return (
		<KeyboardAvoidingView
			keyboardVerticalOffset={-100}
			behavior={Platform.OS === "ios" ? "padding" : "position"}
			style={styles.container}>
			<View style={styles.cima} />
			<View style={styles.meio}>
				<Image
					source={require("../assets/ganhou2.png")}
					resizeMode="contain"
					style={{ width: "90%", height: "70%" }}
				/>

				<View style={styles.insiraNome}>
					<Text style={styles.textos}>Parabens, você ganhou!!</Text>
					<Text style={styles.textosPontuacao}>Pontuação Final: {pontuacao}</Text>
				</View>

				<View style={styles.botoesContainer}>
					<Pressable
						onPress={() => jogar()}
						style={({ pressed }) => [
							styles.botao,
							{ backgroundColor: pressed ? "#0f4724" : "#1a5d33" },
						]}>
						<Text style={styles.textos2}>Jogar Novamente</Text>
					</Pressable>
					<Pressable
						onPress={() => sair()}
						style={({ pressed }) => [
							styles.botao,
							{ backgroundColor: pressed ? "#0f4724" : "#1a5d33" },
						]}>
						<Text style={styles.textos2}>Sair</Text>
					</Pressable>
				</View>
			</View>
			<View style={styles.baixo}></View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#b0c498",
		borderWidth: 0,
		width: "100%",
	},
	cima: {
		backgroundColor: "#0d3528",
		height: "10%",
		width: "100%",
		borderWidth: 0,
	},
	meio: {
		width: "100%",
		height: "80%",
		alignItems: "center",
		borderWidth: 0,
	},
	baixo: {
		backgroundColor: "#0d3528",
		height: "10%",
		width: "100%",
		borderWidth: 0,
	},
	insiraNome: {
		backgroundColor: "#134c28",
		width: "85%",
		alignSelf: "center",
		borderRadius: 13,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 8,
	},
	textos: {
		color: "white",
		fontFamily: "Poppins_700Bold",
		fontStyle: "bold",
		marginBottom: 8,
	},
	textosPontuacao: {
		color: "#fff5da",
		fontFamily: "Poppins_700Bold",
		fontStyle: "bold",
		fontSize: 16,
	},
	textos2: {
		color: "white",
		fontFamily: "Poppins_700Bold",
		fontStyle: "bold",
		opacity: 0.7,
		textAlign: "center",
	},
	botoesContainer: {
		flexDirection: "row",
		gap: 10,
		marginTop: 10,
		width: "85%",
		alignSelf: "center",
	},
	botao: {
		flex: 1,
		backgroundColor: "#1a5d33",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 13,
		padding: 8,
		minHeight: 50,
	},
});
