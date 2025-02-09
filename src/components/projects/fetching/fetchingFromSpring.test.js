import { act, render, waitFor, screen } from "@testing-library/react";
import FetchingFromSpring from "./fetchFromSpring";

const mockContent1 = {
    "id": 1,
    "title": "My first blog post title",
    "desc": "My first blog post - updated",
    "status": "IDEA first",
    "contentType": "firstARTICLE",
    "dateCreated": "2025-0 first2-04T13:28:45.049672",
    "dateUpdated": "2025-02-04T1 first3:28:45.049672",
    "url": "http://localhost:8080/api/ firstv1/content/2"
}

const mockContent2 = {
    "id": 2,
    "title": "My second blog post title",
    "desc": "My second blog post - updated",
    "status": "IDEA",
    "contentType": "ARTICLE",
    "dateCreated": "2025-02-04T13:28:45.049672",
    "dateUpdated": "2025-02-04T13:28:45.049672",
    "url": "http://localhost:8080/api/v1/content/2"
}

const createComponent = async (val = [], ok = true) => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: ok,
            json: () => Promise.resolve(val),
        }),
    )

    await act(async () => { 
        render(<FetchingFromSpring url="test" />) 
    })
}

describe(FetchingFromSpring, () => {
    it ('should fetch empty results', async () => {
        await createComponent()
        const totalUsers = screen.getByTestId('totalUsers')
        expect(totalUsers.textContent).toBe("Total users: 0")
    })

    it ('should fetch one result', async () => {
        await createComponent([mockContent1])
        const totalUsers = screen.getByTestId('totalUsers')
        expect(totalUsers.textContent).toBe("Total users: 1")
        expect(screen.getByText(`${mockContent1.id}`)).toBeVisible()
        expect(screen.getByText(`${mockContent1.title}`)).toBeVisible()
        expect(screen.getByText(`${mockContent1.desc}`)).toBeVisible()
        expect(screen.getByText(`${mockContent1.status}`)).toBeVisible()
        expect(screen.getByText(`${mockContent1.contentType}`)).toBeVisible()
        expect(screen.getByText(`${mockContent1.dateCreated}`)).toBeVisible()
    })

    it ('should fetch one result', async () => {
        await createComponent([mockContent1, mockContent2])
        const totalUsers = screen.getByTestId('totalUsers')
        expect(totalUsers.textContent).toBe("Total users: 2")
        expect(screen.getByText(`${mockContent1.id}`)).toBeVisible()
        expect(screen.getByText(`${mockContent1.title}`)).toBeVisible()
        expect(screen.getByText(`${mockContent1.desc}`)).toBeVisible()
        expect(screen.getByText(`${mockContent1.status}`)).toBeVisible()
        expect(screen.getByText(`${mockContent1.contentType}`)).toBeVisible()
        expect(screen.getByText(`${mockContent1.dateCreated}`)).toBeVisible()

        expect(screen.getByText(`${mockContent2.id}`)).toBeVisible()
        expect(screen.getByText(`${mockContent2.title}`)).toBeVisible()
        expect(screen.getByText(`${mockContent2.desc}`)).toBeVisible()
        expect(screen.getByText(`${mockContent2.status}`)).toBeVisible()
        expect(screen.getByText(`${mockContent2.contentType}`)).toBeVisible()
        expect(screen.getByText(`${mockContent2.dateCreated}`)).toBeVisible()
    })

    it ('should fetch throw', async () => {
        await createComponent([], false)
        expect(screen.getByText(/error/i)).toBeVisible()
    })
})