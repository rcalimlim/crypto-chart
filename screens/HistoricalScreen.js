import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";
import axios from 'axios';

export default class HistoricalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { date: '2019-01-01', price: 0 },
        { date: '2019-01-02', price: 1 },
      ],
    }
  }

  componentDidMount() {
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json')
      .then(result => result.data.bpi)
      .then(dates => {
        const arr = [];
        for (let date in dates) {
          arr.push({ date: date, price: dates[date] });
        }
        return arr;
      })
      .then(data => this.setState({ data }))
      .catch(console.error);
  }

  render() {
    return (
      <View style={styles.container}>
        <VictoryChart
          padding={{ bottom: 50, left: 60, right: 20 }}
          theme={VictoryTheme.material}
        >
          <VictoryLine
            data={this.state.data}
            // domainPadding={{ x: 0, y: 200 }}
            x="date"
            y="price"
          />
        </VictoryChart>
      </View>
    );
  }
}

HistoricalScreen.navigationOptions = {
  title: 'Historical',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});
