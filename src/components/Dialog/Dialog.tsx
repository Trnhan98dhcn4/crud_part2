import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createUser, updateUser } from "../../reducer/reducerUser";
import { IUserFake } from "../../model";
import { useEffect } from "react";

import "./styles.css";

function Dialog(props: {
  item: IUserFake;
  showModal: boolean;
  setShowModal: any;
  isUpdating: boolean;
}) {
  const { item, showModal, setShowModal, isUpdating } = props;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IUserFake>({
    defaultValues: {
      user: "",
      pwd: "",
    },
  });
  // check data if has data props
  useEffect(() => {
    setValue("user", item.user);
    setValue("pwd", item.pwd);
  }, [item]);

  const userFake = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const onSubmit = (userFaker: IUserFake) => {
    if (isUpdating === false) {
      userFaker.id =
        userFake.length === 0 ? 1 : userFake[userFake.length - 1].id + 1;
      dispatch(createUser(userFaker));
      reset();
    } else {
      userFaker.id = item.id;
      dispatch(updateUser(userFaker));
      reset();
    }
    setShowModal();
  };
  return (
    <Modal show={showModal} onHide={() => setShowModal(false, reset())}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isUpdating ? "Modal Update Crud" : "Modal Create Crud"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>User:</Form.Label>
            <Form.Control
              className={`${errors.user ? "is-invalid" : "is-valid"}`}
              type="text"
              {...register("user", {
                required: {
                  value: true,
                  message: "Register Enter in User",
                },
                maxLength: {
                  value: 20,
                  message: "Register Max Length is 20",
                },
              })}
              placeholder="Enter user..."
            />
            <Form.Text className=" error">{errors.user?.message}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              className={`${errors.pwd ? "is-invalid" : "is-valid"}`}
              type="password"
              {...register("pwd", {
                required: {
                  value: true,
                  message: "Register Enter in Password",
                },
                maxLength: {
                  value: 12,
                  message: "Register max Password 12",
                },
                minLength: {
                  value: 6,
                  message: "Register min Password 6",
                },
              })}
              placeholder="Password"
            />
            <Form.Text className=" error">{errors.pwd?.message}</Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false, reset())}
          >
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default Dialog;
