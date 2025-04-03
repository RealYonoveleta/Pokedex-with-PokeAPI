class Repository {

    constructor(url) {
        this.BASE_URL = `https://pokeapi.co/api/v2/${url}/`
    }

    async get(url) {
        try {
            const response = await fetch(url)
            if(!response.ok)
                throw new Error(`Response status: ${response.status}`)
    
            return await response.json()
        } catch(error) {
            console.error(error.message)
        }
    }

    async getAll() {
        let results = []
        
        let response = await this.get(this.BASE_URL)
        results = results.concat(response.results)

        while(response.next) {
            response = await this.get(response.next)
            results = results.concat(response.results)
        }

        return results
    }

    async getOne(name) {
        return await this.get(this.BASE_URL + name)
    }

}

