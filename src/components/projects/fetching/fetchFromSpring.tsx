import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useQuery } from "react-query";

type fetchProps = { url: string }

const FetchingFromSpring: React.FC<fetchProps> = ({ url }) => {
    const [data, setData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [form, setForm] = useState<any>({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                console.log(response.ok)
                if (!response.ok) {
                    throw new Error('network error')
                }
                const data = await response.json()
                console.log(data)
                setData(data)
            } catch (e) {
                console.error('Fetch error: ', e)
                setIsError(true)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [url])

    // const { data, status, refetch } = useQuery("data", async (): Promise<any[]> => {
    //     const response = await fetch(url);
    //     return response.json()
    // })

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name
        const value = e.target.value
        console.log(e)
        setForm((prev: any) => ({
            ...prev,
            dateCreated: "2025-02-04T13:28:45.049672",
            dateUpdated: "2025-02-04T13:28:45.049672",
            [key]: value
        }))
    }

    const handleCreateSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        .catch(e => {
            console.error('Issue posting: ', e)
        })
        .finally(() => {
        })
    }

    const handleUpdateSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch(url + `/${form.id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        .catch(e => {
            console.error('Issue puting: ', e)
        })
        .finally(() => {
        })
    }

    const handleDeleteSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch(url + `/${form.id}`,{
            method: 'DELETE',
        })
        .catch(e => {
            console.error('Issue deleteing: ', e)
        })
        .finally(() => {
        })
    }

    return (
        <>
            <h1>Fetching from Spring</h1>
            {/* {status === "loading" && <p>Loading...</p>}
            {status === "error" && <p>Error!</p>}
            {status === "success" && ( */}
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error...</p>}
            {!isLoading && !isError && (
                <>
                    <h2>Create new</h2>
                    <form onSubmit={handleCreateSubmit}>
                        <label>
                            Title: 
                            <input name="title" type="text" onChange={handleFormChange}/>
                            <br />
                            Description: 
                            <input name="desc" type="text" onChange={handleFormChange}/>
                            <br />
                            Status: 
                            <input name="status" type="text" onChange={handleFormChange}/>
                            <br />
                            Content Tyep: 
                            <input name="contentType" type="text" onChange={handleFormChange}/>
                            <br />
                        </label>
                        <input value="Submit" type="submit" />
                    </form>

                    <h2>Update</h2>
                    <form onSubmit={handleUpdateSubmit}>
                        <label>
                            Id: 
                            <input name="id" type="text" onChange={handleFormChange}/>
                            <br />
                            Title: 
                            <input name="title" type="text" onChange={handleFormChange}/>
                            <br />
                            Description: 
                            <input name="desc" type="text" onChange={handleFormChange}/>
                            <br />
                            Status: 
                            <input name="status" type="text" onChange={handleFormChange}/>
                            <br />
                            Content Tyep: 
                            <input name="contentType" type="text" onChange={handleFormChange}/>
                            <br />
                        </label>
                        <input value="Submit" type="submit" />
                    </form>

                    <h2>Delete</h2>
                    <form onSubmit={handleDeleteSubmit}>
                        <label>
                            Id: 
                            <input name="id" type="text" onChange={handleFormChange}/>
                            <br />
                        </label>
                        <input value="Submit" type="submit" />
                    </form>

                    <h2 data-testid="totalUsers">Total users: {data.length}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Desc</th>
                                <th>status</th>
                                <th>contentType</th>
                                <th>dateCreated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((d, i) => (
                                <tr key={i}>
                                    <td>{d.id}</td>
                                    <td>{d.title}</td>
                                    <td>{d.desc}</td>
                                    <td>{d.status}</td>
                                    <td>{d.contentType}</td>
                                    <td>{d.dateCreated}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </>
    )
}

export default FetchingFromSpring;