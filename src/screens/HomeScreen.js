import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import ForYouSlider from "../components/ForYouSlider";
import HeaderMovieSlider from "../components/HeaderMovieSlider";
import axios from "axios";
import { COLORS, FONTS, FONT_SIZES } from "../theme";

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [headerMovies, setHeaderMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.1.110:5000/movies")
      .then((response) => {
        setMovies(response.data);
        setHeaderMovies(response.data.slice(0, 5));
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.dark }}>
      <HeaderMovieSlider movies={headerMovies} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: COLORS.primary,
            fontSize: FONT_SIZES.medium,
            fontFamily: FONTS.semibold,
          }}
        >
          {headerMovies.length > 0 ? "For You" : ""}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Movies", { movies })}
        >
          <Text style={{ color: COLORS.secondary, fontFamily: FONTS.medium }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <ForYouSlider movies={movies} />
    </View>
  );
}
