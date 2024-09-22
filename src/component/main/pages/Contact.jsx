import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { sendContactMail } from "../../features/userSlicer";

function Contact() {
  const dispatch=useDispatch();
  const loading=useSelector((state)=>state.user.loading);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    city: "",
    detail: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(sendContactMail(formData));
  };

  return (
    <div className="container py-5">
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              required
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="subject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Subject"
              required
              value={formData.subject}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
              required
              value={formData.city}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="detail">
          <Form.Label>Detail</Form.Label>
          <Form.Control
            as="textarea"
            required
            rows={3}
            value={formData.detail}
            onChange={handleChange}
          />
        </Form.Group>

        <Button className="sign_but" variant="primary" type="submit">
          {loading ? 'loading..':'Submit'}
        </Button>
      </Form>
    </div>
  );
}

export default Contact;
