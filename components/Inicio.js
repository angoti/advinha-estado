import { View, Image, StyleSheet, Pressable, Text } from "react-native";
import { logout } from "../src/services/firebase";

function Inicio({ nav }) {
	const handlePress = () => {
		nav("jogo");
	};

	return (
		<View style={styles.container}>
			<View style={styles.cima} />
			<View style={styles.meio}>
				<Image
					source={require("../assets/image.png")}
					resizeMode="contain"
					style={{ width: "90%", height: "60%" }}
				/>
				<View>
					<Pressable style={styles.botao} onPress={handlePress}>
						<Text style={styles.textoBotao}>Começar</Text>
					</Pressable>
					<Pressable style={styles.botao} onPress={() => nav("ranking")}>
						<Text style={styles.textoBotao}>Ranking</Text>
					</Pressable>
					<Pressable style={styles.botao} onPress={logout}>
						<Text style={styles.textoBotao}>Sair do Jogo</Text>
					</Pressable>
				</View>
			</View>
			<View style={styles.baixo} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#b0c498",
		borderWidth: 0,
		width: "100%",
	},
	botao: {
		backgroundColor: "#0B3D0B",
		paddingVertical: 12,
		paddingHorizontal: 40,
		borderRadius: 30,
		alignItems: "center",
		marginTop: 10,
	},

	textoBotao: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
	cima: {
		backgroundColor: "#0d3528",
		height: "10%",
		width: "100%",
	},
	meio: {
		width: "100%",
		height: "80%",
		alignItems: "center",
	},
	baixo: {
		backgroundColor: "#0d3528",
		height: "10%",
		width: "100%",
	},
});

export default Inicio;
