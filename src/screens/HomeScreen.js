import { useState } from "react";
import { View } from "react-native";
import Jogo from "../../components/Jogo";
import Inicio from "../../components/Inicio";
import Ganhou from "../../components/Ganhou";
import ScoresScreen from "./ScoresScreen";

export default function App() {
	// estado que controla qual "tela" está ativa
	// valores possíveis: 'inicio' | 'jogo' | 'creditos'
	const [tela, setTela] = useState("inicio");
	const [pontuacaoFinal, setPontuacaoFinal] = useState(0);

	const irPara = (nomeTela, pontuacao) => {
		if (pontuacao !== undefined) {
			setPontuacaoFinal(pontuacao);
		}
		setTela(nomeTela);
	};

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			{tela === "inicio" && <Inicio nav={irPara} />}
			{tela === "jogo" && <Jogo nav={irPara} />}
			{tela === "ganhou" && <Ganhou nav={irPara} pontuacao={pontuacaoFinal} />}
			{tela === "ranking" && <ScoresScreen nav={irPara} pontuacao={pontuacaoFinal} />}
		</View>
	);
}
