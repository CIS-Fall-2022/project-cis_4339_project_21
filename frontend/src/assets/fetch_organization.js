import axios from "axios";

export const mydata = () => {
    var host = import.meta.env.VITE_ROOT_API
    let apiUrl = `${host}/organizationData/organization`
    return axios.get(apiUrl).then((response) => response);
}