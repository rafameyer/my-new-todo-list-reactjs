import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id, name: nameFromParams } = useParams();
  const [data, setData] = useState<IMyItem>();
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [creationDate, setCreationDate] = useState<string>();
  const [expireDate, setExpireDate] = useState<string>();

  interface IMyItem {
    creationDate: string;
    description: string;
    expireDate: string;
    id: string;
    name: string;
  }

  const getData = async () => {
    const URL = `https://0jj5dyvv79.execute-api.eu-west-1.amazonaws.com/dev/items/object/${id}/${nameFromParams}`;
    const { data } = await axios.get(URL);
    setData(data);
    setName(data.name);
    setDescription(data.description);
    setDescription(data.creationDate);
    setDescription(data.expireDate);
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <p>Detais Page!</p>

      {!!data && (
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={(event) => setName(event?.target?.value)}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={data.description}
              onChange={(event) => setDescription(event?.target?.value)}
            />
          </label>
          <label>
            Expire Date:
            <input
              type="text"
              name="Expire Date"
              value={data.expireDate}
              onChange={(event) => setExpireDate(event?.target?.value)}
            />
          </label>
        </form>
      )}
    </>
  );
};

export default Details;
