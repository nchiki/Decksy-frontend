import { StyleSheet} from 'react-native';
    
const templateStyles =  {
    getStyle2 : function() {
    
    return (
    StyleSheet.create({
      titleText: {
        top: 20,
        left:-70
      },
      userText: {
        color:'white', 
        fontSize: 20, 
        fontWeight:'bold'
      },
      user: {
        alignItems:'center',
        justifyContent: 'center'
      },
      company: {
        right: -60,
        bottom: -110,
        fontSize: 20, 
        color: 'white',
        justifyContent: 'center',
      },
      details: {
        right: -85,
        bottom: -115,
        fontSize: 10,
        color: 'white'
      }
    })
    );
  }, 
  getStyle3 : function() {
    
    return (
    StyleSheet.create({
      titleText: {
        bottom: -160,
        right: -80
      },
      userText: {
        color:'white', 
        fontSize: 20, 
        fontWeight:'bold'
      },
      user: {
        alignItems:'center',
        justifyContent: 'center'
      },
      company: {
        fontWeight:'bold',
        right: -120,
        bottom: -115,
        fontSize: 15, 
        color: 'white',
        justifyContent: 'center',
      },
      details: {
        left: -90,
        top:-20,
        fontSize: 10,
        color: 'white'
      }
    })
    );
  }, 

  getStyle4 : function() {
    
    return (
    StyleSheet.create({
      titleText: {
        top:65
      },
      userText: {
        color:'white', 
        fontSize: 20, 
        fontWeight:'bold'
      },
      user: {
        alignItems:'center',
        justifyContent: 'center'
      },
      company: {
        fontWeight:'bold',
        
        top:75,
        fontSize: 15, 
        color: 'white',
        justifyContent: 'center',
      },
      details: {
        right: -90,
        top:-24,
        fontSize: 10,
        color: 'white', 
        textAlign: 'right'
      }
    })
    );
  }, 
  getStyle5 : function() {
    // add borders
    return (
    StyleSheet.create({
      titleText: {
        top:65,
        left:-35
      },
      userText: {
        color:'white', 
        fontSize: 20, 
        fontWeight:'bold'
      },
      user: {
        alignItems:'center',
        justifyContent: 'center'
      },
      company: {
        fontWeight:'bold',
        left:-80,
        top:70,
        fontSize: 15, 
        color: 'white',
        
      },
      details: {
        right: -50,
        bottom:-80,
        fontSize: 10,
        color: 'white', 
        textAlign: 'right'
      }
    })
    );
  }, 
  getStyle6 : function() {
    // add borders
    return (
    StyleSheet.create({
      titleText: {
        top:55,
      },
      userText: {
        color:'white', 
        fontSize: 20, 
        fontWeight:'bold'
      },
      user: {
        alignItems:'center',
        justifyContent: 'center'
      },
      company: {
        fontWeight:'bold',
        top:60,
        fontSize: 15, 
        color: 'white',
        
      },
      details: {
        
        bottom:-100,
        fontSize: 10,
        color: 'white', 
        textAlign: 'center'
      }
    })
    );
  }, 
  getStyle7 : function() {
    // add borders
    return (
    StyleSheet.create({
      titleText: {
        top:45,
        left:-50
      },
      userText: {
        
        fontSize: 20, 
        fontWeight:'bold'
      },
      user: {
        alignItems:'center',
        justifyContent: 'center'
      },
      company: {
        fontWeight:'bold',
        left:-95,
        top:50,
        fontSize: 15, 
        
        
      },
      details: {
        right: -60,
        bottom:-85,
        fontSize: 10,
        textAlign: 'right'
      }
    })
    );
  }, 

  getStyle8 : function() {
    return (
      StyleSheet.create({
      titleText: {
      top: 20
    },
    userText: {
      color:'maroon', 
      fontSize: 25, 
      fontWeight:'bold'
    },
    user: {
      alignItems:'center',
      justifyContent: 'center'
    },
    company: {
      left: -90,
      bottom: -119,
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      justifyContent: 'center',
      
    },
    details: {
      right: -85,
      bottom: -95,
      fontSize: 10,
      color: 'white'
    }
  }));
  },
  getStyle9 : function() {
    // add borders
    return (
    StyleSheet.create({
      titleText: {
        top:55,
        left: -45
      },
      userText: {
        color:'white', 
        fontSize: 20, 
        fontWeight:'bold'
      },
      user: {
        alignItems:'center',
        justifyContent: 'center'
      },
      company: {
        fontWeight:'bold',
        top:60,
        left: -55,
        fontSize: 15, 
        color: 'white',
        
      },
      details: {
        left:-55,
        bottom:-100,
        fontSize: 10,
        color: 'white', 
        textAlign: 'center'
      }
    })
    );
  }, 
  getStyle10 : function() {
    // add borders
    return (
    StyleSheet.create({
      titleText: {
        top:55,
        left: -15
      },
      userText: {
        color:'lightskyblue', 
        fontSize: 20, 
        fontWeight:'bold'
      },
      user: {
        alignItems:'center',
        justifyContent: 'center'
      },
      company: {
        fontWeight:'bold',
        top:60,
        left: -15,
        fontSize: 15, 
        color: 'lightskyblue',
        
      },
      details: {
        left:-80,
        bottom:-120,
        fontSize: 10,
        color: 'lightskyblue', 
        
      }
    })
    );
  }, 
}

export default templateStyles;