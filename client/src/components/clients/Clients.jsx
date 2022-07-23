import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../../queries/ClientQueries";

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`SomeThing went wrong! with error:${error}`}</div>;
  return (
    <>
      {!loading && !error && data && (
        <>
          <div>Clients</div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.clients.map((client) => {
                return (
                  <tr>
                    <>
                      <td>{client.name}</td>
                      <td>{client.phone}</td>
                      <td>{client.email}</td>
                    </>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
