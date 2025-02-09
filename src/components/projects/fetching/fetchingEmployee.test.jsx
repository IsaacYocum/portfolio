import { render, screen, act, waitFor, fireEvent } from "@testing-library/react";
import FetchingEmployee from "./fetchingEmpoyee";

const createComponent = async (val = [], ok = true) => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: ok,
            json: () => Promise.resolve(val),
        }),
    )

    await act(async () => { 
        render(<FetchingEmployee url="test url" />) 
    })
}

describe(FetchingEmployee, () => {
    // beforeEach(async () => {
    //     global.fetch = jest.fn(() => Promise.resolve({
    //         ok: true,
    //         json: Promise.resolve({id: 1, Name: 'Isaac', Salary: 123})
    //     }))

    //     await act(async () => {
    //         render(<FetchingEmployee url="asdf" />)
    //     })
    // }) 

    it('should show 1 employee', async () => {
        await createComponent([{id: 1, Name: 'Isaac', Salary: 123}])
        await waitFor(() => expect(screen.getByText('Isaac')).toBeVisible())
        expect(global.fetch).toHaveBeenCalledTimes(1)
    })

    it('should add 1 employee', async () => {
        await createComponent([{id: 1, Name: 'Isaac', Salary: 123}])
        const nameInput = screen.getByTestId("Name")
        fireEvent.change(nameInput, {target: {value: 'isaac'}})
        const salaryInput = screen.getByTestId("Name")
        fireEvent.change(salaryInput, {target: {value: "123"}})
        const submit = screen.getByTestId("submit")
        await act(async () => {
            fireEvent.click(submit)
        })
        expect(global.fetch).toHaveBeenCalledTimes(3)
        expect(global.fetch).toHaveBeenCalledWith(
            "test url", 
            { "body": "{\"id\":null,\"Name\":\"123\",\"Salary\":null}", "headers": {"Content-Type": "application/json"}, "method": "POST" }
        )
    })
    
})