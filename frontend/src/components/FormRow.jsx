const FormRow = (props) => {
  const { type, name, label, defaultValue, onChange } = props;

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {label || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue || ''}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default FormRow;