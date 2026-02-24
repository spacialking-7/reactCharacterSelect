import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Provider as PaperProvider, Button, TextInput } from "react-native-paper";

const { width } = Dimensions.get("window");

// ---------------- STORY DATA ----------------
const storyData = (playerName) => [
  {
    text: `Welcome, ${playerName}! Your journey begins in the mystical forest.`,
    image: require("./assets/forest.jpg"),
  },
  {
    text: `${playerName}, you see a fork in the path. Will you go left or right?`,
    image: require("./assets/river.jpg"),
  },
  {
    text: `${playerName}, night falls and you find a mysterious cabin.`,
    image: require("./assets/cabin.jpg"),
  },
  {
    text: `Inside the cabin, you discover a hidden passage to a cave.`,
    image: require("./assets/cave.jpg"),
  },
];

// ---------------- CHARACTER DATA ----------------
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

export default function App() {
  const [playerName, setPlayerName] = useState("");
  const [screen, setScreen] = useState("name"); // "name" | "character" | "story"
  const [maleIndex, setMaleIndex] = useState(0);
  const [femaleIndex, setFemaleIndex] = useState(0);
  const [selected, setSelected] = useState(null); // "male" | "female"
  const [storyIndex, setStoryIndex] = useState(0);

  const story = storyData(playerName);
  const selectedChar =
    selected === "male" ? maleChars[maleIndex] : femaleChars[femaleIndex];

  // ---------------- HANDLERS ----------------
  const nextFromName = () => {
    if (playerName.trim()) setScreen("character");
  };

  const nextFromCharacter = () => {
    if (selected) setScreen("story");
  };

  const storyNext = () => {
    if (storyIndex < story.length - 1) setStoryIndex(storyIndex + 1);
  };

  const storyBack = () => {
    if (storyIndex > 0) setStoryIndex(storyIndex - 1);
  };

  const changeChar = (type, dir) => {
    if (type === "male") {
      setMaleIndex((prev) => (prev + dir + maleChars.length) % maleChars.length);
    } else {
      setFemaleIndex((prev) => (prev + dir + femaleChars.length) % femaleChars.length);
    }
  };

  // ---------------- SCREENS ----------------
  if (screen === "name") {
    return (
      <PaperProvider>
        <View style={styles.container}>
          <Text style={styles.title}>Enter Your Name</Text>
          <TextInput
            mode="outlined"
            placeholder="Your Name"
            value={playerName}
            onChangeText={setPlayerName}
            style={styles.input}
          />
          <Button mode="contained" onPress={nextFromName} style={styles.button}>
            Next
          </Button>
        </View>
      </PaperProvider>
    );
  }

  if (screen === "character") {
    return (
      <PaperProvider>
        <View style={styles.container}>
          <Text style={styles.title}>Select Your Character</Text>
          <View style={styles.characterRow}>
            {/* Male Character */}
            <View style={styles.charContainer}>
              <TouchableOpacity onPress={() => setSelected("male")} activeOpacity={0.7}>
                <Image
                  source={maleChars[maleIndex].image}
                  style={[
                    styles.characterImage,
                    selected === "male" && styles.selectedBorder,
                  ]}
                />
              </TouchableOpacity>
              <View style={styles.arrowRow}>
                <Button compact onPress={() => changeChar("male", -1)}>
                  ◀
                </Button>
                <Button compact onPress={() => changeChar("male", 1)}>
                  ▶
                </Button>
              </View>
            </View>

            {/* Female Character */}
            <View style={styles.charContainer}>
              <TouchableOpacity onPress={() => setSelected("female")} activeOpacity={0.7}>
                <Image
                  source={femaleChars[femaleIndex].image}
                  style={[
                    styles.characterImage,
                    selected === "female" && styles.selectedBorder,
                  ]}
                />
              </TouchableOpacity>
              <View style={styles.arrowRow}>
                <Button compact onPress={() => changeChar("female", -1)}>
                  ◀
                </Button>
                <Button compact onPress={() => changeChar("female", 1)}>
                  ▶
                </Button>
              </View>
            </View>
          </View>

          <Button
            mode="contained"
            onPress={nextFromCharacter}
            style={[styles.button, { marginTop: 20 }]}
          >
            Play
          </Button>
        </View>
      </PaperProvider>
    );
  }

  // Story screen
  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Adventure Begins</Text>
        <View style={styles.storyImageContainer}>
          <Image source={story[storyIndex].image} style={styles.storyImage} />
          {selectedChar && <Image source={selectedChar.image} style={styles.overlayChar} />}
        </View>
        <Text style={styles.storyText}>{story[storyIndex].text}</Text>
        <View style={styles.storyNav}>
          <Button disabled={storyIndex === 0} onPress={storyBack} style={styles.navButton}>
            Back
          </Button>
          {storyIndex < story.length - 1 ? (
            <Button onPress={storyNext} style={styles.navButton}>
              Next
            </Button>
          ) : (
            <Text style={{ fontSize: 16, marginLeft: 10 }}>The End</Text>
          )}
        </View>
      </ScrollView>
    </PaperProvider>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "80%",
    marginBottom: 20,
  },
  button: {
    width: 160,
    alignSelf: "center",
  },
  characterRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  charContainer: {
    alignItems: "center",
  },
  characterImage: {
    width: width / 3.5,
    height: width / 3.5,
    resizeMode: "contain",
    marginBottom: 8,
  },
  arrowRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
  },
  selectedBorder: {
    borderWidth: 3,
    borderColor: "#FF5722",
    borderRadius: 12,
  },
  storyImageContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  storyImage: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    resizeMode: "cover",
  },
  overlayChar: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    position: "absolute",
    bottom: 10,
    right: 10,
    borderWidth: 2,
    borderColor: "#FF5722",
    borderRadius: 10,
  },
  storyText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  storyNav: {
    flexDirection: "row",
    alignItems: "center",
  },
  navButton: {
    marginHorizontal: 10,
  },
});