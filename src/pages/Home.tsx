import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const URL =
      "https://0jj5dyvv79.execute-api.eu-west-1.amazonaws.com/dev/items/7471f91e-9d1f-42f3-bad0-0d145577f6e6";
    const { data } = await axios.get(URL);
    console.log(typeof data);
    console.log("data: ", data);
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);

  interface IMyItem {
    creationDate: string;
    description: string;
    expireDate: string;
    id: string;
    name: string;
  }

  const Row = (item: IMyItem) =>
    useMemo(() => {
      return (
        <tr>
          <td>
            <Link to={`/details/${item.id}/${item.name}`}>{item.id}</Link>
          </td>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{item.creationDate}</td>
          <td>{item.expireDate}</td>
        </tr>
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <>
      <h1>Home Page!</h1>
      <>
        <table>
          <tbody>
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Description</td>
              <td>Creation Date</td>
              <td>Expire Date</td>
            </tr>
          </tbody>
          <tbody>
            {data.map((item: IMyItem, index) => (
              <Row key={index} {...item} />
            ))}
          </tbody>
        </table>
      </>
    </>
  );
};
export default Home;
