import {Platform, StyleSheet} from 'react-native';

const DEFAULT_STYLES = StyleSheet.create({
  baseContainer: {flex: 1, backgroundColor: 'white'},
  card: {backgroundColor: 'white'},
  text: {
    fontFamily: 'Montserrat-Medium',
    color: 'black', // Customize the fontFamily
  },
  heading: {
    fontFamily: 'Montserrat-Bold',
    color: 'black', // Customize the fontFamily
  },
  heading1: {
    fontSize: 36, // Customize the fontSize
  },
  heading2: {
    fontSize: 28, // Customize the fontSize
  },
  heading3: {
    fontSize: 24, // Customize the fontSize
  },
  heading4: {
    fontSize: 20, // Customize the fontSize
  },
  heading5: {
    fontSize: 18, // Customize the fontSize
  },
  heading6: {
    fontSize: 16, // Customize the fontSize
  },
  heading8: {
    fontSize: 14, // Customize the fontSize
  },
  heading7: {
    fontSize: 12, // Customize the fontSize
  },
  underlinedHeading: {
    fontSize: 24, // Customize the fontSize
    fontWeight: 'bold',
  },
  underline: {
    borderBottomColor: 'black', // Customize the underline color
    borderBottomWidth: 1,
    marginTop: 5, // Customize the margin
  },
  labellarge: {
    fontFamily: 'Montserrat-Bold',
    marginBottom: 7.5,
    marginHorizontal: 5,
    fontSize: 14,
    color: 'black',
  },
  labelsmall: {
    fontFamily: 'Montserrat-Bold',
    marginBottom: 7.5,
    marginHorizontal: 5,
    fontSize: 12,
    color: 'black',
  },
  link: {
    color: 'blue', // Customize the link color
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat-Regular',
  },
  buttonText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: 'white',
    textTransform: 'uppercase',
  },
  shadow: {
    shadowRadius: 25,
    shadowOpacity: 1,
    shadowColor: '#696969',
  },
  textInputContainer: {
    borderRadius: 100,
    backgroundColor: 'white',
    shadowRadius: 420,
    shadowOpacity: 1,
    shadowColor: '#696969',
    width: '100%',
  },
  textInput: {
    fontFamily: 'Montserrat-Regular',
    borderRadius: 100,
    height: 45,
    marginHorizontal: 20,
    backgroundColor: 'white',
  },
  textInputIconContainer: {
    position: 'absolute',
    right: 0,
    top: '20%',
  },
  textInputIcon: {width: 27.5, height: 27.5},
  outlineButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    paddingVertical: 12.5,
    borderRadius: 30,
  },
  center: {justifyContent: 'center', alignItems: 'center'},
  error: {color: 'red', fontFamily: 'Montserrat-Regular'},
  bold:
    Platform.OS === 'ios'
      ? {fontWeight: 'bold'}
      : {fontFamily: 'Montserrat-Bold'},
});

export default DEFAULT_STYLES;
