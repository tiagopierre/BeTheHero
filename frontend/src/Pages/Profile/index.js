import React, { useState, useEffect } from "react";
import "./styles.css";
import { Link, useHistory } from "react-router-dom";
import logoImg from "../../assets/logo.svg";
import { FiPower, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const ongName = localStorage.getItem("ongName");
  const ongId = localStorage.getItem("ongId");
  const history = useHistory();

  async function handleDeleteIncidents(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });
      setIncidents(incidents.filter(incidents => incidents.id !== id));
    } catch {
      alert("Erro ao deletar caso");
    }
  }

  function handleLougout() {
    localStorage.clear();
    history.push("/");
  }

  useEffect(() => {
    api
      .get("/profile", {
        headers: {
          Authorization: ongId
        }
      })
      .then(response => {
        setIncidents(response.data);
      });
  }, []);

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem Vinda, {ongName}</span>
        <Link className="button" to="incidents/new">
          Cadastrar novo caso
        </Link>
        <button
          onClick={() => {
            handleLougout();
          }}
        >
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h1>Casos Cadastrados</h1>

      <ul>
        {incidents.map(incidentes => (
          <li key={incidentes.id}>
            <strong>CASO: </strong>
            <p>{incidentes.title}</p>
            <strong>DESCRIÇÃO: </strong>
            <p>{incidentes.description}</p>
            <strong>VALOR: </strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incidentes.value)}
            </p>
            <button
              onClick={() => {
                handleDeleteIncidents(incidentes.id);
              }}
              type="button"
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
