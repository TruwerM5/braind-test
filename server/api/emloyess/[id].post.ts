import { employees } from "./data";
import type { Employee } from "~/types";

export default defineEventHandler( async (event) => {

    const id = event.context.params?.id;
    const body = await readBody<{email: string}>(event);

    if(!id) {
        throw createError({
            statusCode: 400,
            statusMessage: "ID is not provided"
        })
    }

    console.log(id);
    const instance = employees.find(item => item.id === Number(id));
    if(!instance) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Employee is not found'
        });
    }

        
        instance.email = body.email;
        
        console.log(employees);
        setResponseStatus(event, 201);
        return instance;
    
});