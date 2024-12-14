interface IFetchData {
    url: string,
    method: string,
}

const fetchData = async ({ url, method }:IFetchData) => {
    console.log(url, method);
    await fetch(
        url,
        {
            headers: {
                "Content-Type": 'application/json',
                "Accept": '*/*',
            },
            method: method,
            mode: "cors",
        }
    ).then((response) => response.json())
        .catch((error) => console.log("Failed to fetch data", error))
}

export default fetchData;