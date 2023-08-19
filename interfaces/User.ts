export default interface User{
    id: string,
    email: string,
    username: string,
    password: string,
    image: string,
    createdAt?: Date,
    updatedAt?: Date,  
}