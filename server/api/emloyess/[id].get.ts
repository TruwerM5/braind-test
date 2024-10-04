import { employees } from "./data";

export default defineEventHandler(async (event) => {

    const id = event.context.params?.id;

    if(id) {
        return employees.find(item => item.id === Number(id));
    }
    return null;

});