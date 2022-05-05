# Formal 📋

Use to avoid expensive rerendering of components in large forms.

## Usage

```jsx
<Form
  onSubmit={(data) => {
    data.forEach(({ name, value, indices }) => {
      console.log(name, value, indices);
    });
  }}
>
  <FormField
    key={i}
    name={`input.${i}`}
    component={<input type="text" placeholder="input" />}
  />
</Form>
```
