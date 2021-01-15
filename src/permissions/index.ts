import {not, shield} from 'graphql-shield'
import {isDirector, isEmployee} from "../rules";

export default shield({
    Mutation: {
        createUser: not(isEmployee),
        updateUser: not(isEmployee),
        deleteUser: isDirector,
    },
}, {allowExternalErrors: true})
