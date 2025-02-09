import { useQuery } from "react-query";

type fetchProps = { url: string }

const FetchingUseQuery: React.FC<fetchProps> = ({ url }) => {
    const { data, status } = useQuery("data", async (): Promise<any[]> => {
        const response = await fetch(url);
        return response.json()
    })

    return (
        <>
            <h1>Fetching using useQuery</h1>
            {status === "loading" && <p>Loading...</p>}
            {status === "error" && <p>Error!</p>}
            {status === "success" && (
                <>
                    <h2>Total users: {data.length}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>username</th>
                                <th>email</th>
                                <th>phone</th>
                                <th>website</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((d, i) => (
                                <tr key={i}>
                                    <td>{d.id}</td>
                                    <td>{d.name}</td>
                                    <td>{d.username}</td>
                                    <td>{d.email}</td>
                                    <td>{d.phone}</td>
                                    <td>{d.website}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </>
    )
}

export default FetchingUseQuery;