import axios from "axios";
import { request, gql } from "graphql-request";
import graphUrl from "../constants/graphUrl";

const CORE_DOMAIN_INFO_QUERY = gql`
 id
            name
            owner
            initMint
            finalTokenUri
            description
`


export const fetchAllDomains = async () => {
    const query = gql`
        {
        domains( orderDirection: asc) {
            ${CORE_DOMAIN_INFO_QUERY}
        }
        }
    `;
    const response = await request(graphUrl, query);
    return response?.domains;
}


export const fetchDomain = async (id:number | undefined) => {
    const query = gql`
        {
        domains( where: {id:${id}}) {
         ${CORE_DOMAIN_INFO_QUERY}
        }
        }
    `;
    const response = await request(graphUrl, query);
    console.log(response, 'response >>>')
   return response?.domains[0];
}
