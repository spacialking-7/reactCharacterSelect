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
  // -------- STATE --------
  const [screen, setScreen] = useState("name"); // name | select | game
  const [playerName, setPlayerName] = useState("");
  const [selectedMale, setSelectedMale] = useState(0);
  const [selectedFemale, setSelectedFemale] = useState(0);

  // -------- DATA --------
  const maleChars = [
    require("./assets/guy1.png"),
    require("./assets/guy2.png"),
    require("./assets/guy3.png"),
  ];

  const femaleChars = [
    require("./assets/girl1.png"),
    require("./assets/girl2.png"),
    require("./assets/girl3.png"),
  ];

  // -------- HANDLERS --------
  const nextMale = () =>
    setSelectedMale((selectedMale + 1) % maleChars.length);
  const prevMale = () =>
    setSelectedMale((selectedMale - 1 + maleChars.length) % maleChars.length);

  const nextFemale = () =>
    setSelectedFemale((selectedFemale + 1) % femaleChars.length);
  const prevFemale = () =>
    setSelectedFemale((selectedFemale - 1 + femaleChars.length) % femaleChars.length);

  const handleNextFromName = () => {
    if (playerName.trim() !== "") setScreen("select");
  };

  const handlePlay = () => {
    // You can navigate to game screen or store selection here
    console.log("Player Name:", playerName);
    console.log("Selected Male Index:", selectedMale);
    console.log("Selected Female Index:", selectedFemale);
    alert(`Ready! ${playerName} selected characters.`);
  };

  // -------- SCREENS --------

  // ---- NAME SCREEN ----
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

  // ---- CHARACTER SELECT SCREEN ----
  if (screen === "select") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Select Your Characters</Text>

        <View style={styles.row}>
          {/* Male */}
          <View style={styles.charColumn}>
            <TouchableOpacity onPress={prevMale}>
              <Text style={styles.arrow}>⬅</Text>
            </TouchableOpacity>

            <View style={styles.charCard}>
              <Image
                source={maleChars[selectedMale]}
                style={styles.characterImage}
              />
            </View>

            <TouchableOpacity onPress={nextMale}>
              <Text style={styles.arrow}>➡</Text>
            </TouchableOpacity>
            <Text style={styles.charLabel}>Male</Text>
          </View>

          {/* Female */}
          <View style={styles.charColumn}>
            <TouchableOpacity onPress={prevFemale}>
              <Text style={styles.arrow}>⬅</Text>
            </TouchableOpacity>

            <View style={styles.charCard}>
              <Image
                source={femaleChars[selectedFemale]}
                style={styles.characterImage}
              />
            </View>

            <TouchableOpacity onPress={nextFemale}>
              <Text style={styles.arrow}>➡</Text>
            </TouchableOpacity>
            <Text style={styles.charLabel}>Female</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
          <Text style={styles.playButtonText}>Play</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 26,
    color: "#fff",
    marginBottom: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
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
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 40,
  },
  charColumn: {
    alignItems: "center",
  },
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
  characterImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  arrow: {
    fontSize: 28,
    color: "#fff",
    marginVertical: 5,
  },
  charLabel: {
    color: "#aaa",
    fontSize: 16,
    marginTop: 5,
  },
  playButton: {
    backgroundColor: "#FF5722",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 15,
  },
  playButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});