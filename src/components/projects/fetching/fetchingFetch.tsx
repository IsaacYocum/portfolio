import { FC, useEffect, useState } from "react";

type fetchProps = { url: string }

const FetchingFetch: FC<fetchProps> = ({ url }) => {
    const [data, setData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // useEffect(() => {
    //     fetch(url)
    //         .then(res => {
    //             if (!res.ok) {
    //                 throw new Error('Network error')
    //             }
    //             return res.json()
    //         })
    //         .then(data => {
    //             console.log(data)
    //             setData(data)
    //         })
    //         .catch(e => {
    //             console.error('Fetch error: ', e)
    //         })
    //         .finally(() => {
    //             setIsLoading(false)
    //         })
    // }, [url])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('network error')
                }
                const data = await response.json()
                setData(data)
            } catch (e) {
                console.error('Fetch error: ', e)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [url])

    return (
        <>
            <h1>Fetching using Fetch</h1>
            {isLoading ? <p>Loading...</p> : (
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

export default FetchingFetch;