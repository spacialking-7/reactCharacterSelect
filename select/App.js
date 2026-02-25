import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  Provider as PaperProvider,
  Button,
  TextInput,
  Appbar,
  BottomNavigation,
  Card,
} from "react-native-paper";

const { width } = Dimensions.get("window");

// ---------------- CHARACTERS ----------------
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

// ---------------- STORY DATA WITH CHOICES ----------------
const storyData = (playerName) => [
  {
    id: 1,
    text: `Welcome, ${playerName}! Your adventure begins in a dark forest.`,
    image: require("./assets/forest.jpg"),
    choices: [
      { text: "Take the left path", nextId: 2, upgrade: { strength: 1 } },
      { text: "Take the right path", nextId: 3, upgrade: { wisdom: 1 } },
    ],
  },
  {
    id: 2,
    text: `You encounter a wild river. How will you cross?`,
    image: require("./assets/river.jpg"),
    choices: [
      { text: "Swim across", nextId: 4, upgrade: { strength: 1 } },
      { text: "Look for a bridge", nextId: 5, upgrade: { wisdom: 1 } },
    ],
  },
  {
    id: 3,
    text: `You find a mysterious cabin in the distance.`,
    image: require("./assets/cabin.jpg"),
    choices: [
      { text: "Enter the cabin", nextId: 6, upgrade: { wisdom: 1 } },
      { text: "Go around it", nextId: 4, upgrade: { strength: 1 } },
    ],
  },
  {
    id: 4,
    text: `You reach a cave. The adventure continues...`,
    image: require("./assets/cave.jpg"),
    choices: [],
  },
  {
    id: 5,
    text: `You find a hidden treasure! Your wisdom has grown.`,
    image: require("./assets/cabin.jpg"),
    choices: [],
  },
  {
    id: 6,
    text: `A secret room is revealed! Your adventure deepens.`,
    image: require("./assets/cave.jpg"),
    choices: [],
  },
];

// ---------------- NAME SCREEN ----------------
const NameScreen = ({ playerName, setPlayerName, next }) => (
  <View style={styles.screenContainer}>
    <Appbar.Header>
      <Appbar.Content title="Enter Your Name" />
    </Appbar.Header>
    <View style={styles.centerContainer}>
      <TextInput
        label="Your Name"
        value={playerName}
        onChangeText={setPlayerName}
        mode="outlined"
        style={{ width: "80%", marginBottom: 20 }}
      />
      <Button
        mode="contained"
        onPress={next}
        style={styles.button}
        disabled={!playerName.trim()}
      >
        Next
      </Button>
    </View>
  </View>
);

// ---------------- CHARACTER SCREEN ----------------
const CharacterScreen = ({
  maleIndex,
  femaleIndex,
  selected,
  setSelected,
  changeChar,
  next,
}) => (
  <View style={styles.screenContainer}>
    <Appbar.Header>
      <Appbar.Content title="Select Your Character" />
    </Appbar.Header>
    <View style={styles.centerContainer}>
      <Text style={styles.instruction}>Tap a character to select</Text>
      <View style={styles.characterRow}>
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
            <Button compact onPress={() => changeChar("male", -1)}>◀</Button>
            <Button compact onPress={() => changeChar("male", 1)}>▶</Button>
          </View>
        </View>
        <View style={styles.charContainer}>
          <TouchableOpacity
            onPress={() => setSelected("female")}
            activeOpacity={0.7}
          >
            <Image
              source={femaleChars[femaleIndex].image}
              style={[
                styles.characterImage,
                selected === "female" && styles.selectedBorder,
              ]}
            />
          </TouchableOpacity>
          <View style={styles.arrowRow}>
            <Button compact onPress={() => changeChar("female", -1)}>◀</Button>
            <Button compact onPress={() => changeChar("female", 1)}>▶</Button>
          </View>
        </View>
      </View>
      <Button
        mode="contained"
        onPress={next}
        style={[styles.button, { marginTop: 20 }]}
        disabled={!selected}
      >
        Play
      </Button>
    </View>
  </View>
);

