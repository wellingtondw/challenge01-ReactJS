import React, { useState, useEffect } from "react";
import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api
      .get("/repositories")
      .then((res) => setRepositories(res.data))
      .catch((err) => console.log(err));
  }, []);

  async function handleAddRepository() {
    api
      .post("/repositories", {
        title: "Unformdsd",
        url: "https://github.com/Rocketseat/unform",
        techs: ["Javascript", "React", "NodeJS"],
      })
      .then((res) => {
        setRepositories([...repositories, res.data]);
      })
      .catch((err) => console.log(err));
  }

  async function handleRemoveRepository(id) {
    api
      .delete(`/repositories/${id}`)
      .then((res) => {
        const repositoryIndex = repositories.findIndex(
          (repo) => repo.id === id
        );

        const newRepositoriesArr = [...repositories];
        newRepositoriesArr.splice(repositoryIndex, 1);

        setRepositories(newRepositoriesArr);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository, index) => (
          <li key={index}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
