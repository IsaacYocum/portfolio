import { ChangeEvent, FormEvent, useEffect, useState } from "react"

type FetchingEmployeeProps = {
    url: string
}

type EmployeeForm = {
    id: number | null,
    Name: string,
    Salary: number | null
}

const emptyEmployeeForm: EmployeeForm = {
    id: null,
    Name: "",
    Salary: null
}

const FetchingEmployee: React.FC<FetchingEmployeeProps> = ({ url }) => {
    const [form, setForm] = useState<EmployeeForm>(emptyEmployeeForm)
    const [employees, setEmployees] = useState<EmployeeForm[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchEmployees = async () => {
        setIsLoading(false)
        try {
            const res = await fetch(url)
            if (!res.ok) {
                throw new Error("employees fetch issue")
            }
            const json = await res.json();
            setEmployees(json);
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchEmployees()
    }, [url])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log("submit")

        try {
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            })
        } catch (e) {
            console.error(e)
        } finally {
            fetchEmployees()
        }
    }

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const key = e.target.name;
        const value = e.target.value

        setForm(prevForm => ({
            ...prevForm,
            [key]: value
        }))
    }

    return (
        <>
            Employee form
            <form onSubmit={handleSubmit}>
                <label htmlFor="nameInput">Name</label>
                <input id="nameInput" data-testid="Name" name="Name" type="text" onChange={handleFormChange} />
                <hr />
                <label htmlFor="salaryInput">Salary</label>
                <input id="salaryInput" data-testid="Salary" name="Salary" type="number" onChange={handleFormChange} />
                <hr />
                <input data-testid="submit" name="Submit" type="submit" onChange={handleFormChange} />
            </form>

            {isLoading && <p>Loading...</p>}
            {!isLoading && (
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees?.map(e => (
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.Name}</td>
                                <td>{e.Salary}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )

}

export default FetchingEmployee;