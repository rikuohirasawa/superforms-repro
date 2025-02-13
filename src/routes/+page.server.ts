import { z } from "zod"
import {
    superValidate,
} from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async () => {
    const schema = z.object({
        name: z.string().min(1),
        questions: z.record(
            z.string().uuid(),
            z.object({
                field: z.string().min(1, { message: "Field is required" }),
            })
        )
    })

    const data = {
        name: "",
        questions: {
            [crypto.randomUUID()]: {
                field: ""
            }
        }
    }

    // swap this comment with the above data to test the error
    // this should not throw error - where the above data:
    // "TypeError: Cannot use 'in' operator to search for '__items' in undefined"
    
    // const data = {
    //     name: "",
    //     questions: {
    //         [crypto.randomUUID()]: {
    //             field: " "
    //         }
    //     }
    // }

    const form = superValidate(data, zod(schema), {
        errors: false
    })

    return {
        form
    }
})