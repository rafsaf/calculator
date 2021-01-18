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
              Wpisz maks. ilość punktów ze sprawdzianu, dla 25 i więcej plusy i minusy przy ocenach.
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
  const calculatePointsDown25 = () => {
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

  const calculatePointsUp25 = () => {
    const numbs = {
      one: { down: 0, up: Math.round((points * 25) / 100) },
      two: {
        down: Math.round((points * 35) / 100),
        up: Math.round((points * 45) / 100),
      },
      three: {
        down: Math.round((points * 55) / 100),
        up: Math.round((points * 65) / 100),
      },
      four: {
        down: Math.round((points * 75) / 100),
        up: Math.round((points * 85) / 100),
      },
      five: {
        down: Math.round((points * 95) / 100),
        up: Math.round((points * 100) / 100),
      },
    };
    const diff_1 =
      Math.round((points * 35) / 100) - Math.round((points * 25) / 100) - 1;
    const diff_2 =
      Math.round((points * 55) / 100) - Math.round((points * 45) / 100) - 1;
    const diff_3 =
      Math.round((points * 75) / 100) - Math.round((points * 65) / 100) - 1;
    const diff_4 =
      Math.round((points * 95) / 100) - Math.round((points * 85) / 100) - 1;

    const up_one = numbs.one.up + Math.round(diff_1 / 2);
    
    const up_two = numbs.two.up + Math.round(diff_2 / 2);

    const up_three = numbs.three.up + Math.round(diff_3 / 2);

    const up_four = numbs.four.up + Math.round(diff_4 / 2);

    return [
      // 1
      [numbs.one.down,
      numbs.one.up],
      // 1+
      [numbs.one.up + 1,
      up_one],
        // 2-
      [up_one + 1,
      numbs.two.down - 1],
        // 2
      [numbs.two.down,
      numbs.two.up],
        //
      [numbs.two.up + 1,
      up_two],

      [up_two + 1,
      numbs.three.down - 1],

      [numbs.three.down,
      numbs.three.up],

      [numbs.three.up + 1,
      up_three],

      [up_three + 1,
      numbs.four.down - 1],

      [numbs.four.down,
      numbs.four.up],

      [numbs.four.up + 1,
      up_four],

      [up_four + 1,
      numbs.five.down - 1],

      [numbs.five.down,
        numbs.five.up],

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

            {(points >= 25) ?
            calculatePointsUp25(points).map((row, index) => (
              <p>
              {grades[index]} &nbsp;&nbsp;{" "}
              <b>
                {row[0]} - {row[1]}
              </b>{" "}
              pkt
            </p>
            )) : 
            calculatePointsDown25(points).map((row, index) => (
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
