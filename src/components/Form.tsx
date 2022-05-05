import React, {
  createContext,
  FormEvent,
  MutableRefObject,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from "react";

export interface FormFieldType {
  name: string;
}

interface FormContextType {
  fields: MutableRefObject<HTMLInputElement[]>;
  addFormField: (field: HTMLInputElement, name: string) => void;
}

interface SubmitReturnType {
  name: string;
  value: string;
  indices: number[];
}

interface FormProps {
  children: React.ReactNode;
  onSubmit: (data: SubmitReturnType[]) => void;
}

const FormContext = createContext<FormContextType>({} as FormContextType);

const Form = ({ children, onSubmit }: FormProps) => {
  const fields = useRef<HTMLInputElement[]>([]) as MutableRefObject<
    HTMLInputElement[]
  >;

  const addFormField = useCallback((field: HTMLInputElement, name: string) => {
    if (!fields.current.some((x) => x.dataset.formal_name === name)) {
      fields.current = fields.current.concat(field);
    }
  }, []);

  const handleFormSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    onSubmit(
      fields.current.map((x) => {
        const ret: SubmitReturnType = {
          name: x.dataset.formal_name ?? "",
          value: x.value,
          indices: x.dataset.formal_name
            ? x.dataset.formal_name
                .split(".")
                .slice(1)
                .map((n) => parseInt(n))
            : [0],
        };

        return ret;
      })
    );
  }, []);

  const memoedValue = useMemo(
    () => ({
      fields,
      addFormField,
    }),
    [fields]
  );

  return (
    <FormContext.Provider value={memoedValue}>
      <form onSubmit={handleFormSubmit}>{children}</form>
    </FormContext.Provider>
  );
};

export default Form;

export const useForm = () => {
  return useContext(FormContext);
};
