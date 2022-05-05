import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import FormField from "./components/FormField";

const fields = Array(5)
  .fill(0)
  .map((x) => [0, 0]);

function App() {
  const [values, setValues] = useState<string[]>([]);

  return (
    <Form
      onSubmit={(_values) => {
        console.log(_values);

        setValues(_values.map((x) => `${x.name}: ${x.value}`));
      }}
    >
      <div>
        {fields.map((obj, i) => {
          return obj.map((x, j) => (
            <FormField
              key={`${i}.${j}`}
              name={`input.${i}.${j}`}
              component={<input type="text" placeholder="input" />}
            />
          ));
        })}
      </div>
      <button type="submit">submit</button>
    </Form>
  );
}

export default App;
