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
          .min(5,"Minimum 5 punktów")
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
              Wpisz maks. ilość punktów ze sprawdzianu, dla 20 i więcej plusy i minusy przy ocenach.
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

const grades = [
  "1",
  "1+",
  "2-",
  "2",
  "2+",
  "3-",
  "3",
  "3+",
  "4-",
  "4",
  "4+",
  "5-",
  "5",
]

const gradesMin = [
  "1",
  "2",
  "3",
  "4",
  "5",
]

const IndexPage = () => {
  const [points, setPoints] = useState(null);

  const submitPoints = (points) => {
    setPoints(points);
  };
  const calculatePointsDown20 = () => {
    const numbs = {
      one: 0,
      two: Math.ceil((points * 30) / 100),
      three: Math.ceil((points * 50) / 100),
      four: Math.ceil((points * 70) / 100),
      five: Math.ceil((points * 90) / 100),
    };

    return [
      [numbs.one, numbs.two - 1],
      [numbs.two, numbs.three -1],
      [numbs.three, numbs.four -1],
      [numbs.four, numbs.five -1],
      [numbs.five, points],
    ]
  }

  const calculatePointsUp20 = () => {

    return [
      [0, Math.floor((points * 25) / 100)],
      [Math.floor((points * 25) / 100) + 1, Math.floor((points * 30) / 100)],
      [Math.floor((points * 30) / 100) + 1, Math.floor((points * 35) / 100)],
      [Math.floor((points * 35) / 100) + 1, Math.floor((points * 45) / 100)],
      [Math.floor((points * 45) / 100) + 1, Math.floor((points * 50) / 100)],
      [Math.floor((points * 50) / 100) + 1, Math.floor((points * 55) / 100)],
      [Math.floor((points * 55) / 100) + 1, Math.floor((points * 65) / 100)],
      [Math.floor((points * 65) / 100) + 1, Math.floor((points * 70) / 100)],
      [Math.floor((points * 70) / 100) + 1, Math.floor((points * 75) / 100)],
      [Math.floor((points * 75) / 100) + 1, Math.floor((points * 85) / 100)],
      [Math.floor((points * 85) / 100) + 1, Math.floor((points * 90) / 100)],
      [Math.floor((points * 90) / 100) + 1, Math.floor((points * 95) / 100)],
      [Math.floor((points * 95) / 100) + 1, Math.floor((points * 100) / 100)],

    ]

  };
  return (
    <div className="container my-2">
      <h1>Kalkulator progów</h1>
      <PointsForm setPoints={submitPoints} />

      {points ? (
        <div className="row" style={{ fontSize: "" }}>
          <div className="col-auto">
            <h3>Sugerowane progi:</h3>

            {(points >= 20) ?
            calculatePointsUp20(points).map((row, index) => (
              <p>
              {grades[index]} &nbsp;&nbsp;{" "}
              <b>
                {row[0]} - {row[1]}
              </b>{" "}
              pkt
            </p>
            )) : 
            calculatePointsDown20(points).map((row, index) => (
              <p>
              {gradesMin[index]} &nbsp;&nbsp;{" "}
              <b>
                {row[0]} - {row[1]}
              </b>{" "}
              pkt
            </p>
            ))
            }
            
          </div>
          <div className="col">
            <p>
              dop&nbsp;&nbsp; 30% <b>{(points * 30) / 100}</b> pkt
            </p>
            <p>
              dst&nbsp;&nbsp; 50% <b>{(points * 50) / 100}</b> pkt
            </p>
            <p>
              db&nbsp;&nbsp; 70% <b>{(points * 70) / 100}</b> pkt
            </p>
            <p>
              bdb&nbsp;&nbsp; 90% <b>{(points * 90) / 100}</b> pkt
            </p>
            <p>
              cel&nbsp;&nbsp; 100% <b>{points}</b> pkt
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default IndexPage;
