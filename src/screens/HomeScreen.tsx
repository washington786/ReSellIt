import { FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { RWrapper } from "@/components/common";
import { Card } from "@/components/modules/application";
import useTransition from "@/hooks/useTransition";
import { fetchListings } from "@/api/listings";
import { IList } from "@/interfaces/IListing";

const HomeScreen = () => {
  const { onListDetails } = useTransition();
  const [listings, setListings] = useState<IList[]>([]);

  useEffect(() => {
    async function loadList() {
      const list = await fetchListings();
      setListings(list);
    }
    loadList();
  }, []);

  return (
    <RWrapper>
      <FlatList
        data={listings}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 5, paddingHorizontal: 6 }}
        keyExtractor={(item, index) => `${item.id}-${index.toString}`}
        renderItem={({ item }) => {
          const { title, price, images } = item;
          return (
            <Card
              subtitle={price}
              title={title}
              image={{
                uri: images[0].url.replace(
                  "http://192.168.0.14:9000/",
                  "http://192.168.0.221:9000/"
                ),
              }}
              style={{ borderRadius: 10, overflow: "hidden" }}
              onPress={() => onListDetails(item as any)}
            />
          );
        }}
      />
    </RWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
