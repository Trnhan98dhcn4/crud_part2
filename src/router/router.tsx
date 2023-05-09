import { Table, Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Dialog } from "../components";
import { useState } from "react";
import { IUserFake } from "../model";
import { deleteUser } from "../reducer/reducerUser";

function Routers() {
  const [showModal, setShowModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [itemId, setItem] = useState({} as IUserFake);

  const dispatch = useAppDispatch();

  const handleShowModal = (isUpdating: boolean, item: IUserFake) => {
    setItem(item);
    setIsUpdating(isUpdating);
    setShowModal(true);
  };

  const handleDelete = (userFake: IUserFake) => {
    dispatch(deleteUser(userFake));
  };

  const userFake = useAppSelector((state) => state.user);
  return (
    <div className="container mt-5">
      <h1>Crud layout redux bootstrap form-hook </h1>
      <Button
        type="button"
        variant="success"
        onClick={() => handleShowModal(false, itemId)}
      >
        Create +
      </Button>

      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userFake.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.user}</td>
              <td>{item.pwd}</td>
              <td>
                <Button
                  type="button"
                  variant="outline-info"
                  style={{ marginRight: "10px" }}
                  onClick={() => handleShowModal(true, item)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  type="button"
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Dialog
        item={itemId}
        showModal={showModal}
        setShowModal={setShowModal} // toggle
        isUpdating={isUpdating}
      />
    </div>
  );
}

export default Routers;
