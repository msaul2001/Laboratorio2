import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Picker, StyleSheet, Text, View, Button, SectionList, Alert } from 'react-native';

export default function App() {
  const [monedas, setMonedas] = useState('');
  const [cripto, setCripto] = useState([]);
  const [criptoActual, setCriptoActual] = useState([]);
  const [ncripto, setNcripto] = useState([]);
  const [visibilidad, setVisibilidad] = useState(false)
  const [Total, setTotal] = useState([])

  const key = '2df13a7effeb155e6f90295eaae498ed13b4408d123e18cb477e4e5bec2b0982'
  

  let costoCriptoArray = [];
  let nombresCripto = [];

  useEffect(() => {
    fetch('https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD')
      .then(response => response.json())
      .then (data => {
        let coinInfo = data.Data
        console.log("JSON: " + coinInfo.length)
        coinInfo.forEach(element => {
          CriptoMonedaArray.push(element.CoinInfo.Name)
          nombresCripto.push(element.CoinInfo.FullName)
        });
        setCripto(CriptoMonedaArray)
        setNcripto(nombresCripto)
        console.log(CriptoMonedaArray)
      })
  }, []);
  let CriptoMonedaArray = [];
  let arrPickerItems = [];


    ncripto.map((is, index) => {
      nombresCripto.push(is)
    })

    cripto.map((item, index) => {
      arrPickerItems.push(<Picker.Item label={nombresCripto[index]} value={item} key={index}/>)
    })

  
  return (
    <View style={styles.container}>
      {/* Monedas */}
      <Picker 
        style={styles.monedas}
        selectedValue={monedas}
        onValueChange={(itemValue, itemIndex) => setMonedas(itemValue)}
      >
        <Picker.Item label="Elije Tu moneda" value="Elije"/> 
        <Picker.Item label="Dolar Estadounidense" value="USD"/> 
        <Picker.Item label="Libras Esterlinas" value="GBP"/> 
        <Picker.Item label="Yen Japones" value="JPY"/> 
        <Picker.Item label="Euro" value="EUR"/> 
      </Picker>

      {/* Criptomonedas */}
      <Picker
        style={styles.criptoM}
        selectedValue={criptoActual}
        onValueChange={(itemValue, itemIndex) => setCriptoActual(itemValue)}
      > 
        {arrPickerItems}
      </Picker>

      <Button
        title="Consultar Valor en Criptomoneda"
        color='#2A71E9'
        onPress = {() => {
          fetch(`https://min-api.cryptocompare.com/data/price?fsym=${criptoActual}&tsyms=${monedas}`)
          .then(response => response.json())
          .then(data => {
            let attrName;
            let atrrValue;

              for (let monedas in data) {
                attrName = monedas;
                atrrValue = data[monedas]
              }
              costoCriptoArray.push(atrrValue)

            //setCostoCripto(costoCriptoArray)
            console.log(data)
            setVisibilidad(true)
            setTotal(atrrValue)

        })}} 
      />
      {visibilidad ? <Text style={styles.Txt}>El Valor de {criptoActual} en {monedas} es de {Total}</Text>: null}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1EDCAA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monedas: {
    marginTop:-100,
    marginBottom: 50,
    height: '10%',
    width: '85%',
    backgroundColor: '#B02AE9',
    borderBottomColor: '#B02AE9',
    borderBottomWidth: 2,
    paddingBottom: 15,
    color:'white',
    fontFamily:''
  },
  criptoM: {
    height: '10%',
    width: '85%',
    marginBottom: 50,
    backgroundColor: '#E98A2A',
    borderBottomColor: '#bbb',
    borderBottomWidth: 2,
    paddingBottom: 15,
    color:'white'
  },
  Txt:{
    marginTop: 20,
    color:'white',
    fontSize:18,
    fontWeight: '500'
  },
 
});