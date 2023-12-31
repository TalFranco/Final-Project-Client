import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StatusBar,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Header, ContainerComponent, ProfileCategory } from "../components";
import { COLORS, FONTS } from "../constants";
import { BagSvg, Edit, SearchSvg, SignOutCategory } from "../svg";
import { userContext } from "../navigation/userContext";
import { FlatList } from "react-native";
import { Image } from "react-native";
import WarningModal from "../components/WarningModal";
import AlertModal from "../components/AlertModal";
import DeleteSvg from "../svg/DeleteSvg";
import HengerSvg from "../svg/HengerSvg";

export default function Profile() {
  const navigation = useNavigation();
  const { loggedUser, setSelectedTab, setClosetId_, setOwner_ } =
    useContext(userContext);
  const isFocused = useIsFocused();

  //user
  const [usersFollow, setUsersFollow] = useState([]);

  //modal
  const [showModal, setShowModal] = useState(false);
  const [massage, setMassage] = useState("");
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmAlertModal, setConfirmAlertModal] = useState(false);

  // //flag
  // const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isFocused) {
      GetUsersFollow();
    }
  }, [isFocused]);

  const GetUsersFollow = () => {
    fetch(
      "https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/GetUserFollowingByUser/LoggedUser/" +
        loggedUser.id,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then(
        (data) => {
          setUsersFollow(data);
        },
        (error) => {
          console.log("GetUsersFollow error", error);
        }
      );
  };

  function renderContent() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingTop: 25,
          paddingBottom: 40,
        }}
        showsHorizontalScrollIndicator={false}>
        <ContainerComponent containerStyle={{ marginBottom: 20 }}>
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
            imageStyle={{ borderRadius: 40 }}></ImageBackground>

          <Text
            style={{
              textAlign: "center",
              ...FONTS.Mulish_700Bold,
              fontSize: 16,
              textTransform: "capitalize",
              color: COLORS.black,
              marginBottom: 4,
              lineHeight: 16 * 1.2,
            }}>
            {loggedUser.full_name}
          </Text>
          <Text
            style={{
              textAlign: "center",
              ...FONTS.Mulish_400Regular,
              fontSize: 14,
              color: COLORS.gray,
              lineHeight: 14 * 1.7,
            }}>
            {loggedUser.email}
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditProfile");
            }}>
            <View
              style={{
                position: "absolute",
                right: 0,
                bottom: -20,
                // bottom: 120,
              }}>
              <Edit />
            </View>
          </TouchableOpacity>
        </ContainerComponent>

        {renderUsersFollow()}

        <ContainerComponent>
          <ProfileCategory
            icon={<HengerSvg />}
            title="לארון שלי"
            arrow={false}
            onPress={() => {
              setSelectedTab("Closet");
              setClosetId_(loggedUser.closet_id);
              setOwner_(loggedUser);
            }}
          />

          <ProfileCategory
            icon={<SignOutCategory />}
            title="התנתקי"
            arrow={false}
            onPress={() => {
              setDeleteFlag(false);
              setShowModal(true);
              setMassage(" האם את בטוחה שאת רוצה \n להתנתק ?");
            }}
          />

          <ProfileCategory
            icon={<DeleteSvg />}
            title="מחקי חשבון"
            arrow={false}
            onPress={() => {
              setShowModal(true);
              setMassage(
                " פעולה זו הינה לצמיתות !\n\n האם את בטוחה שברצונך למחוק את הפרופיל ?"
              );
              setDeleteFlag(true);
            }}
          />
        </ContainerComponent>
      </ScrollView>
    );
  }

  function renderUsersFollow() {
    return (
      <View style={{ marginBottom: 40 }}>
        <View
          style={{
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab("SearchUsersFollow");
            }}>
            <Text
              style={{
                ...FONTS.Mulish_700Bold,
                fontSize: 20,
                color: COLORS.black,
                lineHeight: 20 * 1.2,
              }}>
              ארונות במעקב... <SearchSvg />
            </Text>
          </TouchableOpacity>
        </View>

        {usersFollow.length > 0 ? (
          <FlatList
            data={usersFollow}
            horizontal={true}
            keyExtractor={(user) => user.id}
            renderItem={({ item: user, index }) => {
              return (
                <TouchableOpacity
                  style={{
                    height: "100%",
                    width: 170,
                    backgroundColor: COLORS.white,
                    marginRight: 15,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    setSelectedTab("Closet");
                    setClosetId_(user.closet_id);
                    setOwner_(user);
                  }}>
                  <Image
                    source={{ uri: user.user_image }}
                    style={{
                      width: "100%",
                      height: 180,
                      borderRadius: 10,
                    }}
                  />
                  <View
                    style={{
                      paddingHorizontal: 15,
                      paddingVertical: 12,
                    }}>
                    <Text
                      style={{
                        ...FONTS.Mulish_600SemiBold,
                        fontSize: 15,
                        textTransform: "capitalize",
                        color: COLORS.black,
                        marginBottom: 5,
                        textAlign: "center",
                      }}>
                      {user.full_name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            contentContainerStyle={{ paddingLeft: 20 }}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <Text
            style={{
              ...FONTS.Mulish_700Bold,
              fontSize: 14,
              color: COLORS.black,
              lineHeight: 20 * 1.2,
              textAlign: "center",
            }}>
            אין ארונות במעקב עדיין
          </Text>
        )}
      </View>
    );
  }

  //handel users choice of the modal
  function handleUserChoice() {
    if (deleteFlag) {
      updateUser_Delete();
    } else {
      setSelectedTab("Home");
      navigation.navigate("LogIn");
    }
    setDeleteFlag(false);
  }

  const updateUser_Delete = () => {
    const user = {
      email: loggedUser.email,
      id: loggedUser.id,
      closet_id: loggedUser.closet_id,
      phone_number: loggedUser.phone_number,
      full_name: loggedUser.full_name,
      password: loggedUser.password,
      address: loggedUser.address,
      isAdmin: false,
      user_image: loggedUser.user_image,
      age: loggedUser.age,
      token: loggedUser.token,
      user_Status: "non active",
    };

    fetch(`https://proj.ruppin.ac.il/cgroup31/test2/tar2/api/User/PutUser`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: new Headers({
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setMessage(" החשבון נמחק לצמיתות !");
          setShowAlertModal(true);
          setConfirmAlertModal(true);

          setTimeout(() => {
            setShowAlertModal(false);
            navigation.navigate("LogIn");
            setSelectedTab("Home");
          }, 2000);
        },
        (error) => {
          console.log("ERR in update user", error);
        }
      );
    setDeleteFlag(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Add this line for Android compatibility
      }}>
      <Header title="עמוד אישי" />
      {renderContent()}
      {showModal && (
        <WarningModal
          showModal={showModal}
          setShowModal={setShowModal}
          massage={massage}
          handleSure={handleUserChoice}
        />
      )}
      {showAlertModal && (
        <AlertModal
          message={message}
          showModal={showAlertModal}
          setShowModal={setShowAlertModal}
          confirm={confirmAlertModal}
        />
      )}
    </SafeAreaView>
  );
}
