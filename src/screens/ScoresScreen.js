import { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator, Alert, Text, Button } from "react-native";
import { getScoresByGame } from "../services/firebase";

function formatarData(timestamp) {
	if (!timestamp) return "Data não disponível";
	if (timestamp.toDate) {
		const date = timestamp.toDate();
		return date.toLocaleDateString("pt-BR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	}
	if (timestamp instanceof Date) {
		return timestamp.toLocaleDateString("pt-BR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	}
	return "Data não disponível";
}

export default function ScoresScreen({ nav }) {
	const [pontuacoes, setPontuacoes] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		carregarPontuacoes();
	}, []);

	async function carregarPontuacoes() {
		setLoading(true);
		try {
			const scores = await getScoresByGame("Quiz Estados");
			setPontuacoes(scores);
		} catch (error) {
			Alert.alert("Erro", `Não foi possível carregar as pontuações. \n${error.message}`);
		} finally {
			setLoading(false);
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.titulo}>Pontuações</Text>

			{loading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" />
					<Text style={styles.loadingText}>Carregando pontuações...</Text>
				</View>
			) : (
				<ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
					{pontuacoes.map((score, index) => (
						<View style={styles.scoreCard} key={score.id || index}>
							<View style={styles.cardHeader}>
								<View style={styles.rankContainer}>
									<Text style={styles.rankText}>#{index + 1}</Text>
								</View>
								<Text style={styles.pointsText}>{score.points || 0} pontos</Text>
							</View>
							<View style={styles.cardBody}>
								<Text style={styles.playerName}>{score.playerName || "Anônimo"}</Text>
								<Text style={styles.dateText}>{formatarData(score.date || score.createdAt)}</Text>
							</View>
						</View>
					))}
				</ScrollView>
			)}
			<View style={{ marginVertical: 16 }}>
				<Button
					title="Voltar"
					mode="outlined"
					onPress={() => nav("inicio")}
					style={styles.botaoVoltar}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 40,
		borderWidth: 1,
		width: "100%",
		padding: 8,
	},
	titulo: {
		marginBottom: 16,
		textAlign: "center",
		fontSize: 24,
		fontWeight: "bold",
	},
	loadingContainer: {
		padding: 32,
		alignItems: "center",
	},
	loadingText: {
		marginTop: 12,
		opacity: 0.7,
	},
	scrollContainer: {
		margin: 8,
	},
	scoreCard: {
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 5,
		borderWidth: 1,
		borderColor: "#e5e7eb",
	},
	cardHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
		paddingBottom: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#e5e7eb",
	},
	rankContainer: {
		backgroundColor: "#1a5d33",
		borderRadius: 20,
		paddingHorizontal: 12,
		paddingVertical: 6,
	},
	rankText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 14,
	},
	pointsText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#134c28",
	},
	cardBody: {
		gap: 8,
	},
	playerName: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1f2937",
	},
	dateText: {
		fontSize: 14,
		color: "#6b7280",
	},
	botaoVoltar: {
		marginTop: 16,
		marginBottom: 24,
	},
});
