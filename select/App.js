import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

export default function App() {

  // ---------------- STATE ----------------
  const [screen, setScreen] = useState("name"); // name | select | game
  const [playerName, setPlayerName] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // ---------------- DATA ----------------
  const characters = [
    { id: "guy1", image: require("./assets/guy1.png") },
    { id: "guy2", image: require("./assets/guy2.png") },
    { id: "guy3", image: require("./assets/guy3.png") },
    { id: "girl1", image: require("./assets/girl1.png") },
    { id: "girl2", image: require("./assets/girl2.png") },
    { id: "girl3", image: require("./assets/girl3.png") },
  ];

  // ---------------- HANDLERS ----------------
  const nextCharacter = () => {
    setSelectedIndex((selectedIndex + 1) % characters.length);
  };

  const prevCharacter = () => {
    setSelectedIndex(
      (selectedIndex - 1 + characters.length) % characters.length
    );
  };

  const handleNextFromName = () => {
    if (playerName.trim() !== "") {
      setScreen("select");
    }
  };

  const handlePlay = () => {
    setSelectedCharacter(characters[selectedIndex]);
    setScreen("game");
  };

  // ---------------- SCREENS ----------------

  // NAME SCREEN
  if (screen === "name") {
    return (
      <View>
        <Text>Enter Player Name</Text>

        <TextInput
          placeholder="Player Name"
          value={playerName}
          onChangeText={setPlayerName}
        />

        <TouchableOpacity onPress={handleNextFromName}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // CHARACTER SELECT SCREEN
  if (screen === "select") {
    return (
      <View>
        <Text>Select Character</Text>

        <TouchableOpacity onPress={prevCharacter}>
          <Text>Left</Text>
        </TouchableOpacity>

        <Image
          source={characters[selectedIndex].image}
          style={{ width: 150, height: 150 }}
        />

        <TouchableOpacity onPress={nextCharacter}>
          <Text>Right</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePlay}>
          <Text>Play</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // GAME SCREEN
  if (screen === "game") {
    return (
      <View>
        <Text>Welcome {playerName}</Text>

        {selectedCharacter && (
          <Image
            source={selectedCharacter.image}
            style={{ width: 150, height: 150 }}
          />
        )}

        <Text>Character: {selectedCharacter?.id}</Text>
      </View>
    );
  }
}