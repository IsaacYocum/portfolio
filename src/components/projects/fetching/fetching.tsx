import { QueryClientProvider, QueryClient } from "react-query";
import FetchingFetch from "./fetchingFetch"
import FetchingUseQuery from "./fetchingUseQuery";
import FetchingFromSpring from "./fetchFromSpring";
import FetchingEmployee from "./fetchingEmpoyee";

const JSON_PLACEHOLDER_URL = 'http://jsonplaceholder.typicode.com/users'
const SPRING_URL = 'http://localhost:8080/api/v1/content'
const EMPLOYEE_URL = 'http://localhost:8080/api/v1/employee'
const queryClient = new QueryClient();

const Fetching = () => {
    return (
        <>
            {/* <FetchingFetch url={JSON_PLACEHOLDER_URL} /> */}
            <hr />
            <QueryClientProvider client={queryClient}>
                {/* <FetchingUseQuery url={JSON_PLACEHOLDER_URL} /> */}
                <FetchingFromSpring url={SPRING_URL} />
            </QueryClientProvider>
            <hr />
            <FetchingEmployee url={EMPLOYEE_URL}/>
        </>
    )
}

export default Fetching;