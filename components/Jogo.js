import {
	Text,
	StyleSheet,
	View,
	Image,
	TextInput,
	Pressable,
	Alert,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
	ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useFonts } from "@expo-google-fonts/poppins/useFonts";
import { Poppins_700Bold } from "@expo-google-fonts/poppins/700Bold";
import { Poppins_400Regular } from "@expo-google-fonts/poppins/400Regular";

const listaDeMapas = [
	{ estado: "Pernambuco", mapa: require("../assets/pernam.png") },
	{ estado: "Acre", mapa: require("../assets/acre.png") },
	{ estado: "Roraima", mapa: require("../assets/roraima.png") },
	{ estado: "Tocantins", mapa: require("../assets/toc.png") },
	{ estado: "Amazonas", mapa: require("../assets/amazo.png") },
	{ estado: "Espírito Santo", mapa: require("../assets/espir.png") },
	{ estado: "Bahia", mapa: require("../assets/bahia.png") },
	{ estado: "Minas Gerais", mapa: require("../assets/minas.png") },
	{ estado: "Paraíba", mapa: require("../assets/paraiba.png") },
	{ estado: "Pará", mapa: require("../assets/para.png") },
	{ estado: "Mato Grosso", mapa: require("../assets/mt.png") },
	{ estado: "Santa Catarina", mapa: require("../assets/sc.png") },
	{ estado: "Alagoas", mapa: require("../assets/alagoas.png") },
	{ estado: "Rio de Janeiro", mapa: require("../assets/rj.png") },
	{ estado: "Ceará", mapa: require("../assets/ceara.png") },
	{ estado: "Goias", mapa: require("../assets/goias.png") },
	{ estado: "Paraná", mapa: require("../assets/parana.png") },
	{ estado: "Amapá", mapa: require("../assets/amapa.png") },
	{ estado: "Sergipe", mapa: require("../assets/sergipe.png") },
	{ estado: "Distrito Federal", mapa: require("../assets/df.png") },
	{ estado: "Rio Grande do Sul", mapa: require("../assets/rs.png") },
	{ estado: "Maranhão", mapa: require("../assets/mara.png") },
	{ estado: "Piauí", mapa: require("../assets/piaui.png") },
	{ estado: "Mato Grosso do Sul", mapa: require("../assets/ms.png") },
	{ estado: "Rio Grande do Norte", mapa: require("../assets/rn.png") },
	{ estado: "ganhouuu", mapa: require("../assets/ganhou2.png") },
];
export default function Jogo({ nav }) {
	const [fontsLoaded] = useFonts({
		Poppins_700Bold,
		Poppins_400Regular,
	});
	const [text, setText] = useState("");
	const [mapa, setMapa] = useState(0);
	const [pontuacao, setPontuacao] = useState(0);

	function jogar() {
		Keyboard.dismiss();
		setText("");
		if (
			text.toLowerCase() === listaDeMapas[mapa].estado.toLowerCase() &&
			(text != "Rio Grande do Norte" || text === "rio grande do norte")
		) {
			Alert.alert("Acertou!");
			setPontuacao(pontuacao + 10);
			setMapa(mapa + 1);
		} else if (
			text.toLowerCase() === listaDeMapas[mapa].estado.toLowerCase() &&
			(text === "Rio Grande do Norte" || text === "rio grande do norte")
		) {
			setPontuacao(pontuacao + 10);
			nav("ganhou", pontuacao + 10);
		} else {
			Alert.alert("Errado", "Tente Novamente!");
			setPontuacao(Math.max(0, pontuacao - 5));
		}
	}

	if (!fontsLoaded) {
		return <ActivityIndicator size="large" color="#0000ff" />;
	}
	return (
		<KeyboardAvoidingView
			keyboardVerticalOffset={-100}
			behavior={Platform.OS === "ios" ? "padding" : "position"}
			style={styles.container}>
			<View style={styles.cima}>
				<Text style={styles.pontuacaoTexto}>Pontuação: {pontuacao}</Text>
			</View>
			<View style={styles.meio}>
				<Image
					source={listaDeMapas[mapa].mapa}
					resizeMode="contain"
					style={{ width: "90%", height: "70%" }}
				/>

				<View style={styles.insiraNome}>
					<Text style={styles.textos}>Insira abaixo o nome do estado em verde:</Text>
				</View>
				<TextInput
					style={styles.input}
					onChangeText={setText}
					value={text}
					placeholder="Escreva aqui:"
					placeholderTextColor="rgba(128, 128, 128, 0.5)"
				/>
				<Pressable
					onPress={() => jogar()}
					style={({ pressed }) => [
						styles.botao,
						{ backgroundColor: pressed ? "#0f4724" : "#1a5d33" },
					]}>
					<Text style={styles.textos2}>Enviar</Text>
				</Pressable>
				<Pressable
					onPress={() => nav("ganhou", pontuacao)}
					style={({ pressed }) => [
						styles.botao,
						{ backgroundColor: pressed ? "#0f4724" : "#1a5d33" },
					]}>
					<Text style={styles.textos2}>Terminar</Text>
				</Pressable>
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
		borderColor: "red",
		width: "100%",
	},
	cima: {
		backgroundColor: "#0d3528",
		height: "10%",
		width: "100%",
		borderWidth: 0,
		borderColor: "orange",
		justifyContent: "center",
		alignItems: "center",
	},
	pontuacaoTexto: {
		color: "white",
		fontFamily: "Poppins_700Bold",
		fontSize: 18,
		fontStyle: "bold",
	},
	meio: {
		width: "100%",
		height: "80%",
		alignItems: "center",
		borderWidth: 0,
		borderColor: "blue",
	},
	baixo: {
		backgroundColor: "#0d3528",
		height: "10%",
		width: "100%",
		borderWidth: 0,
		borderColor: "yellow",
	},

	insiraNome: {
		backgroundColor: "#134c28",
		height: "6.5%",
		width: "85%",
		alignSelf: "center",
		borderRadius: 13,
		alignItems: "center",
		justifyContent: "center",
	},
	textos: {
		color: "white",
		fontFamily: "Poppins_700Bold",
		fontStyle: "bold",
	},
	textos2: {
		color: "white",
		fontFamily: "Poppins_700Bold",
		fontStyle: "bold",
		opacity: 0.7,
	},
	input: {
		margin: 12,
		padding: 4,
		color: "#134c28",
		backgroundColor: "#fff5da",
		borderRadius: 13,
		width: "85%",
		height: "6.5%",
		fontFamily: "Poppins_400Regular",
	},
	botao: {
		backgroundColor: "#1a5d33",
		color: "black",
		width: "19%",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 13,
		height: "4%", marginTop: 4,
	},
});
