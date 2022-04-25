import axios from "axios";
import { request, gql } from "graphql-request";
import graphUrl from "../constants/graphUrl";

export const fetchAllDomains = async () => {
    const query = gql`
        {
        domains( orderDirection: asc) {
            id
            name
            owner
            initMint
            finalTokenUri
        }
        }
    `;
    const response = await request(graphUrl, query);
    console.log(response?.domains, 'response');
    return response?.domains;
}
