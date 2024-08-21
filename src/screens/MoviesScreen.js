import React, { memo } from "react";
import { View, Text, FlatList, Image, Dimensions } from "react-native";
import { COLORS, FONTS, FONT_SIZES } from "../theme";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width - 40) / 2;

// MovieItem bileşeni memo ile optimize edildi
const MovieItem = memo(({ movie }) => (
  <View style={{ flex: 1, margin: 10 }}>
    <Image
      source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
      style={{
        width: ITEM_WIDTH,
        height: ITEM_WIDTH * 1.5,
        borderRadius: 10,
      }}
    />
    <View
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: 5,
        borderRadius: 5,
      }}
    >
      <Text
        style={{
          color: COLORS.primary,
          fontSize: FONT_SIZES.small,
          fontFamily: FONTS.semibold,
        }}
      >
        IMDb {movie.vote_average}
      </Text>
    </View>
  </View>
));

export default function MoviesScreen({ route }) {
  const { movies } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.dark, padding: 10 }}>
      <Text
        style={{
          color: COLORS.primary,
          fontSize: FONT_SIZES.large,
          fontFamily: FONTS.semibold,
          marginBottom: 20,
        }}
      >
        Popular Movies
      </Text>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieItem movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6} // Başlangıçta 6 öğe render edilir
        windowSize={4} // Görüntülenen ekranın 4 katı kadar render edilir
      />
    </View>
  );
}
