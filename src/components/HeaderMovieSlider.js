import React, { useState, useEffect, memo } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, FONT_SIZES } from "../theme";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Alt slider için küçük film afişleri
const SmallMovieItem = memo(({ movie, isActive }) => {
  return (
    <Image
      source={{
        uri: `https://image.tmdb.org/t/p/w154${movie.poster_path}`,
      }}
      style={{
        width: 60,
        height: 90,
        marginHorizontal: 5,
        borderRadius: 8,
        opacity: isActive ? 1 : 0.5,
      }}
    />
  );
});

export default function HeaderMovieSlider({ movies }) {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  if (!movies.length) return null;

  return (
    <View style={{ height: 600, width: "100%" }}>
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${movies[currentMovieIndex].poster_path}`,
        }}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            "rgba(0, 0, 0, 0.7)",
            "rgba(0, 0, 0, 0.5)",
            "rgba(0, 0, 0, 0.3)",
          ]}
          style={{ flex: 1, justifyContent: "flex-end" }}
        >
          {/* Üst kısım: Logo, Search ve Menü İkonları */}
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
              marginTop: 40,
            }}
          >
            {/* Logo */}
            <Image
              source={require("../../assets/favicon.png")}
              style={{ width: 50, height: 50 }}
            />

            {/* Search ve Menü İkonları */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity style={{ marginRight: 20 }}>
                <Feather name="search" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons name="menu" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Başlık */}
          <View style={{ position: "absolute", bottom: 180, left: 16 }}>
            <Text
              style={{
                color: COLORS.white,
                fontSize: FONT_SIZES.large,
                fontFamily: FONTS.semibold,
              }}
            >
              {movies[currentMovieIndex]?.title ?? ""}
            </Text>
          </View>

          {/* İzle butonu */}
          <View style={{ position: "absolute", bottom: 120, left: 16 }}>
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.secondary,
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 25,
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: FONT_SIZES.regular,
                  fontFamily: FONTS.medium,
                }}
              >
                Watch Now
              </Text>
            </TouchableOpacity>
          </View>

          {/* Alt Slider */}
          <View
            style={{
              position: "absolute",
              bottom: 10,
              left: 16,
              right: 0,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <FlatList
              data={movies}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <SmallMovieItem
                  movie={item}
                  isActive={currentMovieIndex === index}
                />
              )}
              initialNumToRender={5} // Alt slider başlangıçta 5 öğe render eder
              windowSize={3} // Görüntülenen ekranın 3 katı kadar render edilir
            />
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
