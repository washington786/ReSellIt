import { StyleSheet, View } from "react-native";
import React from "react";
import { Card, UserCard } from "@/components/modules/application";
import { RouteProp, useRoute } from "@react-navigation/native";
import { navigationTypes } from "@/types/navigationTypes";
import { IList } from "@/interfaces/IListing";

const ListingDetails = () => {
  const route = useRoute<RouteProp<navigationTypes, "listingDetails">>();
  const { id } = route.params;
  const { images, price, title } = id as any as IList;
  return (
    <View>
      <Card
        subtitle={price}
        title={title}
        image={{
          uri: images[0].url.replace(
            "http://192.168.0.14:9000/",
            "http://192.168.0.221:9000/"
          ),
        }}
      />
      <UserCard
        avatarImage=""
        description={4500}
        name="Daniel Hon"
        onPress={() => {}}
      />
    </View>
  );
};

export default ListingDetails;

const styles = StyleSheet.create({});
