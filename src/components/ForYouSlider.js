import React, { memo } from "react";
import { View, FlatList, Image, TouchableOpacity, Text } from "react-native";
import { COLORS, FONTS, FONT_SIZES } from "../theme";

// MovieItem bileşeni, React.memo ile optimize ediliyor
const MovieItem = memo(({ movie }) => {
  return (
    <TouchableOpacity style={{ marginRight: 10 }}>
      <View style={{ position: "relative" }}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={{ width: 120, height: 180, borderRadius: 10 }}
        />
        <View
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            paddingHorizontal: 6,
            borderRadius: 4,
          }}
        >
          <Text
            style={{
              color: COLORS.primary,
              fontFamily: FONTS.medium,
              fontSize: FONT_SIZES.small,
            }}
          >
            IMDb {movie.vote_average}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default function ForYouSlider({ movies }) {
  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieItem movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 10, paddingTop: 10 }}
        initialNumToRender={5} // Başlangıçta 5 öğeyi render et
        windowSize={5} // Ekranın 5 katı kadar öğe render edilir
      />
    </View>
  );
}
