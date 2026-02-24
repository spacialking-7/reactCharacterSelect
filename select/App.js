import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function CharacterSelect() {
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

  const [maleIndex, setMaleIndex] = useState(0);
  const [femaleIndex, setFemaleIndex] = useState(0);

  const prevMale = () =>
    setMaleIndex((maleIndex - 1 + maleChars.length) % maleChars.length);
  const nextMale = () => setMaleIndex((maleIndex + 1) % maleChars.length);

  const prevFemale = () =>
    setFemaleIndex((femaleIndex - 1 + femaleChars.length) % femaleChars.length);
  const nextFemale = () =>
    setFemaleIndex((femaleIndex + 1) % femaleChars.length);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Characters</Text>

      <View style={styles.row}>
        {/* Male Column */}
        <View style={styles.column}>
          <TouchableOpacity onPress={prevMale}>
            <Text style={styles.arrow}>⬅</Text>
          </TouchableOpacity>

          <Image source={maleChars[maleIndex]} style={styles.characterImage} />

          <TouchableOpacity onPress={nextMale}>
            <Text style={styles.arrow}>➡</Text>
          </TouchableOpacity>
        </View>

        {/* Female Column */}
        <View style={styles.column}>
          <TouchableOpacity onPress={prevFemale}>
            <Text style={styles.arrow}>⬅</Text>
          </TouchableOpacity>

          <Image source={femaleChars[femaleIndex]} style={styles.characterImage} />

          <TouchableOpacity onPress={nextFemale}>
            <Text style={styles.arrow}>➡</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
  column: {
    alignItems: "center",
  },
  characterImage: {
    width: 100, // smaller width
    height: 100, // smaller height
    resizeMode: "contain",
    marginVertical: 10,
  },
  arrow: {
    fontSize: 25,
    color: "white",
    marginVertical: 5,
  },
});