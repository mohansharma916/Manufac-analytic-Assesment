import React, { useState } from "react";
import TableRowData from "../tableRowData";

// Function to calculate gamma for a given entry
const calculateGamma = (elements) => {
  const { Ash, Hue, Magnesium } = elements;
  return (parseFloat(Ash) * parseFloat(Hue)) / parseFloat(Magnesium);
};

const GammaStats = ({ data }) => {
  // State to store unique class names from the 'Alcohol' property in data

  const [classNames, setClassNames] = useState([
    ...new Set(data.map((entry) => entry.Alcohol)),
  ]);
  // Function to calculate mean of an array of values
  const calculateMean = (values) =>
    Number(values.reduce((acc, val) => acc + val, 0) / values.length).toFixed(
      3
    );
  // Function to calculate median of an array of values
  const calculateMedian = (values) => {
    const sortedValues = values.sort((a, b) => a - b);
    const mid = Math.floor(sortedValues.length / 2);
    return sortedValues.length % 2 === 0
      ? ((sortedValues[mid - 1] + sortedValues[mid]) / 2).toFixed(3)
      : sortedValues[mid].toFixed(3);
  };

  // Function to calculate mode of an array of values
  const calculateMode = (values) => {
    const frequencyMap = values.reduce((map, val) => {
      map[val] = (map[val] || 0) + 1;
      return map;
    }, {});

    let mode;
    let maxFrequency = 0;

    for (const key in frequencyMap) {
      if (frequencyMap[key] > maxFrequency) {
        mode = key;
        maxFrequency = frequencyMap[key];
      }
    }

    return Number(mode).toFixed(3);
  };
  // Function to calculate mean for a specific class
  const calculateClassStatsMean = (className) => {
    const gammaValues = data
      .filter((entry) => entry.Alcohol === className)
      .map((elements) => calculateGamma(elements));

    return calculateMean(gammaValues);
  };
  // Function to calculate Median for a specific class
  const calculateClassStatsMedian = (className) => {
    const gammaValues = data
      .filter((entry) => entry.Alcohol === className)
      .map((elements) => calculateGamma(elements));

    return calculateMedian(gammaValues);
  };

  // Function to calculate Mode for a specific class
  const calculateClassStatsMode = (className) => {
    const gammaValues = data
      .filter((entry) => entry.Alcohol === className)
      .map((elements) => calculateGamma(elements));

    return calculateMode(gammaValues);
  };
  return (
    <div>
      <h2>Gamma Statistics</h2>
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            {classNames.map((className) => (
              <th key={className}>Class {className}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <TableRowData
            statisticName=" Gamma Mean"
            calculateStatistic={calculateClassStatsMean}
            classNames={classNames}
          />
          <TableRowData
            statisticName="Gamma Median"
            calculateStatistic={calculateClassStatsMedian}
            classNames={classNames}
          />
          <TableRowData
            statisticName="Gamma Mode"
            calculateStatistic={calculateClassStatsMode}
            classNames={classNames}
          />
        </tbody>
      </table>
    </div>
  );
};

export default GammaStats;
