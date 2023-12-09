import React, { useState } from "react";
import TableRowData from "../tableRowData";

const FlavanoidsStats = ({ data }) => {
  // State to store unique class names from the 'Alcohol' property in data
  const [classNames, setClassNames] = useState([
    ...new Set(data.map((entry) => entry.Alcohol)),
  ]);
  // Function to calculate mean of an array of values
  const calculateMean = (values) =>
    Number(values.reduce((acc, val) => acc + val, 0) / values.length).toFixed(
      3
    );
  // Function to calculate Median of an array of values
  const calculateMedian = (values) => {
    const sortedValues = values.sort((a, b) => a - b);
    const mid = Math.floor(sortedValues.length / 2);
    return sortedValues.length % 2 === 0
      ? Number((sortedValues[mid - 1] + sortedValues[mid]) / 2).toFixed(3)
      : sortedValues[mid].toFixed(3);
  };
  // Function to calculate Mode of an array of values
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
    const flavanoidsValues = data
      .filter((entry) => entry.Alcohol === className)
      .map((entry) => parseFloat(entry.Flavanoids));

    return calculateMean(flavanoidsValues);
  };
  // Function to calculate median for a specific class
  const calculateClassStatsMedian = (className) => {
    const flavanoidsValues = data
      .filter((entry) => entry.Alcohol === className)
      .map((entry) => parseFloat(entry.Flavanoids));

    return calculateMedian(flavanoidsValues);
  };
  // Function to calculate mode for a specific class
  const calculateClassStatsMode = (className) => {
    const flavanoidsValues = data
      .filter((entry) => entry.Alcohol === className)
      .map((entry) => parseFloat(entry.Flavanoids));
    return calculateMode(flavanoidsValues);
  };
  return (
    <div>
      <h2>Flavanoids Statistics</h2>
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
            statisticName=" Flavanoids Mean "
            calculateStatistic={calculateClassStatsMean}
            classNames={classNames}
          />
          <TableRowData
            statisticName=" Flavanoids Median "
            calculateStatistic={calculateClassStatsMedian}
            classNames={classNames}
          />
          <TableRowData
            statisticName=" Flavanoids Mode "
            calculateStatistic={calculateClassStatsMode}
            classNames={classNames}
          />
        </tbody>
      </table>
    </div>
  );
};

export default FlavanoidsStats;
