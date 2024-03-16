import React from "react";

const SimpleTable = ({ tableData }) => {
  const tableContent = tableData.map(([name, location], index) => (
    <tr key={`${name} ${location} ${index}`}>
      <td>{name}</td>
      <td>{location}</td>
    </tr>
  ));
  return (
    <table className="result-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>{tableContent}</tbody>
    </table>
  );
};

export default SimpleTable;
