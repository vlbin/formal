import React, { MutableRefObject, useRef, useState } from "react";
import { useUpdateEffect } from "../hooks/useUpdateEffect";
import { FormFieldType, useForm } from "./Form";

interface FormFieldProps extends FormFieldType {
  component: React.ReactNode;
}

const FormField = ({ name, component }: FormFieldProps) => {
  const { addFormField } = useForm();
  const [_, setFormElement] = useState<HTMLInputElement>();
  const ref = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  useUpdateEffect(() => {
    const inputChild = ref.current.getElementsByTagName("input")[0];
    inputChild.dataset.formal_name = name;
    setFormElement(inputChild);

    addFormField(inputChild, name);
  }, [name]);

  return <div ref={ref}>{component}</div>;
};

export default FormField;
