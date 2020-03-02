module.exports = (app) => {
    const findAll = (request, response) => {
        app.services.users.findAll().then(users => response.status(200).json(users))
    },
    create =  async (request, response) => {
        const result = await app.services.users.save(request.body);
        if(result.error) return response.status(400).json(result);

        return response.status(201).json(result[0]); 
    };

    return { findAll, create };
};