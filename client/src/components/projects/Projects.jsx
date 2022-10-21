import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../../queries/ProjectQueries";

 export default function Projects() {
     const { loading, error, data } = useQuery(GET_PROJECTS);
     if (loading) return <div>Loading...</div>;
     if (error) return <div>{`SomeThing went wrong! with error:${error}`}</div>;


  return (
    <>
      {!loading && !error && data && (
        <>
          <div>Projects</div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>clientName</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.projects.map((project) => {
                return (
                  <tr key={project.id}>
                    <>
                      <td>{project.name}</td>
                      <td>{project.description}</td>
                      <td>{project.status}</td>
                      <td>{project.client.name}</td>
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
