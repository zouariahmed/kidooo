import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import {ReactComponent as SvgDotPatternIcon} from "../../images/dot-pattern.svg"
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import useAuth from "hooks/auth/useAuth";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const FormContainer = styled.div`
  ${tw`p-10 sm:p-12 md:p-16 bg-primary-500 text-gray-100 rounded-lg relative`}
  form {
    ${tw`mt-4`}
  }
  h2 {
    ${tw`text-3xl sm:text-4xl font-bold`}
  }
  input,textarea {
    ${tw`w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 text-gray-100 hocus:border-pink-400 focus:outline-none transition duration-200`};

    ::placeholder {
      ${tw`text-gray-500`}
    }
  }
`;

const TwoColumn = tw.div`flex flex-col sm:flex-row justify-between`;
const Column = tw.div`sm:w-5/12 flex flex-col`;
const InputContainer = tw.div`relative py-5 mt-6`;
const Label = tw.label`absolute top-0 left-0 tracking-wide font-semibold text-sm`;
const Input = tw.input``;
const TextArea = tw.textarea`h-24 sm:h-full resize-none`;
const SubmitButton = tw.button`w-full sm:w-32 mt-6 py-3 bg-gray-100 text-primary-500 rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl`;

const SvgDotPattern1 = tw(SvgDotPatternIcon)`absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 -z-10 opacity-50 text-primary-500 fill-current w-24`

const Profile = () => {
  const {profile,updateProfile} = useAuth()
  const [fullName,setFullName] = React.useState(profile?.fullName)
  const [country,setCountry] = React.useState(profile?.country)
  const [region,setRegion] = React.useState(profile?.region)
  const [city,setCity] = React.useState(profile?.city)
  const [address,setAddress] = React.useState(profile?.address)
  const [dateOfBirth,setDateOfBirth] = React.useState(profile?.dateOfBirth || "")
  const selectCountry = (val) => {
    setCountry(val);
  };

  const selectRegion = (val) => {
    setRegion(val);
  };

  const submitProfile = (e) =>{
    e.preventDefault()
    updateProfile({fullName,country,region,city,address,dateOfBirth}).then(()=>console.log("saved")).catch(()=>console.log("error while saving"))
  }
  return (
    <Container>
          <Header />
      <Content>
        <FormContainer>
          <div tw="mx-auto max-w-4xl">
            <h2>Profile Information</h2>
            <form onSubmit={submitProfile}>
              <TwoColumn>
                <Column>
                  <InputContainer>
                    <Label htmlFor="name-input">Your Name</Label>
                    <Input id="name-input" type="text" name="name" placeholder="E.g. John Doe" value={fullName} onChange={(e)=>setFullName(e.target.value)} />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="name-input">Date Of birth</Label>
                    <Input id="name-input" type="date" name="date" placeholder="E.g. John Doe" value={dateOfBirth} onChange={(e)=>setDateOfBirth(e.target.value)} />
                  </InputContainer>
     
                  <InputContainer>
                    <Label htmlFor="email-input">Your Email Address</Label>
                    <Input id="email-input" type="email" name="email" placeholder="E.g. john@mail.com" disabled value={profile.email} />
                  </InputContainer>
                </Column>
                <Column>
                <CountryDropdown
                                value={country || ""}
                                onChange={(val) => selectCountry(val)}
                                style={{ marginTop: "10px",background:"black" }}
                              />
   <RegionDropdown
                                country={country}
                                value={region || ""}
                                style={{ marginTop: "10px",background:"black" }}

                                onChange={(val) => selectRegion(val)}
                              />
                                          <InputContainer>
                    <Label htmlFor="name-input">Your City</Label>
                    <Input id="name-input" type="text" name="name" placeholder="Your City" value={city} onChange={(e)=>setCity(e.target.value)} />
                  </InputContainer>
                  <InputContainer>
                    <Label htmlFor="name-input">Your Address</Label>
                    <Input id="name-input" type="text" name="name" placeholder="Your address ..." value={address} onChange={(e)=>setAddress(e.target.value)} />
                  </InputContainer>
                </Column>
              </TwoColumn>

              <SubmitButton type="submit" value="Submit">Submit</SubmitButton>
            </form>
          </div>
          <SvgDotPattern1 />
        </FormContainer>
      </Content>
      <Footer />

    </Container>
  );
};
export default Profile