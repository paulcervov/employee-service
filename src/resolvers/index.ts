import userResolvers from "./userResolvers";

const ResponseResolver = {
    Response: {
        __resolveType() {
            return null;
        }
    }
}

export default [userResolvers, ResponseResolver];
