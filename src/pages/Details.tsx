import { Button, Input } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IMyItem from "../interfaces/IMyItem";

const Details = () => {
  const { id, name: nameFromParams } = useParams();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setData] = useState<IMyItem>();
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [creationDate, setCreationDate] = useState<string>();
  const [expireDate, setExpireDate] = useState<string>();

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
      id: id || "7471f91e-9d1f-42f3-bad0-0d145577f6e6",
      name: name || "",
      description: description || "",
      creationDate: creationDate || "",
      expireDate: expireDate || "",
    };
    const { status } = await axios.post(URL, payload, {
      headers: { "Content-Type": "application/json" },
    });
    if (status === 200) navigate("/");
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
