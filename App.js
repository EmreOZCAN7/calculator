import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Switch } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from './components/colors';


const WindowWidth = Dimensions.get("window").width
const App = () => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false)
  const toggleDarkMode = () => setIsDarkModeEnabled(previousState => !previousState);

  const [firstNumber, setFirstNumber] = useState("")
  const [secondNumber, setSecondNumber] = useState("")
  const [operation, setOperation] = useState("")
  const [result, setResult] = useState("")

  const handleNumberPress = (buttonValue) => {
    if (firstNumber.length < 12) {
      setFirstNumber(firstNumber + buttonValue)
    }
  }

  const firstNumberDisplay = () => {
    if (result !== "") {
      return <Text style={isDarkModeEnabled ? styles.resulttextdark : styles.resulttextlight}>{result}</Text>
    } if (firstNumber.length <= 6) {
      return <Text style={[isDarkModeEnabled ? styles.resulttextdark : styles.resulttextlight, {fontSize: 70}]}>{firstNumber}</Text>
    } if (firstNumber === "" && secondNumber === "") {
      return <Text style={isDarkModeEnabled ? styles.resulttextdark : styles.resulttextlight}>0</Text>
    } if (firstNumber.length > 6) {
      return (
        <Text style={[isDarkModeEnabled ? styles.resulttextdark : styles.resulttextlight, {fontSize: 50}]}>{firstNumber}</Text>
      )
    } if (firstNumber.length > 8) {
      return (
        <Text style={[isDarkModeEnabled ? styles.resulttextdark : styles.resulttextlight, {fontSize: 40}]}>{firstNumber}</Text>
      )
    }
  }

  const handleOperationPress = (buttonValue) => {
    setOperation(buttonValue);
    setSecondNumber(firstNumber);
    setFirstNumber("");
  }
  const clear = () => {
    setFirstNumber(""),
      setSecondNumber(""),
      setOperation("");
    setResult("");
  }

  const deleteLastNumber = () => {
    let negative = '';
    let tempNumber = firstNumber;
    if (firstNumber.includes('-')) {
      negative = '-';
      tempNumber = firstNumber.substr(1);
    }
    if (tempNumber.length > 1 && tempNumber > 0.1) {
      setFirstNumber(negative + tempNumber.slice(0, -1));
    } else {
      clear();
    }
  };


  const negativeNumber = () => {
    if (firstNumber.includes('-')) {
      setFirstNumber(firstNumber.replace('-', ''));
    } else {
      setFirstNumber('-' + firstNumber);
    }
  };

  const percentage = () => {
    if (secondNumber == 0) {
      setResult(firstNumber / 100)
    }
  }

  const getPercentageResult = () => {
    clear();
    setResult(firstNumber * (secondNumber / 100));
  }

  const getResult = () => {
    switch (operation) {
      case "+":
        clear();
        setResult(parseFloat((secondNumber)) + parseFloat((firstNumber)));
        break;
      case "-":
        clear();
        setResult("parseInt(secondNumber) - parseInt(firstNumber)");
        break;
      case "*":
        clear();
        if (secondNumber.includes("%")) {
          (firstNumber * (secondNumber / 100))
        } else {
        setResult(parseInt(secondNumber) * parseInt(firstNumber));
      }
        break;
      case "/":
        clear();
        setResult(parseInt(secondNumber) / parseInt(firstNumber));
        break;
      case "%":
        clear();
        let tempNumber = 0
        if (secondNumber > 0) {
          setResult(firstNumber / 100);
        } else if (secondNumber < 0) {
          setResult(firstNumber * (secondNumber / 100))
        }
        break;
      default:
        clear();
        setResult(0);
        break;
    }
  }
  return (
    <SafeAreaView style={isDarkModeEnabled ? styles.containerdark : styles.containerlight}>
      <View style={styles.switchcontainer}>
        <Switch style={styles.switch} value={isDarkModeEnabled} thumbColor={isDarkModeEnabled ? colors.switchdark : colors.switchlight} onValueChange={toggleDarkMode} trackColor={{ false: colors.switchdark, true: colors.switchlight }}></Switch>
      </View>


      <View style={[isDarkModeEnabled ? styles.displaydark : styles.displaylight]}>
        <Text style={isDarkModeEnabled ? styles.resulttextdark : styles.resulttextlight}>
          {secondNumber}<Text style={isDarkModeEnabled ? styles.resulttextdark : styles.resulttextlight}>{operation}</Text>
        </Text>
        {firstNumberDisplay()}
      </View>


      <View styles={styles.allbuttons}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => clear()} style={isDarkModeEnabled ? styles.cleardark : styles.clearlight}>
            <Text style={isDarkModeEnabled ? styles.buttontextdark : styles.buttontextlight}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => negativeNumber()} style={isDarkModeEnabled ? styles.signsdark : styles.signslight}>
            <Text style={isDarkModeEnabled ? styles.buttontextdark : styles.buttontextlight}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => [secondNumber == 0 ? percentage() : getPercentageResult()]} style={isDarkModeEnabled ? styles.signsdark : styles.signslight}>
            <Text style={isDarkModeEnabled ? styles.buttontextdark : styles.buttontextlight}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOperationPress("+")} style={isDarkModeEnabled ? styles.signsdark : styles.signslight}>
            <Text style={isDarkModeEnabled ? styles.buttontextdark : styles.buttontextlight}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={() => handleNumberPress("7")} style={isDarkModeEnabled ? styles.buttonsdark : styles.buttonslight}>
            <Text style={isDarkModeEnabled ? styles.buttontextdark : styles.buttontextlight}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNumberPress("8")} style={isDarkModeEnabled ? styles.buttonsdark : styles.buttonslight}>
            <Text style={isDarkModeEnabled ? styles.buttontextdark : styles.buttontextlight}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNumberPress("9")} style={isDarkModeEnabled ? styles.buttonsdark : styles.buttonslight}>
            <Text style={isDarkModeEnabled ? styles.buttontextdark : styles.buttontextlight}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOperationPress("*")} style={isDarkModeEnabled ? styles.signsdark : styles.signslight}>
            <Text style={isDarkModeEnabled ? styles.buttontextdark : styles.buttontextlight}>x</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={() => handleNumberPress("4")} style={isDarkModeEnabled ? styles.buttonsdark : styles.buttonslight}>
            <Text style={isDarkModeEnabled ? styles.buttontextdark : styles.buttontextlight}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNumberPress("5")} style={isDarkModeEnabled ? styles.buttonsdark : styles.buttonslight}>
            <Text style={isDarkModeEnabled ? styles.buttontextdark : styles.buttontextlight}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNumberPress("6")} style={isDarkModeEnabled ? styles.buttonsdark : styles.buttonslight}>
            <Text style={isDarkModeEnabled ? styles.buttontextdark : styles.buttontextlight}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOperationPress("-")} style={isDarkModeEnabled ? styles.signsdark : styles.signslight}>
            <Text style={isDarkModeEnabled ? styles.buttontextdark : styles.buttontextlight}>-</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={() => handleNumberPress("1")} style={isDarkModeEnabled ? styles.buttonsdark : styles.buttonslight}>
            <Text style={isDarkModeEnabled ? styles.buttontextdark : styles.buttontextlight}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNumberPress("2")} style={isDarkModeEnabled ? styles.buttonsdark : styles.buttonslight}>
            <Text style={isDarkModeEnabled ? styles.buttontextdark : styles.buttontextlight}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNumberPress("3")} style={isDarkModeEnabled ? styles.buttonsdark : styles.buttonslight}>
            <Text style={isDarkModeEnabled ? styles.buttontextdark : styles.buttontextlight}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOperationPress("+")} style={isDarkModeEnabled ? styles.signsdark : styles.signslight}>
            <Text style={isDarkModeEnabled ? styles.buttontextdark : styles.buttontextlight}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={() => handleNumberPress(".")} style={isDarkModeEnabled ? styles.buttonsdark : styles.buttonslight}>
            <Text style={isDarkModeEnabled ? styles.buttontextdark : styles.buttontextlight}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNumberPress("0")} style={isDarkModeEnabled ? styles.buttonsdark : styles.buttonslight}>
            <Text style={isDarkModeEnabled ? styles.buttontextdark : styles.buttontextlight}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteLastNumber()} style={isDarkModeEnabled ? styles.buttonsdark : styles.buttonslight}>
            <Text style={isDarkModeEnabled ? styles.buttontextdark : styles.buttontextlight}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => getResult()} style={[isDarkModeEnabled ? styles.equaldark : styles.equallight]}>
            <Text style={isDarkModeEnabled ? styles.buttontextdark : styles.buttontextlight}>=</Text>
          </TouchableOpacity>
        </View>

      </View>

      <StatusBar style="inverted" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerlight: {
    flex: 1,
    backgroundColor: colors.lightbg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerdark: {
    flex: 1,
    backgroundColor: colors.darkbg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchcontainer: {
    position: 'absolute',
    top: WindowWidth / 10,
    padding: 10,
  },
  displaylight: {
    width: WindowWidth / 1.1,
    height: WindowWidth / 2,
    marginTop: WindowWidth / 4,
    marginBottom: WindowWidth / 20,
    backgroundColor: colors.displaylight,
    borderRadius: 12,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  displaydark: {
    width: WindowWidth / 1.1,
    height: WindowWidth / 2,
    marginTop: WindowWidth / 4,
    marginBottom: WindowWidth / 20,
    backgroundColor: colors.displaydark,
    borderRadius: 12,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  resulttextdark: {
    marginRight: 12,
    color: colors.textdark,
    fontSize: 48,
  },
  resulttextlight: {
    marginRight: 12,
    color: colors.textlight,
    fontSize: 48,
  },
  allbuttons: {
  },
  row: {
    flexDirection: "row",
  },
  buttonslight: {
    backgroundColor: colors.buttonlight,
    justifyContent: "center",
    alignItems: "center",
    width: WindowWidth / 5.4,
    height: WindowWidth / 5.4,
    borderRadius: 14,
    marginHorizontal: 8,
    marginTop: 14,
  },
  buttonsdark: {
    backgroundColor: colors.buttondark,
    justifyContent: "center",
    alignItems: "center",
    width: WindowWidth / 5.4,
    height: WindowWidth / 5.4,
    borderRadius: 14,
    marginHorizontal: 8,
    marginTop: 14,
  },
  signsdark: {
    backgroundColor: colors.signsdark,
    justifyContent: "center",
    alignItems: "center",
    width: WindowWidth / 5.4,
    height: WindowWidth / 5.4,
    borderRadius: 14,
    marginHorizontal: 8,
    marginTop: 14,
  },
  signslight: {
    backgroundColor: colors.signslight,
    justifyContent: "center",
    alignItems: "center",
    width: WindowWidth / 5.4,
    height: WindowWidth / 5.4,
    borderRadius: 14,
    marginHorizontal: 8,
    marginTop: 14,
  },
  cleardark: {
    backgroundColor: colors.cleardark,
    justifyContent: "center",
    alignItems: "center",
    width: WindowWidth / 5.4,
    height: WindowWidth / 5.4,
    borderRadius: 14,
    marginHorizontal: 8,
    marginTop: 14,
  },
  clearlight: {
    backgroundColor: colors.clearlight,
    justifyContent: "center",
    alignItems: "center",
    width: WindowWidth / 5.4,
    height: WindowWidth / 5.4,
    borderRadius: 14,
    marginHorizontal: 8,
    marginTop: 14,
  },
  buttontextlight: {
    fontSize: 30,
  },
  buttontextdark: {
    fontSize: 30,
    color: colors.textdark,
  },
  equaldark: {
    backgroundColor: colors.equaldark,
    justifyContent: "center",
    alignItems: "center",
    width: WindowWidth / 5.4,
    height: WindowWidth / 5.4,
    borderRadius: 14,
    marginHorizontal: 8,
    marginTop: 14,
  },
  equallight: {
    backgroundColor: colors.equallight,
    justifyContent: "center",
    alignItems: "center",
    width: WindowWidth / 5.4,
    height: WindowWidth / 5.4,
    borderRadius: 14,
    marginHorizontal: 8,
    marginTop: 14,
  },
});

export default App