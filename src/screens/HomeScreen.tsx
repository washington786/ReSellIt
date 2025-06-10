import { FlatList, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { RLoader, RNotification, RServerError, RWrapper } from "@/components/common";
import { Card } from "@/components/modules/application";
import useTransition from "@/hooks/useTransition";
import { fetchListings } from "@/api/listings";
import useApi from "@/hooks/useApi";
import useNotification from "@/hooks/useNotification";

const HomeScreen = () => {
  const { onListDetails } = useTransition();

  const { expoPushToken } = useNotification();
  console.log(expoPushToken)

  const {
    data: listings,
    error,
    isLoading,
    request: loadList,
  } = useApi({ apiFunc: fetchListings });

  useEffect(() => {
    loadList();
  }, []);

  if (error) {
    return (
      <RServerError
        title={
          error === "Axios request failed" ? "Sorry something happened" : error
        }
        onPress={loadList}
      />
    );
  }

  if (isLoading) {
    return <RLoader />;
  }

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
                cache: "force-cache",
              }}
              style={{ borderRadius: 10, overflow: "hidden" }}
              onPress={() => onListDetails(item as any)}
            />
          );
        }}
        ListFooterComponent={<RNotification title="Notification" />}
      />
    </RWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
