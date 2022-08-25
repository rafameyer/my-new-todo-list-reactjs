import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IMyItem from "../interfaces/IMyItem";
const Home = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const getData = async () => {
    const URL =
      "https://0jj5dyvv79.execute-api.eu-west-1.amazonaws.com/dev/items/7471f91e-9d1f-42f3-bad0-0d145577f6e6";
    const { data } = await axios.get(URL);
    setData(data);
  };

  const handleRemoveRow = async (item: IMyItem) => {
    const URL = `https://0jj5dyvv79.execute-api.eu-west-1.amazonaws.com/dev/items/object/${item?.id}/${item?.name}`;
    const { status } = await axios.post(URL, item, {
      headers: { "Content-Type": "application/json" },
    });
  };

  useEffect(() => {
    console.log(process.env.GET_ALL);
    getData();
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">NAME</TableCell>
              <TableCell align="left">DESCRIPTION</TableCell>
              <TableCell align="left">CREATION DATE</TableCell>
              <TableCell align="left">EXPIRE DATE</TableCell>
              <TableCell align="left" />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: IMyItem, index: Number) => (
              <TableRow
                key={`${row.id}_${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link to={`/details/${row.id}/${row.name}`}>{row.id}</Link>
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="left">{row.creationDate}</TableCell>
                <TableCell align="left">{row.expireDate}</TableCell>
                <TableCell align="left">
                  <Button onClick={() => handleRemoveRow(row)}>REMOVE</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ float: "right", marginTop: "10px" }}>
        <Button variant="outlined" onClick={() => navigate("/details")}>
          ADD NEW ELEMENT
        </Button>
      </div>
    </div>
  );
};
export default Home;
