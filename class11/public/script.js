


async function getUser(){
     let r = await axios.get("http://localhost:3000/user");
     let user = r.data;
    //  console.log(user);
    container.innerHTML = `     <h1>${user.name}</h1>
     <p>Email: ${user.email}</p> <p>Age: ${user.age}</p>
`;
}


getUser();