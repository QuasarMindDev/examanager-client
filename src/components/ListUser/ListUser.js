import React, { useState } from "react";
import { deleteUserAPI } from "../../Api/Usuarios";
import CreateUser from "../CreateUser/CreateUser";
import BasicModal from "../BasicModal/BasicModal";
import { toast } from "react-toastify";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function ListUser(props) {
  const [showModal, setShowModal] = useState(false);
  const { userList } = props;
  console.log(userList);
  var uinfo = {};
  userList ? (uinfo = userList[0]) : (uinfo = null);

  const deleteUser = (u) => {
    uinfo = u;
    deleteUserAPI(uinfo)
      .then((response) => {
        if (response.code) {
          toast.warning(response.message);
        } else {
          toast.success("El registro fue existoso");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error del servidor, intente más tarde");
      })
      .finally(() => {
        window.location.reload();
      });
  };

  const editUser = (u) => {
    uinfo = u;
    setShowModal(true);
  };

  if (userList == null || userList.message === "Fallo") {
    return (
      <div>
        <h4>La consulta no recuperó resultados</h4>
      </div>
    );
  }
  return (
    <div>
      <Container fluid>
        <ul className="list-group">
          {userList.map((x, i) => {
            return (
              <li class="list-group-item">
                <Row>
                  <Col>
                    <h2>{`${x.name}  ${x.lastName}`}</h2>
                  </Col>
                  <Col>
                    <Button variant="info" onClick={() => editUser(x)}>
                      Editar
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="danger" onClick={() => deleteUser(x)}>
                      Borrar
                    </Button>
                  </Col>
                </Row>
              </li>
            );
          })}
        </ul>
      </Container>
      <Container fluid>
        <BasicModal show={showModal} setShow={setShowModal}>
          <CreateUser
            userData={uinfo}
            mode="edit"
            setShowModal={setShowModal}
          />
        </BasicModal>
      </Container>
    </div>
  );
}