// ---------------- STORY SCREEN ----------------
const StoryScreen = ({ storyIndex, nextStory, story, selectedChar, stats, updateStats }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [displayedText, setDisplayedText] = useState("");
  const currentScene = story[storyIndex];

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();

    let i = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      if (i < currentScene.text.length) {
        setDisplayedText((prev) => prev + currentScene.text[i]);
        i++;
      } else clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [storyIndex]);

  const handleChoice = (choice) => {
    if (choice.upgrade) updateStats(choice.upgrade);
    const nextId = story.findIndex((s) => s.id === choice.nextId);
    if (nextId !== -1) nextStory(nextId);
  };

  return (
    <View style={[styles.screenContainer, { backgroundColor: "#121212" }]}>
      <Appbar.Header style={{ backgroundColor: "#1F1F1F" }}>
        <Appbar.Content title="Adventure" titleStyle={{ color: "#fff" }} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.centerContainer}>
        <Animated.View style={{ opacity: fadeAnim, width: "100%", alignItems: "center" }}>
          <View style={styles.storyImageContainer}>
            <Image source={currentScene.image} style={styles.storyImage} />
            {selectedChar && (
              <Animated.Image
                source={selectedChar.image}
                style={[
                  styles.overlayChar,
                  {
                    transform: [
                      {
                        translateY: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [30, 0],
                        }),
                      },
                    ],
                  },
                ]}
              />
            )}
            <View style={styles.darkOverlay} />
          </View>
          <Card style={styles.storyPanel}>
            <Card.Content>
              <Text style={styles.storyText}>{displayedText}</Text>
              <View style={{ marginTop: 10 }}>
                {currentScene.choices.map((c, idx) => (
                  <Button
                    key={idx}
                    mode="contained"
                    style={{ marginVertical: 4 }}
                    onPress={() => handleChoice(c)}
                  >
                    {c.text}
                  </Button>
                ))}
              </View>
              <View style={styles.statsRow}>
                <Text style={styles.statText}>Strength: {stats.strength}</Text>
                <Text style={styles.statText}>Wisdom: {stats.wisdom}</Text>
              </View>
            </Card.Content>
          </Card>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

// ---------------- MAIN APP ----------------
export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "name", title: "Name", icon: "account" },
    { key: "character", title: "Character", icon: "account-circle" },
    { key: "story", title: "Story", icon: "book-open" },
  ]);

  const [playerName, setPlayerName] = useState("");
  const [maleIndex, setMaleIndex] = useState(0);
  const [femaleIndex, setFemaleIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [storyIndex, setStoryIndex] = useState(0);
  const [stats, setStats] = useState({ strength: 0, wisdom: 0 });

  const story = storyData(playerName);
  const selectedChar =
    selected === "male" ? maleChars[maleIndex] : femaleChars[femaleIndex];

  const changeChar = (type, dir) => {
    if (type === "male") setMaleIndex((prev) => (prev + dir + maleChars.length) % maleChars.length);
    else setFemaleIndex((prev) => (prev + dir + femaleChars.length) % femaleChars.length);
  };

  const updateStats = (upgrade) => setStats((prev) => ({
    ...prev,
    ...Object.keys(upgrade).reduce((a, k) => ({ ...a, [k]: prev[k] + upgrade[k] }), {})
  }));

  const nextStory = (idx) => setStoryIndex(idx);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "name":
        return <NameScreen playerName={playerName} setPlayerName={setPlayerName} next={() => setIndex(1)} />;
      case "character":
        return <CharacterScreen maleIndex={maleIndex} femaleIndex={femaleIndex} selected={selected} setSelected={setSelected} changeChar={changeChar} next={() => setIndex(2)} />;
      case "story":
        return <StoryScreen storyIndex={storyIndex} nextStory={nextStory} story={story} selectedChar={selectedChar} stats={stats} updateStats={updateStats} />;
      default: return null;
    }
  };

  return (
    <PaperProvider>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{ backgroundColor: "#6200ee" }}
      />
    </PaperProvider>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: "#f2f2f2" },
  centerContainer: { flex: 1, alignItems: "center", justifyContent: "center", padding: 16 },
  button: { width: 160 },
  instruction: { fontSize: 16, marginBottom: 10 },
  characterRow: { flexDirection: "row", justifyContent: "space-around", width: "100%" },
  charContainer: { alignItems: "center" },
  characterImage: { width: width / 3.5, height: width / 3.5, resizeMode: "contain", marginBottom: 8 },
  arrowRow: { flexDirection: "row", justifyContent: "space-between", width: 80 },
  selectedBorder: { borderWidth: 3, borderColor: "#FF5722", borderRadius: 12 },
  storyImageContainer: { width: "100%", alignItems: "center", marginBottom: 16, position: "relative" },
  storyImage: { width: "100%", height: 250, borderRadius: 12, resizeMode: "cover" },
  overlayChar: { width: 100, height: 100, resizeMode: "contain", position: "absolute", bottom: 10, right: 10, borderWidth: 2, borderColor: "#FF5722", borderRadius: 10 },
  darkOverlay: { position: "absolute", width: "100%", height: 250, backgroundColor: "rgba(0,0,0,0.35)", borderRadius: 12 },
  storyPanel: { width: "90%", marginTop: -60, backgroundColor: "#1E1E1E", elevation: 4 },
  storyText: { fontSize: 18, textAlign: "center", color: "#fff" },
  statsRow: { flexDirection: "row", justifyContent: "space-around", marginTop: 12 },
  statText: { color: "#FFB74D", fontWeight: "bold" },
});