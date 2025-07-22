import { faker } from "@faker-js/faker";

//Generating Single Fake User
export const generateUser = (gender) => {
    const gen = gender || faker.person.sexType(); //male or female

    return {
        name: faker.person.fullName({sex: gen}),
        email: faker.internet.email(),
        gender: gen,
        dob: faker.date.birthdate({ min: 18, max: 60, mode: 'age' }).toISOString().split('T')[0],
        phone: faker.phone.number(),
        address: faker.location.streetAddress(true)
    };
};