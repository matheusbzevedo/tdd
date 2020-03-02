module.exports = (app) => {
    const create =  async (request, response) => {
        const result = await app.services.accounts.save(request.body);
        if(result.error) return response.status(400).json(result);

        return response.status(201).json(result[0]); 
    };

    return { create };
};