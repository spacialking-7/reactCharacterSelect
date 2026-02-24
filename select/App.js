import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

export default function App() {
  const [screen, setScreen] = useState("name"); // name | select | game
  const [playerName, setPlayerName] = useState("");

  // Character data
  const maleChars = [
    { id: "guy1", image: require("./assets/guy1.png") },
    { id: "guy2", image: require("./assets/guy2.png") },
    { id: "guy3", image: require("./assets/guy3.png") },
  ];
  const femaleChars = [
    { id: "girl1", image: require("./assets/girl1.png") },
    { id: "girl2", image: require("./assets/girl2.png") },
    { id: "girl3", image: require("./assets/girl3.png") },
  ];

  // Indexes for scrolling
  const [maleIndex, setMaleIndex] = useState(0);
  const [femaleIndex, setFemaleIndex] = useState(0);

  // Selected character
  const [selected, setSelected] = useState(null);

  // Handlers
  const prevMale = () =>
    setMaleIndex((maleIndex - 1 + maleChars.length) % maleChars.length);
  const nextMale = () =>
    setMaleIndex((maleIndex + 1) % maleChars.length);

  const prevFemale = () =>
    setFemaleIndex((femaleIndex - 1 + femaleChars.length) % femaleChars.length);
  const nextFemale = () =>
    setFemaleIndex((femaleIndex + 1) % femaleChars.length);

  const handleNextFromName = () => {
    if (playerName.trim()) setScreen("select");
  };

  const handlePlay = () => {
    if (selected) setScreen("game");
    else alert("Please select a character!");
  };

  // -------- SCREENS --------
  if (screen === "name") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Enter Your Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Player Name"
          placeholderTextColor="#aaa"
          value={playerName}
          onChangeText={setPlayerName}
        />
        <TouchableOpacity
          style={[styles.button, { opacity: playerName.trim() ? 1 : 0.5 }]}
          onPress={handleNextFromName}
          disabled={!playerName.trim()}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (screen === "select") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Select Your Character</Text>

        <View style={styles.row}>
          {/* Male Column */}
          <View style={styles.column}>
            <TouchableOpacity onPress={prevMale}>
              <Text style={styles.arrow}>⬅</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.charCard,
                selected === "male" ? styles.selectedCard : {},
              ]}
              onPress={() => setSelected("male")}
            >
              <Image
                source={maleChars[maleIndex].image}
                style={styles.characterImage}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={nextMale}>
              <Text style={styles.arrow}>➡</Text>
            </TouchableOpacity>
            <Text style={styles.charLabel}>Male</Text>
          </View>

          {/* Female Column */}
          <View style={styles.column}>
            <TouchableOpacity onPress={prevFemale}>
              <Text style={styles.arrow}>⬅</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.charCard,
                selected === "female" ? styles.selectedCard : {},
              ]}
              onPress={() => setSelected("female")}
            >
              <Image
                source={femaleChars[femaleIndex].image}
                style={styles.characterImage}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={nextFemale}>
              <Text style={styles.arrow}>➡</Text>
            </TouchableOpacity>
            <Text style={styles.charLabel}>Female</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handlePlay}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (screen === "game") {
    const char =
      selected === "male"
        ? maleChars[maleIndex]
        : femaleChars[femaleIndex];

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, {playerName}!</Text>
        <View style={styles.charCard}>
          <Image source={char.image} style={styles.characterImage} />
        </View>
        <Text style={styles.subtitle}>
          You selected: {selected} ({char.id})
        </Text>
      </View>
    );
  }
}

// -------- STYLES --------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 26, color: "#fff", fontWeight: "bold", marginBottom: 20 },
  subtitle: { color: "#aaa", marginTop: 20, fontSize: 18 },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#1f1f1f",
    color: "#fff",
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FF5722",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 15,
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  row: { flexDirection: "row", justifyContent: "space-around", width: "100%" },
  column: { alignItems: "center" },
  charCard: {
    width: 120,
    height: 120,
    backgroundColor: "#1f1f1f",
    borderRadius: 12,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  selectedCard: { borderColor: "#FF5722", borderWidth: 4 },
  characterImage: { width: 100, height: 100, resizeMode: "contain" },
  arrow: { fontSize: 28, color: "#fff", marginVertical: 5 },
  charLabel: { color: "#aaa", fontSize: 16, marginTop: 5 },
});