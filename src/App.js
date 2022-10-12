import React, { useState } from "react";
import { Button, ButtonBox, Screen, Wrapper } from "./components";

const btnValues = [
  [1, 2, 3, "+"],
  [4, 5, 6, "-"],
  [7, 8, 9, "x"],
  [0, "C", "/", "="],
];

const toLocaleString = (num) => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");


function App() {

  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  })

  const numClickHandler = (event) => {
    event.preventDefault();
    const value = event.target.innerHTML;

    if (removeSpaces(calc.num).length < 10) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
              ? toLocaleString(Number(removeSpaces(calc.num + value)))
              : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res
      });
    }
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  }

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
            ? a - b
            : sign === "x"
              ? a * b
              : a / b;

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : math(Number(removeSpaces(calc.res)), Number(removeSpaces(calc.num)), calc.sign),
        sign: "",
        num: 0,
      });
    }
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };


  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {
          btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : btn === "C" ? "clear" : ""}
                value={btn}
                onClick={
                  btn === "C" ? resetClickHandler :
                    btn === "=" ? equalsClickHandler :
                      btn === "/" || btn === "x" || btn === "-" || btn === "+" ? signClickHandler :
                        numClickHandler
                }
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};

export default App;