import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_CLIENTS } from "../../queries/ClientQueries";

export default function AddProject() {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState("new");
  const [clientId, setClientId] = useState();
  const [clientName, setClientName] = useState();
  const { loading, error, data } = useQuery(GET_CLIENTS);
  const submit = (e) =>{
    e.preventDefault()
    let temp = {
        name,description,clientId,clientName,status
    }
    console.log('from data:', temp);
  }
  return (
    <>
      <form onSubmit={submit}>
        <input
          placeholder="name"
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          placeholder="description"
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          <option value="new">Not Started</option>
          <option value="progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select
          id="clientId"
          name="clientId"
          value={clientId}
          onChange={(e) => {
            setClientId(e.target.value);
            setClientName(e.target.selectedOptions[0].innerHTML)
          }}
        >
          <option value="">select client name ...</option>
          {data && data.clients.map((client) => (
            <option value={client.id}>{client.name}</option>
          ))}
        </select>
        <button type="submit">submit</button>
      </form>
    </>
  );
}
