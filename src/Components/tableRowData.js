const TableRowData = ({ statisticName, calculateStatistic, classNames }) => {
  return (
    <>
      <tr>
        <td>{`${statisticName}`}</td>
        {classNames.map((className) => (
          <td key={className}>{calculateStatistic(className)}</td>
        ))}
      </tr>
    </>
  );
};

export default TableRowData;

<tr></tr>;
