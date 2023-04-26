import React from "react";
import { Container, Row, Col, Table, Image } from "react-bootstrap";
import { FiPhoneCall } from "react-icons/fi";
import { ImMobile } from "react-icons/im";
import { AiOutlineMail } from "react-icons/ai";
const Contact = () => {
  return (
    <>
      <Container style={{ marginTop: "50px" }}>
        <Row>
          <Col md={6}>
            <h1>PETPUJAA </h1>
            <p>
              Welcome to our pizza shop, where we serve some of the most
              delicious and mouth-watering pizzas in town. Our pizzas are made
              using only the freshest ingredients, from the toppings to the
              crust. We offer a variety of classic and gourmet pizzas to satisfy
              everyone's taste buds, including vegetarian and gluten-free
              options. In addition to our pizzas, we also serve salads, sides,
              and desserts to complement your meal. We take pride in our
              exceptional customer service, and our friendly staff is always
              ready to assist you in creating the perfect pizza for your
              cravings. Whether you dine-in, take-out, or opt for delivery, we
              guarantee you'll enjoy every bite of our pizza. Come and visit us
              today and indulge in the ultimate pizza experience!
            </p>

            <Table striped bordered hover className="text-center">
              <thead>
                <tr>
                  <th className="bg-warning text-center" colSpan={3}>
                    --- Contact Details ---
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <FiPhoneCall />
                  </td>
                  <td>Phone</td>
                  <td>7225012026</td>
                </tr>
                <tr>
                  <td>
                    <ImMobile />
                  </td>
                  <td>Call</td>
                  <td>011-2553-2553</td>
                </tr>
                <tr>
                  <td>
                    <AiOutlineMail />
                  </td>
                  <td>Email</td>
                  <td>Harshitsharma9211@urdomain.com</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md={6}>
            <Image
              src="images/farmhouse.jpg"
              style={{ width: "80%", height: "80%" }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
