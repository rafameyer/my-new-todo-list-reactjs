import { Button, Input } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import uuid from "react-uuid";

const Details = () => {
  const { id, name: nameFromParams } = useParams();
  const navigate = useNavigate();
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
    setName(data?.name || "");
    setDescription(data?.description || "");
    setCreationDate(data?.creationDate || "");
    setExpireDate(data?.expireDate || "");
  };

  const postTodoItem = async () => {
    const URL = `https://0jj5dyvv79.execute-api.eu-west-1.amazonaws.com/dev/items`;

    const payload: IMyItem = {
      id: id || uuid(),
      name: data?.name || "",
      description: data?.description || "",
      creationDate: data?.creationDate || "",
      expireDate: data?.expireDate || "",
    };
    const { data: respData } = await axios.post(URL, payload, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("resp: ", respData);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConfirm = () => {
    postTodoItem();
  };

  return (
    <>
      <div
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <div>
          <Input
            style={{ margin: "15px", minWidth: "250px" }}
            placeholder="Name:"
            value={name || ""}
            onChange={(event) => setName(event?.target?.value)}
          />
          <Input
            style={{ margin: "15px", minWidth: "250px" }}
            placeholder="Description:"
            value={description || ""}
            onChange={(event) => setDescription(event?.target?.value)}
          />
        </div>
        <div>
          <Input
            style={{ margin: "15px", minWidth: "250px" }}
            placeholder="Creation Date:"
            value={creationDate || ""}
            onChange={(event) => setCreationDate(event?.target?.value)}
          />
          <Input
            style={{ margin: "15px", minWidth: "250px" }}
            placeholder="Expire Date:"
            value={expireDate || ""}
            onChange={(event) => setExpireDate(event?.target?.value)}
          />
        </div>
      </div>
      <div>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Cancel
        </Button>
        <Button variant="outlined" onClick={() => handleConfirm()}>
          Confirm
        </Button>
      </div>
    </>
  );
};

export default Details;
