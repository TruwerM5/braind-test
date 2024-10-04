import { employees } from "./data";


export default defineEventHandler(async (event) => {

    const query = getQuery(event);
    const page = query.page;

    // if(page) {
    //     const sliced = employees.slice(+from, +to);
    //     return sliced;
    // }
    if(page ) {
        const sliced = employees.slice((+page - 1) * 10, (+page - 1) * 10 + 10);
        return {employees: sliced, length: employees.length};    
    }
    

    return {employees, length: employees.length};
    
});