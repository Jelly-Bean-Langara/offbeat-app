import React from 'react';
import { Text, View, Image, ScrollView, ImageBackground, Pressable } from 'react-native';
import { CallToCardBg, TestPicture, TextureBackground } from '../../assets/static';
import { profileStyle, buttons } from '../../layout';

// import { Container } from './styles';

const Profile = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageBackground source={ TestPicture } style={profileStyle.image} >
        <View style={{alignSelf: 'center'}}>
          <View style={profileStyle.profileImage}>
            <Image source={ CallToCardBg } style={profileStyle.image} resizeMode="cover"></Image>
          </View>
        </View>
      </ImageBackground>

      <View style={profileStyle.containerUserSum}>
        <Text style={profileStyle.userName}>User Name</Text>
        <Text style={profileStyle.userDescription}>Write a bit about yourself</Text>

        <Pressable style={[profileStyle.profileBtn]}
          onPress={() => goToCategoryPage(category.category_id)}>
            <Text style={profileStyle.journalsBtn}>Journals</Text>
        </Pressable>

        <Text style={profileStyle.summaryProfile}>Your OffBeat Summary</Text>

        <View style={profileStyle.bkgSummary}>
          <View style={profileStyle.containerContries}>
            <Image source={ CallToCardBg } style={profileStyle.countriesImage}></Image>
            <Text style={profileStyle.titleCountries}>Countries visited</Text>
            <Text style={profileStyle.numberCountries}>4</Text>
          </View>

          <View style={profileStyle.containerMoments}>
            <Image source={ TestPicture } style={profileStyle.momentsImage}></Image>
            <Text style={profileStyle.titleMoments}>Moments Added</Text>
            <Text style={profileStyle.numberMoments}>33</Text>
          </View>

          <View style={profileStyle.containerTrips}>
            <Image source={ CallToCardBg } style={profileStyle.tripsImage}></Image>
            <Text style={profileStyle.titleTrips}>Typical kind of trips</Text>
            <Text style={profileStyle.numberTrips}>2</Text>
          </View>

        </View>
      </View>

    </ScrollView>
  )
}

export default Profile;
