import { Dimensions } from "react-native";

//Guideline sizes are based on standard ~5" screen mobile device

const { width, height } = Dimensions.get('window')
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scaleX = (size) => {
    return (width / guidelineBaseWidth) * size
}

export const scaleY = (size) => {
    return (height / guidelineBaseHeight) * size
}