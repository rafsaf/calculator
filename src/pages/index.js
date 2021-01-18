import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import BootstrapForm from "react-bootstrap/Form";
import * as Yup from "yup";

const PointsForm = ({ setPoints }) => {
  return (
    <Formik
      initialValues={{ points: 0 }}
      validationSchema={Yup.object({
        points: Yup.number()
          .positive("Ilość punktów musi być dodatnia")
          .integer("Liczba musi być całkowita")
          .required("Pole wymagane"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setPoints(values.points);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <BootstrapForm.Label>
              Wpisz maks. ilość punktów ze sprawdzianu
            </BootstrapForm.Label>
          </div>
          <div className="row">
            <div className="col-auto">
              <BootstrapForm.Group controlId="validationCustom01">
                <Field
                  as={BootstrapForm.Control}
                  name="points"
                  isValid={touched.points && !errors.points}
                  isInvalid={touched.points && errors.points}
                />
              </BootstrapForm.Group>
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" type="submit">
                Policz
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

// markup
const IndexPage = () => {
  const [points, setPoints] = useState(null);

  const submitPoints = (points) => {
    setPoints(points);
  };

  return (
    <div className="container my-2">
      <h1>Kalkulator progów</h1>
      <PointsForm setPoints={submitPoints} />

      {points ? (
        <div className="row" style={{ fontSize: "large" }}>
          <div className="col-auto">
            <h3>Sugerowane progi:</h3>
            <p>
              1 &nbsp;&nbsp; <b>0 - {Math.round((points * 20) / 100)}</b> pkt
            </p>
            <p>
              1+ &nbsp;&nbsp;{" "}
              <b>
                {Math.round((points * 20) / 100 + 1)} -{" "}
                {Math.round((points * 30) / 100 - 1)}
              </b>{" "}
              pkt
            </p>
            <p>
              2- &nbsp;&nbsp;{" "}
              <b>
                {Math.round((points * 30) / 100)} -{" "}
                {Math.round((points * 35) / 100)}
              </b>{" "}
              pkt
            </p>
            <p>
              2 &nbsp;&nbsp;{" "}
              <b>
                {Math.round((points * 35) / 100) + 1} -{" "}
                {Math.round((points * 45) / 100)}
              </b>{" "}
              pkt
            </p>
            <p>
              2+ &nbsp;&nbsp;{" "}
              <b>
                {Math.round((points * 45) / 100)} -{" "}
                {Math.round((points * 50) / 100 - 1)}
              </b>{" "}
              pkt
            </p>
            <p>
              3- &nbsp;&nbsp;{" "}
              <b>
                {Math.round((points * 50) / 100)} -{" "}
                {Math.round((points * 55) / 100)}
              </b>{" "}
              pkt
            </p>
            <p>
              3 &nbsp;&nbsp;{" "}
              <b>
                {Math.round((points * 55) / 100 + 1)} -{" "}
                {Math.round((points * 65) / 100)}
              </b>{" "}
              pkt
            </p>
            <p>
              3+ &nbsp;&nbsp;{" "}
              <b>
                {Math.round((points * 65) / 100)} -{" "}
                {Math.round((points * 70) / 100 - 1)}
              </b>{" "}
              pkt
            </p>
            <p>
              4- &nbsp;&nbsp;{" "}
              <b>
                {Math.round((points * 70) / 100)} -{" "}
                {Math.round((points * 75) / 100)}
              </b>{" "}
              pkt
            </p>
            <p>
              4 &nbsp;&nbsp;{" "}
              <b>
                {Math.round((points * 75) / 100 + 1)} -{" "}
                {Math.round((points * 85) / 100)}
              </b>{" "}
              pkt
            </p>
            <p>
              4+ &nbsp;&nbsp;{" "}
              <b>
                {Math.round((points * 85) / 100)} -{" "}
                {Math.round((points * 90) / 100 - 1)}
              </b>{" "}
              pkt
            </p>
            <p>
              5- &nbsp;&nbsp;{" "}
              <b>
                {Math.round((points * 90) / 100)} -{" "}
                {Math.round((points * 95) / 100)}
              </b>{" "}
              pkt
            </p>
            <p>
              5 &nbsp;&nbsp;{" "}
              <b>
                {Math.round((points * 95) / 100 + 1)} - {Math.round(points)}
              </b>{" "}
              pkt
            </p>
          </div>
          <div className="col">
            <p>
              dop&nbsp;&nbsp; 30% - <b>{(points * 30) / 100}</b> pkt
            </p>
            <p>
              dst&nbsp;&nbsp; 50% - <b>{(points * 50) / 100}</b> pkt
            </p>
            <p>
              db&nbsp;&nbsp; 70% - <b>{(points * 70) / 100}</b> pkt
            </p>
            <p>
              bdb&nbsp;&nbsp; 90% - <b>{(points * 90) / 100}</b> pkt
            </p>
            <p>
              cel&nbsp;&nbsp; 100% - <b>{points}</b> pkt
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default IndexPage;
