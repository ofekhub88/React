
var getUserById = require('./getUserById');
let testusers = {
    1: {
        id: 1,
        firstName: 'Kevin',
        lastName: 'Chung'
    },
    2: {
        id: 2,
        firstName: 'Marlon',
        lastName: 'Cobb'
    },
    3: {
        id: 3,
        firstName: 'Maria',
        lastName: 'Santos'
    },
    4: {
        id: 4,
        firstName: 'Iris',
        lastName: 'Leblanc'
    },
    5: {
        id: 5,
        firstName: 'Ali',
        lastName: 'Ahmed'
    }
};


describe('getUserById', () => {
    it('will return user details id user found', async() => {
        var id = 4;
        var result = await getUserById(id);
        expect(result.id).toEqual(id);
        expect(result.firstName).toEqual(testusers[id].firstName);
        expect(result.lastName).toEqual(testusers[id].lastName);
    });

 
    it('will return an error if the user id Not Found', async() => {
        var id = 88;
        await expect(getUserById(id)).rejects.toEqual('User with ID ' + id + ' not found.');
    });
})
