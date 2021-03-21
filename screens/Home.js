import React from "react";
import { StyleSheet, Dimensions, ScrollView, TextInput } from "react-native";
import { Block, theme, Text, Input } from "galio-framework";

import { Card, Button } from "../components";
import articles from "../constants/articles";
const { width } = Dimensions.get("screen");

class Home extends React.Component {
  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex>
          <Input
            placeholder="No. KTP"
            color="black"
            type="numeric"
            label="NIK"
            placeholderTextColor="#D8D8D8"
            // value={nik}
            // onChangeText={(text) => this.onChange(text, "nik")}
            // style={{ borderColor: errors.nik ? "red" : "#9FA5AA" }}
          />
          <Input
            placeholder="Nama Lengkap"
            color="black"
            label="Nama Lengkap"
            placeholderTextColor="#D8D8D8"
            // value={nik}
            // onChangeText={(text) => this.onChange(text, "nik")}
            // style={{ borderColor: errors.nik ? "red" : "#9FA5AA" }}
          />
          <Input
            placeholder="ex. Makassar"
            color="black"
            label="Tempat Lahir"
            placeholderTextColor="#D8D8D8"
            // value={nik}
            // onChangeText={(text) => this.onChange(text, "nik")}
            // style={{ borderColor: errors.nik ? "red" : "#9FA5AA" }}
          />
          <Input
            placeholder="21-04-2000"
            color="black"
            label="Tanggal Lahir"
            placeholderTextColor="#D8D8D8"
            // value={nik}
            // onChangeText={(text) => this.onChange(text, "nik")}
            // style={{ borderColor: errors.nik ? "red" : "#9FA5AA" }}
          />
          <Input
            placeholder="08123456789"
            color="black"
            label="No. Handphone"
            placeholderTextColor="#D8D8D8"
            // value={nik}
            // onChangeText={(text) => this.onChange(text, "nik")}
            // style={{ borderColor: errors.nik ? "red" : "#9FA5AA" }}
          />
          <Text style={[styles.label, { marginTop: 5 }]}>Alamat lengkap</Text>
          <TextInput
            multiline
            numberOfLines={4}
            // onChangeText={(text) => this.onChange(text, "address")}
            // value={address}
            placeholder="Alamat lengkap"
            style={{
              // borderColor: errors.address ? "red" : "#9FA5AA",
              borderColor: "#9FA5AA",
              borderRadius: 9,
              borderWidth: 0.8,
              paddingHorizontal: 18,
              textAlignVertical: "top",
              lineHeight: 20,
              letterSpacing: 0,
              paddingVertical: 20,
            }}
          />
          <Block
            row
            style={{
              marginTop: 25,
            }}
          >
            <Button
              shadowless
              style={styles.button}
              // color={!isValid ? "#9FA5AA" : nowTheme.COLORS.PRIMARY}
              onPress={this.doNext}
              // loading={isLoading}
              // disabled={!isValid}
            >
              <Text
                style={{ fontFamily: "montserrat-bold", fontSize: 14 }}
                color={theme.COLORS.WHITE}
              >
                LANJUTKAN
              </Text>
            </Button>
          </Block>
        </Block>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 18,
    fontFamily: "montserrat-regular",
  },
  label: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  button: {
    flex: 1,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});

export default Home;
