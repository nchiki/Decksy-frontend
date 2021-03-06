import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    top: 40,
    flex: 1,
  },
  sections: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  leftTop: {
    position: 'absolute',
    left: 20,
    top: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
    height: 400,
    width: 200
  },
  innerContainer: {
    position: 'absolute',
    left: 10,
    top: 30,
  },
  checkContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  modalAddContainer: {
    justifyContent: 'center',
    backgroundColor: 'powderblue',
    height: 400,
    width: 200,
    alignSelf:'flex-end'
  },
  bigTitle: {
    fontWeight: 'bold',
    fontSize: 45,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    textAlign: 'left',
  },
  loginInputs: {
    fontSize: 26,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    width: '65%',
    alignSelf: 'center',
    height: 45,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120
  }
})
export default styles;
