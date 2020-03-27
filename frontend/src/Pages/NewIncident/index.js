import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";

import "./styles.css";

export default function NewIncidente() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const ongId = localStorage.getItem("ongId");
  const history = useHistory();

  async function handleNewIncidents(e) {
    e.preventDefault();
    const data = {
      title,
      description,
      value
    };
    try {
      await api.post("incidents", data, {
        headers: {
          Authorization: ongId
        }
      });
      history.push("/profile");
    } catch {
      alert("Erro ao cadastrar caso tente novamente.");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Volta para home
          </Link>
        </section>
        <form onSubmit={handleNewIncidents}>
          <input
            value={title}
            onChange={event => setTitle(event.target.value)}
            placeholder="Título do caso"
          />

          <textarea
            value={description}
            onChange={event => setDescription(event.target.value)}
            placeholder="Descrição"
          />

          <input
            value={value}
            onChange={event => setValue(event.target.value)}
            placeholder="Valor em reais"
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
