import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../navigation/userContext";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  FlatList,
} from "react-native";
import axios from "axios";
import { Edit, Fail } from "../svg";
import { BagSvg, HeartSvg, Facebook } from "../svg";
import { Header, ContainerComponent, ProfileCategory } from "../components";
import { COLORS, products, FONTS } from "../constants";
import MainLayout from "./MainLayout";
import { useNavigation } from "@react-navigation/native";
import { render } from "react-dom";

export default function Closet() {
  const { loggedUser, setloggedUser } = useContext(userContext);
  const [ClosetDesc, setClosetDesc] = useState("");
  const [ClosetName, setClosetName] = useState("");
  const [UsersItems, setUsersItems] = useState([]);
  const [UsersItemPhotos, setUsersItemPhotos] = useState([]);
  const [UsersFavList, setUsersFavList] = useState([]);
  const [UsersShopList, setUsersShopList] = useState([]);
  //להוסיף כפתור הוספת פריט
  const navigation = useNavigation();

  useEffect(() => {
    console.log(loggedUser);
    GetClosetDescription();
    GetClosetItems();
    GetItemPhotos();
    // getShopItems();
    getFavItems();
  }, []);

  // useEffect(() => {
  //       getFavItems();

  // }, [UsersShopList, UsersFavList]);

  function GetClosetDescription() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Closet/Get/" +
          loggedUser.closet_id
          
      ) //לשנות כשדנה עושה החזרת הדיסקריפשן לפי איידי
      .then((res) => {
        //console.log("description", res.status);
        setClosetName(res.data[0].user_name);
        setClosetDesc(res.data[0].description);
      })
      .catch((err) => {
        alert("cant take description");
        console.log(err);
      });
  }
  function GetClosetItems() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetItemByClosetId/ClosetId/" +
          loggedUser.closet_id
      )
      .then((res) => {
        setUsersItems(res.data);
      })
      .catch((err) => {
        alert("cant take items");
        console.log(err);
      });
  }
  function GetItemPhotos() {
    axios
      .get("https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/Item/GetItemImageVideo")
      .then((res) => {
        setUsersItemPhotos(res.data);
      })
      .catch((err) => {
        alert("cant take photos");
        console.log(err);
      });
  }
  function renderUserContent() {
    return (
      <View
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingTop: 25,
          paddingBottom: 40,
        }}
        showsHorizontalScrollIndicator={false}
      >
        <ContainerComponent containerStyle={{ marginBottom: 20 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditProfile", {
                ClosetDesc: ClosetDesc,
                ClosetName: ClosetName,
              });
              console.log("loggedUser", loggedUser);}}
          >
            <View
              style={{
                position: "absolute",
                right: 330,
                bottom: 140,
              }}
            >
              <Edit />
            </View>
            <ImageBackground
              source={{
                uri: loggedUser.user_image,
              }}
              style={{
                width: 80,
                height: 80,
                alignSelf: "center",
                marginBottom: 15,
              }}
              imageStyle={{ borderRadius: 40 }}
            ></ImageBackground>
            <Text
              style={{
                textAlign: "center",
                ...FONTS.Mulish_700Bold,
                fontSize: 16,
                textTransform: "capitalize",
                color: COLORS.black,
                marginBottom: 4,
                lineHeight: 16 * 1.2,
              }}
            >
              {loggedUser.full_name}
            </Text>
            <Text
              style={{
                textAlign: "center",
                ...FONTS.Mulish_400Regular,
                fontSize: 14,
                color: COLORS.gray,
                lineHeight: 14 * 1.7,
              }}
            >
              {ClosetDesc}
            </Text>
          </TouchableOpacity>
        </ContainerComponent>
      </View>
    );
  }
  ///handle fav list
  function getFavItems() {
    axios
      .get(
        "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/GetFavByUserID/" +
          loggedUser.id
      )
      .then((res) => {
        console.log(res.data);
        const tempUsersFavList = res.data.map(({ item_id }) => item_id);
        setUsersFavList(tempUsersFavList);
        console.log(tempUsersFavList);
      })
      .catch((err) => {
        alert("cant get fav");
        console.log(err);
      });
  }
  function AddtoFav(item_id) {
    axios
      .post(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/PostFavItem/Item_ID/${item_id}/User_ID/${loggedUser.id}`
      )
      .then((res) => {
        getFavItems();
        setUsersFavList((prevList) => [...prevList, { item_id }]);
      })
      .catch((err) => {
        alert("cant add to fav");
        console.log(err);
      });
  }
  function RemoveFromFav(itemId) {
    axios
      .delete(
        `https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/DeleteFavItem/Item_ID/${itemId}/User_ID/${loggedUser.id}`
      )
      .then((res) => {
        setUsersFavList((prevList) => prevList.filter((id) => id !== itemId));
      })
      .catch((err) => {
        alert("cant remove from fav");
        console.log(err);
        console.log(newFav);
      });
  }
  ///handle shop list
  // function getShopItems() {
  //   axios
  //     .get(
  //       "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/UserShopList/User_ID/" +
  //         loggedUser.id
  //     )
  //     .then((res) => {
  //       const tempUsersShopList = res.data.map(({ item_ID }) => item_ID);
  //       setUsersShopList(tempUsersShopList);
  //     })
  //     .catch((err) => {
  //       alert("cant get shop list");
  //       console.log(err);
  //     });
  // }
  // function AddToShopList(item_id) {
  //   var newitemInBag = {
  //     item_ID: item_id,
  //     user_ID: loggedUser.ID,
  //   };
  //   axios
  //     .post(
  //       "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/UserShopList",
  //       newitemInBag
  //     )
  //     .then((res) => {
  //       getShopItems();
  //       setUsersShopList((prevList) => [...prevList, { item_id }]);
  //     })
  //     .catch((err) => {
  //       alert("cant add to shop list");
  //       console.log(err);
  //     });
  // }
  // function RemoveFromShopList(itemId) {
  //   setUsersShopList((prevList) => prevList.filter((id) => id !== itemId));
  //   alert("removed from shop list " + itemId);

  //   axios
  //     .delete(
  //       "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/UserFavList",
  //       newFav
  //     )
  //     .then((res) => {
  //       setUsersShopList((prevList) => prevList.filter((id) => id !== itemId));
  //     })
  //     .catch((err) => {
  //       alert("cant add to fav");
  //       console.log(err);
  //       console.log(newFav);
  //     });
  // }
  ///render items
  function renderClothes() {
    return (
      <FlatList
        data={UsersItems}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 50,
        }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              width: "47.5%",
              marginBottom: 15,
              borderRadius: 10,
              backgroundColor: COLORS.white,
            }}
            //Osherrrrrrrrrrrr///////////////////////////////////////////////
            onPress={() => {
              console.log(item.id);
              navigation.navigate("ProductDetails", {
                item: item,
                // closet: ClosetData,
                // closet_id: loggedUser.closet_id,
              });
            }}
            //Osherrrrrrrrrrrr///////////////////////////////////////////////
          >
            {UsersItemPhotos.filter((photo) => photo.item_ID === item.id)
              .slice(0, 1)
              .map((photo) => {
                return (
                  <ImageBackground
                    source={{ uri: photo.item_Src }}
                    style={{
                      width: "100%",
                      height: 128,
                    }}
                    imageStyle={{ borderRadius: 10 }}
                    key={photo.ID}
                  >
                    {UsersFavList.includes(item.id) && (
                      // render the filled heart SVG if the item ID is in the UsersFavList
                      <TouchableOpacity
                        style={{ left: 12, top: 12 }}
                        onPress={() => RemoveFromFav(item.id)}
                      >
                        <HeartSvg filled={true} />
                      </TouchableOpacity>
                    )}
                    {!UsersFavList.includes(item.id) && (
                      // render the unfilled heart SVG if the item ID is not in the UsersFavList
                      <TouchableOpacity
                        style={{ left: 12, top: 12 }}
                        onPress={() => AddtoFav(item.id)}
                      >
                        <HeartSvg filled={false} />
                      </TouchableOpacity>
                    )}
                  </ImageBackground>
                );
              })}
            <View
              style={{
                paddingHorizontal: 12,
                paddingBottom: 15,
                paddingTop: 12,
              }}
            >
              <Text
                style={{
                  ...FONTS.Mulish_600SemiBold,
                  fontSize: 14,
                  textTransform: "capitalize",
                  lineHeight: 14 * 1.2,
                  color: COLORS.black,
                  marginBottom: 6,
                  textAlign: "right",
                }}
              >
                {item.name} {item.id}
              </Text>
              <Text
                style={{
                  color: COLORS.gray,
                  ...FONTS.Mulish_400Regular,
                  fontSize: 14,
                  textAlign: "right",
                }}
              >
                מידה: {item.size}
              </Text>
              <View
                style={{
                  height: 1,
                  backgroundColor: "#E9E9E9",
                  width: "75%",
                  marginVertical: 7,
                }}
              />
              <Text
                style={{
                  ...FONTS.Mulish_600SemiBold,
                  fontSize: 14,
                  color: COLORS.black,
                  //marginLeft: 70,
                  textAlign: "left",
                }}
              >
                ₪ {item.price}
              </Text>
            </View>
            {UsersShopList.includes(item.id) && (
              // render the filled heart SVG if the item ID is in the UsersFavList
              <TouchableOpacity
                style={{ left: 12, top: 12 }}
                onPress={() => RemoveFromFav(item.id)}
              >
                <BagSvg color="black" />
              </TouchableOpacity>
            )}
            {!UsersShopList.includes(item.id) && (
              // render the unfilled heart SVG if the item ID is not in the UsersFavList
              <TouchableOpacity
                style={{ left: 12, top: 12 }}
                onPress={() => AddToShopList(item.id)}
              >
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 12,
                bottom: 12,
              }}
            >
              <BagSvg />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      {/* <Header title="הארון של`{}`" goBack={false} /> */}
      {renderUserContent()}
      {renderClothes()}
      {/* <MainLayout /> */}
    </SafeAreaView>
  );
}
