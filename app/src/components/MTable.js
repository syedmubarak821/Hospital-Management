import React, {useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@material-ui/core/Button"

const MTable = ({column,rows}) => {
  const citems = column;
  let objKeys = []
  for (let r in rows[0]) {
    objKeys.push(r);
  }
  console.log(objKeys);
  let counter = 1;
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {citems.map((col) => {
                let { item } = col;
                return <TableCell>{item} </TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            
            {
            rows.map((row) => (
              <TableRow
                key={counter}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{counter++}</TableCell>
                {
                  objKeys.map((t)=>{
                    const v = row[t];
                    return (<TableCell>{v}</TableCell>)
                  })
                }
              </TableRow>

            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MTable;
