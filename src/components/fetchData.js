
export async function getData(url,saveTo = "films") {
    let cacheDatas = window[saveTo] ? JSON.parse(window[saveTo]) : {};
    
    if (cacheDatas && cacheDatas[url]) {
        return cacheDatas[url];
    }
    else {
        const response  = await fetch( url, {
            method: 'GET'})           
            .catch( err => console.log( 'error: ',err ) );
        const result = response.json();
        result.then(data =>{
                cacheDatas[url] = data;
                window[saveTo] = JSON.stringify(cacheDatas);;
            }
        )

        return result;
    }
}
