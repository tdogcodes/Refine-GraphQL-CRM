import { AuthProvider } from "@refinedev/core";
import { API_URL, dataProvider } from "./data";

//demo credintials to test the auth
export const authCredentials = {
    email: "micheal.scott@dundermifflin.com",
    password: "demodemo",
}

export const authProvider = {

    login: async ({ email }: { email: string }) => {
        try{
            // calling the login endpoint
            // dataProvider.custom makes a custom request to the GraphQL API
            // this calls dataProvider which uses fetchWrapper
            //GraphQL mutation that takes an email and returns an access token
            const { data } = await dataProvider.custom({
                url: API_URL,
                method: "post",
                headers: {},
                meta: {
                    variables: {email},
                    rawQuery: `
                        mutation Login($email: String!) {
                            login(loginInput: {email: $email}) {
                                accessToken
                            }   
                        }`,
                },
            })
            //sets the access token in local storage
            localStorage.setItem("access_token", data.login.accessToken)

            //log the user in and redirect to the home page 
            return {
                success: true,
                redirectTo: "/",
            }
        } catch(e){
            // if the login fails, we throw an error
            const error = e as Error
        }
    },

    logout: async () => {
        // remove the access token from local storage
        localStorage.removeItem("access_token")

        // redirect to the login page
        return {
            success: true,
            redirectTo: "/login",
        }
    },

    onError: async (error : any) => {
        // handle the auth error, and set logout to true
        if(error.statusCode === "UNAUTHENTICATED"){
            return {
                logout: true,
                ...error
            }
        }
        return { error }  
    },

    check: async () => {
        // get the identity of the user to know if the user is authenticated
        try{
            await dataProvider.custom({
                url: API_URL,
                method: "post",
                headers: {},
                meta: {
                    rawQuery: `
                        query Me{
                            me {
                                name
                            }
                        }`,
                },
            })
            // if the user is authenticated, redirect to the home page
            return {
                authenticated: true,
                redirectTo: "/",
            } 
        } catch(error){
            // if the user is not authenticated, redirect to the login page
            return {
                authenticated: false,
                redirectTo: "/login",
            }
        }
    },

    getIdentity: async () => {
        // to get all of the information about the user
        //
        try{
            const { data } = await dataProvider.custom<{me: any}>({
                url: API_URL,
                method: "post",
                headers: localStorage.getItem("access_token")
                ? {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                } : {},
                meta: {
                    rawQuery: `
                        query Me{
                            me {
                                id
                                name
                                email
                                phone
                                jobTitle
                                timezone
                                avatarUrl
                            }
                        }`,
                },
            })
            return data.me
        } catch(error){
            return undefined
        }
    },
}