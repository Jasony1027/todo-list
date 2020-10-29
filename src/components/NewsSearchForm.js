import React, { useState } from "react";

export default function NewsSearchForm(props) {
  const [name, setName] = useState("");
  function handleChange(e) {
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.searchNews(name);
    setName("")
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Search
      </button>
    </form>
  );
}
