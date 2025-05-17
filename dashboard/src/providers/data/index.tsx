import { GraphQLClient } from "@refinedev/nestjs-query";
import { fetchWrapper } from "./fetchWrapper"

export const API_URL = "http://api.crm.refine.dev";

export const client = new GraphQLClient(API_URL, {
  fetch: (url: string, options: RequestInit) => {
    try{
        return fetchWrapper(url, options)
    } catch(e){
        return Promise.reject(e as Error);
    }
  }
})